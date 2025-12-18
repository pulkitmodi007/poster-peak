import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Search, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [priceRange, setPriceRange] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Art', 'Movies', 'Minimalist'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: 'Above ₹2000', min: 2000, max: Infinity },
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, priceRange]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const loadProducts = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<Products>('products');
    setProducts(items);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange !== 'All') {
      const range = priceRanges.find((r) => r.label === priceRange);
      if (range) {
        filtered = filtered.filter(
          (product) =>
            (product.price || 0) >= range.min &&
            (product.price || 0) < range.max
        );
      }
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-4">
            Shop Posters
          </h1>
          <p className="text-lg font-paragraph text-secondary">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'poster' : 'posters'} available
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                type="text"
                placeholder="Search posters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-3 border border-foreground/20 rounded font-paragraph text-base hover:bg-foreground/5"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-paragraph text-foreground mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded font-paragraph text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-foreground text-background'
                          : 'border border-foreground/20 text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-paragraph text-foreground mb-3">
                  Price Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.label)}
                      className={`px-4 py-2 rounded font-paragraph text-sm transition-colors ${
                        priceRange === range.label
                          ? 'bg-foreground text-background'
                          : 'border border-foreground/20 text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl font-paragraph text-secondary">
              No posters found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/product/${product._id}`} className="block group">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-foreground/5">
                    {product.mainImage ? (
                      <Image
                        src={product.mainImage}
                        alt={product.productName || 'Product image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={400}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-paragraph text-foreground mb-1 line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm font-paragraph text-secondary mb-2">
                    {product.category}
                  </p>
                  <p className="text-base font-paragraph text-foreground font-medium">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </p>
                  {product.stockQuantity !== undefined && product.stockQuantity <= 5 && (
                    <p className="text-sm font-paragraph text-destructive mt-1">
                      Only {product.stockQuantity} left
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
