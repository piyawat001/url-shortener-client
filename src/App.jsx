import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking...')

  // Test API connection on component mount
  useEffect(() => {
    testApiConnection()
  }, [])

  const testApiConnection = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/test')
      setApiStatus('✅ Connected')
      console.log('API Response:', response.data)
    } catch (error) {
      setApiStatus('❌ Disconnected')
      console.error('API Connection Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    try {
      // This is a placeholder - actual URL shortening will be implemented later
      const response = await axios.post('http://localhost:5001/api/shorten', { url })
      setShortUrl(response.data.shortUrl)
    } catch (error) {
      console.error('Error shortening URL:', error)
      alert('Error shortening URL. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 URL Shortener</h1>
        <p>API Status: {apiStatus}</p>
        
        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten..."
            className="url-input"
            required
          />
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="result">
            <h3>Shortened URL:</h3>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}

        <button onClick={testApiConnection} className="test-btn">
          Test API Connection
        </button>
      </header>
    </div>
  )
}

export default App