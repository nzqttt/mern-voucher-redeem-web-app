import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import client from "../../../services/restClient";
import "./CartPage.css";

const CartPage = (props) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [redemptionDetails, setRedemptionDetails] = useState(null);
  const [processingCheckout, setProcessingCheckout] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!props.user || !props.isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await client.service("cartItems").find({
          query: {
            userId: props.user._id,
            $populate: [{ path: "voucherId", service: "vouchers" }]
          }
        });
        
        
        
setCartItems(response.data);

if (response.data && response.data.length > 0) {
  setCartItems(response.data);
} else {
  setCartItems([]); // <-- No sample data, empty cart
}

      } catch (error) {
        console.error("Error fetching cart items:", error);
        // Use sample data if API fails
        const sampleCartItems = [
          {
            _id: "1",
            quantity: 2,
            points: 200,
            status: "pending",
            voucherId: {
              _id: "voucher1",
              title: "20% off at The Coffee Corner",
              description:
                "Enjoy a 20% discount on your next purchase at The Coffee Corner.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB8RqpUjhluY009ElfJKhr2UTPnErQE4L44PGfScCO136SyukVjQkte8uZzjAhebUweniCYngD46vcgEzyYe_2O9ihONN3R9fQWbzdsTyBF1MWMvLjrYxO9imBkct4TK0zCCP0aZTdXtFhuH0jaXPyRerPYdFqiB5NpE8m7W4ldgYOSc_LoQkzyEzhhMEVeHyR1nTUwcxQeCb1vkv-kUKEoVFkuwW_9afK_gtdwTNdSGQ3w0rVE5K7Shg0ZhMsuwQ8em520tvSNowu5",
              points: 200,
              categoryId: { name: "Food & Drink" },
            },
          },
          {
            _id: "2",
            quantity: 1,
            points: 500,
            status: "pending",
            voucherId: {
              _id: "voucher2",
              title: "Tech Gadgets Bundle",
              description: "Get amazing deals on the latest tech gadgets.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD7HydIHKYGbdGKSpqeSHgdiiMWaFegl2VNDQo3yunHJqdyDmftNEwnHZHa9DGSaEykig7EJQWgn8y4M9HTGJPtN5QN7wt87OhBkAUOa-4h9V_livDcrqQEwlH-KGbXwjE9MRilaCtG8lHRrA8NLsXnqiSYvn5I0ri-A0Zz3arnrGWedx5ZOk_8US1wqPfmCQkJrGVzTWlBHG7gXhjCmQMMIW86UqQ4m9Yf83lI6aaXyT_avr4rCdlYOjE1fhLPiz_nfjCK3ley1MR0",
              points: 500,
              categoryId: { name: "Electronics" },
            },
          },
        ];
        setCartItems(sampleCartItems);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [props.user, props.isLoggedIn]);

 const handleQuantityChange = async (itemId, newQuantity) => {
  if (newQuantity < 1) return;
  try {
    setUpdatingItem(itemId);
    const currentItem = cartItems.find((i) => i._id === itemId);

    const updatedPoints = currentItem.voucherId.points * newQuantity;

    await client.service("cartItems").patch(itemId, { 
      quantity: newQuantity,
      points: updatedPoints,
      updatedBy: props.user._id
    });

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? { ...item, quantity: newQuantity, points: updatedPoints }
          : item
      )
    );
  } catch (error) {
    console.error("Error updating quantity:", error);
    props.alert({ type: "error", title: "Error", message: "Failed to update quantity" });
  } finally {
    setUpdatingItem(null);
  }
};


  const handleRemoveItem = async (itemId) => {
    try {
      await client.service("cartItems").remove(itemId);

      // Update local state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId),
      );

      props.alert({
        type: "success",
        title: "Removed",
        text: "Item removed from cart successfully!",
      });
    } catch (error) {
      console.error("Error removing item:", error);
      props.alert({
        type: "error",
        title: "Error",
        text: "Failed to remove item. Please try again.",
      });
    }
  };

 const handleCheckout = async () => {
  if (cartItems.length === 0) return;

  try {
    setProcessingCheckout(true);
    const confirmationNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

    const redemptionPromises = cartItems.map((item) =>
      client.service("cartItemHistory").create({
        userId: props.user._id,
        voucherId: item.voucherId._id,
        quantity: item.quantity,
        points: item.points,
        status: "redeemed",
        confirmationNumber,
        redeemedAt: new Date().toISOString()
      })
    );

    await Promise.all(redemptionPromises);

    // Clear all cart items for user
    const deletePromises = cartItems.map((item) => client.service("cartItems").remove(item._id));
    await Promise.all(deletePromises);

    setCartItems([]);
    setRedemptionDetails({
      confirmationNumber,
      totalPoints,
      redeemedItems: cartItems,
      redeemedAt: new Date().toLocaleString(),
    });
    setShowRedemptionModal(true);
  } catch (error) {
    console.error(error);
    props.alert({ type: "error", title: "Checkout Failed", message: "Failed to redeem" });
  } finally {
    setProcessingCheckout(false);
  }
};

  const handleDismissModal = () => {
    setShowRedemptionModal(false);
    setRedemptionDetails(null);
    navigate("/home");
  };

  const handleContinueShopping = () => {
    navigate("/home");
  };

  const totalPoints = cartItems.reduce(
    (sum, item) => sum + ((item.voucherId?.points || 0) * (item.quantity || 0)),
    0
  );
  
  
