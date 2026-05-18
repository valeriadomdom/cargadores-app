function TarjetaCargador({ cargador, onCambiarEstado, onEliminar }) {
  let emoji = "";
  let color = "";

  if (cargador.estado === "disponible") {
    emoji = "✅";
    color = "border-green-400";
  }
  if (cargador.estado === "ocupado") {
    emoji = "🔴";
    color = "border-red-400";
  }
  if (cargador.estado === "mantenimiento") {
    emoji = "⚠️";
    color = "border-yellow-400";
  }

  return (
    <div className={`bg-white rounded-xl p-4 shadow border-l-4 ${color} flex items-center justify-between`}>
      <div>
        <p className="font-bold text-gray-700">{emoji} {cargador.nombre}</p>
        <p className="text-sm text-gray-400">{cargador.ubicacion}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500 capitalize">{cargador.estado}</span>
        <button
          onClick={function() { onCambiarEstado(cargador.id); }}
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600">
          Cambiar estado
        </button>
        <button
          onClick={function() { onEliminar(cargador.id); }}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaCargador;