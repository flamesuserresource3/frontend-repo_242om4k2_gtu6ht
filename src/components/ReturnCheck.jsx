import { useMemo, useState } from "react";
import { Shield, Stethoscope, CheckCircle, AlertCircle } from "lucide-react";

export default function ReturnCheck({ items }) {
  const employees = useMemo(() => {
    const names = Array.from(new Set(items.map((i) => i.employee))).sort();
    return names;
  }, [items]);

  const [data, setData] = useState({
    employee: "",
    exposure: "low", // low | medium | high
    roleRisk: "standard", // standard | patientFacing | industrial
    medicalNote: "none", // none | visor | mask | both
  });

  const update = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const recommendation = useMemo(() => {
    // Simple rules-based suggestion
    // Prioritise explicit medical recommendation
    if (data.medicalNote === "visor" || data.medicalNote === "both") {
      return { need: true, reason: "Recommandation médicale explicite." };
    }
    // Exposure and role risks
    const highRisk = data.exposure === "high" || data.roleRisk === "patientFacing";
    const mediumRisk = data.exposure === "medium" || data.roleRisk === "industrial";
    if (highRisk) return { need: true, reason: "Risque d'exposition élevé (poste en contact ou exposition forte)." };
    if (mediumRisk) return { need: true, reason: "Risque modéré — visière recommandée en complément du masque." };
    return { need: false, reason: "Risque faible — visière non nécessaire par défaut." };
  }, [data]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-indigo-600" />
        <h2 className="text-base font-semibold text-gray-900">Vérification de la visière au retour</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <Label>Employé</Label>
          <select
            name="employee"
            value={data.employee}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="">Sélectionner…</option>
            {employees.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <Label>Niveau d'exposition</Label>
          <select
            name="exposure"
            value={data.exposure}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="low">Faible</option>
            <option value="medium">Modéré</option>
            <option value="high">Élevé</option>
          </select>
        </div>
        <div>
          <Label>Type de poste</Label>
          <select
            name="roleRisk"
            value={data.roleRisk}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="standard">Standard</option>
            <option value="patientFacing">Au contact de patients / public</option>
            <option value="industrial">Industriel / poussières / projections</option>
          </select>
        </div>
        <div>
          <Label>Note du médecin du travail</Label>
          <select
            name="medicalNote"
            value={data.medicalNote}
            onChange={update}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          >
            <option value="none">Aucune</option>
            <option value="mask">Masque uniquement</option>
            <option value="visor">Visière</option>
            <option value="both">Masque + Visière</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        {recommendation.need ? (
          <div className="flex items-start gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
            <Stethoscope className="mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Visière recommandée au retour</p>
              <p className="text-xs opacity-90">{recommendation.reason}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 rounded-md bg-emerald-50 p-3 text-emerald-700">
            <CheckCircle className="mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Visière non nécessaire</p>
              <p className="text-xs opacity-90">{recommendation.reason}</p>
            </div>
          </div>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <AlertCircle className="h-4 w-4" />
          Cette indication est informative et ne remplace pas l'avis médical.
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return <label className="mb-1 block text-xs font-medium text-gray-600">{children}</label>;
}
