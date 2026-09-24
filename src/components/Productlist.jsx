import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CTA from './CTA'
import ScrollReveal from './ScrollReveal'
import bestsellerTag from '../assets/bestsellers.png'

import ringsBanner from '../assets/ring-heroimg.png'
import earringsBanner from '../assets/earrings-heroimg.png'
import necklaceBanner from '../assets/necklace-heroimg.png'
import braceletBanner from '../assets/bracelet-heroimg.png'
import pendantBanner from '../assets/pendant-heroimg.png'

const categoryData = {
  rings: { title: 'RINGS', banner: ringsBanner },
  earrings: { title: 'EARRINGS', banner: earringsBanner },
  necklace: { title: 'NECKLACES', banner: necklaceBanner },
  bracelets: { title: 'BRACELETS', banner: braceletBanner },
  pendant: { title: 'PENDANTS', banner: pendantBanner },
};

function Productlist() {
  const { categorySlug } = useParams();
  const currentCategory = categoryData[categorySlug] || categoryData.rings;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${categorySlug || 'rings'}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [categorySlug]);

  if (loading) {
    return <div className="py-20 text-center text-xl">Loading products...</div>;
  }
  if (error) {
    return <div className="py-20 text-center text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className='lg:pb-20 pb-10'>
        {/* Hero */}
        <section className="relative 3xl:h-[350px] 2xl:h-[400px] xl:h-[380px] lg:h-[307px] h-auto min-h-[240px] flex flex-col md:flex-row items-center overflow-hidden bg-[#227b8e] py-6 md:py-0">
          <div className="absolute right-0 top-0 z-0 h-full w-[40%] bg-[#AAD1D8] blur-[100px]"></div>
          <ScrollReveal animation="fade-left" duration={900} delay={150} className="relative z-0 md:absolute w-[250px] sm:w-[300px] md:w-[404px] lg:w-[515px] xl:w-[638px] 2xl:w-[672px] 3xl:w-[38%] 2xl:right-[12%] 3xl:right-[10%] xl:right-[5%] lg:right-[2%] right-[0%] mt-4 md:mt-0 opacity-100 mx-auto flex justify-center">
            <img src={currentCategory.banner} alt="productBanner" className="w-full h-auto object-contain" />
          </ScrollReveal>
          <div className="absolute inset-0 bg-black/40 md:hidden z-[5]"></div>
          <div className="container mx-auto px-6 z-10 relative">
            <div className="flex">
              <ScrollReveal animation="fade-right" duration={900} className="w-full md:w-1/2 flex flex-col items-center md:items-start text-white mt-4 md:mt-0 text-center md:text-left relative z-10">
                <p className="xl:text-[28px] lg:text-[24px] md:text-[20px] 3xl:text-[26px] text-[16px] lg:mb-7 mb-3 uppercase drop-shadow-md">Its time to show off your</p>
                <h1 className="font-bellefair text-[40px] md:text-[50px] lg:text-[54px] xl:text-[64px] 2xl:text-[92px] 3xl:text-[88px] leading-[100%] mb-4 md:mb-7 drop-shadow-lg">
                  {currentCategory.title}
                </h1>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Main Section */}
        <section className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="text-[14px] 2xl:text-[16px] text-[#3D3D3D] lg:mb-10 mb-8 tracking-widest uppercase font-medium lg:mt-14 mt-10">
              <Link to="/" className="hover:text-black transition-colors">HOME</Link> <span className="mx-2">|</span> <span className="text-[#3D3D3D]">{currentCategory.title}</span>
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
                <Link to={`/products/${product.slug}`} className="relative w-full flex items-center justify-center mb-5 overflow-hidden group">
                  {product.isBestseller && (
                    <div className="absolute top-4 lg:left-0 md:left-[1%] left-[0%] z-10">
                      <img src={bestsellerTag} alt="bestsellerTag" />
                    </div>
                  )}
                  {product.primaryImage ? (
                    <img src={product.primaryImage} alt={product.name} className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-[250px] bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </Link>
                <h3 className="text-center text-[16px] 2xl:text-[24px] text-[#1A1A1A] uppercase">{product.name}</h3>
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