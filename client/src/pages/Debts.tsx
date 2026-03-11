import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react';

type DebtType = {
  _id: string,
  name: string,
  balance: number,
  interestRate: number,
  minimumPayment: number,
}



const Debts = () => {
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<DebtType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    interestRate: "",
    minimumPayment: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(`loginToken`);
      const response = await fetch(`http://localhost:3000/api/debts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          balance: Number(formData.balance),
          interestRate: Number(formData.interestRate),
          minimumPayment: Number(formData.minimumPayment)
        })
      })
      const data = await response.json();
      if (response.ok) {
        setRecords(prev => [...prev, data]);
      }

      setShowModal(false);
      setFormData({
        name: "",
        balance: "",
        interestRate: "",
        minimumPayment: ""
      })

    } catch (error) {
      console.log({ message: error })
    }
  }
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await fetch(`http://localhost:3000/api/debts`, {

          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json();
        if (Array.isArray(data)) {
          setRecords(data);
        }
      } catch (error) {
        console.log({ message: error });
      }
    }
    fetchRecords()
  }, [])

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold samurai-font'>Your Debts</h1>
        <div className='flex items-center gap-4'>
          <select className="border rounded-md px-3 py-2 cascadia outline-none">
            <option value="">Debt Snowball</option>
            <option value="">Debt Avalanche</option>
          </select>
          <button className='bg-blue-600 text-white px-4 py-2 cascadia rounded-md hover:bg-blue-700 cursor-pointer' onClick={() => setShowModal(true)}>Add Debt</button>
        </div>
      </div>
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-100 shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>Add New Debt</h2>
            <div className='flex flex-col gap-3'>
              <form onSubmit={handleSubmit} className=''>

                <input
                  className='border p-2 rounded mb-3'
                  type="text"
                  placeholder='Debt Name'
                  name='name'
                  onChange={handleChange}
                  value={formData.name}
                />
                <input
                  className='border p-2 rounded mb-3'
                  type="number"
                  placeholder='Balance'
                  name='balance'
                  onChange={handleChange}
                  value={formData.balance}
                />
                <input
                  className='border p-2 rounded mb-3'
                  type="number"
                  placeholder='Interest Rate'
                  name='interestRate'
                  onChange={handleChange}
                  value={formData.interestRate}
                />
                <input
                  className='border p-2 rounded mb-3'
                  type="number"
                  placeholder='Minimum Payment'
                  name='minimumPayment'
                  onChange={handleChange}
                  value={formData.minimumPayment}
                />
                <div className='flex justify-end gap-3 mt-5'>
                  <button className='cursor-pointer px-4 py-2 border rounded hover:bg-black hover:text-white' type="button" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className='px-4 py-2 rounded text-white bg-blue-600 cursor-pointer hover:bg-blue-700' type='submit'>Add Debt</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
        {records.map((record: any) => {
          return (
            <div key={record._id}>
              <h2 className='text-lg font-semibold mb-3'>{record.name}</h2>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-500'>Balance</span>
                <span className='font-medium'>₹{record.balance}</span>
              </div>
              <div className='flex justify-between text-sm mb-2'>
                <span className='text-gray-500'>Interest</span>
                <span className='font-medium text-red-500'>{record.interestRate}%</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-500'>Minimum Payment</span>
                <span className='font-medium'>₹{record.minimumPayment}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div>

      </div>
    </div>
  )
}

export default Debts
