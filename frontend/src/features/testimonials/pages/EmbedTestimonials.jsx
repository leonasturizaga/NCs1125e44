import TestimonialList from "./TestimonialList";

export default function EmbedTestimonials() {
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        background: "transparent",
      }}
    >
      <TestimonialList embedMode={true} />
    </div>
  );
}
