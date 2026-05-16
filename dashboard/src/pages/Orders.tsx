import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Order management coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
