import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Users } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, User, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

function AdminUsersContent() {
  const { member } = useMember();
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<Users>('users', [
      'orderids',
      'contactsubmissionids',
    ]);
    setUsers(
      items.sort((a, b) => {
        const dateA = a.registrationDate
          ? new Date(a.registrationDate).getTime()
          : 0;
        const dateB = b.registrationDate
          ? new Date(b.registrationDate).getTime()
          : 0;
        return dateB - dateA;
      })
    );
    setLoading(false);
  };

  if (!member?.isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[100rem] mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-heading text-foreground mb-4">Access Denied</h1>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded font-paragraph text-base"
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
            Registered Users
          </h1>
          <p className="text-lg font-paragraph text-secondary mt-2">
            {users.length} total users
          </p>
        </div>

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-foreground/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading text-foreground mb-1">
                    {user.fullName || 'Unknown User'}
                  </h3>
                  {user.isAdmin && (
                    <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-paragraph rounded">
                      Admin
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 text-sm font-paragraph text-secondary">
                {user.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}

                {user.registrationDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Joined {format(new Date(user.registrationDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}

                {user.lastLoginDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Last login {format(new Date(user.lastLoginDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-foreground/10">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-heading text-foreground">
                      {Array.isArray(user.orderids) ? user.orderids.length : 0}
                    </p>
                    <p className="text-xs font-paragraph text-secondary">Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-heading text-foreground">
                      {Array.isArray(user.contactsubmissionids)
                        ? user.contactsubmissionids.length
                        : 0}
                    </p>
                    <p className="text-xs font-paragraph text-secondary">Messages</p>
                  </div>
                </div>
              </div>

              {user.googleId && (
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-xs font-paragraph text-secondary">
                    Google ID: {user.googleId.substring(0, 20)}...
                  </p>
                </div>
              )}
            </motion.div>
          ))}

          {users.length === 0 && (
            <div className="col-span-full text-center py-12 border border-foreground/10 rounded-lg">
              <p className="text-lg font-paragraph text-secondary">No users found</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AdminUsers() {
  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access the admin panel">
      <AdminUsersContent />
    </MemberProtectedRoute>
  );
}
