// src/pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Usuario y clave hardcodeados
    if (username === "admin" && password === "1234") {
      localStorage.setItem("loggedIn", "true");
      router.push("/admin");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
          Iniciar Sesión
        </h2>
        <input
          className="border p-2 w-full mb-4 text-gray-800"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4 text-gray-800"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
