"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Siswa } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteSiswaButton } from "@/components/DeleteSiswaButton";

export default function DataSiswaPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSiswa = async () => {
    try {
      const res = await fetch("/api/siswa");
      if (!res.ok) throw new Error("Gagal fetch data siswa");
      const data = await res.json();
      setSiswa(data);
    } catch (err) {
      console.error(err);
      setSiswa([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  const handleDeleteSuccess = () => {
    setLoading(true);
    fetchSiswa(); // otomatis refresh data setelah hapus
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Siswa</h1>
        <Button asChild>
          <Link href="/admin/data-siswa/tambah">Tambah Siswa</Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[150px] rounded-xl" />
          ))}
        </div>
      ) : siswa.length === 0 ? (
        <div className="text-center text-muted-foreground mt-10">
          Belum ada data siswa.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siswa.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4 space-y-1">
                <p className="font-medium">{s.nama}</p>
                <p className="text-sm text-muted-foreground">NISN: {s.nisn}</p>
                <p className="text-sm text-muted-foreground">
                  {s.tempatLahir},{" "}
                  {s.tanggalLahir
                    ? new Date(s.tanggalLahir).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/data-siswa/edit/${s.id}`}>Edit</Link>
                  </Button>
                  <DeleteSiswaButton
                    id={s.id}
                    onSuccess={handleDeleteSuccess}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
