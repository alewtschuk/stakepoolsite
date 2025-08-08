import { Button } from './components/ui/button'
import cl from './assets/cl.png'
import clw from './assets/clw.png'
import { StarIcon, ArrowDown } from 'lucide-react'

function App() {
  return (
    <>
      <HeaderNav />
      <HeroSection />
    </>
  )
}

interface HeroOrbitProps {
  children: React.ReactNode;
  size: number;
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
    <div className="absolute left-1/2 top-1/2 -z-20 -translate-x-1/2 -translate-y-1/2">
      <div
        className={shouldOrbit ? "animate-spin" : ""}
        style={{ animationDuration: `${orbitDuration || 30}s` }}
      >
        <div
          className="flex items-start justify-start"
          style={{
            transform: `rotate(${rotation}deg)`,
            height: `${size}px`,
            width: `${size}px`
          }}
        >
          <div
            className={shouldSpin ? "animate-spin" : ""}
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
    size: 800,
    rotation: 150,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 48,
    shouldSpin: true,
    spinDuration: 6
  },
  {
    size: 400,
    rotation: 20,
    child: <img src={cl} alt="logo" className="h-6 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 24,
    shouldSpin: true,
    spinDuration: 6
  },
    {
    size: 525,
    rotation: 90,
    child: <img src={cl} alt="logo" className="h-6 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 30,
    shouldSpin: true,
    spinDuration: 6
  },
  {
    size: 850,
    rotation: 125,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 46,
    shouldSpin: true,
    spinDuration: 6
  },
  {
    size: 320,
    rotation: 0,
    child: <img src={clw} alt="logo" className="h-8 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 12, // Fast inner orbit
    shouldSpin: true,
    spinDuration: 3
  },
  {
    size: 320,
    rotation: 180,
    child: <img src={cl} alt="logo" className="h-4 w-auto opacity-80" />,
    shouldOrbit: true,
    orbitDuration: 12,
    shouldSpin: true,
    spinDuration: 4
  },

  // Second orbit - medium-fast (like Venus)
  {
    size: 480,
    rotation: 60,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 20, // Proportionally slower
    shouldSpin: true,
    spinDuration: 5
  },
  {
    size: 480,
    rotation: 240,
    child: <img src={cl} alt="logo" className="h-6 w-auto opacity-70" />,
    shouldOrbit: true,
    orbitDuration: 20,
    shouldSpin: true,
    spinDuration: 6
  },

  // Third orbit - medium (like Earth)
  {
    size: 680,
    rotation: 30,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 32, // Following orbital mechanics scaling
    shouldSpin: true,
    spinDuration: 7
  },
  {
    size: 680,
    rotation: 150,
    child: <img src={cl} alt="logo" className="h-8 w-auto opacity-60" />,
    shouldOrbit: true,
    orbitDuration: 32,
    shouldSpin: true,
    spinDuration: 8
  },
  {
    size: 680,
    rotation: 270,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 32,
    shouldSpin: true,
    spinDuration: 6
  },

  // Fourth orbit - slower (like Mars)
  {
    size: 920,
    rotation: 45,
    child: <img src={cl} alt="logo" className="h-10 w-auto opacity-50" />,
    shouldOrbit: true,
    orbitDuration: 48, // Significantly slower
    shouldSpin: true,
    spinDuration: 9
  },
  {
    size: 920,
    rotation: 225,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 48,
    shouldSpin: true,
    spinDuration: 8
  },

  // Outer orbit - slowest (like Jupiter)
  {
    size: 1200,
    rotation: 90,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 72, // Very slow outer orbit
    shouldSpin: true,
    spinDuration: 12
  },
  {
    size: 1200,
    rotation: 270,
    child: <img src={cl} alt="logo" className="h-12 w-auto opacity-40" />,
    shouldOrbit: true,
    orbitDuration: 72,
    shouldSpin: true,
    spinDuration: 15
  },

  // Outermost orbit - asteroid belt (like Saturn)
  {
    size: 1500,
    rotation: 135,
    child: <img src={cl} alt="logo" className="h-12 w-auto" />,
    shouldOrbit: true,
    orbitDuration: 96, // Extremely slow
    shouldSpin: true,
    spinDuration: 18
  }
  // Additional configurations...
];

const RingsWidth = [600, 800, 1000, 1200];

export const HeaderNav = () => {
  return (
    <div>
        {/* Header */}
        <header className="border-b border-slate-800 bg-[#171717] backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="#top" className="flex items-center gap-2">
                <img src={cl} alt="logo" className="h-8 w-auto" />
              </a>
            </div>
            <nav className="md:flex gap-6 ">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#installation" className="text-slate-300 hover:text-white transition-colors">
                Infrastructure
              </a>
              <a href="#usage" className="text-slate-300 hover:text-white transition-colors">
                Data
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="default" 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-400" 
                      onClick={() => {
                  console.log('Right button clicked!');
                }}>
                Action
              </Button>
            </div>
          </div>
        </header>
      </div>
  );
};

export const HeroSection = () => {
  return (
    <div id="home" className="relative flex min-h-screen items-center justify-center bg-neutral-900" style={{ zIndex: -35 }}>
      {/* Background Grain */}
      <div 
        className="absolute inset-0 bg-[url(./assets/grain.jpg)] bg-repeat opacity-5"
        style={{ zIndex: -30 }}
      ></div>

      {/* Background Rings */}
      {RingsWidth.map((size) => (
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
      

      {/* Repeat for sparkles and dots */}

      <div className="flex flex-col items-center justify-center gap-6">
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="z-10 inline-flex h-12 items-center gap-2 rounded-xl border border-white bg-gray-800 px-6 text-white hover:border-red-500"
        >
          <span className="font-semibold">Cash and Kindness</span>
          <ArrowDown className="size-4" />
        </button>
        <button
          className="group z-10 inline-flex h-12 items-center gap-2 rounded-xl border border-white bg-white px-6 text-white hover:shadow-[0_0_0_3px_red]"
          onClick={() => (window.location.href = `mailto:${process.env.NEXT_PUBLIC_PERSONAL_EMAIL}`)}
        >
          <span className="font-semibold">{"Let's"} Connect</span>
        </button>
      </div>
    </div>
  );
};

export default App
