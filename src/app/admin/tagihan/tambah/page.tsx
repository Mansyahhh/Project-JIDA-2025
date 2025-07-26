"use client";

import { useRouter } from "next/navigation";
import { TagihanForm } from "@/components/forms/TagihanForm";

export default function TambahTagihanPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tambah Tagihan</h1>
      <TagihanForm
        mode="create"
        defaultValues={{
          nama: "SPP",
          deskripsi: "",
          jumlah: 0,
          berlakuUntuk: "SEMUA",
          kelas: undefined,
          siswaId: undefined,
        }}
        onSuccess={() => router.push("/admin/tagihan")}
      />
    </div>
  );
}
