function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PestFree Pro</h3>
            <p className="text-gray-400">Professional pest control services for your home and business.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/service-map" className="hover:text-white">Service Area</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <p className="text-gray-400">📞 1-800-PEST-FREE</p>
            <p className="text-gray-400">📧 info@pestfree.com</p>
            <p className="text-gray-400">Available 24/7</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 PestFree Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
