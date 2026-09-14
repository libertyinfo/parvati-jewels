import React from 'react'
import { Link } from 'react-router-dom'
import productBanner from '../assets/ring-heroimg.png'
import CTA from './CTA'
import ScrollReveal from './ScrollReveal'
import bestsellerTag from '../assets/bestsellers.png'

import loveRing from '../assets/rings/love.png'
import lockRing from '../assets/rings/lock.png'
import vineRing from '../assets/rings/vine.png'
import weddingRing from '../assets/rings/wedding.png'

const products = [
  { id: 1, name: 'LOVE RING', image: loveRing, isBestseller: false },
  { id: 2, name: 'LOCK RING', image: lockRing, isBestseller: true },
  { id: 3, name: 'VINE RING', image: vineRing, isBestseller: false },
  { id: 4, name: 'WEDDING RING', image: weddingRing, isBestseller: false },
  { id: 5, name: '16 STONE RING', image: weddingRing, isBestseller: false },
  { id: 6, name: 'HEART RING', image: loveRing, isBestseller: false },
  { id: 7, name: 'SOLITAIRE RING', image: vineRing, isBestseller: false },
  { id: 8, name: 'BAND', image: lockRing, isBestseller: true },
  { id: 9, name: 'LOCK RING', image: lockRing, isBestseller: true },
  { id: 10, name: '16 STONE RING', image: weddingRing, isBestseller: false },
  { id: 11, name: 'HEART RING', image: loveRing, isBestseller: false },
  { id: 12, name: 'SOLITAIRE RING', image: vineRing, isBestseller: false },
];

function Productlist() {
  return (
    <div className='lg:pb-20 pb-10'>
        {/* Hero */}
        <section className="relative 3xl:h-[350px] 2xl:h-[400px] xl:h-[380px] lg:h-[307px] h-[240px] flex items-center overflow-hidden bg-[#227b8e] py-6">
          <div className="container mx-auto px-6">
            <div className="flex">
              <ScrollReveal animation="fade-right" duration={900} className="w-full md:w-1/2 flex flex-col items-center text-white mt-12 md:mt-0 relative z-10">
                <p className="xl:text-[28px] lg:text-[24px] text-[20px] 3xl:text-[26px] lg:mb-7 mb-5 uppercase drop-shadow-md">Its time to show off your</p>
                <h1 className="font-bellefair text-[50px] lg:text-[54px] xl:text-[64px] 2xl:text-[92px] 3xl:text-[88px] leading-[100%] mb-7 text-center drop-shadow-lg">
                  RINGS
                </h1>
              </ScrollReveal>
            </div>
          </div>
          <div className="absolute right-0 top-0 z-0 h-full w-[40%] bg-[#AAD1D8] blur-[100px]"></div>
          <ScrollReveal animation="fade-left" duration={900} delay={150} className="absolute w-[404px] lg:w-[515px] xl:w-[638px] 2xl:w-[672px] 3xl:w-[38%] 2xl:right-[12%] 3xl:right-[10%] xl:right-[5%] lg:right-[2%] right-[1%] opacity-40 md:opacity-100">
            <img src={productBanner} alt="productBanner" />
          </ScrollReveal>
        </section>

        {/* Main Section */}
        <section className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-[14px] 2xl:text-[16px] text-[#3D3D3D] lg:mb-10 mb-8 tracking-widest uppercase font-medium lg:mt-14 mt-10">
              <Link to="/" className="hover:text-black transition-colors">HOME</Link> <span className="mx-2">|</span> <span className="text-[#3D3D3D]">RINGS</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, index) => (
              <ScrollReveal 
                key={product.id} 
                animation="fade-up" 
                delay={(index % 4) * 120} 
                className="flex flex-col"
              >
                <Link to="/productdetails" className="relative w-full flex items-center justify-center mb-5 overflow-hidden group">
                  {product.isBestseller && (
                    <div className="absolute top-4 lg:left-0 md:left-[1%] left-[5%] z-10">
                      <img src={bestsellerTag} alt="bestsellerTag" />
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <h3 className="text-center text-[16px] 2xl:text-[24px] text-[#1A1A1A] tracking-widest uppercase">{product.name}</h3>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
      <CTA/>
    </div>
  )
}

export default Productlist