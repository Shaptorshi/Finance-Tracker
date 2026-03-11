import { ResponsiveContainer, BarChart, PieChart, Pie, Bar, Legend, XAxis, YAxis, Tooltip, CartesianGrid, Cell, LineChart, Line } from "recharts"

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
type RecordType = {
    date: string | number | Date
    type: string,
    category: string,
    amount: number
}
export const ExpenseChart = ({ records }: { records: RecordType[] }) => {

    const expenses = (records ?? []).filter((r) => r.type === "expense");
    const categoryTotals: { [key: string]: number } = {}

    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    })

    const data = Object.entries(categoryTotals).map(([category, amount]) => ({
        name: category,
        value: amount
    }))
    return (
        <div className="">
            <h2 className="text-lg font-semibold mb-4 cascadia">Expense Distribution</h2>
            <div className="w-full h-80">

                <ResponsiveContainer width={`100%`} height={300}>
                    <PieChart>
                        <Pie cx={`50%`} cy={`50%`} data={data} dataKey={`value`} nameKey={`name`} outerRadius={100} innerRadius={40} label>
                            {data.map((entry, idx) => (
                                <Cell key={idx} fill={colors[idx % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export const IncomeVsExpenseChart = ({ records }: { records: RecordType[] }) => {

    const totalIncome = (records ?? []).filter(r => r.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = (records ?? []).filter(r => r.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

    const data = [
        { name: "Income", amount: totalIncome },
        { name: "Expense", amount: totalExpense }
    ]
    return (
        <div className="bg-white border border-gray-400 rounded-xl p-5 mb-5">
            <h2 className="text-lg font-semibold mb-4 cascadia">Income vs Expense Chart</h2>
            <ResponsiveContainer width={`100%`} height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray={`3 3`} />
                    <XAxis dataKey={`name`} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Bar dataKey={`amount`} fill="#36A2EB" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export const MonthlySpendingChart = ({ records }: { records: RecordType[] }) => {

    const monthlyExpenses: any = {};

    (records ?? []).forEach((record) => {
        if (record.type === 'expense') {
            const date = new Date(record.date);
            const month = date.toLocaleString('default', { month: 'short' })
            if (!monthlyExpenses[month]) {
                monthlyExpenses[month] = {
                    month,
                    expense: 0
                }
            }
            monthlyExpenses[month].expense += record.amount;

        }
    })

    const chartData = Object.values(monthlyExpenses)

    return (
        <div className="bg-white border border-gray-400 p-5 rounded-xl mb-5">
            <h2 className="cascadia text-lg font-semibold mb-4">Monthly Spending Chart</h2>
            <ResponsiveContainer width={`100%`} height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray={`3 3`} />
                    <XAxis dataKey={`month`} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type={`monotone`} dataKey={`expense`} stroke="red" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export const ExpenseCategoryComparisonChart = ({ records }: { records: RecordType[] }) => {

    const expenses = records.filter(r => r.type === 'expense');

    const categoryTotal: any = {};

    expenses.forEach(e => categoryTotal[e.category] = (categoryTotal[e.category] || 0) + e.amount)

    const data = Object.entries(categoryTotal).map(([category,amount])=>({
        category,
        amount
    }))
    
    return (
        <div className="bg-white border border-gray-400 rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4 cascadia">Category Spending Comparison</h2>
            <ResponsiveContainer width={`100%`} height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray={`3 3`} />
                    <XAxis dataKey={`category`} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Bar dataKey={`amount`} fill="#36A2EB" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}