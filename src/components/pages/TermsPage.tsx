import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-base font-paragraph text-secondary mb-12">
            Last updated: December 2024
          </p>

          <div className="space-y-8 text-base font-paragraph text-secondary leading-relaxed">
            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Agreement to Terms
              </h2>
              <p>
                By accessing and using Posterized, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Use of Our Service
              </h2>
              <p className="mb-3">You agree to use our service only for lawful purposes and in accordance with these terms. You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the service in any way that violates applicable laws or regulations</li>
                <li>Impersonate or attempt to impersonate Posterized or any other person or entity</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                <li>Use any automated system to access the service without our permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Product Information
              </h2>
              <p>
                We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, colors, or other content available on our website are accurate, complete, reliable, current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Pricing and Payment
              </h2>
              <p>
                All prices are listed in Indian Rupees (INR) and are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including pricing errors. Payment is processed securely through Razorpay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Orders and Delivery
              </h2>
              <p>
                By placing an order, you are making an offer to purchase products. We reserve the right to accept or decline your order. Delivery times are estimates and we are not responsible for delays caused by shipping carriers or other factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Posterized or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                User Accounts
              </h2>
              <p>
                When you create an account, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Returns and Refunds
              </h2>
              <p>
                Our return and refund policy is outlined in our Shipping & Returns page. Please review this policy before making a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Posterized shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Disclaimer of Warranties
              </h2>
              <p>
                Our service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on this page. Your continued use of the service after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-3 text-foreground">
                Email: hello@posterized.com<br />
                Phone: +91 98765 43210<br />
                Address: 123 Design Street, Mumbai, Maharashtra 400001, India
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
