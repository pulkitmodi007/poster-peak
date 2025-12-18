import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image } from '@/components/ui/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-[100rem] mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground mb-6">
            About Posterized
          </h1>
          <p className="text-xl font-paragraph text-secondary max-w-3xl mx-auto">
            Curating minimalist art for modern spaces
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Founded with a passion for minimalist design, Posterized brings together carefully curated artwork that transforms spaces. We believe that less is more, and every piece in our collection reflects this philosophy.
            </p>
            <p className="text-lg font-paragraph text-secondary mb-6 leading-relaxed">
              Our journey began with a simple idea: to make high-quality, thoughtfully designed posters accessible to everyone who appreciates clean aesthetics and timeless art.
            </p>
            <p className="text-lg font-paragraph text-secondary leading-relaxed">
              Each poster is printed on premium paper using archival-quality inks, ensuring that your art will look stunning for years to come.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://static.wixstatic.com/media/ca33e9_bb53433db84843468a42ccdd2f70f573~mv2.png?originWidth=576&originHeight=384"
              alt="Our workspace with minimalist posters"
              className="w-full rounded-lg"
              width={600}
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-heading text-foreground text-center mb-16"
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Quality First',
                description: 'Premium materials and printing techniques ensure every poster meets our high standards.',
              },
              {
                title: 'Timeless Design',
                description: 'We curate pieces that transcend trends, focusing on enduring aesthetic appeal.',
              },
              {
                title: 'Sustainable',
                description: 'Eco-friendly materials and responsible production practices guide our process.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-2xl font-heading text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://static.wixstatic.com/media/ca33e9_98624900d0c643c2b7a594e7cebad46b~mv2.png?originWidth=576&originHeight=384"
              alt="Printing process"
              className="w-full rounded-lg"
              width={600}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-heading text-foreground mb-6">
              Our Process
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-heading text-foreground mb-2">
                  1. Curation
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  Each design is carefully selected for its aesthetic merit and alignment with minimalist principles.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-heading text-foreground mb-2">
                  2. Production
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  Printed using archival-quality inks on premium paper stock for lasting beauty.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-heading text-foreground mb-2">
                  3. Delivery
                </h3>
                <p className="text-base font-paragraph text-secondary leading-relaxed">
                  Carefully packaged and shipped to arrive in perfect condition at your doorstep.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
