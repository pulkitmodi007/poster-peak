import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { CustomerOrders } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, Edit, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

function AdminOrdersContent() {
  const { member } = useMember();
  const [orders, setOrders] = useState<CustomerOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<CustomerOrders>('orders');
    setOrders(
      items.sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      })
    );
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId: string) => {
    await BaseCrudService.update('orders', {
      _id: orderId,
      shippingStatus: statusUpdate,
    });
    setEditingOrder(null);
    setStatusUpdate('');
    loadOrders();
  };

  const startEdit = (order: CustomerOrders) => {
    setEditingOrder(order._id);
    setStatusUpdate(order.shippingStatus || 'Processing');
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-accent/10 text-accent';
      case 'Shipped':
        return 'bg-accent/10 text-accent';
      case 'Processing':
        return 'bg-secondary/10 text-secondary';
      case 'Cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-secondary/10 text-secondary';
    }
  };

  if (!member?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading text-foreground mb-4">Access Denied</h1>
          <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded font-paragraph text-base">
            Go Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-base font-paragraph text-secondary hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-5xl md:text-6xl font-heading text-foreground">
            Manage Orders
          </h1>
          <p className="text-lg font-paragraph text-secondary mt-2">
            {orders.length} total orders
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 border border-foreground/10 rounded-lg"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-heading text-foreground">
                      Order #{order.orderNumber}
                    </h3>
                    {editingOrder === order._id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                          className="px-3 py-1 border border-foreground/20 rounded text-sm font-paragraph focus:outline-none focus:border-foreground"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleStatusUpdate(order._id)}
                          className="p-1 hover:bg-accent/10 rounded transition-colors"
                        >
                          <Check className="w-4 h-4 text-accent" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded text-sm font-paragraph ${getStatusColor(
                            order.shippingStatus
                          )}`}
                        >
                          {order.shippingStatus}
                        </span>
                        <button
                          onClick={() => startEdit(order)}
                          className="p-1 hover:bg-foreground/5 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-foreground" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-paragraph text-secondary">
                    <div>
                      <p className="mb-1">
                        <span className="font-medium text-foreground">Customer:</span>{' '}
                        {order.customerName}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium text-foreground">Email:</span>{' '}
                        {order.customerEmail}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Date:</span>{' '}
                        {order.orderDate &&
                          format(new Date(order.orderDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div>
                      {order.shippingAddress && (
                        <p className="mb-1">
                          <span className="font-medium text-foreground">Address:</span>{' '}
                          {order.shippingAddress}
                        </p>
                      )}
                      {order.razorpayTransactionId && (
                        <p className="mb-1">
                          <span className="font-medium text-foreground">Transaction:</span>{' '}
                          {order.razorpayTransactionId}
                        </p>
                      )}
                      <p>
                        <span className="font-medium text-foreground">Payment:</span>{' '}
                        <span
                          className={
                            order.paymentStatus === 'Paid'
                              ? 'text-accent'
                              : 'text-destructive'
                          }
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-heading text-foreground">
                    ₹{order.totalAmount?.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12 border border-foreground/10 rounded-lg">
              <p className="text-lg font-paragraph text-secondary">No orders found</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AdminOrders() {
  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access the admin panel">
      <AdminOrdersContent />
    </MemberProtectedRoute>
  );
}
