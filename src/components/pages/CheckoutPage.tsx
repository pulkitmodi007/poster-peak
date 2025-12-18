import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { CustomerOrders } from '@/entities';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { motion } from 'framer-motion';
import { CreditCard, Truck, User } from 'lucide-react';

function CheckoutPageContent() {
  const navigate = useNavigate();
  const { member } = useMember();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: member?.contact?.firstName && member?.contact?.lastName 
      ? `${member.contact.firstName} ${member.contact.lastName}` 
      : '',
    email: member?.loginEmail || '',
    phone: member?.contact?.phones?.[0] || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const totalPrice = getTotalPrice();

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const orderNumber = `ORD-${Date.now()}`;
    const razorpayTransactionId = `razorpay_${Math.random().toString(36).substring(7)}`;

    const orderData: Partial<CustomerOrders> = {
      _id: crypto.randomUUID(),
      orderNumber,
      customerName: shippingInfo.fullName,
      customerEmail: shippingInfo.email,
      orderDate: new Date().toISOString(),
      totalAmount: totalPrice,
      shippingStatus: 'Processing',
      paymentStatus: 'Paid',
      razorpayTransactionId,
      shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
    };

    await BaseCrudService.create('orders', orderData);

    clearCart();
    setProcessing(false);
    navigate('/order-confirmation', { 
      state: { orderNumber, razorpayTransactionId } 
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const steps = [
    { number: 1, title: 'Shipping', icon: Truck },
    { number: 2, title: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-12">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.number
                        ? 'bg-foreground border-foreground text-background'
                        : 'border-foreground/20 text-secondary'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-paragraph text-secondary mt-2">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-0.5 mx-4 transition-colors ${
                      currentStep > step.number
                        ? 'bg-foreground'
                        : 'bg-foreground/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Forms */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-heading text-foreground mb-6">
                  Shipping Information
                </h2>
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-foreground mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.pincode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground px-6 py-4 rounded font-paragraph text-base hover:opacity-90 transition-opacity"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-heading text-foreground mb-6">
                  Payment Information
                </h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-paragraph text-foreground mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-paragraph text-foreground mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-paragraph text-foreground mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border border-foreground/20 text-foreground px-6 py-4 rounded font-paragraph text-base hover:bg-foreground/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="flex-1 bg-primary text-primary-foreground px-6 py-4 rounded font-paragraph text-base hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {processing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 border border-foreground/10 rounded-lg">
              <h2 className="text-2xl font-heading text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm font-paragraph">
                    <span className="text-secondary">
                      {item.product.productName} x {item.quantity}
                    </span>
                    <span className="text-foreground">
                      ₹{((item.product.price || 0) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-foreground/10">
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
                <div className="pt-3 border-t border-foreground/10">
                  <div className="flex justify-between text-xl font-paragraph font-medium">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to proceed with checkout">
      <CheckoutPageContent />
    </MemberProtectedRoute>
  );
}
