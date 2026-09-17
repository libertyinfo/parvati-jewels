import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icons/logo.svg'
import roundDropdown from '../assets/icons/round-dropdown.svg'
import princessDropdown from '../assets/icons/princess-dropdown.svg'
import emeraldDropdown from '../assets/icons/emerald-dropdown.svg'
import asscherDropdown from '../assets/icons/asscher-dropdown.svg'
import cushionDropdown from '../assets/icons/cushion-dropdown.svg'
import marquiseDropdown from '../assets/icons/marquise-dropdown.svg'
import radiantDropdown from '../assets/icons/radiant-dropdown.svg'
import ovalDropdown from '../assets/icons/oval-dropdown.svg'
import pearDropdown from '../assets/icons/pear-dropdown.svg'
import heartDropdown from '../assets/icons/heart-dropdown.svg'

function Header({ setInquiryState }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full flex flex-col relative z-50">
      <div className="w-full py-2 border-b border-[#9C9C9C66] bg-[#13778d] hidden">
        <div className="container mx-auto px-6">
          <p className="text-center text-[14px] 3xl:text-[12px] text-[#000000] py-3">
            Best special offers every week 40% Off! Free delivery time
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-5 flex justify-between items-center bg-white relative z-50">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Parvati Jewels Logo" className="xl:h-[50px] lg:h-[35px] h-[40px] w-auto" />
          </Link>
        </div>

        <nav className="hidden lg:flex xl:space-x-8 space-x-6 items-center text-[#1A1A1A] xl:text-[16px] text-[14px]">
          <Link to="/productlist" className="hover:text-[#0C758C] transition-colors">Rings</Link>
          <Link to="#" className="hover:text-[#0C758C] transition-colors">Earrings</Link>
          
          {/* Diamonds Dropdown */}
          <div className="relative group h-full flex items-center">
            <Link to="#" className="hover:text-[#0C758C] transition-colors py-4">Diamonds</Link>
            
            <div className="absolute top-[100%] pt-2 left-1/2 -translate-x-1/2 w-[420px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                <div className="grid grid-cols-2 gap-x-7 gap-y-6 p-5">
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={roundDropdown} alt="Round" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Round</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={marquiseDropdown} alt="Marquise" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Marquise</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={princessDropdown} alt="Princess" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Princess</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={radiantDropdown} alt="Radiant" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Radiant</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={emeraldDropdown} alt="Emerald" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Emerald</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={ovalDropdown} alt="Oval" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Oval</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={asscherDropdown} alt="Asscher" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Asscher</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={pearDropdown} alt="Pear" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Pear</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={cushionDropdown} alt="Cushion" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Cushion</span>
                  </Link>
                  <Link to="#" className="flex items-center gap-4 group/item">
                    <img src={heartDropdown} alt="Heart" className="" />
                    <span className="text-[14px] text-[#1A1A1A] group-hover/item:text-[#0C758C] transition-colors">Heart</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link to="#" className="hover:text-[#0C758C] transition-colors">Bracelets</Link>
          <Link to="#" className="hover:text-[#0C758C] transition-colors">Neckleces</Link>
          <Link to="#" className="hover:text-[#0C758C] transition-colors">Gifts</Link>
          <Link to="#" className="hover:text-[#0C758C] transition-colors">Pendent</Link>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/contact" className="border border-[#0C758C] text-[#0C758C] xl:px-3.5 px-3 xl:py-2.5 py-2 xl:text-[16px] text-[14px] font-medium hover:bg-[#0C758C] hover:text-white cursor-pointer transition-colors flex items-center justify-center">
            Contact
          </Link>
          <button 
            onClick={() => setInquiryState({ isOpen: true, type: 'general' })}
            className="bg-[#0C758C] text-white xl:px-4.5 px-4 xl:py-2.5 py-2 xl:text-[16px] text-[14px] font-medium hover:bg-white hover:text-[#0C758C] transition-colors border border-[#0C758C] cursor-pointer"
          >
            Inquiry
          </button>
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1A1A1A] focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile & Tablet Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden z-50 ${
          isMenuOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4 text-[#1A1A1A] text-[15px]">
          <Link to="/productlist" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Rings</Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Earrings</Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Diamonds</Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Bracelets</Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Neckleces</Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Gifts</Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)} className="hover:text-[#0C758C] transition-colors">Pendent</Link>
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="border border-[#0C758C] text-[#0C758C] py-2 text-center font-medium hover:bg-[#0C758C] hover:text-white transition-colors">
              Contact
            </Link>
            <button 
              onClick={() => { setInquiryState({ isOpen: true, type: 'general' }); setIsMenuOpen(false); }}
              className="bg-[#0C758C] text-white py-2 text-center font-medium border border-[#0C758C] hover:bg-white hover:text-[#0C758C] transition-colors"
            >
              Inquiry
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header