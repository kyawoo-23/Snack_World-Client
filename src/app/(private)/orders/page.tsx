import { getCustomerOrders } from "@/actions/order.action";
import OrderList from "@/components/pages/Orders/OrderList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: () => getCustomerOrders(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderList />
    </HydrationBoundary>
  );
}
