import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import "./HomePage.css";
import VoucherDetailsModal from "../VoucherDetails/VoucherDetailsModal";

const HomePage = (props) => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [redemptionDetails, setRedemptionDetails] = useState(null);
  
  useEffect(() => {
  if (!props.user?._id) return;

  const fetchUserPoints = async () => {
    try {
      const freshUser = await client.service("users").get(props.user._id);
      setPoints(freshUser.points || 0);
    } catch (error) {
      console.error("Error fetching user points:", error);
      setPoints(0); // fallback
    }
  };

  fetchUserPoints();
  // Real-time listener for points updates
    const handleUserPatched = (updatedUser) => {
      if (
        updatedUser._id === props.user._id &&
        typeof updatedUser.points !== "undefined"
      ) {
        setPoints(updatedUser.points);
      }
    };

    client.service("users").on("patched", handleUserPatched);
    client.service("users").on("updated", handleUserPatched);

    return () => {
      client.service("users").off("patched", handleUserPatched);
      client.service("users").off("updated", handleUserPatched);
    };
  }, [props.user]);
  
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await client.service("vouchers").find({
          query: {
            $limit: 1000,
            $populate: [{ path: "categoryId", service: "category", select: ["name"] }]
          }
        });
        
        // Use sample data if API returns empty results
        if (!response.data || response.data.length === 0) {
          throw new Error("No vouchers found");
        }
        
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        // Sample data when API fails or returns empty
        const sampleVouchers = [
          {
            _id: "1",
            title: "Tech Gadgets",
            points: 500,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7HydIHKYGbdGKSpqeSHgdiiMWaFegl2VNDQo3yunHJqdyDmftNEwnHZHa9DGSaEykig7EJQWgn8y4M9HTGJPtN5QN7wt87OhBkAUOa-4h9V_livDcrqQEwlH-KGbXwjE9MRilaCtG8lHRrA8NLsXnqiSYvn5I0ri-A0Zz3arnrGWedx5ZOk_8US1wqPfmCQkJrGVzTWlBHG7gXhjCmQMMIW86UqQ4m9Yf83lI6aaXyT_avr4rCdlYOjE1fhLPiz_nfjCK3ley1MR0",
            categoryId: { name: "Electronics" },
            description: "Latest tech gadgets and accessories",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "2",
            title: "Fashion Finds",
            points: 300,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyY4QCWT5Hb5Xh5WMDy4vFUQGGuXJznpnflWbAZFmQWT1aP9tU-pqoeFCnB58N9FWCzzsx8THV7AO0bmp86mB5r7rfESmM7RolMrpI_CiuGL9SlAmq38jdC6dJ2E1BA3Dsf0Iaz6PSii3ROVAVnheGb27GQMgh7RCDMwOOMV1qsvwBd8ZsIj96RqHfViLgd20gKQ0136oEX8y1g5oaQr6GqIBOADAL1PfEfpm77w5WJ8YwJ62toNSdjLc6EPcTao029_zgkcan7pC5",
            categoryId: { name: "Fashion" },
            description: "Trendy fashion items and accessories",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "3",
            title: "Gourmet Delights",
            points: 200,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLNg8tKUTVOCcPE_vs0U6wlgWwf05KQaNBuQC7E-MavNqaPNv3RkL3Wg-ftUmUgGoX1RK9lBKlXwphEYQ5uAZusSa88akC0sfxWjwS_0DhrOdIwWWBwvZh9ZmP30SPc5EA9FhexZRirWEKpZNtxc61fNcbknp65xUKY7kdBKXuR4rOAIeWosOqBQDgqRF1wTtmvzSWllKn1tLXE4HBi49BxzsvQmP9hUi0F_Qht7otYCD9NeMnyq7KnS0y4AaAi3b1imB7Xpa3g0hN",
            categoryId: { name: "Food & Drink" },
            description: "Delicious gourmet food and beverages",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "4",
            title: "Adventure Awaits",
            points: 400,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxX6UyNTqcYsxRIvC9ueaQvpCXZ11-dgSPtVp6Ix13LYwjInawrEMF8QjLDjlRpwiApcAo6d0ePfbut7Nr-wx60fzjVqFh2mUSz6cEhj0hXG4rjn9fW6DZ64lNXDTkkx9DQvPXjGEhtF_QdI6P9OBveFUdVg3re-aqqpt7j22M5D3X8wZKE3lETla6VqxyrR_toiNLYXuXo-X3XyjKHmUfDTgabHKKdC2JmE6gpreIQ1H_i7USaO3-UGQABDbccW4cSpRJxVfOSP5N",
            categoryId: { name: "Experiences" },
            description: "Exciting adventure and travel experiences",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "5",
            title: "Home Essentials",
            points: 250,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDonJmEeD1zSqNTUt2PIaDJOtgmie2fYLto2nzoySwpjKnQqV3cnhgBsFDa30CBZITbULiN5QvMhPI6XO7dFoxjcElnIS3eVEdN3GLF888rhg78Z1vvtfGzuZ1kaKrmoR1EkdalrWVLbbfixxWv-GUi7jcBSukM63aa3y_rORE_jC565fdH-1Xh64uJE5HVAYu3xl9A-HWJC6t-czVOYq5QLCfXph1N-iBtRcTQIG7JIyIsSXIFXzRAK4CrDFQj6Lu1Lgkyx9cI05kN",
            categoryId: { name: "Home & Garden" },
            description: "Essential items for your home",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "6",
            title: "Wellness Retreats",
            points: 600,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbt3fDBj1Xu-n7ayzqUmA5cZpfj1cZ31WY5lJ_A-sN85qSm8HUgNE9bZZ-2Hqj40Z8B_tSA4bHG_1QjGG7ZvVDZSRR3fx_qSEoM37ZYiVhMW-mcqy4_W0H_KrTyYaC6cA4nlC4FbrBWIejRxV-yC4Xs3e89NijYUAFxnteN6HCokYOYcJXZ-zK-GBf9jZbHnqt0DqdVST-K5gvPkNHJ4Y47mvL-uHyfA2ZLcaqtl5OOCGGVCWc8DDRV4AHV1W4def_bJjLhDdStMnO",
            categoryId: { name: "Wellness" },
            description: "Relaxing wellness and spa treatments",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "7",
            title: "Entertainment Hub",
            points: 350,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_AZgvYiQvBmjRwkoEA38lM6GIIVbDmWbTD3fMKexxVrYNY1uyD2v_18yL4JIFofketoJqcOMTvnJhoiltBV0fyRNp9RfI9zo-RjcQwjBDVPRRs-mRFcgnlkv9iCFaH56zHbSiCqF835GF5OG0vzop_OxJ-B2ZHEEyXeTD08pmXHyNVH-BxvYen7ckJn-5hrDXBpeh1CJr7QdBKlwUVKBdEK2WSxUfc3-Fl5zhOtuQv6Op4Sb368dsph7LJv3knVgfOEM48KI743gp",
            categoryId: { name: "Entertainment" },
            description: "Movies, games, and entertainment",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "8",
            title: "Travel Escapes",
            points: 700,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNASI_KmarjS1S-ltlrHt9kZq0gW4Pbp_Ib5d5rI_tSBubN30ylN9ArotFvFF8jCjWoo-mK8UgSObqEdNE0nAPva9Zfowyq_XunKneQN1va8CqyNJXXXfCo73-OmIkCsQ70kzG3LbypiMlwbsv1sskkBoqASYGSE8WeMUJC84GDTam-7XXrT0gZ8Z5JvHgYqoSF9wRqdPzlXGP9wV5816m8woBzQ3fKvJB_Es-cfTwTjBTPy6QarRJY-BNmBmycHcmOPA5MBw7D0el",
            categoryId: { name: "Travel" },
            description: "Amazing travel destinations and packages",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "9",
            title: "Fitness Gear",
            points: 450,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqo2vIPaYmYEnmsgYZ_8NT1X971D3yBBbUAhhGuKkP9WaH-Qb1HZq1otMaAEXvYtEA7ML8dCRXOBtizm-OtR7MOKx5BHuLyeHTgzn85-vqwDO-JQ0MLh4CB2E0km0LVNSawuwl3V-qtKTY6iHmNjDvFQS0ur7mTDvDIZbR80WOcSdFW4B1jh2kH3sE80vG7Q4Z-gr_4QRgOAmNAQ7akA2HQEtKJ0_3NBF2uUf7w3ZIchnnxuuzKmZZOjgKGAuIvBiYd9U50A17ebS",
            categoryId: { name: "Fitness" },
            description: "Quality fitness equipment and gear",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "10",
            title: "Luxury Items",
            points: 800,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwvW6bWELhkD3TRrn62DQOm7Atr7rwbB7m80dPPn28LDZ4ymZulDUOL0FgchKhRfiKkaEgXyW0MBVyHgDZr_DDCnOxBeqjwxWlYTRP7NpCQVGnkMSYYJLy-pQQANMw7Ahad6dCZzCtGWgrQLuiL85v0McHslXOviQTQz2iZ4hejuSXEmmMT4JHqDNdOHbESz4Ip_DOr9ErRqt2jQoLZaEGqwJ8J3F_xdVt0buZZ3TeiYP854_uXRukhv5yTiDrGZTAPFAsZoeah15m",
            categoryId: { name: "Luxury" },
            description: "Premium luxury items and experiences",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "11",
            title: "Family Fun",
            points: 550,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PIasEqhEtB0sFbNsH0Kw-JQwgfkJfhtTZ_I0qmh7VS9R6byXA4feWAzMs-_vuzHnpk5Ox5JJxbwGtrln3OGgy6w1O_taG1Y_Q2IYXYtB9KrNx8bTIrtOavGytsfJPjtPE6R6EwN8pSnrEmVAcwfdZ-m0QJwPufvhw9UtxirVtk39yBLhn0e3KOCPa31zzojgUyJ9nEn5e5AJoV-VU0_fCAOQg7AuegDuUeuFksyXYcQqvKcIw3eBjfLJpqaFxINk-XhWBeRocGRd",
            categoryId: { name: "Family" },
            description: "Fun activities for the whole family",
            expiryDate: "2024-12-31",
            isActive: true
          },
          {
            _id: "12",
            title: "Outdoor Adventures",
            points: 650,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8M9_AohvK6cuUOdk7j-vB1EBUMqkTNtrxyBkeVB4jvRWp8ImQBqANF60qtg4cY49DFvTduzco-3cOD6Otiq39w34ESWR5luXiV4It1oi7vGZTflY01_wLBPOs97v4_ZjPXL6pmdjPYWVKPQ6Y71gXvHBwD5_IJWsWZPFdCUdykB6qsAWHOU2BT0xSrS8dkaqyZaOuCg-WLaMXK8QzGSrLlHXCMJ5J9rDANvqG8tdB2gpHmN2IIRj30mVwaoZ-gcHFzh0LcSOOi9SZ",
            categoryId: { name: "Outdoor" },
            description: "Exciting outdoor activities and gear",
            expiryDate: "2024-12-31",
            isActive: true
          }
        ];
        setVouchers(sampleVouchers);
      } finally {
        setLoading(false);
      }
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await client.service("category").find({ query: { $limit: 1000 } });
        setCategories([{ _id: "all", name: "All Categories" }, ...(response.data || [])]);
      } catch (error) {
        setCategories([
          { _id: "all", name: "All Categories" },
          { _id: "1", name: "Electronics" },
          { _id: "2", name: "Fashion" },
          // ...add your static fallback categories here
        ]);
      }
    };
    fetchCategories();
  }, []);

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = voucher.title.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = selectedCategory === "all";
    if (!matchesCategory) {
      if (typeof voucher.categoryId === "string") {
        matchesCategory = voucher.categoryId === selectedCategory;
      } else if (voucher.categoryId && typeof voucher.categoryId === "object" && voucher.categoryId._id) {
        matchesCategory = voucher.categoryId._id === selectedCategory;
      }
    }
    return matchesSearch && matchesCategory;
  });

