import React from 'react'
import { Link } from 'react-router-dom'
import productBanner from '../assets/ring-heroimg.png'
import CTA from './CTA'
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
    <div className='pb-20'>
        {/* Hero */}
        <section className="relative 3xl:h-[350px] 2xl:h-[400px] xl:h-[380px] h-[498px] flex items-center overflow-hidden bg-[#227b8e] py-6">
          <div className="container mx-auto px-6">
            <div className="flex">
              <div className="w-full md:w-1/2 flex flex-col items-center text-white mt-12 md:mt-0">
              <p className="xl:text-[28px] text-[25px] 3xl:text-[26px] mb-7 uppercase">Its time to show off your</p>
              <h1 className="font-bellefair text-[56px] xl:text-[64px] 2xl:text-[92px] 3xl:text-[88px] leading-[100%] mb-7 text-center">
                RINGS
              </h1>
            </div>
          </div>
          </div>
          <div className="absolute right-0 top-0 z-0 h-full w-[40%] bg-[#AAD1D8] blur-[100px]"></div>
          <div className="absolute w-[590px] xl:w-[638px] 2xl:w-[672px] 3xl:w-[38%] 2xl:right-[12%] 3xl:right-[10%] right-[5%]">
            <img src={productBanner} alt="productBanner" />
          </div>
        </section>

        {/* Main Section */}
        <section className="container mx-auto px-6">
          <div className="text-[14px] 2xl:text-[16px] text-[#3D3D3D] mb-10 tracking-widest uppercase font-medium mt-14">
            <Link to="/" className="hover:text-black transition-colors">HOME</Link> <span className="mx-2">|</span> <span className="text-[#3D3D3D]">RINGS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <Link to="/productdetails" className="relative w-full flex items-center justify-center mb-5 overflow-hidden group">
                  {product.isBestseller && (
                    <div className="absolute top-4 left-0 z-10">
                      <img src={bestsellerTag} alt="bestsellerTag" />
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <h3 className="text-center text-[16px] 2xl:text-[24px] text-[#1A1A1A] tracking-widest uppercase">{product.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
      <CTA/>
    </div>
  )
}

export default Productlist