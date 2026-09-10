function RecentProjects({ projects }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5">Recent Projects</h2>

      <div className="space-y-4">
        {projects.slice(0, 3).map((project) => (
          <div key={project.id} className="border rounded-lg p-4">
            <h3 className="font-bold text-lg">{project.name}</h3>

            <p className="text-gray-500">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;
