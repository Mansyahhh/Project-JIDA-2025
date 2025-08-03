// src/app/admin/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  User,
  User2,
  UserCheck,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const [
    totalSiswa,
    totalGuru,
    totalTagihan,
    totalPembayaran,
    totalSiswaLaki,
    totalSiswaPerempuan,
  ] = await Promise.all([
    prisma.siswa.count(),
    prisma.guru.count(),
    prisma.tagihan.aggregate({ _sum: { jumlah: true } }),
    prisma.pembayaran.aggregate({ _sum: { jumlahBayar: true } }),
    prisma.siswa.count({ where: { jenisKelamin: "Laki_laki" } }),
    prisma.siswa.count({ where: { jenisKelamin: "Perempuan" } }),
  ]);

  const cards = [
    {
      title: "Jumlah Siswa",
      value: totalSiswa ?? 0,
      Icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Siswa Laki-laki",
      value: totalSiswaLaki ?? 0,
      Icon: User,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Siswa Perempuan",
      value: totalSiswaPerempuan ?? 0,
      Icon: User2,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Total Guru",
      value: totalGuru ?? 0,
      Icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Tagihan",
      value: formatRupiah(totalTagihan._sum.jumlah ?? 0),
      Icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
      valueColor: "text-yellow-600",
    },
    {
      title: "Total Pembayaran",
      value: formatRupiah(totalPembayaran._sum.jumlahBayar ?? 0),
      Icon: CreditCard,
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
            <card.Icon className={`h-10 w-10 p-2 rounded-full ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div
              className={`text-4xl font-bold transition-colors duration-300 ${
                card.valueColor ?? "text-gray-800"
              }`}
            >
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
