// components/DeleteSiswaButton.tsx
"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  onSuccess: () => void;
}

export function DeleteSiswaButton({ id, onSuccess }: Props) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/siswa/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();

      toast.success("Siswa berhasil dihapus"); // toast hanya sekali
      if (onSuccess) onSuccess(); // onSuccess hanya refresh data atau navigate
    } catch {
      toast.error("Gagal menghapus siswa");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
          <AlertDialogDescription>
            Data siswa akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Ya, hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
