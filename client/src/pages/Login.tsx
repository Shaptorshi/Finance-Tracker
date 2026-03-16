import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useAuth } from '../context/userContext'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const data = [
    { name: "Rent", value: 40 },
    { name: "Food", value: 20 },
    { name: "Transport", value: 10 },
    { name: "Savings", value: 15 },
    { name: "Others", value: 15 }
  ]
  const Colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444']

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending logs: " + JSON.stringify(formData))
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      // localStorage.getItem('registeredUser');
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.error(data.message);
        return;
      }
      navigate('/logged');
      login(data.token, data.user);
    } catch (error) {
      console.log({ message: error });
    }
  }

  return (
    <div className='min-h-screen grid md:grid-cols-2'>
      <div className='hidden md:flex flex-col justify-center items-center bg-linear-to-r from-blue-600 to-indigo-600 text-white p-12'>
        <h1 className='text-4xl samurai-font font-bold mb-2'>FinSense</h1>
        <p className='cascadia text-center text-lg max-w-md'>Manage your finances smarter</p>
        <p className='cascadia text-center text-lg max-w-md'>Track Expenses • Reduce Debt</p>
        <PieChart height={260} width={360} className='cascadia'>
          <Pie data={data} dataKey={'value'} label>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={Colors[idx % Colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <p className='cascadia text-center text-lg max-w-md'>See exactly where your money goes.</p>

      </div>
      <div className='flex justify-center items-center '>
        <div className='w-full max-w-md text-center'>
          <h1 className='samurai-font mb-2 font-bold text-3xl'>Welcome Back</h1>
          <h2 className='cascadia text-gray-500 mb-6'>Login to your FinSense Account</h2>
          {/* Inputs */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={handleChange}
              value={formData.email}
              placeholder='Email'
              name='email'
              className='w-full border border-gray-300 shadow-md rounded-lg px-4 py-3 mb-4 cascadia' />
            <input
              type="password"
              placeholder='Password'
              onChange={handleChange}
              value={formData.password}
              name='password'
              className='w-full border border-gray-300 shadow-md rounded-lg px-4 py-3 mb-4 cascadia' />
            <div className='flex justify-between'>
              <label className='flex items-center gap-2 cascadia'>
                <input type="checkbox" />
                Remember me
              </label>

              <Link to={`/forgotPassword`} className='cascadia text-blue-600'>Forgot Password</Link>
            </div>
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white cascadia px-6 py-3 rounded-2xl mt-5 hover:cursor-pointer transition-all duration-300 ease-in-out'>Login</button>
            <p className='mt-5 text-center text-gray-500 cascadia'>
              Don't have an account?
              <Link to={'/register'} className='ml-1 text-blue-600'>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
