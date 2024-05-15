import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar-container">
      <Link to="/">Главная</Link>
      <Link to="/dashboard">Панель менеджера</Link>
    </nav>
  );
}
