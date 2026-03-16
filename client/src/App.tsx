import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import LoggedDashboard from './pages/LoggedDashboard'
import FinanceDashboard from './pages/FinanceDashboard'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Debts from './pages/Debts'
import Categories from './pages/Categories'
import Settings from './pages/Settings'

function App() {

  return (
    <>
      <ToastContainer autoClose={2500} />
      <Routes>
        <Route element={<Dashboard />} path='/' />
        <Route element={<LoggedDashboard />} path='/logged'>
          {/* relative paths which is nested route also known to be child route */}
          {/* known to be child paths and the normal paths are known to be relative paths */}
          <Route index element={<FinanceDashboard />} />
          <Route element={<Transactions />} path='transactions' />
          <Route element={<Analytics />} path='analytics' />
          <Route element={<Debts />} path='debts' />
          <Route element={<Categories />} path='categories' />
          <Route element={<Settings />} path='settings' />
        </Route>
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
      </Routes>
    </>
  )
}

export default App
