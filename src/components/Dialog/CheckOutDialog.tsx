"use client";

import { checkOut } from "@/actions/order.action";
import { getProfile } from "@/actions/customer.action";
import TextAreaInput from "@/components/Input/TextAreaInput";
import TextInput from "@/components/Input/TextInput";
import { useCheckOutStore } from "@/store/checkout-store";
import { DIALOG_TYPES } from "@/utils/constants";
import { generateOrderCode } from "@/utils/shared";
import {
  TCheckOutRequest,
  TCheckOutSchema,
} from "@/utils/shema/checkOutSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckOutDialog() {
  const router = useRouter();
  const { totalPrice, products } = useCheckOutStore();

  const { data: profile, isSuccess } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  const methods = useForm<TCheckOutSchema>({
    defaultValues: {
      deliveryAddress: profile?.data.address || "",
      deliveryContact: profile?.data.phone || "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (isSuccess && profile?.data) {
      reset({
        deliveryAddress: profile.data.address || "",
        deliveryContact: profile.data.phone || "",
      });
    }
  }, [isSuccess, profile, reset]);

  const onSubmit = (schema: TCheckOutSchema) => {
    mutation.mutate({
      ...schema,
      orderCode: generateOrderCode(),
      isPrepaid: false,
      totalPrice,
      deliveryPrice: 10,
      products,
    });
  };

  const mutation = useMutation({
    mutationFn: (data: TCheckOutRequest) => {
      return checkOut(data);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        toast.success("Order placed successfully");
        router.push("/orders");
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <dialog id={DIALOG_TYPES.CHECKOUT} className='modal'>
      <div className='modal-box !border-accent border-2'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>

        <FormProvider {...methods}>
          <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='font-bold text-lg flex gap-2 items-center mb-5'>
              Checkout confirmation
            </h3>

            <TextInput
              name='deliveryContact'
              placeholder='Your contact number'
              type='tel'
              validation={{
                required: "Contact number is required",
              }}
            >
              <Phone />
            </TextInput>

            <TextAreaInput
              name='deliveryAddress'
              placeholder='Shipping address'
              validation={{
                required: "Shipping address is required",
              }}
            />

            <div className='flex justify-between items-center mt-2'>
              <span className='text-lg font-bold'>Total: ${totalPrice}</span>
              <button
                type='submit'
                className='btn btn-accent btn-wide'
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Loading..." : "Confirm"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </dialog>
  );
}
