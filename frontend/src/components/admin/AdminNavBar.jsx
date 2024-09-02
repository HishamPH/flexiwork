// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';


const AdminNavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-off-white p-4 flex items-center justify-between shadow-md">
      {/* Search Box */}
      <div className="flex flex-1 max-w-lg mx-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

     
      <div className='flex align-middle'>
         {/* Notification Icon */}
        <BellIcon className="h-6 w-6 text-gray-800 mx-4 cursor-pointer" />

          {/* Profile Menu */}
        <Menu as="div" className="relative z-50">
      
            <MenuButton className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-800" />
            <span className="text-gray-800 font-semibold">John Doe</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-800" />
            </MenuButton>
            
          

          <Transition
            as="div"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="flex-col absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-0">
                <MenuItem className="bg-white hover:bg-blue-gray-100 block p-3 rounded-lg">
                  
                    <a
                      href="#profile"
                      
                    >
                      Profile
                    </a>
           
                </MenuItem>
                <MenuItem className="bg-white hover:bg-blue-gray-100 block p-3 rounded-lg">
                
                    <a
                      href="#logout"
                      
                    >
                      Logout
                    </a>
                
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
      
    </nav>
  );
};

export default AdminNavBar;
