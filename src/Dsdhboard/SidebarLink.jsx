import { NavLink } from "react-router";

export function SidebarLink({ open, to, icon, text }) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-4 px-4 py-3 rounded-xl transition-all
          ${
            isActive
              ? "bg-white text-black shadow"
              : "hover:bg-white/10"
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        {open && <span className="font-medium">{text}</span>}
      </NavLink>
    );
  }