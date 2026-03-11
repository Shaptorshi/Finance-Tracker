import { useState, useEffect } from 'react'
import { IncomeVsExpenseChart,MonthlySpendingChart,ExpenseCategoryComparisonChart } from '../components/ExpensesChart'


const Analytics = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('http://localhost:3000/api/financialRecords');
      const data = await response.json();
      setRecords(data);
    }
    fetchRecords();
  }, [records])
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
