import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-6">
            Shipping & Returns
          </h1>
          <p className="text-xl font-paragraph text-secondary mb-12">
            Everything you need to know about our shipping and return policies
          </p>

          {/* Shipping Information */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading text-foreground mb-8">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-6 border border-foreground/10 rounded-lg">
                <Truck className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-xl font-heading text-foreground mb-3">
                  Free Shipping
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  We offer free shipping on all orders across India. No minimum order value required.
                </p>
              </div>

              <div className="p-6 border border-foreground/10 rounded-lg">
                <Clock className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-xl font-heading text-foreground mb-3">
                  Delivery Time
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  Orders are typically delivered within 5-7 business days. You'll receive tracking information via email.
                </p>
              </div>

              <div className="p-6 border border-foreground/10 rounded-lg">
                <Package className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-xl font-heading text-foreground mb-3">
                  Packaging
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  All posters are carefully rolled and shipped in sturdy tubes to ensure they arrive in perfect condition.
                </p>
              </div>

              <div className="p-6 border border-foreground/10 rounded-lg">
                <MapPin className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-xl font-heading text-foreground mb-3">
                  Tracking
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  Track your order status from your profile page. You'll also receive email updates at each stage.
                </p>
              </div>
            </div>
          </div>

          {/* Returns Policy */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading text-foreground mb-6">
              Returns & Exchanges
            </h2>

            <div className="space-y-6 text-base font-paragraph text-secondary leading-relaxed">
              <div>
                <h3 className="text-xl font-heading text-foreground mb-3">
                  30-Day Return Policy
                </h3>
                <p>
                  We want you to be completely satisfied with your purchase. If you're not happy with your poster, you can return it within 30 days of delivery for a full refund.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-heading text-foreground mb-3">
                  Return Conditions
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posters must be in original condition, unframed and undamaged</li>
                  <li>Original packaging must be intact</li>
                  <li>Return shipping costs are the responsibility of the customer</li>
                  <li>Refunds will be processed within 5-7 business days of receiving the return</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-heading text-foreground mb-3">
                  Damaged or Defective Items
                </h3>
                <p>
                  If your poster arrives damaged or defective, please contact us within 48 hours of delivery. We'll arrange for a replacement at no additional cost, including return shipping.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-heading text-foreground mb-3">
                  How to Initiate a Return
                </h3>
                <p>
                  Contact our customer service team at hello@posterized.com with your order number and reason for return. We'll provide you with return instructions and a return authorization number.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="p-8 bg-foreground/5 rounded-lg">
            <h3 className="text-2xl font-heading text-foreground mb-4">
              Questions?
            </h3>
            <p className="text-base font-paragraph text-secondary mb-4">
              If you have any questions about shipping or returns, please don't hesitate to contact us.
            </p>
            <p className="text-base font-paragraph text-foreground">
              Email: hello@posterized.com<br />
              Phone: +91 98765 43210
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
