'use client';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import '@/app/globals.css';

export default function CreatePassword() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password && password === confirmPassword;

  const strengthCount = [hasMinLength, hasLowerCase, hasUpperCase, hasSpecialChar].filter(Boolean).length;
  const strengthLabel = strengthCount <= 2 ? "Weak" : strengthCount === 3 ? "Good" : "Very Strong";

  return (
    <section className="flex justify-center items-start bg-white">
      <div className="flex flex-col gap-6 items-center relative h-screen w-full max-w-md py-6">
        <div className="flex items-center justify-between w-full mt-2">
          <button
            onClick={() => router.push('/OtpForget')}
            type="button"
            className="text-2xl cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"
          >
            <IoMdArrowRoundBack />
          </button>
          <div className="flex items-center h-7 w-20 gap-1 justify-center bg-gray-200 text-gray-700 text-xs font-semibold rounded-full px-6 py-1">
            Step 3 of 3
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-start w-full mt-4">
          <h1 className="text-3xl text-[#4d4d4d] font-bold">Create password</h1>
          <p className="text-[#808080] text-sm">
            Make sure you use at least 8 characters, one lowercase, one uppercase and a special symbol
          </p>
        </div>

        <div className="flex flex-col w-full gap-3">
          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Rules */}
          {password && (
            <div className="flex justify-between text-xl w-full mt-1">
              <div className={`flex items-center gap-1 text-xs ${hasMinLength ? 'text-[#af0000]' : 'text-gray-400'}`}>
                <FaCheckCircle size={16} /> 8 chars
              </div>
              <div className={`flex items-center gap-1 text-xs ${hasLowerCase ? 'text-[#af0000]' : 'text-gray-400'}`}>
                <FaCheckCircle size={16} /> lower
              </div>
              <div className={`flex items-center gap-1 text-xs ${hasUpperCase ? 'text-[#af0000]' : 'text-gray-400'}`}>
                <FaCheckCircle size={16} /> upper
              </div>
              <div className={`flex items-center gap-1 text-xs ${hasSpecialChar ? 'text-[#af0000]' : 'text-gray-400'}`}>
                <FaCheckCircle size={16} /> symbol
              </div>
            </div>
          )}

          {/* Strength */}
          {password && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-1 flex-1">
                <div className={`flex-1 h-2 rounded-full ${strengthCount >= 1 ? 'bg-[#af2000]' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-full ${strengthCount >= 2 ? 'bg-[#af0000]' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-full ${strengthCount >= 3 ? 'bg-[#af0009]' : 'bg-gray-200'}`}></div>
              </div>
              <span className="text-xs text-[#4d4d4d]">{strengthLabel}</span>
            </div>
          )}

          {/* Confirm password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {confirmPassword && (
            <div className={`flex items-center gap-2 text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
              {passwordsMatch ? <FaCheckCircle size={14} /> : <XCircle size={14} />}
              {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
            </div>
          )}
        </div>

        {/* Bottom Continue button */}
        <div className="flex flex-col w-full absolute bottom-10">
          <button
            onClick={() => {
              if (hasMinLength && hasLowerCase && hasUpperCase && hasSpecialChar && passwordsMatch) {
                setShowSuccessModal(true);
              } else {
                alert('Please ensure your password meets all requirements and passwords match.');
              }
            }}
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Continue
          </button>
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
            onClick={() => router.push('/DashboardOnboarding')}
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Proceed To Login
          </button>
        </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}