import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function SEO({ title, description, keywords, image, url }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

export function generateBlogPostSEO(post: {
  title: string
  excerpt?: string
  featured_image?: string
  date: string
  author: string
  categories: string[] | string
}) {
  const title = `${post.title} | GreenPeak Solutions`
  const description = post.excerpt || `Read ${post.title} by ${post.author} on GreenPeak Solutions blog.`
  
  // Safely handle categories
  const categoriesArray = Array.isArray(post.categories) 
    ? post.categories 
    : (typeof post.categories === 'string' ? post.categories.split(',').map(c => c.trim()).filter(c => c) : [])
  
  return {
    title,
    description,
    keywords: categoriesArray.join(', '),
    image: post.featured_image,
    url: `/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`
  }
}

export default SEO