'use client';
import React, { useState, useRef, useEffect } from 'react';
import { usePin } from '@/app/Context/PinContext';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import '@/app/globals.css';

const PIN_LENGTH = 4;

export default function VerifyPin() {
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { pin: savedPin } = usePin();
  const router = useRouter();

  useEffect(() => {
    if (isGlitching) {
      const timeout = setTimeout(() => {
        setIsGlitching(false);
        setConfirmPin(Array(PIN_LENGTH).fill(''));
        setHasTyped(false);
        inputsRef.current[0]?.focus();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isGlitching]);

  useEffect(() => {
    if (!hasTyped) inputsRef.current[0]?.focus();
  }, [hasTyped]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) return;

    const newPin = [...confirmPin];
    newPin[index] = value;
    setConfirmPin(newPin);
    if (!hasTyped) setHasTyped(true);

    if (index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    } else {
      if (newPin.join('') === savedPin) {
        setShowSuccessModal(true);
      } else {
        setIsGlitching(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newPin = [...confirmPin];
      if (newPin[index]) {
        newPin[index] = '';
      } else if (index > 0) {
        newPin[index - 1] = '';
        inputsRef.current[index - 1]?.focus();
      }
      setConfirmPin(newPin);
    } else if (e.key === 'Delete') {
      setConfirmPin(Array(PIN_LENGTH).fill(''));
      setHasTyped(false);
      inputsRef.current[0]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH);
    if (paste.length) {
      const newPin = paste.split('');
      while (newPin.length < PIN_LENGTH) newPin.push('');
      setConfirmPin(newPin);
      setHasTyped(true);
      if (newPin.join('') === savedPin) {
        setShowSuccessModal(true);
      } else {
        setIsGlitching(true);
      }
      e.preventDefault();
    }
  };

  return (
         <section className="flex flex-col w-full items-center gap-4 mt-8">
      <div className="flex flex-col gap-6 items-center relative h-screen w-full max-w-md py-6">

         <div className="flex items-center justify-between w-full mt-2">
                  <button 
                  onClick={() => router.push('/GetStarted')}
                  type="button" className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"><IoMdArrowRoundBack /></button>
        </div>
        
      <h1 className="text-2xl font-bold text-[#4d4d4d]">Repeat PIN</h1>
      <p className="text-[#808080] text-center">Kindly Re-enter 4-digit transaction PIN again</p>

      <div className="flex gap-4 mt-4">
        {confirmPin.map((digit, index) => (
          <input
            key={index}
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
              border-[1.4px] border-[#B0B0B0]
              ${!digit ? 'bg-[#EBEBEB] hover:border-[#af0000] focus:border-[#af0000]' : 'bg-white translate-y-2 shadow-lg'}
              ${isGlitching ? 'animate-shake' : ''}
            `}
          />
        ))}
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="fixed w-full flex items-end z-50 inset-0 justify-center backdrop-blur-sm bg-black/30">
          <div className="successmodal w-full max-w-lg bg-white rounded-t-[25px] flex flex-col items-center gap-10 absolute bottom-0  animate-slide-up rounded-xl shadow-2xl animate-fadeIn">
            <div className="w-16 h-1 bg-gray-300 items-center rounded-full mb-4"></div>
            <div className="h-20 w-20 rounded-full bg-white border-1 border-[#808080] flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-[#78B347] flex items-center justify-center">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            </div>

            <div className='flex flex-col gap-1'>
            <h2 className="text-lg text-center font-semibold mb-1">Welcome, Emmanuel</h2>
            <p className="text-gray-600 text-center text-sm mb-6">
              Your Skystone profile has been successfully created. You can now proceed to login.
            </p>
            </div>
           <div className="flex flex-col w-full">
          <button
            onClick={() => router.push('/Login')}
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Proceed To LogIn
          </button>
        </div>
          </div>
        </div>
      )}
    </div>
    </section>
  );
}
