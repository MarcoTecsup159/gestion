import { use, useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ProductTable from "@/components/ProductTable";
import ProductModal from "@/components/ProductModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCategoryId, setFilterCategoryId] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(search, filterCategoryId);
    }, 300); // Espera 300ms después de que el usuario deje de escribir

    return () => clearTimeout(delayDebounce); // Limpia el timeout si el componente se desmonta o cambia
  }, [search, filterCategoryId]);

  const fetchProducts = async (searchTerm = "", categoryId = "") => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (categoryId) params.append("category", categoryId);

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = async (product) => {
    const method = product.id ? "PUT" : "POST";
    const url = "/api/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setIsProductModalOpen(false);
    fetchProducts(search, filterCategoryId);
  };

  const handleDeleteConfirmed = async (id) => {
    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });
    setIsDeleteModalOpen(false);
    fetchProducts(search, filterCategoryId);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Header mejorado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Productos</h1>
            <p className="text-gray-600 mt-1">Administra el inventario de productos</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo producto
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-6 text-gray-600">
          {/* Input de búsqueda */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Selector de categorías */}
          <div className="relative flex-shrink-0 sm:w-64">
            <select
              className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 appearance-none outline-none bg-white cursor-pointer"
              value={filterCategoryId}
              onChange={(e) => setFilterCategoryId(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>


        {/* Tabla de productos con mejor espaciado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modales con backdrop desenfocado */}
        <ProductModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onSubmit={handleSaveProduct}
          initialData={editingProduct}
          categories={categories}
          backdropClass="backdrop-blur-sm bg-black/30" // Añade esta prop al modal
        />

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirmed}
          product={deletingProduct}
          backdropClass="backdrop-blur-sm bg-black/30" // Añade esta prop al modal
        />
      </div>
    </AdminLayout>
  );
}