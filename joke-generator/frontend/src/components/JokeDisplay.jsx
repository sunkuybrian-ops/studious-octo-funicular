function JokeDisplay({ joke, source, category, loading }) {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 min-h-32 flex items-center justify-center">
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin text-4xl">🎭</div>
            <p className="text-gray-600 mt-2">Loading a hilarious joke...</p>
          </div>
        ) : joke ? (
          <div>
            <p className="text-2xl font-bold text-gray-800 text-center mb-4">{joke}</p>
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="source-badge">{source}</span>
              <span className="category-badge">{category}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">
            Click a button to get a joke! 😄
          </p>
        )}
      </div>
    </div>
  )
}

export default JokeDisplay
