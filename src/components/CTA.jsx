import React from 'react'

function CTA() {
  return (
    <section className="mt-24 text-center">
          <div className="container">
            <h2 className="font-bellefair text-[#1A1A1A] text-[40px] xl:text-[48px] mb-2 uppercase">LET’S GET IN TOUCH</h2>
          <p className="text-[#1A1A1A] text-[15px] xl:text-[20px] mb-14 font-light">Get our latest offers, jewellery inspiration and be the first to shop new arrivals</p>
          <div className="flex justify-center items-center gap-2">
            <input type="text" placeholder="Email Address" className="border border-[#9C9C9C66] py-4.5 px-4 w-[406px] placeholder:text-black"/>
            <button className="bg-[#1A1A1A] py-4 px-10 text-white text-[20px] cursor-pointer font-medium">Subscribe</button>
          </div>
          </div>
      </section>
  )
}

export default CTA