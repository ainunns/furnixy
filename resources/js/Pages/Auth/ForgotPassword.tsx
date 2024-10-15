import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { REGEX } from "@/Lib/regex";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export default function ForgotPassword({ status }: { status?: string }) {
  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, getValues } = methods;

  const { post, processing, transform } = useFormInertia({
    email: "",
  });

  transform((data) => {
    const forgotPassData = getValues();
    data.email = forgotPassData.email;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton type="submit" className="ms-4" disabled={processing}>
              Email Password Reset Link
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </GuestLayout>
  );
}
