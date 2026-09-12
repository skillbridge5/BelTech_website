import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { updateAdminAccount, getErrorMessage } from "../../api/client";
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
  const { logout, email, setSession } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const openProfile = () => {
    setFormEmail(email || "");
    setNewPassword("");
    setCurrentPassword("");
    setShowProfile(true);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out", {
      style: { background: "#0078B7", color: "#ffffff" },
    });
    navigate("/admin/login");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Current password is required", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    if (!formEmail && !newPassword) {
      toast.error("Enter a new email or password", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setSaving(true);
    try {
      const res = await updateAdminAccount({
        currentPassword,
        email: formEmail || undefined,
        password: newPassword || undefined,
      });
      const newToken = res.data?.token || res.data?.data?.token;
      if (newToken) setSession(newToken);
      toast.success("Credentials updated", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setShowProfile(false);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update credentials"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setSaving(false);
    }
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
            onClick={openProfile}
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
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Admin Profile</h2>
            <p className="text-sm text-gray-500 mb-6">
              Update your admin credential
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="admin@beltech.com"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  autoComplete="new-password"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password *
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Required to save changes"
                  autoComplete="current-password"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowProfile(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
