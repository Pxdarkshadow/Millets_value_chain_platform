import { Star, StarHalf, User, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  image: string;
  certification: string;
  category: string;
  title: string;
  farmer: string;
  rating: number;
  reviews: number;
  price: string;
  priceValue?: number;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({
  id,
  image,
  certification,
  category,
  title,
  farmer,
  rating,
  reviews,
  price,
  onAddToCart,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-soft hover:-translate-y-1 transition-transform duration-300">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <Badge className="mb-2 bg-muted text-primary border-0">
          {certification}
        </Badge>
        <div className="text-sm text-muted-foreground mb-2">{category}</div>
        <h3 className="text-xl font-semibold mb-2 text-primary-dark">{title}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <User className="w-4 h-4" />
          <span>{farmer}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {renderStars(rating)}
          <span className="text-sm text-muted-foreground ml-1">({reviews})</span>
        </div>
        <div className="text-2xl font-bold text-primary mb-4">{price}</div>
        <div className="flex items-center justify-between gap-2">
          <Button
            className="flex-1 bg-primary hover:bg-primary-dark"
            onClick={() => onAddToCart(id)}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${
              isWishlisted ? 'text-pink-600 border-pink-600' : ''
            }`}
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
