import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

function AdminProductsContent() {
  const { member } = useMember();
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [formData, setFormData] = useState<Partial<Products>>({
    productName: '',
    description: '',
    price: 0,
    category: 'Art',
    mainImage: '',
    sku: '',
    stockQuantity: 0,
    isFeatured: false,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<Products>('products');
    setProducts(items);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      await BaseCrudService.update('products', {
        _id: editingProduct._id,
        ...formData,
      });
    } else {
      await BaseCrudService.create('products', {
        _id: crypto.randomUUID(),
        ...formData,
      });
    }

    resetForm();
    loadProducts();
  };

  const handleEdit = (product: Products) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      description: product.description,
      price: product.price,
      category: product.category,
      mainImage: product.mainImage,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      isFeatured: product.isFeatured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await BaseCrudService.delete('products', id);
      loadProducts();
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      productName: '',
      description: '',
      price: 0,
      category: 'Art',
      mainImage: '',
      sku: '',
      stockQuantity: 0,
      isFeatured: false,
    });
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-base font-paragraph text-secondary hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-5xl md:text-6xl font-heading text-foreground">
              Manage Products
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-paragraph text-base hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-8 border border-foreground/10 rounded-lg"
          >
            <h2 className="text-2xl font-heading text-foreground mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-paragraph text-foreground mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-paragraph text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                  >
                    <option value="Art">Art</option>
                    <option value="Movies">Movies</option>
                    <option value="Minimalist">Minimalist</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-paragraph text-foreground mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-paragraph text-foreground mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseFloat(e.target.value) })
                    }
                    className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-paragraph text-foreground mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-paragraph text-foreground mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-paragraph text-foreground mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.mainImage}
                  onChange={(e) =>
                    setFormData({ ...formData, mainImage: e.target.value })
                  }
                  placeholder="https://static.wixstatic.com/media/ca33e9_8741a3badbba4fa98db7ec9f11929680~mv2.png?originWidth=192&originHeight=320"
                  className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="isFeatured" className="text-base font-paragraph text-foreground">
                  Featured Product
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded font-paragraph text-base hover:opacity-90 transition-opacity"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-foreground/20 text-foreground px-6 py-3 rounded font-paragraph text-base hover:bg-foreground/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-6 border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 h-32 rounded overflow-hidden bg-foreground/5">
                  {product.mainImage ? (
                    <Image
                      src={product.mainImage}
                      alt={product.productName || 'Product'}
                      className="w-full h-full object-cover"
                      width={96}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary text-xs">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-heading text-foreground mb-2">
                        {product.productName}
                      </h3>
                      <p className="text-sm font-paragraph text-secondary mb-2">
                        {product.category} • SKU: {product.sku || 'N/A'}
                      </p>
                      {product.description && (
                        <p className="text-base font-paragraph text-secondary mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-base font-paragraph">
                        <span className="text-foreground font-medium">
                          ₹{product.price?.toLocaleString('en-IN')}
                        </span>
                        <span className="text-secondary">
                          Stock: {product.stockQuantity || 0}
                        </span>
                        {product.isFeatured && (
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-foreground/5 rounded transition-colors"
                      >
                        <Edit className="w-5 h-5 text-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 hover:bg-destructive/10 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AdminProducts() {
  return (
    <MemberProtectedRoute messageToSignIn="Please sign in to access the admin panel">
      <AdminProductsContent />
    </MemberProtectedRoute>
  );
}
