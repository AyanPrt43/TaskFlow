import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      id: 1,

      name: "Task Manager Application",

      description: "A complete project management system",

      members: [
        {
          id: 1,
          name: "Ayan Pratap",
          role: "Developer",
        },

        {
          id: 2,
          name: "Rahul Sharma",
          role: "Designer",
        },
      ],

      tasks: 10,
    },

    {
      id: 2,

      name: "E-Commerce Platform",

      description: "Online shopping application",

      members: [
        {
          id: 3,
          name: "Priya Singh",
          role: "Tester",
        },
      ],

      tasks: 20,
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Create Login UI",
      description: "Build authentication pages",
      priority: "High",
      status: "todo",
    },

    {
      id: 2,
      title: "Connect Backend API",
      description: "Integrate Axios services",
      priority: "Medium",
      status: "in_progress",
    },

    {
      id: 3,
      title: "Deploy Application",
      description: "Deploy frontend",
      priority: "Low",
      status: "done",
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      message: "Created project Task Manager Application",
      time: "Just now",
    },

    {
      id: 2,
      message: "Added task Create Login UI",
      time: "2 minutes ago",
    },

    {
      id: 3,
      message: "Completed task Deploy Application",
      time: "5 minutes ago",
    },
  ]);

  // Members State Added

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Ayan Pratap",
      email: "ayan@example.com",
      role: "Developer",
    },

    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "Designer",
    },

    {
      id: 3,
      name: "Priya Singh",
      email: "priya@example.com",
      role: "Tester",
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        projects,
        setProjects,

        tasks,
        setTasks,

        activities,
        setActivities,

        members,
        setMembers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
