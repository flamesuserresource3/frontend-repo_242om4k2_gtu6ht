import { Calendar, Clock, Users, Shield } from "lucide-react";

export default function StatsSummary({ items }) {
  const today = new Date().setHours(0, 0, 0, 0);
  const counts = items.reduce(
    (acc, it) => {
      const start = new Date(it.startDate).setHours(0, 0, 0, 0);
      const end = new Date(it.endDate).setHours(0, 0, 0, 0);
      if (today < start) acc.upcoming += 1;
      else if (today > end) acc.past += 1;
      else acc.ongoing += 1;
      acc.total += 1;
      return acc;
    },
    { total: 0, ongoing: 0, past: 0, upcoming: 0 }
  );

  const cards = [
    { title: "Employés concernés", value: new Set(items.map((i) => i.employee)).size, icon: Users, color: "bg-indigo-100 text-indigo-700" },
    { title: "Arrêts en cours", value: counts.ongoing, icon: Clock, color: "bg-amber-100 text-amber-700" },
    { title: "À venir", value: counts.upcoming, icon: Calendar, color: "bg-sky-100 text-sky-700" },
    { title: "Arrêts terminés", value: counts.past, icon: Shield, color: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.title} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className={`mb-3 inline-flex rounded-md p-2 ${c.color}`}>
            <c.icon className="h-5 w-5" />
          </div>
          <p className="text-xs text-gray-500">{c.title}</p>
          <p className="text-2xl font-semibold text-gray-900">{c.value}</p>
        </div>
      ))}
    </section>
  );
}
