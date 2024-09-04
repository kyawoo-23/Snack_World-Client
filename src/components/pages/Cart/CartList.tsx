"use client";

import { getCartList } from "@/actions/cart.action";
import CartCard from "@/components/Card/CartCard/CartCard";
import CartCardSkeleton from "@/components/Card/CartCard/CartCardSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function CartList() {
  const { data, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartList(),
  });

  console.log(data);

  return (
    <div className='grid grid-cols-3 gap-6 relative'>
      <section className='col-span-2'>
        {isFetching &&
          Array(4)
            .fill(null)
            .map((_, index) => <CartCardSkeleton key={index} />)}

        {!isFetching &&
          data?.data?.map((item) => (
            <CartCard key={item.cartProductId} product={item} />
          ))}
      </section>
      <section className='bg-accent text-accent-content card p-4 h-fit flex flex-col gap-2 sticky top-24'>
        <h3 className='text-xl font-semibold'>Order Summary</h3>
        <hr />
        <div className='flex justify-between text-sm'>
          <span>Item(s) subtotal</span>
          <span>$0.00</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Estimated tax</span>
          <span>$5.00</span>
        </div>
        <hr />
        <div className='flex justify-between font-semibold'>
          <span>Total</span>
          <span>$5.00</span>
        </div>
        <button className='btn mt-2'>Check Out</button>
      </section>
    </div>
  );
}
