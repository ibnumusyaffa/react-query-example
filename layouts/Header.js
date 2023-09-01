import React from "react";
import Profile from "./Profile";
function Header() {
  return (
    <header
      style={{ height: 65, zIndex: 1 }}
      className="bg-white sticky top-0 w-full border-b border-gray-200 flex items-center justify-between px-5"
    >
      <div className="font-semibold text-gray-700 text-lg capitalize">
        PDKI Dashboard
      </div>

      <Profile></Profile>
    </header>
  );
}

export default Header;
