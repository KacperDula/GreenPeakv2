import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title ? `${title} | GreenPeak Solutions` : 'GreenPeak Solutions - Sustainable Business Growth'}</title>
        <meta name="description" content={description || 'GreenPeak Solutions helps businesses grow sustainably with expert consulting, digital transformation, and strategic planning services.'} />
        <meta property="og:title" content={title ? `${title} | GreenPeak Solutions` : 'GreenPeak Solutions - Sustainable Business Growth'} />
        <meta property="og:description" content={description || 'GreenPeak Solutions helps businesses grow sustainably with expert consulting, digital transformation, and strategic planning services.'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://greenpeak.example" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
