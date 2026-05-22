const metrics = [
  { label: "Orders Today", value: "0" },
  { label: "Pending Payments", value: "$0.00" },
  { label: "Deliveries Scheduled", value: "0" },
];

export default function DashboardPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {metric.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
