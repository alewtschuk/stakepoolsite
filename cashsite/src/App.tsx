import React from 'react'
import cl from './assets/cl.png'
import clw from './assets/clw.png'

function App() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
      <AboutSection />
      <InfrastructureSection />
      <DataSection />
    </>
  )
}

interface HeroOrbitProps {
  children: React.ReactNode;
  size: number | string;
  rotation: number;
  orbitDuration?: number;
  shouldOrbit: boolean;
  shouldSpin: boolean;
  spinDuration?: number;
}

export const HeroOrbit: React.FC<HeroOrbitProps> = ({
  children,
  size,
  rotation,
  orbitDuration,
  shouldOrbit,
  shouldSpin,
  spinDuration
}: HeroOrbitProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 -z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        className={shouldOrbit ? "motion-safe:animate-spin" : ""}
        style={{ animationDuration: `${orbitDuration || 30}s` }}
      >
        <div
          className="flex items-start justify-start"
          style={{
            transform: `rotate(${rotation}deg)`,
            height: typeof size === 'number' ? `${size}px` : size,
            width: typeof size === 'number' ? `${size}px` : size
          }}
        >
          <div
            className={shouldSpin ? "motion-safe:animate-spin" : ""}
            style={{ animationDuration: `${spinDuration || 30}s` }}
          >
            <div
              className="inline-flex"
              style={{ transform: `rotate(${-rotation}deg)` }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface HeroOrbitMapProps extends Omit<HeroOrbitProps, "children"> {
  child: React.ReactNode;
}

export const HeroOrbitStarMap: HeroOrbitMapProps[] = [
  {
    size: 'clamp(35rem, 80vmin, 50rem)',
    rotation: 150,
    child: <img src={cl} alt="logo" className="h-8 md:h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 48,
    shouldSpin: true,
    spinDuration: 6
  },
  {
    size: 'clamp(18rem, 48vmin, 30rem)',
    rotation: 20,
    child: <img src={cl} alt="logo" className="h-5 md:h-6 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 24,
    shouldSpin: true,
    spinDuration: 6
  },
    {
    size: 'clamp(22rem, 55vmin, 34rem)',
    rotation: 90,
    child: <img src={clw} alt="logo" className="h-5 md:h-6 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 30,
    shouldSpin: true,
    spinDuration: 6
  },
  {
    size: 'clamp(38rem, 85vmin, 54rem)',
    rotation: 125,
    child: <img src={cl} alt="logo" className="h-8 md:h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 46,
    shouldSpin: true,
    spinDuration: 6
  },
  {
    size: 'clamp(14rem, 40vmin, 22rem)',
    rotation: 0,
    child: <img src={clw} alt="logo" className="h-6 md:h-8 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 12, // Fast inner orbit
    shouldSpin: true,
    spinDuration: 3
  },
  {
    size: 'clamp(14rem, 40vmin, 22rem)',
    rotation: 180,
    child: <img src={cl} alt="logo" className="h-4 md:h-5 w-auto opacity-80" />,
    shouldOrbit: true,
    orbitDuration: 12,
    shouldSpin: true,
    spinDuration: 4
  },

  // Second orbit - medium-fast (like Venus)
  {
    size: 'clamp(20rem, 52vmin, 32rem)',
    rotation: 60,
    child: <img src={clw} alt="logo" className="h-8 md:h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 20, // Proportionally slower
    shouldSpin: true,
    spinDuration: 5
  },
  {
    size: 'clamp(20rem, 52vmin, 32rem)',
    rotation: 240,
    child: <img src={cl} alt="logo" className="h-5 md:h-6 w-auto opacity-70" />,
    shouldOrbit: true,
    orbitDuration: 20,
    shouldSpin: true,
    spinDuration: 6
  },

  // Third orbit - medium (like Earth)
  {
    size: 'clamp(28rem, 65vmin, 42rem)',
    rotation: 30,
    child: <img src={cl} alt="logo" className="h-8 md:h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 32, // Following orbital mechanics scaling
    shouldSpin: true,
    spinDuration: 7
  },
  {
    size: 'clamp(28rem, 65vmin, 42rem)',
    rotation: 150,
    child: <img src={clw} alt="logo" className="h-6 md:h-8 w-auto opacity-60" />,
    shouldOrbit: true,
    orbitDuration: 32,
    shouldSpin: true,
    spinDuration: 8
  },
  {
    size: 'clamp(28rem, 65vmin, 42rem)',
    rotation: 270,
    child: <img src={clw} alt="logo" className="h-8 md:h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 32,
    shouldSpin: true,
    spinDuration: 6
  },
];

export const HeaderNav = () => {
  return (
    <div>
        {/* Header */}
        <header className="border-b border-slate-800 bg-[#171717] backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto max-w-6xl w-full px-4 py-4 flex items-center">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-8">
              <a href="#top" className="flex items-center gap-2">
                <img src={cl} alt="logo" className="h-8 w-auto" />
              </a>
              <nav className="flex flex-wrap gap-4 md:gap-6">
                <a href="#about" className="text-sm md:text-base !text-white visited:!text-white hover:!text-white/90 transition-colors">
                  About
                </a>
                <a href="#infrastructure" className="text-sm md:text-base !text-white visited:!text-white hover:!text-white/90 transition-colors">
                  Infrastructure
                </a>
                <a href="#usage" className="text-sm md:text-base !text-white visited:!text-white hover:!text-white/90 transition-colors">
                  Data
                </a>
              </nav>
            </div>
          </div>
        </header>
      </div>
  );
};

const StakingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8 max-w-lg w-full text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors p-1 rounded-md focus:outline-none focus-visible:ring-2 ring-sky-500"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h3 className="text-2xl font-bold mb-4">Stake With Us</h3>
        <p className="text-slate-400 mb-6">
          Follow these steps to delegate your ADA to our pool.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">1. Copy our Pool ID</label>
            <div className="mt-1">
              <TruncatedIdWithCopy id="d50b69e0ea9704d0130c6384fe0a509521833b2e472fc177258e5b1d" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">2. Use a CIP-13 Compatible Wallet</label>
            <p className="text-xs text-slate-500 mt-1">
              If your wallet supports CIP-13 links, this button will open the delegation interface directly.
            </p>
            <a
              href="web+cardano://stake?d50b69e0ea9704d0130c6384fe0a509521833b2e472fc177258e5b1d"
              className="group mt-2 inline-flex h-11 items-center gap-2 rounded-xl bg-sky-500 px-5 text-sm text-white outline-none focus:outline-none focus-visible:ring-2 ring-sky-500 hover:shadow-[0_0_0_4px_rgba(3,105,161,0.5)] transition-shadow duration-200"
            >
              <span className="font-semibold">Stake via CIP-13 Link</span>
            </a>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">3. Or, Stake Manually</label>
            <p className="text-xs text-slate-500 mt-1">
              In your wallet's staking or delegation center, search for our Pool ID (copied in step 1) or our ticker: <span className="font-bold text-slate-300">$CASH</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const [isStakingModalOpen, setStakingModalOpen] = React.useState(false);
  // Responsive ring sizes that scale with viewport while clamping to sensible bounds
  const RingsSize: Array<string> = [
    'clamp(22rem, 60vmin, 38rem)',
    'clamp(28rem, 75vmin, 50rem)',
    'clamp(36rem, 90vmin, 64rem)',
    'clamp(44rem, 105vmin, 76rem)'
  ];

  return (
    <div id="home" className="relative flex min-h-dvh sm:min-h-screen items-center justify-center bg-neutral-900 z-0 overflow-hidden">
      {/* Background Grain */}
      <div 
        className="absolute inset-0 bg-[url(./assets/grain.jpg)] bg-repeat opacity-5 pointer-events-none"
        style={{ zIndex: -30 }}
      ></div>

      {/* Background Rings */}
      {RingsSize.map((size) => (
        <div key={size} className="hero-ring" style={{ width: size, height: size }} />
      ))}

      {/* Stars */}
      {HeroOrbitStarMap.map(({ size, child, rotation, shouldOrbit, orbitDuration, spinDuration, shouldSpin }) => (
        <HeroOrbit
          key={`${size}-${rotation}`}
          size={size}
          rotation={rotation}
          shouldOrbit={shouldOrbit}
          orbitDuration={orbitDuration}
          spinDuration={spinDuration}
          shouldSpin={shouldSpin}
        >
          {child}
        </HeroOrbit>
      ))}
      

      <div className="flex flex-col items-center justify-center gap-6 px-4">
        {/* Replaced the button with a text section */}
        <div className="z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">Cash and Kindness</h1>
          <p className="mt-3 text-base md:text-lg text-slate-300">Cardano is the future of crypto stake with us.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {/* Primary CTA: Stake with Us */}
          <button
            onClick={() => setStakingModalOpen(true)}
            className="group z-10 inline-flex h-11 md:h-12 items-center gap-2 rounded-xl bg-sky-500 px-5 md:px-6 text-sm md:text-base text-white outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 hover:shadow-[0_0_0_4px_rgba(3,105,161,0.5)] transition-shadow duration-200"
          >
            <span className="font-semibold">Stake With Us</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 transition-transform group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          {/* Secondary CTA: Learn More scrolls to About */}
          <button
            className="group z-10 inline-flex h-11 md:h-12 items-center gap-2 rounded-xl border border-white bg-white/10 px-5 md:px-6 text-sm md:text-base text-white outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0 hover:bg-white/20 transition-colors duration-200"
            onClick={() => {
              const target = document.getElementById('about');
              target?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-semibold">Want to Know More?</span>
          </button>
        </div>
      </div>
      <StakingModal isOpen={isStakingModalOpen} onClose={() => setStakingModalOpen(false)} />
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section id="about" className="relative bg-neutral-900 text-white py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto max-w-6xl w-full px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Operator Bio */}
          <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-xl font-semibold">Who we are</h3>
            <p className="mt-2 text-slate-400 text-lg">
              {/* Replace with a short operator bio */}
              This pool is ran by a group of Cardano and Cryptocurrency addopters and enthusists including 
              a Cardano Early Addopter and Advocate, Web3 Researcher and Software Engineer and a Network Engineer and IT Specialist.
              Located in the PNW of the United States. 
              If you value kindness, dogs, Ukraine, and belive in making a better world, you belong in this pool.
            </p>
          </div>

          <div className="space-y-8">
            {/* Personal Stake & Security */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h3 className="text-xl font-semibold">Personal Stake & Security</h3>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-400">
                <li>Pool Operator has substantial personal pledge and commitment to Cardano</li>
                <li>Secure, monitored infrastructure</li>
                <li>Cold key management and backups</li>
              </ul>
            </div>

            {/* What We Believe In */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h3 className="text-xl font-semibold">What We Believe In</h3>
              <p className="mt-2 text-slate-400 text-lg">
              {/* Replace with a short operator bio */}
              We belive that ADA should make crypto transactions affordable and accessible 
              to people all over the world, bank the unbanked, and create a more accessible financial systemn for us all.
              If you value kindness, dogs, Ukraine, and belive in making a better world, you belong in this pool.
            </p>
            <p className="mt-2 text-slate-400 text-lg">
              Welcome! 
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const InfrastructureSection = () => {
  return (
    <section id="infrastructure" className="relative bg-neutral-900 text-white py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto max-w-6xl w-full px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Infrastructure</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Node Machines */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-xl font-semibold">Node Machines</h3>
            <p className="mt-2 text-slate-400">Each of our nodes is ran on a MINISFORUM EliteMini AI370 running Ubuntu 24.04LTS</p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-400">
              <li>32Gb of RAM</li>
              <li>High‑performance 1Tb NVMe storage</li>
              <li>Redundant power and networking</li>
            </ul>
          </div>

          {/* Security & Firewalls */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-xl font-semibold">Security & Firewalls</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-400">
              <li>Full Hardware Firewall</li>
              <li>Hardened host firewall with strict allowlists</li>
              <li>Active Security Monitoring</li>
            </ul>
          </div>

          {/* Bare‑Metal Setup */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-xl font-semibold">Bare‑Metal Setup</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-400">
              <li>Bare-Metal servers</li>
              <li>No cloud tennancy, we control the hardware and have access at any time.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ------- Data Dashboard Utilities -------
interface PoolData {
  saturationFloat: number; // 0-100
  status: number; // 0-100
  liveStake: number; // ADA
  activePledge: number; // ADA
  currentEpochBlocks: number;
  lifetimeBlocks: number;
  pledgeMet: string;
  declaredPledge: string;
  margin: number;
  ticker: string;
  poolId: string;
}

function readPoolDataFromDom(): PoolData | null {
  try {
    // 1) JSON script tag injected by Go template
    const script = document.getElementById('pool-data') as HTMLScriptElement | null;
    if (script?.textContent) {
      const parsed = JSON.parse(script.textContent);
      return parsed as PoolData;
    }
  } catch {}

  // 2) data-* attributes on the #usage section
  const sec = document.getElementById('usage');
  if (sec) {
    const d = (sec as HTMLElement).dataset as any;
    const maybe = {
      saturationFloat: Number(d.saturationFloat),
      status: Number(d.status),
      liveStake: Number(d.liveStake),
      activePledge: Number(d.ledge),
      currentEpochBlocks: Number(d.blocksEpoch),
      lifetimeBlocks: Number(d.lifetimeBlocks),
      declaredPledge: String(d.declaredPledge),
      pledgeMet: String(d.pledgeMet),
      margin: Number(d.margin),
      ticker: String(d.ticker),
      poolId: String(d.poolID)
    } as PoolData;
    if (!Object.values(maybe).some((v) => Number.isNaN(v))) return maybe;
  }

  // 3) Global assigned by Go: window.__POOL_DATA__
  const w = window as any;
  if (w.__POOL_DATA__) return w.__POOL_DATA__ as PoolData;

  return null;
}

function useAnimatedNumber(target: number, durationMs = 1200) {
  const [value, setValue] = React.useState(target);

  React.useEffect(() => {
    // Check if the number has more than 2 decimal places
    const hasTooManyDecimals = String(target).includes('.') && String(target).split('.')[1].length > 2;

    if (hasTooManyDecimals) {
      setValue(target);
      return; // Don't animate
    }

    let raf = 0;
    const start = performance.now();
    const from = value;
    const delta = target - from;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(from + delta * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

const StatusGauge: React.FC<{
  value: number;
  min?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  color?: string;
  suffix?: string;
}> = ({ value, min = 0, max = 100, size = 140, strokeWidth = 12, label, color = '#22c55e', suffix = '%' }) => {
  const clamped = Math.max(min, Math.min(max, value));
  const progress = (clamped - min) / (max - min);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference;
  const offset = circumference * (1 - progress);
  if(value == 100) {
    suffix = "Online"
  } else {
    suffix = "Offline"
  }
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#262626"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${dash} ${dash}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="motion-safe:transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">
            {suffix}
          </div>
          <div className="text-sm text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
};

const Gauge: React.FC<{
  value: number;
  min?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  color?: string;
  suffix?: string;
}> = ({ value, min = 0, max = 100, size = 140, strokeWidth = 12, label, color = '#22c55e', suffix = '%' }) => {
  const clamped = Math.max(min, Math.min(max, value));
  const progress = (clamped - min) / (max - min);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference;
  const offset = circumference * (1 - progress);
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#262626"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${dash} ${dash}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="motion-safe:transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-white">
            {clamped.toFixed(2)}{suffix}
          </div>
          <div className="text-sm text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  );
};

const TruncatedIdWithCopy: React.FC<{ id: string | undefined }> = ({ id }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = () => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  if (!id || id === '0') {
    return <div className="text-2xl font-bold text-white">0</div>;
  }

  const truncatedId = `${id.substring(0, 6)}...${id.substring(id.length - 6)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-white break-all">{truncatedId}</span>
      <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors p-1 rounded-md focus:outline-none focus-visible:ring-2 ring-sky-500">
        {isCopied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-green-500">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
          </svg>
        )}
      </button>
    </div>
  );
};



// ------- Data Section -------
export const DataSection = () => {
  const [data, setData] = React.useState<PoolData | null>(null);

  React.useEffect(() => {
    const d = readPoolDataFromDom();
    if (d) setData(d);
    else {
      // Set default values as template placeholders
    }
  }, []);

  const saturation = useAnimatedNumber(data?.saturationFloat ?? 0);
  const uptime = useAnimatedNumber(data?.status ?? 0);
  const margin = useAnimatedNumber(data?.margin ?? 0);

  return (
    <section id="usage" className="relative bg-neutral-900 text-white py-16 md:py-24 border-t border-neutral-800 scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto max-w-6xl w-full px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Data</h2>
          <p className="mt-3 text-slate-400">Pool metrics. Updated every hour on the hour</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Gauges */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-lg font-semibold mb-6">Pool Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
              <Gauge value={saturation} label="Saturation" color="#60a5fa" />
              <StatusGauge value={uptime} label="Status" color="#22c55e" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-xl border border-neutral-800 p-4">
                  <div className="text-slate-400 text-sm">Ticker</div>
                  <div className="text-2xl font-bold text-white break-words">${(data?.ticker ?? 0)}</div>
                </div>
                <div className="rounded-xl border border-neutral-800 p-4">
                  <div className="text-slate-400 text-sm">Pool ID</div>
                  <TruncatedIdWithCopy id={data?.poolId} />
                </div>
              </div>
          </div>

          {/* Key Figures */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h3 className="text-lg font-semibold mb-6">Key Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-slate-400 text-sm">Live Stake</div>
                <div className="text-2xl font-bold text-white break-words">{(data?.liveStake ?? 0).toLocaleString()} ADA</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-slate-400 text-sm">Pledge</div>
                <div className="text-2xl font-bold text-white break-words">{(data?.activePledge ?? 0).toLocaleString()} ADA</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-slate-400 text-sm">Declared Pledge</div>
                <div className="text-2xl font-bold text-white break-words">{(data?.declaredPledge ?? 0).toLocaleString()} ADA</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-slate-400 text-sm">Pledge Met?</div>
                <div className="text-2xl font-bold text-white break-words">{data?.pledgeMet ?? 0}</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-slate-400 text-sm">Blocks (Epoch)</div>
                <div className="text-2xl font-bold text-white break-words">{data?.currentEpochBlocks ?? 0}</div>
              </div>
              <div className="rounded-xl border border-neutral-800 p-4">
                <div className="text-slate-400 text-sm">Blocks (Lifetime)</div>
                <div className="text-2xl font-bold text-white break-words">{data?.lifetimeBlocks ?? 0}</div>
              </div>
              <Gauge value={margin} label="Margin" color="#60a5fa" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App
