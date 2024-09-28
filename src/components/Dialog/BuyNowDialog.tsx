"use client";

import QuantityInput from "@/components/Input/QuantityInput";
import ProductVariantPill from "@/components/Pill/ProductVariantPill";
import { useAuthStore } from "@/store/auth-store";
import { useBuyNowStore } from "@/store/buyNow-store";
import { useCheckOutStore } from "@/store/checkout-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const deliveryFees = 10;

export default function BuyNowDialog() {
  const dialogRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { product } = useBuyNowStore();
  const { user } = useAuthStore();
  const { setTotalPrice, setProducts } = useCheckOutStore();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const subTotal = useMemo(() => {
    return product.price ? product.price * quantity : 0;
  }, [product.price, quantity]);

  const estimatedTax = useMemo(() => {
    return subTotal ? subTotal * 0.2 : 0;
  }, [subTotal]);

  const total = useMemo(() => {
    return subTotal ? subTotal + estimatedTax + deliveryFees : 0;
  }, [subTotal, estimatedTax]);

  const handleCheckOut = () => {
    if (!user) {
      toast.error("Please login to checkout");
      router.push("/login");
      dialogRef.current?.submit();
      return;
    }

    if (!selectedVariant) {
      setError("Please select a flavor");
      return;
    }

    setTotalPrice(total);
    setProducts([
      {
        productId: product.id,
        quantity: quantity,
        productVariantId: selectedVariant,
        variantName:
          product.variants.find(
            (variant) => variant.productVariantId === selectedVariant
          )?.variant.name || "",
        price: product.price,
      },
    ]);

    const modal = document.getElementById(
      DIALOG_TYPES.CHECKOUT
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  const handleClose = () => {
    setSelectedVariant(null);
    setQuantity(1);
    setError(null);
  };

  return (
    <dialog id={DIALOG_TYPES.BUY_NOW} className='modal'>
      <div className='modal-box !border-accent border-2'>
        <form method='dialog' ref={dialogRef}>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={handleClose}
          >
            ✕
          </button>
        </form>

        <h3 className='font-bold text-lg flex gap-2 items-center'>Buy now</h3>

        <p className='py-4 text-lg'>
          {product.name} <span className='font-medium'>(${product.price})</span>
        </p>

        <div className='flex flex-col gap-2 mt-3'>
          <h3 className='text-sm font-semibold'>
            Choose a flavor <span className='text-red-500'>*</span>
          </h3>
          <div className='flex items-center gap-3 flex-wrap'>
            {product.variants.map((variant) => (
              <ProductVariantPill
                key={variant.variantId}
                productId={product.id}
                variant={variant}
                selectedVariant={selectedVariant}
                setSelectedVariant={() => {
                  setSelectedVariant(variant.productVariantId);
                  setError(null);
                }}
              />
            ))}
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>

        <div className='flex items-center justify-between gap-2 mt-8'>
          <QuantityInput
            quantity={quantity}
            setQuantity={(_, quantity) => setQuantity(quantity)}
          />
          <button className='btn btn-wide btn-accent' onClick={handleCheckOut}>
            <ShoppingCart />
            Check out (${total})
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop' ref={dialogRef}>
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
