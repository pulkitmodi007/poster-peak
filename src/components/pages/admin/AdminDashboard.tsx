import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products, CustomerOrders, Users } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Package, ShoppingCart, Users as UsersIcon, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

function AdminDashboardContent() {
  const { member } = useMember();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);

    const [productsData, ordersData, usersData] = await Promise.all([
      BaseCrudService.getAll<Products>('products'),
      BaseCrudService.getAll<CustomerOrders>('orders'),
      BaseCrudService.getAll<Users>('users'),
    ]);

    const totalRevenue = ordersData.items.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    setStats({
      totalProducts: productsData.items.length,
      totalOrders: ordersData.items.length,
      totalUsers: usersData.items.length,
      totalRevenue,
    });

    setLoading(false);
  };

  if (!member?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-lg font-paragraph text-secondary mb-8">
            You don't have permission to access this page.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded font-paragraph text-base hover:opacity-90 transition-opacity"
          >
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

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      link: '/admin/orders',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: UsersIcon,
      link: '/admin/users',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: TrendingUp,
      link: '/admin/orders',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg font-paragraph text-secondary mb-12">
            Manage your e-commerce platform
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="block p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-foreground" />
                </div>
                <p className="text-sm font-paragraph text-secondary mb-2">
                  {stat.title}
                </p>
                <p className="text-3xl font-heading text-foreground">
                  {stat.value}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-3xl font-heading text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/admin/products"
              className="p-6 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <h3 className="text-xl font-heading text-foreground mb-2">
                Manage Products
              </h3>
              <p className="text-base font-paragraph text-secondary">
                Add, edit, or remove products from your catalog
              </p>
            </Link>
            <Link
              to="/admin/orders"
              className="p-6 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <h3 className="text-xl font-heading text-foreground mb-2">
                Manage Orders
              </h3>
              <p className="text-base font-paragraph text-secondary">
                View and update order statuses
              </p>
            </Link>
            <Link
              to="/admin/users"
              className="p-6 border border-foreground/10 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <h3 className="text-xl font-heading text-foreground mb-2">
                View Users
              </h3>
              <p className="text-base font-paragraph text-secondary">
                See registered users and their activity
              </p>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access the admin dashboard">
      <AdminDashboardContent />
    </MemberProtectedRoute>
  );
}