const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!props.user || !props.isLoggedIn) {
    return (
      <div className="cart-page-container">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to view your cart.</p>
          <Link to="/login" className="login-link">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-page-container">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      {/* Redemption Success Modal */}
      {showRedemptionModal && redemptionDetails && (
        <div className="redemption-modal-overlay">
          <div className="redemption-modal">
            <div className="modal-content">
              <h1 className="modal-title">Redemption Successful</h1>
              <p className="modal-description">
                You have successfully redeemed your voucher. Here are the
                details of your redemption.
              </p>

              <div className="modal-details">
                <div className="detail-row">
                  <p className="detail-label">Voucher Name</p>
                  <p className="detail-value">
                    {redemptionDetails.redeemedItems.length === 1
                      ? redemptionDetails.redeemedItems[0].voucherName
                      : `${redemptionDetails.redeemedItems.length} Vouchers`}
                  </p>
                </div>
                <div className="detail-row">
                  <p className="detail-label">Points Deducted</p>
                  <p className="detail-value">
                    {redemptionDetails.totalPoints.toLocaleString()} Points
                  </p>
                </div>
                <div className="detail-row">
                  <p className="detail-label">Confirmation Number</p>
                  <p className="detail-value">
                    {redemptionDetails.confirmationNumber}
                  </p>
                </div>
                <div className="detail-row">
                  <p className="detail-label">Redemption Date</p>
                  <p className="detail-value">{redemptionDetails.redeemedAt}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button className="dismiss-button" onClick={handleDismissModal}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-subtitle">
          {cartItems.length > 0
            ? `You have ${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`
            : "Your cart is empty"}
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any vouchers to your cart yet.</p>
          <button
            className="continue-shopping-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items">
          {cartItems.map((item) => {
const voucher = item.voucher || {};

  return (
    <div key={item._id} className="cart-item">
      <div className="item-image">
        <div
          className="voucher-image"
          style={{
            backgroundImage: voucher.image ? `url(${voucher.image})` : "none",
            backgroundColor: voucher.image ? "transparent" : "#f4e7e7",
          }}
        >
          {!voucher.image && (
            <div className="voucher-placeholder">
              <span>No Image</span>
            </div>
          )}
        </div>
      </div>

      <div className="item-details">
        <h3 className="item-title">{voucher.title || "Unknown Voucher"}</h3>
        <p className="item-description">{voucher.description || "No description available"}</p>
        <div className="item-category">
          <span className="category-badge">{voucher.categoryId?.name || "General"}</span>
        </div>
      </div>

      <div className="item-quantity">
        <label>Quantity:</label>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
            disabled={updatingItem === item._id}
          >
            -
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
            disabled={updatingItem === item._id}
          >
            +
          </button>
        </div>
      </div>

      <div className="item-points">
        <span className="points-value">
          {(voucher.points || 0) * (item.quantity || 0)} points
        </span>
        <span className="points-per-item">
          ({voucher.points || 0} per item)
        </span>
      </div>

      <div className="item-actions">
        <button className="remove-button" onClick={() => handleRemoveItem(item._id)}>
          Remove
        </button>
      </div>
    </div>
  );
})}

          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-header">
              <h2>Cart Summary</h2>
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row">
                <span>Total Points:</span>
                <span className="total-points">
                  {totalPoints.toLocaleString()} points
                </span>
              </div>
            </div>

            <div className="summary-actions">
              <button
                className="continue-shopping-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button
                className="checkout-button"
                onClick={handleCheckout}
                disabled={processingCheckout}
              >
                {processingCheckout ? "Processing..." : "Redeem Vouchers"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CartPage);
