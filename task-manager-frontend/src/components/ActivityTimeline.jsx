function ActivityTimeline({ activities }) {
  return (
    <div className="bg-black/20 border border-white/40 rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-5 text-white">Recent Activity</h2>

      <div className="space-y-4 text-white">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 items-start">
            <div className="w-full flex gap-5 shadow shadow-white/20 text-white rounded-lg p-4  hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02]">
              <div className="bg-white/30 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
                ✓
              </div>

              <div>
                <p className="font-medium">{activity.message}</p>

                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
