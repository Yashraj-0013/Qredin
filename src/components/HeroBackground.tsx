import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function HeroBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 15); // Max movement of 15px
      mouseY.set(y * 15);
    };

    // Only add event listener on non-touch devices
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-[#0B0F17] overflow-hidden">
      {/* Texture Layer */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>

      {/* Vignette */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0F17_100%)] pointer-events-none"></div>

      {/* Center Light Emphasis */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#0052FF] opacity-[0.05] blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Animated Gradients Container with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ x: smoothX, y: smoothY }}
      >
        {/* Shape 1: Deep Navy */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#0A192F] rounded-full mix-blend-screen blur-[120px] opacity-20 animate-[float_25s_ease-in-out_infinite]"></div>
        
        {/* Shape 2: Electric Blue */}
        <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-[#0052FF] rounded-full mix-blend-screen blur-[120px] opacity-15 animate-[float_30s_ease-in-out_infinite_reverse]"></div>
        
        {/* Shape 3: Cyan Accent */}
        <div className="absolute bottom-[-20%] left-[20%] w-[900px] h-[900px] bg-[#00C2FF] rounded-full mix-blend-screen blur-[150px] opacity-[0.12] animate-[float_20s_ease-in-out_infinite_2s]"></div>
        
        {/* Shape 4: Subtle Teal */}
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#0D9488] rounded-full mix-blend-screen blur-[100px] opacity-10 animate-[float_28s_ease-in-out_infinite_1s]"></div>
      </motion.div>
    </div>
  );
}
