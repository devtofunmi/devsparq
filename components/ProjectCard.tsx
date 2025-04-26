import React, { useState } from "react";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  userId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, userId }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      await axios.post(`/api/projects/like`, {
        userId,
        projectId: project.id,
      });
      setLiked(true);
      alert("Project liked!");
    } catch (error) {
      console.error("Error liking project:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`/api/projects/save`, {
        userId,
        projectId: project.id,
      });
      setSaved(true);
      alert("Project saved!");
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div className="bg-[#1F2937] p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gradient bg-gradient-to-r from-[#6E00FF] to-[#0096FF] bg-clip-text text-transparent">
        {project.name}
      </h3>
      <p className="mt-2 text-gray-400">{project.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6E00FF] hover:underline"
        >
          View Project
        </a>
        <div className="flex items-center space-x-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-sm text-gray-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`px-4 py-2 rounded-full ${
            liked ? "bg-gray-600" : "bg-blue-500"
          } text-white`}
        >
          {liked ? "Liked" : "Like"}
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className={`px-4 py-2 rounded-full ${
            saved ? "bg-gray-600" : "bg-green-500"
          } text-white`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;


