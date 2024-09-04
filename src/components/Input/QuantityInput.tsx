"use client";

import { MouseEvent } from "react";

type Props = {
  quantity: number;
  setQuantity: (e: MouseEvent<HTMLButtonElement>, value: number) => void;
};

export default function QuantityInput({ quantity, setQuantity }: Props) {
  return (
    <div className='join items-center gap-2 w-fit rounded border-2 border-accent'>
      <button
        className='btn join-item'
        disabled={quantity === 1}
        onClick={(e) => setQuantity(e, quantity - 1)}
      >
        -
      </button>
      <span className='join-item min-w-8 text-center'>{quantity}</span>
      <button
        className='btn join-item'
        disabled={quantity === 24}
        onClick={(e) => setQuantity(e, quantity + 1)}
      >
        +
      </button>
    </div>
  );
}
