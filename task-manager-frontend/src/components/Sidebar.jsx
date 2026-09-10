import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Projects",
      path: "/projects",
    },

    {
      name: "Tasks",
      path: "/tasks",
    },

    {
      name: "Members",
      path: "/members",
    },

    {
      name: "Notes",
      path: "/notes",
    },

    {
      name: "Profile",
      path: "/profile",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Task Manager</h2>
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg ${isActive ? "bg-white text-black" : "hover:bg-gray-800"}`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
