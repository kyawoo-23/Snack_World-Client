"use client";

import { ProductVariant } from "@/prisma-types";

type Props = {
  productId: string;
  variant: ProductVariant;
  selectedVariant: string | null;
  setSelectedVariant: (variantId: string) => void;
};

export default function ProductVariantPill({
  productId,
  variant,
  selectedVariant,
  setSelectedVariant,
}: Props) {
  return (
    <div
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
          checked={selectedVariant === variant.productVariantId}
          onClick={() => setSelectedVariant(variant.productVariantId)}
        />
      </label>
    </div>
  );
}
