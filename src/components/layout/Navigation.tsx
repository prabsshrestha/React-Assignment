import { NavLink } from "react-router-dom";
import { Home, Receipt, Cloud } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/expenses", label: "Expenses", icon: Receipt },
  { to: "/weather", label: "Weather", icon: Cloud },
];

export default function Navigation() {
  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <NavLink to="/" className="brand">
          <div className="brand-icon">FW</div>
          <span className="brand-text">FinanceWeatherHub</span>
        </NavLink>

        <div className="nav-links">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
