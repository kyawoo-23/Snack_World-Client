import { getCartList } from "@/actions/cart.action";
import { QueryClient } from "@tanstack/react-query";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["cart"],
    queryFn: () => getCartList(),
  });

  return <>{children}</>;
}
