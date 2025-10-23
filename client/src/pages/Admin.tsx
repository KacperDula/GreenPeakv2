import { useState, useEffect } from 'react'
import { apiClient, BlogPost, normalizeCategories } from '../lib/api'
import { SEO } from '../lib/seo'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    excerpt: '',
    categories: '',
    featured_image: '',
    published: false,
    date: new Date().toISOString().split('T')[0]
  })

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      loadPosts(savedToken)
    }
  }, [])

  // Only load posts when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      loadPosts(token)
    }
  }, [isAuthenticated, token])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)

    try {
      const response = await apiClient.adminLogin(username, password)
      setToken(response.token)
      localStorage.setItem('admin_token', response.token)
      setIsAuthenticated(true)
      loadPosts(response.token)
    } catch (error) {
      setLoginError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const loadPosts = async (authToken: string) => {
    if (!authToken) return
    
    try {
      const response = await apiClient.getAdminPosts({ limit: 50 }, authToken)
      setPosts(response.posts)
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!token || !confirm('Are you sure you want to delete this post?')) return

    try {
      await apiClient.deletePost(postId, token)
      setPosts(posts.filter(post => post.id !== postId))
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  const handleCreatePost = () => {
    setEditingPost(null)
    setFormData({
      title: '',
      author: '',
      content: '',
      excerpt: '',
      categories: '',
      featured_image: '',
      published: false,
      date: new Date().toISOString().split('T')[0]
    })
    setShowCreateForm(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    
    // Safely handle categories using utility function
    const categoriesArray = normalizeCategories(post.categories)
    
    setFormData({
      title: post.title,
      author: post.author,
      content: post.content,
      excerpt: post.excerpt,
      categories: categoriesArray.join(', '),
      featured_image: post.featured_image || '',
      published: post.published,
      date: post.date.split('T')[0]
    })
    setShowCreateForm(true)
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    // Validate required fields
    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }
    if (!formData.author.trim()) {
      alert('Author is required')
      return
    }
    if (!formData.content.trim() || formData.content.trim().length < 20) {
      alert('Content must be at least 20 characters long')
      return
    }

    try {
      const postData = {
        ...formData,
        categories: formData.categories.split(',').map(c => c.trim()).filter(c => c).length > 0 
          ? formData.categories.split(',').map(c => c.trim()).filter(c => c)
          : ['General'],
        date: new Date(formData.date).toISOString()
      }

      console.log('Sending post data:', JSON.stringify(postData, null, 2))
      console.log('Editing post?', !!editingPost)
      console.log('Editing post ID:', editingPost?.id)

      if (editingPost) {
        console.log('Using updatePost API method')
        const updatedPost = await apiClient.updatePost(editingPost.id, postData, token)
        setPosts(posts.map(p => p.id === editingPost.id ? updatedPost : p))
      } else {
        console.log('Using createPost API method')
        const newPost = await apiClient.createPost(postData, token)
        setPosts([newPost, ...posts])
      }

      setShowCreateForm(false)
      setEditingPost(null)
    } catch (error) {
      console.error('Failed to save post:', error)
      alert('Failed to save post. Check console for details.')
    }
  }

  const handleCancelForm = () => {
    setShowCreateForm(false)
    setEditingPost(null)
  }

  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Admin Login" />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-12 w-12 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h2 className="mt-6 text-center text-3xl font-poppins font-bold text-gray-900">
                Admin Login
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Sign in to manage your content
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 input-field"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 input-field"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center">{loginError}</div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full btn-primary disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-poppins font-bold text-charcoal">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your blog posts and content
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-poppins font-semibold text-charcoal">
                  Blog Posts ({posts.length})
                </h2>
                <button 
                  onClick={handleCreatePost}
                  className="btn-primary"
                >
                  Create New Post
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          /{post.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(post.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handleEditPost(post)}
                          className="text-deep-green hover:text-fresh-green"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Create/Edit Post Form */}
          {showCreateForm && (
            <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-poppins font-semibold text-charcoal">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmitPost} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="input-field"
                      placeholder="Enter post title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      id="author"
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="input-field"
                      placeholder="Enter author name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
                      Categories
                    </label>
                    <input
                      id="categories"
                      type="text"
                      value={formData.categories}
                      onChange={(e) => setFormData({...formData, categories: e.target.value})}
                      className="input-field"
                      placeholder="Enter categories (comma separated)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="input-field"
                    placeholder="Enter post excerpt (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    id="content"
                    rows={10}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="input-field"
                    placeholder="Enter post content (Markdown supported)"
                  />
                </div>

                <div>
                  <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    id="featured_image"
                    type="url"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
                    className="input-field"
                    placeholder="Enter featured image URL"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="h-4 w-4 text-deep-green focus:ring-deep-green border-gray-300 rounded"
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
