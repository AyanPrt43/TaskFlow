function RecentTasks({ tasks }) {
  return (
    <div className="bg-black/20 border border-white/40 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5 text-white">Recent Tasks</h2>

      <div className="space-y-4 ">
        {tasks.slice(0, 5).map((task) => (
          <div
            key={task.id}
            className="shadow shadow-white/20 rounded-lg p-4 flex justify-between hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.05] items-center"
          >
            <div>
              <h3 className="font-bold text-white">{task.title}</h3>

              <p className=" text-white/80">{task.description}</p>
            </div>

            <span className="text-sm border text-white shadow shadow-white/20 bg-white/10 px-3 py-1 rounded-full hover:bg-black/20 transition-all duration-300">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentTasks;
