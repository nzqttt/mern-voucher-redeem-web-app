import React from "react";

const CartCard = ({ item, onIncrease, onDecrease, onRemove, onOpenModal }) => {
    const voucher = item.voucher || {}; // ✅ This is populated by Feathers hook
    const name = voucher.title || "Untitled Voucher";
    const image = voucher.image || "/default-image.jpg";
  
    return (
      <div className="grid grid-cols-4 h-full bg-white gap-4 border-b pb-4 w-full">
        <div className="h-[80px] w-[80px]">
          <img
            onClick={onOpenModal}
            src={image}
            alt={voucher.title}
            className="h-full w-full cursor-pointer object-contain"
          />
        </div>
  
        <div className="overflow-hidden">
          <h2 onClick={onOpenModal} className="cursor-pointer text-[16px] text-slate-600">
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </h2>
          <p className="text-xs text-gray-500">{voucher.description?.slice(0, 60)}...</p>
        </div>
  
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={onDecrease}
            className="bg-white h-[30px] w-[30px] flex items-center justify-center rounded-full border text-center shadow"
          >
            <HiMinus size={12} />
          </button>
          <span className="font-semibold">{item.quantity}</span>
          <button
            onClick={onIncrease}
            className="bg-white h-[30px] w-[30px] flex items-center justify-center rounded-full border text-center shadow"
          >
            <HiPlus size={12} />
          </button>
        </div>
  
        <div className="flex flex-col text-right max-w-[120px] justify-between">
          <h2 className="text-center font-semibold text-slate-600">
            {voucher.points * item.quantity} pts
          </h2>
          <button onClick={onRemove} className="text-red-500 text-sm hover:underline">
            Remove
          </button>
        </div>
      </div>
    );
  };
  

export default CartCard;
