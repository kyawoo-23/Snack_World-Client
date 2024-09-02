"use client";

import { addWishlist, removeWishlist } from "@/actions/wishlist.action";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  id?: string;
  productId: string;
  isWishlisted: boolean;
};

export default function WishlistButton({ id, productId, isWishlisted }: Props) {
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push("/auth/login");
      return;
    }

    if (isWishlisted && id) {
      removeMutation.mutate(id);
    } else {
      createMutation.mutate(productId);
    }
  };

  const removeMutation = useMutation({
    mutationFn: (id: string) => {
      return removeWishlist(id);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Removed from wishlist");
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      } else {
        toast.error(res.message);
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (productId: string) => {
      return addWishlist({
        productId,
      });
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Added to wishlist");
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <button
      className='btn btn-square btn-sm group'
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleWishlist();
      }}
    >
      {createMutation.isPending || removeMutation.isPending ? (
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
