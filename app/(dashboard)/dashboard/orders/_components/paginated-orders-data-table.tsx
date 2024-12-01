"use client";
import { api } from '@/convex/_generated/api';
import { usePaginatedQuery } from 'convex/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {format} from 'date-fns'
import { Badge } from '@/components/ui/badge';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ellipsis, Eye } from 'lucide-react';



const PaginatedOrdersTable = () => {

  const {results, status, loadMore, isLoading} = usePaginatedQuery(api.orders.getPaginatedOrders, {

  }, {initialNumItems: 10})

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>View Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map(order => (
            <TableRow key={order._id}>
              <TableCell>{format(order._creationTime, 'Pp')}</TableCell>
              <TableCell>
                <p>
                  {order.first_name} {order.last_name}
                </p>
                <small className='text-xs text-foreground'>{order.email}</small>
              </TableCell>
              <TableCell>
                <p className="text-xs">
                  {order.shipping_address.street}
                  <br />
                  {order.shipping_address.city},{' '}
                  {order.shipping_address.province}{' '}
                  {order.shipping_address.postal_code}
                </p>
              </TableCell>
              <TableCell>{formatPrice(order.total)}</TableCell>
              <TableCell>
                <Badge className={cn("text-xs",
                  order.status === 'pending' && 'bg-blue-500',
                  order.status === "paid" && 'bg-green-600',
                  order.status === "fulfilled" && 'bg-primary',
                  order.status === 'cancelled' && 'bg-red-600',
                )}>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/orders/${order._id}`}>
                 <Ellipsis className='cursor-pointer' />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-6 flex justify-center'>
        <Button
          onClick={() => loadMore(5)}
          className='rounded-md bg-primary px-4 py-2 text-white'
          disabled={isLoading || status === 'Exhausted'}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    </div>
  )
};
export default PaginatedOrdersTable;
