"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      dispatch(login({ id: "1", nama: "Admin Sekolah", role: "admin" }));
      toast.success("Berhasil login sebagai admin");
      router.push("/admin");
    } else {
      toast.error("Username atau password salah");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png" // Ganti dengan nama file logo Anda
              alt="Logo Sekolah"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-center">Login Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
