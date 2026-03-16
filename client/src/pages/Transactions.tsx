import { useState, useEffect } from 'react'


type RecordType = {
  type: string,
  category: string,
  amount: number,
  date: string,
}
type CategoryType = {
  _id: string,
  name: string,
  type: `income` | `expense`
}

const Transactions = () => {

  const [records, setRecords] = useState<RecordType[]>([])
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/financialRecords`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`loginToken`)}`
        }
      });
      const data = await response.json();
      setRecords(Array.isArray(data) ? data : []);
    }
    fetchRecords();
    const fetchCategories = async () => {
      const token = localStorage.getItem(`loginToken`)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
        method: `GET`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      const data = await response.json();
      setCategories(data)
    }
    fetchCategories();
  }, [records])
  const getCategoryName = (id: string) => {
    const category = categories.find((c: any) => c._id === id);
    return category ? category.name : `Unknown`
  }
  const filteredRecords = records.filter((record) => {
    const categoryName = getCategoryName(record.category);

    return (
      categoryName.toLowerCase().includes(search.toLowerCase()) || record.type.toLowerCase().includes(search.toLowerCase())
    )

  })
  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4 cascadia">
        Recent Transactions
      </h2>
      <input type="text" className='cascadia border border-gray-500 px-3 py-2 rounded-md mb-3 w-full outline-none' placeholder='Search transactions' name='searchBar' value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="bg-white border border-gray-400 rounded-xl p-4 space-y-3">
        {filteredRecords.map((record, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b border-gray-400 pb-2"
          >
            <div>
              <p className="font-medium cascadia">
                {getCategoryName(record.category)}
              </p>
              <p className="text-sm text-gray-500 cascadia">{record.type} • {new Date(record.date).toLocaleDateString(`en-IN`, {
                day: `numeric`,
                month: `short`,
                year: `numeric`
              })}</p>
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
