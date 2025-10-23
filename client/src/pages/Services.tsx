import { Link } from 'react-router-dom'
import { SEO } from '../lib/seo'

export default function Services() {
  const services = [
    {
      title: 'Strategic Consulting',
      description: 'Comprehensive business strategy development tailored to your unique goals and market position.',
      features: [
        'Market Analysis & Research',
        'Business Model Optimization',
        'Competitive Strategy Development',
        'Growth Planning & Roadmapping',
        'Performance Metrics & KPIs'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Digital Transformation',
      description: 'Modernize your operations with cutting-edge technology solutions and automation.',
      features: [
        'Process Automation & Optimization',
        'Cloud Migration & Infrastructure',
        'Data Analytics & Business Intelligence',
        'Customer Experience Enhancement',
        'Digital Security & Compliance'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Sustainability Consulting',
      description: 'Integrate sustainable practices into your business model for long-term success.',
      features: [
        'ESG Strategy Development',
        'Carbon Footprint Reduction',
        'Sustainable Supply Chain Management',
        'Green Technology Implementation',
        'Sustainability Reporting & Compliance'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4acas 4acas 0 000 6.364L12 20.364l7.682-7.682a4acas 4acas 0 00-6.364-6.364L12 7.636l-1.318-1.318a4acas 4acas 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Growth Planning',
      description: 'Scalable expansion strategies that align with your business objectives and resources.',
      features: [
        'Market Expansion Strategies',
        'Product & Service Development',
        'Partnership & Alliance Building',
        'Investment & Funding Guidance',
        'International Market Entry'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Change Management',
      description: 'Navigate organizational transformation with minimal disruption and maximum adoption.',
      features: [
        'Change Strategy & Planning',
        'Stakeholder Engagement',
        'Training & Development Programs',
        'Communication & Culture Change',
        'Success Measurement & Optimization'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Performance Optimization',
      description: 'Enhance operational efficiency and productivity across all business functions.',
      features: [
        'Process Analysis & Redesign',
        'Performance Metrics & Monitoring',
        'Resource Optimization',
        'Quality Management Systems',
        'Continuous Improvement Programs'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ]

  return (
    <>
      <SEO
        title="Our Services - Comprehensive Business Solutions"
        description="Discover our full range of business consulting services including strategic planning, digital transformation, sustainability consulting, and growth planning."
      />

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-charcoal mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive business solutions designed to drive sustainable growth, 
              improve efficiency, and position your company for long-term success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6 text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4 text-charcoal">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-deep-green mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and maximum value for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold mb-3">Discovery</h3>
              <p className="text-gray-600">
                We start by understanding your business, goals, and challenges through comprehensive analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold mb-3">Strategy</h3>
              <p className="text-gray-600">
                We develop a customized strategy and action plan tailored to your specific needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold mb-3">Implementation</h3>
              <p className="text-gray-600">
                Our team works closely with yours to execute the plan with precision and care.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-poppins font-semibold mb-3">Optimization</h3>
              <p className="text-gray-600">
                We monitor results and continuously optimize to ensure long-term success.
              </p>
            </div>
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
            Let's discuss how our services can help you achieve your business goals and drive sustainable growth.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-deep-green hover:bg-gray-100">
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  )
}
