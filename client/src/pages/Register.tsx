import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ResponsiveContainer, Tooltip, BarChart, Bar, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';

const Register = () => {
  const data = [
    { name: "Rent", expenses: 40 },
    { name: "Food", expenses: 20 },
    { name: "Transport", expenses: 10 },
    { name: "Savings", expenses: 15 },
    { name: "Others", expenses: 15 },
  ]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // localStorage.setItem('registeredUser',JSON.stringify(data));
        navigate('/login');
      }

    } catch (error) {
      console.log({ message: "Error occurred:", error });
    }
  }

  return (
    <div className='min-h-screen grid md:grid-cols-2'>
      <div className='hidden md:flex flex-col justify-center items-center bg-linear-to-r from-blue-600 to-indigo-600 text-white'>
        <h1 className='text-4xl samurai-font font-bold mb-2'>FinSense</h1>
        <p className='cascadia text-center text-lg max-w-md'>Manage your finances smarter</p>
        <p className='cascadia text-center text-lg max-w-md'>Track Expenses • Reduce Debt</p>
        <div className='w-full mt-15 flex justify-center items-center mr-15'>
          <ResponsiveContainer width={450} height={260}>
            <BarChart responsive data={data} className='cascadia'>
              <CartesianGrid strokeDasharray={`3 3`} />
              <XAxis dataKey={`name`} tick={{ fill: "#e5e7eb" }} fontSize={15} />
              <YAxis tick={{ fill: "#e5e7eb" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey={`expenses`} fill='#ef4444' />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className='cascadia text-center text-lg max-w-md'>See exactly where your money goes.</p>

      </div>
      <div className='flex justify-center items-center '>
        <div className='w-full max-w-md text-center'>
          <h1 className='samurai-font mb-2 font-bold text-3xl'>Create Account</h1>
          <h2 className='cascadia text-gray-500 mb-6'>Start managing your finances today</h2>
          {/* Inputs */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              name='name'
              placeholder='Full Name' className='w-full border border-gray-300 shadow-md rounded-lg px-4 py-3 mb-4 cascadia' />
            <input
              type="email"
              onChange={handleChange}
              name='email'
              placeholder='Email'
              className='w-full border border-gray-300 shadow-md rounded-lg px-4 py-3 mb-4 cascadia' />
            <input
              type="password"
              onChange={handleChange}
              name='password'
              placeholder='Password' className='w-full border border-gray-300 shadow-md rounded-lg px-4 py-3 mb-4 cascadia' />
            <input
              type="password"
              placeholder='Confirm Password'
              name='confirmPassword'
              onChange={handleChange}
              className='w-full border border-gray-300 shadow-md rounded-lg px-4 py-3 mb-4 cascadia' />

            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white cascadia px-6 py-3 rounded-2xl mt-5 hover:cursor-pointer transition-all duration-300 ease-in-out'>Create account</button>
            <p className='mt-5 text-center text-gray-500 cascadia'>
              Already have an account?
              <Link to={'/login'} className='ml-1 text-blue-600'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
