import React from 'react'
import logo from '../assets/icons/logo.svg'

function Header() {
  return (
    <header className="w-full flex flex-col">
      <div className="w-full py-2 border-b border-[#9C9C9C66]">
        <div className="container">
          <p className="text-center text-[14px] text-[#3D3D3D] py-3">
            Best special offers every week 40% Off! Free delivery time
          </p>
        </div>
      </div>

      <div className="container mx-auto py-5 px-6 flex justify-between items-center bg-white">
        <div className="flex-shrink-0">
          <img src={logo} alt="Parvati Jewels Logo" className="h-[50px] w-auto" />
        </div>

        <nav className="hidden md:flex space-x-8 text-[#1A1A1A] text-[16px]">
          <a href="#" className="hover:text-[#0C758C] transition-colors">Rings</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Earrings</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Diamonds</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Bracelets</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Neckleces</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Gifts</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="border border-[#0C758C] text-[#0C758C] px-3.5 py-2.5 text-[16px] font-medium hover:bg-[#0C758C] hover:text-white cursor-pointer transition-colors">
            Contact
          </button>
          <button className="bg-[#0C758C] text-white px-4.5 py-2.5 text-[16px] font-medium hover:bg-white hover:text-[#0C758C] transition-colors border border-[#0C758C] cursor-pointer">
            Inquiry
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header