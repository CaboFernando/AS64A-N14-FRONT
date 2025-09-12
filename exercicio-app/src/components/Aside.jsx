function Aside({ className }) {
  return (
    <aside className={className}>
      <h3>Links úteis</h3>
      <ul>
        <li><a href="#">Documentação React</a></li>
        <li><a href="#">Vite.js</a></li>
        <li><a href="#">MDN Web Docs</a></li>
      </ul>
    </aside>
  );
}

export default Aside;
