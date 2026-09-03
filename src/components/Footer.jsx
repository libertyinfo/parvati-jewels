import React from 'react';
import logo from '../assets/icons/logo.svg';

function Footer() {
  return (
    <footer className="bg-[#0C758C] w-full text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 2xl:gap-10 xl:gap-8 gap-4 xl:py-16 py-12">
        
        <div className="col-span-1 md:col-span-1 flex flex-col items-start">
          <img src={logo} alt="Parvati Jewels Logo" className="brightness-0 invert mb-6 w-[200px] xl:w-[230px]" />
          <p className="text-[12px] xl:text-[14px] 2xl:text-[18px] text-white/90 font-light pr-4">
            Lorem ipsum dolor sit amet, elit, sed do incididunt ut labore Neque aliquam morbi cursus risus at ultrices. A vitae sapien pellentesque. Phasellus vestibulum.
          </p>
        </div>

        <div className="col-span-1 md:col-span-1 flex flex-col mt-2 items-center">
          <h3 className="font-bellefair text-[18px] 2xl:text-[22px] text-white uppercase tracking-[0.15em] mb-6">Catalog</h3>
          <ul className="flex flex-col gap-4 text-[14px] 2xl:text-[16px] font-light text-white/90 -ml-[32px]">
            <li><a href="#" className="hover:text-white transition-colors">Rings</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Earrings</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Diamonds</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bracelets</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Neckleces</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pendants</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-1 flex flex-col mt-2 items-center">
          <h3 className="font-bellefair text-[18px] 2xl:text-[22px] text-white uppercase tracking-[0.15em] mb-6">Information</h3>
          <ul className="flex flex-col gap-4 text-[14px] 2xl:text-[16px] font-light text-white/90 -ml-[22px]">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms and condition</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-1 flex flex-col mt-2 items-center">
          <h3 className="font-bellefair text-[18px] 2xl:text-[22px] text-white uppercase tracking-[0.15em] mb-6">Get In Touch</h3>
          <ul className="flex flex-col gap-4 text-[14px] 2xl:text-[16px] font-light text-white/90 ml-[40px]">
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +91 92345 96789
            </li>
            <li className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +91 92345 96789
            </li>
            <li className="flex items-center gap-3 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              hello@Parvatijewels.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] 2xl:text-[18px] text-white font-light">
            Copyright &copy; 2024. All Rights Reserved by <span className="font-medium">ParvatiJewels</span>
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#0C758C] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#0C758C] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#0C758C] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;