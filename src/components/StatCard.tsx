import { Card, CardContent } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
}

export const StatCard = ({ title, value, subtitle }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="text-3xl font-bold text-primary mb-2">{value}</div>
        <div className="text-lg font-semibold mb-1">{title}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
};