import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-4 py-24">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h1 className="text-4xl font-heading text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg font-paragraph text-secondary mb-8">
              Add some posters to get started
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded font-paragraph text-base hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex gap-6 p-6 border border-foreground/10 rounded-lg"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product._id}`}
                    className="flex-shrink-0 w-24 h-32 rounded overflow-hidden bg-foreground/5"
                  >
                    {item.product.mainImage ? (
                      <Image
                        src={item.product.mainImage}
                        alt={item.product.productName || 'Product'}
                        className="w-full h-full object-cover"
                        width={96}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-secondary text-xs">
                        No Image
                      </div>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.product._id}`}
                        className="text-lg font-paragraph text-foreground hover:text-secondary transition-colors"
                      >
                        {item.product.productName}
                      </Link>
                      {item.product.category && (
                        <p className="text-sm font-paragraph text-secondary mt-1">
                          {item.product.category}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-foreground/20 rounded flex items-center justify-center hover:bg-foreground/5 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-base font-paragraph text-foreground w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-foreground/20 rounded flex items-center justify-center hover:bg-foreground/5 transition-colors"
                          disabled={
                            item.product.stockQuantity !== undefined &&
                            item.quantity >= item.product.stockQuantity
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-lg font-paragraph text-foreground font-medium">
                        ₹{((item.product.price || 0) * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="flex-shrink-0 p-2 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 border border-foreground/10 rounded-lg">
              <h2 className="text-2xl font-heading text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base font-paragraph">
                  <span className="text-secondary">Subtotal</span>
                  <span className="text-foreground">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-base font-paragraph">
                  <span className="text-secondary">Shipping</span>
                  <span className="text-foreground">Free</span>
                </div>
                <div className="pt-4 border-t border-foreground/10">
                  <div className="flex justify-between text-xl font-paragraph font-medium">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-primary text-primary-foreground text-center px-6 py-4 rounded font-paragraph text-base hover:opacity-90 transition-opacity mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="block w-full text-center border border-foreground/20 text-foreground px-6 py-4 rounded font-paragraph text-base hover:bg-foreground/5 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
