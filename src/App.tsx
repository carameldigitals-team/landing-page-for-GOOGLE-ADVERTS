import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Check, X, Star, Play, ChevronRight, Clock, MapPin, Award, Users, Lightbulb, Zap, Linkedin, Lock, ShieldCheck, MessageSquare, TrendingUp, Target } from 'lucide-react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const Reveal = ({ children, className = "" }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-brand-blue/20 rounded-xl mb-3 overflow-hidden transition-colors hover:border-gold/35">
      <div 
        className="flex justify-between items-center p-5 cursor-pointer font-bold text-white bg-[#001a33] gap-3 select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`text-gold text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </div>
      {isOpen && (
        <div className="px-6 pb-5 bg-[#001a33] border-t border-brand-blue/10">
          <p className="text-[#E8E0D0] text-[15px] mt-4">{answer}</p>
        </div>
      )}
    </div>
  );
};

const RegistrationNotification = () => {
  const notifications = [
    "Ebuka from Lagos just registered for AI Business Mastery",
    "Quadri from Kano just signed up",
    "Chika from Port Harcourt just signed up",
    "Temitope just registered"
  ];
  
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNext = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % notifications.length);
          showNext();
        }, 15000); // Wait 15 seconds before showing next
      }, 5000); // Show for 5 seconds
    };

    const initialTimeout = setTimeout(showNext, 10000); // Start after 10 seconds
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-28 md:bottom-6 left-4 z-[150] bg-white/95 backdrop-blur-md border border-brand-blue/10 rounded-lg p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.15)] flex items-center gap-2.5 max-w-[220px]"
        >
          <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white shrink-0">
            <Users size={16} />
          </div>
          <div className="text-[11px] text-brand-blue font-semibold leading-tight">
            {notifications[index]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const KEY = 'abm_deadline';
    let deadlineStr = sessionStorage.getItem(KEY);
    let deadline: number;
    
    if (!deadlineStr) {
      deadline = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem(KEY, deadline.toString());
    } else {
      deadline = parseInt(deadlineStr);
    }

    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
      if (diff > 0) setTimeout(tick, 1000);
    };

    tick();
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex justify-center gap-4 mb-3">
      {[
        { val: pad(timeLeft.h), label: 'Hours' },
        { val: pad(timeLeft.m), label: 'Mins' },
        { val: pad(timeLeft.s), label: 'Secs' }
      ].map((block, i) => (
        <div key={i} className="bg-black/40 border border-gold/30 rounded-lg py-3 px-4 min-w-[72px]">
          <div className="font-playfair text-[38px] font-black text-gold leading-none">{block.val}</div>
          <div className="text-[11px] font-bold tracking-widest uppercase text-muted mt-1.5">{block.label}</div>
        </div>
      ))}
    </div>
  );
};

const WamationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[440px] bg-[#0D0D0D] border border-gold/20 rounded-[24px] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh] custom-scrollbar"
          >
            {/* Premium Background Accents */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors z-50 p-2 hover:bg-white/5 rounded-full"
            >
              <X size={18} />
            </button>

            {/* Form Content */}
            <div className="text-center mb-6 relative z-10">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 text-[10px] font-black text-gold tracking-[0.15em] uppercase mb-4 mx-auto">
                <ShieldCheck size={12} /> Secure Access
              </div>
              <h3 className="font-playfair text-[24px] md:text-[28px] font-black text-white leading-tight mb-2">
                Claim Your <span className="text-gold">Exclusive Bonuses</span>
              </h3>
              <p className="text-muted text-[13px] leading-relaxed max-w-[300px] mx-auto opacity-80">
                Enter your details below to secure your spot and access the offer page instantly.
              </p>
            </div>

            <form 
              className="space-y-4 relative z-10"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                
                if (submitBtn) {
                  submitBtn.disabled = true;
                  submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> REDIRECTING...</span>';
                }

                const formData = new FormData(form);
                const offerUrl = "https://aibusinessmastery.me/r/carameldigitals";

                try {
                  // Dispatch lead data to Wamation processor
                  // We use no-cors because the processor doesn't support CORS for AJAX
                  // This is a "fire and forget" submission that works reliably
                  fetch("https://app.wamation.com.ng/processor", {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors',
                  });
                } catch (err) {
                  console.error("Submission error:", err);
                }

                // Immediate forced redirect to the offer page
                // We use a tiny delay to ensure the fetch request is dispatched
                setTimeout(() => {
                  onClose();
                  window.open(offerUrl, "_blank");
                }, 150);
              }}
            >
              {/* Wamation Hidden Fields */}
              <input type="hidden" name="zq" value="41213" />
              <input type="hidden" name="fid" value="efa26c9bb941213" />
              <input type="hidden" name="redirect" value="https://aibusinessmastery.me/r/carameldigitals" />
              <input type="hidden" name="pid" value="" />
              <input type="hidden" name="bumppid" value="0" />
              <input type="hidden" name="cid" value="" />
              <input type="hidden" name="usp" value="0" />
              <input type="hidden" name="grk" value="" />
              <input type="hidden" name="pvar" value="" />

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-gold uppercase tracking-[0.15em] ml-1 opacity-70">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Elizabeth Emmanuel"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white outline-none focus:border-gold/50 focus:bg-gold/5 transition-all placeholder:text-muted/20 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-gold uppercase tracking-[0.15em] ml-1 opacity-70">WhatsApp Number</label>
                <div className="flex gap-2">
                  <div className="relative w-[90px] shrink-0">
                    <select 
                      name="wnopfx" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white outline-none focus:border-gold/50 focus:bg-gold/5 transition-all text-xs appearance-none cursor-pointer"
                      defaultValue="234"
                    >
                      <option value="234" className="bg-dark">🇳🇬 +234</option>
                      <option value="1" className="bg-dark">🇺🇸 +1</option>
                      <option value="44" className="bg-dark">🇬🇧 +44</option>
                      <option value="27" className="bg-dark">🇿🇦 +27</option>
                      <option value="233" className="bg-dark">🇬🇭 +233</option>
                      <option value="254" className="bg-dark">🇰🇪 +254</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted/50">
                      <ChevronRight size={12} className="rotate-90" />
                    </div>
                  </div>
                  <input 
                    type="number" 
                    name="waphone" 
                    required 
                    placeholder="08012345678"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3.5 text-white outline-none focus:border-gold/50 focus:bg-gold/5 transition-all placeholder:text-muted/20 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-black text-gold uppercase tracking-[0.15em] ml-1 opacity-70">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-white outline-none focus:border-gold/50 focus:bg-gold/5 transition-all placeholder:text-muted/20 text-sm"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input type="checkbox" required className="peer sr-only" id="terms" />
                    <div className="w-4 h-4 border border-white/20 rounded peer-checked:bg-gold peer-checked:border-gold transition-all"></div>
                    <Check size={10} className="absolute text-dark opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] text-muted leading-tight group-hover:text-muted/80 transition-colors">
                    I agree to the <button type="button" onClick={() => setShowTerms(!showTerms)} className="text-gold underline font-bold">Terms & Conditions</button>.
                  </span>
                </label>
                
                {showTerms && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-2 p-3 bg-white/5 rounded-lg text-[9px] text-muted/60 leading-relaxed border border-white/5 max-h-[80px] overflow-y-auto"
                  >
                    BY SUBMITTING THIS FORM, You agree to receive relevant AI business tips and updates via your WhatsApp DM and emails. The templates provided are for personal/internal use only. © 2026 Caramel Digitals.
                  </motion.div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-[linear-gradient(135deg,var(--color-brand-blue)_0%,var(--color-brand-blue-light)_100%)] text-white font-black py-4 rounded-xl shadow-[0_8px_20px_rgba(0,51,102,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,51,102,0.3)] active:scale-[0.98] transition-all mt-2 text-sm tracking-tight"
              >
                YES! GIVE ME ACCESS NOW →
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-muted/40 mt-4">
                <Lock size={9} />
                <span>256-bit SSL Encrypted & Secure</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const openModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(p);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-6 left-0 right-0 z-[100] px-6 md:hidden pointer-events-none">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="pointer-events-auto"
        >
          <a 
            href="#" 
            onClick={openModal}
            className="flex flex-col items-center justify-center gap-1 bg-[linear-gradient(135deg,var(--color-brand-blue)_0%,var(--color-brand-blue-light)_100%)] text-white font-black py-4 rounded-full shadow-[0_10px_30px_rgba(0,51,102,0.5)] active:scale-95 transition-transform pointer-events-auto px-6"
          >
            <div className="flex items-center gap-2">
              <Zap size={18} fill="currentColor" />
              <span>UNLOCK YOUR PREMIUM AI BUSINESS MASTERY BONUS SUITE</span>
            </div>
            <div className="text-[10px] text-gold font-bold text-center leading-tight">
              Carefully selected tools & resources to help you implement faster and get results.
            </div>
          </a>
        </motion.div>
      </div>

      {/* URGENCY BAR */}
      <div className="bg-brand-blue text-white text-center py-2.5 px-5 font-bold text-sm tracking-wider animate-pulse z-50 relative">
        Attention: African Professionals & Entrepreneurs Ready to Build Profitable AI-Powered Businesses without Guesswork
      </div>

      {/* PROGRESS BAR */}
      <div className="sticky top-0 z-40 bg-[#000d1a] border-b border-brand-blue/20 py-3 px-5 flex items-center justify-center gap-0">
        {[
          { num: 1, label: 'Discover the System' },
          { num: 2, label: 'See How It Works' },
          { num: 3, label: 'Start Your AI Income' }
        ].map((step, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex items-center gap-2 text-[12px] font-bold tracking-wider uppercase px-4.5 py-1.5 rounded-full transition-all ${Math.floor(scrollProgress * 3) >= i ? 'text-gold bg-gold/12' : 'text-muted'}`}>
              <div className="w-[22px] h-[22px] rounded-full border-2 border-current flex items-center justify-center text-[11px] shrink-0">{step.num}</div>
              <span className="whitespace-nowrap hidden sm:inline">{step.label}</span>
            </div>
            {i < 2 && <div className="text-[#333] text-sm px-1">›</div>}
          </div>
        ))}
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0D0D0D_0%,#001a33_50%,#0D0D0D_100%)] pt-16 pb-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative z-10">
          <h1 className="font-playfair text-[clamp(32px,6vw,64px)] font-black leading-[1.1] text-white mb-6 max-w-[1000px] mx-auto">
            Stop Watching Tutorials and <span className="text-gold relative">Start Getting Paid.<span className="absolute bottom-1 left-0 w-full h-1 bg-gold/30 -rotate-1"></span></span>
          </h1>
          <p className="text-[clamp(18px,2.5vw,28px)] font-bold text-white/90 mb-8 max-w-[850px] mx-auto leading-tight">
            The Step-by-Step AI Blueprint Nigerian Professionals are Using to Create a Second Income Stream in Under 72 Hours.
          </p>
          <p className="text-[clamp(16px,2vw,20px)] text-muted italic max-w-[650px] mx-auto mb-10 leading-relaxed">
            "You've watched the tutorials. You've saved the posts. You've joined the WhatsApp groups. And yet — nothing has turned into real income."
          </p>
          <div className="flex flex-col items-center justify-center">
            <Reveal className="mb-8">
              <div className="text-[11px] font-black tracking-[0.2em] text-accent mb-4 flex items-center gap-2 justify-center">
                <Clock size={14} /> FAST-ACTION BONUS EXPIRES IN:
              </div>
              <CountdownTimer />
            </Reveal>

            <Reveal className="text-center max-w-[700px] mx-auto mb-10">
              <div className="section-label mx-auto">Watch This First</div>
              <h3 className="h2-serif text-[clamp(24px,4vw,36px)] leading-tight mb-4">A Personal Message From Elizabeth</h3>
              <p className="text-base text-muted leading-relaxed">Watch this short video to see exactly how this system works.</p>
            </Reveal>

            <Reveal className="max-w-[800px] w-full mx-auto rounded-[32px] overflow-hidden border-4 border-gold/20 shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_0_1px_rgba(201,168,76,0.1)] relative bg-black aspect-video group mb-12">
              {!isVideoPlaying ? (
                <div 
                  className="absolute inset-0 cursor-pointer group/play"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img 
                    src="https://img.youtube.com/vi/pkXoRyAu3T0/maxresdefault.jpg" 
                    alt="AI Business Mastery Video Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/play:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/pkXoRyAu3T0/hqdefault.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(201,168,76,0.5)] group-hover/play:scale-110 group-hover/play:bg-gold-light transition-all duration-500">
                      <Play size={32} fill="currentColor" className="text-dark ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/pkXoRyAu3T0?si=Ktd_AgWEkx7yBACR&autoplay=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Elizabeth Emmanuel — AI Business Mastery"
                  className="absolute inset-0 w-full h-full border-none z-0"
                ></iframe>
              )}
            </Reveal>

            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[linear-gradient(135deg,var(--color-brand-blue)_0%,var(--color-brand-blue-light)_100%)] text-white font-black text-lg no-underline px-12 py-5 rounded-full tracking-tight shadow-[0_20px_50px_rgba(0,51,102,0.4)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,51,102,0.5)] z-30 relative mb-12 cursor-pointer group"
            >
              <span className="flex items-center gap-3">
                👉 SEE HOW IT WORKS <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <Reveal className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Trusted By Professionals From:</div>
              <div className="font-black text-white/40 text-xs tracking-tighter">KPMG</div>
              <div className="font-black text-white/40 text-xs tracking-tighter">GTBANK</div>
              <div className="font-black text-white/40 text-xs tracking-tighter">MTN</div>
              <div className="font-black text-white/40 text-xs tracking-tighter">INTERSWITCH</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TL;DR / QUICK SUMMARY */}
      <section className="pb-15 pt-10 bg-[#000a1a]">
        <div className="container">
          <Reveal className="bg-[#001a33] border-2 border-gold/20 rounded-[24px] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold/10 text-gold text-[10px] font-black px-4 py-1 uppercase tracking-widest">Quick Summary</div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                  <Clock size={32} />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-3">Short on time? Here's the 60-second breakdown:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted">
                  <div className="flex items-start gap-2">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>AI is the biggest income opportunity of 2026.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>Most people fail because they lack a clear system.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>ABM is a 72-hour sprint to your first AI income.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>No tech background or prior experience needed.</span>
                  </div>
                </div>
                <div className="mt-6">
                  <a href="#offer" className="text-gold font-bold text-sm border-b border-gold/40 pb-0.5 hover:border-gold transition-all">
                    Skip the story & see the offer ↓
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 bg-[#0D0D0D] relative">
        <div className="container">
          <Reveal className="section-label">The Problem</Reveal>
          <h2 className="h2-serif text-[clamp(28px,4.5vw,48px)] mb-8">Why Most Professionals Are Still<br />"Watching" Instead of "Earning"</h2>
          <p className="text-xl text-muted max-w-[750px] mb-12 leading-relaxed">
            It's called <strong className="text-white">Tutorial Hell.</strong> You have 50 tabs open, 10 saved YouTube playlists, and a head full of "AI possibilities" — but your bank account hasn't felt a single kobo of it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Information Overload", desc: "Too many tools, too many 'gurus', and no clear starting point.", icon: "🤯" },
              { title: "The 'Tech' Fear", desc: "Thinking you need to be a coder or a math genius to use AI.", icon: "💻" },
              { title: "Zero Structure", desc: "Trying to 'wing it' instead of following a proven monetization system.", icon: "📉" }
            ].map((item, i) => (
              <Reveal key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 transition-all hover:bg-white/10">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-white font-bold text-lg mb-3">{item.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="py-15 bg-[#001226] border-y border-brand-blue/10">
        <div className="container">
          <Reveal className="text-center mb-12">
            <div className="section-label">Self-Qualification</div>
            <h2 className="h2-serif">Is This For You?</h2>
            <p className="text-muted max-w-[600px] mx-auto">Before we go any further, let's be honest. This system isn't for everyone. Read this carefully to see if you're in the right place.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal className="bg-black/30 border border-gold/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <Check size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">This IS For You If...</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "You're an ambitious professional looking for a side income.",
                  "You're tired of watching tutorials and ready to take action.",
                  "You want a proven system rather than random tips.",
                  "You can spare 2-3 hours a day for a 72-hour sprint.",
                  "You want to be an early mover in the AI economy."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#E8E0D0]">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="bg-black/30 border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted">
                  <X size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">This is NOT For You If...</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "You're looking for a \"get rich quick\" magic button.",
                  "You're not willing to put in the work to follow the system.",
                  "You're happy with your current financial situation.",
                  "You prefer collecting information over executing plans.",
                  "You think AI is just a passing fad."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STORYTELLING */}
      <section className="py-15 pt-0 bg-[#000d1a]">
        <div className="container">
          <Reveal>
            <div className="section-label">A Real Story — From Someone Just Like You</div>
            <h2 className="h2-serif">Chukwuemeka's Journey From Overwhelmed<br />to His First Online Income</h2>

            <div className="bg-[#001a33] border-l-4 border-gold p-9 my-12 rounded-r-xl relative">
              <div className="absolute top-[-20px] left-4 font-playfair text-[120px] text-gold/8 leading-none pointer-events-none">"</div>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
                  <img 
                    src="https://i.ibb.co/hxxvKP9p/CHUKWUEMEKA.png" 
                    alt="Chukwuemeka Obi" 
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-gold shadow-[0_10px_30px_rgba(201,168,76,0.3)] relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center md:text-left pt-2">
                  <div className="font-playfair text-2xl md:text-3xl font-black text-white mb-1">
                    Chukwuemeka Obi
                  </div>
                  <div className="text-gold font-bold tracking-wider uppercase text-xs md:text-sm">
                    Software Sales Rep, Lagos
                  </div>
                </div>
              </div>
              <div className="space-y-4.5">
                <p>"FOR CLOSE TO 3 MONTHS, I HAD WATCHED OVER 200 YOU TUBE VIDEOS ON HOW TO MAKE MONEY WITH AI.</p>
                <p>I had downloaded several AI apps; I had created accounts on five freelance platforms. But every time I was about to start, I would find another video that would introduce a new tool or a better strategy. And I'd start over again.</p>
                <p>My colleagues would see me on my phone during lunch break and say, 'Emeka, you're always studying — when are you going to start?' I didn't have an answer. Because honestly? I didn't know where to begin. The information was everywhere. The clarity was nowhere.</p>
                <p>One evening in January 2026, I came across the <strong className="text-gold">AI 72-Hour Challenge — Income Execution Sprint</strong>. I almost scrolled past it. I had been disappointed before. But something about it was different — it promised to give me a system, not just more information. So I decided to give it one last try.</p>
                <p>By the end of the first session, I understood something I had missed for months: <strong className="text-white">my problem was never knowledge — it was execution.</strong> I had been collecting information like a library. What I needed was a project plan.</p>
                <p>Within 72 hours, I had built my first AI-powered digital service package, written my first offer, and sent my first pitch to five potential clients. Two of them responded. One paid. It wasn't a life-changing amount — but it was the proof I needed. For the first time in months, I felt like I was moving forward, not just learning."</p>
              </div>
            </div>

            <p className="big-text">Chukwuemeka's story is not unusual. What was unusual was the moment he stopped consuming and started executing. And that's exactly what the right system can do for you.</p>
            
            <div className="mt-10 text-center">
              <a 
                href="https://aibusinessmastery.me/r/carameldigitals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-brand-blue text-white font-bold py-3 px-8 rounded-full hover:bg-brand-blue-light transition-all shadow-lg"
              >
                I'm Ready to Stop Consuming & Start Executing →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)] opacity-30"></div>

      {/* AUTHORITY */}
      <section className="bg-[#001226] border-y border-brand-blue/20 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container relative z-10">
          <Reveal className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse"></div>
              <img 
                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-8 border-gold/20 shadow-[0_0_60px_rgba(201,168,76,0.4)] relative z-10" 
                src="https://i.ibb.co/Q3NVhqjh/gnwwg4.jpg" 
                alt="Elizabeth Emmanuel"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-dark font-black px-6 py-2 rounded-full text-xs tracking-widest shadow-xl z-20 whitespace-nowrap">
                MEET YOUR GUIDE
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="section-label mx-auto lg:mx-0">Your Mentor</div>
              <h2 className="h2-serif text-[clamp(28px,4vw,48px)] mb-6">I'm Elizabeth Emmanuel</h2>
              <p className="text-lg text-[#E8E0D0] leading-relaxed mb-8">
                Digital Leverage Guide & AI Monetization Strategist. Founder of <strong className="text-gold">Caramel Digital Academy</strong> — an online training platform for professionals who want to earn more and leverage the internet to their advantage.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Award, text: "1,000+ Professionals Trained" },
                  { icon: MapPin, text: "Global Impact, Local Context" },
                  { icon: Lightbulb, text: "Zero Tech Background Required" },
                  { icon: Users, text: "Community of High Achievers" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 transition-all hover:bg-white/10">
                    <stat.icon size={18} className="text-gold" />
                    <span className="text-sm font-bold text-white/90">{stat.text}</span>
                  </div>
                ))}
              </div>
              <div className="border-l-4 border-gold px-8 py-6 bg-gold/5 rounded-r-2xl text-xl italic text-[#e0d5c0] mb-10 leading-relaxed shadow-inner">
                "I've been where you are. I know the frustration of seeing everyone else win while you're  stuck in learning loop. That's why i am confident to recommend the solution that helped me to you too."
              </div>
              <a 
                href="https://www.linkedin.com/in/elizabeth-emmanuel-carameldigitals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0077B5] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0077B5]/90 transition-all shadow-lg"
              >
                <Linkedin size={20} fill="currentColor" />
                Connect on LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="container relative z-10">
          <Reveal className="text-center mb-16">
            <div className="section-label mx-auto">The Strategy</div>
            <h2 className="h2-serif text-[clamp(28px,4.5vw,48px)]">The Hard Way vs. The ABM Way</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
            <Reveal className="bg-white/5 border border-white/10 rounded-[32px] p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={80} className="rotate-180 text-accent" />
              </div>
              <h3 className="text-accent font-black text-xl mb-8 flex items-center gap-3">
                <X className="bg-accent/20 rounded-full p-1" size={24} /> The "Figure It Out Alone" Way
              </h3>
              <ul className="space-y-6">
                {[
                  "Spend 100+ hours watching random YouTube videos",
                  "Get confused by conflicting 'guru' advice",
                  "Waste money on tools you don't actually need",
                  "Stare at a blank screen wondering what to sell",
                  "Give up after 3 weeks because of zero results",
                  "Stay stuck in the same financial position"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-muted group-hover:text-white/80 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="bg-gold/5 border-2 border-gold/30 rounded-[32px] p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(201,168,76,0.1)]">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingUp size={80} className="text-gold" />
              </div>
              <h3 className="text-gold font-black text-xl mb-8 flex items-center gap-3">
                <Check className="bg-gold/20 rounded-full p-1" size={24} /> The AI Business Mastery Way
              </h3>
              <ul className="space-y-6">
                {[
                  "Follow a proven 72-hour execution blueprint",
                  "Get direct clarity on your specific income path",
                  "Use pre-built prompts and templates that work",
                  "Land your first client with a structured action plan",
                  "Join a community of high-achieving professionals",
                  "Build a scalable digital income stream for 2026"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white group-hover:text-gold transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_10px_rgba(201,168,76,1)]"></div>
                    <span className="text-base font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE REAL PROBLEM */}
      <section className="py-15">
        <div className="container">
          <Reveal>
            <div className="section-label">The Root Cause</div>
            <h2 className="h2-serif">You're Stuck in "AI Information Overload"</h2>
            <p className="big-text">Every single day you see new AI tools, new tutorials, new side hustle ideas, and new claims of online income. But <strong className="text-white">nobody shows you a clear, step-by-step system to actually start.</strong></p>
            <p>So you keep learning. And learning. And nothing becomes income.</p>

            <div className="bg-[linear-gradient(135deg,#1a1207_0%,#0f0d08_100%)] border border-gold/25 rounded-2xl p-10 my-10 text-center">
              <p className="font-playfair text-[clamp(18px,2.8vw,26px)] italic text-white leading-relaxed">
                The problem isn't that there's <span className="text-gold">too little</span> information.<br />The problem is there's <span className="text-gold">too much</span> — and none of it is organized into a clear action plan <span className="text-gold">built for you.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)] opacity-30"></div>

      {/* OPPORTUNITY */}
      <section className="py-24 bg-[#001226] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(201,168,76,0.05)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="container relative z-10">
          <Reveal className="text-center mb-16">
            <div className="section-label mx-auto">The Opportunity</div>
            <h2 className="h2-serif text-[clamp(28px,4.5vw,48px)]">We Are Still in the Early Stages<br />of the AI Economy</h2>
            <p className="text-xl text-muted max-w-[750px] mx-auto mt-6 leading-relaxed">
              Right now, people around the world — including those across Africa — are using AI tools to build real income. Not someday. <strong className="text-white">Today.</strong>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "🎬", title: "AI Video Production", desc: "Creating high-converting content for brands and businesses", color: "gold" },
              { icon: "✍️", title: "Digital Content Services", desc: "Writing, marketing, and social media using AI tools", color: "brand-blue" },
              { icon: "🛍️", title: "Digital Products", desc: "Creating and selling e-books, templates, and AI assets", color: "accent" },
              { icon: "⚙️", title: "Business Automation", desc: "Helping SMEs automate tasks using AI tools", color: "gold" }
            ].map((opp, i) => (
              <Reveal key={i} className="bg-[#001a33] border border-brand-blue/20 rounded-2xl p-8 transition-all hover:border-gold hover:-translate-y-2 group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{opp.icon}</div>
                <h4 className="text-white text-lg font-black mb-3 leading-tight">{opp.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{opp.desc}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="bg-gold/5 border-l-8 border-gold rounded-r-3xl p-10 max-w-[900px] mx-auto text-center md:text-left">
            <p className="text-2xl md:text-3xl font-playfair italic text-white leading-tight">
              "The difference between those making money and those still watching tutorials is simple: <span className="text-gold font-bold">They follow a system."</span>
            </p>
            <div className="mt-10 flex flex-col md:flex-row items-center gap-8">
              <a 
                href="https://aibusinessmastery.me/r/carameldigitals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gold text-dark font-black py-5 px-12 rounded-full shadow-[0_15px_40px_rgba(201,168,76,0.3)] hover:-translate-y-1 hover:scale-105 transition-all group"
              >
                <span className="flex items-center gap-3">
                  SHOW ME THE SYSTEM NOW <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <div className="flex items-center gap-2 text-gold font-bold text-sm">
                <Target size={18} /> Join 1,000+ Action-Takers
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRODUCING SOLUTION */}
      <section className="py-24 bg-[#000a1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative z-10">
          <Reveal className="bg-[linear-gradient(135deg,#001a33,#000d1a)] border-2 border-gold rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="inline-block bg-gold text-dark font-black text-[12px] tracking-[0.2em] uppercase px-6 py-2 rounded-full mb-8 shadow-lg">
              Introducing the Solution
            </div>
            <h2 className="h2-serif text-[clamp(32px,6vw,64px)] text-gold mb-6 drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]">AI Business Mastery</h2>
            <p className="text-xl md:text-2xl my-6 mb-12 text-[#e0d5c0] max-w-[800px] mx-auto leading-relaxed">
              A beginner-friendly system designed to show you exactly how to turn AI tools into real digital income opportunities — <span className="text-white font-bold">even if you're starting from zero.</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-[900px] mx-auto mb-16">
              {[
                "You're starting from zero — no problem",
                "You're not a tech expert — no problem",
                "You've never made money online before — no problem"
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 transition-all hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
                    <Check size={18} />
                  </div>
                  <span className="text-sm font-bold text-white/90 leading-tight">{item}</span>
                </div>
              ))}
            </div>

            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-blue text-white font-black text-lg no-underline px-16 py-6 rounded-full tracking-tight shadow-[0_20px_50px_rgba(0,51,102,0.4)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,51,102,0.5)] z-30 relative cursor-pointer group"
            >
              <span className="flex items-center gap-3">
                👉 GET STARTED NOW <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#111] py-17.5 border-y border-[#222]">
        <div className="container">
          <Reveal className="section-label text-center">Social Proof</Reveal>
          <Reveal className="h2-serif text-center">Here's What AI Business Mastery<br />Participants Are Saying</Reveal>

          <Reveal className="text-center mb-6">
            <div className="section-label">Video Testimony</div>
            <h3 className="h3-serif">Watch Their Success Story</h3>
          </Reveal>

          <Reveal className="max-w-[720px] mx-auto rounded-[18px] overflow-hidden border-2 border-gold/30 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(201,168,76,0.1)] relative bg-black aspect-video mb-12">
            <iframe
              src="https://player.vimeo.com/video/1172087009?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="AI Business Mastery Video Testimony"
              className="absolute inset-0 w-full h-full border-none"
            ></iframe>
          </Reveal>

          <Reveal className="text-center font-black text-[15px] text-gold tracking-wider my-9 py-2.5 px-5 bg-gold/7 rounded-lg border border-gold/20">
            📲 Real Messages. Real People. Real Results.
          </Reveal>
          <div className="flex gap-4 mt-8 justify-center flex-wrap">
            <Reveal className="w-[300px]">
              <img src="https://i.ibb.co/q3JvHdH6/In-Shot-20260303-221504719.jpg" alt="AI Business Mastery Testimonial" className="rounded-xl border-2 border-gold/20 object-cover w-full" referrerPolicy="no-referrer" />
            </Reveal>
            <Reveal className="w-[300px]">
              <img src="https://i.ibb.co/prwT6nCm/In-Shot-20260303-222042968.jpg" alt="AI Business Mastery Testimonial" className="rounded-xl border-2 border-gold/20 object-cover w-full" referrerPolicy="no-referrer" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="py-17.5 bg-[#000d1a]">
        <div className="container">
          <Reveal className="section-label">Inside the Program</Reveal>
          <Reveal className="h2-serif">What You'll Discover Inside<br />AI Business Mastery</Reveal>
          <Reveal className="mb-8">This is not about learning more theory. It's about learning exactly what works — in a structured system that moves you from confusion to action.</Reveal>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mt-8">
            {[
              { num: "01", title: "AI Tools in Practice", desc: "How beginners can actually start using AI tools — practically, not theoretically" },
              { num: "02", title: "Digital Services with AI", desc: "How to create sellable digital services using AI tools — even with no prior skills" },
              { num: "03", title: "AI Video Generation", desc: "How to generate and edit AI-powered videos and content for yourself and clients" },
              { num: "04", title: "Spotting Opportunities", desc: "How to identify the most profitable AI-powered online opportunities in today's market" },
              { num: "05", title: "Turning Skills into Income", desc: "Step-by-step: how to package AI skills and convert them into real income streams" },
              { num: "06", title: "Context Engineering", desc: "Master the art of crafting precise instructions to get the best possible results from any AI model" },
              { num: "07", title: "The 72-Hour Execution System", desc: "The proven sprint framework that turns learning into action and action into income" }
            ].map((item, i) => (
              <Reveal key={i} className="bg-[#001a33] border border-brand-blue/20 rounded-xl p-6.5 flex gap-4 items-start transition-all hover:border-gold hover:-translate-y-1">
                <div className="w-9 h-9 rounded-full border-2 border-gold text-gold font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {item.num}
                </div>
                <div>
                  <h4 className="text-white text-[15px] font-bold mb-1.5">{item.title}</h4>
                  <p className="text-sm text-muted m-0">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)] opacity-30"></div>

      {/* FUTURE PACING */}
      <section className="bg-[linear-gradient(160deg,#111_0%,#0f0d08_100%)] py-17.5 border-t border-[#222]">
        <div className="container">
          <Reveal className="section-label">The Reality Ahead</Reveal>
          <Reveal className="h2-serif">In Two Years, There Will Be<br />Two Types of People</Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-9">
            <Reveal className="rounded-xl p-7 bg-accent/8 border border-accent/25">
              <div className="text-[11px] font-black tracking-widest uppercase mb-4 text-accent">❌ Those Who Waited</div>
              <ul className="space-y-2">
                {[
                  "Still watching tutorials in 2026",
                  "More confused than ever",
                  "Missed the early-mover advantage",
                  "Watching others earn online",
                  "Wondering \"what if I had started?\""
                ].map((item, i) => (
                  <li key={i} className="py-1.5 text-sm border-b border-white/5 last:border-none">{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="rounded-xl p-7 bg-gold/8 border border-gold/25">
              <div className="text-[11px] font-black tracking-widest uppercase mb-4 text-gold">✓ Those Who Acted</div>
              <ul className="space-y-2">
                {[
                  "Built their AI income system",
                  "Established clients and reputation",
                  "Creating recurring online income",
                  "Earning from skills they built early",
                  "Moving from employee to owner"
                ].map((item, i) => (
                  <li key={i} className="py-1.5 text-sm border-b border-white/5 last:border-none">{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="big-text mb-4.5">The good news? If you're reading this page right now — <strong className="text-white">you are still early.</strong></Reveal>
          <Reveal>But early doesn't mean unlimited time. Every week you wait is a week someone else with your same starting point gets further ahead. The window is open — but it won't stay open forever.</Reveal>
        </div>
      </section>

      {/* BONUSES */}
      <section id="offer" className="bg-[#000d1a] border-t-4 border-gold py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.05)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="container relative z-10">
          <Reveal className="text-center mb-16">
            <div className="section-label mx-auto">Exclusive Bonuses</div>
            <h2 className="h2-serif text-[clamp(28px,5vw,52px)] mb-4">UNLOCK YOUR PREMIUM AI BUSINESS MASTERY BONUS SUITE</h2>
            <p className="text-xl text-gold font-bold max-w-[700px] mx-auto leading-relaxed">
              Carefully selected tools & resources to help you implement faster and get results.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BONUSES LIST */}
            {[
              { title: "First 10 Sales in 7 Days Action Plan", desc: "Step-by-step roadmap to your first online wins. No guessing, no winging it — a clear blueprint.", worth: "₦20,000", icon: "🚀" },
              { title: "African Digital Income Starter Kit", desc: "Everything ambitious professionals need to start earning online — tailored for our market and realities.", worth: "₦35,000", icon: "📦" },
              { title: "Personal Self-Discovery Prompt", desc: "Rediscover your strengths and know exactly which AI monetization path fits your personality and skills.", worth: "₦10,000", icon: "💡" },
              { title: "AI Prompt Vault for Digital Sellers", desc: "Proven prompts to generate content, offers, and marketing materials — instantly and on demand.", worth: "₦20,000", icon: "🔑" },
              { title: "African Professionals AI Starter Kit", desc: "Tailored templates and real-world examples built for the African professional market.", worth: "₦15,000", icon: "🌍" },
              { title: "AI Video Generation & Editing Tutorial", desc: "Learn to create high-converting sales videos using AI + simple editing — no camera or studio needed.", worth: "₦30,000", icon: "🎬" }
            ].map((bonus, i) => (
              <Reveal key={i} className="group bg-[linear-gradient(135deg,#001a33,#000d1a)] border border-brand-blue/30 rounded-2xl p-8 flex flex-col h-full transition-all hover:border-gold/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{bonus.icon}</div>
                <h4 className="text-white font-black text-lg mb-3 leading-tight">{bonus.title}</h4>
                <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">{bonus.desc}</p>
                <div className="pt-4 border-t border-white/5">
                  <span className="inline-block bg-gold/10 text-gold text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Value: {bonus.worth}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="bg-[linear-gradient(135deg,var(--color-brand-blue),var(--color-brand-blue-light))] text-white rounded-[32px] p-10 md:p-16 text-center mt-20 shadow-[0_40px_100px_rgba(0,51,102,0.5)] border-2 border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold text-dark text-[12px] font-black px-10 py-2 uppercase tracking-[0.2em] rotate-45 translate-x-12 translate-y-6 shadow-2xl z-20">Limited</div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-xs font-black tracking-[0.3em] uppercase mb-6 opacity-70">Exclusive Fast-Action Offer</div>
              <h3 className="font-playfair text-[36px] md:text-[56px] font-black leading-[1.1] mb-8">
                Unlock ₦130,000+ In Total Value
              </h3>
              <p className="text-lg md:text-xl font-bold mb-12 max-w-[600px] mx-auto leading-relaxed text-white/90">
                This massive bonus package is <span className="underline decoration-4 decoration-gold underline-offset-4">strictly reserved</span> for the <span className="bg-white text-brand-blue px-3 py-1 rounded-lg mx-1">first 20 enrollees</span> into the <span className="italic uppercase tracking-tighter">AI Business Mastery</span> program.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
                <div className="text-center">
                  <div className="text-[12px] font-black uppercase tracking-widest opacity-60 mb-2">Total Package Value</div>
                  <div className="text-4xl md:text-5xl font-black text-gold drop-shadow-lg">₦130,000+</div>
                </div>
                <div className="w-px h-16 bg-white/20 hidden md:block"></div>
                <div className="text-center">
                  <div className="text-[12px] font-black uppercase tracking-widest opacity-60 mb-2">Your Special Investment</div>
                  <div className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">₦50,000</div>
                </div>
              </div>
              
              <a 
                href="#" 
                onClick={openModal}
                className="inline-block bg-white text-brand-blue font-black text-lg no-underline px-16 py-6 rounded-full tracking-tight shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 z-30 relative cursor-pointer group"
              >
                <span className="flex items-center gap-3">
                  👉 CLAIM YOUR SPOT & BONUSES NOW <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-white/60">
                <Lock size={16} /> Secure 256-bit Encrypted Checkout
              </div>
            </div>
          </Reveal>

          {/* RISK REVERSAL / GUARANTEE */}
          <Reveal className="mt-12 max-w-[700px] mx-auto bg-white/5 border-2 border-gold/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gold/40 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
              <ShieldCheck className="text-gold" size={48} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">
              100% Money-Back Guarantee
            </h3>
            
            <div className="text-muted leading-relaxed space-y-8">
              <p className="text-xl md:text-2xl text-white font-bold italic leading-tight">
                "Follow the steps in 72hours by implementing and executing step by step, if you do not have a live offer, or get results desired, Your money will be refunded 100%."
              </p>
              
              <div className="h-px w-24 bg-gold/40 mx-auto"></div>
              
              <p className="text-base md:text-lg leading-relaxed text-white/80">
                I am so confident in the <strong className="text-white">AI Business Mastery</strong> system because I have seen it work for hundreds of professionals. We are here to build success stories, not just collect enrollments. If you do the work and don't see the path to income—I don't want your money.
              </p>
              
              <p className="text-white font-medium bg-gold/10 p-6 md:p-8 rounded-2xl border border-gold/30 text-sm md:text-base leading-relaxed shadow-inner">
                I have also used it to build my flagship program <span className="text-gold font-black">"THE SOVEREIGN INCOME MULTIPLIER SYSTEM"</span> — A system that moves you from salary-only survival to 3 automated income streams generating ₦100K-₦500K/month in 90 days.
                <br />
                <a 
                  href="https://sovereignincome-multiplier-system.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-gold underline decoration-gold/40 hover:decoration-gold transition-all font-black text-base"
                >
                  See the proof here →
                </a>
              </p>
            </div>
            <div className="mt-8 font-playfair italic text-gold text-lg">"Your success is my only metric."</div>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-[#000a1a] py-17.5 border-t border-brand-blue/10">
        <div className="container">
          <Reveal className="section-label text-center">Got Questions?</Reveal>
          <Reveal className="h2-serif text-center">We've Answered Every Objection<br />You Might Have</Reveal>

          <div className="mt-10">
            {[
              { q: "I have zero tech background. Is this really for me?", a: "Absolutely. AI Business Mastery was specifically designed for people with zero tech experience. Elizabeth has trained over 1,000 professionals — many of whom couldn't tell the difference between a prompt and a plugin. The system walks you through everything step by step, in simple everyday language. If you can use WhatsApp, you can do this." },
              { q: "I've bought online courses before and got nothing. How is this different?", a: "Most courses give you information. AI Business Mastery gives you a 72-hour execution sprint — a structured system that forces action, not just learning. That's why participants like Joshua landed a $1,500 retainer gig and Awwal got a salary increase directly after going through the program." },
              { q: "I don't have much time. How long does this take?", a: "The clue is in the name — 72 hours. This is a focused sprint, not a 6-month course. Most participants who got results did it while still working their 9-to-5. If you can carve out a few focused hours over a weekend, this will work for you." },
              { q: "Is ₦50,000 worth it? That's a lot of money right now.", a: "You're getting over ₦130,000 worth of bonuses on top of the full program. One single AI-powered digital service, properly priced, can earn you ₦50,000–₦150,000 from a single client. The investment pays for itself the moment you land your first opportunity. The real question is: what does staying stuck cost you for another 6 months?" },
              { q: "Am I too late? Has the AI opportunity already passed?", a: "Not even close. We are still in the very early stages of the AI economy. Businesses across Africa are just beginning to understand they need AI-powered services. The professionals who build these skills now will be earning from them for the next 5–10 years. Every week you wait is a week someone else with your same starting point gets further ahead." },
              { q: "What if I join and still feel stuck?", a: "That's exactly why Elizabeth built the exclusive bonuses — the Personal Self-Discovery Prompt to identify your exact path, the First 10 Sales Action Plan for your first steps, and the AI Prompt Vault so you're never staring at a blank screen. You will not be navigating this alone." }
            ].map((faq, i) => (
              <Reveal key={i}>
                <FAQItem question={faq.q} answer={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0D0D0D_0%,#1a1207_100%)] py-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative z-10">
          <Reveal className="section-label mx-auto">Your Final Step</Reveal>

          <Reveal className="h2-serif text-[clamp(32px,6vw,56px)] mb-8 leading-tight">
            Ready to Move From <br />
            <span className="text-gold">Confusion to Conversion?</span>
          </Reveal>
          
          <Reveal className="max-w-[700px] mx-auto mb-12 text-xl text-muted leading-relaxed">
            The AI revolution isn't waiting for you to be "ready." It's happening right now. You can either be a spectator watching others win, or you can be the one getting paid.
          </Reveal>

          {/* COUNTDOWN TIMER */}
          <Reveal className="bg-[linear-gradient(135deg,#1a0f02,#0f0d08)] border-2 border-gold rounded-3xl p-10 text-center mx-auto mb-12 max-w-[600px] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="text-[14px] font-black tracking-[0.2em] uppercase text-accent mb-6 flex items-center justify-center gap-2">
              <Clock size={16} /> BONUS OFFER EXPIRES IN
            </div>
            <CountdownTimer />
            <div className="mt-8 pt-6 border-t border-white/5 text-sm text-muted">
              🔥 Once this timer hits zero, the exclusive bonuses (worth <span className="text-gold font-bold">₦130,000+</span>) will be removed forever.
            </div>
          </Reveal>

          <Reveal className="space-y-6">
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[linear-gradient(135deg,var(--color-brand-blue)_0%,var(--color-brand-blue-light)_100%)] text-white font-black text-[clamp(18px,2.5vw,22px)] no-underline px-16 py-6 rounded-full tracking-tight shadow-[0_20px_50px_rgba(0,51,102,0.4)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_25px_70px_rgba(0,51,102,0.5)] z-30 relative cursor-pointer group"
            >
              <span className="flex items-center gap-3">
                👉 ACCESS THE FULL PROGRAM BREAKDOWN <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <p className="text-muted text-sm flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-gold" /> 100% Risk-Free Money-Back Guarantee Included
            </p>
          </Reveal>

          <Reveal className="mt-24 pt-16 border-t border-white/5 max-w-[800px] mx-auto">
            <div className="inline-block bg-white/5 rounded-2xl p-8 md:p-12 text-left border border-white/10">
              <p className="text-2xl font-playfair italic text-white mb-6 leading-relaxed">
                "The best time to start was 6 months ago. The second best time is <span className="text-gold font-bold">right now.</span> Don't let another year pass wondering 'what if'."
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://i.ibb.co/Q3NVhqjh/gnwwg4.jpg" 
                  alt="Elizabeth Emmanuel" 
                  className="w-12 h-12 rounded-full border-2 border-gold"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-white font-bold">Elizabeth Emmanuel</div>
                  <div className="text-xs text-gold uppercase tracking-widest font-black">Founder, Caramel Digital Academy</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-7 px-5 text-center">
        <p className="text-muted text-[13px]">© 2026 Caramel Digital Academy · Elizabeth Emmanuel · All Rights Reserved</p>
      </footer>
      <WamationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <RegistrationNotification />
    </div>
  );
}
