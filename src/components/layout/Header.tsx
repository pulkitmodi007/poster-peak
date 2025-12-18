import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useMember } from '@/integrations';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, actions } = useMember();
  const { items } = useCartStore();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
      <div className="max-w-[100rem] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading text-foreground">
            POSTERIZED
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-paragraph transition-colors ${
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-secondary hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/shop" className="p-2 hover:opacity-70 transition-opacity">
              <Search className="w-5 h-5 text-foreground" />
            </Link>
            
            <Link to="/cart" className="p-2 hover:opacity-70 transition-opacity relative">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-paragraph">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="p-2 hover:opacity-70 transition-opacity">
                  <User className="w-5 h-5 text-foreground" />
                </Link>
                {member?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-paragraph text-accent hover:opacity-70 transition-opacity"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={actions.logout}
                  className="text-sm font-paragraph text-secondary hover:text-foreground transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={actions.login}
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-paragraph hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-foreground/10">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-paragraph transition-colors ${
                    isActive(link.path)
                      ? 'text-foreground'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <Link 
                  to="/cart" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-paragraph text-foreground"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({cartItemCount})
                </Link>
              </div>

              {isAuthenticated ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-foreground/10">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-paragraph text-foreground"
                  >
                    Profile
                  </Link>
                  {member?.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-paragraph text-accent"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      actions.logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-base font-paragraph text-secondary text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    actions.login();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded text-base font-paragraph w-full"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
