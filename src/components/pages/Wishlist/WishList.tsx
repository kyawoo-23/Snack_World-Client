"use client";

import { getWishList } from "@/actions/wishlist.action";
import ProductCard from "@/components/Card/ProductCard";
import ProductCardSkeleton from "@/components/Card/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function WishList() {
  const { data, isFetching } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishList(),
  });

  console.log(data);

  return (
    <>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='font-semibold text-xl'>Wishlist</h1>
        {data?.data && (
          <span className='font-bold'>{data?.data.length} items</span>
        )}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-20'>
        {isFetching &&
          Array(8)
            .fill(null)
            .map((_, index) => <ProductCardSkeleton key={index} />)}

        {!isFetching &&
          data?.data.map((item) => (
            <ProductCard key={item.productId} product={item.product} />
          ))}
      </div>
    </>
  );
}
