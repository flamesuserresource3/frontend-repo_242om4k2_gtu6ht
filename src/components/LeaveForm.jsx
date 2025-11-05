import { useState } from "react";
import { Calendar, Plus } from "lucide-react";

export default function LeaveForm({ onAdd }) {
  const [form, setForm] = useState({
    employee: "",
    role: "",
    reason: "",
    startDate: "",
    endDate: "",
    returnDate: "",
  });

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.employee || !form.startDate || !form.endDate) return;
    const id = crypto.randomUUID();
    const payload = {
      id,
      ...form,
      createdAt: new Date().toISOString(),
    };
    onAdd(payload);
    setForm({ employee: "", role: "", reason: "", startDate: "", endDate: "", returnDate: "" });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-indigo-600" />
        <h2 className="text-base font-semibold text-gray-900">Nouvel arrêt</h2>
      </div>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <div className="md:col-span-2">
          <Label>Employé</Label>
          <input
            name="employee"
            value={form.employee}
            onChange={update}
            placeholder="Nom et prénom"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Fonction</Label>
          <input
            name="role"
            value={form.role}
            onChange={update}
            placeholder="Ex: Infirmier, Opérateur"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Motif</Label>
          <input
            name="reason"
            value={form.reason}
            onChange={update}
            placeholder="Ex: Accident, Maladie, Covid"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Début</Label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Fin</Label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Date de reprise (prévue)</Label>
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none"
          >
            <Plus className="h-4 w-4" />
            Ajouter l'arrêt
          </button>
        </div>
      </form>
    </div>
  );
}

function Label({ children }) {
  return <label className="mb-1 block text-xs font-medium text-gray-600">{children}</label>;
}
