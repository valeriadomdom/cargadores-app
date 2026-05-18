function VistaCliente({ cargadores, onCerrarSesion }) {
  const disponibles = cargadores.filter(function(c) { return c.estado === "disponible"; });
  const ocupados = cargadores.filter(function(c) { return c.estado === "ocupado"; });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-green-600 text-white rounded-xl p-6 mb-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">⚡ Cargadores Eléctricos</h1>
          <p className="text-green-100 mt-1">Encuentra un cargador disponible cerca de ti</p>
        </div>
        <button
          onClick={onCerrarSesion}
          className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50">
          Cerrar sesión
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow text-center">
          <p className="text-4xl font-bold text-green-500">{disponibles.length}</p>
          <p className="text-gray-500 mt-1">Disponibles ahora</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow text-center">
          <p className="text-4xl font-bold text-red-500">{ocupados.length}</p>
          <p className="text-gray-500 mt-1">Ocupados</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Cargadores disponibles</h2>
        <div className="space-y-3">
          {disponibles.length === 0 && (
            <p className="text-gray-400 text-center py-4">No hay cargadores disponibles ahora mismo</p>
          )}
          {disponibles.map(function(cargador) {
            return (
              <div key={cargador.id} className="bg-gray-50 rounded-xl p-4 border-l-4 border-green-400">
                <p className="font-bold text-gray-700">✅ {cargador.nombre}</p>
                <p className="text-sm text-gray-400">{cargador.ubicacion}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default VistaCliente;