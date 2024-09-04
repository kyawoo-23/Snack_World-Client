"use client";

import { checkOut } from "@/actions/checkout.action";
import TextAreaInput from "@/components/Input/TextAreaInput";
import TextInput from "@/components/Input/TextInput";
import { useCheckOutStore } from "@/store/checkout-store";
import { DIALOG_TYPES } from "@/utils/constants";
import {
  TCheckOutRequest,
  TCheckOutSchema,
} from "@/utils/shema/checkOutSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CheckOutDialog() {
  const { totalPrice, products } = useCheckOutStore();

  const queryClient = useQueryClient();
  const methods = useForm<TCheckOutSchema>({
    defaultValues: {
      deliveryAddress: "",
      deliveryContact: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (schema: TCheckOutSchema) => {
    mutation.mutate({
      ...schema,
      orderCode: "ORDER-123",
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
              <button type='submit' className='btn btn-accent btn-wide'>
                Confirm
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </dialog>
  );
}
