import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm as useFormInertia } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  password: string;
};

export default function ConfirmPassword() {
  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia({
    password: "",
  });

  transform((data) => {
    const confirmPassData = getValues();
    data.password = confirmPassData.password;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("password.confirm"), {
      onSuccess: () => toast.success("Password successfully confirmed."),
      onError: (errors) =>
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error confirming password", {
            description: value[0],
          });
        }),
      onFinish: () => reset(),
    });
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <div className="mb-4 text-sm text-gray-600">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your password"
            validation={{
              required: "Password is required",
            }}
          />
          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton type="submit" className="ms-4" disabled={processing}>
              Confirm
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </GuestLayout>
  );
}
