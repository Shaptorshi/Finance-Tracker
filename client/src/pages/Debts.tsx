import React, { useState, useEffect } from 'react'
import { Edit, Delete } from 'lucide-react';

type DebtType = {
  _id: string,
  name: string,
  balance: number,
  interestRate: number,
  minimumPayment: number,
}



const Debts = () => {
  const [isEditable, setIsEditable] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<DebtType[]>([]);
  const [strategy, setStrategy] = useState(`snowball`);
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    interestRate: "",
    minimumPayment: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == `interestRate` && Number(value) > 100) {
      alert(`Interest cannot exceed 100%`)
      return;
    }
    // if (name === `name` && Number(value)) {
    //   alert(`Numbers not allowed`);
    //   return;
    // }
    setFormData({ ...formData, [name]: value })
  }
  const handleEditToggle = (record: DebtType) => {
    setIsEditable(record._id);

    setFormData({
      name: record.name,
      balance: String(record.balance),
      interestRate: String(record.interestRate),
      minimumPayment: String(record.minimumPayment)
    })
  }
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem(`loginToken`);

      const response = await fetch(`http://localhost:3000/api/debts/${id}`, {
        method: `DELETE`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        setRecords(prev => prev.filter(record => record._id !== id))
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const user = JSON.parse(localStorage.getItem('loggedUser')||`{}`);
      // const userId = user._id;
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
      if (!response.ok) {
        console.log('Error: ', data);
      }
      setRecords(prev => [...prev, data]);

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
          method:`GET`,
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

  const sortedDebts = [...records].sort((a, b) => {
    if (strategy === `snowball`) {
      return a.balance - b.balance
    }
    if (strategy === `avalanche`) {
      return b.interestRate - a.interestRate
    }
    return 0;
  })
  return (
    <div className='p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold samurai-font'>Your Debts</h1>
        <div className='flex items-center gap-4'>
          <select className="border rounded-md px-3 py-2 cascadia outline-none" onChange={(e) => setStrategy(e.target.value)}>
            <option value="snowball">Debt Snowball</option>
            <option value="avalanche">Debt Avalanche</option>
          </select>
          <button className='bg-blue-600 text-white px-4 py-2 cascadia rounded-md hover:bg-blue-700 cursor-pointer' onClick={() => setShowModal(true)}>Add Debt</button>
        </div>
      </div>
      {showModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-100 shadow-lg'>
            <h2 className='text-xl font-semibold mb-4'>Add New Debt</h2>
            <div className='flex flex-col gap-3'>
              <form onSubmit={handleSubmit} >

                <input
                  className='border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
                  type="text"
                  placeholder='e.g Credit Card, Loan'
                  name='name'
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
                <input
                  className='border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
                  type="number"
                  placeholder='Balance ₹'
                  name='balance'
                  onChange={handleChange}
                  value={formData.balance}
                  required
                />
                <div>

                  <input
                    className='border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'
                    type="number"
                    placeholder='Interest Rate'
                    name='interestRate'
                    min={0}
                    max={100}
                    onChange={handleChange}
                    value={formData.interestRate}
                    required
                  />
                </div>
                <input
                  className={'border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500'}
                  type="number"
                  placeholder='Minimum Payment ₹'
                  name='minimumPayment'

                  onChange={handleChange}
                  value={formData.minimumPayment}
                  required
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
        {sortedDebts.map((record: any, idx) => {
          return (
            <div key={idx} className={`bg-white rounded-xl p-5 shadow-md border hover:shadow-lg transition ${idx === 0 ? "border-green-500 border-2" : ""}`}>
              <h2 className='text-lg font-semibold mb-3'>{record.name}</h2>

              {idx === 0 ? <p className='mb-2 text-green-600'>Pay this first!</p> : ''}
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
              <div className="flex gap-2 text-gray-400 mt-3">
                <button className="border p-1 flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={() => { handleEditToggle(record) }}>Edit<Edit size={18} /></button>
                <button className="flex items-center gap-2 p-1 border cursor-pointer hover:text-red-500" onClick={() => handleDelete(record._id)}>Delete<Delete size={18} /></button>
              </div>
            </div>
          )
        })}
      </div>
      <div>

      </div>
      <div>
        {isEditable && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg w-100 shadow-lg'>
              <h2 className='text-xl font-semibold mb-4'>Add New Debt</h2>
              <div className='flex flex-col gap-3'>
                <form onSubmit={handleSubmit} >

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
                    <button className='cursor-pointer px-4 py-2 border rounded hover:bg-black hover:text-white' type="button" onClick={() => setIsEditable(null)}>Cancel</button>
                    <button className='px-4 py-2 rounded text-white bg-blue-600 cursor-pointer hover:bg-blue-700' type='submit'>Add Debt</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Debts
