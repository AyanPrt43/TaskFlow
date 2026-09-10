function RecentProjects({ projects }) {
  return (
    <div className="bg-black/20 border border-white/40 rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-5 text-white">Recent Projects</h2>

      <div className="space-y-4">
        {projects.slice(0, 3).map((project) => (
          <div key={project.id} className=" shadow shadow-white/20 text-white rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.05] ">
            <h3 className="font-bold text-lg">{project.name}</h3>

            <p className=" text-white/80">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;
