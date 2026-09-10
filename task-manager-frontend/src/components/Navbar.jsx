import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="text-white px-8 py-4 flex justify-between border-b shadow border-white/20 items-center">
      <h1 className="text-2xl font-bold">Task Flow</h1>

      <div className="flex items-center gap-5">
        <span>{user?.username || "User"}</span>

        <button
          onClick={handleLogout}
          className="bg-black/20 text-white px-4 py-2 rounded-xl hover:bg-white/50 hover:text-black transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
