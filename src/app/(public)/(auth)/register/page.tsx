"use client";

import TextInput from "@/components/Input/TextInput";
import { EMAIL_REGEX } from "@/utils/constants";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerCustomer } from "@/actions/customer.action";
import { useRouter } from "next/navigation";
import { TRegisterCustomerSchema } from "@/utils/shema/authSchema";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { COOKIE } from "@/utils/constants";
import { setLocalStorage } from "@/utils/shared/local-storage";
import { LOCAL_STORAGE } from "@/utils/constants";
import { useAuthStore } from "@/store/auth-store";

export default function Register() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const methods = useForm<TRegisterCustomerSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = methods;

  const onSubmit = (data: TRegisterCustomerSchema) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (data: TRegisterCustomerSchema) => {
      return registerCustomer(data);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        setCookie(COOKIE.TOKEN, res.data.accessToken);
        const user = {
          name: res.data.name,
          email: res.data.email,
          id: res.data.sub,
        };
        setLocalStorage(LOCAL_STORAGE.USER, JSON.stringify(user));
        setUser(user);

        toast.success(res.message);
        router.push("/");
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        className='p-4 rounded-xl w-[420px] flex flex-col gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-center font-semibold text-2xl'>Create account</h1>
        <h3 className='text-left font-medium text-lg mt-4 mb-2'>
          Register with your email address
        </h3>
        <TextInput
          name='name'
          placeholder='Full name'
          validation={{
            required: "Name is required",
          }}
        >
          <User />
        </TextInput>
        <TextInput
          name='email'
          type='email'
          placeholder='email@gmail.com'
          validation={{
            required: "Email address is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address",
            },
          }}
        >
          <Mail />
        </TextInput>
        <TextInput
          name='password'
          type='password'
          placeholder='*********'
          validation={{
            required: "Password is required",
          }}
        >
          <Lock />
        </TextInput>

        <button
          type='submit'
          className='btn btn-base-100'
          disabled={mutation.isPending}
        >
          {mutation.isPending && (
            <span className='loading loading-spinner'></span>
          )}
          Create account
        </button>

        <p className='text-center text-sm mt-3'>
          Already have an account?{" "}
          <Link href='/login' className='text-secondary-content ms-2'>
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
