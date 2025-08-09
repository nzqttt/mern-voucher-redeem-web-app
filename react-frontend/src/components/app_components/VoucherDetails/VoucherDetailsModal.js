import React from "react";
import "./VoucherDetailsModal.css";

const VoucherDetailsModal = ({ voucher, onClose, onRedeem, onAddToCart, isInCart }) => {
  return (
    <div className="voucher-modal-overlay" onClick={onClose}>
      <div className="voucher-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <img
          src={voucher.image}
          alt={voucher.title}
          className="voucher-modal-image"
        />
        <h2 className="voucher-modal-title">{voucher.title}</h2>
        <p className="voucher-modal-description">{voucher.description}</p>
        <p className="voucher-modal-points"><strong>Points:</strong> {voucher.points}</p>
        <p className="voucher-modal-expiry"><strong>Expiry:</strong> {voucher.expiryDate}</p>
        <p className="voucher-modal-terms"><strong>Terms:</strong> {voucher.termsCondition}</p>

       <div className="voucher-modal-actions">
  <button 
    className="redeem-btn" 
    onClick={(e) => { 
      e.stopPropagation(); 
      onRedeem(e, voucher);
    }}
  >
    Redeem
  </button>
  <button 
    className="cart-btn" 
    disabled={isInCart} 
    onClick={(e) => { 
      e.stopPropagation(); 
      if (!isInCart) onAddToCart(e, voucher);
    }}
  >
    {isInCart ? "Added to Cart" : "Add to Cart"}
  </button>
</div>

      </div>
    </div>
  );
};

export default VoucherDetailsModal;
