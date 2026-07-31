import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  X,
  Download,
  Globe,
  MapPin,
  Mail,
  Linkedin,
  Instagram,
  Video,
  Cpu,
  TrendingUp,
  Moon,
  Sun,
  Code,
  Smartphone,
  BarChart2,
  Award
} from 'lucide-react';

// Exact image representation encoded directly so it displays error-free across all preview environments
const SIRUPLUM_EXACT_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900' viewBox='0 0 1200 900'><defs><linearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%233b1510'/><stop offset='50%25' stop-color='%23632117'/><stop offset='100%25' stop-color='%23220c08'/></linearGradient><radialGradient id='lantern' cx='50%25' cy='20%25' r='60%25'><stop offset='0%25' stop-color='%23ffb347' stop-opacity='0.8'/><stop offset='50%25' stop-color='%23d94b26' stop-opacity='0.4'/><stop offset='100%25' stop-color='%23000000' stop-opacity='0'/></radialGradient></defs><rect width='1200' height='900' fill='url(%23bg)'/><rect width='1200' height='900' fill='url(%23lantern)'/><g opacity='0.25' stroke='%23e3d0d2' stroke-width='1.5' fill='none'><path d='M100,50 Q300,200 500,50 T900,50 T1200,100'/><path d='M50,180 Q250,330 450,180 T850,180 T1150,230'/><path d='M800,100 L800,250 M850,120 L850,220 M900,90 L900,270'/><circle cx='850' cy='170' r='45'/><circle cx='1050' cy='140' r='35'/></g><g transform='translate(450, 220)'><ellipse cx='150' cy='480' rx='140' ry='220' fill='%23b82e1d'/><path d='M50,320 L250,320 L280,500 L20,500 Z' fill='%23e8a87c'/><path d='M80,220 C80,180 220,180 220,220 L250,350 L50,350 Z' fill='%23fce8d5'/><path d='M110,250 C110,230 190,230 190,250 L200,320 L100,320 Z' fill='%239e2a1b'/><path d='M100,210 C100,140 200,140 200,210 C190,250 110,250 100,210 Z' fill='rgba(255,255,255,0.75)' stroke='%23e3d0d2' stroke-width='2'/><path d='M125,160 Q150,100 175,160 Z' fill='%231a1918'/><circle cx='150' cy='125' r='22' fill='%231a1918'/><rect x='60' y='360' width='180' height='20' rx='5' fill='%234a2618'/><path d='M120,345 L180,345 L175,360 L125,360 Z' fill='%23faf8f5'/></g><g transform='translate(200, 260)' opacity='0.85'><ellipse cx='120' cy='450' rx='110' ry='180' fill='%23a12718'/><path d='M60,180 C60,150 180,150 180,180 L200,300 L40,300 Z' fill='%23f7d1be'/><path d='M80,170 C80,120 160,120 160,170 Z' fill='rgba(255,255,255,0.7)'/><circle cx='120' cy='110' r='18' fill='%231a1918'/></g><g transform='translate(750, 270)' opacity='0.85'><ellipse cx='120' cy='450' rx='110' ry='180' fill='%23a12718'/><path d='M60,180 C60,150 180,150 180,180 L200,300 L40,300 Z' fill='%23f7d1be'/><path d='M80,170 C80,120 160,120 160,170 Z' fill='rgba(255,255,255,0.7)'/><circle cx='120' cy='110' r='18' fill='%231a1918'/></g><text x='600' y='820' font-family='serif' font-size='26' fill='%23e3d0d2' text-anchor='middle' letter-spacing='4'>%E5%8F%99%E5%AE%B4%20%E2%80%A2%20%E4%B8%AD%E5%9B%BD%E5%8F%A4%E4%BB%A3%E6%B2%89%E6%B5%B8%E5%BC%8F%E5%AE%AB%E5%BB%B7%E7%9B%9B%E5%AE%B4</text></svg>";

// Morandi Dusty Pink Spectrum
const MORANDI_PINK = {
  softRoseWhite: '#FBF7F7', // Light background
  blushCream: '#F4ECEE', // Card background
  dustyRose: '#E3D0D2', // Signature Morandi Pink
  mediumRose: '#D8C0C2', // Accent Rose
  deepRoseTaupe: '#BFA8AA', // Muted Taupe Pink
  mutedMauve: '#9A8285', // Soft Mauve Text/Border
  roseCharcoal: '#2E2829', // Text/Dark Accent
  darkCard: '#383032', // Dark Theme Card
  darkBg: '#1F1A1B' // Dark Theme Background
};

