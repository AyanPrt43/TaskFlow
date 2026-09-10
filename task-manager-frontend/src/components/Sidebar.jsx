import { NavLink } from "react-router-dom";

// ==================== ICONS ====================

const DashboardIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9 21V14H15V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const ProjectsIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6.5C3 5.67 3.67 5 4.5 5H9L11 7H19.5C20.33 7 21 7.67 21 8.5V17.5C21 18.33 20.33 19 19.5 19H4.5C3.67 19 3 18.33 3 17.5V6.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const TasksIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2"
    />

    <path
      d="M8 12L10.5 14.5L16 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MembersIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8"
      cy="8"
      r="3"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M2.5 19C2.5 15.96 4.96 13.5 8 13.5C11.04 13.5 13.5 15.96 13.5 19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <circle
      cx="16.5"
      cy="9"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M13.5 14.5C14.35 13.86 15.4 13.5 16.5 13.5C19.26 13.5 21.5 15.74 21.5 18.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const NotesIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 3H14L19 8V21H6C5.45 21 5 20.55 5 20V4C5 3.45 5.45 3 6 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    <path
      d="M14 3V8H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    <path
      d="M9 12H15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <path
      d="M9 16H15"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const ProfileIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="7"
      r="3.5"
      stroke="currentColor"
      strokeWidth="2"
    />

    <path
      d="M4.5 21C4.5 16.86 7.86 13.5 12 13.5C16.14 13.5 19.5 16.86 19.5 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);


// ==================== SIDEBAR ====================

function Sidebar() {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },

    {
      name: "Projects",
      path: "/projects",
      icon: <ProjectsIcon />,
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <TasksIcon />,
    },

    {
      name: "Members",
      path: "/members",
      icon: <MembersIcon />,
    },

    {
      name: "Notes",
      path: "/notes",
      icon: <NotesIcon />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <ProfileIcon />,
    },
  ];


  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6 bg-[url('/SideBG.png')] bg-cover bg-center">

      {/* LOGO / TITLE */}
      <h2 className="text-2xl font-bold mb-8">
        Task Flow
      </h2>


      {/* NAVIGATION */}
      <nav className="space-y-3">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}

            className={({ isActive }) =>
              `flex items-center gap-5 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-r from-[#312E7C] via-[#292B68] to-[#1D2342] text-white"
                  : "text-[#E5E7EB] hover:bg-white/10"
              }`
            }
          >

            {/* ICON */}
            <span className="shrink-0">
              {item.icon}
            </span>


            {/* MENU NAME */}
            <span className="text-base font-medium">
              {item.name}
            </span>

          </NavLink>

        ))}

      </nav>

    </aside>
  );
}


export default Sidebar;