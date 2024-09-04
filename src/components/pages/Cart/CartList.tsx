"use client";

import { getCartList } from "@/actions/cart.action";
import CartCard from "@/components/Card/CartCard/CartCard";
import CartCardSkeleton from "@/components/Card/CartCard/CartCardSkeleton";
import { useCheckOutStore } from "@/store/checkout-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function CartList() {
  const { setTotalPrice, setProducts } = useCheckOutStore();
  const { data, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartList(),
  });

  console.log(data);

  const deliveryFees = 10;

  const subTotal = useMemo(() => {
    return data?.data?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [data]);

  const estimatedTax = useMemo(() => {
    return subTotal ? subTotal * 0.2 : 0;
  }, [subTotal]);

  const total = useMemo(() => {
    return subTotal ? subTotal + estimatedTax + deliveryFees : 0;
  }, [subTotal, estimatedTax]);

  const handleCheckOut = () => {
    setTotalPrice(total);
    setProducts(
      data?.data?.map((item) => {
        return {
          productId: item.product.productId,
          quantity: item.quantity,
          productVariantId: item.productVariant.productVariantId,
          variantName: item.productVariant.variant.name,
          price: item.product.price,
        };
      }) || []
    );
    const modal = document.getElementById(
      DIALOG_TYPES.CHECKOUT
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className='grid grid-cols-3 gap-6 relative'>
      <section className='col-span-2 flex flex-col gap-2'>
        {isFetching &&
          Array(3)
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
          <span>
            Item<small>(s)</small> subtotal
          </span>
          <span>${subTotal}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Delivery fees</span>
          <span>${deliveryFees}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span>Estimated tax</span>
          <span>${estimatedTax}</span>
        </div>
        <hr />
        <div className='flex justify-between font-semibold'>
          <span>Total</span>
          <span>${total}</span>
        </div>
        <button className='btn mt-2' onClick={handleCheckOut}>
          Check Out
        </button>
      </section>
    </div>
  );
}
