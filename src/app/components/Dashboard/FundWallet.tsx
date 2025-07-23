'use client';
import React, { useState } from 'react';
import "@/app/globals.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/ReUsable/Navbar";
import { FiCopy, FiEdit, FiTrash2 } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("bank");
  const [copySuccess, setCopySuccess] = useState(false);
  const [amount, setAmount] = useState("50000");
  const [showCardModal, setShowCardModal] = useState(false);
  const [savedCard, setSavedCard] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
   const [, setCardType] = useState('');


  // Utility functions
const formatCardNumber = (value: string) => {
  return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
};

const detectCardType = (number: string) => {
  const cleaned = number.replace(/\s+/g, '');
  if (/^4/.test(cleaned)) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'MasterCard';
  if (/^506(0|1|2|3|4|5)/.test(cleaned)) return 'Verve';
  return 'Unknown';
};


  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    }).catch((err) => {
      console.error("Failed to copy:", err);
    });
  };

  return (
    <section className="flex flex-col w-full items-center gap-4 mt-8">
      <div className="flex flex-col gap-6 items-center relative h-screen w-full max-w-md">
        <div className="flex items-center w-full">
          <button
            onClick={() => router.push('/DashboardOnboarding')}
            type="button"
            className="text-2xl text-left cursor-pointer active:scale-95 duration-150 transition-transform text-[#222]"
          >
            <IoMdArrowRoundBack />
          </button>
          <p className="text-center w-full text-2xl font-semibold">
            Fund Wallet
          </p>
        </div>

        <div className="switchButton rounded-md flex bg-gray-200 gap-2 h-14 w-full">
          {["bank", "card", "ussd"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 h-10 rounded-md duration-150 text-sm font-semibold ${
                activeTab === tab
                  ? "text-[#af0000] bg-white"
                  : "text-gray-700 bg-gray-200"
              }`}
            >
              {tab === "bank" ? "Bank transfer" : tab === "card" ? "Card" : "USSD"}
            </button>
          ))}
        </div>

        <div className="w-full">
          {/* BANK TAB */}
          {activeTab === "bank" && (
            <div className="bankComponent flex flex-col gap-4 mt-4">
              <p className="text-xl font-regular text-gray-600">
                To fund your Skystone wallet, simply transfer to the account number below. Your funds should be credited instantly.
              </p>

              <div className="bankComponent bg-gray-100 rounded-xl shadow-sm px-4 py-3 w-full">
                <div className="mb-2">
                  <span className="text-sm text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">
                    Your bank account details
                  </span>
                </div>

                <div className="bankComponent border-b border-gray-200">
                  <p className="text-sm text-gray-500">Bank account name</p>
                  <p className="text-md font-semibold text-gray-800">SkyStone bank</p>
                </div>

                <div className="bankComponent py-2 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Bank account number</p>
                    <p className="text-md font-semibold text-gray-800">0239172818</p>
                  </div>
                  <button onClick={() => handleCopy('0239172818')}>
                    <FiCopy size={20} className="cursor-pointer text-red-500" />
                  </button>
                </div>

                <div className="bankComponent py-2">
                  <p className="text-sm text-gray-500">Account holder</p>
                  <p className="text-md font-semibold text-gray-800">Sky Stone Finance</p>
                </div>
              </div>

              {copySuccess && (
                <span className="absolute top-50 right-2 text-[10px] text-[#af0000] bg-gray-100 font-bold px-2 rounded-full">
                  Copied!
                </span>
              )}
            </div>
          )}

          {/* CARD TAB */}
          {activeTab === "card" && (
            <div className="w-full flex flex-col gap-4 mt-4">
              <div className="bankComponent flex items-center border border-gray-300 rounded-md overflow-hidden px-2 py-2">
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="bankComponent flex-1 outline-none text-lg font-medium"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="text-gray-600 text-sm font-semibold px-2">NGN</span>
              </div>

              <div className="flex gap-2 justify-between">
                {[1000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val.toLocaleString())}
                    className="bankComponent cursor-pointer px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-lg border border-gray-200"
                  >
                    ₦{val.toLocaleString()}.00
                  </button>
                ))}
              </div>

              <p className="text-xl text-gray-500 mt-1">
                You can only fund your wallet with cards domiciled in Nigeria
              </p>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Cards</p>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setCardDetails({ number: "", expiry: "", cvv: "" });
                      setShowCardModal(true);
                    }}
                    className="text-sm bankComponent text-[#af0000] cursor-pointer font-bold border border-[#af0000] px-3 py-1 rounded-md"
                  >
                    + Add new card
                  </button>
                </div>

                {!savedCard ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
                    <img
                      src="/images/no-card.png"
                      alt="No Card"
                      className="w-16 h-16 mb-2"
                    />
                    <p className="text-sm">You do not have any bank cards yet</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 border rounded-md p-4 shadow-sm text-gray-800 bg-gray-50 relative">
                    <div className="absolute right-2 top-2 flex gap-2">
                      <FiEdit className="text-gray-600 cursor-pointer" size={18} onClick={() => { setEditMode(true); setCardDetails({ number: "1234 5678 9012 3456", expiry: "08/26", cvv: "123" }); setShowCardModal(true); }} />
                      <FiTrash2 className="text-red-500 cursor-pointer" size={18} onClick={() => setShowRemoveConfirm(true)} />
                    </div>
                    <p className="text-sm">Card ending in ****</p>
                    <p className="text-xs text-gray-500">Expires {cardDetails.expiry}</p>
                  </div>
                )}
              </div>

              <button
          // className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
                disabled={!savedCard}
                className={`w-full h-14 rounded-[15px] font-semibold text-md ${
                  savedCard
                    ? "bg-[#af0000] hover:bg-[#f20000] text-white cursor-pointer active:scale-95 active:shadow-sm duration-150 transition-transform"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Fund wallet
              </button>

              {showCardModal && (
                  <div className="fixed inset-0 flex justify-center items-end z-[9999] w-full backdrop-blur-sm bg-black/30">
                    <div className="successmodal w-full max-w-lg bg-white rounded-t-[25px] flex flex-col gap-10 items-center absolute bottom-0">
                    <div className="w-full max-w-md p-6">
                    <h2 className="text-center font-semibold text-gray-800 mb-4">
                        {editMode ? 'Edit card details' : 'Add a new card'}
                      </h2>
                      <p className="text-sm text-center text-gray-500 mb-4">
                        You can only fund your wallet with cards domiciled in Nigeria
                      </p>
                      </div>

                      <div className="flex flex-col w-full items-center">
                      <div className="flex flex-col gap-3">
                        <input
                          type="text"
                          placeholder="Card number"
                          className="border px-3 py-2 rounded-md"
                          value={cardDetails.number}
                          maxLength={19}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setCardDetails({ ...cardDetails, number: formatted });
                          }}
                        />
                      {cardDetails.number && (
                        <div className="flex items-center gap-2 mt-1 pl-1">
                          <span className="text-sm text-gray-500">Card type:</span>
                          <span className="font-semibold text-black flex items-center gap-1">
                            <span>{detectCardType(cardDetails.number)}</span>
                            <img
                              src={`/card-icons/${detectCardType(cardDetails.number).toLowerCase()}.png`}
                              alt={detectCardType(cardDetails.number)}
                              className="w-6 h-6"
                            />
                          </span>
                        </div>
                      )}


        <div className="flex w-full gap-1 justify-center items-center">
          <input
            type="text"
            placeholder="MM/YY"
            className="border px-3 py-2 rounded-md flex-1"
            maxLength={5}
            value={cardDetails.expiry}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length >= 3) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
              }
              setCardDetails({ ...cardDetails, expiry: value });
            }}
          />
          <input
            type="text"
            placeholder="CVV"
            className="border px-3 py-2 rounded-md flex-1"
            maxLength={4}
            value={cardDetails.cvv}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 4);
              setCardDetails({ ...cardDetails, cvv: val });
            }}
          />
          </div>
         </div>
        </div>

        <div className='flex flex-col w-full'>
        <button
          onClick={() => {
            if (cardDetails.number.length < 19 || cardDetails.expiry.length < 5 || cardDetails.cvv.length < 3) {
              alert("Please fill in valid card details.");
              return;
            }
            setCardType(detectCardType(cardDetails.number));
            setSavedCard(true);
            setShowCardModal(false);
          }}
          className="bg-[#af0000] hover:bg-[#f20000] active:scale-95 active:shadow-sm duration-150 transition-transform h-14 rounded-[15px] cursor-pointer text-white font-semibold text-md"
        >
          Save
        </button>
        </div>

    </div>
  </div>
)}


              {showRemoveConfirm && (
                <div className="fixed inset-0 flex justify-center items-end z-[9999] w-full backdrop-blur-sm bg-black/30">
                  <div className="bankComponent max-w-md bg-white rounded-lg flex flex-col gap-2 items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]">
                    <p className="text-center text-md text-gray-800 mb-4 font-semibold">
                      Are you sure you want to remove this card ?
                    </p>
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => setShowRemoveConfirm(false)}
                        className="border-2 text-[#4d4d4d] font-semibold rounded-full w-full h-12 border-gray-700 hover:border-[#af0000] hover:text-[#af0000] cursor-pointer active:scale-95 active:shadow-sm duration-150 transition-transform"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setSavedCard(false);
                          setShowRemoveConfirm(false);
                        }}
                        className="bg-[#af0000] hover:bg-[#f20000] font-semibold w-full h-12 rounded-full text-white cursor-pointer active:scale-95 active:shadow-sm duration-150 transition-transform"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* USSD TAB */}
          {activeTab === "ussd" && (
            <div className="text-gray-600 mt-4">
              <p className="text-center">You want to use USSD.... </p>
              <div className="bankComponent py-2 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Bank account number</p>
                  <p className="text-md font-semibold text-gray-800">*911*Active#</p>
                </div>
                <button onClick={() => handleCopy('*911*Active#')}>
                  <FiCopy size={20} className="cursor-pointer text-red-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </section>
  );
}