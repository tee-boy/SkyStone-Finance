'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation"

export default function GetStarted() {
  const slides = [
    {
      image: '/slide1.png',
      title: 'Smarter Wallet,\nDaily Rewards',
      description:
        'Enjoy daily interest on your wallet balance, with instant deposits, transfers, and withdrawals — all in one secure place.',
    },
    {
      image: '/slide2.png',
      title: 'Invest, Track & Grow\nwith Ease',
      description:
        'Explore curated investment packages, gift investments to loved ones, and manage your finances with Kiki — your smart AI assistant.',
    },
    {
      image: '/slide3.png',
      title: 'Save, Pay Bills, Get Loans,\nStay Secure',
      description:
        'Enjoy daily interest on your wallet balance, with instant deposits, transfers, and withdrawals — all in one place.',
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const router = useRouter();

  return (
    <section className="flex justify-center items-ceter h-screen bg-white">
      <div className="flex flex-col gap-2 items-center justify-center w-full max-w-md py-6 space-y-6">
        
        {/* Logo */}
        <Image src="/SkystoneLogo.png" alt="Skystone Logo" width={150} height={150} className="m-4" />

        {/* Slide Image */}
        <div className="w-full h-[300px] rounded-2xl overflow-hidden space-y-4">
          <Image
            src={slides[current].image}
            alt="slide image"
            width={300}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Slide Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-[#4d4d4d] text-2xl font-bold whitespace-pre-line">
            {slides[current].title}
          </h2>
          <p className="text-[#808080] text-base">
            {slides[current].description}
          </p>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 w-2 rounded-full ${idx === current ? 'bg-[#af0000]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={() => router.push('/CreateAccount')} 
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform
                        h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/Login')} 
            className="border border-[#4d4d4d] h-14 rounded-[15px]
             active:scale-95 active:shadow-sm duration-150 transition-transform
            text-[#4d4d4d] cursor-pointer hover-shadow-md font-semibold text-md"
          >
            Existing user? Login
          </button>

        </div>

      </div>
    </section>
  );
}
