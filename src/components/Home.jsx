import React, { useState } from 'react'
import CTA from './CTA'
import heroImg from '../assets/hero-img.png'
import classyEarrings from '../assets/classy-earrings.png'
import stuningRings from '../assets/stunning-rings.png'
import elegantNecklace from '../assets/elegant-necklace.png'
import stylish from '../assets/stylish.png'
import gorgeousBracelets from '../assets/gorgeous-bracelets.png'
import statementChains from '../assets/statement-chains.png'
import daintyPendants from '../assets/dainty-pendants.png'
import roundDiamond from '../assets/icons/round.svg'
import princess from '../assets/icons/princess.svg'
import emerald from '../assets/icons/emerald.svg'
import asscher from '../assets/icons/asscher.svg'
import cushion from '../assets/icons/cushion.svg'
import radiant from '../assets/icons/radiant.svg'
import marquise from '../assets/icons/marquise.svg'
import pear from '../assets/icons/pear.svg'
import oval from '../assets/icons/oval.svg'
import heart from '../assets/icons/heart.svg'
import bracelet from '../assets/bracelet.png'
import pearlRing from '../assets/pearl-ring.png'
import diamondEarring from '../assets/diamond-earring.png'
import neckless from '../assets/neckless.png'
import bestsellerTag from '../assets/bestsellers.png'


