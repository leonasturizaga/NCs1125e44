import TestimonialForm from "../components/TestimonialForm";

export default function CreateTestimonial() {
  const handleSave = (data) => {
    console.log("Crear →", data);
    // TODO: conectar con API cuando esté lista
    alert("Testimonio creado (mock)");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nuevo Testimonio</h1>
      <TestimonialForm onSubmit={handleSave} submitText="Crear Testimonio" />
    </div>
  );
}