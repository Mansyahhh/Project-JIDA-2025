import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteGuruButton from "@/components/guru/DeleteGuruButton"; // Pastikan file ini sudah ada

export default async function DataGuruPage() {
  const guru = await prisma.guru.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Guru</h1>
        <Link href="/admin/data-guru/tambah">
          <Button>Tambah Guru</Button>
        </Link>
      </div>

      {guru.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Belum ada data guru</CardTitle>
            <CardDescription>
              Silakan tambahkan data guru terlebih dahulu.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guru.map((g) => (
            <Card key={g.id}>
              <CardHeader>
                <CardTitle>{g.nama}</CardTitle>
                <CardDescription>{g.tipePegawai}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Jenis Kelamin: {g.jenisKelamin}</p>
                <p>{g.pendidikanTerakhir}</p>

                <p>Email: {g.email ?? "-"}</p>
                <p>No. Telepon: {g.phone ?? "-"}</p>
                <div className="flex gap-2 pt-2">
                  <Link href={`/admin/data-guru/edit/${g.id}`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <DeleteGuruButton id={g.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
