import { useState, useEffect } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { CustomerOrders } from '@/entities';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { User, Package, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Image } from '@/components/ui/image';

function ProfilePageContent() {
  const { member } = useMember();
  const [orders, setOrders] = useState<CustomerOrders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [member]);

  const loadOrders = async () => {
    if (!member?.loginEmail) return;

    setLoading(true);
    const { items } = await BaseCrudService.getAll<CustomerOrders>('orders');
    const userOrders = items.filter(
      (order) => order.customerEmail === member.loginEmail
    );
    setOrders(userOrders.sort((a, b) => {
      const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
      const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
      return dateB - dateA;
    }));
    setLoading(false);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-accent';
      case 'Shipped':
        return 'text-accent';
      case 'Processing':
        return 'text-secondary';
      case 'Cancelled':
        return 'text-destructive';
      default:
        return 'text-secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-12">
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1 p-8 border border-foreground/10 rounded-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              {member?.profile?.photo?.url ? (
                <Image src={member.profile.photo.url} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-foreground" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-heading text-foreground">
                  {member?.profile?.nickname ||
                    member?.contact?.firstName ||
                    'User'}
                </h2>
                {member?.isAdmin && (
                  <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-paragraph rounded mt-1">
                    Admin
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-sm font-paragraph text-secondary mb-1">Email</p>
                  <p className="text-base font-paragraph text-foreground">
                    {member?.loginEmail || 'Not provided'}
                  </p>
                </div>
              </div>

              {member?.contact?.phones?.[0] && (
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-paragraph text-secondary mb-1">Phone</p>
                    <p className="text-base font-paragraph text-foreground">
                      {member.contact.phones[0]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Orders Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 p-8 border border-foreground/10 rounded-lg"
          >
            <h2 className="text-3xl font-heading text-foreground mb-6">
              Order Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-foreground/5 rounded-lg">
                <p className="text-sm font-paragraph text-secondary mb-2">Total Orders</p>
                <p className="text-3xl font-heading text-foreground">{orders.length}</p>
              </div>
              <div className="p-6 bg-foreground/5 rounded-lg">
                <p className="text-sm font-paragraph text-secondary mb-2">Processing</p>
                <p className="text-3xl font-heading text-foreground">
                  {orders.filter((o) => o.shippingStatus === 'Processing').length}
                </p>
              </div>
              <div className="p-6 bg-foreground/5 rounded-lg">
                <p className="text-sm font-paragraph text-secondary mb-2">Delivered</p>
                <p className="text-3xl font-heading text-foreground">
                  {orders.filter((o) => o.shippingStatus === 'Delivered').length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-3xl font-heading text-foreground mb-6">Order History</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 border border-foreground/10 rounded-lg">
              <Package className="w-12 h-12 text-secondary mx-auto mb-4" />
              <p className="text-lg font-paragraph text-secondary">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-paragraph text-foreground font-medium">
                          Order #{order.orderNumber}
                        </h3>
                        <span
                          className={`text-sm font-paragraph ${getStatusColor(
                            order.shippingStatus
                          )}`}
                        >
                          {order.shippingStatus}
                        </span>
                      </div>
                      <p className="text-sm font-paragraph text-secondary mb-1">
                        {order.orderDate &&
                          format(new Date(order.orderDate), 'MMMM dd, yyyy')}
                      </p>
                      {order.shippingAddress && (
                        <p className="text-sm font-paragraph text-secondary">
                          {order.shippingAddress}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-paragraph text-foreground font-medium">
                        ₹{order.totalAmount?.toLocaleString('en-IN')}
                      </p>
                      {order.razorpayTransactionId && (
                        <p className="text-xs font-paragraph text-secondary mt-1">
                          {order.razorpayTransactionId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MemberProtectedRoute>
      <ProfilePageContent />
    </MemberProtectedRoute>
  );
}
