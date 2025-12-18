import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-base font-paragraph text-secondary mb-12">
            Last updated: December 2024
          </p>

          <div className="space-y-8 text-base font-paragraph text-secondary leading-relaxed">
            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Introduction
              </h2>
              <p>
                At Posterized, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website and make purchases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Information We Collect
              </h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Order history and preferences</li>
                <li>Website usage data and cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and services</li>
                <li>Send promotional emails (with your consent)</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All payment transactions are processed through secure payment gateways and we do not store credit card information on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Third-Party Services
              </h2>
              <p className="mb-3">We work with trusted third-party service providers:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment processing: Razorpay</li>
                <li>Authentication: Google OAuth</li>
                <li>Hosting and infrastructure: Vercel</li>
                <li>Image storage: Cloudinary</li>
              </ul>
              <p className="mt-3">
                These providers have their own privacy policies and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Cookies
              </h2>
              <p>
                We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Your Rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Children's Privacy
              </h2>
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-foreground mb-4">
                Contact Us
              </h2>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us at:
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
