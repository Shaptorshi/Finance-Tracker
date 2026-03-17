
import {PieChart,Shield,Wallet,TrendingDown} from 'lucide-react'
import {motion} from 'framer-motion'

const f=[
  {
    icon:Wallet,
    title:"Track Every Expense",
    desc:"Monitor your daily income and spending in one clean dashboard"
  },
  {
    icon:TrendingDown,
    title:"Smart Debt Minimizer",
    desc:"Use avalanche and snowball strategies to eliminate debt faster."
  },
  {
    icon:PieChart,
    title:"Financial Insights",
    desc:"Understand where your money goes with clear analytics."
  },
  {
    icon:Shield,
    title:"Secure & Private",
    desc:"Your financial data is encrypted and protected"
  }
]

const Features = () => {
  return (
    <section className='py-60 px-6 max-w-full' id='features'>
      <div className='text-center mb-15'>
        <h2 className='text-4xl font-bold samurai-font'>Powerful Features for Smarter Finance</h2>
        <p className='cascadia text-gray-500 max-w-xl mx-auto'>FinSense helps you track spending, manage debt, and make smarter financial decisions.</p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
        {f.map((feat,idx)=>{
          const Icon = feat.icon;
          return(
            <motion.div whileHover={{scale:1.05}} transition={{duration:0.3}} key={idx} className='bg-white p-6 rounded-2xl shadow-sm border border-gray-200'>
              <Icon className='text-blue-600 mb-4' size={32}/>
              <p className='font-semibold cascadia text-xl mb-2'>{feat.title}</p>
              <p className='cascadia text-gray-600 text-sm'>{feat.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Features
