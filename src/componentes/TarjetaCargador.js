function TarjetaCargador({ cargador }) {
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
      <span className="text-sm font-medium text-gray-500 capitalize">{cargador.estado}</span>
    </div>
  );
}

export default TarjetaCargador;