import React from 'react'
import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from 'recharts'
import {motion} from 'framer-motion'

const data =[
    {month:"Jan",debt:10000},
    {month:"Feb",debt:9200},
    {month:"Mar",debt:8300},
    {month:"Apr",debt:7200},
    {month:"May",debt:6000},
    {month:"Jun",debt:4800},
    {month:"Jul",debt:2000},
    {month:"Aug",debt:0},
]

const Strategy = () => {
  return (
    <section className='py-24 px-6  mx-auto'>
      <div className='text-center mb-15'>
        <h2 className='font-bold text-4xl samurai-font'>Smart Debt Strategies That Work</h2>

        <p className='cascadia text-sm text-gray-500'>FinSense recommends the best way to eliminate debt faster.</p>
      </div>

      <div className='grid md:grid-cols-2 gap-12 items-center'>
        <div className='bg-white p-6 rounded-xl shadow-md'>
            <ResponsiveContainer width={`100%`} height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="month"/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="debt" stroke='#2563eb' strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
        {/*Strategy Card*/ }
        <div className='space-y-6'>
            <motion.div whileHover={{scale:1.05}} transition={{duration:0.3}}className='p-6 border rounded-xl shadow-md border-gray-300'>
                <h3 className='samurai-font text-xl font-semibold'>Debt Snowball</h3>
                <p className='cascadia text-gray-500 text-sm mt-2'>Pay off smaller debts first to build momentum</p>
            </motion.div>
            <motion.div whileHover={{scale:1.05}} transition={{duration:0.3}}className='p-6 border rounded-xl shadow-md border-gray-300'>
                <h3 className='samurai-font text-xl font-semibold'>Debt Avalanche</h3>
                <p className='cascadia text-gray-500 text-sm mt-2'>Focus on debts with highest interest rates</p>
            </motion.div>
            <motion.div whileHover={{scale:1.05}} transition={{duration:0.3}}className='p-6 border rounded-xl shadow-md border-gray-300'>
                <h3 className='samurai-font text-xl font-semibold'>Smart Recommendations</h3>
                <p className='cascadia text-gray-500 text-sm mt-2'>FinSense analyses your debts and suggests the best strategy</p>
            </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Strategy
