import DangerButton from "@/Components/DangerButton";
import Input from "@/Components/Forms/Input";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm as useFormInertia } from "@inertiajs/react";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  passsword: string;
};

export default function DeleteUserForm({
  className = "",
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

  const methods = useForm<FormData>({
    mode: "onTouched",
  });

  const { handleSubmit, reset, setError, getValues } = methods;

  const {
    delete: destroy,
    processing,
    transform,
  } = useFormInertia({
    password: "",
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  transform((data) => {
    const deleteUserData = getValues();
    data.password = deleteUserData.passsword;

    return data;
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () =>
        setError("passsword", {
          type: "manual",
          message: "The provided password was incorrect.",
        }),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

        <p className="mt-1 text-sm text-gray-600">
          Once your account is deleted, all of its resources and data will be
          permanently deleted. Before deleting your account, please download any
          data or information that you wish to retain.
        </p>
      </header>

      <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete your account?
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Please enter your password to confirm you
              would like to permanently delete your account.
            </p>

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Your password"
              validation={{
                required: "Password is required",
              }}
            />

            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

              <DangerButton
                type="submit"
                className="ms-3"
                disabled={processing}
              >
                Delete Account
              </DangerButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </section>
  );
}
