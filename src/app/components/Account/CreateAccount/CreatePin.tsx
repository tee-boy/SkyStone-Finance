'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePin } from '@/app/Context/PinContext'; // import context

const PIN_LENGTH = 4;

export default function SetTransactionPin() {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [isGlitching, setIsGlitching] = useState(false);
  const [isError] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { setPin: setStoredPin } = usePin(); // get setter from context

  useEffect(() => {
    if (isGlitching) {
      const timeout = setTimeout(() => {
        setIsGlitching(false);
        setPin(Array(PIN_LENGTH).fill(''));
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

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (!hasTyped) setHasTyped(true);

    if (index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    } else {
      // PIN fully entered
      setStoredPin(newPin.join('')); // store in context
      router.push('/VerifyPin'); // navigate to confirm page
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newPin = [...pin];
      if (newPin[index]) {
        newPin[index] = '';
      } else if (index > 0) {
        newPin[index - 1] = '';
        inputsRef.current[index - 1]?.focus();
      }
      setPin(newPin);
    } else if (e.key === 'Delete') {
      setPin(Array(PIN_LENGTH).fill(''));
      setHasTyped(false);
      inputsRef.current[0]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH);
    if (paste.length) {
      const newPin = paste.split('');
      while (newPin.length < PIN_LENGTH) newPin.push('');
      setPin(newPin);
      setHasTyped(true);
      const nextIndex = newPin.findIndex((v) => v === '');
      if (nextIndex === -1) {
        setStoredPin(newPin.join(''));
        router.push('/ConfirmTransactionPin');
      } else {
        inputsRef.current[nextIndex]?.focus();
      }
      e.preventDefault();
    }
  };

  return (
    <section className="flex flex-col w-full items-center gap-4 mt-8">
      <div className="flex flex-col gap-6 items-center relative h-screen w-full max-w-md py-6">

         <div className="flex items-center justify-between w-full mt-2">
          <button 
          onClick={() => router.push('/CreatePassword')}
          type="button" className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"><IoMdArrowRoundBack /></button>
          </div>

      <h1 className="text-2xl font-bold text-[#4d4d4d]">Almost there!</h1>
      <p className="text-[#808080] text-center">Secure your account with a 4-digit transaction PIN</p>
      <div className="flex gap-4 mt-4">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="password"
            inputMode="numeric"
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
        ))}
      </div>
      </div>
    </section>
  );
}
