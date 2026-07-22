function JokeButtons({ onRandomJoke, onJokeAPI, onProgrammingJoke, onKnockKnock, onOfficialJoke, loading }) {
  return (
    <div className="button-group">
      <button 
        onClick={onRandomJoke} 
        disabled={loading}
        className="btn btn-primary"
        title="Get a random joke from any source"
      >
        🎲 Random Joke
      </button>
      <button 
        onClick={onJokeAPI} 
        disabled={loading}
        className="btn btn-secondary"
        title="Get from JokeAPI"
      >
        🤓 JokeAPI
      </button>
      <button 
        onClick={onProgrammingJoke} 
        disabled={loading}
        className="btn btn-secondary"
        title="Get programming joke"
      >
        💻 Programming
      </button>
      <button 
        onClick={onKnockKnock} 
        disabled={loading}
        className="btn btn-secondary"
        title="Get knock-knock joke"
      >
        🚪 Knock-Knock
      </button>
      <button 
        onClick={onOfficialJoke} 
        disabled={loading}
        className="btn btn-secondary"
        title="Get official joke"
      >
        🎯 Official
      </button>
    </div>
  )
}

export default JokeButtons
