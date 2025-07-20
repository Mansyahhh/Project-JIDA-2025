import { notFound } from "next/navigation";
import { GuruForm } from "@/components/guru/GuruForm";
import { GuruFormValues } from "@/types/guru";
import { toast } from "sonner";

export default async function EditGuruPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch data guru by ID
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/guru/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const data: GuruFormValues = await res.json();

  async function handleSubmit(formData: GuruFormValues) {
    "use server";
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/guru/${params.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Gagal update guru");

      toast.success("Data guru berhasil diperbarui");
    } catch (error) {
      toast.error("Gagal update guru");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Guru</h1>
      <GuruForm defaultValues={data} onSubmit={handleSubmit} />
    </div>
  );
}
