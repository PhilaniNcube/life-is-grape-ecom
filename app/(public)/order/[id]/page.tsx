import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import OrderSummary from "../_components/order-summary";

const OrderPage = async ({params}:{params:Promise<{id:Id<"orders">}>}) => {

  const {id} = await params

  // Fetch order by id
  const order = await fetchQuery(api.orders.getOrder, { order_id: id })
  const orderItems = await fetchQuery(api.order_items.getOrderItemsByOrderId, { orderId: id })

  if (!order) {
    return <div>Order not found</div>
  }

  if (!orderItems) {
    return <div>Order items not found</div>
  }


  return <div>
    <OrderSummary order={order} orderItems={orderItems} />
  </div>;
};
export default OrderPage;
