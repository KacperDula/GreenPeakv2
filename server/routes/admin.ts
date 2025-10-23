import { Router } from 'express';
import { validateAdminCredentials, generateToken, authMiddleware } from '../auth.js';
import db from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import { slugify, generateUniqueSlug } from '../utils/slug.js';
import { PostSchema, validateSchema } from '../middleware/validate.js';
import { adminRateLimit } from '../middleware/rateLimit.js';

const router = Router();

// POST /api/admin/login - Authenticate admin
router.post('/login', adminRateLimit, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  if (!validateAdminCredentials(username, password)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = generateToken({ username });
  res.json({ token, username });
});

// All routes below require authentication
router.use(authMiddleware);

// POST /api/posts - Create new post
router.post('/posts', validateSchema(PostSchema), (req, res) => {
  try {
    const id = uuidv4();
    const baseSlug = slugify(req.body.title);

    // Check for existing slugs
    const existingSlugs = (
      db.prepare('SELECT slug FROM posts').all() as Array<{ slug: string }>
    ).map(p => p.slug);

    const slug = generateUniqueSlug(baseSlug, existingSlugs);

    // Generate excerpt if not provided
    const excerpt =
      req.body.excerpt ||
      req.body.content.substring(0, 200).replace(/[#*`]/g, '').trim() + '...';

    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO posts (id, slug, title, author, date, categories, excerpt, content, featured_image, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      slug,
      req.body.title,
      req.body.author,
      req.body.date,
      req.body.categories.join(', '),
      excerpt,
      req.body.content,
      req.body.featured_image || null,
      req.body.published ? 1 : 0,
      now,
      now
    );

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT /api/posts/:id - Update post
router.put('/posts/:id', validateSchema(PostSchema), (req, res) => {
  try {
    const existingPost = db
      .prepare('SELECT * FROM posts WHERE id = ?')
      .get(req.params.id) as any;

    if (!existingPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    // If title changed, regenerate slug
    let slug = existingPost.slug;
    if (req.body.title !== existingPost.title) {
      const baseSlug = slugify(req.body.title);
      const existingSlugs = (
        db.prepare('SELECT slug FROM posts WHERE id != ?').all(req.params.id) as Array<{ slug: string }>
      ).map(p => p.slug);
      slug = generateUniqueSlug(baseSlug, existingSlugs);
    }

    const excerpt =
      req.body.excerpt ||
      req.body.content.substring(0, 200).replace(/[#*`]/g, '').trim() + '...';

    const now = new Date().toISOString();

    db.prepare(
      `UPDATE posts 
       SET slug = ?, title = ?, author = ?, date = ?, categories = ?, excerpt = ?, content = ?, 
           featured_image = ?, published = ?, updated_at = ?
       WHERE id = ?`
    ).run(
      slug,
      req.body.title,
      req.body.author,
      req.body.date,
      req.body.categories.join(', '),
      excerpt,
      req.body.content,
      req.body.featured_image || null,
      req.body.published ? 1 : 0,
      now,
      req.params.id
    );

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/posts/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// GET /api/admin/posts - Get all posts (including unpublished)
router.get('/posts', (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const search = req.query.search as string;
    const category = req.query.category as string;

    let query = 'SELECT * FROM posts WHERE 1=1';
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

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as count');
    const { count } = db.prepare(countQuery).get(...params) as { count: number };

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const posts = db.prepare(query).all(...params);

    res.json({
      posts,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

export default router;
