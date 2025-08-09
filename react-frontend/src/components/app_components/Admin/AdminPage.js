import React from "react";
import { Link, Outlet } from "react-router-dom";

const sidebarLinks = [
  {
    label: "Users",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Z"/>
      </svg>
    ),
    to: "/admin/users",
  },
  {
    label: "Vouchers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M227.19,104.48A16,16,0,0,0,240,88.81V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V88.81a16,16,0,0,0,12.81,15.67,24,24,0,0,1,0,47A16,16,0,0,0,16,167.19V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V167.19a16,16,0,0,0-12.81-15.67,24,24,0,0,1,0-47ZM32,167.2a40,40,0,0,0,0-78.39V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.39Z"/>
      </svg>
    ),
    to: "/admin/vouchers",
  },
  {
    label: "Categories",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"/>
      </svg>
    ),
    to: "/admin/categories",
  },
  
];

const AdminPage = () => {
  return (
    <>
      <div className="flex min-h-screen bg-[#f9f8fc]">
        {/* Sidebar */}
        <aside className="w-80 min-h-screen bg-[#f9f8fc] border-r border-[#ebe7f3] p-6 flex flex-col gap-8">
          <div>
            <h1 className="text-[#120d1b] text-base font-medium leading-normal">Admin Panel</h1>
            <p className="text-[#634c9a] text-sm font-normal leading-normal">Manage Platform</p>
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#ebe7f3] text-[#120d1b] text-sm font-medium"
                activeclassname="bg-[#ebe7f3]"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminPage;
