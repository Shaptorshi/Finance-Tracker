import { useEffect, useState } from 'react'
import { BadgeIndianRupeeIcon, BanknoteArrowDown, BanknoteArrowUp, PiggyBank, Plus, BarChart3, X } from 'lucide-react'
import { ExpenseChart, IncomeVsExpenseChart } from '../components/ExpensesChart'
import Transactions from './Transactions';



const FinanceDashboard = () => {
  // const totalIncome = records.filter(r=>r.type === "income")
  const [records, setRecords] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: ""
  })
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const totalIncome = records.filter(r => r.type === "income").reduce((acc, curr) => acc + curr.amount, 0)

  const totalExpense = records.filter(r => r.type === "expense").reduce((acc, curr) => acc + curr.amount, 0)

  const balance = totalIncome - totalExpense;
  const savings = balance;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (type: "income" | "expense", e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/financialRecords', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type,
          category: formData.category,
          amount: Number(formData.amount)
        })
      })
      const data = await response.json();
      setRecords(prev => [...prev, data]);

      setFormData({
        category: "",
        amount: ""
      })
      setShowExpenseModal(false);
      setShowIncomeModal(false);

    } catch (error) {
      console.error({ message: error });
    }
  }
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/financialRecords');
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecords();
  }, [records])
  const transactionsRecords = ()=>{
    [...records].slice(-5).reverse()
  }
  const cards = [
    {
      icon: BadgeIndianRupeeIcon,
      title: "Balance",
      amount: balance,
      color: "green"
    },
    {
      icon: BanknoteArrowUp,
      title: "Income",
      amount: totalIncome,
      color: "blue",
    },
    {
      icon: BanknoteArrowDown,
      title: "Expenses",
      amount: totalExpense,
      color: "red"
    },
    {
      icon: PiggyBank,
      title: "Savings",
      amount: savings,
      color: "green"
    }
  ]

  return (
    <section className='min-h-screen'>
      <div className='flex mt-4 gap-4 cascadia'>
        <button className='flex items-center gap-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 cursor-pointer text-white' onClick={() => setShowIncomeModal(true)}><Plus size={18} />Add Income</button>
        <button className='flex items-center gap-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 cursor-pointer text-white' onClick={() => setShowExpenseModal(true)}><Plus size={18} />Add Expenses</button>
        <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer text-white'><BarChart3 size={18} />View Reports</button>
        {showIncomeModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/40' onClick={() => setShowIncomeModal(false)}></div>
            <div className='relative bg-white rounded-xl shadow-lg w-105 p-6'>
              <button className='hover:cursor-pointer' onClick={() => setShowIncomeModal(false)}><X /></button>
              <div className='text-center mb-8 mt-2'>
                <div className='flex justify-center mb-3'>
                  <div className='bg-green-100 p-3 rounded-full'>
                    <BanknoteArrowUp />
                  </div>
                </div>
                <h3 className='text-xl font-semibold'>Add Income</h3>
                <p className='text-sm text-gray-500'>Record a new income transaction</p>
              </div>
              <div>
                {/* form */}
                <form className='space-y-4' onSubmit={(e) => handleSubmit("income", e)}>
                  {/* Category */}
                  <div>
                    <label className=''>Category</label>
                    <input type="text" placeholder='Salary / Freelance' className='w-full border rounded-md p-2 mt-1' value={formData.category} name='category' onChange={handleChange}/>
                  </div>
                  {/* Amount */}
                  <div>
                    <label className=''>Amount</label>
                    <input type="number" placeholder='₹ Amount' className='w-full border rounded-md p-2 mt-1 ' value={formData.amount} name='amount' onChange={handleChange}/>
                  </div>
                  <button className='w-full bg-green-600 text-white py-2 rounded-md cursor-pointer hover:bg-green-700'>
                    Add Income
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {showExpenseModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/40' onClick={() => setShowExpenseModal(false)}></div>
            <div className='relative bg-white rounded-xl shadow-lg w-105 p-6'>
              <button className='hover:cursor-pointer' onClick={() => setShowExpenseModal(false)}><X /></button>
              <div className='text-center mb-8 mt-2'>
                <div className='flex justify-center mb-3'>
                  <div className='bg-red-100 p-3 rounded-full'>
                    <BanknoteArrowDown />
                  </div>
                </div>
                <h3 className='text-xl font-semibold'>Add Expense</h3>
                <p className='text-sm text-gray-500'>Record a new expense transaction</p>
              </div>
              <div>
                {/* form */}
                <form className='space-y-4' onSubmit={(e) => handleSubmit("expense", e)}>
                  {/* Category */}
                  <div>
                    <label className=''>Category</label>
                    <input type="text" placeholder='Food, Rent, Transport...' className='w-full border rounded-md p-2 mt-1' name='category' onChange={handleChange} value={formData.category}/>
                  </div>
                  {/* Amount */}
                  <div>
                    <label className=''>Amount</label>
                    <input type="number" placeholder='₹ Amount' className='w-full border rounded-md p-2 mt-1 ' name='amount' onChange={handleChange} value={formData.amount}/>
                  </div>
                  <button className='w-full bg-red-600 text-white py-2 rounded-md cursor-pointer hover:bg-red-700'>
                    Add Expense
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className='bg-white border p-5 border-gray-300 rounded-xl'>
              <div className='flex gap-2 mb-3'>
                <p><Icon color={card.color} /></p>
                <h1 className='cascadia'>{card.title}</h1>
              </div>
              <p className={`mt-2 cascadia ${card.title === "Expenses" ? `text-red-500` : `text-green-600`}`}>
                {card.amount.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR"
                })}
              </p>
            </div>
          )
        })}
      </div>
      <div className='grid md:grid-cols-2 gap-6 mt-10'>
        <ExpenseChart records={records} />
        <IncomeVsExpenseChart records={records} />
        <Transactions records={transactionsRecords}/>
      </div>
    </section>
  )
}

export default FinanceDashboard
