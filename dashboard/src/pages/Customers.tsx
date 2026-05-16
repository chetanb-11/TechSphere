import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

export function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Customers</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Customer management coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
