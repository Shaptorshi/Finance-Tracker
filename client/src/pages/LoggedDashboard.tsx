import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import LoggedNavbar from '../components/LoggedNavbar'
// import FinanceDashboard from '../pages/FinanceDashboard'
const LoggedDashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <SideBar />
      <div className='flex flex-col flex-1 p-5'>
        <LoggedNavbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LoggedDashboard
