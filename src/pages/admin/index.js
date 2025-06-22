import React, { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";

export default function AdminPanel() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? '' : menu);
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <button
        onClick={() => {
          localStorage.removeItem("loggedIn");
          router.push("/login");
        }}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Cerrar sesión
      </button>

    </AdminLayout>
  );
}