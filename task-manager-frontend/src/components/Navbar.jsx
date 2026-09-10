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
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Task Manager</h1>

      <div className="flex items-center gap-5">
        <span>{user?.username || "User"}</span>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
