import { useEffect, useState } from 'react'
import { Menu, X, Search, Bell, User } from 'lucide-react'


const LoggedNavbar = () => {
  const [info, setInfo] = useState({ name: '', email: '' })
  const [profile, setProfile] = useState(false)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const loginUser = localStorage.getItem(`loggedUser`);
    if (loginUser) setInfo(JSON.parse(loginUser));
  }, [])
  return (
    <>
    {profile && (
      <div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40' onClick={()=>setProfile(false)}></div>
    )}
      <nav className='bg-white/40 backdrop-blur-md py-3 text-xl shadow-md top-0 z-50 rounded-2xl border border-gray-300'>
        <div className='max-w-full flex justify-between items-center py-3 px-6'>
          <p className='font-bold samurai-font text-2xl'>FinSense</p>
          <ul className='hidden lg:flex gap-6 lg:gap-8 items-center'>

            <div>
              <li className='bg-gray-300 p-1 rounded-full hover:bg-gray-400 font-semibold samurai-font cursor-pointer transition-all duration-400 ease-in-out'><User onClick={() => setProfile(!profile)} /></li>
              {profile && (
                <div className='relative'>
                  <div className='text-xl absolute right-0 mt-2 shadow-lg rounded-lg bg-white top-0 samurai-font font-semibold p-3 w-80'>
                    <div className='flex gap-2'>
                      <label className='text-gray-500'>Name:</label>
                      <p className='mb-5'>{info.name}
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <label className='text-gray-500'>Email:</label>
                      <p>{info.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ul>
          <button className='lg:hidden' onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>

          {
            open && (
              <div className='absolute top-16 w-56 bg-blue-100 backdrop-blur-xl border border-white rounded-xl p-4'>
                <ul className='flex flex-col gap-3'>
                  <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><Search /></li>
                  <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><Bell /></li>
                  <li className='font-semibold samurai-font hover:text-[#1D4ED8] cursor-pointer transition-all duration-400 ease-in-out'><User /></li>
                </ul>
              </div>
            )
          }
        </div>
      </nav >
    </>
  )
}

export default LoggedNavbar
