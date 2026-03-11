import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <nav className='bg-white/40 backdrop-blur-md py-3 text-xl shadow-md top-0 z-50 rounded-2xl'>
            <div className='max-w-full flex justify-between items-center py-3 px-6'>
                <p className='font-bold samurai-font text-2xl'>FinSense</p>
                <ul className='hidden lg:flex gap-6 lg:gap-8 items-center'>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'>Home</li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'>About</li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'>Features</li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'>Services</li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'>Contact</li>
                </ul>
                <motion.button whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} onClick={()=>navigate('/login')} className='samurai-font font-semibold bg-black text-white px-5 py-2 rounded-xl cursor-pointer hidden lg:flex hover:bg-gray-800'>Login</motion.button>
                <button className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
            </div>
            <AnimatePresence>
                {open &&
                    <div className='absolute top-16 w-56 bg-blue-100 backdrop-blur-xl border border-white rounded-xl p-4'>
                        <ul className='flex flex-col gap-4 mt-4'>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'>Home</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'>About</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'>Features</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'>Services</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'>Contact</li>
                        <motion.button whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} onClick={()=>navigate('/login')} className='samurai-font font-semibold bg-black text-white px-5 py-2 rounded-xl cursor-pointer '>Login</motion.button>
                        </ul>
                    </div>
                }
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
