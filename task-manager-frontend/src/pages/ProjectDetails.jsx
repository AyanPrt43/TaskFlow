import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ProjectDetails() {
  const { id } = useParams();

  const project = {
    id: id,

    name: "Task Manager Application",

    description: "A complete project management system",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-4xl font-bold">{project.name}</h1>

          <p className="text-gray-600 mt-3">{project.description}</p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold">Members</h2>

              <ul className="mt-4 space-y-2">
                <li>Ayan</li>

                <li>User 2</li>

                <li>User 3</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold">Tasks</h2>

              <ul className="mt-4 space-y-2">
                <li>Build UI</li>

                <li>Create APIs</li>

                <li>Deploy Project</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold">Notes</h2>

              <p className="mt-4 text-gray-500">No notes available</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProjectDetails;
