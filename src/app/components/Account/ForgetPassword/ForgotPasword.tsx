'use client';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import {useRouter} from 'next/navigation';
import { useEffect } from 'react';

export default function CreateAcc() {
  const router = useRouter();

  // Prefetch routes to speed up navigation
  useEffect(() => {
    router.prefetch('/CreatePassword');
    router.prefetch('/Login');
  }, [router]);

  return (
        <section className="flex justify-center items-start bg-white">
      <div className="flex flex-col gap-6 items-center relative h-screen w-full max-w-md py-6">
        <div className="flex items-center justify-between w-full mt-2">
          <button 
          onClick={() => router.push('/Login')}
          type="button" className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"><IoMdArrowRoundBack /></button>
          <div className="flex items-center h-7 w-20 row gap-1 justify-center bg-gray-200 text-gray-700 text-xs font-semibold rounded-full px-6 py-1">
            Step 1 of 3
          </div>
        </div>

        <div className="flex flex-col justify-start w-full space-y-2 mt-4">
          <h1 className="text-3xl text-[#4d4d4d] font-bold">Forgot Password</h1>
          <p className="text-xl text-[#808080]">Reset your password by providing email below</p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <input type="email" placeholder="Email Address" className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black active:scale-95 active:shadow-sm duration-150 transition-transform cursor-text font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]" />
        </div>

         <div className="flex flex-col w-full absolute bottom-25">
          <button
            onClick={() => router.push('/OtpForgot')}
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Continue
          </button>
        </div>

        {/* Added: Contact support */}
        <button
          type="button" className=" bg-[#f3f3f3] h-12 w-40 absolute bottom-10 justify-center items-center flex row gap-1 rounded-full text-[#4d4d4d] font-semibold text-sm active:scale-95 active:shadow-sm duration-150 transition-transform">
          <RiCustomerServiceLine /> <span>Contact support</span>
        </button>

      </div>
    </section>
  );
}