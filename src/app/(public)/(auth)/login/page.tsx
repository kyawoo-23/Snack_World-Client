"use client";

import { loginCustomer } from "@/actions/customer.action";
import TextInput from "@/components/Input/TextInput";
import { useAuthStore } from "@/store/auth-store";
import { EMAIL_REGEX } from "@/utils/constants";
import { COOKIE } from "@/utils/constants";
import { LOCAL_STORAGE } from "@/utils/constants";
import { setLocalStorage } from "@/utils/shared/local-storage";
import { TLoginCustomerSchema } from "@/utils/shema/authSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const methods = useForm<TLoginCustomerSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: TLoginCustomerSchema) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (data: TLoginCustomerSchema) => {
      return loginCustomer(data);
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
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
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
        <h1 className='text-center font-semibold text-2xl'>Welcome back</h1>
        <h3 className='text-left font-medium text-lg mt-4 mb-2'>
          Login to your account
        </h3>
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
          Login
        </button>

        <p className='text-center text-sm mt-3'>
          Don&apos;t have an account?{" "}
          <Link href='/register' className='text-secondary-content ms-2'>
            Register
          </Link>
        </p>
      </form>
    </FormProvider>
  );
}
