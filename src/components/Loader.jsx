import React, { useState, useEffect } from 'react';
import logo from '../assets/icons/logo.svg';

/**
 * Loader Component
 * Displays a luxury animated preloader screen with the Parvati Jewels logo.
 * Fades out smoothly once initial page resources are ready or after timeout.
 */
function Loader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Hide loader after minimum splash display time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    // Completely unmount after fade-out transition finishes
    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] transition-opacity duration-700 ease-out ${
        loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute w-[350px] h-[350px] bg-[#AAD1D8]/40 rounded-full blur-[90px] animate-pulse"></div>

      {/* Main Loader Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6">
        
        {/* Animated Logo Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Subtle Halo Pulsing Ring */}
          <div className="absolute -inset-4 rounded-full border border-[#0C758C]/20 animate-ping opacity-25"></div>
          
          {/* Logo SVG */}
          <img
            src={logo}
            alt="Parvati Jewels"
            className="w-[220px] md:w-[280px] xl:w-[320px] h-auto transition-transform duration-700 animate-pulse"
          />
        </div>

        {/* Golden / Teal Shimmer Loading Line */}
        <div className="relative w-48 md:w-64 h-[2px] bg-gray-200 overflow-hidden rounded-full mb-4">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#0C758C] to-transparent animate-shimmer-line"></div>
        </div>
        
      </div>
    </div>
  );
}

export default Loader;
