'use client';
import React, { useState } from 'react';
import { HiOutlineHome, HiOutlineChartPie } from 'react-icons/hi';
import { BsPiggyBank } from "react-icons/bs";
import { RiUserLine } from "react-icons/ri";

export default function DashboardNav() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: <HiOutlineHome size={22} className='active:scale-95 duration-150 transition-transform'/>, label: 'Home' },
    { icon: <HiOutlineChartPie size={22} className='active:scale-95 duration-150 transition-transform'/>, label: 'Investments' },
    { icon: <BsPiggyBank size={22} className='active:scale-95 duration-150 transition-transform'/>, label: 'Savings' },
    { icon: <RiUserLine size={22} className='active:scale-95 duration-150 transition-transform'/>, label: 'Profile' },
  ];

  return (
    <nav className="w-full fixed bottom-0 bg-white border-t max-w-md border-gray-300 z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className="flex flex-col items-center justify-center w-1/4 cursor-pointer z-10 transition-all duration-200"
          >
            <div
              className={`p-2 rounded-full transition-all duration-200 ${
                activeTab === index ? 'text-[#af0000] bg-white' : 'text-gray-500'
              }`}
            >
              {tab.icon}
            </div>
            <span
              className={`text-xs mt-1 ${
                activeTab === index ? 'text-[#af0000] font-semibold' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}