import { useState } from 'react'
import axios from 'axios'
import JokeDisplay from './components/JokeDisplay'
import JokeButtons from './components/JokeButtons'
import './App.css'

function App() {
  const [joke, setJoke] = useState('')
  const [source, setSource] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [jokeHistory, setJokeHistory] = useState([])

  const fetchJoke = async (endpoint = '/api/jokes/random') => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(endpoint)
      setJoke(response.data.joke)
      setSource(response.data.source)
      setCategory(response.data.category || 'General')
      
      // Add to history
      setJokeHistory(prev => [{
        joke: response.data.joke,
        source: response.data.source,
        category: response.data.category,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)])
    } catch (err) {
      setError('Failed to fetch joke. Please try again!')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRandomJoke = () => fetchJoke('/api/jokes/random')
  const handleJokeAPI = () => fetchJoke('/api/jokes/api')
  const handleProgrammingJoke = () => fetchJoke('/api/jokes/programming')
  const handleKnockKnock = () => fetchJoke('/api/jokes/knock-knock')
  const handleOfficialJoke = () => fetchJoke('/api/jokes/official')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="joke-container mb-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-purple-600 mb-2">🎭 Joke Generator</h1>
            <p className="text-gray-600 text-lg">Get instant laughs from multiple joke APIs</p>
          </div>

          {error && <div className="error">{error}</div>}

          <JokeDisplay 
            joke={joke} 
            source={source} 
            category={category} 
            loading={loading}
          />

          <JokeButtons 
            onRandomJoke={handleRandomJoke}
            onJokeAPI={handleJokeAPI}
            onProgrammingJoke={handleProgrammingJoke}
            onKnockKnock={handleKnockKnock}
            onOfficialJoke={handleOfficialJoke}
            loading={loading}
          />
        </div>

        {/* History Section */}
        {jokeHistory.length > 0 && (
          <div className="joke-container">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📜 Recent Jokes</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {jokeHistory.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 mb-2">{item.joke}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.source}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
