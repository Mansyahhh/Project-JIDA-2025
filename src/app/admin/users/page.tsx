"use client";

import { useState } from "react";
import useSWR from "swr";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "@/components/forms/UserForm";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const { data: users, mutate } = useSWR<User[]>("/api/users", fetcher);
  const [openAdd, setOpenAdd] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus admin ini?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Admin dihapus");
      mutate();
    } else {
      toast.error("Gagal menghapus admin");
    }
  };

  if (!users) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Manajemen Admin</CardTitle>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpenAdd(true)}>Tambah Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Admin Baru</DialogTitle>
            </DialogHeader>
            <UserForm onSuccess={mutate} onClose={() => setOpenAdd(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 space-x-2">
                  <Dialog
                    open={editUser?.id === u.id}
                    onOpenChange={(isOpen) =>
                      !isOpen ? setEditUser(null) : setEditUser(u)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditUser(u)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Admin</DialogTitle>
                      </DialogHeader>
                      <UserForm
                        initialData={u}
                        onSuccess={mutate}
                        onClose={() => setEditUser(null)}
                      />
                    </DialogContent>
                  </Dialog>

                  <ConfirmDialog
                    title={`Hapus admin ${u.name}?`}
                    onConfirm={() => handleDelete(u.id)}
                    trigger={
                      <Button variant="destructive" size="sm">
                        Hapus
                      </Button>
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
