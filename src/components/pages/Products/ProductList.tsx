"use client";

import { getProducts } from "@/actions/product.action";
import ProductCard from "@/components/Card/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/Card/ProductCard/ProductCardSkeleton";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function ProductList() {
  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam = 0 }) => getProducts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined;
      },
    });

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-20'>
      {isPending &&
        Array(8)
          .fill(null)
          .map((_, index) => <ProductCardSkeleton key={index} />)}

      {!isPending && (
        <>
          {data?.pages.map((page) => (
            <>
              {page.data.data.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </>
          ))}
          <div ref={ref} className='w-full h-4 col-span-4'>
            <div className='flex justify-center'>
              {isFetchingNextPage && (
                <span className='loading loading-spinner loading-md'></span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
