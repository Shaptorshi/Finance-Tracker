import React, { useState, useEffect } from 'react'
import { Edit, Delete, X } from 'lucide-react';

type DebtType = {
  _id: string,
  name: string,
  totalAmount: number,
  // balance: number,
  interestRate: number,
  minimumPayment: number,
}


const Debts = () => {
  const [isEditable, setIsEditable] = useState<string | null>(null)
  const [isPayable, setIsPayable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<DebtType[]>([]);
  const [selectedDebtId, setSelectedDebtId] = useState<string | null>(null);
  const [strategy, setStrategy] = useState(`snowball`);
  const [formData, setFormData] = useState({
    name: "",
    totalAmount: "",
    interestRate: "",
    minimumPayment: ""
  })
  const [payment, setPayment] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == `interestRate` && Number(value) > 100) {
      alert(`Interest cannot exceed 100%`)
      return;
    }

    setFormData({ ...formData, [name]: value })
  }
  const handleEditToggle = (record: DebtType) => {
    setIsEditable(record._id);

    setFormData({
      name: record.name,
      totalAmount: String(record.totalAmount),
      interestRate: String(record.interestRate),
      minimumPayment: String(record.minimumPayment)
    })
  }
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem(`loginToken`);
      if (!isEditable) return;
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/debts/${isEditable}`, {
        method: `PUT`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          interestRate: formData.interestRate
        })
      })

      const updatedDebt = await response.json()
      setRecords(prev => prev.map(debt => debt._id === isEditable ? updatedDebt : debt))

      setIsEditable(null);

    } catch (error) {
      console.log({ message: error })
    }
  }
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem(`loginToken`);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/debts/${id}`, {
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
  const handleCancel = () => {
    setFormData({
      name: "",
      totalAmount: "",
      interestRate: "",
      minimumPayment: ""
    })
    setIsEditable(null);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const user = JSON.parse(localStorage.getItem('loggedUser')||`{}`);
      // const userId = user._id;
      const token = localStorage.getItem(`loginToken`);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/debts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          totalAmount: Number(formData.totalAmount),
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
        totalAmount: "",
        interestRate: "",
        minimumPayment: ""
      })

    } catch (error) {
      console.log({ message: error })
    }
  }
  const payDebt = async () => {
    if (!selectedDebtId) return;
    try {
      const token = localStorage.getItem(`loginToken`)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/debts/${selectedDebtId}`, {
        method: `PATCH`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: payment })
      })
      const updatedDebt = await response.json();

      setRecords(prev => prev.map(debt => debt._id === selectedDebtId ? updatedDebt : debt))
      setPayment('');
      setIsPayable(false);
      setSelectedDebtId(null)

    } catch (error) {
      console.log({ message: error })
    }

  }
  useEffect(() => {
    if (isPayable) {
      setPayment('')
    }
  }, [isPayable])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('loginToken');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/debts`, {
          method: `GET`,
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
      return a.totalAmount - b.totalAmount
    }
    if (strategy === `avalanche`) {
      return b.interestRate - a.interestRate
    }
    return 0;
  })
  const filteredDebts = sortedDebts.filter(d => d.totalAmount > 0)
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
            <h2 className='text-2xl font-semibold mb-4 samurai-font'>Add New Debt</h2>
            <div className='flex flex-col gap-3 cascadia'>
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
                  placeholder='Total Debt ₹'
                  name='totalAmount'
                  onChange={handleChange}
                  value={formData.totalAmount}
                  required
                />
                <div>

                  <input
                    className='border p-2 rounded mb-3 outline-none focus:ring-2 focus:ring-blue-500 w-40'
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
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 cascadia text-sm'>
        {filteredDebts.map((record: DebtType, idx) => {
          return (
            <div key={record._id}>
              <div key={idx} className={`bg-white rounded-xl p-5 shadow-md border hover:shadow-lg transition ${idx === 0 ? "border-green-500 border-2" : ""}`}>
                <h2 className='text-lg font-semibold mb-3'>{record.name}</h2>
                {idx === 0 ? <p className='mb-2 text-green-600'>Pay this first!</p> : <p className='text-gray-500 mb-2'>Pay this later</p>}
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-gray-500'>Amount Payable</span>
                  <span className='font-medium'>₹{record.totalAmount}</span>
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
                  <button className="border p-1 rounded-xl flex items-center gap-2 cursor-pointer hover:text-blue-500" onClick={() => { handleEditToggle(record) }}>Edit<Edit size={18} /></button>
                  <button className="flex items-center gap-2 p-1 rounded-xl border cursor-pointer hover:text-red-500" onClick={() => handleDelete(record._id)}>Delete<Delete size={18} /></button>
                </div>
                <div className='mt-3'>
                  <button className='bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 cursor-pointer' onClick={() => {
                    setSelectedDebtId(record._id)
                    setIsPayable(true)
                  }}>Pay now</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        {isPayable && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/40' onClick={() => setIsPayable(false)}></div>
            <div className=' relative bg-white p-6 rounded-lg w-100 shadow-lg'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold mb-4 samurai-font'>Pay the Debt</h2>
                <X className='mb-4 cursor-pointer' onClick={() => setIsPayable(false)} />
              </div>
              <div className='flex flex-col gap-3'>
                <input className='border p-2 rounded' type="number" placeholder='Enter payment' value={payment} onChange={(e) => setPayment(Number(e.target.value))} />
                <button className='bg-blue-500 rounded p-2 text-white hover:bg-blue-600 cursor-pointer' onClick={payDebt} disabled={payment <= 0}>Pay</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {isEditable && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center cascadia'>
            <div className='bg-white p-6 rounded-lg w-100 shadow-lg'>
              <h2 className='text-2xl font-semibold mb-4 samurai-font'>Add New Debt</h2>
              <div className='flex flex-col gap-3'>
                <form onSubmit={handleUpdate} >

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
                    placeholder='Interest Rate'
                    name='interestRate'
                    onChange={handleChange}
                    value={formData.interestRate}
                  />
                  <div className='flex justify-end gap-3 mt-5'>
                    <button className='cursor-pointer px-4 py-2 border rounded hover:bg-black hover:text-white' type="button" onClick={handleCancel}>Cancel</button>
                    <button className='px-4 py-2 rounded text-white bg-blue-600 cursor-pointer hover:bg-blue-700' type='submit'>Update changes</button>
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
