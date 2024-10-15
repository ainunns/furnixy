import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import { REGEX } from "@/Lib/regex";
import { Transition } from "@headlessui/react";
import { useForm as useFormInertia } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export default function UpdatePasswordForm({
  className = "",
}: {
  className?: string;
}) {
  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { put, processing, recentlySuccessful, transform } = useFormInertia({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  transform((data) => {
    const updatePassData = getValues();

    data.current_password = updatePassData.current_password;
    data.password = updatePassData.password;
    data.password_confirmation = updatePassData.password_confirmation;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

        <p className="mt-1 text-sm text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <Input
            id="current_password"
            label="Current Password"
            type="password"
            placeholder="Current Password"
            validation={{
              required: "Password is required",
            }}
          />

          <Input
            id="password"
            label="New Password"
            type="password"
            placeholder="Current Password"
            validation={{
              required: "Password is required",
              pattern: {
                value: REGEX.PASSWORD,
                message:
                  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
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

          <div className="flex items-center gap-4">
            <PrimaryButton type="submit" disabled={processing}>
              Save
            </PrimaryButton>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
