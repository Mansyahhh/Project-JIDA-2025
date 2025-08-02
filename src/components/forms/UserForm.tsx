"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function UserForm({
  initialData,
  onSuccess,
  onClose,
}: {
  initialData?: { id?: string; name?: string; email?: string };
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialData?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { name: "", email: "", password: "" },
  });

  useEffect(() => {
    reset(initialData || { name: "", email: "", password: "" });
  }, [initialData, reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const url = initialData?.id ? `/api/users/${initialData.id}` : "/api/users";
    const method = initialData?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (!res.ok) return toast.error("Gagal menyimpan admin");

    toast.success(initialData?.id ? "Admin diperbarui" : "Admin ditambahkan");
    onSuccess();
    onClose(); // **tutup popup otomatis**
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Nama Lengkap" {...register("name")} />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          type="password"
          placeholder={isEdit ? "Password (kosong = tidak diubah)" : "Password"}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}