function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselItems = [
    { id: 1, image: bracelet, title: "Bracelet", tag: false },
    { id: 2, image: pearlRing, title: "Pearl's Ring", tag: true },
    { id: 3, image: diamondEarring, title: "Diamond Earring", tag: false },
    { id: 4, image: neckless, title: "Neckless", tag: true },
    { id: 5, image: bracelet, title: "Bracelet", tag: false },
    { id: 6, image: pearlRing, title: "Pearl's Ring", tag: true },
    { id: 7, image: diamondEarring, title: "Diamond Earring", tag: false },
    { id: 8, image: neckless, title: "Neckless", tag: true },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= carouselItems.length - 4 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? carouselItems.length - 4 : prev - 1));
  };

  return (
    <div className="w-full flex flex-col pb-20">

      {/* Hero */}
      <section className="relative 3xl:h-[745px] 2xl:h-[794px] xl:h-[675px] h-[498px] flex items-center overflow-hidden bg-[#227b8e]">
        <div className="absolute left-0 top-0 z-0 h-full w-[40%] bg-[#AAD1D8] blur-[100px]"></div>
        <div className="absolute w-[590px] xl:w-[800px] 2xl:w-[941px] 3xl:w-[59%]">
            <img src={heroImg} alt="heroImg" />
        </div>
        <div className="container mx-auto px-6">
          <div className="justify-end px-6 flex">
            <div className="w-full md:w-1/2 flex flex-col items-center text-white mt-12 md:mt-0">
            <p className="xl:text-[28px] text-[25px] mb-7 uppercase">New Arrivals</p>
            <h1 className="font-bellefair text-[56px] xl:text-[64px] 2xl:text-[92px] leading-[100%] mb-7 text-center">
              TIMELESS<br />BRILLIANCE
            </h1>
            <p className="text-[18px] xl:text-[20px] mb-8 font-light text-center">
              Life is made up of many gorgeous moments—big and small. Celebrate a life well lived in the most radiant way.
            </p>
            <button className="bg-white text-[#0C758C] xl:px-8 px-6 xl:py-3 py-2 text-[16px] font-medium hover:bg-transparent hover:text-white hover:border hover:border-white transition-colors border border-transparent cursor-pointer">
              Inquiry
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="w-full mt-24 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <h2 className="font-bellefair text-[#0C758C] text-[40px] xl:text-[48px] mb-2 text-center uppercase">
            Shop By Category
          </h2>
          <p className="text-[#3D3D3D] text-[15px] xl:text-[20px] xl:mb-14 mb-12 text-center">
            So that you don't run out of options to choose from!
          </p>
          
          <div className="flex flex-col md:flex-row 3xl:gap-[20px] 2xl:gap-[30px] gap-[20px] justify-center">

            <div className="flex flex-col 3xl:gap-[20px] 2xl:gap-[30px] gap-[20px]">
              <div className="flex flex-row 3xl:gap-[20px] 2xl:gap-[30px] gap-[20px]">
                <div className="bg-[#d7edf4] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[240px] xl:w-[235px] 2xl:w-[253px]">
                  <img src={classyEarrings} alt="" />
                  <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-[#3D3D3D] z-10 absolute xl:bottom-2 bottom-1 xl:right-17 right-10">Classy Earrings</span>
                </div>
                
                <div className="bg-[#d8dcde] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[240px] xl:w-[235px] 2xl:w-[253px]">
                  <img src={stuningRings} alt="" />
                  <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-[#3D3D3D] z-10 absolute xl:bottom-2 bottom-1 xl:right-17 right-10">Stunning Rings</span>
                </div>
              </div>
              
              <div className="bg-[#e0dbd6] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[500px] xl:w-[490px] 2xl:w-[536px]">
                <img src={stylish} alt="" />
                <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-gray-700 z-10 absolute xl:bottom-2 bottom-1 xl:left-48 left-32">Stylish</span>
              </div>
            </div>
            
            <div className="bg-[#eae7ee] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[280px] xl:w-[250px] 2xl:w-[304px]">
              <img src={elegantNecklace} alt="" />
              <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-[#3D3D3D] z-10 absolute xl:bottom-2 bottom-1 xl:right-19 right-11">Elegant Necklaces</span>
            </div>
            
            <div className="flex flex-col 3xl:gap-[20px] 2xl:gap-[30px] gap-[20px]">
              <div className="bg-[#e4dfdb] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[503px] xl:w-[500px] 2xl:w-[540px]">
                <img src={gorgeousBracelets} alt="" />
                <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-gray-700 z-10 absolute xl:bottom-2 bottom-1 xl:left-48 left-29">Gorgeous Bracelets</span>
              </div>
              
              <div className="flex flex-row 3xl:gap-[20px] 2xl:gap-[30px] gap-[20px]">
                <div className="bg-[#e5decc] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[242px] xl:w-[240px] 2xl:w-[255px]">
                  <img src={statementChains} alt="" />
                  <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-gray-700 z-10 absolute xl:bottom-2 bottom-1 xl:right-15 right-8">Statement Chains</span>
                </div>
                
                <div className="bg-[#e6e6e6] rounded-lg relative overflow-hidden flex justify-end 3xl:w-[242px] xl:w-[240px] 2xl:w-[255px]">
                  <img src={daintyPendants} alt="" />
                  <span className="text-[13px] 2xl:text-[16px] font-medium text-center text-gray-700 z-10 absolute xl:bottom-2 bottom-1 xl:right-15 right-8">Dainty Pendants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Diamonds */}
      <section className="bg-[#FFF8EF] mt-24 xl:py-[100px] py-[70px]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-bellefair text-[#1A1A1A] text-[40px] xl:text-[48px] mb-2 uppercase">
              Explore Diamonds
            </h2>
            <p className="text-[#1A1A1A] text-[15px] xl:text-[20px] xl:mb-14 mb-12">
              Shop Diamonds by Shape
            </p>

            <div className="flex justify-around">
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={roundDiamond} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Round</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={princess} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Princess</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={emerald} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Emerald</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={asscher} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Asscher</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={cushion} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Cushion</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={marquise} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Marquise</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={radiant} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Radiant</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={oval} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Oval</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={pear} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Pear</p>
              </div>
              <div className="flex flex-col items-center gap-5 xl:gap-6">
                <img src={heart} alt="" />
                <p className="text-[#1A1A1A] text-[15px] xl:text-[20px]">Heart</p>
              </div>
            </div>

          </div>
      </section>

      {/* Most Popular */}
      <section className="xl:mt-24 mt-20 w-full overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-bellefair text-[#0C758C] text-[40px] xl:text-[48px] mb-2 uppercase">
              Most Popular
            </h2>
            <p className="text-[#1A1A1A] text-[15px] xl:text-[20px] xl:mb-14 mb-12">
              Selected specially for you
            </p>
            
            <div className="flex items-center justify-between w-full max-w-[1440px] gap-4 xl:gap-8">
              <button 
                onClick={prevSlide}
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Carousel Items Wrapper */}
              <div className="overflow-hidden w-full">
                <div 
                  className="flex transition-transform duration-500 ease-in-out gap-4"
                  style={{ transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 4}px))` }}
                >
                  {carouselItems.map((item) => (
                    <div key={item.id} className="flex-none w-[calc(25%-12px)] flex flex-col items-center relative">
                      <div className="relative w-full aspect-square">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        {item.tag && (
                          <img src={bestsellerTag} alt="Bestseller" className="absolute top-0 left-0 w-[100px]" />
                        )}
                      </div>
                      <div className="bg-white w-[90%] -mt-8 relative z-10 py-4 px-2 flex flex-col items-center">
                        <h3 className="text-[#0C758C] font-bellefair text-[16px] xl:text-[20px] uppercase mb-1">{item.title}</h3>
                        <p className="text-[#6b6375] text-[10px] xl:text-[12px] text-center max-w-[200px] leading-relaxed">
                          Diamond Kisses Bracelet With 0.05ct Set<br/>in 925 Silver
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={nextSlide}
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
        </div>
      </section>

      {/* CTA */}
      <CTA/>

    </div>
  )
}

export default Home