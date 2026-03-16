import { useState, useEffect } from 'react'
import { Plus, Trash2, X } from 'lucide-react';

type CategoryType = {
  _id: string,
  name: string,
  type: `income` | `expense`,

}
const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "expense"
  })
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem(`loginToken`);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`, {
        method: `DELETE`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        setCategories(prev => prev.filter((category) => category._id !== id))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem(`loginToken`)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: formData.name,
        type: formData.type
      })
    })
    const data = await response.json();
    setCategories(prev => [...prev, data.categories])

    setFormData({
      name: "",
      type: 'expense'
    })
    setShowModal(false)

  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem(`loginToken`)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
          method: `GET`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json();
        setCategories(data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  const incomeCategories = categories.filter((category) => category.type === `income`)
  const expenseCategories = categories.filter((category) => category.type === `expense`)
  return (
    <section className='min-h-screen'>
      <div className='flex justify-between items-center mt-6'>
        <h1 className='text-2xl font-semibold mb-4 samurai-font'>Categories</h1>
        <button className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 cascadia' onClick={() => setShowModal(true)}><Plus size={18} />Add Category</button>
      </div>

      {/* Income */}
      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-4 samurai-font'>Income Categories</h2>
        {incomeCategories.map((category: any) => {
          return (
            <div key={category._id} className='flex justify-between border p-3 rounded-md mb-2 '>
              <span className='text-green-600 text-lg cascadia'>{category.name}</span>
              <button className='cursor-pointer' onClick={() => handleDelete(category._id)}><Trash2 size={18} /></button>
            </div>
          )
        })}
      </div>
      {/* Expense */}
      <div className='mt-10'>
        <h2 className='text-xl font-semibold mb-4 samurai-font'>Expense Categories</h2>
        {expenseCategories.map((category: any) => {
          return (
            <div key={category._id} className='flex justify-between border p-3 rounded-md mb-2'>
              <span className='text-red-600 text-lg cascadia'>{category.name}</span>
              <button className="cursor-pointer" onClick={() => handleDelete(category._id)}><Trash2 size={18} /></button>
            </div>
          )
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white p-6 rounded-xl w-96">
            <div className='flex items-center justify-between mb-5'>
              <h3 className="text-2xl font-semibold samurai-font">
                Add Category
              </h3>
              <X onClick={() => setShowModal(false)} className='cursor-pointer' />
            </div>
            <form className="space-y-4 cascadia" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Category name"
                onChange={handleChange}
                value={formData.name}
                className="w-full border p-2 rounded-md"
              />
              <select
                name="type"
                onChange={handleChange}
                value={formData.type}
                className="w-full border p-2 rounded-md"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                Add Category
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Categories
