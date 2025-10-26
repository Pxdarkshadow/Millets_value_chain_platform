// Database schema definitions 
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  farmer?: string;
  location?: string;
  certification?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}

// Database collections configuration
export const collections = {
  products: 'products',
  cartItems: 'cartItems',
  users: 'users'
} as const;
