import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { localAuth, User } from '../lib/localAuth';
import { mockDb } from '../lib/mockDb';
import { Leaf, User as UserIcon, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = localAuth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadCartCount(state.user.id);
      } else {
        setCartCount(0);
      }
    });
    return unsubscribe;
  }, []);

  const loadCartCount = async (userId: string) => {
    try {
      const items = await mockDb.cartItems.list({
        where: { userId }
      });
      setCartCount(items.length);
    } catch (error) {
      console.error('Failed to load cart count:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await localAuth.logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      console.error('Failed to logout');
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary to-accent text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="w-7 h-7" />
            <h1 className="text-2xl font-semibold">Shree Anna</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity font-medium">
              Home
            </Link>
            <a href="#products" className="hover:opacity-80 transition-opacity font-medium">
              Products
            </a>
            <a href="#about" className="hover:opacity-80 transition-opacity font-medium">
              About
            </a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button
                  onClick={() => navigate('/cart')}
                  className="bg-secondary hover:bg-secondary/90 relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.displayName || user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="hover:bg-white/10"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/login')}
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <Link to="/" className="hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <a href="#products" className="hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
              Products
            </a>
            <a href="#about" className="hover:opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            
            {user ? (
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/20">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.displayName || user.email}</span>
                </div>
                <Button
                  className="bg-secondary hover:bg-secondary/90 relative"
                  onClick={() => {
                    navigate('/cart');
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                      {cartCount}
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => {
                    navigate('/signup');
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
