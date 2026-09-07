import CTA from './CTA'
import contactHero from '../assets/contact-hero.png'
import { Link } from 'react-router-dom'
import phoneCall from '../assets/icons/phone.svg'
import whatsApp from '../assets/icons/whatsapp.svg'
import mail from '../assets/icons/mail.svg'

function Contact() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative 3xl:h-[380px] 2xl:h-[400px] xl:h-[675px] h-[498px] flex items-center overflow-hidden bg-[#227b8e] py-6">
                <div className="container mx-auto px-6">
                    <div className="flex">
                        <div className="w-full md:w-1/2 flex flex-col items-center text-white mt-12 md:mt-0">
                            <p className="xl:text-[28px] text-[25px] 3xl:text-[26px] mb-7 uppercase">Let us know what you have in mind</p>
                            <h1 className="font-bellefair text-[56px] xl:text-[64px] 2xl:text-[92px] 3xl:text-[88px] leading-[100%] mb-7 text-center">
                                CONTACT
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="absolute right-[5%] top-0 z-0 h-full w-[40%] bg-[#AAD1D8] blur-[100px]"></div>
                <div className="absolute w-[590px] xl:w-[800px] 2xl:w-[602px] 3xl:w-[37%] right-[12%] 3xl:right-[6%]">
                    <img src={contactHero} alt="contactHero" />
                </div>
            </section>

            {/* Main Section */}
            <section className='container mx-auto px-6 mb-24'>
                <div className="text-[14px] 2xl:text-[16px] text-[#3D3D3D] mb-12 tracking-widest uppercase font-medium mt-14">
                    <Link to="/" className="hover:text-black transition-colors">HOME</Link> <span className="mx-2">|</span> <span className="text-[#3D3D3D]">CONTACT</span>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-24'>
                    <div className="flex flex-col items-center justify-center py-10 px-8 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 duration-300">
                        <div className="mb-5">
                            <img src={phoneCall} alt="phoneCall" />
                        </div>
                        <h3 className="text-[18px] 2xl:text-[24px] font-medium text-[#1A1A1A] mb-3">+91 92345 96789</h3>
                        <p className="text-[14px] 2xl:text-[16px] text-[#1A1A1A] text-center font-light max-w-[364px]">
                            Connect with our delight team over a quick phone call
                        </p>                    </div>

                    <div className="flex flex-col items-center justify-center py-10 px-8 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 duration-300">
                        <div className="mb-5">
                            <img src={whatsApp} alt="whatsApp" />
                        </div>
                        <h3 className="text-[18px] 2xl:text-[24px] font-medium text-[#1A1A1A] mb-3">WhatsApp Us</h3>
                        <p className="text-[14px] 2xl:text-[16px] text-[#1A1A1A] text-center font-light max-w-[364px]">
                            Our 24x7 Shopping Assistant with a quick response is just a text away
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center py-10 px-8 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 duration-300">
                        <div className="mb-5">
                           <img src={mail} alt="mail" />
                        </div>
                        <h3 className="text-[18px] 2xl:text-[24px] font-medium text-[#1A1A1A] mb-3">support@parvati.com</h3>
                        <p className="text-[14px] 2xl:text-[16px] text-[#1A1A1A] text-center font-light max-w-[364px]">
                            Your questions or feedback are always welcome at Parvati.com
                        </p>
                    </div>
                </div>

                <div className="w-[988px] max-w-full h-[450px] bg-gray-200 overflow-hidden mx-auto">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709425475!2d72.73989476318933!3d21.15946270564619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1709212000000!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Surat Location Map"
                    ></iframe>
                </div>

            </section>

            {/* CTA */}
            <CTA />
        </div>
    )
}

export default Contact