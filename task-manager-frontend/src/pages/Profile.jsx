import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8 text-white">My Profile</h1>

          <div className="rounded-xl shadow p-8 max-w-xl bg-black/20 border border-white/40 shadow-white/20 ">
            <div className="flex items-center gap-5 mb-8">
              <img
                src={user?.avatar?.url || "https://placehold.co/100x100"}
                alt="avatar"
                className="w-24 h-24 rounded-full"
              />

              <div>
                <h2 className="text-2xl font-bold text-white">{user?.username}</h2>

                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4 text-white/80">
              <div>
                <p className="text-gray-500">Username</p>

                <p className="font-semibold">{user?.username}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>

                <p className="font-semibold">{user?.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Account Status</p>

                <p
                  className={
                    user?.isEmailVerified
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {user?.isEmailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Joined On</p>

                <p className="font-semibold">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
