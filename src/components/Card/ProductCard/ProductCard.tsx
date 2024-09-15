"use client";

import { getWishListProduct } from "@/actions/wishlist.action";
import WishlistButton from "@/components/Button/WishlistButton";
import { Product } from "@/prisma-types";
import { useAuthStore } from "@/store/auth-store";
import { useBuyNowStore } from "@/store/buyNow-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { user } = useAuthStore();
  const { data, isFetching } = useQuery({
    queryKey: ["wishlist", product.productId],
    queryFn: () => getWishListProduct(product.productId),
    enabled: !!user,
  });

  const [wishListProductId, setWishListProductId] = useState<string | null>(
    null
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

  useEffect(() => {
    if (user && data && data.data?.wishListProductId) {
      setWishListProductId(data.data.wishListProductId);
    }
  }, [data, user]);

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
          id={wishListProductId}
          productId={product.productId}
          isWishlisted={data?.data?.wishListProductId ? true : false}
          setWishListProductId={setWishListProductId}
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
        <div
          className={`text-lg font-semibold ${
            product.promotion && "bg-success px-2"
          }`}
        >
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
