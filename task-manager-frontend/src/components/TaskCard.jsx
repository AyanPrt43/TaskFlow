import { useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";

function TaskCard({ task, onDelete, onUpdate }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-black/20 rounded-xl shadow p-5">
        <h3 className="text-xl font-bold">{task.title}</h3>

        <p className="text-gray-500 mt-2">{task.description}</p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-sm border text-white shadow shadow-white/20 bg-white/10 px-3 py-1 rounded-full hover:bg-black/20 transition-all duration-300">
            {task.priority}
          </span>

          <button
            onClick={() => setShowDetails(true)}
            className="text-sm font-semibold "
          >
            View Details
          </button>
        </div>
      </div>

      <TaskDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        task={task}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </>
  );
}

export default TaskCard;
