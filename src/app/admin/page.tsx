"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type DashboardCard = {
  title: string;
  value: string | number;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  valueColor?: string;
};

export default function AdminPage() {
  const { status } = useSession(); // session dihapus karena tidak dipakai
  const router = useRouter();
  const [cards, setCards] = useState<DashboardCard[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") {
      fetch("/api/admin-dashboard")
        .then((res) => res.json())
        .then((data) => setCards(data.cards))
        .catch(console.error);
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-6 text-center text-lg">Memeriksa sesi...</div>;
  }

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
