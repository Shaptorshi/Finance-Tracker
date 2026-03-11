import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'

type RecordType = {
  type: string,
  category: string,
  amount: number
}

const Transactions = () => {

  const [records, setRecords] = useState<RecordType[]>([])


  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('http://localhost:3000/api/financialRecords');
      const data = await response.json();
      setRecords(data);
    }
    fetchRecords();
  }, [records])

  return (
    <div className="mt-10">
      <input type="text" />
      <h2 className="text-lg font-semibold mb-4 cascadia">
        Recent Transactions
      </h2>

      <div className="bg-white border border-gray-400 rounded-xl p-4 space-y-3">
        {records.map((record, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b border-gray-400 pb-2"
          >
            <div>
              <p className="font-medium cascadia">{record.category}</p>
              <p className="text-sm text-gray-500 cascadia">{record.type}</p>
            </div>

            <p
              className={
                record.type === "income"
                  ? "text-green-600 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              ₹{record.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Transactions
