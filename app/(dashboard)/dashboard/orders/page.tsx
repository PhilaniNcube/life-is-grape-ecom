import { Suspense } from "react";
import OrdersAnalytics from "./_components/orders-analytics";
import { Card, CardContent } from "@/components/ui/card";
import PaginatedOrdersTable from "./_components/paginated-orders-data-table";

const DashboardOrdersPage = () => {
  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold'>Orders</h1>
      <Suspense
        fallback={
          <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className='p-8 text-2xl font-bold'>Loading...</div>
              </CardContent>
            </Card>
          </div>
        }
      >
        <OrdersAnalytics />
      </Suspense>
      <div className='mt-6'>
        <PaginatedOrdersTable />
      </div>
    </div>
  )
};
export default DashboardOrdersPage;
