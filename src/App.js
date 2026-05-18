import { useState, useEffect } from 'react';
import TarjetaCargador from './components/TarjetaCargador';
import Login from './components/Login';
import VistaCliente from './components/VistaCliente';

function App() {
  const [cargadores, setCargadores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaUbicacion, setNuevaUbicacion] = useState("");
  const [rol, setRol] = useState(localStorage.getItem('rol'));

  useEffect(() => {
    if (!rol) return;
    fetch('http://localhost:4000/cargadores')
      .then(function(res) { return res.json(); })
      .then(function(datos) { setCargadores(datos); });
  }, [rol]);

  if (!rol) {
    return <Login onLogin={function(r) { setRol(r); }} />;
  }
  if (rol === 'cliente') {
    return <VistaCliente cargadores={cargadores} onCerrarSesion={cerrarSesion} />;
  }

  const cargadoresFiltrados = cargadores.filter(function(c) {
    return c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
  });

  function cambiarEstado(id) {
    const cargador = cargadores.find(function(c) { return c.id === id; });
    let nuevoEstado = "";
    if (cargador.estado === "disponible") nuevoEstado = "ocupado";
    else if (cargador.estado === "ocupado") nuevoEstado = "mantenimiento";
    else nuevoEstado = "disponible";

    fetch('http://localhost:4000/cargadores/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    }).then(function() {
      setCargadores(cargadores.map(function(c) {
        return c.id === id ? { ...c, estado: nuevoEstado } : c;
      }));
    });
  }

  function añadirCargador() {
    if (!nuevoNombre || !nuevaUbicacion) return;

    fetch('http://localhost:4000/cargadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nuevoNombre, ubicacion: nuevaUbicacion })
    }).then(function(res) {
      return res.json();
    }).then(function(cargador) {
      setCargadores([...cargadores, cargador]);
      setNuevoNombre("");
      setNuevaUbicacion("");
    });
  }

  function eliminarCargador(id) {
    fetch('http://localhost:4000/cargadores/' + id, {
      method: 'DELETE'
    }).then(function() {
      setCargadores(cargadores.filter(function(c) { return c.id !== id; }));
    });
  }

  function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setRol(null);
  }

  const disponibles = cargadores.filter(function(c) { return c.estado === "disponible"; }).length;
  const ocupados = cargadores.filter(function(c) { return c.estado === "ocupado"; }).length;
  const mantenimiento = cargadores.filter(function(c) { return c.estado === "mantenimiento"; }).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-blue-600 text-white rounded-xl p-6 mb-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">⚡ Sistema de Cargadores Eléctricos</h1>
          <p className="text-blue-100 mt-1">Panel de control — Gestión en tiempo real</p>
        </div>
        <button
          onClick={cerrarSesion}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50">
          Cerrar sesión
        </button>
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

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">➕ Añadir nuevo cargador</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Nombre del cargador"
            value={nuevoNombre}
            onChange={function(e) { setNuevoNombre(e.target.value); }}
            className="flex-1 border border-gray-200 rounded-lg p-3 text-gray-600 focus:outline-none focus:border-blue-400"
          />
          <input
            type="text"
            placeholder="Ubicación"
            value={nuevaUbicacion}
            onChange={function(e) { setNuevaUbicacion(e.target.value); }}
            className="flex-1 border border-gray-200 rounded-lg p-3 text-gray-600 focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={añadirCargador}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Añadir
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Estado de cargadores</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o ubicación..."
          value={busqueda}
          onChange={function(e) { setBusqueda(e.target.value); }}
          className="w-full border border-gray-200 rounded-lg p-3 mb-4 text-gray-600 focus:outline-none focus:border-blue-400"
        />
        <div className="space-y-3">
          {cargadoresFiltrados.map(function(cargador) {
            return (
              <TarjetaCargador
                key={cargador.id}
                cargador={cargador}
                onCambiarEstado={cambiarEstado}
                onEliminar={eliminarCargador}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default App;