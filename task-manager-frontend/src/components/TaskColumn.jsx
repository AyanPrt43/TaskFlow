import TaskCard from "./TaskCard";

function TaskColumn({ title, tasks, onDelete, onUpdate }) {
  return (
    <div className="bg-gray-200 rounded-xl p-5">
      <h2 className="text-xl font-bold mb-5">{title}</h2>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskColumn;
