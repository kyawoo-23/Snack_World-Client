"use client";

type Props = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuantityInput({ quantity, setQuantity }: Props) {
  return (
    <div className='join items-center gap-2 w-fit rounded border-2 border-accent'>
      <button
        className='btn join-item'
        disabled={quantity === 1}
        onClick={() =>
          setQuantity((prev) => {
            if (prev === 1) return prev;
            return prev - 1;
          })
        }
      >
        -
      </button>
      <span className='join-item min-w-8 text-center'>{quantity}</span>
      <button
        className='btn join-item'
        disabled={quantity === 24}
        onClick={() => {
          setQuantity((prev) => {
            if (prev === 24) return prev;
            return prev + 1;
          });
        }}
      >
        +
      </button>
    </div>
  );
}
