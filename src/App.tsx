import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  BookOpen, 
  Timer, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  Fingerprint, 
  FileCheck, 
  Network, 
  CheckCircle,
} from 'lucide-react';

import DeveloperSection from './components/DeveloperSection';
import HeroBackground from './components/HeroBackground';
import DashboardPreview from './components/DashboardPreview';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lifecycleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lifecycleRef.current,
          start: "center center",
          end: "+=3000",
          pin: true,
          scrub: 1,
        }
      });

      // Reset all cards to initial state
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95, pointerEvents: "none" });
      // Set first card to visible
      gsap.set(cards[0], { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          
          // Hold the current card for a moment
          tl.to({}, { duration: 0.5 })
            // Fade out current card
            .to(card, { 
              opacity: 0, 
              y: -50, 
              scale: 0.95, 
              pointerEvents: "none",
              duration: 1, 
              ease: "power2.inOut" 
            }, `swap-${index}`)
            // Fade in next card
            .to(nextCard, { 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              pointerEvents: "auto",
              duration: 1, 
              ease: "power2.inOut" 
            }, `swap-${index}`);
        }
      });
      
      // Add a final pause at the end so the last card stays visible for a bit
      tl.to({}, { duration: 0.5 });

    }, lifecycleRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const steps = [
    {
      icon: Fingerprint,
      title: "Attestation",
      desc: "Workload proves its identity using platform primitives (TPM, AWS Nitro, etc)."
    },
    {
      icon: FileCheck,
      title: "Issuance",
      desc: "Qredin validates proof and signs a short-lived X.509 certificate for the agent."
    },
    {
      icon: Network,
      title: "Communication",
      desc: "Agent uses the certificate to establish mutually authenticated mTLS channels."
    },
    {
      icon: CheckCircle,
      title: "Verification",
      desc: "Receiving service validates certificate against the Qredin CA bundle."
    }
  ];

  return (
    <div className="bg-background-light text-text-primary font-display antialiased overflow-x-hidden">
      <div className="relative flex min-h-screen w-full flex-col">
        <header 
          className={`fixed top-0 z-50 w-full transition-all duration-200 ${
            isScrolled 
              ? 'bg-background-light/80 backdrop-blur-xl border-b border-border-light shadow-[0_4px_24px_rgba(0,0,0,0.6)]' 
              : 'bg-background-light/0 backdrop-blur-none border-b border-transparent shadow-none'
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <img alt="Qredin Shield Logo" className="h-8 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6pBgaAOxWcpokcPYGN1poNAebgNL5CIIsasFwFtzL57FvlfHVnvin0emHTYrNJc5fAjah95QD5XaEi8q5_dgfOvvBDQOIj9qq8gDmulhbi6e8DjGqPSd8ZwsDq9PRpvNtO5A074y2dFIlBMihKbeh1IGbJx-6wchhsQ4_4QvTfRSjrTGMEGz1MS81I4SrJWwbYtDfimkqsZyC5Zmx_VzYi6eaQd1O-z0FGusjC0IGxzrk226F7-LYkdjBx9XWIx3g5Wn8MCzS694"/>
              <span className="text-xl font-bold tracking-tight text-text-primary">Qredin</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors" href="#">Product</a>
              <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors" href="#">Developers</a>
              <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors" href="#">Resources</a>
              <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors" href="#">Blog</a>
              <a className="text-sm font-medium text-text-secondary hover:text-primary transition-colors" href="#">Company</a>
            </nav>
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(0,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_4px_15px_rgba(0,82,255,0.4)] transition-all duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="relative isolate min-h-screen flex flex-col justify-center pt-20 pb-20 overflow-hidden">
            <HeroBackground />
            
            {/* Light Sweep Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 w-[50%] animate-light-sweep"
                style={{
                  background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.08), rgba(255,255,255,0.12), rgba(255,255,255,0.08), transparent)',
                  filter: 'blur(8px)',
                }}
              ></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 text-text-primary"
              >
                <span className="text-gradient">Identity Infrastructure for</span><br/>
                <span className="text-gradient-blue">Autonomous Systems</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto max-w-2xl text-lg leading-8 text-text-secondary mb-10"
              >
                Secure, short-lived identity issuance for AI agents and workloads. Eliminate static secrets with enterprise-grade mTLS at scale in zero-trust environments.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(0,82,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start building
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-border-light bg-surface-light px-6 py-3 text-sm font-semibold text-text-primary hover:bg-border-light hover:border-slate-700 transition-all shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  Read the docs
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-20 w-full max-w-5xl mx-auto"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-text-secondary uppercase mb-8 text-center">
                  Trusted by leading teams
                </p>
                <div 
                  className="relative w-full overflow-hidden flex items-center h-16 group"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                  }}
                >
                  <div className="flex w-max animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] items-center">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex gap-24 px-12 items-center">
                        {/* GitHub */}
                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <svg className="h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </div>
                        {/* Vercel */}
                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <svg className="h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L24 22H0L12 1Z"/></svg>
                        </div>
                        {/* Stripe */}
                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <svg className="h-8 text-white" viewBox="0 0 60 25" fill="currentColor"><path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5v1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-1.68 0-2.88 1.27-2.88 3.58 0 2.46 1.22 3.83 2.9 3.83 1.56 0 2.47-1.36 2.47-3.74 0-2.26-.9-3.67-2.49-3.67zM29.09 20.05c-1.42 0-2.27-.56-2.81-1.01l-.02 1.04h-3.7V5.57h3.71l.01 1.05c.53-.45 1.4-1.05 2.81-1.05 2.8 0 5.52 2.52 5.52 7.32 0 5.08-2.72 7.16-5.52 7.16zm-.88-11.1c-1.67 0-2.88 1.27-2.88 3.58 0 2.46 1.22 3.83 2.9 3.83 1.56 0 2.47-1.36 2.47-3.74 0-2.26-.9-3.67-2.49-3.67zM16.35 20.05h-3.98V5.57h3.98v14.48zM16.38 2.01h-4.05v2.6h4.05v-2.6zM7.11 20.3c-2.39 0-4.65-.7-6.04-1.61l1.16-3.18c1.33.8 3.03 1.5 4.5 1.5 1.45 0 2.08-.5 2.08-1.2 0-1.8-7.39-.42-7.39-5.6 0-2.5 2.05-4.9 6.21-4.9 2.1 0 4.1.58 5.4 1.36l-1.1 3.26c-1.25-.7-2.65-1.2-3.95-1.2-1.2 0-1.8.5-1.8 1.1 0 1.7 7.35.4 7.35 5.5 0 2.8-2.25 4.97-6.32 4.97z"/></svg>
                        </div>
                        {/* Cloudflare */}
                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <svg className="h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16.89 8.54c-.31-3.6-3.3-6.44-6.98-6.44-2.86 0-5.32 1.7-6.41 4.16C1.55 6.78 0 8.52 0 10.64c0 2.4 1.95 4.35 4.35 4.35h15.3c2.4 0 4.35-1.95 4.35-4.35 0-2.26-1.72-4.12-3.92-4.32-.06-.59-.13-1.19-.19-1.78z"/></svg>
                        </div>
                        {/* AWS */}
                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <svg className="h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M14.07 15.01c-1.54.89-3.52 1.41-5.62 1.41-2.9 0-5.46-.96-7.31-2.56-.17-.15-.19-.4-.05-.57l.63-.76c.13-.16.36-.18.52-.05 1.54 1.25 3.65 2.03 6.04 2.03 1.84 0 3.52-.43 4.88-1.16.18-.1.41-.05.52.12l.53.89c.1.18.06.41-.14.55zm4.86-3.8c-.08-.13-.23-.18-.37-.12-1.32.55-2.8 1.01-4.33 1.34-.17.04-.26.21-.21.38l.26.96c.04.16.2.25.36.2 1.78-.42 3.47-.98 4.99-1.65.14-.06.19-.22.11-.35l-.81-1.32zm-1.89-6.31c-.34-.51-.92-.85-1.58-.85-1.07 0-1.94.87-1.94 1.94 0 .33.08.64.23.91l-1.33 2.31c-.26-.15-.56-.23-.88-.23-1.07 0-1.94.87-1.94 1.94 0 1.07.87 1.94 1.94 1.94.32 0 .62-.08.88-.23l1.33 2.31c-.15.27-.23.58-.23.91 0 1.07.87 1.94 1.94 1.94.66 0 1.24-.34 1.58-.85l2.67 1.54c.15.09.34.04.43-.11l.85-1.47c.09-.15.04-.34-.11-.43l-2.67-1.54c.15-.27.23-.58.23-.91 0-.33-.08-.64-.23-.91l2.67-1.54c.15-.09.2-.28.11-.43l-.85-1.47c-.09-.15-.28-.2-.43-.11l-2.67 1.54c-.34-.51-.92-.85-1.58-.85-1.07 0-1.94.87-1.94 1.94 0 .33.08.64.23.91l-1.33-2.31c.15-.27.23-.58.23-.91 0-.33-.08-.64-.23-.91l1.33-2.31c.34.51.92.85 1.58.85 1.07 0 1.94-.87 1.94-1.94 0-1.07-.87-1.94-1.94-1.94z"/></svg>
                        </div>
                        {/* Docker */}
                        <div className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                          <svg className="h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m2.93 2.715h2.118a.187.187 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.187.187 0 00.184-.185V9.006a.186.186 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.084.185.185.185m-2.928 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.084.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.119a.186.186 0 00-.185.185v1.888c0 .102.084.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.534-1.716-2.566l-.344-.199-.198.344c-.124.219-.695 1.289-.695 2.756 0 .304.029.597.086.876-.99.217-2.26.248-3.222.248H1.933c-.106 0-.192.086-.192.191v.014c-.004.64.18 2.69 1.143 4.26.825 1.33 2.155 2.148 3.96 2.427 1.074.166 2.212.166 3.36.166 2.712 0 5.425-.014 8.136-.014 1.592 0 3.181-.014 4.773-.014.326-.001.652-.001.978-.001 2.692-.086 3.694-1.526 3.753-1.62l.144-.226-.225-.144c-.052-.033-1.32-.84-1.32-2.32 0-.61.231-1.18.665-1.65.048-.052.058-.127.026-.188z"/></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          <section className="min-h-screen flex flex-col justify-center py-24 bg-background-light relative overflow-hidden border-t border-border-light">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="w-full"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                    Engineered for Reliability from Day One.
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    QREDIN is built with production-grade architecture, multi-region readiness, and security-first principles — even at early scale.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex flex-col items-center text-center"
                    >
                      <dt className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">Uptime Target</dt>
                      <dd className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00C2FF] mb-2">99.99%</dd>
                      <p className="text-sm text-gray-500">availability SLA commitment</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col items-center text-center"
                    >
                      <dt className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">Auth Latency</dt>
                      <dd className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00C2FF] mb-2">&lt; 50ms</dd>
                      <p className="text-sm text-gray-500">average token issuance time</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex flex-col items-center text-center"
                    >
                      <dt className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">Security Model</dt>
                      <dd className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00C2FF] mb-2">Zero-Trust</dd>
                      <p className="text-sm text-gray-500">short-lived credentials & strict verification</p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col items-center text-center"
                    >
                      <dt className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">Deployment Ready</dt>
                      <dd className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00C2FF] mb-2">Multi-Region</dd>
                      <p className="text-sm text-gray-500">globally deployable infrastructure</p>
                    </motion.div>
                  </div>
              </motion.div>
            </div>
          </section>

          <DeveloperSection />

          <section className="py-24 bg-background-light relative z-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Enterprise Control Plane</h2>
                <p className="mt-4 text-text-secondary max-w-2xl mx-auto">Manage identities, policies, and federation across your entire infrastructure from a single pane of glass.</p>
              </div>
              <DashboardPreview />
            </div>
          </section>

          <section ref={lifecycleRef} className="py-24 bg-background-light relative min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#0052FF15_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-background-light to-transparent pointer-events-none"></div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Autonomous Identity Lifecycle</h2>
                <p className="mt-4 text-text-secondary max-w-2xl mx-auto">A fully automated pipeline from attestation to verification, ensuring identity integrity at every step.</p>
              </div>
              
              <div className="relative h-[400px] max-w-2xl mx-auto w-full">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div 
                      key={idx} 
                      ref={el => { if (el) cardsRef.current[idx] = el; }}
                      className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] backdrop-blur-[8px] border border-[rgba(255,255,255,0.08)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-[20px] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 ease-out hover:border-[rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(0,120,255,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden group"
                      style={{ zIndex: steps.length - idx }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,140,255,0.08),rgba(0,90,255,0.12))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none"></div>
                      <div className="mb-8 text-primary relative z-10">
                        <Icon className="w-20 h-20 drop-shadow-[0_4px_12px_rgba(0,82,255,0.2)]" />
                      </div>
                      <h3 className="text-3xl font-bold text-text-primary mb-4 relative z-10">{step.title}</h3>
                      <p className="text-lg text-text-secondary max-w-md relative z-10">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-border-light bg-surface-light relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-light pointer-events-none"></div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-6"
              >
                Ready to secure your autonomous fleet?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mx-auto max-w-2xl text-lg leading-8 text-text-secondary mb-10"
              >
                Get started with Qredin today and bring enterprise-grade security to your AI infrastructure. Open source and free for developers.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded bg-primary px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(0,82,255,0.3)] hover:bg-primary-hover hover:shadow-[0_6px_20px_rgba(0,82,255,0.4)] transition-all"
                >
                  Contact Us
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded px-8 py-3 text-sm font-semibold text-text-primary shadow-sm ring-1 ring-inset ring-border-light hover:bg-border-light transition-colors"
                >
                  Contact Sales
                </motion.button>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border-light bg-background-light py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img alt="Qredin Shield Logo" className="h-6 w-auto opacity-100 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWUBYv-7q09NsyhIGnI8q9TVCNyb-1zo4fb2S_zPFdEkaNiTyLWexNtBzrqZPf_oEm6Hg1rfi_9pRpV5djfRIIq8GNhGHPAhMp9zOvET03U4sd4IWvA5f4dt3-rN8qI_eNf2EnMY3tCXDDF2MA52NWKwcS575QA3YpJCnOcoqX-hVKE4f7TXXxgDjq1aok0BYG6g7P-X1fA-XzmnfeT4VZv8Qb2cxOrsEw9eaz_k1uB3I-isoND2hmV6DF2vlTC0w4CsQQBw_gIww"/>
              <span className="text-lg font-bold text-text-primary">Qredin</span>
            </div>
            <div className="text-sm text-text-secondary">
              © 2023 Qredin Inc. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a className="text-text-secondary hover:text-primary transition-colors" href="#">
                <span className="sr-only">Twitter</span>
                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a className="text-text-secondary hover:text-primary transition-colors" href="#">
                <span className="sr-only">GitHub</span>
                <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
