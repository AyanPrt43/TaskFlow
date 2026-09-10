import TaskCard from "./TaskCard";

function TaskColumn({ title, tasks, onDelete, onUpdate }) {
  return (
    <div className="sbg-black/20 border border-white/40 rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-5 text-white">{title}</h2>

      <div className="space-y-4 shadow shadow-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.05]">
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
