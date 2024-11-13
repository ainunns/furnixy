import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { REGEX } from "@/Lib/regex";
import { Head, Link, useForm as useFormInertia } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  transform((data) => {
    const registerData = getValues();

    data.name = registerData.name;
    data.email = registerData.email;
    data.password = registerData.password;
    data.password_confirmation = registerData.password_confirmation;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("register"), {
      onSuccess: () => toast.success("Your account has been created."),
      onError: (errors) =>
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error creating account", {
            description: value[0],
          });
        }),
      onFinish: () => reset(),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

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
            <Link
              href={route("login")}
              className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Already registered?
            </Link>

            <PrimaryButton type="submit" className="ms-4" disabled={processing}>
              Register
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </GuestLayout>
  );
}
