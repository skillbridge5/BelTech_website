import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { LayoutDashboard, FileText, FolderKanban, Mail, LogOut, MessageCircle, User, X } from "lucide-react";
import NotificationsBell from "./NotificationsBell";
import logo from "../../assets/new_logo.png";
import toast, { Toaster } from "react-hot-toast";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Solutions", path: "/admin/solutions", icon: FolderKanban, end: false },
  { name: "Blog", path: "/admin/blog", icon: FileText, end: false },
  { name: "Contact", path: "/admin/contact", icon: Mail, end: false },
  { name: "Testimonials", path: "/admin/testimonials", icon: MessageCircle, end: false },
];

const AdminLayout = () => {
  const { logout, email } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

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
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User className="h-5 w-5" />
            Profile
          </button>
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

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Profile</h2>
            <div className="flex flex-col items-center mb-6">
              <div className="h-20 w-20 rounded-full bg-[#0078B7] text-white flex items-center justify-center text-3xl font-semibold mb-4">
                {(email || "A").charAt(0).toUpperCase()}
              </div>
              <p className="text-lg font-bold text-gray-900">{email || "Admin"}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Login credential
              </p>
              <p className="text-sm text-gray-800 break-all">{email || "—"}</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowProfile(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowProfile(false);
                  handleLogout();
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
