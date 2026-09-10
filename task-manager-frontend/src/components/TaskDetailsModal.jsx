import { useState } from "react";

import EditTaskModal from "./EditTaskModal";
import SubtaskItem from "./SubtaskItem";
import CreateSubtaskModal from "./CreateSubtaskModal";

function TaskDetailsModal({ isOpen, onClose, task, onDelete, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);

  const [subtasks, setSubtasks] = useState([
    {
      id: 1,
      title: "Create UI components",
      completed: false,
    },

    {
      id: 2,
      title: "Connect API",
      completed: true,
    },
  ]);

  const [showSubtaskModal, setShowSubtaskModal] = useState(false);

  const createSubtask = (subtask) => {
    setSubtasks((prev) => [...prev, subtask]);
  };

  const toggleSubtask = (id) => {
    setSubtasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    );
  };

  const deleteSubtask = (id) => {
    setSubtasks((prev) => prev.filter((item) => item.id !== id));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Task Details Modal */}

      <div className="fixed inset-0 bg-black/50 text-black flex items-center justify-center">
        <div className="bg-white/50 rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold">{task.title}</h2>

          <p className="text-gray-600 mt-3">{task.description}</p>

          <div className="mt-5 space-y-2">
            <p>
              <b>Priority:</b> {task.priority}
            </p>

            <p>
              <b>Status:</b> {task.status}
            </p>
          </div>

          {/* Subtasks Section */}

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Subtasks</h3>

              <button
                onClick={() => setShowSubtaskModal(true)}
                className="bg-black text-white px-3 py-2 rounded-lg"
              >
                + Add
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {subtasks.map((subtask) => (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  onToggle={toggleSubtask}
                  onDelete={deleteSubtask}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowEdit(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

            <button onClick={onClose} className="border px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}

      <EditTaskModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        task={task}
        onUpdate={onUpdate}
      />

      {/* Create Subtask Modal */}

      <CreateSubtaskModal
        isOpen={showSubtaskModal}
        onClose={() => setShowSubtaskModal(false)}
        onCreate={createSubtask}
      />
    </>
  );
}

export default TaskDetailsModal;
