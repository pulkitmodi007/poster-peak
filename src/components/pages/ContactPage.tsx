import { useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submissionData: Partial<ContactSubmissions> = {
      _id: crypto.randomUUID(),
      senderName: formData.senderName,
      senderEmail: formData.senderEmail,
      subject: formData.subject,
      message: formData.message,
      submissionDateTime: new Date().toISOString(),
    };

    await BaseCrudService.create('contactsubmissions', submissionData);

    setSubmitted(true);
    setSubmitting(false);
    setFormData({
      senderName: '',
      senderEmail: '',
      subject: '',
      message: '',
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-xl font-paragraph text-secondary max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-heading text-foreground mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-accent/10 border border-accent rounded">
                <p className="text-base font-paragraph text-foreground">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-paragraph text-foreground mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.senderName}
                  onChange={(e) =>
                    setFormData({ ...formData, senderName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-paragraph text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.senderEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, senderEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-paragraph text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-paragraph text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-foreground/20 rounded font-paragraph text-base focus:outline-none focus:border-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground px-6 py-4 rounded font-paragraph text-base hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-heading text-foreground mb-6">
              Contact Information
            </h2>

            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-foreground/5 rounded flex items-center justify-center">
                  <Mail className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-1">Email</h3>
                  <p className="text-base font-paragraph text-secondary">
                    hello@posterized.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-foreground/5 rounded flex items-center justify-center">
                  <Phone className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-1">Phone</h3>
                  <p className="text-base font-paragraph text-secondary">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-foreground/5 rounded flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-heading text-foreground mb-1">Address</h3>
                  <p className="text-base font-paragraph text-secondary">
                    123 Design Street<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-foreground/5 rounded-lg">
              <h3 className="text-2xl font-heading text-foreground mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-base font-paragraph text-secondary">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
