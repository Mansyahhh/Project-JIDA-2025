import { SiswaForm } from "@/components/admin/siswa/SiswaForm";
import { SiswaFormValues } from "@/types/siswa";

interface PageProps {
  params: { id: string };
}

export default async function EditSiswaPage({ params }: PageProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/siswa/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="p-4 text-red-500">Data tidak ditemukan</div>;
  }

  const siswa: SiswaFormValues = await res.json();

  return <SiswaForm defaultValues={siswa} mode="edit" />;
}
