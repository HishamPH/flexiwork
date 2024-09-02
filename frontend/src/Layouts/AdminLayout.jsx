import React from 'react'
import AdminNavBar from '../components/admin/AdminNavBar';
import SideBar from '../components/admin/SideBar';
import {Outlet} from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />
     
      <main className="flex-1">
      <AdminNavBar />
      <div className='p-0'>
        
        <Outlet />
      </div>
        
      </main>
    </div>
  )
}

export default AdminLayout