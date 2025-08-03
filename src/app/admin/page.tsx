"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  User,
  UserRound,
  UserCheck,
  DollarSign,
  CreditCard,
} from "lucide-react";

type DashboardCard = {
  title: string;
  value: string | number;
  icon: keyof typeof iconMap;
  color: string;
  valueColor?: string;
};

const iconMap = {
  Users,
  User,
  UserRound,
  UserCheck,
  DollarSign,
  CreditCard,
};

export default function AdminPage() {
  const [cards, setCards] = useState<DashboardCard[]>([]);

  useEffect(() => {
    fetch("/api/admin-dashboard")
      .then((res) => res.json())
      .then((data) => setCards(data.cards))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = iconMap[card.icon] || Users;
        return (
          <Card
            key={card.title}
            className="shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl bg-white/80 backdrop-blur"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                {card.title}
              </CardTitle>
              <Icon className={`h-10 w-10 p-2 rounded-full ${card.color}`} />
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
        );
      })}
    </div>
  );
}
