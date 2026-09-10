function ActivityTimeline({ activities }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 items-start">
            <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>

            <div>
              <p className="font-medium">{activity.message}</p>

              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityTimeline;
