import { Search } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ProductFiltersProps {
  searchTerm: string;
  category: string;
  certification: string;
  priceRange: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCertificationChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
}

export function ProductFilters({
  searchTerm,
  category,
  certification,
  priceRange,
  onSearchChange,
  onCategoryChange,
  onCertificationChange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-soft mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-muted-foreground">
            Category
          </Label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="grains">Millet Grains</SelectItem>
              <SelectItem value="flour">Millet Flour</SelectItem>
              <SelectItem value="snacks">Millet Snacks</SelectItem>
              <SelectItem value="ready-to-eat">Ready to Eat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Certification Filter */}
        <div className="space-y-2">
          <Label htmlFor="certification" className="text-sm font-medium text-muted-foreground">
            Certification
          </Label>
          <Select value={certification} onValueChange={onCertificationChange}>
            <SelectTrigger id="certification">
              <SelectValue placeholder="All Certifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Certifications</SelectItem>
              <SelectItem value="organic">Organic Certified</SelectItem>
              <SelectItem value="fssai">FSSAI Certified</SelectItem>
              <SelectItem value="agmark">AGMARK</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium text-muted-foreground">
            Price Range
          </Label>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger id="price">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under ₹100</SelectItem>
              <SelectItem value="medium">₹100 - ₹500</SelectItem>
              <SelectItem value="high">Above ₹500</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Box */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium text-muted-foreground">
            Search
          </Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary-dark">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
