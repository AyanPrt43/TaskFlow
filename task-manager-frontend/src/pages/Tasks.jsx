import { useState } from "react";

import { useApp } from "../context/AppContext";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskColumn from "../components/TaskColumn";
import CreateTaskModal from "../components/CreateTaskModal";

function Tasks() {
  const { tasks, setTasks, setActivities } = useApp();

  const [showModal, setShowModal] = useState(false);

  const createTask = (task) => {
    const newTask = {
      id: Date.now(),

      title: task.title,

      description: task.description,

      priority: task.priority,

      status: task.status,
    };

    setTasks((prev) => [...prev, newTask]);

    setActivities((prev) => [
      {
        id: Date.now(),

        message: `Added task ${task.title}`,

        time: "Just now",
      },

      ...prev,
    ]);

    setShowModal(false);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );

    if (updatedTask.status === "done") {
      setActivities((prev) => [
        {
          id: Date.now(),

          message: `Completed task ${updatedTask.title}`,

          time: "Just now",
        },

        ...prev,
      ]);
    }
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const progressTasks = tasks.filter((task) => task.status === "in_progress");

  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Tasks</h1>

            <button
              onClick={() => setShowModal(true)}
              className="bg-black/30 text-white px-5 py-3 rounded-lg hover:transition-all hover:scale-[1.02] hover:bg-white/50 hover:text-black"
            >
              + Add Task
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 ">
            <TaskColumn
              title="TODO"
              tasks={todoTasks}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />

            <TaskColumn
              title="IN PROGRESS"
              tasks={progressTasks}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />

            <TaskColumn
              title="DONE"
              tasks={doneTasks}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          </div>
        </main>
      </div>

      <CreateTaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={createTask}
      />
    </div>
  );
}

export default Tasks;
