import { useState } from 'react';
import TarjetaCargador from './components/TarjetaCargador';

const cargadoresIniciales = [
  { id: 1, nombre: "Cargador 01", ubicacion: "Madrid Centro", estado: "disponible" },
  { id: 2, nombre: "Cargador 02", ubicacion: "Madrid Norte", estado: "disponible" },
  { id: 3, nombre: "Cargador 03", ubicacion: "Madrid Sur", estado: "mantenimiento" },
  { id: 4, nombre: "Cargador 04", ubicacion: "Madrid Este", estado: "ocupado" },
];

function App() {
  const [cargadores, setCargadores] = useState(cargadoresIniciales);

  function cambiarEstado(id) {
    setCargadores(cargadores.map(c => {
      if (c.id !== id) return c;
      if (c.estado === "disponible") return { ...c, estado: "ocupado" };
      if (c.estado === "ocupado") return { ...c, estado: "mantenimiento" };
      return { ...c, estado: "disponible" };
    }));
  }

  const disponibles = cargadores.filter(c => c.estado === "disponible").length;
  const ocupados = cargadores.filter(c => c.estado === "ocupado").length;
  const mantenimiento = cargadores.filter(c => c.estado === "mantenimiento").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-blue-600 text-white rounded-xl p-6 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold">⚡ Sistema de Cargadores Eléctricos</h1>
        <p className="text-blue-100 mt-1">Panel de control — Gestión en tiempo real</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow text-center">
          <p className="text-4xl font-bold text-green-500">{disponibles}</p>
          <p className="text-gray-500 mt-1">Disponibles</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow text-center">
          <p className="text-4xl font-bold text-red-500">{ocupados}</p>
          <p className="text-gray-500 mt-1">Ocupados</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow text-center">
          <p className="text-4xl font-bold text-yellow-500">{mantenimiento}</p>
          <p className="text-gray-500 mt-1">Mantenimiento</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Estado de cargadores</h2>
        <div className="space-y-3">
          {cargadores.map(cargador => (
            <TarjetaCargador
              key={cargador.id}
              cargador={cargador}
              onCambiarEstado={cambiarEstado}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;