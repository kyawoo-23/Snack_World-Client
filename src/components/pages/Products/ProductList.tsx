"use client";

import { getProducts } from "@/actions/product.action";
import ProductCard from "@/components/Card/ProductCard/ProductCard";
import ProductCardSkeleton from "@/components/Card/ProductCard/ProductCardSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products", debouncedSearch],
      queryFn: ({ pageParam = 0 }) => getProducts(pageParam, debouncedSearch),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <>
      <div className='flex justify-end mb-8'>
        <label className='input input-bordered flex items-center gap-2'>
          <input
            type='text'
            className='grow'
            placeholder='Search ...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size='16' />
        </label>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-20'>
        {/* Render products if data is available */}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.data.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </React.Fragment>
        ))}

        {/* Show skeletons if loading or fetching more */}
        {(isPending || isFetchingNextPage) &&
          Array(8)
            .fill(null)
            .map((_, index) => <ProductCardSkeleton key={index} />)}

        {/* No more products message */}
        {!hasNextPage && data && (
          <div className='col-span-4 mt-10 text-center text-gray-500'>
            No more products
          </div>
        )}
      </div>

      {/* Intersection observer trigger */}
      <div ref={ref} className='mt-4'></div>
    </>
  );
}
