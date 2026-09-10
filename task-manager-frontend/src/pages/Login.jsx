import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      setUser(response.data.user);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/LoginBG.png')] bg-cover bg-center backdrop-blur-md"></div>
      <div className="min-h-screen flex items-center justify-center relative z-10 ">
        <div className="bg-black/20 p-8 rounded-xl shadow-md w-full max-w-md border shadow-black/50" >
          <h1 className="text-3xl font-bold text-center mb-6">Task Flow</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-black/70 text-white py-3 rounded-lg hover:bg-black/90 hover:transition-all duration-300 scale-102"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-5">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="ml-2 cursor-pointer font-semibold"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
