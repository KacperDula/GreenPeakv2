import { Link } from 'react-router-dom'
import { BlogPost } from '../lib/api'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.featured_image && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          {post.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 text-xs font-medium bg-green-100 text-deep-green rounded-full"
            >
              {category}
            </span>
          ))}
          {post.categories.length > 2 && (
            <span className="text-xs text-gray-500">
              +{post.categories.length - 2} more
            </span>
          )}
        </div>

        <h2 className="text-xl font-poppins font-semibold mb-3 line-clamp-2 hover:text-deep-green transition-colors duration-200">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
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
          <Link
            to={`/blog/${post.slug}`}
            className="text-deep-green font-medium hover:text-fresh-green transition-colors duration-200 flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
