import { useState, useEffect } from 'react';
import TarjetaCargador from './components/TarjetaCargador';

function App() {
  const [cargadores, setCargadores] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Pedir los cargadores al servidor cuando la app arranca
  useEffect(() => {
    fetch('http://localhost:4000/cargadores')
      .then(res => res.json())
      .then(datos => setCargadores(datos));
  }, []);

  const cargadoresFiltrados = cargadores.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
  );

  function cambiarEstado(id) {
    const cargador = cargadores.find(c => c.id === id);
    let nuevoEstado = "";
    if (cargador.estado === "disponible") nuevoEstado = "ocupado";
    else if (cargador.estado === "ocupado") nuevoEstado = "mantenimiento";
    else nuevoEstado = "disponible";

    fetch(`http://localhost:4000/cargadores/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    }).then(() => {
      setCargadores(cargadores.map(c =>
        c.id === id ? { ...c, estado: nuevoEstado } : c
      ));
    });
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
        <input
          type="text"
          placeholder="Buscar por nombre o ubicación..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-3 mb-4 text-gray-600 focus:outline-none focus:border-blue-400"
        />
        <div className="space-y-3">
          {cargadoresFiltrados.map(cargador => (
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