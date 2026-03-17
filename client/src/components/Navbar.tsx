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
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><a href="#home">Home</a></li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><a href="#about">Working</a></li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><a href="#features">Features</a></li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><a href="#services">Services</a></li>
                    <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><a href="#contact">Contact</a></li>
                </ul>
                <motion.button whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} onClick={() => navigate('/login')} className='samurai-font font-semibold bg-black text-white px-5 py-2 rounded-xl cursor-pointer hidden lg:flex hover:bg-gray-800'>Login</motion.button>
                <button className="lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
            </div>
            <AnimatePresence>
                {open &&
                    <div className='absolute top-16 w-56 bg-blue-100 backdrop-blur-xl border border-white rounded-xl p-4'>
                        <ul className='flex flex-col gap-4 mt-4'>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'><a href="#home"></a>Home</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'><a href="#about"></a>About</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'><a href="#features"></a>Features</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'><a href="#services"></a>Services</li>
                            <li className='font-semibold samurai-font hover:text-white cursor-pointer'><a href="#contact"></a>Contact</li>
                            <motion.button whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} onClick={() => navigate('/login')} className='samurai-font font-semibold bg-black text-white px-5 py-2 rounded-xl cursor-pointer '>Login</motion.button>
                        </ul>
                    </div>
                }
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
