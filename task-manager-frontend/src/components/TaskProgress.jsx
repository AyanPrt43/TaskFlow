function TaskProgress({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "done").length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">Task Progress</h2>

      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Completed Tasks</p>

        <p className="font-bold">
          {completedTasks}/{totalTasks}
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-black h-4 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <p className="text-right mt-3 font-bold">{progress}%</p>
    </div>
  );
}

export default TaskProgress;
