import React from "react";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#120d1b]">Welcome to the Admin Panel</h2>
      <p className="text-[#4a3f63] text-base leading-relaxed">
        Use the left sidebar to navigate between sections of the admin panel. Here's what each section allows you to do:
      </p>

      <ul className="list-disc list-inside text-[#4a3f63] space-y-2">
        <li>
          <strong>Users:</strong> View and manage registered users. You can activate/deactivate users or view their profile and redemption activity.
        </li>
        <li>
          <strong>Vouchers:</strong> Create, edit, and delete vouchers. Define point values, descriptions, expiration dates, and associated categories.
        </li>
        <li>
          <strong>Categories:</strong> Organize vouchers into categories for better filtering and browsing.
        </li>
    
      </ul>

      <p className="text-[#4a3f63]">
        To begin, select an option from the left menu. This welcome guide will disappear once you choose a section.
      </p>
    </div>
  );
};

export default AdminDashboard;
