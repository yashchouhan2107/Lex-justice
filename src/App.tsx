/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, useMotionValueEvent } from 'motion/react';
import { Scale, Shield, Gavel, Briefcase, ChevronRight, Mail, Phone, MapPin, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const sections = ['expertise', 'about', 'cases', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tighter text-white hover:text-accent transition-colors"
        >
          LEX<span className="text-accent">&</span>JUSTICE
        </motion.a>
        
        <div className="hidden md:flex space-x-4 text-sm uppercase tracking-widest font-medium">
          {['Expertise', 'About', 'Cases', 'Contact'].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <motion.a
                key={item}
                href={`#${id}`}
                whileHover={!isActive ? { color: '#c5a059' } : {}}
                className={`relative py-2 px-6 group transition-colors duration-300 ${
                  isActive ? 'text-black font-bold' : 'text-white'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
                {!isActive && (
                  <motion.span 
                    className="absolute bottom-1 left-6 right-6 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-primary border-t border-white/5 p-6 flex flex-col space-y-4 md:hidden text-white shadow-xl"
        >
          {['Expertise', 'About', 'Cases', 'Contact'].map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a 
                key={item} 
                href={`#${id}`} 
                onClick={() => setIsOpen(false)} 
                className={`text-lg font-serif transition-colors ${isActive ? 'text-accent' : ''}`}
              >
                {item}
              </a>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary text-secondary pt-32">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
          alt="Law Office"
          className="w-full h-full object-cover opacity-30 grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-10 text-center px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-accent uppercase tracking-[0.3em] text-sm mb-6 block font-medium">Integrity • Excellence • Justice</span>
          <h1 className="text-6xl md:text-9xl font-serif mb-8 leading-tight">
            Defending Your <br />
            <span className="italic">Future.</span>
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-accent mx-auto mb-12"
          />
          <p className="max-w-xl mx-auto text-lg md:text-xl text-secondary/70 font-light leading-relaxed">
            A boutique law firm dedicated to providing sophisticated legal solutions for complex challenges.
          </p>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent"
      >
        <div className="w-px h-16 bg-accent/30 mx-auto relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent" />
        </div>
      </motion.div>
    </section>
  );
};

const ExpertiseCard = ({ icon: Icon, title, description, index }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group p-10 border border-primary/5 hover:border-accent/30 transition-all duration-500 bg-white/50 backdrop-blur-sm"
    >
      <div className="mb-8 text-accent group-hover:scale-110 transition-transform duration-500">
        <Icon size={40} strokeWidth={1} />
      </div>
      <h3 className="text-2xl font-serif mb-4">{title}</h3>
      <p className="text-primary/60 leading-relaxed mb-6">{description}</p>
      <a href="#" className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-accent group-hover:translate-x-2 transition-transform">
        Learn More <ChevronRight size={16} className="ml-2" />
      </a>
    </motion.div>
  );
};

const Expertise = () => {
  const services = [
    { icon: Scale, title: "Corporate Law", description: "Strategic legal counsel for businesses, from startups to established enterprises." },
    { icon: Shield, title: "Criminal Defense", description: "Vigorous protection of your rights and freedom with a track record of success." },
    { icon: Gavel, title: "Civil Litigation", description: "Expert representation in complex disputes, ensuring your voice is heard in court." },
    { icon: Briefcase, title: "Intellectual Property", description: "Safeguarding your innovations and creative works in a global marketplace." },
  ];

  return (
    <section id="expertise" className="py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Our Specialization</span>
            <h2 className="text-5xl md:text-7xl font-serif">Legal Excellence <br /><span className="italic">Tailored for You.</span></h2>
          </div>
          <p className="text-primary/50 max-w-xs mt-8 md:mt-0">
            We combine deep legal knowledge with a personal approach to achieve the best possible outcomes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 overflow-hidden">
          {services.map((service, i) => (
            <ExpertiseCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="about" className="py-32 px-6 bg-primary text-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          style={{ scale, opacity }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1000" 
            alt="Lead Advocate"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[20px] border-primary/20 pointer-events-none" />
        </motion.div>
        
        <div ref={ref}>
          <span className="text-accent uppercase tracking-widest text-xs font-bold mb-6 block">The Firm</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight">A Legacy of <br /><span className="italic">Unwavering</span> Advocacy.</h2>
          <div className="space-y-8 text-lg text-secondary/70 font-light leading-relaxed">
            <p>
              Founded on the principles of integrity and excellence, Lex & Justice has been at the forefront of landmark legal battles for over two decades.
            </p>
            <p>
              Our team of dedicated advocates brings a wealth of experience across diverse legal landscapes, ensuring that every client receives the highest caliber of representation.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-accent text-primary font-bold uppercase tracking-widest text-xs mt-8"
            >
              Meet Our Team
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Cases = () => {
  const cases = [
    { title: "State v. Thompson", result: "Acquittal", year: "2023" },
    { title: "Global Tech Merger", result: "Successful Acquisition", year: "2022" },
    { title: "City Development Dispute", result: "Favorable Settlement", year: "2023" },
    { title: "IP Protection Case", result: "Injunction Granted", year: "2021" },
  ];

  return (
    <section id="cases" className="py-32 px-6 bg-secondary border-y border-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-accent uppercase tracking-widest text-xs font-bold mb-4 block">Proven Results</span>
          <h2 className="text-5xl md:text-7xl font-serif">Landmark <br /><span className="italic">Case Studies.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {cases.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border-b border-primary/10 pb-8 flex justify-between items-end hover:border-accent transition-colors duration-500"
            >
              <div>
                <span className="text-xs text-primary/40 mb-2 block">{c.year}</span>
                <h3 className="text-3xl font-serif group-hover:text-accent transition-colors">{c.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-widest font-bold text-accent">{c.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif mb-12">Let's Discuss <br /><span className="italic">Your Case.</span></h2>
            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-primary text-secondary rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Email Us</h4>
                  <p className="text-xl font-serif">counsel@lexjustice.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-primary text-secondary rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Call Us</h4>
                  <p className="text-xl font-serif">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-primary text-secondary rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Visit Us</h4>
                  <p className="text-xl font-serif">1212 Justice Plaza, Suite 400<br />New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 shadow-2xl space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">First Name</label>
                <input type="text" className="w-full border-b border-primary/10 py-3 focus:border-accent outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold">Last Name</label>
                <input type="text" className="w-full border-b border-primary/10 py-3 focus:border-accent outline-none transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold">Email Address</label>
              <input type="email" className="w-full border-b border-primary/10 py-3 focus:border-accent outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold">Message</label>
              <textarea rows={4} className="w-full border-b border-primary/10 py-3 focus:border-accent outline-none transition-colors resize-none" />
            </div>
            <button className="w-full py-5 bg-primary text-secondary font-bold uppercase tracking-widest text-sm hover:bg-accent hover:text-primary transition-all duration-500">
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary/50 py-20 px-6 border-t border-secondary/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-serif font-bold tracking-tighter text-secondary mb-8 md:mb-0">
          LEX<span className="text-accent">&</span>JUSTICE
        </div>
        <div className="flex space-x-12 text-xs uppercase tracking-widest mb-8 md:mb-0">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent transition-colors">Disclaimer</a>
        </div>
        <div className="text-xs tracking-widest">
          © {new Date().getFullYear()} LEX & JUSTICE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="selection:bg-accent selection:text-primary">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <Expertise />
      <About />
      <Cases />
      <Contact />
      <Footer />
    </div>
  );
}
