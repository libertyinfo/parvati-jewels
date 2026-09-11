import React, { useState, useEffect } from 'react';
import logo from '../assets/icons/logo.svg';

function Loader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

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
      <div className="absolute w-[350px] h-[350px] bg-[#AAD1D8]/40 rounded-full blur-[90px] animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center px-6">
        
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full border border-[#0C758C]/20 animate-ping opacity-25"></div>
          
          <img
            src={logo}
            alt="Parvati Jewels"
            className="w-[220px] md:w-[280px] xl:w-[320px] h-auto transition-transform duration-700 animate-pulse"
          />
        </div>

        <div className="relative w-48 md:w-64 h-[2px] bg-gray-200 overflow-hidden rounded-full mb-4">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#0C758C] to-transparent animate-shimmer-line"></div>
        </div>
        
      </div>
    </div>
  );
}

export default Loader;
