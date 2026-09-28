import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 Movie Explorer
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;