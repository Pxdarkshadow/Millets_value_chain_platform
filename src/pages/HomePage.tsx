import { useState, useEffect, useMemo } from 'react';
import { localAuth, User } from '../lib/localAuth';
import { mockDb } from '../lib/mockDb';
import { Product } from '../lib/schema';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductFilters } from '../components/ProductFilters';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [certification, setCertification] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    const unsubscribe = localAuth.onAuthStateChanged((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await mockDb.products.list({
        orderBy: { createdAt: 'desc' }
      });
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.farmer && product.farmer.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = category === 'all' || product.category.toLowerCase() === category.toLowerCase();

      const matchesCertification =
        certification === 'all' ||
        (product.certification && product.certification.toLowerCase().includes(certification.toLowerCase()));

      let matchesPrice = true;
      if (priceRange === 'low') {
        matchesPrice = product.price < 100;
      } else if (priceRange === 'medium') {
        matchesPrice = product.price >= 100 && product.price <= 500;
      } else if (priceRange === 'high') {
        matchesPrice = product.price > 500;
      }

      return matchesSearch && matchesCategory && matchesCertification && matchesPrice;
    });
  }, [searchTerm, category, certification, priceRange, products]);

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      // Check if item already in cart
      const existingItems = await mockDb.cartItems.list({
        where: { 
          AND: [
            { userId: user.id },
            { productId }
          ]
        }
      });

      if (existingItems.length > 0) {
        // Update quantity
        const item = existingItems[0];
        await mockDb.cartItems.update(item.id, {
          quantity: Number(item.quantity) + 1
        });
        toast.success('Cart updated!');
      } else {
        // Add new item
        await mockDb.cartItems.create({
          id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          productId,
          quantity: 1
        });
        toast.success('Added to cart!');
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Hero />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8" id="products">
          <h2 className="text-3xl font-bold text-center mb-2 text-foreground">
            Browse Millet Products
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>

          <ProductFilters
            searchTerm={searchTerm}
            category={category}
            certification={certification}
            priceRange={priceRange}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategory}
            onCertificationChange={setCertification}
            onPriceRangeChange={setPriceRange}
          />

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  certification={product.certification || 'Certified'}
                  category={product.category}
                  title={product.name}
                  farmer={product.farmer || 'Local Farmer'}
                  rating={product.rating}
                  reviews={product.reviews}
                  price={`₹${product.price}`}
                  priceValue={product.price}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No products found matching your filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
