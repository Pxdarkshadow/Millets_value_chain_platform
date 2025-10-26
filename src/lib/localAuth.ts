// Local authentication system
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

type AuthStateChangeCallback = (state: AuthState) => void;

class LocalAuth {
  private currentUser: User | null = null;
  private listeners: AuthStateChangeCallback[] = [];
  private isLoading = false;

  constructor() {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
    }
  }

  private saveUserToStorage(user: User | null) {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Failed to save user to storage:', error);
    }
  }

  private notifyListeners() {
    const state: AuthState = {
      user: this.currentUser,
      isLoading: this.isLoading
    };
    this.listeners.forEach(callback => callback(state));
  }

  onAuthStateChanged(callback: AuthStateChangeCallback): () => void {
    this.listeners.push(callback);
    
    // Immediately call with current state
    callback({
      user: this.currentUser,
      isLoading: this.isLoading
    });

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  async signInWithEmail(email: string, password: string): Promise<void> {
    this.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple validation 
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Create user object
      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        displayName: email.split('@')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      this.isLoading = false;
      this.notifyListeners();
    } catch (error) {
      this.isLoading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async signUp({ email, password }: { email: string; password: string }): Promise<void> {
    this.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Check if user already exists
      const existingUser = localStorage.getItem('user');
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email === email) {
          throw new Error('User already exists');
        }
      }

      // Create user object
      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        displayName: email.split('@')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      this.isLoading = false;
      this.notifyListeners();
    } catch (error) {
      this.isLoading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    this.notifyListeners();

    try {
      // Simulate Google OAuth delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create a mock Google user
      const user: User = {
        id: `google_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: 'user@gmail.com',
        displayName: 'Google User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.currentUser = user;
      this.saveUserToStorage(user);
      this.isLoading = false;
      this.notifyListeners();
      
      toast.success('Signed in with Google successfully!');
    } catch (error) {
      this.isLoading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async updateMe({ displayName }: { displayName: string }): Promise<void> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    this.currentUser.displayName = displayName;
    this.currentUser.updatedAt = new Date().toISOString();
    this.saveUserToStorage(this.currentUser);
    this.notifyListeners();
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.saveUserToStorage(null);
    this.notifyListeners();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

// Create and export a singleton instance
export const localAuth = new LocalAuth();
