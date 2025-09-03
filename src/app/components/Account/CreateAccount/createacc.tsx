'use client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import {useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';

// ✅ Import Supabase
import { createClient } from '@supabase/supabase-js';

// ✅ Create Supabase client (use your real values from Supabase project settings)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateAcc() {
  const router = useRouter();

  // ✅ Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Prefetch routes to speed up navigation
  useEffect(() => {
    router.prefetch('/CreatePassword');
    router.prefetch('/GetStarted');
  }, [router]);

  // ✅ Save to Supabase
  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ 
        first_Name: firstName, 
        last_Name: lastName, 
        email, 
        phone 
      }]);

    if (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user!');
    } else {
      console.log('User saved:', data);
      router.push('/CreatePassword');
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-white px-4">
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-md py-6">

        <div className="flex items-center justify-between w-full mt-2">
          <button 
          onClick={() => router.push('/GetStarted')}
          type="button" className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"><IoMdArrowRoundBack /></button>
          <div className="flex items-center h-7 w-20 row gap-1 justify-center bg-gray-200 text-gray-700 text-xs font-semibold rounded-full px-6 py-1">
            Step 1 of 3
          </div>
        </div>

        <div className="flex flex-col justify-start w-full space-y-2 mt-4">
          <h1 className="text-3xl text-[#4d4d4d] font-bold">Create your account</h1>
          <p className="text-[#808080]">Enter your details to get started</p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <input 
            type="text" 
            placeholder="First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black active:scale-95 active:shadow-sm duration-150 transition-transform cursor-text font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]" 
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black active:scale-95 active:shadow-sm duration-150 transition-transform cursor-text font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]" 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black active:scale-95 active:shadow-sm duration-150 transition-transform cursor-text font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]" 
          />

          <div className="flex w-full gap-2">
            <PhoneInput
              country={'ng'}
              enableSearch={true}
              value={phone}
              onChange={(value) => setPhone(value)}
              containerClass="flex w-full gap-2"
              buttonClass="!bg-[#f3f3f3] !h-14 !rounded-[15px] !w-10 active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-800 text-md px-2 py-3 hover:!bg-[#f3f3f3] focus:outline-none focus:ring-2 focus:ring-[#af0000] backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]"
              inputClass="!bg-[#f3f3f3] !h-14 !rounded-[15px] !w-full !text-black active:scale-95 active:shadow-sm duration-150 transition-transform cursor-text font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>

        <p className="text-xs text-center text-[#4d4d4d] mt-2">
          By clicking on continue, you agree to Skystone’s{' '} 
          <br /><span className="text-[#af0000] font-semibold">Terms & Conditions and Privacy Policy</span>
        </p>

        <div className="flex flex-col w-full gap-3 mt-2">
          <button
          onClick={handleSubmit}  // ✅ Save to Supabase
          className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md">
            Continue
          </button>
        </div>

        <p className="text-sm text-center text-[#4d4d4d] mt-2">
          Already have an account? <span
          onClick={() => router.push('/Login')}
           className="text-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform font-semibold cursor-pointer">Login</span>
        </p>

        <button
          type="button" className=" bg-[#f3f3f3] h-12 w-40 justify-center items-center flex row gap-1 rounded-full text-[#4d4d4d] font-semibold text-sm active:scale-95 active:shadow-sm duration-150 transition-transform">
          <RiCustomerServiceLine /> <span>Contact support</span>
        </button>
      </div>
    </section>
  );
}