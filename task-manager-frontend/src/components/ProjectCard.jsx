function ProjectCard({ project, onAssign }) {
  return (
    <div className="bg-white/20 border border-white/40 rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-white">{project.name}</h2>

      <p className="mt-2 text-white/80">{project.description}</p>

      <div className="mt-5">
        <h3 className="font-bold mb-3 text-white/90">Team Members</h3>

        <div className="space-y-2">
          {project.members.map((member) => (
            <div key={member.id} className="shadow shadow-white/20 bg-black/30 text-white rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.05] ">
              <p className="font-semibold">{member.name}</p>

              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-white">Tasks</p>

        <p className="font-bold text-xl text-white/80">{project.tasks}</p>
      </div>

      <button
        onClick={onAssign}
        className="mt-6 w-full shadow shadow-white/20 bg-black/40 text-white py-3 rounded-lg hover:transition-all duration-600 hover:scale-[1.03] hover:bg-white/50 hover:text-black cursor-pointer"
      >
        + Add Member
      </button>
    </div>
  );
}

export default ProjectCard;
