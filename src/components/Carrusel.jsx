export default function Carrusel({ titulo, children }) {
  return (
    <section>
      <h2>{titulo}</h2>
      <div className="fila-catalogo">{children}</div>
    </section>
  );
}
