"use client";

import { getProducts } from "@/actions/product.action";
import ProductCard from "@/components/Card/ProductCard";
import ProductCardSkeleton from "@/components/Card/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function ProductList() {
  const { data, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(0),
  });

  console.log(data);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-20'>
      {isFetching &&
        Array(8)
          .fill(null)
          .map((_, index) => <ProductCardSkeleton key={index} />)}

      {!isFetching &&
        data?.data.map((product) => (
          <ProductCard key={product.productId} {...product} />
        ))}
    </div>
  );
}
