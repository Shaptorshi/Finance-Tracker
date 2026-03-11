import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X,Search,Bell,User } from 'lucide-react'
import { motion } from 'framer-motion'

const LoggedNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <nav className='bg-white/40 backdrop-blur-md py-3 text-xl shadow-md top-0 z-50 rounded-2xl border border-gray-300'>
      <div className='max-w-full flex justify-between items-center py-3 px-6'>
        <p className='font-bold samurai-font text-2xl'>FinSense</p>
        <ul className='hidden lg:flex gap-6 lg:gap-8 items-center'>
          <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><Search /></li>
          <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><Bell /></li>
          <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><User /></li>
        </ul>
      </div>
    </nav>
  )
}

export default LoggedNavbar
