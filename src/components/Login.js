import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    fetch('cargadores-servidor-production.up.railway.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(function(res) { return res.json(); })
    .then(function(datos) {
      if (datos.token) {
        localStorage.setItem('token', datos.token);
        localStorage.setItem('rol', datos.rol);
        onLogin(datos.rol);
      } else {
        setError("Email o contraseña incorrectos");
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">⚡ Cargadores Eléctricos</h1>
        <p className="text-gray-400 mb-6">Inicia sesión para continuar</p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function(e) { setEmail(e.target.value); }}
          className="w-full border border-gray-200 rounded-lg p-3 mb-3 text-gray-600 focus:outline-none focus:border-blue-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={function(e) { setPassword(e.target.value); }}
          className="w-full border border-gray-200 rounded-lg p-3 mb-6 text-gray-600 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;