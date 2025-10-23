const API_BASE_URL = '/api'

// Utility function to safely convert categories to array
export function normalizeCategories(categories: string[] | string | undefined): string[] {
  if (Array.isArray(categories)) {
    return categories
  } else if (typeof categories === 'string') {
    return categories.split(',').map(c => c.trim()).filter(c => c)
  }
  return []
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  author: string
  date: string
  categories: string[] | string  // Can be array or string from database
  excerpt: string
  content: string
  featured_image?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface BlogPostResponse {
  posts: BlogPost[]
  total: number
}

export interface InquiryData {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }))
      console.error('API Error Details:', error)
      console.error('Response Status:', response.status)
      console.error('Response Headers:', response.headers)
      
      if (error.errors && Array.isArray(error.errors)) {
        const errorMessages = error.errors.map((err: any) => `${err.field}: ${err.message}`).join(', ')
        throw new Error(`Validation Error: ${errorMessages}`)
      }
      
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Blog Posts
  async getPosts(params?: {
    limit?: number
    offset?: number
    search?: string
    category?: string
  }): Promise<BlogPostResponse> {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.offset) searchParams.set('offset', params.offset.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.category) searchParams.set('category', params.category)

    const query = searchParams.toString()
    return this.request(`/posts${query ? `?${query}` : ''}`)
  }

  async getPost(slug: string): Promise<BlogPost> {
    return this.request(`/posts/${slug}`)
  }

  async getRelatedPosts(slug: string): Promise<BlogPost[]> {
    return this.request(`/posts/related/${slug}`)
  }

  // Contact Form
  async submitInquiry(data: InquiryData): Promise<{ message: string }> {
    return this.request('/inquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Admin Authentication
  async adminLogin(username: string, password: string): Promise<{ token: string }> {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  // Admin Blog Management
  async createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>, token: string): Promise<BlogPost> {
    return this.request('/admin/posts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
  }

  async updatePost(id: string, post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>, token: string): Promise<BlogPost> {
    return this.request(`/admin/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    })
  }

  async deletePost(id: string, token: string): Promise<{ success: boolean }> {
    return this.request(`/admin/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  }

  async getAdminPosts(params?: {
    limit?: number
    offset?: number
    search?: string
    category?: string
  }, token?: string): Promise<BlogPostResponse> {
    const searchParams = new URLSearchParams()
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.offset) searchParams.set('offset', params.offset.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.category) searchParams.set('category', params.category)

    const query = searchParams.toString()
    return this.request(`/admin/posts${query ? `?${query}` : ''}`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
  }

  // File Upload
  async uploadFile(file: File, token: string): Promise<{ url: string; filename: string }> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }))
      throw new Error(error.error || `Upload failed: ${response.status}`)
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()
