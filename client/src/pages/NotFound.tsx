import { Link } from 'react-router-dom'
import { SEO } from '../lib/seo'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="mx-auto h-24 w-24 gradient-bg rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">404</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-poppins font-bold text-charcoal mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-4">
            <Link to="/" className="btn-primary block">
              Go Home
            </Link>
            
            <div className="text-sm text-gray-500">
              <p className="mb-2">Or try one of these popular pages:</p>
              <div className="flex justify-center space-x-6">
                <Link to="/about" className="text-deep-green hover:text-fresh-green transition-colors duration-200">
                  About
                </Link>
                <Link to="/services" className="text-deep-green hover:text-fresh-green transition-colors duration-200">
                  Services
                </Link>
                <Link to="/blog" className="text-deep-green hover:text-fresh-green transition-colors duration-200">
                  Blog
                </Link>
                <Link to="/contact" className="text-deep-green hover:text-fresh-green transition-colors duration-200">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
