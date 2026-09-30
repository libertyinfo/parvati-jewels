import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Isotope from "isotope-layout";
import ScrollReveal from "./ScrollReveal";
import diamondHero from "../assets/diamond-heroimg.png";
import bestsellerTag from "../assets/bestsellers.png";
import { fetchJson } from "../lib/api";
import { productImageUrl } from "../lib/productImage";
import {
  DIAMOND_SHAPE_TABS,
  getProductShapes,
  productMatchesDiamondShape,
  compareProductsByStoneShape,
} from "../lib/productShapes";
import { shapeFilterClass } from "../lib/shapeFilterClass";
import CTA from "./CTA";

const SHAPE_TABS = ["All", ...DIAMOND_SHAPE_TABS];

function Diamond() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const shapeFromUrl = searchParams.get("shape");
  const [activeShape, setActiveShape] = useState(
    shapeFromUrl && SHAPE_TABS.includes(shapeFromUrl) ? shapeFromUrl : "All",
  );
  const scrollRef = useRef(null);
  const gridRef = useRef(null);
  const isotopeRef = useRef(null);

  const displayProducts = useMemo(
    () => [...products].sort(compareProductsByStoneShape),
    [products],
  );

  const matchingCount = useMemo(() => {
    if (activeShape === "All") return displayProducts.length;
    return displayProducts.filter((p) =>
      productMatchesDiamondShape(p, activeShape),
    ).length;
  }, [displayProducts, activeShape]);

  useEffect(() => {
    if (shapeFromUrl && SHAPE_TABS.includes(shapeFromUrl)) {
      setActiveShape(shapeFromUrl);
    } else if (!shapeFromUrl) {
      setActiveShape("All");
    }
  }, [shapeFromUrl]);

  const scrollTabs = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -150 : 150, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchJson('/api/products')
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || !gridRef.current || displayProducts.length === 0) return undefined;

    isotopeRef.current?.destroy();
    isotopeRef.current = new Isotope(gridRef.current, {
      itemSelector: '.diamond-grid-item',
      layoutMode: 'fitRows',
      transitionDuration: '0.45s',
      stagger: 30,
    });

    return () => {
      isotopeRef.current?.destroy();
      isotopeRef.current = null;
    };
  }, [loading, displayProducts]);

  useEffect(() => {
    if (!isotopeRef.current) return;
    const filter =
      activeShape === 'All' ? '*' : `.${shapeFilterClass(activeShape)}`;
    isotopeRef.current.arrange({ filter });
    isotopeRef.current.layout();
  }, [activeShape, displayProducts, loading]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative 3xl:h-[380px] 2xl:h-[400px] xl:h-[385px] lg:h-[307px] h-[240px] flex items-center overflow-hidden bg-[#227b8e] py-6">
        <div className="absolute right-[5%] top-0 z-0 h-full w-[40%] bg-[#AAD1D8] blur-[100px]"></div>
        <ScrollReveal
          animation="fade-left"
          duration={900}
          delay={150}
          className="absolute z-0 w-[361px] lg:w-[462px] xl:w-[580px] 2xl:w-[672px] 3xl:w-[37%] right-[2%] xl:right-[5%] 2xl:right-[12%] 3xl:right-[6%] opacity-40 md:opacity-100"
        >
          <img src={diamondHero} alt="diamondHero" />
        </ScrollReveal>
        <div className="absolute inset-0 bg-black/40 md:hidden z-[5]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex">
            <ScrollReveal
              animation="fade-right"
              duration={900}
              className="w-full md:w-1/2 flex flex-col text-white mt-12 md:mt-0 relative z-10"
            >
              <p className="2xl:text-[28px] xl:text-[26px] md:text-[20px] text-[18px] 3xl:text-[26px] 2xl:mb-7 mb-5 uppercase drop-shadow-md">
                Its time to show off your
              </p>
              <h1 className="font-bellefair text-[42px] md:text-[50px] xl:text-[62px] 2xl:text-[92px] 3xl:text-[88px] leading-[100%] 2xl:mb-7 mb-5 drop-shadow-lg">
                DIAMONDS
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="container mx-auto px-6 mt-10 md:mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-[200px_auto] items-center 2xl:my-12 xl:my-7 my-5 gap-4">
          <ScrollReveal animation="fade-right" duration={900}>
            <div className="text-[11px] 2xl:text-[16px] md:text-[13px] text-[#7A7A7A] uppercase font-medium">
              <Link to="/" className="hover:text-black transition-colors">HOME</Link> 
              <span className="mx-3 text-gray-300">|</span> 
              <span className="text-[#3D3D3D]">DIAMONDS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" duration={900} className="w-full justify-end flex items-center">
            <div ref={scrollRef} className="flex flex-wrap gap-4 pb-2 sm:pb-0 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .flex::-webkit-scrollbar { display: none; }
              `}</style>
              {SHAPE_TABS.map(shape => (
                <button 
                  key={shape} 
                  onClick={(e) => {
                    setActiveShape(shape);
                    if (shape === "All") {
                      setSearchParams({});
                    } else {
                      setSearchParams({ shape });
                    }
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                  }}
                  className={`text-[12px] md:text-[14px] uppercase tracking-wide transition-colors flex-shrink-0 cursor-pointer ${activeShape === shape ? 'text-white font-semibold bg-[#0C758C] p-2 rounded-full' : 'text-[#0C758C] hover:bg-[#0C758C] hover:text-white border border-[#0C758C] px-2 py-1 rounded-full'}`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xl">Loading products...</div>
        ) : displayProducts.length === 0 ? (
          <div className="py-20 text-center text-xl text-[#7A7A7A]">No products found.</div>
        ) : matchingCount === 0 ? (
          <div className="py-20 text-center text-xl text-[#7A7A7A]">
            No products with stone shape &ldquo;{activeShape}&rdquo;.
          </div>
        ) : (
          <div ref={gridRef} className="relative w-full -mx-2 md:-mx-3">
            {displayProducts.map((product) => {
              const shapeClasses = getProductShapes(product)
                .map((s) => shapeFilterClass(s))
                .join(' ');
              return (
                <div
                  key={product.id}
                  className={`diamond-grid-item float-left w-1/2 md:w-1/4 px-2 md:px-3 mb-8 md:mb-10 flex flex-col ${shapeClasses}`}
                >
                  <Link to={`/products/${product.slug}`} className="relative w-full flex items-center justify-center mb-5 overflow-hidden group">
                    {product.isBestseller && (
                      <div className="absolute top-4 lg:left-0 md:left-[1%] left-[0%] z-10">
                        <img src={bestsellerTag} alt="bestsellerTag" className="w-[70px] lg:w-auto h-auto" />
                      </div>
                    )}
                    {product.primaryImage ? (
                      <img
                        src={productImageUrl(product.primaryImage)}
                        alt={product.name}
                        className="object-cover h-[280px] mix-blend-multiply group-hover:scale-110 transition-transform duration-500 w-full"
                        onLoad={() => isotopeRef.current?.layout()}
                      />
                    ) : (
                      <div className="w-full h-[250px] bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </Link>
                  <h3 className="text-center text-[13px] md:text-[14px] 2xl:text-[16px] text-[#1A1A1A] uppercase truncate font-medium">{product.name}</h3>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <CTA/>
    </div>
  );
}

export default Diamond;
