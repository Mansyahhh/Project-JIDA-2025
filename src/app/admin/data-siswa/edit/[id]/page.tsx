export const dynamic = "force-dynamic"; // ⬅️ Tambahkan baris ini

import { SiswaForm } from "@/components/admin/siswa/SiswaForm";
import { SiswaFormValues } from "@/types/siswa";

interface PageProps {
  params: { id: string };
}

export default async function EditSiswaPage(props: PageProps) {
  const { id } = props.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/siswa/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="p-4 text-red-500">Data tidak ditemukan</div>;
  }

  const dataSiswa: SiswaFormValues = await res.json();

  return <SiswaForm defaultValues={dataSiswa} mode="edit" />;
}
