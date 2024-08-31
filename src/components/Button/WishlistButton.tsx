"use client";

import { useAuthStore } from "@/store/auth-store";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  productId: string;
  isWishlisted: boolean;
  setIsWishlisted: (isWishlisted: boolean) => void;
};

export default function WishlistButton({
  productId,
  isWishlisted,
  setIsWishlisted,
}: Props) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isPending, startSubmission] = useTransition();

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push("/auth/login");
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <button
      className='btn btn-square btn-sm group'
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleWishlist();
      }}
    >
      {isPending ? (
        <span className='loading loading-spinner loading-xs'></span>
      ) : (
        <Heart
          size={16}
          color={isWishlisted ? "red" : "currentColor"}
          className='group-hover:text-red-500'
          fill={isWishlisted ? "red" : "none"}
        />
      )}
    </button>
  );
}
