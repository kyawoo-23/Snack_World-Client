import { Product } from "@/prisma-types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(product: Product) {
  return (
    <Link
      href={`product/${product.productId}`}
      className='card card-compact bg-accent text-accent-content shadow-xl group hover:ring-2 ring-primary ring-opacity-50'
    >
      <figure className='w-full h-56 relative'>
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title capitalize'>{product.name}</h2>
        <div className='flex items-center gap-2 flex-wrap'>
          <div className='badge badge-base-100 text-xs'>
            {product.vendor.name}
          </div>
          <div className='badge badge-base-100 text-xs'>
            {product.category.name}
          </div>
        </div>
        <p className='line-clamp-2'>{product.description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-base-100 btn-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-shopping-cart'
            >
              <circle cx='8' cy='21' r='1' />
              <circle cx='19' cy='21' r='1' />
              <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
