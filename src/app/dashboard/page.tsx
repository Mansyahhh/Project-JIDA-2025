import { pesertaDidik } from "@/data/pesertaDidik";
import KartuSiswa from "@/components/KartuSiswa";

export default function DashboardPage() {
  return (
    <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {pesertaDidik.map((s, index) => (
        <KartuSiswa key={index} {...s} />
      ))}
    </main>
  );
}
