'use client';
import React, { useState, useRef } from 'react'; 
import { FiBell, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdFileCopy } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { PiHandWavingFill } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";
import { SlScreenSmartphone } from "react-icons/sl";
import { FaPodcast } from "react-icons/fa";
import { LuHousePlug } from "react-icons/lu";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { TbSquarePercentage } from "react-icons/tb";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { RiUserLine } from "react-icons/ri";
import { BsFillLightningChargeFill } from 'react-icons/bs';
import "@/app/globals.css";
import Navbar from "@/app/components/ReUsable/Navbar";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [viewMore, setViewMore] = useState(false);
  const [viewAllTransactions, setViewAllTransactions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('3193631839');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickOptions = [
    { label: 'Airtime', icon: <SlScreenSmartphone 
      className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
    { label: 'Internet', icon: <FaPodcast 
      className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
    { label: 'Electricity', icon: <LuHousePlug 
      className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
    { label: 'Cable tv', icon: <PiTelevisionSimpleLight 
      className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
    { label: 'Stocks', icon: <TbSquarePercentage 
      className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
    { label: 'Taxes', icon: <BsFillLightningChargeFill 
      className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
...(viewMore ? [
      { label: 'Stocks', icon: <TbSquarePercentage 
        className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
      { label: 'Taxes', icon: <CiCirclePlus 
        className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> },
      { label: 'Taxes', icon: <CiCirclePlus 
        className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black'/> }
    ] : [])
  ];

  const quickAction = [
          { icon: <CiCirclePlus 
          className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black text-green-400'/>, 
          label: 'Fund wallet', route: '/FundWallet' }, 
          { icon: <CiLocationArrow1 
          className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black text-[#af0000]-400'/>, 
          label: 'Send money', route: '/sendMoney' }, 
          { icon: <LuClipboardList 
          className='text-2xl active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer font-black text-yellow-500'/>, 
          label: 'History', route: '/history' }
  ]

  return (
    <section className="flex justify-center bg-white">
      <div className="userDashboard flex flex-col gap-2 w-full h-screen overflow-y-auto max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between w-full mt-2">
         <div className='flex gap-1'>
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleProfileClick}>
            {profileImage ? (
              <Image src={profileImage} alt="Profile" className="h-8 w-8 text-gray-500 rounded-full object-cover active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer" />
            ) : (
              <RiUserLine className="h-8 w-8 text-gray-500 rounded-full bg-gray-300 active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer" />
            )}
            </div>
            <span className="text-xl flex row  font-semibold"><span>Hi, Emmanuel</span> <span className='justify-center items-center'><PiHandWavingFill className='justify-center items-center' /></span> </span>
            </div>
          <div className="relative cursor-pointer" onClick={() => alert('Notifications clicked!')}>
            <FiBell size={30} className="text-gray-700" />
            <div className="absolute -top-1 -right-1 h-4 w-5 bg-[#af2000] rounded-[5px] text-[10px] font-bold text-white flex items-center justify-center">9+</div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleProfileChange}
          />
        </div>

        {/* Main content */}
        <section className="w-full">
          <div className="w-full flex flex-col gap-4">

            {/* Wallet card */}
            <section className="dashboardComponent relative overflow-hidden bg-[#af0000] gap-2 w-full h-30 rounded-xl text-white flex flex-col items-center py-3">
              <div className="acountNum text-[10px] bg-white text-3xl rounded-[5px] text-red-600 inline-flex items-center gap-1 cursor-pointer" onClick={handleCopy}>
                Account number : 3193631839
                <MdFileCopy className='text-[#4d4d4d] active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer border-[#af0000]' size={16} />
              </div>
              <div className="flex gap-3 text-center items-center">
                <div className="flex-1">
                  <p className="text-xs">Wallet balance</p>
                  <div className="flex gap-5 text-center items-center">
                  <p className="text-2xl font-bold">
                    {showBalance ? '₦2,000,000.00' : '••••••••'}
                  </p>
                  <button onClick={() => setShowBalance(!showBalance)} className="text-white active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer">
                  {showBalance ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
                </div>
                </div>
             
              </div>
              {copied && (
                <span className="absolute top-2 right-1 text-[10px] text-[#af0000] bg-white font-bold px-2 rounded-full">Copied!</span>
              )}
              <div 
              className='h-[20vh] w-[20vh] rounded-full 
              absolute bg-transparent border-20 top-[-35] 
              left-[-30] z-1 border-[#f20000]'>
              </div>
              <div 
              className='h-[20vh] w-[20vh] rounded-full 
              absolute bg-transparent border-20 bottom-[-45] 
              right-[-30] z-[-0.9] border-[#f20000]'>
              </div>
            </section>

            {/* Quick actions */}
            <div className="dashboardComponent grid grid-cols-3 gap-2 bg-white rounded-xl shadow-md">
              {quickAction.map((action, i) => (
                  <div
                  key={i}
                   onClick={() => router.push(action.route)}
                  className="flex flex-col items-center justify-center text-[#4d4d4d] text-sm phover:bg-gray-[#808080] rounded-full cursor-pointer">
                  <div className="h-8 w-8 rounded-full bg-red-50 text-[#af0000] flex items-center justify-center mb-1">
                    {action.icon}
                  </div>
                  {action.label}
                  </div>
              
              ))}
                  </div>

                  {/* Quick options */}
                 <div className='flex flex-col'>
                  <div className=" dashboardComponent bg-white rounded-xl shadow-md">
                 <p className="text-xs font-bold text-gray-700">QUICK OPTIONS</p>
                  <div className="grid w-full grid-cols-3 gap-3">
                  {quickOptions.map((option, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-[#4d4d4d] text-sm cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-1">
                      {option.icon}
                    </div>
                    {option.label}
                  </div>
                  ))}
                  </div>
                  </div>

              {/* View more button */}
              <div className='flex-col flex justify-center items-center'>
              <button className="bg-[#af0000] justify-center items-center text-center text-white h-8 w-30 flex gap-1 text-sm active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer rounded-b-lg" 
              onClick={() => setViewMore(!viewMore)}>
               <span>VIEW MORE</span><IoIosArrowDroprightCircle className='text-white text-xl'/> 
              </button>
              </div>
              </div>
           
              {/* Recent transactions */}
              <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">Recent Transactions</p>
              <button 
              className="text-xs text-[#af0000] active:scale-95 active:shadow-sm duration-150 transition-transform cursor-pointer" 
              onClick={() => setViewAllTransactions(!viewAllTransactions)}>
                View all
              </button>
             </div>

              <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">↑</div>
                  <div className="flex flex-col">
                    <p className="text-xs">Top up via bank transfer</p>
                    <p className="text-[9px] text-gray-500">May 20, 2025 1:54 AM</p>
                  </div>
                </div>
                <p className="text-xs font-semibold">+ ₦106,170.50</p>
              </div>
              {viewAllTransactions && (
                <>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">↓</div>
                      <div className="flex flex-col">
                        <p className="text-xs">Electricity Bill Payment</p>
                        <p className="text-[9px] text-gray-500">May 22, 2025 10:45 AM</p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold">- ₦15,250.00</p>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">↓</div>
                      <div className="flex flex-col">
                        <p className="text-xs">Data Subscription</p>
                        <p className="text-[9px] text-gray-500">May 23, 2025 6:20 PM</p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold">- ₦3,000.00</p>
                  </div>
                </>
              )}
              </div>
            </div>
        </section>
      </div>
    <Navbar />
    </section>
  );
};