// Replace with your own Formspree endpoint: https://formspree.io -> New Form -> copy the endpoint URL
const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeNav, setActiveNav] = useState('hero');
  const [contactOpen, setContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamically load Google Fonts (Playfair Display & Inter)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setFormStatus('sending');
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        setFormStatus('sent');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#E3D0D2] selection:text-[#2E2829] ${darkMode ? 'bg-[#1F1A1B] text-[#FBF7F7]' : 'bg-[#FBF7F7] text-[#2E2829]'}`}>
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#BFA8AA] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-[#1F1A1B]/85 border-[#383032]' : 'bg-[#FBF7F7]/85 border-[#E3D0D2]/60'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo with Sparkle Icon */}
          <button onClick={() => scrollTo('hero')} className="flex items-center space-x-2 text-left group">
            <span className="text-[#BFA8AA] text-lg font-serif">✧</span>
            <div>
              <span className="font-serif text-xl tracking-tight block font-medium group-hover:text-[#BFA8AA] transition-colors">
                Suet Wing Kwan
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 block font-sans font-medium text-[#9A8285]">
                Toronto • Marketing & AI Creator
              </span>
            </div>
          </button>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm tracking-wide font-medium">
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Works' },
              { id: 'services', label: 'Services' },
              { id: 'ai-showcase', label: 'AI Workflow' },
              { id: 'process', label: 'Process' },
              { id: 'experience', label: 'Experience' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative py-1 transition-colors hover:text-[#BFA8AA] ${activeNav === item.id ? (darkMode ? 'text-[#E3D0D2]' : 'text-[#2E2829]') : 'opacity-70'}`}
              >
                {item.label}
                {activeNav === item.id && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BFA8AA]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all ${darkMode ? 'border-[#383032] bg-[#2E2829] text-[#E3D0D2] hover:border-[#E3D0D2]' : 'border-[#E3D0D2] bg-[#FBF7F7] text-[#2E2829] hover:border-[#BFA8AA]'}`}
              title="Toggle theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className={`text-xs uppercase tracking-widest px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm ${darkMode ? 'bg-[#E3D0D2] text-[#1F1A1B] hover:bg-white' : 'bg-[#E3D0D2] text-[#2E2829] hover:bg-[#BFA8AA] hover:text-white'}`}
            >
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20">
        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-16 pb-16">
          {/* Wave/Organic Soft Pink Background Blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden opacity-60 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 15, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-10 w-[550px] h-[550px] rounded-full blur-[100px]"
              style={{ backgroundColor: MORANDI_PINK.dustyRose }}
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -20, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full blur-[110px]"
              style={{ backgroundColor: MORANDI_PINK.blushCream }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 my-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-[#BFA8AA]/40 text-xs font-medium text-[#9A8285] bg-[#E3D0D2]/20"
            >
              <span>✨ Marketing, CapCut Video & AI Content Specialist</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.1] tracking-tight"
            >
              Creativity meets <span className="italic text-[#BFA8AA]">curiosity</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl font-light opacity-85 leading-relaxed max-w-2xl mx-auto font-sans"
            >
              I help brands tell meaningful stories through short-form video, visual design, and AI-powered creative workflows. Passionate about creating content that is both aesthetically compelling and strategically driven.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4 flex flex-wrap gap-4 items-center justify-center"
            >
              <button
                onClick={() => scrollTo('projects')}
                className={`px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm flex items-center space-x-2 ${darkMode ? 'bg-[#E3D0D2] text-[#1F1A1B] hover:bg-white' : 'bg-[#2E2829] text-[#FBF7F7] hover:bg-black'}`}
              >
                <span>View My Work</span>
                <ArrowUpRight size={15} />
              </button>
              <button
                onClick={() => scrollTo('about')}
                className={`px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all duration-300 flex items-center space-x-2 ${darkMode ? 'border-[#383032] hover:border-[#E3D0D2] text-[#E3D0D2]' : 'border-[#BFA8AA] hover:border-[#2E2829] text-[#2E2829] bg-[#E3D0D2]/20'}`}
              >
                <span>About Me</span>
                <ChevronRight size={15} />
              </button>
            </motion.div>
          </div>

          {/* Featured Tools / Credibility Banner */}
          <div className="mt-20 pt-8 border-t border-[#BFA8AA]/20">
            <p className="text-[11px] uppercase tracking-[0.25em] text-center text-[#BFA8AA] font-semibold mb-6">
              FEATURED TOOLS & MARKETING ECOSYSTEM
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all text-xs font-semibold uppercase tracking-wider text-[#9A8285]">
              <span className="flex items-center space-x-2"><Video size={16} /><span>CapCut Pro</span></span>
              <span className="flex items-center space-x-2"><Instagram size={16} /><span>Instagram Reels</span></span>
              <span className="flex items-center space-x-2"><Smartphone size={16} /><span>TikTok Creator</span></span>
              <span className="flex items-center space-x-2"><Cpu size={16} /><span>ChatGPT & Gemini</span></span>
              <span className="flex items-center space-x-2"><Code size={16} /><span>Vibe Coding & AI</span></span>
              <span className="flex items-center space-x-2"><Award size={16} /><span>Seneca Polytechnic</span></span>
            </div>
          </div>
        </section>

        {/* FEATURED WORKS SECTION */}
        <section id="projects" className={`py-24 border-t ${darkMode ? 'border-[#383032] bg-[#2E2829]/30' : 'border-[#E3D0D2] bg-[#F7EFF0]/60'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#BFA8AA] font-semibold block mb-2">
                  ✨ Portfolio
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal">
                  Selected Works & Client Impact
                </h2>
              </div>
              <p className="text-xs sm:text-sm opacity-70 max-w-xs mt-3 sm:mt-0 font-sans">
                Real campaigns tailored for Toronto local businesses and Asian brands scaling in Western markets.
              </p>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 'p1',
                  title: 'Toronto Home Nail Studio',
                  subtitle: 'Soft Japandi Instagram launch & local client booking engine',
                  category: 'Nail Studio & Beauty',
                  impact: '0 → 500 IG Followers | 10k+ Views | 30 Converted Clients',
                  image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1200',
                  problem: 'A boutique Toronto home nail studio needed to establish brand presence on Instagram to attract local Western and English-speaking appointment clients.',
                  solution: 'Crafted a soft Japandi feed, filmed micro nail art reels, edited professional short clips on CapCut with beat-synced audio, growing audience from 0 to 500 in 1 month, generating over 10,000 organic profile views and converting 30 target audience members into loyal recurring customers.',
                  tools: ['CapCut Pro', 'Instagram Reels', 'Canva', 'ChatGPT'],
                  role: 'Content Strategist & Video Editor'
                },
                {
                  id: 'p2',
                  title: 'Asian Brand Western Transition',
                  subtitle: 'Bilingual positioning & short-form video adaptation',
                  category: 'Cross-Cultural Branding',
                  impact: '+220% Social Engagement',
                  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200',
                  problem: 'Local Asian lifestyle businesses struggling to communicate their craftsmanship to broader North American audiences on Instagram & TikTok.',
                  solution: 'Replaced text-heavy graphic posts with clean Morandi aesthetic photography and story-driven video reels highlighting product authenticity.',
                  tools: ['Gemini', 'Claude 3.5', 'CapCut', 'Figma'],
                  role: 'Brand Marketer & Content Specialist'
                },
                {
                  id: 'p3',
                  title: 'Siruplum Studio — Imperial Court Banquet (宮宴)',
                  subtitle: 'Generative AI content workflow & university association partnerships',
                  category: 'Cultural Campaign & AI Operations',
                  impact: 'Toronto University Partnerships',
                  image: SIRUPLUM_EXACT_IMAGE,
                  problem: 'Siruplum Studio needed to execute the "Imperial Court Banquet" (宮宴) campaign, blending traditional Chinese culture with modern digital marketing to engage university students and broader audiences in Toronto.',
                  solution: 'Leveraged generative AI tools to design visual assets and streamline content workflows. Conceptualized and executed the "Imperial Court Banquet" campaign, while negotiating strategic partnerships with Chinese Student Associations across Toronto universities.',
                  tools: ['ChatGPT', 'Claude 3.5', 'AI Workflows', 'CapCut', 'Partnership Outreach'],
                  role: 'Marketing & AI Content Strategist'
                }
              ].map((proj) => (
                <motion.div
                  key={proj.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(proj)}
                  className={`group cursor-pointer rounded-3xl border overflow-hidden transition-all duration-300 ${darkMode ? 'border-[#383032] bg-[#2E2829] hover:border-[#E3D0D2]' : 'border-[#E3D0D2] bg-white hover:border-[#BFA8AA]'}`}
                >
                  {/* Card Top Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#D8C0C2] p-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 text-[#2E2829] dark:text-[#E3D0D2] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium shadow-sm">
                      {proj.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-medium mb-1 group-hover:text-[#BFA8AA] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs opacity-75 mb-4 font-sans leading-relaxed">
                      {proj.subtitle}
                    </p>

                    {/* Quick Metric Badge */}
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#E3D0D2]/20 border border-[#E3D0D2]/50 text-[11px] font-semibold text-[#9A8285] mb-5">
                      ★ {proj.impact}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#BFA8AA]/20 text-xs font-semibold text-[#BFA8AA]">
                      <span className="flex items-center space-x-1">
                        <span>View Project</span>
                        <ChevronRight size={14} />
                      </span>
                      <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-24 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <span className="font-serif italic text-2xl text-[#BFA8AA] block">
              Hello, I'm Suet Wing ♡
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              Business-Marketing graduate from Seneca Polytechnic, based in Toronto.
            </h2>
            <p className="text-base sm:text-lg opacity-85 leading-relaxed font-sans font-light">
              I started my creative journey by exploring photography, design, and social media, and gradually expanded into video editing, branding, AI-assisted content creation, and digital marketing. Rather than following a single path, I've learned by experimenting with different creative disciplines and real projects.
            </p>
            <p className="text-sm sm:text-base opacity-85 leading-relaxed font-sans font-light">
              Every experience—from supporting marketing events to building websites and creating content—has strengthened my ability to tell stories visually and adapt quickly to new tools. Fluent in <b>English, Mandarin, and Cantonese</b>, I bridge cultural communication gaps seamlessly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setContactOpen(true)}
                className={`px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${darkMode ? 'border-[#E3D0D2] hover:bg-[#E3D0D2] hover:text-[#1F1A1B]' : 'border-[#2E2829] hover:bg-[#2E2829] hover:text-[#FBF7F7]'}`}
              >
                Contact Me →
              </button>
            </div>
          </div>
        </section>

        {/* "HOW I CAN HELP" SERVICES GRID */}
        <section id="services" className={`py-24 border-t ${darkMode ? 'border-[#383032] bg-[#2E2829]/30' : 'border-[#E3D0D2] bg-[#F7EFF0]'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#BFA8AA] font-semibold block mb-2">
                ✧ Capabilities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal">
                How I Can Help Your Business
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Smartphone size={24} />,
                  title: 'Western Social Branding',
                  desc: 'Helping Asian & local Toronto brands transition onto Instagram and TikTok with aesthetic appeal.'
                },
                {
                  icon: <Video size={24} />,
                  title: 'CapCut Video Editing',
                  desc: 'Professional short-form video editing, audio isolation, beat-sync cuts, and engaging subtitles.'
                },
                {
                  icon: <BarChart2 size={24} />,
                  title: 'AI Data & Audience Research',
                  desc: 'Using ChatGPT, Gemini, and Claude for competitor analysis, customer persona mapping, and copywriting.'
                },
                {
                  icon: <Globe size={24} />,
                  title: 'Trilingual Communication',
                  desc: 'Fluent in English, Mandarin, and Cantonese for smooth cross-cultural partnerships & campaigns.'
                }
              ].map((service, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl border text-center transition-all hover:-translate-y-1 ${darkMode ? 'border-[#383032] bg-[#1F1A1B]' : 'border-[#E3D0D2] bg-white'}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#E3D0D2]/30 text-[#9A8285] mx-auto flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs opacity-75 leading-relaxed font-sans">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI WORKFLOW BENTO SECTION */}
        <section id="ai-showcase" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#BFA8AA] font-semibold block mb-2 flex items-center space-x-2">
              <Sparkles size={14} className="text-[#D8C0C2]" />
              <span>Generative AI Engine</span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-3">
              Generative AI Operations & Advanced Capabilities
            </h2>
            <p className="text-sm opacity-80 font-sans leading-relaxed">
              Leveraging artificial intelligence for data-driven market analysis, ad strategy, SEO, target audience profiling, and platform development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-8 rounded-3xl border ${darkMode ? 'border-[#383032] bg-[#2E2829]' : 'border-[#E3D0D2] bg-[#FBF7F7]'}`}>
              <div className="p-3 rounded-2xl bg-[#E3D0D2]/40 text-[#2E2829] inline-block mb-4">
                <Code size={22} />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">Vibe Coding (Atmosphere & Platform Dev)</h3>
              <p className="text-xs opacity-80 font-sans leading-relaxed">
                Collaborating with AI to rapidly prototype, build, and customize interactive personal brand platforms, landing pages, and digital web apps with pristine aesthetic standards.
              </p>
            </div>
            <div className={`p-8 rounded-3xl border ${darkMode ? 'border-[#383032] bg-[#2E2829]' : 'border-[#E3D0D2] bg-[#FBF7F7]'}`}>
              <div className="p-3 rounded-2xl bg-[#E3D0D2]/40 text-[#2E2829] inline-block mb-4">
                <BarChart2 size={22} />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">AI Market Data & Competitor Analysis</h3>
              <p className="text-xs opacity-80 font-sans leading-relaxed">
                Professional use of AI tools to analyze market data, evaluate competing companies, optimize ad performance, enhance SEO, and pinpoint target audience behaviors.
              </p>
            </div>
            <div className={`p-8 rounded-3xl border ${darkMode ? 'border-[#383032] bg-[#2E2829]' : 'border-[#E3D0D2] bg-[#FBF7F7]'}`}>
              <div className="p-3 rounded-2xl bg-[#E3D0D2]/40 text-[#2E2829] inline-block mb-4">
                <Video size={22} />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">AI Video & Smart Editing</h3>
              <p className="text-xs opacity-80 font-sans leading-relaxed">
                Integrating AI-assisted video workflows and CapCut Pro capabilities for smart auto-captioning, audio isolation, color grading, and optimized short-form pacing.
              </p>
            </div>
          </div>
        </section>

        {/* THE PROCESS SECTION */}
        <section id="process" className={`py-24 border-t ${darkMode ? 'border-[#383032] bg-[#2E2829]/30' : 'border-[#E3D0D2] bg-[#F7EFF0]'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] text-[#BFA8AA] font-semibold block mb-2">
                ✧ Method
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal">
                The Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'Discover', desc: 'Understanding your brand goals, target audience, and local Toronto market positioning.' },
                { num: '02', title: 'Plan', desc: 'Conducting AI research (ChatGPT/Gemini) to draft short-form video hooks & campaign frameworks.' },
                { num: '03', title: 'Create & Edit', desc: 'Curating visual assets and editing clips on CapCut with beat-synced audio & custom captions.' },
                { num: '04', title: 'Launch & Partner', desc: 'Communicate with coworkers, check results, and continuously improve campaign performance.' },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-3xl border text-center ${darkMode ? 'border-[#383032] bg-[#1F1A1B]' : 'border-[#E3D0D2] bg-white'}`}
                >
                  <div className="font-serif text-3xl font-medium text-[#BFA8AA] mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs opacity-75 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="py-24 max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#BFA8AA] font-semibold block mb-2">
              Timeline
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal">
              Experience & Education
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                period: '2026 — Present',
                role: 'Social Media & Video Creator',
                company: 'Freelance / Client Projects • Toronto, ON',
                desc: 'Helped local Chinese and Toronto boutique businesses (including home nail studios) grow on Instagram and TikTok using CapCut video editing and AI market analysis.',
                bullets: [
                  'Grew home nail studio Instagram audience from 0 to 500 followers in 1 month, driving 30 client conversions.',
                  'Produced short-form videos with CapCut and conducted audience research using ChatGPT and Gemini.'
                ]
              },
              {
                period: '2024 — Present',
                role: 'Marketing, Social Media & AI Content Creator',
                company: 'Siruplum Studio • Toronto, ON',
                desc: 'Leading AI-driven content creation, campaign execution, and strategic partnership negotiations for a Chinese cultural studio in Toronto.',
                bullets: [
                  'Generative AI Content & Workflow: Leveraged generative AI tools to streamline content creation, design visual assets, and optimize marketing workflows for digital media campaigns. Integrated AI workflows into social media operations to produce high-quality cultural content efficiently.',
                  'Strategy & Campaign Execution: Conceptualized and executed the "Imperial Court Banquet" (宮宴) campaign end-to-end, blending traditional Chinese culture with modern digital marketing strategies. Drove brand exposure and audience growth via data-driven content.',
                  'Cross-Functional Communication & Partnerships: Initiated and negotiated partnerships with Chinese Student Associations across universities in Toronto. Collaborated with cross-departmental teams and external partners to execute joint promotional events.'
                ]
              },
              {
                period: 'Graduated',
                role: 'Diploma in Business-Marketing',
                company: 'Seneca Polytechnic • Toronto, ON',
                desc: 'Specialized in modern digital marketing strategies, consumer behavior, market segmentation, and brand communication. Fluent in English, Mandarin, and Cantonese.',
                bullets: [
                  'Applied coursework directly to real-world client brand projects and event campaigns in Toronto.'
                ]
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between gap-4 ${darkMode ? 'border-[#383032] bg-[#2E2829]' : 'border-[#E3D0D2] bg-white'}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#BFA8AA]">{item.period}</span>
                    <span className="text-xs font-semibold text-[#9A8285]">{item.company}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium mt-1 mb-2">{item.role}</h3>
                  <p className="text-xs opacity-80 font-sans mb-4 leading-relaxed">{item.desc}</p>
                  {item.bullets && (
                    <ul className="space-y-2 text-xs font-sans opacity-75 pl-1 border-t border-[#BFA8AA]/20 pt-3">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-[#BFA8AA] font-bold">•</span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t text-xs font-sans ${darkMode ? 'border-[#383032] bg-[#1F1A1B] text-[#FBF7F7]/70' : 'border-[#E3D0D2] bg-[#FBF7F7] text-[#2E2829]/70'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-[#BFA8AA]">✧</span>
            <span>© {new Date().getFullYear()} Suet Wing Kwan. Toronto, ON.</span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setContactOpen(true)}
              className="hover:text-[#BFA8AA] transition-colors flex items-center space-x-1"
            >
              <Mail size={14} />
              <span>Contact Me</span>
            </button>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>Toronto, ON</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 z-10 shadow-xl ${darkMode ? 'bg-[#2E2829] text-[#FBF7F7]' : 'bg-[#FBF7F7] text-[#2E2829]'}`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-current opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#BFA8AA]">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-serif text-2xl font-normal mt-1">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#D8C0C2]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 text-xs">
                  <div>
                    <span className="opacity-60 block">My Role</span>
                    <span className="font-medium">{selectedProject.role}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block">Tools Used</span>
                    <span className="font-medium">{selectedProject.tools.join(', ')}</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <h3 className="font-serif text-base font-medium text-[#BFA8AA] mb-1">Challenge & Context</h3>
                    <p className="opacity-80 leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-medium text-[#BFA8AA] mb-1">Solution & Execution</h3>
                    <p className="opacity-80 leading-relaxed">{selectedProject.solution}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#BFA8AA]/30 bg-[#BFA8AA]/10">
                    <h3 className="font-serif text-base font-medium mb-1">Key Impact</h3>
                    <p className="opacity-90">{selectedProject.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 z-10 shadow-xl ${darkMode ? 'bg-[#2E2829] text-[#FBF7F7]' : 'bg-[#FBF7F7] text-[#2E2829]'}`}
            >
              <button
                onClick={() => setContactOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full border border-current opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>

              <div className="space-y-1 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#BFA8AA]">
                  Get In Touch
                </span>
                <h2 className="font-serif text-2xl font-normal mt-1">
                  Let's work together
                </h2>
                <p className="text-xs opacity-70 font-sans pt-1">
                  Send a message and I'll get back to you shortly.
                </p>
              </div>

              {formStatus === 'sent' ? (
                <div className="p-6 rounded-xl border border-[#BFA8AA]/30 bg-[#BFA8AA]/10 text-center space-y-2">
                  <p className="font-serif text-lg">Message sent ✧</p>
                  <p className="text-xs opacity-70 font-sans">Thanks for reaching out — I'll reply soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                  <div>
                    <label className="text-xs font-medium opacity-70 block mb-1.5" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[#BFA8AA] ${darkMode ? 'bg-[#1F1A1B] border-[#383032] text-[#FBF7F7]' : 'bg-white border-[#E3D0D2] text-[#2E2829]'}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium opacity-70 block mb-1.5" htmlFor="email">Your Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[#BFA8AA] ${darkMode ? 'bg-[#1F1A1B] border-[#383032] text-[#FBF7F7]' : 'bg-white border-[#E3D0D2] text-[#2E2829]'}`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium opacity-70 block mb-1.5" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[#BFA8AA] resize-none ${darkMode ? 'bg-[#1F1A1B] border-[#383032] text-[#FBF7F7]' : 'bg-white border-[#E3D0D2] text-[#2E2829]'}`}
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-xs text-red-500">Something went wrong — please try again in a moment.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all disabled:opacity-60 ${darkMode ? 'bg-[#E3D0D2] text-[#1F1A1B] hover:bg-white' : 'bg-[#2E2829] text-[#FBF7F7] hover:bg-black'}`}
                  >
                    {formStatus === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
