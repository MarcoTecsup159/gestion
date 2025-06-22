import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de login si no está autenticado
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null; // No renderiza nada mientras redirige
}