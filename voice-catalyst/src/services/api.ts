// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function for API requests
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
}

// Auth API
export const authAPI = {
  // Register user
  register: async (userData: any) => {
    return fetchAPI('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Login user
  login: async (email: string, password: string) => {
    return fetchAPI('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async (userId: string) => {
    return fetchAPI(`/user/${userId}`);
  },
  
  // Update user profile
  updateProfile: async (userId: string, userData: any) => {
    return fetchAPI(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Product API
export const productAPI = {
  // Get all products for a user
  getProducts: async (userId: string) => {
    return fetchAPI(`/products?userId=${userId}`);
  },
  
  // Get a single product
  getProduct: async (productId: string) => {
    return fetchAPI(`/products/${productId}`);
  },
  
  // Create a new product
  createProduct: async (productData: any) => {
    return fetchAPI('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
  
  // Update a product
  updateProduct: async (productId: string, productData: any) => {
    return fetchAPI(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },
  
  // Delete a product
  deleteProduct: async (productId: string) => {
    return fetchAPI(`/products/${productId}`, {
      method: 'DELETE',
    });
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  products: productAPI,
}; 