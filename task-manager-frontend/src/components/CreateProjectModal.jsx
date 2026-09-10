import { useState } from "react";

function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setProjectData({
      ...projectData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(projectData);

    setProjectData({
      name: "",
      description: "",
    });

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create Project</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Project Name</label>

            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              name="description"
              value={projectData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Enter description"
              rows="4"
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 bg-black text-white py-3 rounded-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
