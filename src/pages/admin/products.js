import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    // Por ahora simulado, lo reemplazarás con un fetch real
    setCategories([
      { id: 1, name: "Electrónica" },
      { id: 2, name: "Ropa" },
      { id: 3, name: "Alimentos" },
    ]);
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
    fetchProducts();
  };

  const handleDeleteConfirmed = async (id) => {
    await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });
    setIsDeleteModalOpen(false);
    fetchProducts();
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