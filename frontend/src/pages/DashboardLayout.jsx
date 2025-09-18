import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaBars, FaHome, FaUser, FaClipboardList, FaBriefcase, FaSignOutAlt } from "react-icons/fa";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const linkClass = (path) =>
    `flex items-center space-x-2 py-2 px-3 rounded hover:bg-gray-200 transition ${
      location.pathname === path ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-gray-100 p-4 flex flex-col justify-between transition-all duration-300`}
      >
        {/* Top section */}
        <div>
          {/* Toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 flex items-center justify-center w-full p-2 rounded hover:bg-gray-200"
          >
            <FaBars />
          </button>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              <FaHome />
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link
              to="/dashboard/applications"
              className={linkClass("/dashboard/applications")}
            >
              <FaClipboardList />
              {!collapsed && <span>Applications</span>}
            </Link>

            <Link
              to="/dashboard/internships"
              className={linkClass("/dashboard/internships")}
            >
              <FaBriefcase />
              {!collapsed && <span>Internships</span>}
            </Link>

            <Link to="/dashboard/profile" className={linkClass("/dashboard/profile")}>
              <FaUser />
              {!collapsed && <span>Profile</span>}
            </Link>
          </nav>
        </div>

        {/* Bottom section (Logout) */}
        <div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center justify-center w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            <FaSignOutAlt />
            {!collapsed && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
