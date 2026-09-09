import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LayoutDashboard, FileText, FolderKanban, Mail, LogOut } from "lucide-react";
import NotificationsBell from "./NotificationsBell";
import logo from "../../assets/new_logo.png";
import toast, { Toaster } from "react-hot-toast";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Solutions", path: "/admin/solutions", icon: FolderKanban, end: false },
  { name: "Blog", path: "/admin/blog", icon: FileText, end: false },
  { name: "Contact", path: "/admin/contact", icon: Mail, end: false },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out", {
      style: { background: "#0078B7", color: "#ffffff" },
    });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center">
          <img src={logo} alt="BelTech" className="h-20 w-auto object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#0078B7] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 z-20">
          <NotificationsBell />
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
