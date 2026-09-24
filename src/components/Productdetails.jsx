import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CTA from "./CTA";
import ScrollReveal from './ScrollReveal';
import starIcon from '../assets/icons/star.svg';
import { fetchJson } from '../lib/api';
       
function Productdetails({ setInquiryState }) {
  const { slug } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-xl">Loading product details...</div>;
  if (error) return <div className="py-20 text-center text-xl text-red-500">{error}</div>;
  if (!product) return <div className="py-20 text-center text-xl">Product not found.</div>;
  
  const images = product.images.length > 0 ? product.images : [{ imageUrl: '' }];
  
  let minPrice = 0, maxPrice = 0;
  if (product.variants && product.variants.length > 0) {
    const prices = product.variants.map(v => v.price);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }

  let specs = {};
  if (product.variants && product.variants.length > 0 && product.variants[0].specifications) {
    try {
      specs = JSON.parse(product.variants[0].specifications);
    } catch(e) {}
  }

  return (
    <div>
        {/* Hero Section */}
        <div className="container mx-auto px-6 2xl:py-14 md:py-10 py-5">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          <ScrollReveal animation="fade-up" duration={900} delay={150} className="2xl:w-[828px] xl:w-[785px] lg:w-[765px] md:w-[720px] w-full flex flex-col">
            <div className="w-full 2xl:h-[714px] xl:h-[655px] h-[260px] md:h-[595px] flex items-center justify-center overflow-hidden md:mb-8 mb-5">
              <img src={images[activeIndex]?.imageUrl} alt="Main product view" className="w-full h-full object-cover transition-opacity duration-500" />
            </div>
            
            <div className="flex flex-wrap justify-between md:gap-3 gap-2 overflow-x-auto pb-2">
              {images.map((item, index) => (
                <div 
                  key={index} 
                  className={`md:w-[15%] w-[20%] cursor-pointer transition-all duration-300 border ${activeIndex === index ? 'border-[#3D3D3D] shadow-sm' : 'border-transparent hover:border-gray-300'}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={item.imageUrl} alt={`Thumbnail ${index + 1}`} className="w-full 2xl:h-[134px] xl:h-[110px] md:h-[90px] h-[56px] object-cover" />
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={900} delay={150} className="w-full lg:w-[582px] flex flex-col">
            <div className="text-[11px] 2xl:text-[16px] md:text-[13px] text-[#7A7A7A] 2xl:mb-9 xl:mb-7 mb-5 uppercase font-medium">
              <Link to="/" className="hover:text-black transition-colors">HOME</Link> 
              <span className="mx-3 text-gray-300">|</span> 
              <Link to={`/category/${product.category?.slug || 'rings'}`} className="hover:text-black transition-colors">{product.category?.name?.toUpperCase() || 'CATEGORY'}</Link>
              <span className="mx-3 text-gray-300">|</span> 
              <span className="text-[#3D3D3D]">{product.name}</span>
            </div>

            <h1 className="text-[30px] md:text-[34px] xl:text-[40px] font-bellefair text-[#12798C] 2xl:mb-6 xl:mb-4 mb-2">{product.name}</h1>
            <p className="text-[20px] md:text-[22px] xl:text-[26px] 2xl:text-[28px] text-[#1A1A1A] font-medium 2xl:mb-6 mb-4">
              ${minPrice.toFixed(2)} {maxPrice > minPrice ? `– $${maxPrice.toFixed(2)}` : ''}
            </p>
            
            <div className="w-full h-[1px] bg-[#9C9C9C] 2xl:mb-6 mb-4"></div>

            <p className="text-[#1A1A1A] text-[13px] md:text-[14px] 2xl:text-[16px] font-light xl:mb-5 mb-3">
              {product.description}
            </p>
            {product.shortDescription && (
              <p className="text-[#1A1A1A] text-[13px] md:text-[14px] 2xl:text-[16px] font-light xl:mb-6 mb-4">
                {product.shortDescription}
              </p>
            )}
            
            <p className="text-[#1A1A1A] text-[14px] 2xl:text-[16px] font-medium xl:mb-6 mb-4">
              Metal: <span className="text-[#000000] font-light ml-1">{product.material}</span>
            </p>

            <div className="flex gap-1.5 2xl:mb-8 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <img 
                  key={star} 
                  src={starIcon}
                  alt="star" 
                  className={`xl:w-[30px] xl:h-[30px] md:w-[28px] md:h-[28px] w-[25px] h-[25px]  ${star > (product.rating || 4) ? 'grayscale opacity-30' : ''}`} 
                />
              ))}
            </div>

            <button 
              onClick={() => setInquiryState({ isOpen: true, type: 'product', product })}
              className="w-full bg-[#1A1A1A] text-white py-3 xl:py-3.5 text-[15px] 2xl:text-[26px] font-medium hover:bg-[#12798C] transition-colors 2xl:mb-8 xl:mb-6 mb-4 cursor-pointer"
            >
              Inquiry
            </button>

            <p className="text-[#1A1A1A] text-[15px] 2xl:text-[16px] font-medium 2xl:mb-6 mb-4">Product Specification</p>
            <div className="w-full h-px bg-[#9C9C9C] 2xl:mb-6 mb-4"></div>

            <div className="grid grid-cols-2 2xl:gap-y-5 xl:gap-y-4 gap-y-3 gap-x-4 xl:mb-6 mb-2">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[#1A1A1A] text-[13px] 2xl:text-[16px] mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
                  <p className="text-[#3D3D3D] text-[13px] 2xl:text-[16px] font-light">{value}</p>
                </div>
              ))}
            </div>

            <p className="text-[#1A1A1A] text-[12px] md:text-[14px] 2xl:text-[16px] font-light 2xl:mt-auto xl:mt-4 mt-2">
              Please note weights, gem colours and sizes are approximate and may vary slightly.
            </p>
          </ScrollReveal>

        </div>
        </div>
      
      {/* CTA */}
      <CTA/>
    </div>
  )
}

export default Productdetails;
