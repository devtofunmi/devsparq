import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

const FindSimilarProjects: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Store the search query
  const [projects, setProjects] = useState<Project[]>([]); // Store the fetched projects
  const [loading, setLoading] = useState<boolean>(false); // Show loading state
  const [error, setError] = useState<string>(""); // Store error messages
  const [userId, setUserId] = useState<string | null>(null); // Store the logged-in user's ID

  // Simulate getting the user ID after login (replace with actual logic)
  useEffect(() => {
    setUserId("user-123");
  }, []);

  // Fetch similar projects based on the search query
  const fetchSimilarProjects = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<Project[]>(`/api/find-similar-projects`, {
        params: { query },
      });
      setProjects(response.data);
    } catch (error) {
      setError("Failed to fetch projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger search when the query changes
  useEffect(() => {
    fetchSimilarProjects();
  }, [query]);

  return (
    <div className="bg-[#111827] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Search Bar */}
        <div className="mb-10 text-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for similar projects..."
            className="px-6 py-3 border-white border-[1px] rounded-lg text-white"
          />
        </div>

        {/* Loading Spinner */}
        {loading && <div className="text-center text-gray-400">Loading...</div>}

        {/* Error Message */}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Display the projects */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} userId={userId ?? ""} />
            ))
          ) : !loading ? (
            <div className="text-center text-gray-400 col-span-full">
              No projects found.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FindSimilarProjects;