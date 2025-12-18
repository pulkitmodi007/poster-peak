import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Products | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;

    setLoading(true);
    const productData = await BaseCrudService.getById<Products>('products', id);
    setProduct(productData);

    if (productData?.category) {
      const { items } = await BaseCrudService.getAll<Products>('products');
      const related = items
        .filter(
          (p) => p.category === productData.category && p._id !== productData._id
        )
        .slice(0, 4);
      setRelatedProducts(related);
    }

    setLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const incrementQuantity = () => {
    if (product?.stockQuantity && quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    } else if (!product?.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading text-foreground mb-4">
            Product Not Found
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-base font-paragraph text-foreground underline hover:text-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isOutOfStock = product.stockQuantity !== undefined && product.stockQuantity === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-base font-paragraph text-secondary hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-foreground/5">
              {product.mainImage ? (
                <Image
                  src={product.mainImage}
                  alt={product.productName || 'Product image'}
                  className="w-full h-full object-cover"
                  width={800}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-secondary">
                  No Image Available
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {product.category && (
              <p className="text-sm font-paragraph text-secondary mb-2 uppercase tracking-wider">
                {product.category}
              </p>
            )}

            <h1 className="text-4xl md:text-5xl font-heading text-foreground mb-4">
              {product.productName}
            </h1>

            <p className="text-3xl font-paragraph text-foreground font-medium mb-6">
              ₹{product.price?.toLocaleString('en-IN')}
            </p>

            {product.description && (
              <p className="text-lg font-paragraph text-secondary mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.sku && (
              <p className="text-sm font-paragraph text-secondary mb-4">
                SKU: {product.sku}
              </p>
            )}

            {product.stockQuantity !== undefined && (
              <p className={`text-sm font-paragraph mb-6 ${
                isOutOfStock ? 'text-destructive' : 'text-secondary'
              }`}>
                {isOutOfStock
                  ? 'Out of Stock'
                  : `${product.stockQuantity} in stock`}
              </p>
            )}

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-6">
                <label className="block text-sm font-paragraph text-foreground mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 border border-foreground/20 rounded flex items-center justify-center hover:bg-foreground/5 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-paragraph text-foreground w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 border border-foreground/20 rounded flex items-center justify-center hover:bg-foreground/5 transition-colors"
                    disabled={
                      product.stockQuantity !== undefined &&
                      quantity >= product.stockQuantity
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded font-paragraph text-base transition-opacity ${
                isOutOfStock
                  ? 'bg-secondary/50 text-secondary-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {addedToCart ? 'Added to Cart!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {addedToCart && (
              <Link
                to="/cart"
                className="mt-4 text-base font-paragraph text-accent underline hover:opacity-70 transition-opacity"
              >
                View Cart
              </Link>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-8">
              Related Posters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="block group"
                >
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-foreground/5">
                    {relatedProduct.mainImage ? (
                      <Image
                        src={relatedProduct.mainImage}
                        alt={relatedProduct.productName || 'Product image'}
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
                    {relatedProduct.productName}
                  </h3>
                  <p className="text-base font-paragraph text-foreground font-medium">
                    ₹{relatedProduct.price?.toLocaleString('en-IN')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
