import { Router } from 'express';
import db from '../db.js';

const router = Router();

interface Post {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  categories: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  published: number;
  created_at: string;
  updated_at: string;
}

function formatPost(post: Post) {
  return {
    ...post,
    categories: post.categories.split(',').map(c => c.trim()),
    published: post.published === 1,
  };
}

// GET /api/posts - List posts with filtering and pagination
router.get('/', (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const search = req.query.search as string;
    const category = req.query.category as string;

    let query = 'SELECT * FROM posts WHERE published = 1';
    const params: any[] = [];

    if (search) {
      query += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      query += ' AND categories LIKE ?';
      params.push(`%${category}%`);
    }

    query += ' ORDER BY date DESC';

    // Get total count
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const { count } = db.prepare(countQuery).get(...params) as { count: number };

    // Get paginated results
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const posts = db.prepare(query).all(...params) as Post[];

    res.json({
      posts: posts.map(formatPost),
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:slug - Get single post by slug
router.get('/:slug', (req, res) => {
  try {
    const post = db
      .prepare('SELECT * FROM posts WHERE slug = ? AND published = 1')
      .get(req.params.slug) as Post | undefined;

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json(formatPost(post));
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// GET /api/posts/related/:slug - Get related posts by category
router.get('/related/:slug', (req, res) => {
  try {
    const post = db
      .prepare('SELECT categories FROM posts WHERE slug = ? AND published = 1')
      .get(req.params.slug) as { categories: string } | undefined;

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const categories = post.categories.split(',').map(c => c.trim());
    const categoryConditions = categories.map(() => 'categories LIKE ?').join(' OR ');

    const relatedPosts = db
      .prepare(
        `SELECT * FROM posts 
         WHERE (${categoryConditions}) 
         AND slug != ? 
         AND published = 1 
         ORDER BY date DESC 
         LIMIT 3`
      )
      .all(...categories.map(c => `%${c}%`), req.params.slug) as Post[];

    res.json(relatedPosts.map(formatPost));
  } catch (error) {
    console.error('Error fetching related posts:', error);
    res.status(500).json({ error: 'Failed to fetch related posts' });
  }
});

export default router;
