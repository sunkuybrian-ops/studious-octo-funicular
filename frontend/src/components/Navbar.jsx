import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">
            🐛 PestFree Pro
          </Link>
          
          <div className="hidden md:block space-x-6">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/services" className="hover:text-gray-200">Services</Link>
            <Link to="/quote" className="hover:text-gray-200">Get Quote</Link>
            <Link to="/blog" className="hover:text-gray-200">Blog</Link>
            <Link to="/service-map" className="hover:text-gray-200">Service Area</Link>
            <Link to="/admin" className="hover:text-gray-200">Admin</Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-gray-200">Home</Link>
            <Link to="/services" className="block py-2 hover:text-gray-200">Services</Link>
            <Link to="/quote" className="block py-2 hover:text-gray-200">Get Quote</Link>
            <Link to="/blog" className="block py-2 hover:text-gray-200">Blog</Link>
            <Link to="/service-map" className="block py-2 hover:text-gray-200">Service Area</Link>
            <Link to="/admin" className="block py-2 hover:text-gray-200">Admin</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
