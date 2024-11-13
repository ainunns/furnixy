import Input from "@/Components/Forms/Input";
import PrimaryButton from "@/Components/PrimaryButton";
import { REGEX } from "@/Lib/regex";
import { Transition } from "@headlessui/react";
import { Link, useForm as useFormInertia, usePage } from "@inertiajs/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name: string;
  email: string;
};

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const { auth } = usePage().props as unknown as {
    auth: {
      user: {
        name: string;
        email: string;
        email_verified_at: string | null;
      };
    };
  };
  const user = auth.user;

  const methods = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { handleSubmit, getValues } = methods;

  const { patch, processing, transform, recentlySuccessful } = useFormInertia({
    name: user.name,
    email: user.email,
  });

  transform((data) => {
    const updateInfoData = getValues();

    data.name = updateInfoData.name;
    data.email = updateInfoData.email;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    patch(route("profile.update"), {
      onSuccess: () =>
        toast.success("Profile information successfully updated."),
      onError: (errors) =>
        Object.entries(errors).forEach(([_, value]) => {
          toast.error("Error updating profile information", {
            description: value[0],
          });
        }),
    });
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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

          {mustVerifyEmail && user.email_verified_at === null && (
            <div>
              <p className="mt-2 text-sm text-gray-800">
                Your email address is unverified.
                <Link
                  href={route("verification.send")}
                  method="post"
                  as="button"
                  className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Click here to re-send the verification email.
                </Link>
              </p>

              {status === "verification-link-sent" && (
                <div className="mt-2 text-sm font-medium text-green-600">
                  A new verification link has been sent to your email address.
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4">
            <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
