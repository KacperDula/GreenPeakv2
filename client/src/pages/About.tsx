import { SEO } from '../lib/seo'

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Your Trusted Growth Partners"
        description="Learn about GreenPeak Solutions' mission to help businesses grow sustainably through expert consulting and innovative strategies."
      />

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-charcoal mb-6">
              About GreenPeak Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about helping businesses achieve sustainable growth through 
              strategic consulting, digital transformation, and innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At GreenPeak Solutions, we believe that sustainable business growth comes from 
                combining strategic thinking with innovative technology. Our mission is to empower 
                businesses to thrive in today's rapidly changing landscape while maintaining 
                environmental and social responsibility.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We work closely with our clients to understand their unique challenges and 
                opportunities, delivering customized solutions that drive measurable results 
                and long-term success.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-deep-green mb-2">500+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-deep-green mb-2">98%</h3>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-deep-green mb-2">15+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-bold text-deep-green mb-2">50+</h3>
                  <p className="text-gray-600">Team Members</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Our team working together"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with clients and partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, delivering high-quality solutions 
                that exceed expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of collaboration, working closely with clients as 
                trusted partners in their success.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4acas 4acas 0 000 6.364L12 20.364l7.682-7.682a4acas 4acas 0 00-6.364-6.364L12 7.636l-1.318-1.318a4acas 4acas 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to sustainable business practices that benefit both our 
                clients and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience in business 
              strategy, technology, and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="John Smith"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-poppins font-semibold mb-2">John Smith</h3>
              <p className="text-deep-green font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600">
                15+ years in business strategy and sustainable growth consulting.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Sarah Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-poppins font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-deep-green font-medium mb-2">CTO</p>
              <p className="text-gray-600">
                Technology innovation expert with a focus on digital transformation.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Michael Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-poppins font-semibold mb-2">Michael Chen</h3>
              <p className="text-deep-green font-medium mb-2">Head of Strategy</p>
              <p className="text-gray-600">
                Strategic planning specialist with expertise in sustainable business models.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
