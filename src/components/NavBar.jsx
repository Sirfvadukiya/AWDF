import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px 0" }}>
      <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>Home</Link>
      <Link to="/projects" style={{ textDecoration: "none", fontWeight: "bold" }}>Projects</Link>
      <Link to="/tasks" style={{ textDecoration: "none", fontWeight: "bold" }}>Tasks</Link>
      <Link to="/contact" style={{ textDecoration: "none", fontWeight: "bold" }}>Contact</Link>
    </nav>
  );
}

export default NavBar;
