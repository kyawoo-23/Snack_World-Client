"use client";

import { getCartList } from "@/actions/cart.action";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function CartList() {
  const { data, isFetching } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartList(),
  });

  console.log(data);

  return (
    <div>
      {data?.data?.map((item) => (
        <div key={item.cartProductId} className='flex items-start gap-4 py-4'>
          <figure className='size-36 relative'>
            <Image
              className='object-cover card'
              src={item.product.primaryImage}
              alt={item.product.name}
              fill
            />
          </figure>
          <div className='flex flex-col gap-2'>
            <h4 className='text-xl font-semibold capitalize'>
              {item.product.name}
            </h4>
            <div className='flex !flex-row items-center justify-between gap-3 p-2 card bg-accent'>
              <div
                className='size-6 rounded-full'
                style={{
                  backgroundColor: item.productVariant.variant.color,
                }}
              ></div>
              <div className='text-md font-medium'>
                {item.productVariant.variant.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
