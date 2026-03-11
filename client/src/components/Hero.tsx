import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className='py-60 px-5'>
      <div className='flex flex-col'>
        <div className='max-w-xl'>
          <p className='samurai-font text-6xl font-bold bg-clip-text'>Crush Your Debt Faster</p>
          <p className='cascadia text-gray-600 font-semibold mt-5'>FinSense tracks your finances and creates the smartest plan to eliminate debt.</p>
          <div className='mt-10 flex gap-4'>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
              <a href='' className='block cascadia bg-blue-600 p-4 rounded-xl hover:text-white'>Get Started Free</a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
              <a href='' className='block cascadia border p-4 rounded-xl hover:bg-[#1D4DE8] hover:text-white sm:text-sm'>View Demo</a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
