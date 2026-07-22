import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function ServiceMap() {
  const [areas, setAreas] = useState([])

  useEffect(() => {
    fetchServiceAreas()
  }, [])

  const fetchServiceAreas = async () => {
    try {
      const response = await axios.get('/api/maps/areas')
      setAreas(response.data)
    } catch (error) {
      console.error('Error fetching service areas:', error)
    }
  }

  const defaultCenter = [37.7749, -122.4194] // San Francisco

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Service Area</h1>
        <p className="text-gray-600 mb-8">We serve the entire metropolitan area with professional pest control services.</p>
      </div>
      
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer center={defaultCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {areas.map(area => (
            <Circle
              key={area.id}
              center={[area.latitude, area.longitude]}
              radius={area.radius * 1000}
              pathOptions={{
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.2
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{area.name}</h3>
                  <p>Coverage radius: {area.radius}km</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default ServiceMap
