import { getCartList } from "@/actions/cart.action";
import CartList from "@/components/pages/Cart/CartList";
import { COOKIE } from "@/utils/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function page() {
  const token = getCookie(COOKIE.TOKEN, { cookies });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["cart", token],
    queryFn: () => getCartList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartList />
    </HydrationBoundary>
  );
}
