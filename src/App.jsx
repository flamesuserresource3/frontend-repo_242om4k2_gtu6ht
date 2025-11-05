import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import LeaveForm from "./components/LeaveForm.jsx";
import LeaveList from "./components/LeaveList.jsx";
import ReturnCheck from "./components/ReturnCheck.jsx";
import StatsSummary from "./components/StatsSummary.jsx";

export default function App() {
  const [leaves, setLeaves] = useState(() => {
    try {
      const raw = localStorage.getItem("leaves");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("leaves", JSON.stringify(leaves));
    } catch {}
  }, [leaves]);

  const addLeave = (data) => setLeaves((arr) => [data, ...arr]);
  const removeLeave = (id) => setLeaves((arr) => arr.filter((a) => a.id !== id));

  const nextReturns = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return leaves
      .filter((l) => l.returnDate)
      .map((l) => ({ ...l, ts: new Date(l.returnDate).setHours(0, 0, 0, 0) }))
      .filter((l) => l.ts >= today)
      .sort((a, b) => a.ts - b.ts)
      .slice(0, 3);
  }, [leaves]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mt-6">
          <StatsSummary items={leaves} />
        </div>

        {nextReturns.length > 0 && (
          <section className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <p className="text-sm font-medium text-indigo-900">Reprises à venir</p>
            <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">
              {nextReturns.map((n) => (
                <li key={n.id} className="rounded-md bg-white p-3 text-sm shadow-sm">
                  <p className="font-medium text-gray-900">{n.employee}</p>
                  <p className="text-gray-600">{formatDate(n.returnDate)}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <LeaveForm onAdd={addLeave} />
          </div>
          <div className="md:col-span-1">
            <ReturnCheck items={leaves} />
          </div>
        </section>

        <section className="mt-8">
          <LeaveList items={leaves} onRemove={removeLeave} />
        </section>
      </main>
    </div>
  );
}

function formatDate(v) {
  try {
    return new Date(v).toLocaleDateString();
  } catch {
    return v;
  }
}
