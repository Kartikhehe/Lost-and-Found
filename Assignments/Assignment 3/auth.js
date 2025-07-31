// Authentication utility functions
const API_BASE_URL = window.location.origin + '/api';

// Token management
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// API request helper with authentication
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.access_token) {
      setToken(response.access_token);
    }
    
    return response;
  },

  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.access_token) {
      setToken(response.access_token);
    }
    
    return response;
  },

  logout: () => {
    removeToken();
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  verifyToken: async () => {
    return await apiRequest('/auth/verify');
  },
};

// Items API calls
export const itemsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString();
    const endpoint = `/items/${queryString ? `?${queryString}` : ''}`;
    
    return await apiRequest(endpoint);
  },

  getById: async (id) => {
    return await apiRequest(`/items/${id}`);
  },

  create: async (itemData) => {
    return await apiRequest('/items/', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  update: async (id, itemData) => {
    return await apiRequest(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/items/${id}`, {
      method: 'DELETE',
    });
  },

  getMyItems: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString();
    const endpoint = `/items/my-items${queryString ? `?${queryString}` : ''}`;
    
    return await apiRequest(endpoint);
  },

  getStats: async () => {
    return await apiRequest('/items/stats');
  },
};

