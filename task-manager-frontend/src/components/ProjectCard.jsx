function ProjectCard({ project, onAssign }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold">{project.name}</h2>

      <p className="text-gray-500 mt-2">{project.description}</p>

      <div className="mt-5">
        <h3 className="font-bold mb-3">Team Members</h3>

        <div className="space-y-2">
          {project.members.map((member) => (
            <div key={member.id} className="bg-gray-100 p-3 rounded-lg">
              <p className="font-semibold">{member.name}</p>

              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-gray-500">Tasks</p>

        <p className="font-bold text-xl">{project.tasks}</p>
      </div>

      <button
        onClick={onAssign}
        className="mt-6 w-full bg-black text-white py-3 rounded-lg"
      >
        + Add Member
      </button>
    </div>
  );
}

export default ProjectCard;
