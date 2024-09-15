"use client";

import { getProfile, updateProfile } from "@/actions/customer.action";
import TextAreaInput from "@/components/Input/TextAreaInput";
import TextInput from "@/components/Input/TextInput";
import { useAuthStore } from "@/store/auth-store";
import { EMAIL_REGEX, LOCAL_STORAGE } from "@/utils/constants";
import { getLocalStorage, setLocalStorage } from "@/utils/shared/local-storage";
import { TProfileSchema } from "@/utils/shema/profileSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock, Mail, Phone, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Profile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const { data, isFetching } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
  });

  const methods = useForm<TProfileSchema>({
    defaultValues: {
      name: data?.data.name || "",
      email: data?.data.email || "",
      password: "",
      phone: data?.data.phone || "",
      address: data?.data.address || "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data: TProfileSchema) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: (data: TProfileSchema) => {
      return updateProfile(data);
    },
    onSuccess: (res) => {
      if (res.isSuccess) {
        let sub = null;
        try {
          const storedUser = getLocalStorage(LOCAL_STORAGE.USER);
          sub = storedUser ? JSON.parse(storedUser).sub : null;
        } catch {
          sub = null;
        }

        const user = {
          name: res.data.name,
          email: res.data.email,
          id: sub,
          phone: res.data.phone,
          address: res.data.address,
        };

        setLocalStorage(LOCAL_STORAGE.USER, JSON.stringify(user));
        setUser(user);

        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
        methods.resetField("password");
      } else {
        toast.error(res.message);
      }
    },
  });

  return (
    <>
      <h2 className='text-xl font-semibold mb-6'>My Profile</h2>
      <div className='grid grid-cols-3 gap-4'>
        {data && (
          <>
            <div className='avatar'>
              <div className='mask mask-squircle size-3/4'>
                {
                  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                  <img
                    src={
                      data.data.image ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${data.data.name}`
                    }
                    className='object-cover'
                    alt={data.data.name}
                  />
                }
              </div>
            </div>
            <div className='col-span-2'>
              <FormProvider {...methods}>
                <form
                  className='grid grid-cols-2 gap-x-4'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextInput
                    name='name'
                    placeholder='Your name'
                    validation={{
                      required: "User name  is required",
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
                  >
                    <Lock />
                  </TextInput>

                  <TextInput name='phone' type='tel' placeholder='Phone number'>
                    <Phone />
                  </TextInput>

                  <div className='col-span-2'>
                    <TextAreaInput name='address' placeholder='Address' />
                  </div>

                  <div className='col-span-2 flex justify-end'>
                    <button
                      type='submit'
                      className='btn btn-wide btn-accent'
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Saving" : "Save"}
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </>
        )}
      </div>
    </>
  );
}
