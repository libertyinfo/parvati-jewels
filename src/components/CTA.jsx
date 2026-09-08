import React from 'react'
import ScrollReveal from './ScrollReveal'

function CTA() {
  return (
    <section className="xl:mt-24 3xl:mt-15 2xl:my-20 my-16 text-center">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up" delay={0}>
          <h2 className="font-bellefair text-[#1A1A1A] text-[40px] xl:text-[48px] mb-2 uppercase">LET’S GET IN TOUCH</h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <p className="text-[#1A1A1A] text-[15px] xl:text-[20px] xl:mb-14 mb-12 font-light">
            Get our latest offers, jewellery inspiration and be the first to shop new arrivals
          </p>
        </ScrollReveal>

        <ScrollReveal animation="zoom-in" delay={300}>
          <div className="flex justify-center items-center gap-2">
            <input type="text" placeholder="Email Address" className="border border-[#9C9C9C66] xl:py-4.5 py-3 px-4 xl:w-[406px] w-[375px] placeholder:text-black"/>
            <button className="bg-[#1A1A1A] xl:py-4 py-3 xl:px-10 px-8 text-white xl:text-[20px] text-[16px] cursor-pointer font-medium">Subscribe</button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default CTA