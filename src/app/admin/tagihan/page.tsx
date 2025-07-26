"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { DeleteTagihanButton } from "@/components/admin/DeleteTagihanButton";

type Tagihan = {
  id: string;
  nama: string;
  jumlah: number;
  berlakuUntuk: "SEMUA" | "KELAS" | "SISWA";
  kelas?: string | null;
  siswaId?: string | null;
  deskripsi?: string | null;
};

export default function TagihanPage() {
  const [tagihan, setTagihan] = useState<Tagihan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/tagihan");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTagihan(data);
    } catch {
      toast.error("Gagal memuat data tagihan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Daftar Tagihan</CardTitle>
        <Link href="/admin/tagihan/tambah">
          <Button>Tambah Tagihan</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {tagihan.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Tidak ada tagihan</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Nama</th>
                  <th className="text-left px-4 py-2 font-medium">Jumlah</th>
                  <th className="text-left px-4 py-2 font-medium">
                    Berlaku Untuk
                  </th>
                  <th className="text-left px-4 py-2 font-medium">
                    Kelas/Siswa
                  </th>
                  <th className="text-right px-4 py-2 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2">
                      {t.nama === "Lainnya" && t.deskripsi
                        ? `${t.nama} (${t.deskripsi})`
                        : t.nama}
                    </td>
                    <td className="px-4 py-2">
                      Rp {t.jumlah.toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-2">{t.berlakuUntuk}</td>
                    <td className="px-4 py-2">{t.kelas || t.siswaId || "-"}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Link href={`/admin/tagihan/edit/${t.id}`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>
                      <DeleteTagihanButton id={t.id} onDeleted={fetchData} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
