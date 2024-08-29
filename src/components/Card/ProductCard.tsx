import { Product } from "@/prisma-types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(product: Product) {
  return (
    <div className='card card-compact bg-accent text-accent-content shadow-xl'>
      <figure className='w-full h-56 relative'>
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          className='object-cover'
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
          <Link
            href={`product/${product.productId}`}
            className='btn btn-base-100 btn-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
