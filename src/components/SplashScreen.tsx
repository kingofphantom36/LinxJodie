import React, { useEffect, useState } from 'react';
import { Code, Cpu, Globe, Database, Network, Server, Lock, ShieldCheck } from 'lucide-react';

// --- CUSTOM HOOK: TEXT SCRAMBLE / DECRYPTION EFFECT ---
const useScramble = (targetText: string, startDelay: number = 0, speed: number = 40) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    
    const startScramble = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(prev => 
          targetText
            .split('')
            .map((letter, index) => {
              if (index < iteration) return targetText[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Decryption speed
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startScramble);
      clearInterval(interval);
    };
  }, [targetText, startDelay, speed]);

  return displayText;
};

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splashSeen') !== 'true';
    }
    return true; 
  });

  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState("INITIALIZING KERNEL...");
  
  // Faster decryption: 200ms delay, 25ms speed
  const scrambledVorsprung = useScramble("VORSPRUNG", 200, 25); 

  // Background Icons configuration (Floating Physics)
  const backgroundIcons = [
    { Icon: Code,     top: '15%', left: '10%', size: 30,  duration: '6s', delay: '0s' },
    { Icon: Globe,    top: '25%', left: '85%', size: 40,  duration: '8s', delay: '1s' },
    { Icon: Cpu,      top: '45%', left: '20%', size: 35,  duration: '7s', delay: '2s' },
    { Icon: Database, top: '65%', left: '75%', size: 45,  duration: '9s', delay: '0.5s' },
    { Icon: Network,  top: '80%', left: '15%', size: 38,  duration: '7.5s', delay: '1.5s' },
    { Icon: Server,   top: '10%', left: '60%', size: 32,  duration: '6.5s', delay: '3s' },
    { Icon: Lock,     top: '85%', left: '85%', size: 28,  duration: '8.5s', delay: '2.5s' },
  ];

  useEffect(() => {
    if (!isVisible) {
      onComplete();
      return;
    }

    // 1. Progress Bar Logic (Much Faster: 30ms interval)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Larger increments to simulate a powerful, fast boot
        const increment = Math.random() > 0.7 ? 15 : 3; 
        return Math.min(prev + increment, 100);
      });
    }, 30); 

    // 2. Boot Status Messages (Accelerated timeline)
    const steps = [
      { t: 400, msg: "LOADING ASSETS..." },
      { t: 1200, msg: "ESTABLISHING SECURE CONNECTION..." },
      { t: 1800, msg: "DECRYPTING CORE LOGIC..." },
      { t: 2500, msg: "SYSTEM READY." }
    ];

    steps.forEach(step => {
      setTimeout(() => setBootStep(step.msg), step.t);
    });

    // 3. Completion Logic (Slashed from 6.5s down to 3.2s)
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('splashSeen', 'true');
      setTimeout(onComplete, 500); // Shorter fade transition
    }, 3200); 

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[#050505] overflow-hidden">
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-[#00F5FF]/5 to-transparent h-[20%] animate-scan" />

        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0">
          {backgroundIcons.map((item, index) => (
            <div 
              key={index} 
              className="absolute text-[#00F5FF]/10 flex items-center justify-center"
              style={{ 
                top: item.top, 
                left: item.left,
                animation: `float ${item.duration} ease-in-out infinite`,
                animationDelay: item.delay
              }}
            >
              <item.Icon size={item.size} strokeWidth={1} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* 1. Floating Physics */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.3; color: #00F5FF; }
        }

        /* 2. Scanline Movement */
        @keyframes scan {
          0% { top: -20%; }
          100% { top: 120%; }
        }
        .animate-scan { animation: scan 3s linear infinite; } /* Sped up scanline */

        /* 3. TECH Glitch Effect */
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-20deg); }
          40% { transform: skew(20deg); }
          60% { transform: skew(-5deg); }
          80% { transform: skew(5deg); }
          100% { transform: skew(0deg); }
        }

        @keyframes glitch-anim {
          0% { opacity: 0; transform: scale(1.5); filter: blur(10px); }
          50% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 1; text-shadow: 2px 0 rgba(255,255,255,0.5), -2px 0 rgba(0,245,255,0.8); }
        }
        
        .anim-tech-entry {
          animation: glitch-anim 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, glitch-skew 0.3s ease-out forwards;
          animation-delay: 1.1s; /* Drastically earlier: Waits for VORSPRUNG to finish decrypting */
          opacity: 0; 
        }

        .cyan-glow { box-shadow: 0 0 15px rgba(0, 245, 255, 0.5); }
      `}</style>

      {/* CENTRE CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4">
        
        {/* LOGO SYMBOL - Spinning & Accelerating */}
        <div className="mb-8 md:mb-12 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
          <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
            <div className="absolute inset-0 border border-[#00F5FF]/30 rounded-full animate-[spin_2s_linear_infinite]" />
            <div className="absolute inset-2 border-t border-b border-white/20 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={32} className="text-[#00F5FF] drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
            </div>
          </div>
        </div>

        {/* LOGO TEXT */}
        <div className="flex flex-col items-center leading-none select-none">
          {/* VORSPRUNG: Decryption Effect in WHITE */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-thin text-white uppercase tracking-[0.2em] h-[1.2em] flex items-center">
            {scrambledVorsprung}
          </h1>
          
          {/* TECH: Glitch Impact in CYAN */}
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-[#00F5FF] uppercase anim-tech-entry mt-2 tracking-tighter drop-shadow-[0_0_20px_rgba(0,245,255,0.4)]">
            TECH
          </h1>
        </div>
        
        {/* SYSTEM STATUS */}
        <div className="mt-10 md:mt-16 flex items-center gap-3 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: '1.6s' }}>
          <ShieldCheck size={14} className="text-[#00F5FF]" />
          <p className="text-[10px] md:text-xs text-[#00F5FF] tracking-[0.3em] uppercase font-mono">
            Secure Connection Established
          </p>
        </div>
      </div>

      {/* LOADING BAR (Bottom) */}
      <div className="absolute bottom-12 w-64 md:w-80 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between text-[9px] md:text-[10px] text-gray-400 font-mono mb-2 uppercase tracking-widest">
          {/* DYNAMIC BOOT MESSAGE */}
          <span>{bootStep}</span>
          <span className="text-[#00F5FF]">{progress}%</span>
        </div>
        
        {/* Progress Track */}
        <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
          <div 
            className="h-full bg-[#00F5FF] cyan-glow transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Hex Data Stream Decoration */}
        <div className="mt-2 text-[8px] text-gray-600 font-mono flex justify-between opacity-50">
            <span>0x{progress.toString(16).padStart(2, '0').toUpperCase()}</span>
            <span>:: LOGIK_CORE ::</span>
            <span>VR-36</span>
        </div>
      </div>

    </div>
  );
};

export default SplashScreen;