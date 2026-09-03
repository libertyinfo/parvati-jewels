import React from 'react'
import logo from '../assets/icons/logo.svg'

function Header() {
  return (
    <header className="w-full flex flex-col">
      <div className="w-full py-2 border-b border-[#9C9C9C66]">
        <div className="container mx-auto px-6">
          <p className="text-center text-[14px] text-[#3D3D3D] py-3">
            Best special offers every week 40% Off! Free delivery time
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-5 flex justify-between items-center bg-white">
        <div className="flex-shrink-0">
          <img src={logo} alt="Parvati Jewels Logo" className="xl:h-[50px] h-[38px] w-auto" />
        </div>

        <nav className="hidden md:flex space-x-8 text-[#1A1A1A] xl:text-[16px] text-[14px]">
          <a href="#" className="hover:text-[#0C758C] transition-colors">Rings</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Earrings</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Diamonds</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Bracelets</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Neckleces</a>
          <a href="#" className="hover:text-[#0C758C] transition-colors">Gifts</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="border border-[#0C758C] text-[#0C758C] xl:px-3.5 px-3 xl:py-2.5 py-2 xl:text-[16px] text-[14px] font-medium hover:bg-[#0C758C] hover:text-white cursor-pointer transition-colors">
            Contact
          </button>
          <button className="bg-[#0C758C] text-white xl:px-4.5 px-4 xl:py-2.5 py-2 xl:text-[16px] text-[14px] font-medium hover:bg-white hover:text-[#0C758C] transition-colors border border-[#0C758C] cursor-pointer">
            Inquiry
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header