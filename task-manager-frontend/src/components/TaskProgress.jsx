function TaskProgress({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "done").length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-black/20 rounded-xl border border-white/40 shadow p-6">
      <h2 className="text-xl font-bold mb-5 text-white">Task Progress</h2>

      <div className="shadow shadow-white/20 rounded-lg p-4 transition-all duration-300 cursor-pointer hover:scale-[1.05] items-center">

        <div className="flex justify-between mb-2 ">
        <p className="text-white">Completed Tasks</p>

        <p className="font-bold text-white">
          {completedTasks}/{totalTasks}
        </p>
      </div>

      <div className="w-full bg-white/30 rounded-full h-4">
        <div
          className="bg-purple-400 h-4 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <p className="text-right mt-3 font-bold text-white">{progress}%</p>
      </div>
    </div>
  );
}

export default TaskProgress;
