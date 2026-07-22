import { useState, useEffect } from 'react'
import axios from 'axios'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('/api/blog')
      setPosts(response.data)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Pest Control Tips & Advice</h1>
        
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-500 mb-4">By {post.author_name || 'Admin'}</p>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-bold">
                  Read More →
                </a>
              </article>
            ))
          ) : (
            <div className="text-center text-gray-500">
              <p>No blog posts available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
