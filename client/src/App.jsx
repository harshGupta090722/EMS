import { Toaster } from 'react-hot-toast'
import LoginLanding from './pages/LoginLanding'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'
import Leave from './pages/Leave'
import PaySlips from './pages/PaySlips'
import PrintPayslip from './pages/PrintPayslip'
import Settings from './pages/Settings'
import { Navigate, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />}></Route>

        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization" />}></Route>
        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account" />}></Route>

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/employees" element={<Employees />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/leave" element={<Leave />}>          </Route>
          <Route path="/payslips" element={<PaySlips />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>

        <Route path="/print-payslip/:id" element={<PrintPayslip />}></Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />}></Route>
        {/*replace removes the history of the invalid page-like it never existed*/}
      </Routes>
    </>
  )
}

export default App