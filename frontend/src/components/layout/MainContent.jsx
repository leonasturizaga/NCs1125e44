export default function MainContent({ children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      {children || (
        <div className="text-center py-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenido al CMS de Testimonios
          </h3>
          <p className="text-gray-600">
            Selecciona una opción del menú lateral para comenzar.
          </p>
        </div>
      )}
    </div>
  );
}