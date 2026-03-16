
import { motion } from 'framer-motion'
const CTA = () => {
  return (
    <section className='max-w-7xl mx-auto py-24 px-6'>
      <div className='text-center'>
        <h3 className='text-4xl font-semibold samurai-font mb-4'>Ready to Take Control of Your Finances?</h3>
        <p className='text-gray-500 cascadia mx-auto mb-8 mt-5 text-lg opacity-90 max-w-2xl'>Track Expense, minimize debt, and reach your financial goals faster with FinSense.</p>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className='mt-10'>
          <a href="" className='bg-black text-white p-5 rounded-2xl cascadia '>Get Started Free</a>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
