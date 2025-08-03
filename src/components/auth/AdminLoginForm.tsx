"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: username,
      password: password,
    });

    if (result?.error) {
      toast.error("Username atau password salah");
      setLoading(false);
    } else {
      toast.success("Berhasil login!");
      window.location.href = "/admin"; // ⬅ reload + cookie sudah siap
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 px-4">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Logo Sekolah"
              width={80}
              height={80}
              className="rounded-full border"
            />
          </div>
          <CardTitle className="text-center text-xl font-semibold">
            Login Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="focus-visible:ring-2 focus-visible:ring-blue-500"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="focus-visible:ring-2 focus-visible:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
