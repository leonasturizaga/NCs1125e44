import { useState } from "react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Login básico funcionando");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Login CMS
        </h1>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: ".25rem" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: ".5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: ".25rem" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: ".5rem" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: ".6rem",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: ".5rem",
            cursor: "pointer",
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;