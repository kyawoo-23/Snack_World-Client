"use client";

import Image from "next/image";
import QuantityInput from "@/components/Input/QuantityInput";
import { CartProduct } from "@/prisma-types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProductFromCart } from "@/actions/cart.action";
import toast from "react-hot-toast";

type Props = {
  product: CartProduct;
};

export default function CartCard({ product }: Props) {
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(product.quantity);

  const handleRemove = () => {
    removeMutation.mutate(product.cartProductId);
  };

  const removeMutation = useMutation({
    mutationFn: (cartProductId: string) => {
      return removeProductFromCart(cartProductId);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Product removed from cart");
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <div
      key={product.cartProductId}
      className='flex products-start gap-4 py-4 border-b-2 border-accent justify-between'
    >
      <div className='flex gap-4 h-20'>
        <figure className='size-20 relative shadow'>
          <Image
            className='object-cover card'
            src={product.product.primaryImage}
            alt={product.product.name}
            fill
          />
        </figure>
        <div className='flex flex-col h-full justify-between'>
          <h4 className='text-xl font-semibold capitalize'>
            {product.product.name}
          </h4>
          <div className='flex !flex-row products-center justify-between gap-2 p-2 card bg-accent items-center'>
            <div
              className='size-4 rounded-full'
              style={{
                backgroundColor: product.productVariant.variant.color,
              }}
            ></div>
            <div className='text-md font-medium'>
              {product.productVariant.variant.name}
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start gap-10 h-20'>
        <div className='flex flex-col h-full justify-between'>
          <span className='text-xs font-semibold'>Quantity</span>
          <QuantityInput setQuantity={setQuantity} quantity={quantity} />
        </div>

        <div className='flex flex-col h-full justify-between w-20 items-end'>
          <span className='text-xl font-semibold'>
            $
            {(product.product.promotion
              ? product.product.promotionPrice || product.product.price
              : product.product.price) * quantity}
          </span>

          <button
            className='text-sm font-semibold mb-4 text-red-500 hover:text-red-700 underline underline-offset-4'
            onClick={handleRemove}
            disabled={removeMutation.isPending}
          >
            {removeMutation.isPending ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}
