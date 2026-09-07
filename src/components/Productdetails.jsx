import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CTA from "./CTA";
import starIcon from '../assets/icons/star.svg';

import weddingMain from '../assets/ring-detail/wedding-main.png';
import wedding2 from '../assets/ring-detail/wedding2.png';
import wedding3 from '../assets/ring-detail/wedding3.png';
import wedding4 from '../assets/ring-detail/wedding4.png';
import wedding5 from '../assets/ring-detail/wedding5.png';
import wedding6 from '../assets/ring-detail/wedding6.png';

import wedding2Main from '../assets/ring-detail/wedding2-main.png';
import wedding3Main from '../assets/ring-detail/wedding3-main.png';
import wedding4Main from '../assets/ring-detail/wedding4-main.png';
import wedding5Main from '../assets/ring-detail/wedding5-main.png';
import wedding6Main from '../assets/ring-detail/wedding6-main.png';

const imagesData = [
  { thumb: weddingMain, main: weddingMain },
  { thumb: wedding2, main: wedding2Main },
  { thumb: wedding3, main: wedding3Main },
  { thumb: wedding4, main: wedding4Main },
  { thumb: wedding5, main: wedding5Main },
  { thumb: wedding6, main: wedding6Main }
];

function Productdetails({ setInquiryState }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          <div className="w-full lg:w-[828px] flex flex-col">
            <div className="w-full h-[714px] flex items-center justify-center overflow-hidden mb-8">
              <img src={imagesData[activeIndex].main} alt="Main product view" className="w-full h-full transition-opacity duration-500" />
            </div>
            
            <div className="flex justify-between gap-3 overflow-x-auto pb-2">
              {imagesData.map((item, index) => (
                <div 
                  key={index} 
                  className={`w-[15%] cursor-pointer transition-all duration-300 border ${activeIndex === index ? 'border-[#3D3D3D] shadow-sm' : 'border-transparent hover:border-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={item.thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-[134px]" />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[582px] flex flex-col">
            <div className="text-[11px] 2xl:text-[16px] md:text-[13px] text-[#7A7A7A] mb-9 tracking-widest uppercase font-medium">
              <Link to="/" className="hover:text-black transition-colors">HOME</Link> 
              <span className="mx-3 text-gray-300">|</span> 
              <Link to="/productlist" className="hover:text-black transition-colors">RINGS</Link>
              <span className="mx-3 text-gray-300">|</span> 
              <span className="text-[#3D3D3D]">WEDDING RING</span>
            </div>

            <h1 className="text-[36px] md:text-[40px] font-bellefair text-[#12798C] mb-6">Wedding Ring 18K White Gold</h1>
            <p className="text-[22px] md:text-[26px] 2xl:text-[28px] text-[#1A1A1A] font-medium mb-6">$30.00 – $50.00</p>
            
            <div className="w-full h-[1px] bg-[#9C9C9C] mb-6"></div>

            <p className="text-[#7A7A7A] text-[13px] md:text-[14px] 2xl:text-[16px] font-light mb-5">
              Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut et dolore magna aliqua. Ut ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ex ea consequat. Irure dolor in in velit esse dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-[#7A7A7A] text-[13px] md:text-[14px] 2xl:text-[16px] font-light mb-6">
              Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut et dolore magna aliqua.
            </p>
            
            <p className="text-[#1A1A1A] text-[14px] 2xl:text-[16px] font-medium mb-6">
              Metal: <span className="text-[#000000] font-light ml-1">18K White Gold</span>
            </p>

            <div className="flex gap-1.5 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <img 
                  key={star} 
                  src={starIcon} 
                  alt="star" 
                  className={`w-[30px] h-[30px] ${star === 5 ? 'grayscale opacity-30' : ''}`} 
                />
              ))}
            </div>

            <button 
              onClick={() => setInquiryState({ isOpen: true, type: 'product' })}
              className="w-full bg-[#1A1A1A] text-white py-4 md:py-3.5 text-[15px] 2xl:text-[26px] font-medium hover:bg-[#12798C] transition-colors mb-8"
            >
              Inquiry
            </button>

            <p className="text-[#1A1A1A] text-[15px] 2xl:text-[16px] font-medium mb-6">Product Specification</p>
            <div className="w-full h-px bg-[#9C9C9C] mb-6"></div>

            <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
              <div>
                <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1">Total diamond weight</p>
                <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">0.50ct</p>
              </div>
              <div>
                <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1">Dimensions</p>
                <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">4.4mm</p>
              </div>
              <div>
                <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1">Stone shape</p>
                <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">Round</p>
              </div>
              <div>
                <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1">Diamond Quality</p>
                <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">h/si</p>
              </div>
              <div>
                <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1">Setting</p>
                <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">Diamond Band</p>
              </div>
              <div>
                <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1">Nickel free</p>
                <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">Yes</p>
              </div>
            </div>

            <p className="text-[#1A1A1A] text-[12px] 2xl:text-[16px] font-light mt-auto">
              Please note weights, gem colours and sizes are approximate and may vary slightly.
            </p>
          </div>

        </div>
        </div>
      
      {/* CTA */}
      <CTA/>
    </div>
  )
}

export default Productdetails;