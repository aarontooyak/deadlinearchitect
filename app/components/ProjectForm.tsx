import React, { useState } from 'react';

interface ProjectFormProps {
  onSubmit: (timeline: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          projectDescription,
          deadline,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        onSubmit(data.result);
      } else {
        setError(data.error || 'Failed to generate timeline.');
      }
    } catch (error) {
      setError('An error occurred while generating the timeline.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="projectName" className="block font-bold mb-2">Project Name</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="projectDescription" className="block font-bold mb-2">Project Description</label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="deadline" className="block font-bold mb-2">Deadline</label>
        <input
          type="date"
          id="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      {isLoading && <p>Generating timeline...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate Timeline
      </button>
    </form>
  );
};

export default ProjectForm;
