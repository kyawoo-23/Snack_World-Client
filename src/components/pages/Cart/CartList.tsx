"use client";

import { getCartList } from "@/actions/cart.action";
import CartCard from "@/components/pages/Cart/CartCard";
import CartCardSkeleton from "@/components/pages/Cart/CartCardSkeleton";
import { useCheckOutStore } from "@/store/checkout-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";

const deliveryFees = 10;

export default function CartList() {
  const { setTotalPrice, setProducts } = useCheckOutStore();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartList(),
  });

  console.log(data);

  const subTotal = useMemo(() => {
    return data?.data?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [data]);

  const estimatedTax = useMemo(() => {
    return subTotal ? parseFloat((subTotal * 0.2).toFixed(2)) : 0;
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
    <>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='font-semibold text-xl'>Cart</h1>
        {data?.data && (
          <span className='font-bold'>{data?.data.length} items</span>
        )}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:gap-6 relative'>
        <section
          className={`${
            data?.data.length === 0 ? "col-span-3" : "col-span-2"
          } flex flex-col gap-2 order-2 md:order-1`}
        >
          {isLoading &&
            Array(3)
              .fill(null)
              .map((_, index) => <CartCardSkeleton key={index} />)}

          {!isLoading && data?.data.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-4 h-full mt-56'>
              <h3 className='text-lg'>No items in cart</h3>
              <Link href='/' className='btn btn-wide btn-primary'>
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              {data?.data?.map((item) => (
                <CartCard key={item.cartProductId} product={item} />
              ))}
            </>
          )}
        </section>
        {!isLoading && data && data?.data.length > 0 && (
          <section className='bg-accent text-accent-content card p-4 h-fit flex flex-col gap-2 sticky top-24 mb-6 order-1 md:order-2'>
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
        )}
      </div>
    </>
  );
}
