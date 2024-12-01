import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from "@/lib/utils";

const OrdersAnalytics = async () => {

  const ordersData = fetchQuery(api.orders.getPaidOrders)
  const orderItemData = fetchQuery(api.order_items.getOrderItems)

  const [orders, orderItems] = await Promise.allSettled([ordersData, orderItemData])
  console.log(orders, orderItems)

  // calculate the number of total orders
  const totalOrders = orders.status === 'fulfilled' ? orders.value.length : 0

  // calculate the number of total order items
  const totalOrderItems = orderItems.status === 'fulfilled' ? orderItems.value.length : 0

  // calculate the total revenue
  const totalRevenue = orderItems.status === 'fulfilled' ? orderItems.value.reduce((acc, orderItem) => {
    const price = orderItem.quantity * orderItem.variant.price
    return acc + (orderItem.gift_box ? price + orderItem.gift_box.price : price)
  }, 0) : 0

  // calculate the average order value
  const averageOrderValue = totalRevenue / totalOrders




  return (
    <div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Paid Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalOrders}</div>

          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Items Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalOrderItems}</div>

          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatPrice(averageOrderValue)}
            </div>

          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatPrice(totalRevenue)}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
};
export default OrdersAnalytics;
