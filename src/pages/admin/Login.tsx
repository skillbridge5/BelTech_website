import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { Lock, Mail } from "lucide-react";
import logo from "../../assets/new_logo.png";
import { getErrorMessage } from "../../api/client";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully", {
        style: {
          background: "#0078B7",
          color: "#ffffff",
        },
      });
      navigate("/admin");
    } catch (err) {
      toast.error(getErrorMessage(err, "Invalid credentials"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-[#0078B7] h-2"></div>
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="BelTech Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-center text-gray-500 text-sm mb-8">
              Sign in to manage Solutions and Insights
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@beltech.com"
                    className="pl-10 py-3 border-gray-300 rounded-lg focus:border-[#0078B7] focus:ring-[#0078B7]"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 py-3 border-gray-300 rounded-lg focus:border-[#0078B7] focus:ring-[#0078B7]"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0078B7] hover:bg-[#005C8A] text-white py-3 font-semibold rounded-lg text-base"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">
          BelTech Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
