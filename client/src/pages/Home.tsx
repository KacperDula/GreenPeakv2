import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '../lib/seo'
import { apiClient, BlogPost, normalizeCategories } from '../lib/api'

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const response = await apiClient.getPosts({ limit: 3 })
        setFeaturedPosts(response.posts)
      } catch (error) {
        console.error('Failed to load featured posts:', error)
        setFeaturedPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPosts()
  }, [])

  return (
    <>
      <SEO
        title="GreenPeak Solutions - Sustainable Business Growth"
        description="Transform your business with sustainable growth strategies. Expert consulting, digital transformation, and strategic planning services to help your company thrive."
      />

      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
              Sustainable Business Growth
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
              Transform your business with expert consulting, digital transformation, 
              and strategic planning that delivers real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-primary bg-white text-deep-green hover:bg-gray-100">
                Our Services
              </Link>
              <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-deep-green">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
              How We Help You Grow
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach combines strategy, technology, and sustainability 
              to drive measurable business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">Strategic Consulting</h3>
              <p className="text-gray-600">
                Data-driven strategies tailored to your business goals and market conditions.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">Digital Transformation</h3>
              <p className="text-gray-600">
                Modernize your operations with cutting-edge technology and automation.
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">Growth Planning</h3>
              <p className="text-gray-600">
                Sustainable expansion strategies that scale with your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay ahead with our latest thoughts on business growth, sustainability, and innovation.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="card overflow-hidden">
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-deep-green font-medium">
                        {normalizeCategories(post.categories)[0]}
                      </span>
                      <span className="text-gray-400">•</span>
                      <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString()}
                      </time>
                    </div>
                    <h3 className="text-xl font-poppins font-semibold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-deep-green font-medium hover:text-fresh-green transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/blog" className="btn-primary">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100">
            Let's discuss how we can help you achieve sustainable growth and digital transformation.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-deep-green hover:bg-gray-100">
            Start Your Journey
          </Link>
        </div>
      </section>
    </>
  )
}
