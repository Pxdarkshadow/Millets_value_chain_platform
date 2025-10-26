// Mock data service for development
import { Product, CartItem } from './schema';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Pearl Millet',
    category: 'grains',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviews: 128,
    farmer: 'Rajesh Kumar',
    location: 'Rajasthan',
    certification: 'Organic Certified',
    description: 'Premium quality pearl millet directly from organic farms',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Finger Millet Flour',
    category: 'flour',
    price: 85,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80',
    rating: 4.2,
    reviews: 95,
    farmer: 'Priya Sharma',
    location: 'Karnataka',
    certification: 'FSSAI Certified',
    description: 'Freshly ground finger millet flour',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Green Vegetables',
    category: 'vegetables',
    price: 200,
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews: 67,
    farmer: 'Amit Patel',
    location: 'Gujarat',
    certification: 'AGMARK',
    description: 'Healthy roasted foxtail millet snacks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Ready-to-Eat Millet Porridge',
    category: 'ready-to-eat',
    price: 150,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    reviews: 89,
    farmer: 'Sunita Devi',
    location: 'Haryana',
    certification: 'Organic Certified',
    description: 'Instant millet porridge mix',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Barnyard Millet',
    category: 'grains',
    price: 95,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80',
    rating: 4.1,
    reviews: 76,
    farmer: 'Vikram Singh',
    location: 'Punjab',
    certification: 'FSSAI Certified',
    description: 'Premium barnyard millet grains',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Little Millet Flour',
    category: 'flour',
    price: 110,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    reviews: 112,
    farmer: 'Meera Joshi',
    location: 'Maharashtra',
    certification: 'AGMARK',
    description: 'Fine quality little millet flour',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock cart items storage
const mockCartItems: CartItem[] = [];

export const mockDb = {
  products: {
    list: async (options?: { orderBy?: { createdAt: string }; where?: { userId?: string; AND?: Array<{ userId?: string; productId?: string }> } }): Promise<Product[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProducts = [...mockProducts];
      
      if (options?.orderBy?.createdAt === 'desc') {
        filteredProducts = filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      
      return filteredProducts;
    },
    
    get: async (id: string): Promise<Product | null> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockProducts.find(p => p.id === id) || null;
    }
  },
  
  cartItems: {
    list: async (options?: { where?: { userId?: string; AND?: Array<{ userId?: string; productId?: string }> }; orderBy?: { createdAt: string } }): Promise<CartItem[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredItems = [...mockCartItems];
      
      if (options?.where?.userId) {
        filteredItems = filteredItems.filter(item => item.userId === options.where.userId);
      }
      
      if (options?.where?.AND) {
        const conditions = options.where.AND;
        filteredItems = filteredItems.filter(item => {
          return conditions.every((condition: { userId?: string; productId?: string }) => {
            if (condition.userId) return item.userId === condition.userId;
            if (condition.productId) return item.productId === condition.productId;
            return true;
          });
        });
      }
      
      if (options?.orderBy?.createdAt === 'desc') {
        filteredItems = filteredItems.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      
      return filteredItems;
    },
    
    create: async (data: Omit<CartItem, 'createdAt' | 'updatedAt'>): Promise<CartItem> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newItem: CartItem = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      mockCartItems.push(newItem);
      return newItem;
    },
    
    update: async (id: string, data: Partial<CartItem>): Promise<CartItem> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = mockCartItems.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Cart item not found');
      }
      
      mockCartItems[index] = {
        ...mockCartItems[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      return mockCartItems[index];
    },
    
    delete: async (id: string): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = mockCartItems.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Cart item not found');
      }
      
      mockCartItems.splice(index, 1);
    }
  }
};
