// /app/admin/pembayaran/components/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { PembayaranWithSiswa } from "@/types/pembayaran";
import { formatRupiah, formatTanggal } from "@/lib/formatter";
import DeletePembayaranButton from "./DeletePembayaranButton";
import Link from "next/link";

export const columns: ColumnDef<PembayaranWithSiswa>[] = [
  {
    header: "Nama Siswa",
    accessorFn: (row) => row.siswa.nama,
  },
  {
    header: "Jumlah",
    accessorFn: (row) => formatRupiah(row.jumlah),
  },
  {
    header: "Tanggal",
    accessorFn: (row) => formatTanggal(row.tanggal),
  },
  {
    header: "Keterangan",
    accessorKey: "keterangan",
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      const pembayaran = row.original;
      return (
        <div className="flex gap-2">
          <Link
            href={`/admin/pembayaran/edit/${pembayaran.id}`}
            className="text-blue-600"
          >
            Edit
          </Link>
          <DeletePembayaranButton id={pembayaran.id} />
        </div>
      );
    },
  },
];
