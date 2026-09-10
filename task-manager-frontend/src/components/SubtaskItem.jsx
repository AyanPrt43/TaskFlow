function SubtaskItem({ subtask, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={subtask.completed}
          onChange={() => onToggle(subtask.id)}
        />

        <p className={subtask.completed ? "line-through text-gray-400" : ""}>
          {subtask.title}
        </p>
      </div>

      <button
        onClick={() => onDelete(subtask.id)}
        className="text-red-600 font-semibold"
      >
        Delete
      </button>
    </div>
  );
}

export default SubtaskItem;
