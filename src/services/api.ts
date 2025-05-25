
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API client
const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
};

// Job API
export const jobApi = {
  getAll: () => apiClient.get('/jobs'),
  getById: (id: string) => apiClient.get(`/jobs/${id}`),
  create: (data: any) => apiClient.post('/jobs', data),
  update: (id: string, data: any) => apiClient.put(`/jobs/${id}`, data),
  delete: (id: string) => apiClient.delete(`/jobs/${id}`),
  getFeatured: () => apiClient.get('/jobs/featured'),
  getByCategory: (categoryId: string) => apiClient.get(`/jobs/category/${categoryId}`),
  getCount: () => apiClient.get('/jobs/count'),
  getToday: () => apiClient.get('/jobs/today')
};

// User API
export const userApi = {
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`)
};

// Category API
export const categoryApi = {
  getAll: () => apiClient.get('/categories'),
  getById: (id: string) => apiClient.get(`/categories/${id}`),
  create: (data: any) => apiClient.post('/categories', data),
  update: (id: string, data: any) => apiClient.put(`/categories/${id}`, data),
  delete: (id: string) => apiClient.delete(`/categories/${id}`)
};

// Website Settings API
export const websiteSettingsApi = {
  get: () => apiClient.get('/website-settings'),
  update: (data: any) => apiClient.put('/website-settings', data)
};

// Page SEO API
export const pageSeoApi = {
  get: (pageName: string) => apiClient.get(`/page-seo/${pageName}`),
  update: (pageName: string, data: any) => apiClient.put(`/page-seo/${pageName}`, data)
};

// Auth API
export const authApi = {
  login: (data: any) => apiClient.post('/auth/login', data),
  register: (data: any) => apiClient.post('/auth/register', data)
};
