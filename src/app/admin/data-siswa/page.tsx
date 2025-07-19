"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteSiswaButton } from "@/components/DeleteSiswaButton";

interface Siswa {
  id: string;
  nama: string;
  kelas: string;
  nisn: string;
  jenisKelamin?: string;
}

export default function DataSiswaPage() {
  const [data, setData] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/siswa");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Gagal memuat data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Siswa</h1>
        <Link href="/admin/data-siswa/tambah">
          <Button className="cursor-pointer">+ Tambah Siswa</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          {loading ? (
            <Skeleton className="w-full h-48" />
          ) : data.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada data siswa</p>
          ) : (
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">NISN</th>
                  <th className="p-2">Nama</th>
                  <th className="p-2">Kelas</th>
                  <th className="p-2">Jenis Kelamin</th>
                  <th className="p-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((siswa) => (
                  <tr key={siswa.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{siswa.nisn}</td>
                    <td className="p-2">{siswa.nama}</td>
                    <td className="p-2">{siswa.kelas}</td>
                    <td className="p-2">{siswa.jenisKelamin || "-"}</td>
                    <td className="p-2 text-right space-x-2">
                      <Link href={`/admin/data-siswa/edit/${siswa.id}`}>
                        <Button size="sm" variant="outline">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <DeleteSiswaButton id={siswa.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
