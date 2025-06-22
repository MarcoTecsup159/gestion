import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const isActive = (path) => {
    return router.pathname === path ? "bg-gray-700" : "";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen ? (
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          ) : (
            <h2 className="text-2xl font-bold">AP</h2>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-700"
          >
            {sidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        <nav className="p-2 space-y-1">
          {/* Menú Productos */}
          <div>
            <button
              className={`w-full flex items-center p-3 rounded-md hover:bg-gray-700 ${activeMenu === 'products' ? 'bg-gray-700' : ''}`}
              onClick={() => toggleMenu('products')}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {sidebarOpen && "Gestión de Productos"}
              <svg 
                className={`w-4 h-4 ml-auto transition-transform ${activeMenu === 'products' ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {activeMenu === 'products' && (
              <div className="ml-2 mt-1 space-y-1">
                <Link 
                  href="/admin/products"
                  className={`flex items-center p-2 pl-9 rounded-md hover:bg-gray-700 ${isActive('/admin/products')}`}
                >
                  {sidebarOpen ? "Productos" : <span className="text-xs">Prod</span>}
                </Link>
                <Link 
                  href="/admin/categories"
                  className={`flex items-center p-2 pl-9 rounded-md hover:bg-gray-700 ${isActive('/admin/categories')}`}
                >
                  {sidebarOpen ? "Categorías" : <span className="text-xs">Cat</span>}
                </Link>
              </div>
            )}
          </div>

          {/* Cerrar sesión */}
          <button
            className="flex items-center p-3 rounded-md hover:bg-gray-700 w-full"
            onClick={() => {
              localStorage.removeItem("loggedIn");
              router.push("/login");
            }}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && "Cerrar sesión"}
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}