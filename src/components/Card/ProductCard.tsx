import { Product } from "@/prisma-types";
import { useBuyNowStore } from "@/store/buyNow-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard(product: Product) {
  const { setProduct } = useBuyNowStore();

  const handleBuyNow = () => {
    setProduct({
      id: product.productId,
      name: product.name,
      variants: product.productVariant,
      price: product.promotion
        ? product.promotionPrice || product.price
        : product.price,
    });
    const modal = document.getElementById(
      DIALOG_TYPES.BUY_NOW
    ) as HTMLDialogElement;
    modal?.showModal();
  };

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
      <div className='card-body group-hover:glass'>
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
          <button
            className='btn btn-base-100 btn-sm hover:scale-90 transition-transform duration-300 ease-in-out'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleBuyNow();
            }}
          >
            <ShoppingCart size={16} />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}
