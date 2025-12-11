import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div className="error-container" style={{ maxWidth: "600px" }}>
        <div style={{ fontSize: "80px", margin: "20px 0" }}>🏺</div>
        <h1
          style={{
            fontSize: "120px",
            margin: 0,
            color: "var(--accent-primary)",
            textShadow: "0 0 20px rgba(205, 133, 63, 0.5)",
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: "32px", margin: "20px 0" }}>
          Skarb nie został znaleziony!
        </h2>
        <p style={{ fontSize: "18px", margin: "20px 0", opacity: 0.8 }}>
          Przepraszamy, ale strona której szukasz nie istnieje. Może Lara Croft
          znalazła ją pierwsza?
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "30px" }}>
          Powrót do Strony Głównej
        </Link>
      </div>
    </div>
  );
}
