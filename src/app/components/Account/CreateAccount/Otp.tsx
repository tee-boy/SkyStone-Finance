'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const OTP_LENGTH = 6;
const TIMER_SECONDS = 30;

export default function Otp() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [showResend, setShowResend] = useState(false);
  const [isGlitching] = useState(false);
  const [isError] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    for (let i = 0; i < paste.length; i++) {
      if (/^[0-9]$/.test(paste[i])) {
        newOtp[i] = paste[i];
      }
    }
    setOtp(newOtp);
    inputsRef.current[Math.min(paste.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleResend = useCallback(() => {
    toast.success('OTP resent successfully');
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(TIMER_SECONDS);
    setShowResend(false);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setShowResend(true);
    }
  }, [timer, handleResend]);

  const verifyOtp = async (code: string) => {
  const toastId = toast.loading('Verifying OTP...');
  setTimeout(() => {
    toast.success(`OTP ${code} verified successfully`, { id: toastId });
    router.push('/CreatePin');
  }, 1500);
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== OTP_LENGTH) {
      toast.error('Please enter a 6-digit OTP.');
      return;
    }
    await verifyOtp(fullOtp);
  };

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');

  return (
    <section className="flex justify-center items-start h-screen bg-white px-4">
      <div className="flex flex-col gap-8 items-center relative w-full h-screen max-w-md py-6">

        <div className="flex items-center justify-between w-full mt-2">
          <button
            onClick={() => router.push('/CreatePassword')}
            type="button"
            className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"
          >
            <IoMdArrowRoundBack />
          </button>
          <div className="flex items-center h-7 w-20 gap-1 justify-center bg-gray-200 text-gray-700 text-xs font-semibold rounded-full px-6 py-1">
            Step 2 of 3
          </div>
        </div>

        <div className="flex flex-col w-full space-y-2 mt-4">
          <h1 className="text-3xl text-[#4d4d4d] font-bold">Verify your email address</h1>
          <p className="text-[#808080]">Kindly enter the 6 digit code sent to <br /> your email</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full justify-center">
          <div className="flex gap-4 md:gap-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                ref={(el) => { inputsRef.current[index] = el; }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isGlitching}
                className={`w-[54px] h-[72px] text-center text-[#4d4d4d] text-2xl font-medium rounded-[20px]
                  border-[1.4px] ${isError ? 'border-[#f3f3f3] bg-[#f3f3f3]' : 'border-[#B0B0B0]'}
                  ${!digit && !isError
                    ? 'bg-[#EBEBEB] hover:border-[#af0000] focus:border-[#af0000]'
                    : !isError
                      ? 'bg-white translate-y-2 shadow-lg'
                      : ''}
                  ${isGlitching ? 'animate-shake' : ''}
                `}
              />
            ))}
          </div>

          {isError && (
            <p className="text-[#FF1F1F] font-medium text-base mb-2 text-center">
              This code is either expired or invalid. <br /> Request a new one.
            </p>
          )}

          {!showResend ? (
            <div className="flex flex-col items-center gap-1 mt-2">
              <p className="text-md text-[#4d4d4d]">Didn&apos;t receive any OTP?</p>
              <p className="text-[#af0000] text-md font-bold">Resend code in {minutes}:{seconds}</p>
            </div>
          ) : (
            <button
                onClick={handleResend}
                type="button"
                className="mt-2 text-[#af0000] font-semibold text-md active:scale-95 active:shadow-sm duration-150 transition-transform"
              >
                Resend Code
            </button>

          )}

          <div className="flex flex-col w-full mt-6">
            <button
              type="submit"
              className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}