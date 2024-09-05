"use client";

import Image from "next/image";
import QuantityInput from "@/components/Input/QuantityInput";
import { CartProduct } from "@/prisma-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "@/actions/cart.action";
import toast from "react-hot-toast";
import { getProductPrice } from "@/utils/shared";
import Link from "next/link";
import { MouseEvent } from "react";
import ProductVariantPillView from "@/components/Pill/ProductVariantPillView";

type Props = {
  product: CartProduct;
};

export default function CartCard({ product }: Props) {
  const queryClient = useQueryClient();

  const handleQuantity = (
    e: MouseEvent<HTMLButtonElement>,
    newQuantity: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantityMutation.mutate({
      cartProductId: product.cartProductId,
      quantity: newQuantity,
    });
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeMutation.mutate(product.cartProductId);
  };

  const updateQuantityMutation = useMutation({
    mutationFn: (request: { cartProductId: string; quantity: number }) => {
      return updateProductQuantity(request.cartProductId, request.quantity);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Quantity updated");
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      } else {
        toast.error(res.message);
      }
    },
  });

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
    <Link
      href={`/product/${product.product.productId}`}
      key={product.cartProductId}
      className='flex products-start gap-4 py-4 border-b-2 border-accent justify-between group'
    >
      <div className='flex gap-4 h-28'>
        <figure className='size-28 relative shadow group-hover:scale-95 transition-all'>
          <Image
            className='object-cover card'
            src={product.product.primaryImage}
            alt={product.product.name}
            fill
          />
        </figure>
        <div className='flex flex-col h-full justify-between gap-2'>
          <h4 className='text-xl font-semibold capitalize'>
            {product.product.name}
          </h4>
          <div className='badge badge-accent badge-sm'>
            {product.product.vendor.name}
          </div>
          <ProductVariantPillView
            color={product.productVariant.variant.color}
            name={product.productVariant.variant.name}
          />
        </div>
      </div>

      <div className='flex gap-8 h-28'>
        <div className='flex flex-col h-full w-36 gap-3 justify-center'>
          <span className='text-xs font-semibold'>Quantity</span>
          {updateQuantityMutation.isPending ? (
            <div className='mb-6'>
              <span className='loading loading-dots loading-md'></span>
            </div>
          ) : (
            <QuantityInput
              setQuantity={handleQuantity}
              quantity={product.quantity}
            />
          )}
        </div>

        <div className='flex flex-col h-full justify-between w-28 items-end'>
          <span className='text-xl font-semibold'>
            ${getProductPrice(product.product, product.quantity)}
          </span>

          <button
            className='text-sm font-semibold mb-4 text-red-500 hover:text-red-700 underline underline-offset-4'
            onClick={handleRemove}
            disabled={removeMutation.isPending}
          >
            {removeMutation.isPending ? (
              <div className='mt-4'>
                <span className='loading loading-dots loading-md'></span>
              </div>
            ) : (
              "Remove"
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
