import { getProductDetails } from "@/actions/product.action";
import ProductDetails from "@/components/pages/Products/ProductDetails";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProductDetails(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetails id={params.id} />
    </HydrationBoundary>
  );
}
