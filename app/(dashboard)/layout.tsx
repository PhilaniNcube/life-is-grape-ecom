import { ReactNode } from 'react'
import DashboardShell from './_components/dashboard-shell'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardShell>{children}</DashboardShell>
}
export default DashboardLayout
