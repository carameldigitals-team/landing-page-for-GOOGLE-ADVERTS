import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, X, Star, Play, ChevronRight, Clock, MapPin, Award, Users, Lightbulb, Zap, Linkedin } from 'lucide-react';

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
    <div className="border border-dark3 rounded-xl mb-3 overflow-hidden transition-colors hover:border-gold/35">
      <div 
        className="flex justify-between items-center p-5 cursor-pointer font-bold text-white bg-dark2 gap-3 select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`text-gold text-2xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </div>
      {isOpen && (
        <div className="px-6 pb-5 bg-dark2 border-t border-dark3">
          <p className="text-[#E8E0D0] text-[15px] mt-4">{answer}</p>
        </div>
      )}
    </div>
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

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

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
          <div className="bg-accent text-white text-[10px] font-black py-1 px-3 rounded-t-lg w-fit mx-auto shadow-lg animate-bounce">
            🔥 ONLY 7 SPOTS LEFT
          </div>
          <a 
            href="https://wa.link/2ctel3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[linear-gradient(135deg,var(--color-gold)_0%,var(--color-accent2)_100%)] text-dark font-black py-4 rounded-full shadow-[0_10px_30px_rgba(201,168,76,0.5)] active:scale-95 transition-transform"
          >
            <Zap size={18} fill="currentColor" />
            CLAIM MY ₦130K BONUS PACKAGE
          </a>
        </motion.div>
      </div>

      {/* URGENCY BAR */}
      <div className="bg-accent text-white text-center py-2.5 px-5 font-bold text-sm tracking-wider animate-pulse z-50 relative">
        ⚡ BONUS ALERT: Only 20 spots available at this price — Act before they're gone
      </div>

      {/* PROGRESS BAR */}
      <div className="sticky top-0 z-40 bg-dark border-b border-[#2a2a2a] py-3 px-5 flex items-center justify-center gap-0">
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
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0D0D0D_0%,#1a1207_50%,#0D0D0D_100%)] pt-20 pb-15 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(201,168,76,0.12)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative">
          <div className="inline-block bg-gold/15 border border-gold/40 text-gold text-[12px] font-black tracking-[0.15em] uppercase px-4.5 py-1.5 rounded-full mb-7">
            🚨 Important Message for Ambitious Minds Across Africa
          </div>
          <h1 className="font-playfair text-[clamp(32px,6vw,64px)] font-black leading-[1.15] text-white mb-4.5">
            AI Is Changing Everything…<br />
            <span className="text-gold">So Why Aren't You<br />Making Money From It Yet?</span>
          </h1>
          <p className="text-[clamp(18px,2.5vw,24px)] text-muted italic max-w-[600px] mx-auto mb-8">
            You've watched the tutorials. You've saved the posts. You've joined the WhatsApp groups. And yet — nothing has turned into real income.
          </p>
          <div className="flex flex-col items-center justify-center">
            <Reveal className="mb-6">
              <div className="text-[11px] font-black tracking-[0.2em] uppercase text-accent mb-3">⏳ LIMITED TIME OFFER EXPIRES IN:</div>
              <CountdownTimer />
            </Reveal>
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[linear-gradient(135deg,var(--color-gold)_0%,var(--color-accent2)_100%)] text-dark font-black text-base no-underline px-10 py-4 rounded-full tracking-tight shadow-[0_8px_40px_rgba(201,168,76,0.35)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_60px_rgba(201,168,76,0.45)] z-30 relative mb-4 cursor-pointer"
            >
              👉 SEE HOW IT WORKS
            </a>
            <Reveal className="flex items-center gap-2 text-accent font-bold text-xs animate-pulse mb-12">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              ONLY 7 SPOTS LEFT FOR THIS COHORT
            </Reveal>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <Reveal className="text-center py-3 px-5 mb-12">
        <div className="container">
          <a 
            href="https://aibusinessmastery.me/r/carameldigitals" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-[1.01] relative z-30 cursor-pointer"
          >
            <img 
              src="https://i.ibb.co/Q3NVhqjh/gnwwg4.jpg" 
              alt="AI Business Mastery" 
              className="max-w-full rounded-2xl border-2 border-gold/25 shadow-[0_30px_80px_rgba(0,0,0,0.6)] mx-auto"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4">
              <div className="font-bold text-white uppercase tracking-widest">ELIZABETH EMMANUEL</div>
              <div className="italic text-gold text-sm mt-1">Your Digital Leverage Guide, Online Business & AI Monetization Strategist</div>
            </div>
          </a>
        </div>
      </Reveal>

      {/* TL;DR / QUICK SUMMARY */}
      <section className="pb-15 pt-0">
        <div className="container">
          <Reveal className="bg-dark2 border-2 border-gold/20 rounded-[24px] p-8 md:p-10 relative overflow-hidden">
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

      {/* RELATABLE PROBLEM */}
      <section className="py-15">
        <div className="container">
          <Reveal>
            <div className="section-label">You're Not Alone</div>
            <h2 className="h2-serif">Let Me Guess — This Sounds Familiar…</h2>
            <p className="big-text mb-4.5">
              You've spent weeks — maybe months — consuming content about AI and online income. You understand the ideas. You're not lazy. You're not slow. You're educated.
            </p>
            
            <ul className="mb-7">
              {[
                "You've watched endless YouTube tutorials on AI tools",
                "You've bookmarked dozens of \"make money with AI\" posts",
                "You're in WhatsApp groups filled with noise about online opportunities",
                "You've tried a few things that went nowhere",
                "You've started questioning if AI income is even real"
              ].map((item, i) => (
                <li key={i} className="relative pl-9 py-2.5 border-b border-[#222] text-[17px]">
                  <span className="absolute left-0 text-accent font-black text-lg">✗</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="big-text mb-4.5">And yet somehow… <strong className="text-white">nothing has turned into real income.</strong></p>

            <div className="bg-[linear-gradient(135deg,#1a1207_0%,#0f0d08_100%)] border border-gold/25 rounded-2xl p-10 my-10 text-center">
              <p className="font-playfair text-[clamp(18px,2.8vw,26px)] italic text-white leading-relaxed">
                After a while, you start asking yourself:<br />
                <span className="text-gold">"Am I already too late?"<br />"Is this AI thing only for tech people?"<br />"Why does everyone else seem to get it except me?"</span>
              </p>
            </div>

            <p>That feeling of confusion mixed with frustration? I've heard it from over a thousand people. And I want you to read what one of them shared with me…</p>
          </Reveal>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className="py-15 bg-dark2 border-y border-[#222]">
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
      <section className="py-15 pt-0">
        <div className="container">
          <Reveal>
            <div className="section-label">A Real Story — From Someone Just Like You</div>
            <h2 className="h2-serif">Chukwuemeka's Journey From Overwhelmed<br />to His First Online Income</h2>

            <div className="bg-dark2 border-l-4 border-gold p-9 my-12 rounded-r-xl relative">
              <div className="absolute top-[-20px] left-4 font-playfair text-[120px] text-gold/8 leading-none pointer-events-none">"</div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[50px] h-[50px] rounded-full bg-[linear-gradient(135deg,#C9A84C_0%,#F7A033_100%)] flex items-center justify-center font-black text-lg text-dark shrink-0">CE</div>
                <div className="font-bold text-white text-base">
                  Chukwuemeka Obi <span className="block text-[13px] text-gold font-normal">Software Sales Rep, Lagos</span>
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
                className="inline-block bg-gold/10 border border-gold/40 text-gold font-bold py-3 px-8 rounded-full hover:bg-gold hover:text-dark transition-all"
              >
                I'm Ready to Stop Consuming & Start Executing →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-px bg-[linear-gradient(90deg,transparent,#C9A84C,transparent)] opacity-30"></div>

      {/* AUTHORITY */}
      <section className="bg-dark2 border-y border-[#222] py-17.5">
        <div className="container">
          <Reveal className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex flex-col items-center md:items-start shrink-0 mx-auto md:mx-0">
              <img 
                className="w-40 h-40 rounded-full object-cover border-4 border-gold shadow-[0_0_40px_rgba(201,168,76,0.35)]" 
                src="https://i.ibb.co/Q3NVhqjh/gnwwg4.jpg" 
                alt="Elizabeth Emmanuel"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 text-center md:text-left">
                <div className="font-bold text-white">ELIZABETH EMMANUEL</div>
                <div className="italic text-gold text-sm mt-1">Your Digital Leverage Guide, Online Business & AI Monetization Strategist</div>
              </div>
            </div>
            <div>
              <div className="section-label">Your Guide</div>
              <h2 className="h2-serif text-[clamp(22px,3.5vw,36px)]">I'm Elizabeth Emmanuel</h2>
              <p className="text-base text-[#E8E0D0]">Digital Leverage Guide & AI Monetization Strategist. Founder of <strong className="text-gold">Caramel Digital Academy</strong> — an online training platform for professionals and ambitious minds who want to earn more and leverage the internet to their advantage.</p>
              <div className="my-5 flex flex-wrap gap-2 justify-center md:justify-start">
                {[
                  { icon: Award, text: "1,000+ Professionals Trained" },
                  { icon: MapPin, text: "Online & Offline Impact" },
                  { icon: Lightbulb, text: "Zero Tech Background? No Problem" }
                ].map((stat, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-lg px-4 py-2 text-[13px] font-bold text-gold">
                    <stat.icon size={14} />
                    {stat.text}
                  </span>
                ))}
              </div>
              <p className="text-[15px] text-muted">I have trained professionals to gain clarity on what to focus on, rediscover their best-suited skills for monetization, and build sustainable, repeatable income systems — even if they have zero tech background.</p>
              <div className="border-l-4 border-gold px-6 py-4 my-7 bg-gold/5 rounded-r-lg text-lg italic text-[#e0d5c0]">
                "I've been where you are. I know the frustration of seeing everyone else 'win' while you're stuck in the learning loop. That's why I didn't just build a course—I built a bridge."
              </div>
              <a 
                href="https://www.linkedin.com/in/elizabeth-emmanuel-carameldigitals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-bold text-sm mb-6 group"
              >
                <div className="bg-[#0077B5] p-2 rounded-lg group-hover:bg-[#0077B5]/90 transition-colors">
                  <Linkedin size={18} className="text-white" fill="currentColor" />
                </div>
                Follow me on LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-20 bg-dark2 border-y border-[#222]">
        <div className="container">
          <Reveal className="text-center mb-12">
            <div className="section-label">The Choice</div>
            <h2 className="h2-serif">The Hard Way vs. The ABM Way</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#333] shadow-2xl">
            {/* THE HARD WAY */}
            <div className="p-10 bg-[#0D0D0D] border-b md:border-b-0 md:border-r border-[#333]">
              <div className="text-accent font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <X size={16} /> The "Figure It Out Alone" Way
              </div>
              <ul className="space-y-5">
                {[
                  "Spend 100+ hours watching random YouTube videos",
                  "Get confused by conflicting 'guru' advice",
                  "Waste money on tools you don't actually need",
                  "Stare at a blank screen wondering what to sell",
                  "Give up after 3 weeks because of zero results",
                  "Stay stuck in the same financial position"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* THE ABM WAY */}
            <div className="p-10 bg-[linear-gradient(135deg,#1a1207_0%,#0D0D0D_100%)] relative">
              <div className="absolute top-4 right-6 text-gold/20 font-black text-6xl italic pointer-events-none">BEST</div>
              <div className="text-gold font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <Check size={16} /> The AI Business Mastery Way
              </div>
              <ul className="space-y-5">
                {[
                  "Follow a proven 72-hour execution blueprint",
                  "Get direct clarity on your specific income path",
                  "Use pre-built prompts and templates that work",
                  "Land your first client with a structured action plan",
                  "Join a community of high-achieving professionals",
                  "Build a scalable digital income stream for 2026"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0 shadow-[0_0_8px_rgba(201,168,76,0.8)]"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="bg-dark2 py-15 border-y border-[#222]">
        <div className="container">
          <Reveal className="text-center max-w-[620px] mx-auto mb-9">
            <div className="section-label">Watch This First</div>
            <h3 className="h3-serif text-[clamp(22px,3.5vw,34px)] leading-snug">A Personal Message From Elizabeth —<br />Before You Read Another Word</h3>
            <p className="text-muted text-base">Watch this short video to hear Elizabeth explain exactly why so many smart, ambitious professionals are stuck — and what the AI Business Mastery system does differently.</p>
          </Reveal>
          <Reveal className="max-w-[720px] mx-auto rounded-[18px] overflow-hidden border-2 border-gold/30 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(201,168,76,0.1)] relative bg-black aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1172058982?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title="Elizabeth Emmanuel — AI Business Mastery"
              className="absolute inset-0 w-full h-full border-none"
            ></iframe>
          </Reveal>
          <div className="flex items-center justify-center gap-2.5 mt-4.5 text-sm text-gold font-bold">
            <Play size={12} fill="currentColor" />
            Watch the full video above before scrolling
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
      <section className="py-15">
        <div className="container">
          <Reveal>
            <div className="section-label">The Window Is Open — But Not Forever</div>
            <h2 className="h2-serif">We Are Still in the Early Stages<br />of the AI Economy</h2>
            <p className="big-text">Right now, people around the world — including those across Africa — are using AI tools to build real income. Not someday. <em>Today.</em></p>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 my-8">
              {[
                { icon: "🎬", title: "AI Video Production", desc: "Creating high-converting content for brands and businesses" },
                { icon: "✍️", title: "Digital Content Services", desc: "Writing, marketing, and social media using AI tools" },
                { icon: "🛍️", title: "Digital Products", desc: "Creating and selling e-books, templates, and AI assets" },
                { icon: "⚙️", title: "Business Automation", desc: "Helping SMEs automate tasks using AI tools" }
              ].map((opp, i) => (
                <div key={i} className="bg-dark2 border border-[#2a2a2a] rounded-xl p-6 transition-all hover:border-gold hover:-translate-y-1">
                  <div className="text-[28px] mb-2.5">{opp.icon}</div>
                  <strong className="block text-white text-[15px] mb-1">{opp.title}</strong>
                  <p className="text-sm text-muted m-0">{opp.desc}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-gold px-6 py-4 my-7 bg-gold/5 rounded-r-lg text-xl font-bold text-white">
              The difference between those making money and those still watching tutorials is simple: <span className="text-gold">They follow a system.</span>
            </div>

            <div className="mt-10 text-center">
              <a 
                href="https://aibusinessmastery.me/r/carameldigitals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gold text-dark font-black py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-all"
              >
                Show Me The System Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRODUCING SOLUTION */}
      <section className="py-10 pb-15">
        <div className="container">
          <Reveal className="bg-[linear-gradient(135deg,#1a1207,#111)] border-2 border-gold rounded-[20px] p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,168,76,0.1)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="inline-block bg-gold text-dark font-black text-[11px] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5">
              Introducing the Solution
            </div>
            <h2 className="h2-serif text-[clamp(28px,5vw,52px)] text-gold shadow-[0_0_40px_rgba(201,168,76,0.3)]">AI Business Mastery</h2>
            <p className="text-xl my-4 mb-7 text-[#e0d5c0]">A beginner-friendly system designed to show you exactly how to turn AI tools into real digital income opportunities — even if you're starting from zero.</p>
            <ul className="text-left max-w-[500px] mx-auto space-y-4 mb-8">
              {[
                "You're starting from zero — no problem",
                "You're not a tech expert — no problem",
                "You've never made money online before — no problem"
              ].map((item, i) => (
                <li key={i} className="relative pl-9 py-2.5 border-b border-[#222] text-[17px]">
                  <span className="absolute left-0 text-gold font-black text-lg">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gold text-dark font-black text-sm no-underline px-8 py-3.5 rounded-full tracking-tight transition-all hover:-translate-y-1 hover:scale-105 relative z-30 cursor-pointer"
            >
              👉 GET STARTED NOW
            </a>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#111] py-17.5 border-y border-[#222]">
        <div className="container">
          <Reveal className="section-label text-center">Social Proof</Reveal>
          <Reveal className="h2-serif text-center">Here's What AI Business Mastery<br />Participants Are Saying</Reveal>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 mt-10">
            {[
              { 
                name: "Adaeze O.", 
                role: "ABM Participant, Abuja", 
                text: "Before this training I was completely overwhelmed by AI tools — I didn't know where to start or what to focus on. After going through the program, I finally understand how to use them to create real opportunities. The clarity alone was worth everything." 
              },
              { 
                name: "Tunde K.", 
                role: "ABM Student, Lagos", 
                text: "This program simplified absolutely everything for me. I stopped jumping from tutorial to tutorial and finally had one clear, proven direction. Within weeks I went from confused to confident with a real income path." 
              },
              { 
                name: "Ngozi N.", 
                role: "Program Member, Port Harcourt", 
                text: "AI Business Mastery completely changed how I see AI tools. I used to think they were for tech experts only. Now I use them every day to generate income. If you've been sitting on the fence, stop waiting." 
              }
            ].map((testi, i) => (
              <Reveal key={i} className="bg-dark2 border border-[#2a2a2a] rounded-2xl p-7 transition-colors hover:border-gold/40">
                <div className="text-gold text-base mb-3.5 tracking-[2px]">★★★★★</div>
                <p className="text-[15px] text-[#E8E0D0] leading-relaxed mb-5 italic">"{testi.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-full bg-[linear-gradient(135deg,#C9A84C,#F7A033)] flex items-center justify-center font-black text-dark text-[15px] shrink-0">
                    {testi.name.split(' ')[0][0]}{testi.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{testi.name}</div>
                    <div className="text-xs text-muted">{testi.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-15 mb-6">
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
              <a href="https://ibb.co/YF0x535g" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/q3JvHdH6/In-Shot-20260303-221504719.jpg" alt="AI Business Mastery Testimonial" className="rounded-xl border-2 border-gold/20 object-cover w-full" referrerPolicy="no-referrer" />
              </a>
            </Reveal>
            <Reveal className="w-[300px]">
              <a href="https://ibb.co/dJMvs7nh" target="_blank" rel="noopener noreferrer">
                <img src="https://i.ibb.co/prwT6nCm/In-Shot-20260303-222042968.jpg" alt="AI Business Mastery Testimonial" className="rounded-xl border-2 border-gold/20 object-cover w-full" referrerPolicy="no-referrer" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="py-17.5">
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
              { num: "06", title: "The 72-Hour Execution System", desc: "The proven sprint framework that turns learning into action and action into income" }
            ].map((item, i) => (
              <Reveal key={i} className="bg-dark2 border border-[#2a2a2a] rounded-xl p-6.5 flex gap-4 items-start transition-all hover:border-gold hover:-translate-y-1">
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
      <section id="offer" className="bg-dark2 border-t-2 border-gold py-17.5">
        <div className="container">
          <Reveal className="section-label">Exclusive Bonuses</Reveal>
          <Reveal className="h2-serif">Join Today & Receive These<br />Exclusive Bonuses — First 20 Only</Reveal>
          <Reveal className="text-lg mb-8">To make sure you get results FASTER and don't get stuck, you'll receive all of these the moment you take action:</Reveal>

          <Reveal className="text-center mb-8">
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-[1.01] relative z-30 cursor-pointer"
            >
              <img 
                src="https://i.ibb.co/BHNc032y/Formal-Black-and-White-Letterhead-Design-20260304-180307-0000.png" 
                alt="Exclusive Bonuses Mockup" 
                className="max-w-full rounded-xl border border-gold/20 mx-auto"
                referrerPolicy="no-referrer"
              />
            </a>
          </Reveal>

          <div className="space-y-5">
            {[
              { title: "First 10 Sales in 7 Days Action Plan", desc: "Step-by-step roadmap to your first online wins. No guessing, no winging it — a clear blueprint.", worth: "₦20,000" },
              { title: "African Digital Income Starter Kit", desc: "Everything ambitious professionals need to start earning online — tailored for our market and realities.", worth: "₦35,000" },
              { title: "Personal Self-Discovery Prompt", desc: "Rediscover your strengths and know exactly which AI monetization path fits your personality and skills.", worth: "₦10,000" },
              { title: "AI Prompt Vault for Digital Sellers", desc: "Proven prompts to generate content, offers, and marketing materials — instantly and on demand.", worth: "₦20,000" },
              { title: "African Professionals AI Starter Kit", desc: "Tailored templates and real-world examples built for the African professional market.", worth: "₦15,000" },
              { title: "AI Video Generation & Editing Tutorial", desc: "Learn to create high-converting sales videos using AI + simple editing — no camera or studio needed.", worth: "₦30,000" }
            ].map((bonus, i) => (
              <Reveal key={i} className="bg-[linear-gradient(135deg,#1a1207,#0f0d08)] border border-gold/30 rounded-2xl p-6 flex items-start gap-5">
                <div className="text-[28px] shrink-0">📌</div>
                <div>
                  <div className="text-white font-bold text-base mb-1">{bonus.title}</div>
                  <div className="text-sm text-muted mt-1.5 mb-2">{bonus.desc}</div>
                  <span className="inline-block bg-gold/15 text-gold text-[12px] font-bold px-2.5 py-1 rounded-full">Worth {bonus.worth}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="bg-[linear-gradient(135deg,var(--color-gold),#F7A033)] text-dark rounded-2xl p-10 text-center mt-12 shadow-[0_20px_50px_rgba(201,168,76,0.4)] border-2 border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black px-4 py-1 uppercase tracking-widest rotate-45 translate-x-10 translate-y-4 shadow-md">Limited</div>
            <div className="text-xs font-black tracking-[0.2em] uppercase mb-2 opacity-80">Exclusive Fast-Action Offer</div>
            <h3 className="font-playfair text-[32px] md:text-[42px] font-black leading-tight mb-4">
              Unlock ₦130,000+ In Total Package
            </h3>
            <p className="text-base font-bold mb-8 max-w-[460px] mx-auto leading-relaxed">
              This massive bonus package is <span className="underline decoration-2">strictly reserved</span> for the <span className="bg-dark text-white px-2 py-0.5 rounded">first 20 enrollees</span> into the <span className="italic uppercase tracking-tighter">AI Business Mastery</span> program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
              <div className="text-center">
                <div className="text-[11px] font-black uppercase opacity-70">Total Package</div>
                <div className="text-3xl font-black">₦130,000+</div>
              </div>
              <div className="w-px h-10 bg-dark/20 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-[11px] font-black uppercase opacity-70">Your Investment</div>
                <div className="text-3xl font-black">₦50,000</div>
              </div>
            </div>
            <a 
              href="https://wa.link/2ctel3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-dark text-white font-black text-base no-underline px-12 py-4.5 rounded-full tracking-tight shadow-xl transition-all hover:-translate-y-1 hover:scale-105 z-30 relative cursor-pointer"
            >
              👉 CLAIM YOUR SPOT & BONUSES NOW
            </a>
            <div className="mt-4 text-[11px] font-bold uppercase tracking-widest opacity-60">
              Secure your leverage before the spots are gone
            </div>
            
            {/* TRUST BADGES */}
            <div className="mt-10 pt-8 border-t border-dark/10 flex flex-wrap justify-center gap-8 opacity-80">
              <div className="flex flex-col items-center gap-2">
                <Award className="text-dark" size={24} />
                <span className="text-[10px] font-black uppercase tracking-tighter">100% Satisfaction</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="text-dark" size={24} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Instant Access</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Users className="text-dark" size={24} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Expert Support</span>
              </div>
            </div>
          </Reveal>

          {/* RISK REVERSAL / GUARANTEE */}
          <Reveal className="mt-12 max-w-[700px] mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="text-gold" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">The "Elizabeth Emmanuel" Promise</h3>
            <p className="text-muted leading-relaxed">
              I am so confident in the **AI Business Mastery** system because I have seen it work for hundreds of professionals. If you follow the 72-hour sprint, use the templates, and don't feel you've gained absolute clarity and a path to income—I don't want your money. We are here to build success stories, not just collect enrollments.
            </p>
            <div className="mt-6 font-playfair italic text-gold">"Your success is my only metric."</div>
          </Reveal>

          <Reveal className="bg-accent/10 border border-accent/35 rounded-xl p-4 text-center text-accent font-bold text-[15px] mt-5">
            🔥 13 of 20 spots already taken this month
            <div className="bg-[#1a1a1a] rounded-full h-3 mt-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent2))]"
              ></motion.div>
            </div>
            <div className="flex justify-between text-[12px] text-muted mt-1.5"><span>7 spots left</span><span>20 spots total</span></div>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-[#111] py-17.5 border-t border-[#222]">
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
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0D0D0D_0%,#1a1207_100%)] py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative">
          <Reveal className="section-label">Ready? This Is Your Moment</Reveal>

          {/* COUNTDOWN TIMER */}
          <Reveal className="bg-[linear-gradient(135deg,#1a0f02,#0f0d08)] border-2 border-gold rounded-2xl p-8 text-center mx-auto mb-10 max-w-[560px]">
            <div className="text-[13px] font-black tracking-[0.15em] uppercase text-accent mb-4.5">⏳ Bonus Offer Expires In</div>
            <CountdownTimer />
            <div className="text-[13px] text-muted">🔥 Once this timer hits zero, the exclusive bonuses (worth ₦130,000+) are gone</div>
          </Reveal>

          <Reveal className="h2-serif text-[clamp(28px,5vw,50px)]">Curious to See How<br />AI Business Mastery Works?</Reveal>
          <Reveal className="max-w-[560px] mx-auto mb-9 text-lg">Click below to see the full breakdown of the program and how beginners just like you are starting their AI income journey — step by step.</Reveal>

          <Reveal>
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[linear-gradient(135deg,var(--color-gold)_0%,var(--color-accent2)_100%)] text-dark font-black text-[clamp(16px,2.5vw,20px)] no-underline px-12 py-5 rounded-full tracking-tight shadow-[0_8px_40px_rgba(201,168,76,0.35)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_60px_rgba(201,168,76,0.45)] z-30 relative m-4 cursor-pointer"
            >
              👉 SEE HOW AI BUSINESS MASTERY WORKS
            </a>
            <p className="text-sm text-muted mt-4">Discover the beginner roadmap to start your AI income journey</p>
          </Reveal>

          <Reveal className="mt-15 border-t border-[#222] pt-12">
            <p className="text-xl font-bold text-white mb-3">AI is moving fast.</p>
            <p className="text-[17px] text-muted max-w-[520px] mx-auto mb-9">Opportunities belong to those who act early. Click below to see how AI Business Mastery works — before the remaining spots are gone.</p>
            <a 
              href="https://aibusinessmastery.me/r/carameldigitals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[linear-gradient(135deg,var(--color-gold)_0%,var(--color-accent2)_100%)] text-dark font-black text-[clamp(16px,2.5vw,20px)] no-underline px-12 py-5 rounded-full tracking-tight shadow-[0_8px_40px_rgba(201,168,76,0.35)] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_60px_rgba(201,168,76,0.45)] z-30 relative m-4 cursor-pointer"
            >
              👉 ACCESS THE AI BUSINESS MASTERY BREAKDOWN
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-7 px-5 text-center">
        <p className="text-muted text-[13px]">© 2026 Caramel Digital Academy · Elizabeth Emmanuel · All Rights Reserved</p>
      </footer>
    </div>
  );
}
