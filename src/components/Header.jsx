import { Calendar, Stethoscope, Shield, User } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-indigo-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Suivi des Arrêts Médicaux
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
              Gérez les arrêts, préparez les reprises et vérifiez la nécessité d’une visière médicale au retour.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Feature icon={<Calendar className="h-5 w-5" />} label="Planification" />
            <Feature icon={<User className="h-5 w-5" />} label="Employés" />
            <Feature icon={<Stethoscope className="h-5 w-5" />} label="Santé" />
            <Feature icon={<Shield className="h-5 w-5" />} label="Protection" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm">
      <span className="text-indigo-600">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