const [selectedVoucher, setSelectedVoucher] = useState(null);
const [showVoucherModal, setShowVoucherModal] = useState(false);
const handleVoucherClick = (voucher) => {
  setSelectedVoucher(voucher);
  setShowVoucherModal(true);
};

 const handleAddToCart = async (voucher) => {
  try {
    const userId = props.user?._id;
    if (!userId) {
      props.alert({ type: "error", title: "Error", message: "Please log in first." });
      return;
    }

    const existing = await client.service("cartItems").find({
      query: { userId, voucherId: voucher._id }
    });

    if (existing.data.length > 0) {
      // Already in cart → just increase quantity
      const currentItem = existing.data[0];
      await client.service("cartItems").patch(currentItem._id, {
        quantity: currentItem.quantity + 1,
        points: voucher.points * (currentItem.quantity + 1),
        updatedBy: userId
      });
    } else {
      // Add as a new item
      await client.service("cartItems").create({
        userId,
        voucherId: voucher._id,
        quantity: 1,
        points: voucher.points,
        status: "pending",
        createdBy: userId,
        updatedBy: userId
      });
    }

    // Refresh local cart state
    const updated = await client.service("cartItems").find({ query: { userId } });
    setCart(updated.data);

    props.alert({ type: "success", title: "Added", message: "Voucher added to cart!" });
  } catch (error) {
    console.error(error);
    props.alert({ type: "error", title: "Error", message: "Failed to add to cart" });
  }
};


