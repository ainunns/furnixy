import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { REGEX } from "@/Lib/regex";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      token: token,
      email: email,
      password: "",
      password_confirmation: "",
    },
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  transform((data) => {
    const resetPassData = getValues();

    data.token = token;
    data.email = resetPassData.email;
    data.password = resetPassData.password;
    data.password_confirmation = resetPassData.password_confirmation;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("password.store"), {
      onFinish: () => reset(),
    });
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Your name"
            validation={{
              required: "Name is required",
            }}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Your email"
            validation={{
              required: "Email is required",
              pattern: {
                value: REGEX.EMAIL,
                message: "Please enter a valid email address",
              },
            }}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your password"
            validation={{
              required: "Password is required",
              pattern: {
                value: REGEX.PASSWORD,
                message:
                  "Password must contain at least 8 characters, one uppercase, one lowercase, and one number",
              },
            }}
          />

          <Input
            id="password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            validation={{
              required: "Password confirmation is required",
              validate: (value) =>
                value === methods.getValues("password") ||
                "The passwords do not match",
            }}
          />

          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton type="submit" className="ms-4" disabled={processing}>
              Reset Password
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </GuestLayout>
  );
}
