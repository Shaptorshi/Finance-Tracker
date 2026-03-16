import { useState, useEffect } from 'react'
import { IncomeVsExpenseChart,MonthlySpendingChart,ExpenseCategoryComparisonChart } from '../components/ExpensesChart'


const Analytics = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem(`loginToken`)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/financialRecords`,{
        method:`GET`,
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      const data = await response.json();
      setRecords(data);
    }
    fetchRecords();
  }, [])
  return (
    <div>
      <div className='mt-10'>
        <IncomeVsExpenseChart records={records} />
        <MonthlySpendingChart records={records}/>
        <ExpenseCategoryComparisonChart records={records}/>
      </div>
    </div>
  )
}

export default Analytics
