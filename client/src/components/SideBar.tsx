import { NavLink } from 'react-router-dom'
import { Settings, LogOut, LayoutDashboard, ChartSpline, Wallet, Target, Folder, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/userContext'

const SideBar = () => {
  const { logout } = useAuth();
  return (
    <aside className='w-64 min-h-screen bg-gray-900 text-white'>
      {/* <div>
        Logo
      </div> */}
      <nav className='flex-1 p-4'>
        <ul className='space-y-3'>
          <li><NavLink to={`/logged`} end className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><LayoutDashboard />Dashboard</NavLink></li>
          <li><NavLink to={`/logged/transactions`} className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><Wallet />Transactions</NavLink></li>
          <li><NavLink to={`/logged/analytics`} className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><ChartSpline />Analytics</NavLink></li>
          <li><NavLink to={`/logged/debts`} className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><Target />Budgets</NavLink></li>
          <li><NavLink to={`/logged/categories`} className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><Folder />Categories</NavLink></li>
          <li><NavLink to={`/logged/reports`} className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><BarChart3 />Reports</NavLink></li>
        </ul>
      </nav>
      <div className='p-4 border-t border-gray-800'>
        <ul className='space-y-3'>
          <li><NavLink to={`/logged/settings`} className={({ isActive }) => `flex gap-3 cascadia p-4 rounded-md ${isActive ? 'bg-gray-800' : 'hover:bg-gray-700'}`}><Settings />Settings</NavLink></li>
          <li className='flex gap-3 cascadia p-4 rounded-md hover:bg-red-600 cursor-pointer' onClick={logout}><LogOut />Logout</li>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
