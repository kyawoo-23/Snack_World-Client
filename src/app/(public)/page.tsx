import { getProducts } from "@/actions/product.action";
import ProductList from "@/components/pages/Products/ProductList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  );
}
