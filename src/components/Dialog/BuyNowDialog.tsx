"use client";

import QuantityInput from "@/components/Input/QuantityInput";
import ProductVariantPill from "@/components/Pill/ProductVariantPill";
import { useBuyNowStore } from "@/store/buyNow-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function BuyNowDialog() {
  const { product } = useBuyNowStore();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <dialog id={DIALOG_TYPES.BUY_NOW} className='modal'>
      <div className='modal-box !border-accent border-2'>
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
                setSelectedVariant={setSelectedVariant}
              />
            ))}
          </div>
        </div>

        <div className='flex items-center justify-between gap-2 mt-8'>
          <QuantityInput
            quantity={quantity}
            setQuantity={(_, quantity) => setQuantity(quantity)}
          />
          <button className='btn btn-wide btn-accent'>
            <ShoppingCart />
            Check out (${quantity * product.price})
          </button>
        </div>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  );
}
