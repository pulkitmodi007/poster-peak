import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const { orderNumber, razorpayTransactionId } = location.state || {};

  if (!orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
          
          <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg font-paragraph text-secondary mb-8">
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div className="bg-foreground/5 p-8 rounded-lg mb-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-paragraph text-secondary mb-1">Order Number</p>
                <p className="text-xl font-paragraph text-foreground font-medium">
                  {orderNumber}
                </p>
              </div>
              {razorpayTransactionId && (
                <div>
                  <p className="text-sm font-paragraph text-secondary mb-1">
                    Transaction ID
                  </p>
                  <p className="text-base font-paragraph text-foreground">
                    {razorpayTransactionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-base font-paragraph text-secondary mb-8">
            We've sent a confirmation email with your order details. You can track your order status from your profile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/profile"
              className="bg-primary text-primary-foreground px-8 py-3 rounded font-paragraph text-base hover:opacity-90 transition-opacity"
            >
              View Orders
            </Link>
            <Link
              to="/shop"
              className="border border-foreground/20 text-foreground px-8 py-3 rounded font-paragraph text-base hover:bg-foreground/5 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
