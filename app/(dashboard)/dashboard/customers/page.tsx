import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/convex/_generated/api'
import { fetchQuery } from 'convex/nextjs'

const DashboardCustomersPage = async () => {
  const users = await fetchQuery(api.users.getUsers, {})

  return (
    <div>
      <h1>Customers</h1>
      <Table>

          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>

        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default DashboardCustomersPage
