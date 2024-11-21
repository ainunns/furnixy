import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import Typography from "@/Components/Typography";
import UnstyledLink from "@/Components/UnstyledLink";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm as useFormInertia } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, getValues } = methods;

  const { post, processing, transform } = useFormInertia({
    email: "",
    password: "",
    remember: false,
  });

  transform((data) => {
    const loginData = getValues();
    data.email = loginData.email;
    data.password = loginData.password;
    data.remember = loginData.remember;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    post(route("login"), {
      onSuccess: () => toast.success("You have been successfully logged in."),
      onError: (errors) =>
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error logging in", {
            description: value,
          });
        }),
      onFinish: () => reset(),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Your email"
            validation={{
              required: "Email is required",
            }}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Your password"
            validation={{
              required: "Password is required",
            }}
          />
          <Typography className="text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Don't have an account?{" "}
            <span>
              <UnstyledLink
                href={route("register")}
                className="underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </UnstyledLink>
            </span>
          </Typography>

          <div className="mt-4 flex items-center justify-end">
            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Forgot your password?
              </Link>
            )}
            <PrimaryButton type="submit" className="ms-4" disabled={processing}>
              Log in
            </PrimaryButton>
          </div>
        </form>
      </FormProvider>
    </GuestLayout>
  );
}
