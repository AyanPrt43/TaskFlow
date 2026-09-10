import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

import RecentProjects from "../components/RecentProjects";
import RecentTasks from "../components/RecentTasks";

import TaskProgress from "../components/TaskProgress";
import ActivityTimeline from "../components/ActivityTimeline";

function Dashboard() {
  const { user } = useAuth();

  const { projects, tasks, activities } = useApp();

  const completedTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-4xl text-white font-bold">
            Welcome back, {user?.username} 👋
          </h1>

          <p className="text-white/70 mt-2">
            Manage your projects and tasks from one place.
          </p>

          {/* Statistics Cards */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <StatCard title="Projects" value={projects.length} />

            <StatCard title="Tasks" value={tasks.length} />

            <StatCard title="Completed Tasks" value={completedTasks.length} />
          </div>

          {/* Recent Projects and Tasks */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <RecentProjects projects={projects} />

            <RecentTasks tasks={tasks} />

            <TaskProgress tasks={tasks} />
          </div>

          {/* Recent Activity */}

          <ActivityTimeline activities={activities} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
