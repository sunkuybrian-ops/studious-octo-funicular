import { useState, useEffect } from 'react'
import axios from 'axios'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services')
      setServices(response.data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Our Pest Control Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-blue-600">${service.price}</span>
                <button className="btn-primary">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
