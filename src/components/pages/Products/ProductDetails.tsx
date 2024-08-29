"use client";

import { getProductDetails } from "@/actions/product.action";
import Carousel from "@/components/Carousel";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails({ id }: { id: string }) {
  const { data, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
  });

  const product = data?.data;

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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-weight'
                >
                  <circle cx='12' cy='5' r='3' />
                  <path d='M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z' />
                </svg>
                {product.weight}g
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  className='lucide lucide-dollar-sign'
                >
                  <line x1='12' x2='12' y1='2' y2='22' />
                  <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                </svg>
                <div className='flex items-center gap-2'>
                  <span
                    className={`${product.promotion && "line-through text-xs"}`}
                  >
                    {product.price}
                  </span>
                  {product.promotion && (
                    <div className='bg-base-100 px-2 rounded'>
                      {product.promotionPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p>{product.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
