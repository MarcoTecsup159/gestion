export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo con desenfoque */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Contenido del modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        {/* Header del modal */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 text-red-600 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-semibold text-red-600">
              Confirmar eliminación
            </h2>
          </div>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            ¿Estás seguro de que deseas eliminar permanentemente el producto{" "}
            <span className="font-medium text-gray-900">{product.name}</span>?
            Esta acción no se puede deshacer.
          </p>

          {/* Botones */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              onClick={() => onConfirm(product.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}