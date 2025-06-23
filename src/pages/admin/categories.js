import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import CategoryTable from "@/components/CategoryTable";
import CategoryModal from "@/components/CategoryModal";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error al obtener categorías", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async (id) => {
    try {
      await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });
      setIsDeleteModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Error al eliminar categoría", err);
      alert("Hubo un error al eliminar la categoría");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Header mejorado */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Categorías</h1>
            <p className="text-gray-600 mt-1">Administra las categorías de productos</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva categoría
          </button>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <CategoryTable
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Modales */}
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={fetchCategories}
          initialData={editingCategory}
        />

        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirmed}
          product={deletingCategory}
        />
      </div>
    </AdminLayout>
  );
}