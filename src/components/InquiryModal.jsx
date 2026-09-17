import React, { useEffect, useRef, useState } from 'react';
import weddingMain from '../assets/ring-detail/wedding-main.png';
import starIcon from '../assets/icons/star.svg';

const InquiryModal = ({ inquiryState, setInquiryState }) => {
  const { isOpen, type } = inquiryState || {
    isOpen: false,
    type: null,
  };

  const [selectedMetal, setSelectedMetal] = useState('Silver');

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categoryRef = useRef(null);


  const categories = [
    'Rings',
    'Earrings',
    'Bracelet',
    'Necklace',
    'Mangalsutras',
    'Pendants',
    'Chains',
    'Jewellery set',
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const closeModal = () => {
    setInquiryState({
      isOpen: false,
      type: null,
    });

    setIsCategoryOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }

      return [...prev, category];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const inquiryData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      metal: selectedMetal,
      categories: selectedCategories,
      message: formData.get('message'),
    };

    console.log('Inquiry Data:', inquiryData);

    setInquiryState({
      isOpen: true,
      type: 'success',
    });
  };

  const getCategoryText = () => {
    if (selectedCategories.length === 0) {
      return 'Select Category';
    }

    if (selectedCategories.length === 1) {
      return selectedCategories[0];
    }

    return `${selectedCategories.length} Categories Selected`;
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] ${isOpen
        ? 'pointer-events-auto'
        : 'pointer-events-none'
        }`}
    >

      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen
          ? 'visible opacity-100'
          : 'invisible opacity-0'
          }`}
        onClick={closeModal}
      ></div>

      <div
        className={`absolute right-0 top-0 h-full transform overflow-y-auto bg-white transition-transform duration-300 xl:w-[520px] lg:w-[485px] max-w-full w-[445px] ${isOpen
          ? 'translate-x-0'
          : 'translate-x-full'
          }`}
      >
        <div className="relative flex min-h-full flex-col p-8">

          <button
            type="button"
            onClick={closeModal}
            className="absolute right-8 top-8 cursor-pointer text-[#1A1A1A] transition-opacity hover:opacity-70"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <h2 className="lg:mb-10 mb-8 font-bellefair text-[32px] uppercase tracking-wide text-[#12798C]">
            INQUIRY
          </h2>

          {type === 'success' && (
            <div className="-mt-20 flex flex-1 flex-col items-center justify-center text-center">

              <h3 className="mb-2 text-[20px] font-medium text-[#1A1A1A]">
                Thank you for your request.
              </h3>

              <p className="mb-16 text-[14px] font-light text-[#1A1A1A]">
                We truly value your contribution and will
                review it promptly.
                <br />
                You can expect to hear back from us within
                48 hours.
              </p>

              <button
                type="button"
                onClick={closeModal}
                className="absolute bottom-8 left-8 mt-auto w-[calc(100%-64px)] cursor-pointer bg-[#1A1A1A] py-4 text-[16px] font-medium text-white transition-colors hover:bg-[#12798C]"
              >
                Continue
              </button>
            </div>
          )}

          {type === 'general' && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col"
            >

              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="mb-4 w-full border border-[#E5E5E5] p-4 lg:text-[14px] text-[12px] focus:border-[#12798C] focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="mb-4 w-full border border-[#E5E5E5] p-4 lg:text-[14px] text-[12px] focus:border-[#12798C] focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="mb-8 w-full border border-[#E5E5E5] p-4 lg:text-[14px] text-[12px] focus:border-[#12798C] focus:outline-none"
              />

              <div className="mb-6">

                <p className="mb-3 text-[15px] font-medium text-[#1A1A1A]">
                  Metal:{' '}
                  <span className="font-light text-[#7A7A7A]">
                    {selectedMetal}
                  </span>
                </p>

                <div className="flex gap-4">

                  <button
                    type="button"
                    aria-label="Silver"
                    onClick={() =>
                      setSelectedMetal('Silver')
                    }
                    className={`h-6 w-6 cursor-pointer rounded-full bg-[#F1F1F1] transition-all duration-200 ${selectedMetal === 'Silver'
                      ? 'ring-1 ring-[#000000] ring-offset-1'
                      : ''
                      }`}
                  />

                  <button
                    type="button"
                    aria-label="Gold"
                    onClick={() =>
                      setSelectedMetal('Gold')
                    }
                    className={`h-6 w-6 cursor-pointer rounded-full bg-[#E5D2A0] transition-all duration-200 ${selectedMetal === 'Gold'
                      ? 'ring-1 ring-[#000000] ring-offset-1'
                      : ''
                      }`}
                  />

                  <button
                    type="button"
                    aria-label="Rose Gold"
                    onClick={() =>
                      setSelectedMetal('Rose Gold')
                    }
                    className={`h-6 w-6 cursor-pointer rounded-full bg-[#F3CDB8] transition-all duration-200 ${selectedMetal === 'Rose Gold'
                      ? 'ring-1 ring-[#000000] ring-offset-1'
                      : ''
                      }`}
                  />

                  <button
                    type="button"
                    aria-label="Platinum"
                    onClick={() =>
                      setSelectedMetal('Platinum')
                    }
                    className={`h-6 w-6 cursor-pointer rounded-full border border-[#D0D5DD] bg-[#E9ECEC] transition-all duration-200 ${selectedMetal === 'Platinum'
                      ? 'ring-1 ring-[#000000] ring-offset-1'
                      : ''
                      }`}
                  />

                </div>
              </div>

              <div
                className="mb-6"
                ref={categoryRef}
              >

                <p className="mb-3 text-[15px] font-medium text-[#1A1A1A]">
                  Product Category
                </p>

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setIsCategoryOpen(
                        (prev) => !prev
                      )
                    }
                    className={`flex h-[48px] w-full cursor-pointer items-center justify-between border bg-white px-4 text-left text-[14px] transition-colors focus:outline-none ${isCategoryOpen
                      ? 'border-[#12798C]'
                      : 'border-[#E5E5E5]'
                      }`}
                  >

                    <span
                      className={
                        selectedCategories.length > 0
                          ? 'text-[#1A1A1A]'
                          : 'text-[#7A7A7A]'
                      }
                    >
                      {getCategoryText()}
                    </span>

                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${isCategoryOpen
                        ? 'rotate-180'
                        : ''
                        }`}
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="#3D3D3D"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </button>

                  {isCategoryOpen && (
                    <div
                      className="
                        absolute
                        left-0
                        top-[56px]
                        z-50
                        w-full
                        overflow-y-auto
                        border
                        border-[#F0F0F0]
                        bg-white
                        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                        max-h-[390px]
                      "
                    >

                      {categories.map((category) => {

                        const isSelected =
                          selectedCategories.includes(
                            category
                          );

                        return (
                          <label
                            key={category}
                            className="
                              flex
                              cursor-pointer
                              items-center
                              gap-3
                              px-4
                              py-3.5
                              transition-colors
                              hover:bg-[#F8FAFA]
                            "
                          >

                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() =>
                                handleCategoryChange(
                                  category
                                )
                              }
                              className="sr-only"
                            />

                            <span
                              className={`
                                relative
                                flex
                                h-[22px]
                                w-[22px]
                                flex-shrink-0
                                items-center
                                justify-center
                                rounded-[4px]
                                border
                                transition-all
                                duration-200
                                ${isSelected
                                  ? 'border-[#12798C] bg-[#12798C]'
                                  : 'border-[#1A1A1A] bg-white'
                                }
                              `}
                            >

                              {isSelected && (
                                <svg
                                  width="13"
                                  height="10"
                                  viewBox="0 0 13 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1 5L4.5 8.5L12 1"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}

                            </span>
                            <span
                              className={`text-[15px] transition-colors ${isSelected
                                ? 'text-[#12798C]'
                                : 'text-[#4A4A4A]'
                                }`}
                            >
                              {category}
                            </span>

                          </label>
                        );
                      })}

                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">

                <p className="mb-3 text-[15px] font-medium text-[#1A1A1A]">
                  Customer Inquiry
                </p>

                <textarea
                  name="message"
                  placeholder="Your Queries"
                  rows="5"
                  className="w-full resize-none border border-[#E5E5E5] p-4 text-[14px] focus:border-[#12798C] focus:outline-none"
                ></textarea>

              </div>

              <button
                type="submit"
                className="mt-auto w-full cursor-pointer bg-[#1A1A1A] lg:py-4 py-2 lg:text-[16px] text-[14px] font-medium text-white transition-colors hover:bg-[#12798C]"
              >
                Submit
              </button>

            </form>
          )}

          {/* ========================================
              PRODUCT INQUIRY
          ======================================== */}

          {type === 'product' && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col"
            >

              <div className="lg:mb-8 mb-6 flex gap-4 md:gap-6">

                <div className="2xl:h-[200px] md:h-[185px] h-[170px] 2xl:w-[200px] md:w-[185px] w-[170px] flex-shrink-0 bg-[#F5F5F5]">

                  <img
                    src={weddingMain}
                    alt="Product"
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="flex flex-col">

                  <h3 className="mb-3 font-bellefair text-[24px] text-[#12798C] 2xl:text-[26px]">
                    Wedding Ring 18K
                  </h3>

                  <p className="2xl:mb-7 md:mb-6 mb-3 text-[16px] font-medium text-[#1A1A1A] 2xl:text-[18px]">
                    $30.00 – $50.00
                  </p>

                  <p className="mb-1 text-[13px] text-[#1A1A1A] 2xl:text-[16px]">
                    Metal
                    <span className="ml-1 text-[14px] font-light text-[#7A7A7A]">
                      18K White Gold
                    </span>
                  </p>

                  <p className="mb-4 text-[13px] text-[#1A1A1A] 2xl:text-[16px]">
                    Product Category
                    <span className="ml-1 text-[14px] font-light text-[#7A7A7A]">
                      Ring
                    </span>
                  </p>

                  <div className="flex gap-1.5">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <img
                          key={star}
                          src={starIcon}
                          alt="star"
                          className={`h-[24px] w-[24px] ${star === 5
                            ? 'grayscale opacity-30'
                            : ''
                            }`}
                        />
                      )
                    )}

                  </div>

                </div>

              </div>

              <p className="2xl:mb-5 mb-3 text-[13px] font-light leading-[1.8] text-[#1A1A1A]">

                Lorem ipsum dolor sit amet,
                consectetur elit, sed do eiusmod
                tempor ut et dolore magna aliqua.
                Ut ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut
                ex ea consequat. Irure dolor in in
                velit esse dolore eu fugiat nulla
                pariatur.

              </p>

              <p className="2xl:mb-10 mb-8 text-[13px] font-light leading-[1.8] text-[#1A1A1A]">

                Lorem ipsum dolor sit amet,
                consectetur elit, sed do eiusmod
                tempor ut et dolore magna aliqua.

              </p>

              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="mb-4 w-full border border-[#E5E5E5] p-4 lg:text-[14px] text-[12px] focus:border-[#12798C] focus:outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="mb-4 w-full border border-[#E5E5E5] p-4 lg:text-[14px] text-[12px] focus:border-[#12798C] focus:outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="mb-8 w-full border border-[#E5E5E5] p-4 lg:text-[14px] text-[12px] focus:border-[#12798C] focus:outline-none"
              />

              <button
                type="submit"
                className="mt-auto w-full cursor-pointer bg-[#1A1A1A] lg:py-4 py-2 lg:text-[16px] text-[14px] font-medium text-white transition-colors hover:bg-[#12798C]"
              >
                Submit
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default InquiryModal;