const handleRedeem = async (e, voucher) => {
  e.stopPropagation();
  if (!props.isLoggedIn) {
    props.alert({ type: "error", title: "Login Required", message: "Please log in to redeem vouchers!" });
    return;
  }
  if (points < voucher.points) {
    props.alert({ type: "error", title: "Insufficient Points", message: `You need ${voucher.points} points!` });
    return;
  }

  try {
    const confirmationNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

    setRedemptionDetails({
      confirmationNumber,
      totalPoints: voucher.points,
      redeemedItems: [{ voucherName: voucher.title, points: voucher.points, quantity: 1 }],
      redeemedAt: new Date().toLocaleString(),
    });

    await client.service("cartItemHistory").create({
      userId: props.user._id,
      voucherId: voucher._id,
      quantity: 1,
      points: voucher.points,
      status: "redeemed",
      completedDate: new Date().toISOString(), // ✅ required
      createdBy: props.user._id,               // ✅ required
      updatedBy: props.user._id,               // ✅ required
    });

    const updatedUser = await client.service("users").get(props.user._id);
    setPoints(updatedUser.points || 0);

    setShowRedemptionModal(true);
    setShowVoucherModal(false);

  } catch (error) {
    console.error("Redeem failed:", error);
    props.alert({ type: "error", title: "Redeem Failed", message: error.message || "Failed to redeem voucher" });
  }
};


    


  const isInCart = (voucher) => cart.some(item => item._id === voucher._id);

  const handleDismissModal = () => {
    setShowRedemptionModal(false);
    setRedemptionDetails(null);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#fcf8f8] group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
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
      {showVoucherModal && selectedVoucher && (
  <VoucherDetailsModal
    voucher={selectedVoucher}
    onClose={() => setShowVoucherModal(false)}
    onRedeem={(e) => handleRedeem(e, selectedVoucher)}
    onAddToCart={(e) => handleAddToCart(e, selectedVoucher)}
    isInCart={isInCart(selectedVoucher)}
  />
)}

      <div className="layout-container flex h-full grow flex-col">
        {/* Header navigation removed as requested. Only tpbar/top bar should remain if present elsewhere. */}
        
        <div className="px-2 sm:px-6 md:px-12 lg:px-24 flex flex-1 justify-center py-3 w-full">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-4 p-2">
              <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl p-4 bg-[#f4e7e7]">
                <p className="text-[#1c0d0d] text-base font-medium leading-normal">Your Points Balance</p>
                <p className="text-[#1c0d0d] tracking-light text-2xl font-bold leading-tight">{points.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#9c4949] flex border-none bg-[#f4e7e7] items-center justify-center pl-4 rounded-l-xl border-r-0" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search for vouchers"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1c0d0d] focus:outline-0 focus:ring-0 border-none bg-[#f4e7e7] focus:border-none h-full placeholder:text-[#9c4949] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
            
            <div className="flex gap-2 p-2 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#e8d8d8] scrollbar-track-transparent">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`flex h-8 items-center justify-center gap-x-2 rounded-full bg-[#f4e7e7] px-4 cursor-pointer transition-colors duration-150 ${
                    selectedCategory === category._id ? 'bg-[#9c4949] text-white' : ''
                  }`}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <p className="text-[#1c0d0d] text-sm font-medium leading-normal">{category.name}</p>
                </div>
              ))}
            </div>
            
            <h2 className="text-[#1c0d0d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Vouchers</h2>
            
            <div className={filteredVouchers.length < 2 ? "flex justify-center w-full" : "w-full"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 w-full max-w-[1100px]">
                {filteredVouchers.map(voucher => (
                  <div key={voucher._id} className="flex flex-col gap-3 pb-3 rounded-xl shadow-sm bg-white p-3 cursor-pointer" onClick={() => handleVoucherClick(voucher)}>
                    {/* Voucher Image */}
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                      style={{backgroundImage: `url("${voucher.image}")`}}
                    ></div>

                    {/* Voucher Info */}
                    <div className="flex flex-col flex-grow">
                      <p className="text-[#1c0d0d] text-base font-medium leading-snug">{voucher.title}</p>
                      <p className="text-[#9c4949] text-sm font-normal">{voucher.points} points</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-2">
                      <button
                        className={`flex-1 h-8 rounded-md text-sm font-medium ${
                          points >= voucher.points ? 'bg-[#9c4949] text-white' : 'bg-[#e8d8d8] text-[#7e2d2d] cursor-not-allowed'
                        }`}
                        disabled={points < voucher.points}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (points >= voucher.points) handleRedeem(e, voucher);
                        }}
                      >
                        Redeem
                      </button>
                    <button
  className={`w-8 h-8 rounded-md flex items-center justify-center ${isInCart(voucher) ? 'bg-[#e8d8d8] cursor-not-allowed' : 'bg-[#f4e7e7]'}`}
  disabled={isInCart(voucher)}
  onClick={(e) => {
    e.stopPropagation();
    if (!isInCart(voucher)) handleAddToCart(e, voucher);
  }}
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#9c4949" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/><path d="M6 6h15l-1.5 9h-13z"/>
  </svg>
</button>

                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {filteredVouchers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#9c4949] text-lg">No vouchers found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const mapState = (state) => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(HomePage);

