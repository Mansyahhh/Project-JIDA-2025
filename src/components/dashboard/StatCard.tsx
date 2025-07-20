// components/dashboard/StatCard.tsx
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className="shadow-md rounded-2xl p-4">
      <CardContent>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
