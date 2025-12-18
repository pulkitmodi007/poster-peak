import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10 mt-24">
      <div className="max-w-[100rem] mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading text-foreground mb-4">POSTERIZED</h3>
            <p className="text-base font-paragraph text-secondary leading-relaxed">
              Curated art for your walls. Minimalist design, maximum impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading text-foreground mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop?category=Art" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  Art Posters
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Movies" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  Movie Posters
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Minimalist" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  Minimalist
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-heading text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base font-paragraph text-secondary hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-heading text-foreground mb-4">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-foreground/20 rounded hover:bg-foreground hover:text-background transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-foreground/20 rounded hover:bg-foreground hover:text-background transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-foreground/20 rounded hover:bg-foreground hover:text-background transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm font-paragraph text-secondary">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-paragraph text-secondary">
              © {new Date().getFullYear()} Posterized. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm font-paragraph text-secondary hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm font-paragraph text-secondary hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
