# Points-Based Voucher Redemption Platform

A MERN stack application where users can **browse, add to cart, and redeem vouchers** using their points.  
Admins can **manage vouchers and categories** via an admin panel.

---

## Features

### User
- View **points balance** on the dashboard
- **Browse, search, and filter vouchers** by category
- **View voucher details** (title, description, expiry date, points required)
- **Add vouchers to cart** and redeem using points
- **Manage profile** (update personal details & profile picture)
- **View redemption history** (with status: redeemed / expired)

### Admin
- **Manage vouchers**: Create, edit, delete, set expiry & assign categories
- **Manage categories**: Add, edit, and delete voucher categories
- **Future features** (in progress):
  - Analytics (voucher performance & trends)
  - User management
  - PDF downloads for redeemed vouchers

---

## Tech Stack
- **Frontend:** React.js (with Redux & TailwindCSS/Chakra UI for styling)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** FeathersJS JWT
- **Storage:** Amazon S3 (for images)
- **Email (optional):** Amazon SES

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/voucher-platform.git
cd voucher-platform
