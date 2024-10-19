// src/components/Navbar.jsx
import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@material-tailwind/react";

const AdminNavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="bg-off-white p-4 flex items-center justify-end shadow-md">
      {/* Search Box */}

      <div className="flex items-center">
        {/* Notification Icon */}
        {/* Profile Menu */}
        <div className="font-bold me-3">Admin</div>
        <Avatar src="/api/images/user.png" />
      </div>
    </nav>
  );
};

export default AdminNavBar;
