import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Working from '../components/Working'
import Benefits from '../components/Benefits'
import Strategy from '../components/Strategy'
import CTA from '../components/CTA'

const Dashboard = () => {
  return (
    <div className='min-h-screen px-6 py-10 mx-auto'>
      <div className='rounded-3xl bg-linear-to-br from-gray-100 via-blue-50 to bg-purple-100 border border-gray-200 p-6'>
        <Navbar />
        <Hero />
      </div>
      <Features />
      <Working />
      <Benefits />
      <Strategy />
      <CTA />
      <Footer />
    </div>
  )
}

export default Dashboard
