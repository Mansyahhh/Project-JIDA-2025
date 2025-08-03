// src/app/admin/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import {
  Users,
  UserCheck,
  DollarSign,
  CreditCard,
  User,
  UserRound,
} from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const totalSiswa = await prisma.siswa.count();
  const totalGuru = await prisma.guru.count();
  const totalTagihan = await prisma.tagihan.aggregate({
    _sum: { jumlah: true },
  });
  const totalPembayaran = await prisma.pembayaran.aggregate({
    _sum: { jumlahBayar: true },
  });
  const totalSiswaLaki = await prisma.siswa.count({
    where: { jenisKelamin: "Laki_laki" },
  });
  const totalSiswaPerempuan = await prisma.siswa.count({
    where: { jenisKelamin: "Perempuan" },
  });

  const cards = [
    {
      title: "Jumlah Siswa",
      value: totalSiswa,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Siswa Laki-laki",
      value: totalSiswaLaki,
      icon: User,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Siswa Perempuan",
      value: totalSiswaPerempuan,
      icon: UserRound,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Jumlah Guru",
      value: totalGuru,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Tagihan",
      value: formatRupiah(totalTagihan._sum.jumlah ?? 0),
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
      valueColor: "text-yellow-600",
    },
    {
      title: "Total Pembayaran",
      value: formatRupiah(totalPembayaran._sum.jumlahBayar ?? 0),
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
      valueColor: "text-purple-600",
    },
  ];

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="shadow-md hover:shadow-xl transition-all duration-300 
             border border-gray-100 rounded-2xl bg-white/80 backdrop-blur"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              {card.title}
            </CardTitle>
            <card.icon className={`h-10 w-10 p-2 rounded-full ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div
              className={`text-4xl font-bold transition-colors duration-300 
              ${card.valueColor ?? "text-gray-800"}`}
            >
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
