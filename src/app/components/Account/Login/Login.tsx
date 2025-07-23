'use client';
import { Eye, EyeOff } from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCustomerServiceLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CreateAcc() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/DashboardOnboarding');
    router.prefetch('/GetStarted');
  }, [router]);

  const [showPassword, setShowPassword] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');


  const allFilled = contact && password;

  return (
    <section className="flex justify-center items-center h-screen bg-white px-4">
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-md py-6">

        <div className="flex items-center justify-between w-full mt-2">
          <button 
            onClick={() => router.push('/GetStarted')}
            type="button" 
            className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"
          >
            <IoMdArrowRoundBack />
          </button>
        </div>

        <div className="flex flex-col justify-start w-full space-y-2 mt-4">
          <h1 className="text-3xl text-[#4d4d4d] font-bold">Welcome back, Emmanuel</h1>
          <p className="text-[#808080]">Enter your details below to continue</p>
        </div>

        <div className="switchButton rounded-md flex bg-gray-200 gap-2 h-14 w-full">
          <button
            onClick={() => setUsePhone(false)}
            className={`flex-1 py-2 h-10 rounded-md active:scale-95 active:shadow-sm duration-150 text-sm font-semibold ${!usePhone ? 'text-[#af0000] bg-white focus:outline-none' : 'bg-gray-200 text-gray-700'}`}
          >
            Email
          </button>
          <button
            onClick={() => setUsePhone(true)}
            className={`flex-1 py-2 h-10 rounded-md active:scale-95 active:shadow-sm duration-150 text-sm font-semibold ${usePhone ? 'text-[#af0000] bg-white focus:outline-none' : 'bg-gray-200 text-gray-700'}`}
          >
            Phone number
          </button>
          {/* use BulSmsLive  */}
        </div>

        <div className="flex flex-col w-full gap-2">
          <input
            type={usePhone ? "tel" : "email"}
            placeholder={usePhone ? "Phone Number" : "Email Address"}
            value={contact}
            onChange={(e) => {
            const value = e.target.value;
            setContact(value);

            // Validation logic
            if (!value) {
              setEmailError("Email is required");
            } else if (!/^[^\d][a-zA-Z._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(value)) {
              setEmailError("Enter a valid email without numbers");
            } else {
              setEmailError('');
            }
          }}

            className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]"
          />
          {!usePhone && emailError && (
              <p className="text-[#af0000] text-sm px-2">{emailError}</p>
           )}


          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full gap-3 mt-2">
          <button
            onClick={() => {
               if (!usePhone && emailError) return;
               router.push('/DashboardOnboarding');
            }}
            disabled={!allFilled || (!usePhone && !!emailError)}
            className={`h-14 rounded-[15px] cursor-pointer font-semibold text-md active:scale-95 active:shadow-sm duration-150 transition-transform 
              ${allFilled ? 'bg-[#af0000] text-white hover:bg-[#f20000]' : 'bg-[#f3f3f3] text-[#4d4d4d]'}`}
          >
            Log in
          </button>
        </div>

        <button
          onClick={() => router.push('/DashboardOnboarding')}
        className="text-xs font-bold text-right w-full text-[#af0000] cursor-pointer">I forgot my password</button>

        <p className="text-sm text-center text-[#4d4d4d] mt-2">
          Not Emmanuel? <span className="text-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform font-semibold cursor-pointer">Switch account</span>
        </p>

        <button
          type="button"
          className="bg-[#f3f3f3] h-12 w-40 justify-center items-center flex row gap-1 rounded-full text-[#4d4d4d] font-semibold text-sm active:scale-95 active:shadow-sm duration-150 transition-transform"
        >
          <RiCustomerServiceLine /> <span>Contact support</span>
        </button>
      </div>
    </section>
  );
}
