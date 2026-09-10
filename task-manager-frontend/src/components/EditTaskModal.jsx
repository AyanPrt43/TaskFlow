import { useState } from "react";

function EditTaskModal({ isOpen, onClose, task, onUpdate }) {
  const [taskData, setTaskData] = useState({
    title: task.title,

    description: task.description,

    priority: task.priority,

    status: task.status,
  });

  const handleChange = (e) => {
    setTaskData({
      ...taskData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...task,

      ...taskData,
    });

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-black/20 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows="3"
          />

          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option>High</option>

            <option>Medium</option>

            <option>Low</option>
          </select>

          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="todo">TODO</option>

            <option value="in_progress">IN PROGRESS</option>

            <option value="done">DONE</option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-black text-white py-3 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
