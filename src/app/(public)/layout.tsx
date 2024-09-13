import { getCartList } from "@/actions/cart.action";
import BuyNowDialog from "@/components/Dialog/BuyNowDialog";
import { COOKIE } from "@/utils/constants";
import { QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getCookie(COOKIE.TOKEN, { cookies });
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["cart", token],
    queryFn: () => getCartList(),
  });

  return (
    <>
      {children}
      <BuyNowDialog />
    </>
  );
}
