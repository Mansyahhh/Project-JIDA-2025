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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function DeleteSiswaButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/siswa/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus siswa");

      toast.success("✅ Siswa berhasil dihapus");

      // Refresh seluruh halaman
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch {
      toast.error("❌ Terjadi kesalahan saat menghapus");
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
          <AlertDialogTitle>Yakin ingin menghapus siswa ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Data akan dihapus secara permanen dan tidak dapat dikembalikan.
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
