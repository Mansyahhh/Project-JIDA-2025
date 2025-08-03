import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions"; // pastikan path benar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCheck,
  DollarSign,
  CreditCard,
  User,
  User2,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export default async function AdminPage() {
  // Ambil session di server
  const session = await getServerSession(authOptions);

  // Debug log (akan muncul di Vercel logs)
  console.log("Session di server:", session);

  // Kalau tidak ada session → redirect ke login
  if (!session) {
    redirect("/login");
  }

  // Ambil data dari database (langsung di server)
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
      Icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Siswa Laki-laki",
      value: totalSiswaLaki,
      Icon: User,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Siswa Perempuan",
      value: totalSiswaPerempuan,
      Icon: User2,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Total Guru",
      value: totalGuru,
      Icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Tagihan",
      value: formatRupiah(totalTagihan._sum.jumlah ?? 0),
      Icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Pembayaran",
      value: formatRupiah(totalPembayaran._sum.jumlahBayar ?? 0),
      Icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl bg-white/80 backdrop-blur"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              {card.title}
            </CardTitle>
            <card.Icon className={`h-10 w-10 p-2 rounded-full ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-800">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
