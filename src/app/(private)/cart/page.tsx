import { getCartList } from "@/actions/cart.action";
import CartList from "@/components/pages/Cart/CartList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["cart"],
    queryFn: () => getCartList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartList />
    </HydrationBoundary>
  );
}
