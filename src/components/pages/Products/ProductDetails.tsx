/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { getProductDetails } from "@/actions/product.action";
import Carousel from "@/components/Carousel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DollarSign, Heart, ShoppingCart, Weight } from "lucide-react";
import ProductVariantPill from "@/components/Pill/ProductVariantPill";
import QuantityInput from "@/components/Input/QuantityInput";
import WishlistButton from "@/components/Button/WishlistButton";
import { useAuthStore } from "@/store/auth-store";
import { getWishListProduct } from "@/actions/wishlist.action";
import toast from "react-hot-toast";
import { TCartProductRequest } from "@/models/cart.model";
import { addProductToCart } from "@/actions/cart.action";
import { getProductPrice } from "@/utils/shared";

export default function ProductDetails({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { data, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
  });

  const product = data?.data;
  console.log(product);

  if (!product) {
    return <div>Product not found</div>;
  }

  const { data: wishListData } = useQuery({
    queryKey: ["wishlist", product.productId],
    queryFn: () => getWishListProduct(product.productId),
    enabled: !!user,
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [wishListProductId, setWishListProductId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (product && user && wishListData?.data?.wishListProductId) {
      setWishListProductId(wishListData?.data.wishListProductId);
    }
  }, [product, user, wishListData?.data?.wishListProductId]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    const cartProduct: TCartProductRequest = {
      productId: product.productId,
      productVarinatId: selectedVariant,
      quantity,
    };

    addToCartMutation.mutate(cartProduct);
  };

  const addToCartMutation = useMutation({
    mutationFn: (cartProduct: TCartProductRequest) => {
      return addProductToCart(cartProduct);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Added to cart");
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {isFetching && (
        <>
          <div className='h-[560px] w-full skeleton'></div>
          <div className='h-[560px] w-full skeleton'></div>
        </>
      )}

      {!isFetching && product && (
        <>
          <div>
            <Carousel
              name={product.name}
              images={[
                product.primaryImage,
                ...product.productImage.map((image) => image.image),
              ].map((image) => image.toString())}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <h1 className='font-bold text-4xl'>{product.name}</h1>
              <WishlistButton
                id={wishListProductId}
                isWishlisted={
                  wishListData?.data?.wishListProductId ? true : false
                }
                productId={product.productId}
                setWishListProductId={setWishListProductId}
              />
            </div>
            <div className='flex items-center gap-2'>
              <div className='badge badge-accent text-accent-content badge-lg'>
                {product.vendor.name}
              </div>
              <div className='badge badge-accent text-accent-content badge-lg'>
                {product.category.name}
              </div>
            </div>

            <div className='flex items-center gap-4 my-3'>
              <div className='flex items-center gap-2'>
                <Weight />
                {product.weight}g
              </div>
              <div className='flex items-center gap-2'>
                <DollarSign />
                <div className='flex items-center gap-2 font-semibold text-lg'>
                  <span
                    className={`${product.promotion && "line-through text-xs"}`}
                  >
                    {product.price}
                  </span>
                  {product.promotion && (
                    <div className='bg-accent px-2 rounded'>
                      {product.promotionPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className='font-medium text-lg'>{product.description}</p>

            <div className='flex flex-col gap-2 mt-3'>
              <h3 className='text-lg font-semibold'>
                Choose a flavor <span className='text-red-500'>*</span>
              </h3>
              <div className='w-full flex items-center gap-3 flex-wrap'>
                {product.productVariant.map((variant) => (
                  <ProductVariantPill
                    productId={product.productId}
                    key={variant.variantId}
                    variant={variant}
                    selectedVariant={selectedVariant}
                    setSelectedVariant={setSelectedVariant}
                  />
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-2 mt-3'>
              <h3 className='text-lg font-semibold'>
                Select quantity <span className='text-red-500'>*</span>
              </h3>
              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </div>

            <button
              className='btn btn-wide btn-accent mt-3'
              onClick={handleAddToCart}
            >
              <ShoppingCart />
              {addToCartMutation.isPending ? "Adding..." : "Add to cart"}
              ($
              {getProductPrice(product, quantity)})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
