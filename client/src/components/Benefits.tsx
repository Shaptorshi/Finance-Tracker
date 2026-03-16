
import { motion } from 'framer-motion'
import { Target, LayoutDashboard, Rocket, BarChart, Shield, CheckCircle } from 'lucide-react'
const b = [
    {
        icon: LayoutDashboard,
        title: "Complete Financial Visibility",
        desc: "Track Income, Expenses and debts in one dashboard"
    },
    {
        icon: Rocket,
        title: "Pay Off Debt Faster",
        desc: "Use smart strategies like snowball and avalanche"
    },
    {
        icon: BarChart,
        title: "Smarter Spending",
        desc: "Understand where your money goes with analytics"
    },
    {
        icon: Target,
        title: "Achieve Financial Goals",
        desc: "Set savings targets and track your progress"
    },
    {
        icon: Shield,
        title: "Secure & Private",
        desc: "Your financial data is encrypted and protected"
    },
    {
        icon: CheckCircle,
        title: "Stress-Free Finance",
        desc: "Simplify money management with automation"
    },
]

const Benefits = () => {
    return (
        <section className='max-w-7xl mx-auto py-24 px-6'>
            <div>
                <div className='text-center'>
                    <h2 className='font-bold text-4xl samurai-font'>Why Choose FinSense</h2>
                    <p className='text-gray-500 cascadia mx-auto'>Take control of your finances with smart tools designed to help you spend better, reduce debt and reach your financial goals faster.</p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-16'>
                    {b.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} key={idx} >
                                <div className='bg-white border border-gray-200 shadow-md p-6 rounded-xl'>
                                    <div className='bg-gray-300 w-10 p-2 rounded-4xl'>
                                        <Icon color='#155dfc' />
                                    </div>
                                    <h2 className='samurai-font font-semibold text-xl mt-3'>{benefit.title}</h2>
                                    <p className='cascadia text-gray-500'>{benefit.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Benefits
