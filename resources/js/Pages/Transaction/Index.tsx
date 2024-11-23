import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TransactionType } from "@/types/entities/transaction";
import { Head } from "@inertiajs/react";

export default function TransactionIndex({
  transaction,
}: { transaction: TransactionType[] }) {
  return (
    <AuthenticatedLayout>
      <Head title="Order List" />
      <pre>{JSON.stringify(transaction, null, 2)}</pre>
    </AuthenticatedLayout>
  );
}
