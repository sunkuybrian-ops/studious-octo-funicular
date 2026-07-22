import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchServices()
    fetchTestimonials()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services')
      setServices(response.data.slice(0, 6))
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/api/testimonials')
      setTestimonials(response.data.slice(0, 3))
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Professional Pest Control Services</h1>
          <p className="text-xl mb-8">Protect your home and business from unwanted pests</p>
          <Link to="/quote" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            Get Your Free Quote
          </Link>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="card">
                <div className="text-4xl mb-4">
                  {service.icon === 'termite' && '🪳'}
                  {service.icon === 'ant' && '🐜'}
                  {service.icon === 'rodent' && '🐭'}
                  {service.icon === 'cockroach' && '🪳'}
                  {service.icon === 'bed-bug' && '🛏️'}
                  {service.icon === 'mosquito' && '🦟'}
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-2xl font-bold text-blue-600">${service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <p className="font-bold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
