import { useMemo, useState } from "react";
import { Calendar, CheckCircle, Search } from "lucide-react";

function statusOf(leave) {
  const today = new Date().setHours(0, 0, 0, 0);
  const start = new Date(leave.startDate).setHours(0, 0, 0, 0);
  const end = new Date(leave.endDate).setHours(0, 0, 0, 0);
  if (today < start) return { key: "upcoming", label: "À venir", color: "bg-amber-100 text-amber-800" };
  if (today > end) return { key: "past", label: "Terminé", color: "bg-emerald-100 text-emerald-800" };
  return { key: "ongoing", label: "En cours", color: "bg-indigo-100 text-indigo-800" };
}

export default function LeaveList({ items, onRemove }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter(
      (it) =>
        it.employee.toLowerCase().includes(query) ||
        it.role.toLowerCase().includes(query) ||
        it.reason.toLowerCase().includes(query)
    );
  }, [items, q]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-semibold text-gray-900">Liste des arrêts</h2>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher (nom, fonction, motif)"
            className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500">Aucun arrêt enregistré pour le moment.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((it) => {
            const s = statusOf(it);
            return (
              <li key={it.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{it.employee}</h3>
                    <p className="text-xs text-gray-500">{it.role || "—"}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${s.color}`}>
                    {s.label}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-600">
                  <div>
                    <dt className="font-medium text-gray-700">Motif</dt>
                    <dd>{it.reason || "—"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Début</dt>
                    <dd>{formatDate(it.startDate)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Fin</dt>
                    <dd>{formatDate(it.endDate)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">Reprise prévue</dt>
                    <dd>{it.returnDate ? formatDate(it.returnDate) : "—"}</dd>
                  </div>
                </dl>
                {s.key === "past" && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    Reprise possible — pensez au contrôle de protection.
                  </div>
                )}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => onRemove(it.id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
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
