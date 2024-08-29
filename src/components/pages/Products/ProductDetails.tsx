"use client";

import { getProductDetails } from "@/actions/product.action";
import Carousel from "@/components/Carousel";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DollarSign, Heart, ShoppingCart, Weight } from "lucide-react";

export default function ProductDetails({ id }: { id: string }) {
  const { data, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
  });

  const product = data?.data;
  console.log(product);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {isFetching && (
        <>
          <div className='h-[560px] w-full skeleton'></div>
          <div className='h-[560px] w-full skeleton'></div>
        </>
      )}

      {!isFetching && product && (
        <>
          <div>
            <Carousel
              name={product.name}
              images={[
                product.primaryImage,
                ...product.productImage.map((image) => image.image),
              ].map((image) => image.toString())}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-4xl'>{product.name}</h1>
              <button className='btn btn-circle btn-accent'>
                <Heart
                // color='red'
                //  fill='red'
                />
              </button>
            </div>
            <div className='flex items-center gap-2'>
              <div className='badge badge-accent text-accent-content badge-lg'>
                {product.vendor.name}
              </div>
              <div className='badge badge-accent text-accent-content badge-lg'>
                {product.category.name}
              </div>
            </div>

            <div className='flex items-center gap-4 my-3'>
              <div className='flex items-center gap-2'>
                <Weight />
                {product.weight}g
              </div>
              <div className='flex items-center gap-2'>
                <DollarSign />
                <div className='flex items-center gap-2 font-semibold text-lg'>
                  <span
                    className={`${product.promotion && "line-through text-xs"}`}
                  >
                    {product.price}
                  </span>
                  {product.promotion && (
                    <div className='bg-accent px-2 rounded'>
                      {product.promotionPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className='font-medium text-lg'>{product.description}</p>

            <div className='flex flex-col gap-2 mt-3'>
              <h3 className='text-lg font-semibold'>
                Choose a flavor <span className='text-red-500'>*</span>
              </h3>
              <div className='w-full flex items-center gap-3 flex-wrap'>
                {product.productVariant.map((variant) => (
                  <div
                    key={variant.productVariantId}
                    className={`form-control border-2 border-accent px-3 rounded ${
                      selectedVariant === variant.productVariantId
                        ? "bg-accent text-accent-content glass"
                        : ""
                    }`}
                  >
                    <label className='label cursor-pointer gap-3'>
                      <div
                        className='size-4 rounded-full border-base-content border-2'
                        style={{
                          backgroundColor: variant.variant.color,
                        }}
                      ></div>
                      <span className='label-text'>{variant.variant.name}</span>
                      <input
                        type='radio'
                        name='flavors'
                        className={`radio border-2`}
                        onClick={() =>
                          setSelectedVariant(variant.productVariantId)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2 mt-3'>
              <h3 className='text-lg font-semibold'>
                Select quantity <span className='text-red-500'>*</span>
              </h3>
              <div className='join items-center gap-2 w-fit rounded border-2 border-accent'>
                <button
                  className='btn join-item'
                  disabled={quantity === 1}
                  onClick={() =>
                    setQuantity((prev) => {
                      if (prev === 1) return prev;
                      return prev - 1;
                    })
                  }
                >
                  -
                </button>
                <span className='join-item min-w-8 text-center'>
                  {quantity}
                </span>
                <button
                  className='btn join-item'
                  disabled={quantity === 24}
                  onClick={() => {
                    setQuantity((prev) => {
                      if (prev === 24) return prev;
                      return prev + 1;
                    });
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button className='btn btn-wide btn-accent mt-3'>
              <ShoppingCart />
              Add to cart ($
              {quantity *
                (product.promotion
                  ? product.promotionPrice ?? product.price
                  : product.price)}
              )
            </button>
          </div>
        </>
      )}
    </div>
  );
}
