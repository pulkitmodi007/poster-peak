// HPI 1.5-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, ArrowUpRight, Minus } from 'lucide-react';

// --- CANONICAL DATA SOURCES ---
// Preserving original data structures and content
const CATEGORIES = [
  { 
    name: 'Art', 
    id: 'art',
    image: 'category-art', 
    description: 'Contemporary & Classic expressions for the modern soul.',
    link: '/shop?category=Art'
  },
  { 
    name: 'Movies', 
    id: 'movies',
    image: 'category-movies', 
    description: 'Iconic cinema moments captured in minimalist glory.',
    link: '/shop?category=Movies'
  },
  { 
    name: 'Minimalist', 
    id: 'minimalist',
    image: 'category-minimal', 
    description: 'The essence of form. Clean, simple, and profound.',
    link: '/shop?category=Minimalist'
  }
];

const FEATURED_PRODUCTS = [1, 2, 3, 4, 5, 6].map(id => ({
  id,
  title: `Poster Title ${id}`,
  price: '₹999',
  image: `featured-${id}`,
  link: `/product/${id}`
}));

// --- UTILITY COMPONENTS ---

// Mandatory Intersection Observer Component for Reveals
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, threshold = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`${className || ''} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Parallax Image Component
const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          width={1200}
        />
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-paragraph selection:bg-foreground selection:text-background overflow-clip">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground to-transparent" />
        </div>

        <div className="max-w-[120rem] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-foreground/50"></span>
                <span className="text-sm uppercase tracking-[0.2em] text-secondary font-medium">Est. 2024</span>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-heading leading-[0.9] tracking-tighter mb-8">
                POSTER<br/>IZED<span className="text-accent">.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl md:text-2xl text-secondary max-w-xl leading-relaxed mb-12">
                Curated art for the modern wall. A silent gallery of minimalist expression.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-6">
                <Link 
                  to="/shop"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-foreground text-background overflow-hidden transition-all hover:bg-accent"
                >
                  <span className="relative z-10 flex items-center gap-2 font-medium">
                    Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link 
                  to="/about"
                  className="group inline-flex items-center justify-center px-8 py-4 border border-foreground/20 hover:border-foreground transition-colors"
                >
                  <span className="font-medium">Our Philosophy</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Hero Image with Parallax */}
          <div className="lg:col-span-5 h-[60vh] lg:h-[80vh] w-full relative mt-12 lg:mt-0">
            <Reveal delay={400} className="w-full h-full">
              <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 w-full h-full border border-foreground/10 translate-x-4 translate-y-4 z-0" />
                <ParallaxImage 
                  src="https://static.wixstatic.com/media/ca33e9_5bc5c3b7a04b483e8c76ab5fcf8a82bd~mv2.png?originWidth=1152&originHeight=704"
                  alt="Minimalist Hero Poster"
                  className="w-full h-full relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs uppercase tracking-widest text-secondary/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-foreground to-transparent" />
        </motion.div>
      </section>

      {/* --- MANIFESTO SECTION --- */}
      <section className="py-32 px-4 bg-foreground text-background relative overflow-hidden">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="md:sticky md:top-32 h-fit">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-heading leading-tight mb-8">
                  The Art of <br/>
                  <span className="text-secondary-foreground/50">Reduction.</span>
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="w-24 h-1 bg-accent mb-8" />
              </Reveal>
            </div>
            
            <div className="space-y-12 text-lg md:text-xl leading-relaxed text-secondary-foreground/80 font-light">
              <Reveal delay={200}>
                <p>
                  In a world of noise, we choose silence. Posterized is not just a store; it is a curation of clarity. We believe that the space you inhabit shapes the thoughts you think.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p>
                  Our collection is inspired by the principles of Dieter Rams: good design is as little design as possible. We strip away the non-essential to reveal the pure form, the striking color, the bold idea.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p>
                  Every print is a window into a calmer, more structured world. Printed on museum-grade archival paper, these are not temporary decorations, but permanent fixtures of your environment.
                </p>
              </Reveal>
              
              <Reveal delay={500}>
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10">
                  <div>
                    <h3 className="text-3xl font-heading mb-2">12+</h3>
                    <p className="text-sm text-secondary-foreground/60">Curated Collections</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading mb-2">5k+</h3>
                    <p className="text-sm text-secondary-foreground/60">Walls Transformed</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- STICKY CATEGORIES SECTION --- */}
      <section className="relative bg-background">
        {CATEGORIES.map((category, index) => (
          <div key={category.id} className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden border-t border-foreground/5 bg-background">
            {/* Left Content - Sticky relative to container */}
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 bg-background/95 backdrop-blur-sm md:bg-transparent">
              <div className="max-w-xl">
                <Reveal>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
                    Collection 0{index + 1}
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="text-6xl md:text-8xl font-heading mb-6 tracking-tighter">
                    {category.name}
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <p className="text-xl text-secondary mb-8 max-w-md">
                    {category.description}
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <Link 
                    to={category.link}
                    className="inline-flex items-center gap-3 text-lg font-medium hover:text-accent transition-colors group"
                  >
                    View Collection
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </Link>
                </Reveal>
              </div>
            </div>

            {/* Right Image - Full Bleed */}
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-foreground/5 z-10 mix-blend-multiply pointer-events-none" />
              <Image
                src={'https://static.wixstatic.com/media/ca33e9_34c7f9d336e3421d88cb93ffa3c4f546~mv2.png?originWidth=960&originHeight=960'}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                width={1000}
              />
              {/* Decorative Number */}
              <div className="absolute bottom-8 right-8 z-20 text-9xl font-heading text-white/10 pointer-events-none select-none">
                {index + 1}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* --- FEATURED HORIZONTAL SCROLL --- */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-4 mb-16 flex justify-between items-end">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-heading">Selected Works</h2>
          </Reveal>
          <Reveal delay={100}>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-secondary hover:text-foreground transition-colors">
              View All Posters <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex gap-8 px-4 md:px-12 w-max">
            {FEATURED_PRODUCTS.map((product, i) => (
              <div 
                key={product.id} 
                className="w-[300px] md:w-[400px] group relative"
              >
                <Reveal delay={i * 100} className="h-full">
                  <Link to={product.link} className="block h-full">
                    <div className="aspect-[3/4] overflow-hidden bg-secondary/5 mb-6 relative">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />
                      <Image
                        src={'https://static.wixstatic.com/media/ca33e9_f9915bcc097b4f8fbc348864b7ee21f3~mv2.png?originWidth=384&originHeight=512'}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                      />
                      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-2 rounded-full shadow-lg">
                        <ArrowUpRight className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start border-t border-foreground/10 pt-4">
                      <div>
                        <h3 className="text-xl font-heading mb-1 group-hover:text-accent transition-colors">{product.title}</h3>
                        <p className="text-sm text-secondary">Limited Edition</p>
                      </div>
                      <span className="font-medium font-heading">{product.price}</span>
                    </div>
                  </Link>
                </Reveal>
              </div>
            ))}
            
            {/* "View All" Card */}
            <div className="w-[300px] md:w-[400px] flex items-center justify-center bg-foreground/5">
              <Link to="/shop" className="text-center group">
                <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-foreground group-hover:text-background transition-all">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <span className="text-xl font-heading">View All Works</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT / SPLIT SECTION --- */}
      <section className="py-32 px-4 border-t border-foreground/5">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal>
                <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
                  <ParallaxImage 
                    src="https://static.wixstatic.com/media/ca33e9_f5cb030a6960429a98bb5c2d1055f2d5~mv2.png?originWidth=1152&originHeight=896"
                    alt="Interior Design Studio"
                    className="w-full h-full"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent text-white rounded-full flex items-center justify-center z-20 hidden md:flex">
                    <span className="font-heading text-center text-sm leading-tight">Premium<br/>Quality<br/>Prints</span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-heading mb-8">
                  Quality in <br/>Every Detail.
                </h2>
              </Reveal>
              
              <div className="space-y-8">
                {[
                  { title: 'Archival Paper', desc: 'Heavyweight, matte finish paper that lasts a lifetime.' },
                  { title: 'Giclée Printing', desc: '12-color ink system for deep blacks and vibrant hues.' },
                  { title: 'Sustainable', desc: 'Eco-friendly materials and plastic-free packaging.' }
                ].map((item, idx) => (
                  <Reveal key={idx} delay={idx * 100}>
                    <div className="flex gap-6 group cursor-default">
                      <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                        <span className="font-heading">{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-heading mb-2">{item.title}</h3>
                        <p className="text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={400}>
                <div className="mt-12">
                  <Link 
                    to="/about"
                    className="text-lg font-medium underline decoration-1 underline-offset-8 hover:text-accent transition-colors"
                  >
                    Read our full story
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER / FOOTER CTA --- */}
      <section className="py-32 px-4 bg-foreground text-background text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
           <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-heading mb-8">Join the Gallery</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xl text-secondary-foreground/70 mb-12">
              Subscribe for exclusive drops, artist interviews, and minimalist inspiration.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border-b border-secondary-foreground/30 py-4 px-2 text-lg focus:outline-none focus:border-accent transition-colors placeholder:text-secondary-foreground/30"
              />
              <button className="px-8 py-4 bg-white text-black font-heading hover:bg-accent hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* --- CUSTOM STYLES FOR SCROLLBAR HIDING --- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}