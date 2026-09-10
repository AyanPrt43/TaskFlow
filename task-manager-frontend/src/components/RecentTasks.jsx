function RecentTasks({ tasks }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">Recent Tasks</h2>

      <div className="space-y-4">
        {tasks.slice(0, 5).map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 flex justify-between"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>

              <p className="text-gray-500">{task.description}</p>
            </div>

            <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTasks;
