'use client';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

export default function CreatePassword() {
  const router = useRouter();

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
            onClick={() => router.push('/CreateAccount')}
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
          {/* Password input */}
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

          {/* Rules */}
          {password && (
            <div className="flex justify-between text-xl w-full mt-1">
              <div className={`flex items-center gap-1 text-xs ${hasMinLength ? 'text-[#af0000]' : 'text-[#af2000] text-xl'}`}>
                <FaCheckCircle size={16} /> 8 chars
              </div>
              <div className={`flex items-center gap-1 text-xs ${hasLowerCase ? 'text-[#af0000]' : 'text-[#af2000] text-xl'}`}>
                <FaCheckCircle size={16} /> lower
              </div>
              <div className={`flex items-center gap-1 text-xs ${hasUpperCase ? 'text-[#af0000]' : 'text-[#af2000] text-xl'}`}>
                <FaCheckCircle size={16} /> upper
              </div>
              <div className={`flex items-center gap-1 text-xs ${hasSpecialChar ? 'text-[#af0000]' : 'text-[#af2000] text-xl'}`}>
                <FaCheckCircle size={16} /> symbol
              </div>
            </div>
          )}

          {/*this is the strength meter */}
          {password && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-1 flex-1">
                <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${strengthCount >= 1 ? 'bg-[#af2000]' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${strengthCount >= 2 ? 'bg-[#af0000]' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-full transition-all duration-300 ${strengthCount >= 3 ? 'bg-[#af0009]' : 'bg-gray-200'}`}></div>
              </div>
              <span className="text-xs text-[#4d4d4d]">{strengthLabel}</span>
            </div>
          )}

          {/* This Will Confirm password and Check if Password match */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="bg-[#f3f3f3] h-14 rounded-[15px] w-full text-black font-800 text-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]"
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
              {passwordsMatch ? <FaCheckCircle size={14} /> : <XCircle size={14} />} {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full absolute bottom-10">
          <button
            onClick={() => router.push('/Otp')}
            className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
