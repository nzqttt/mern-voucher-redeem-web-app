import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#fcf8f8] px-8 md:px-32 py-12 font-[Inter]">
      <h1 className="text-3xl font-bold text-[#1c0d0d] mb-8 text-center">
        How It Works
      </h1>

      <div className="grid gap-10 md:grid-cols-3">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#f4e7e7] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9c4949" viewBox="0 0 24 24">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 2.11.654 4.068 1.766 5.668L2 22l4.332-1.766A9.96 9.96 0 0 0 12 22Z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#1c0d0d] mb-2">
            1. Earn Points
          </h2>
          <p className="text-sm text-[#7e2d2d]">
            Get points by completing activities, making purchases, or through special promotions.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#f4e7e7] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9c4949" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#1c0d0d] mb-2">
            2. Browse Vouchers
          </h2>
          <p className="text-sm text-[#7e2d2d]">
            Explore a wide range of rewards — from gift cards to exclusive deals — directly in our Rewards Hub.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#f4e7e7] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#9c4949" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#1c0d0d] mb-2">
            3. Redeem & Enjoy
          </h2>
          <p className="text-sm text-[#7e2d2d]">
            Redeem your points for vouchers instantly and enjoy your reward. It’s quick and simple!
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[#1c0d0d] text-lg">
          Ready to start earning and redeeming?{" "}
          <span className="font-bold text-[#9c4949]">Browse vouchers now!</span>
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
