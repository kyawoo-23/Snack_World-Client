import WishlistButton from "@/components/Button/WishlistButton";
import { Product } from "@/prisma-types";
import { useBuyNowStore } from "@/store/buyNow-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard(product: Product) {
  const [isWishlisted, setIsWishlisted] = useState(
    product?.wishListProduct?.length > 0
  );
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
      className='card gap-2 bg-accent p-3 outline-none hover:outline-2 hover:outline-accent'
    >
      <div className='flex justify-between'>
        <div>
          <div>{product.vendor.name}</div>
          <div className='badge badge-base-100 text-xs'>
            {product.category.name}
          </div>
        </div>
        <WishlistButton
          productId={product.productId}
          isWishlisted={isWishlisted}
          setIsWishlisted={setIsWishlisted}
        />
      </div>
      <h2 className='card-title capitalize'>{product.name}</h2>
      <figure className='w-full h-52 relative'>
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          className='object-cover card'
        />
      </figure>

      <div className='flex justify-between items-center'>
        <div className='text-lg font-semibold'>
          $
          {product.promotion
            ? product.promotionPrice || product.price
            : product.price}
        </div>
        <button
          className='btn btn-base-100 btn-sm hover:scale-95 transition-transform duration-300 ease-in-out'
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
    </Link>
  );
}
