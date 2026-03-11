"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, createProject, updateProject, deleteProject, uploadFile } from "@/lib/api";
import { Plus, Trash2, ExternalLink, Edit2 } from "lucide-react";
import NextImage from "next/image";

export default function AdminProjectsPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "", problemStatement: "", solution: "", impact: "", businessResults: "", projectUrl: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: projects, isLoading } = useQuery({ queryKey: ["adminProjects"], queryFn: fetchProjects });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProjects"] }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let imageUrl = "";
      if (imageFile) imageUrl = await uploadFile(imageFile);

      const projectData = imageUrl ? { ...formData, imageUrl } : formData;

      if (editingId) {
        await updateProject(editingId, projectData);
      } else {
        await createProject({ ...formData, imageUrl });
      }

      closeForm();
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
    } catch (error) {
      console.error("Failed to save project", error);
      alert("Error saving project.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      problemStatement: project.problemStatement,
      solution: project.solution,
      impact: project.impact,
      businessResults: project.businessResults,
      projectUrl: project.projectUrl || "",
    });
    setEditingId(project.id);
    setIsFormOpen(true);
    setImageFile(null);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ title: "", problemStatement: "", solution: "", impact: "", businessResults: "", projectUrl: "" });
    setImageFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-jakarta font-bold text-white">Project Portfolio</h1>
        <button onClick={() => { closeForm(); setIsFormOpen(true); }} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {isFormOpen && (
        <div className="glass-panel p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Live URL (Optional)</label>
                <input name="projectUrl" value={formData.projectUrl} onChange={handleChange} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Problem Statement</label>
                <textarea required rows={3} name="problemStatement" value={formData.problemStatement} onChange={handleChange} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Solution</label>
                <textarea required rows={3} name="solution" value={formData.solution} onChange={handleChange} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Impact</label>
                <textarea required rows={2} name="impact" value={formData.impact} onChange={handleChange} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Business Results</label>
                <textarea required rows={2} name="businessResults" value={formData.businessResults} onChange={handleChange} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image (Upload)</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full bg-black/50 border border-border rounded p-1.5 text-gray-300 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
              <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
              <button type="submit" disabled={isUploading} className="px-6 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 disabled:opacity-50">
                {isUploading ? "Uploading & Saving..." : editingId ? "Update Project" : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-white/5">
              <th className="p-4 text-sm font-semibold text-gray-400">Image</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Impact Snippet</th>
              <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <tr><td colSpan={3} className="p-4 text-center text-gray-500">Loading...</td></tr> :
              projects?.map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    {project.imageUrl ? (
                      <div className="relative w-16 h-12 overflow-hidden rounded-lg border border-border">
                        <NextImage
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-12 rounded-lg border border-border bg-white/5 flex items-center justify-center text-gray-600 text-xs">No img</div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-200">
                    {project.title}
                    {project.projectUrl && <a href={project.projectUrl} target="_blank" className="ml-2 inline-block text-blue-400"><ExternalLink size={14} /></a>}
                  </td>
                  <td className="p-4 text-sm text-gray-400 truncate max-w-md">{project.impact}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(project)} className="text-blue-400 hover:text-blue-300 p-2 rounded hover:bg-blue-400/10 transition-colors mr-2">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteMutation.mutate(project.id)} className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-400/10 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}