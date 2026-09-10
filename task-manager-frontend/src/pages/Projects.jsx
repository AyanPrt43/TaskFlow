import { useState } from "react";

import { useApp } from "../context/AppContext";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import AssignMemberModal from "../components/AssignMemberModal";

function Projects() {
  const { projects, setProjects, members, setActivities } = useApp();

  const [showModal, setShowModal] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const createProject = (project) => {
    const newProject = {
      id: Date.now(),

      name: project.name,

      description: project.description,

      members: [],

      tasks: 0,
    };

    setProjects((prev) => [...prev, newProject]);

    setActivities((prev) => [
      {
        id: Date.now(),

        message: `Created project ${project.name}`,

        time: "Just now",
      },

      ...prev,
    ]);

    setShowModal(false);
  };

  const assignMember = (member) => {
    if (!selectedProject) return;

    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,

              members: [
                ...project.members,

                {
                  id: member.id,

                  name: member.name,

                  role: member.role,
                },
              ],
            }
          : project,
      ),
    );

    setActivities((prev) => [
      {
        id: Date.now(),

        message: `Assigned ${member.name} to ${selectedProject.name}`,

        time: "Just now",
      },

      ...prev,
    ]);

    setShowAssignModal(false);

    setSelectedProject(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Projects</h1>

            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-5 py-3 rounded-lg"
            >
              + Create Project
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAssign={() => {
                  setSelectedProject(project);

                  setShowAssignModal(true);
                }}
              />
            ))}
          </div>
        </main>

        <AssignMemberModal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);

            setSelectedProject(null);
          }}
          members={members}
          onAssign={assignMember}
        />
      </div>

      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={createProject}
      />
    </div>
  );
}

export default Projects;
