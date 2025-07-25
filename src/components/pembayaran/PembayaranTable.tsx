// /app/admin/pembayaran/components/PembayaranTable.tsx
"use client";
import { useEffect, useState } from "react";
import { PembayaranWithSiswa } from "@/types/pembayaran";
import { columns } from "./column";
import { DataTable } from "../ui/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PembayaranTable() {
  const [data, setData] = useState<PembayaranWithSiswa[]>([]);

  useEffect(() => {
    fetch("/api/pembayaran")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Data Pembayaran</h2>
        <Link href="/admin/pembayaran/tambah">
          <Button>Tambah Pembayaran</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
