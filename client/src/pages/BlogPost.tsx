import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeSanitize from 'rehype-sanitize'
import { SEO, generateBlogPostSEO } from '../lib/seo'
import { apiClient, BlogPost as BlogPostType, normalizeCategories } from '../lib/api'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)
        
        const [postData, relatedData] = await Promise.all([
          apiClient.getPost(slug),
          apiClient.getRelatedPosts(slug)
        ])
        
        setPost(postData)
        setRelatedPosts(relatedData)
      } catch (err) {
        console.error('Failed to load post:', err)
        setError('Post not found')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-poppins font-bold text-charcoal mb-4">
          Post Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO {...generateBlogPostSEO(post)} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-6">
            {normalizeCategories(post.categories).map((category, index) => (
              <Link
                key={index}
                to={`/blog?category=${encodeURIComponent(category)}`}
                className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-deep-green rounded-full hover:bg-green-200 transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-charcoal mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between text-gray-600 mb-8">
            <div className="flex items-center space-x-4">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="text-sm">
              Updated {new Date(post.updated_at).toLocaleDateString()}
            </div>
          </div>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown
            rehypePlugins={[rehypeSanitize]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Info */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-deep-green to-fresh-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-lg text-charcoal">
                {post.author}
              </h3>
              <p className="text-gray-600">
                Expert in business strategy and sustainable growth
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <article key={relatedPost.id} className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {relatedPost.featured_image && (
                    <img
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      {relatedPost.categories.slice(0, 1).map((category, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-deep-green rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-poppins font-semibold mb-3 line-clamp-2">
                      <Link
                        to={`/blog/${relatedPost.slug}`}
                        className="hover:text-deep-green transition-colors duration-200"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="text-deep-green font-medium hover:text-fresh-green transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
