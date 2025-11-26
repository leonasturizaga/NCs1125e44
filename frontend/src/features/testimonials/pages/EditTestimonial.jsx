import { useParams } from "react-router-dom";
import TestimonialForm from "../components/TestimonialForm";

// Mock data until we have the API
const mockData = { id: 1, author: "María González", content: "Excelente servicio...", category: "Clientes", status: "published" };

export default function EditTestimonial() {
  const { id } = useParams();

  const handleSave = (data) => {
    console.log("Editar →", id, data);
    alert("Testimonio actualizado (mock)");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Editar Testimonio</h1>
      <TestimonialForm initialData={mockData} onSubmit={handleSave} submitText="Guardar Cambios" />
    </div>
  );
}