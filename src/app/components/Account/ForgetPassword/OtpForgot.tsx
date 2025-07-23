'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const OTP_LENGTH = 6;
const TIMER_SECONDS = 30;

export default function Otp() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [showResend, setShowResend] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  useEffect(() => {
    if (isGlitching) {
      const timeout = setTimeout(() => {
        setIsGlitching(false);
        setOtp(Array(OTP_LENGTH).fill(''));
        setHasTyped(false);
        inputsRef.current[0]?.focus();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isGlitching]);

  useEffect(() => {
    if (!hasTyped) inputsRef.current[0]?.focus();
  }, [hasTyped]);

  const verifyOtp = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      toast.error('❌ Please enter the complete OTP code.');
      return;
    }

    const toastId = toast.loading('🔄 Verifying your OTP...');
    try {
      // Replace with actual verification
      if (code === '123456') {  // replace with real check
        toast.success('✅ OTP verified successfully!', { id: toastId });
        router.push('/ReCreatePassword');
      } else {
        throw new Error('Invalid OTP'); 
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      setIsError(true);
      setIsGlitching(true);
      toast.error('❌ Invalid or expired OTP. Please try again.', { id: toastId });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (!hasTyped) setHasTyped(true);

    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = '';
      } else if (index > 0) {
        newOtp[index - 1] = '';
        inputsRef.current[index - 1]?.focus();
      }
      setOtp(newOtp);
    } else if (e.key === 'Delete') {
      setOtp(Array(OTP_LENGTH).fill(''));
      setHasTyped(false);
      inputsRef.current[0]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (paste.length) {
      const newOtp = paste.split('');
      while (newOtp.length < OTP_LENGTH) newOtp.push('');
      setOtp(newOtp);
      setHasTyped(true);
      const nextIndex = newOtp.findIndex((v) => v === '');
      if (nextIndex === -1) {
        inputsRef.current[OTP_LENGTH - 1]?.focus();
      } else {
        inputsRef.current[nextIndex]?.focus();
      }
      e.preventDefault();
    }
  };

  const handleResend = async () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(TIMER_SECONDS);
    setShowResend(false);
    setIsError(false);
    setHasTyped(false);
    inputsRef.current[0]?.focus();
    toast.success('📩 A new OTP has been sent to your email.');
  };

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');

  return (
    <section className="flex justify-center items-start h-screen bg-white px-4">
      <div className="flex flex-col gap-8 items-center relative w-full h-screen max-w-md py-6">

        <div className="flex items-center justify-between w-full mt-2">
          <button
            onClick={() => router.push('/ForgotPassword')}
            type="button"
            className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"
          >
            <IoMdArrowRoundBack />
          </button>
          <div className="flex items-center h-7 w-20 row gap-1 justify-center bg-gray-200 text-gray-700 text-xs font-semibold rounded-full px-6 py-1">
            Step 2 of 3
          </div>
        </div>

        <div className="flex flex-col w-full space-y-2 mt-4">
          <h1 className="text-3xl text-[#4d4d4d] font-bold">Verify your email address</h1>
          <p className="text-[#808080]">Kindly enter the 6 digit code sent to <br /> your email</p>
        </div>

        <div className="flex flex-col items-center w-full justify-center">
          <div className="flex gap-4 md:gap-5">
            {otp.map((digit, index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  ref={(el) => { inputsRef.current[index] = el; }}
                  onChange={(e) => handleChange(e, index)}
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
              </React.Fragment>
            ))}
          </div>

          {isError && (
            <p className="text-[#FF1F1F] font-medium text-base mb-2 text-center">
              This code is either expired or invalid. <br /> Request a new one.
            </p>
          )}

          {!showResend ? (
            <div className="flex flex-col items-center gap-1 mt-2">
              <p className="text-md text-[#4d4d4d]">Didn't receive any OTP?</p>
              <p className="text-[#af0000] text-md font-bold">Resend code in {minutes}:{seconds}</p>
            </div>
          ) : (
            <button
              onClick={handleResend}
              className="mt-2 text-[#af0000] font-semibold text-md active:scale-95 active:shadow-sm duration-150 transition-transform"
            >
              Resend Code
            </button>
          )}
        </div>

        <div className="flex flex-col w-full absolute bottom-10">
          <button
            onClick={verifyOtp}
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}