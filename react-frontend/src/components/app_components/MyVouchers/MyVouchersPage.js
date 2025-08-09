import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import client from "../../../services/restClient"; // Not needed for sample data

const MyVouchersPage = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [voucherHistory, setVoucherHistory] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!props.user || !props.isLoggedIn) {
      navigate("/login");
      return;
    }

    // Simulate fetching with mock data
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Sample vouchers (redeemed & expired)
        const sampleData = [
          {
            _id: "1",
            redeemedAt: "2025-08-01T10:00:00Z",
            status: "redeemed",
            voucherId: {
              title: "50% Off Pizza",
              description: "Get 50% off your next pizza order",
              image: "https://via.placeholder.com/150",
              points: 200
            }
          },
          {
            _id: "2",
            redeemedAt: "2025-07-15T15:30:00Z",
            status: "expired",
            voucherId: {
              title: "Free Coffee",
              description: "Enjoy a free coffee at selected outlets",
              image: "https://via.placeholder.com/150",
              points: 50
            }
          },
          {
            _id: "3",
            redeemedAt: "2025-08-05T12:45:00Z",
            status: "redeemed",
            voucherId: {
              title: "Movie Ticket Discount",
              description: "Save 30% on movie tickets",
              image: "https://via.placeholder.com/150",
              points: 120
            }
          }
        ];

        // Simulate API delay
        await new Promise((res) => setTimeout(res, 800));

        setVoucherHistory(sampleData);
      } catch (err) {
        console.error("Error loading voucher history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [props.user, props.isLoggedIn, navigate]);

  const getFilteredHistory = () => {
    if (filter === "all") return voucherHistory;
    return voucherHistory.filter((item) => item.status === filter);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) return <div>Loading vouchers...</div>;

  return (
    <div className="voucher-history-container">
      <h1>My Voucher Redemption History</h1>

      <div className="filter-buttons" style={{ marginBottom: "15px" }}>
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === "redeemed" ? "active" : ""}`}
          onClick={() => setFilter("redeemed")}
        >
          Redeemed
        </button>
        <button
          className={`filter-button ${filter === "expired" ? "active" : ""}`}
          onClick={() => setFilter("expired")}
        >
          Expired
        </button>
      </div>

      <table className="history-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Voucher</th>
            <th>Points</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {getFilteredHistory().map((item) => (
            <tr key={item._id}>
              <td>{formatDate(item.redeemedAt)}</td>
              <td>{item.voucherId?.title}</td>
              <td>{item.voucherId?.points}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapState = (state) => {
  const { user, isLoggedIn } = state.auth;
  return { user, isLoggedIn };
};

export default connect(mapState)(MyVouchersPage);
