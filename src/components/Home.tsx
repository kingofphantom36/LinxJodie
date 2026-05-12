import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Instagram, Rocket, Home as HomeIcon, CreditCard, MessageCircle, Scissors, Layers, X } from 'lucide-react';
import { track } from '@vercel/analytics';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// JODIE EFFECT - HIGH-VOLTAGE FLORAL CHROMA ENGINE
const AbstractChromaBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020202]">
      
      {/* Abstract Petal 1: Nuclear Orchid Bloom */}
      <motion.div
        className="absolute top-[0%] left-[-15%] w-[65vw] h-[65vw] bg-[#da70d6]/40 blur-[50px] mix-blend-screen"
        style={{ 
          borderRadius: '50% 0 50% 0',
          boxShadow: '0 0 120px rgba(218,112,214,0.6)'
        }}
        animate={{
          rotate: [0, 20, 0],
          scale: [1, 1.25, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Abstract Petal 2: Neon Turquoise Leaf */}
      <motion.div
        className="absolute bottom-[-5%] right-[-15%] w-[75vw] h-[75vw] bg-[#40e0d0]/40 blur-[60px] mix-blend-screen"
        style={{ 
          borderRadius: '0 50% 0 50%',
          boxShadow: '0 0 120px rgba(64,224,208,0.6)'
        }}
        animate={{
          rotate: [0, -20, 0],
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core Energy Center: Blinding fusion of both */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-[#40e0d0]/30 to-[#da70d6]/30 blur-[80px] mix-blend-screen"
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.6, 0.95, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

function BentoBlock({ Icon, title, sub, href, colSpan = 1, badge, highlight = false, locked = false, onClick, order }: any) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 25 });
  const springY = useSpring(y, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: any) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.05);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.05);
  };

  const Component = onClick ? motion.button : motion.a;
  const linkProps = onClick ? { onClick } : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: order * 0.1 }} 
      className={`${colSpan === 2 ? 'col-span-2' : 'col-span-1'} ${locked ? 'pointer-events-none' : ''} h-full`}
    >
      <Component
        ref={ref as any} 
        {...linkProps} 
        style={{ x: springX, y: springY }}
        animate={{ 
          borderColor: highlight 
            ? ['rgba(64,224,208,0.4)', 'rgba(218,112,214,0.8)', 'rgba(64,224,208,0.4)'] 
            : ['rgba(255,255,255,0.1)', 'rgba(64,224,208,0.5)', 'rgba(255,255,255,0.1)'] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
        className={`group relative flex flex-col justify-between p-4 rounded-[20px] bg-[#02050A]/90 backdrop-blur-md border-[1px] overflow-hidden min-h-[95px] w-full h-full transition-all text-left shadow-[0_8px_30px_rgba(0,0,0,0.9)]
          ${locked ? 'opacity-40 blur-[0.5px]' : 'active:scale-95'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#40e0d0]/[0.05] to-transparent pointer-events-none" />
        <div className="flex justify-between items-start z-10">
          {Icon && <Icon className="text-[#40e0d0] w-5 h-5 group-hover:text-[#da70d6] group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_10px_rgba(64,224,208,0.6)]" strokeWidth={1.5} />}
          {badge && <span className="px-2 py-0.5 text-[7px] font-black uppercase tracking-widest text-black bg-gradient-to-r from-[#40e0d0] to-[#da70d6] rounded-sm shadow-[0_0_10px_rgba(218,112,214,0.5)]">{badge}</span>}
        </div>
        <div className="z-10 mt-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white group-hover:text-[#40e0d0] transition-colors uppercase mb-0.5 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{title}</p>
          <p className="text-[8px] text-white/60 font-light tracking-wider leading-tight line-clamp-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{sub}</p>
        </div>
      </Component>
    </motion.div>
  );
}

// THE MODAL COMPONENT
const DemosModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const demos = [
    { name: "Ain't That Clean OS", category: "Trade", url: "https://aintthatcleanltd.co.uk" },
    { name: "Le Loft Belesta", category: "Holiday", url: "https://leloftbelesta.eu/tourdefrance" },
    { name: "Salon OS", category: "Salon", url: "https://www.lfg369.co.uk/demos/salon" },
    { name: "Auto Detail OS", category: "Automotive", url: "https://www.lfg369.co.uk/demos/auto-detail" },
    { name: "EV Electrical OS", category: "Trade", url: "https://www.lfg369.co.uk/demos/ev-electrical" },
    { name: "Plumbing OS", category: "Trade", url: "https://www.lfg369.co.uk/demos/plumbing" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/90 backdrop-blur-lg"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-sm bg-[#02050A] border border-[#40e0d0]/50 rounded-[20px] overflow-hidden shadow-[0_0_80px_rgba(218,112,214,0.3)] relative"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/10 bg-black/80">
              <div>
                <h3 className="text-[#da70d6] text-[9px] uppercase tracking-[0.3em] font-bold">Verified Units</h3>
                <h2 className="text-[#40e0d0] font-bold tracking-widest uppercase text-sm mt-1 drop-shadow-[0_0_8px_rgba(64,224,208,0.5)]">Global Network</h2>
              </div>
              <button onClick={onClose} className="text-white/60 hover:text-[#da70d6] transition-colors bg-white/10 rounded-full p-1.5">
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="p-3 max-h-[60vh] overflow-y-auto">
              {demos.map((demo, idx) => (
                <a 
                  key={idx} href={demo.url} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col p-4 mb-2 rounded-xl bg-black/80 border border-white/10 hover:border-[#40e0d0] hover:bg-[#40e0d0]/10 transition-all group shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-[7px] uppercase tracking-[0.3em] text-[#da70d6] font-bold mb-1">{demo.category}</span>
                  <span className="text-[11px] text-white font-bold tracking-widest uppercase group-hover:text-[#40e0d0] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{demo.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const whatsappUrl = "https://wa.me/447787206918"; 
  const stripeUrl = "https://buy.stripe.com/3cIfZi4sw3cS9VwcsC2Fa0e"; 

  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-between overflow-hidden bg-black text-white p-4">
      
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');`}
      </style>

      <AbstractChromaBackground />
      
      {/* Edge Shadow Fade: Keeps edges dark but lets the nuclear center punch through */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      {/* Glowing Banner Layer - High Voltage Color Morphing */}
      <div className="absolute top-0 left-0 w-full z-0 flex justify-center pt-5 pointer-events-none">
        <motion.img 
          src="/vorsprungtech.png" alt="Authority" className="w-full h-auto max-h-[90px] object-contain px-10 opacity-100" 
          animate={{ 
            filter: [
              'drop-shadow(0 0 20px rgba(64,224,208,1))', 
              'drop-shadow(0 0 35px rgba(218,112,214,1))', 
              'drop-shadow(0 0 20px rgba(64,224,208,1))'  
            ] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content Stack */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-4 mt-[110px]">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          
          <div className="relative w-24 h-24 rounded-2xl border-[1px] border-[#da70d6]/50 overflow-hidden shadow-[0_0_50px_rgba(218,112,214,0.4)] mb-4 bg-black group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#40e0d0]/30 to-[#da70d6]/30 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" />
            <img 
              src="/jodie.jpg" 
              alt="Jodie Jones" 
              className="w-full h-full object-cover contrast-110 brightness-95" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 mix-blend-multiply z-20" />
            <div className="absolute inset-0 shadow-[inset_0_0_25px_rgba(0,0,0,0.9)] z-20" />
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <h1 
              className="text-[22px] tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#40e0d0] to-[#da70d6] drop-shadow-[0_0_15px_rgba(64,224,208,0.8)]"
              style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}
            >
              Jodie Jones
            </h1>
          </div>
          
          <div className="mt-4 relative flex items-center justify-center px-6 py-2 overflow-hidden bg-[#da70d6]/10 border-y-[1px] border-[#40e0d0]/50 rounded-sm shadow-[0_0_25px_rgba(218,112,214,0.3)] backdrop-blur-md">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#40e0d0]/40 to-transparent w-[200%]"
              animate={{ x: ['-100%', '50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-[8px] uppercase tracking-[0.4em] text-white font-bold relative z-10 flex items-center gap-2 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#40e0d0] animate-pulse shadow-[0_0_8px_#40e0d0]" />
              Managing Director
            </span>
          </div>
        </div>

        {/* 6-Block Matrix Grid */}
        <div className="grid grid-cols-2 gap-2 w-full mt-2 px-1">
          <BentoBlock Icon={Rocket} title="Trade" sub="Ain't That Clean." href="https://aintthatcleanltd.co.uk" colSpan={1} highlight={true} order={0} />
          <BentoBlock Icon={HomeIcon} title="Holiday" sub="Le Loft Demo." href="https://leloftbelesta.eu/tourdefrance" colSpan={1} order={1} />
          <BentoBlock Icon={Scissors} title="Adored Beauty" sub="adoredbeauty.co.uk" href="https://adoredbeauty.co.uk" colSpan={1} order={2} />
          <BentoBlock Icon={Layers} title="All Demos" sub="View Network." onClick={() => setIsModalOpen(true)} colSpan={1} highlight={true} order={3} />
          <BentoBlock Icon={CreditCard} title="Deploy" sub="Secure £81 Slot." href={stripeUrl} colSpan={1} badge="WAITLIST" order={4} />
          <BentoBlock Icon={MessageCircle} title="Comms" sub="Encrypted Line." href={whatsappUrl} colSpan={1} order={5} />
        </div>
      </div>

      {/* Bottom Stack: Socials + Footer */}
      <div className="relative z-10 w-full flex flex-col items-center gap-5 pb-4">
        <div className="flex justify-center gap-14">
          <a href="https://x.com/TheLogikOS" target="_blank" rel="noopener noreferrer" className="text-[#da70d6] hover:text-[#40e0d0] hover:scale-110 active:scale-95 transition-all drop-shadow-[0_0_8px_rgba(218,112,214,0.6)]"><XIcon /></a>
          <a href="https://www.instagram.com/vorsprung.tech/" target="_blank" rel="noopener noreferrer" className="text-[#da70d6] hover:text-[#40e0d0] hover:scale-110 active:scale-95 transition-all drop-shadow-[0_0_8px_rgba(218,112,214,0.6)]"><Instagram size={20} strokeWidth={2} /></a>
        </div>
        
        <div className="flex flex-col items-center gap-1 opacity-70 uppercase text-[6px] tracking-[0.5em] font-bold font-mono drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          <span className="text-white">Powered by LogikOS</span>
          <span className="text-[#40e0d0] drop-shadow-[0_0_5px_#40e0d0]">3-6-9</span>
        </div>
      </div>

      <DemosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}