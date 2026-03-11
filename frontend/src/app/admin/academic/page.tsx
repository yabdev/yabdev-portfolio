"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAcademicPapers, createPaper, updatePaper, deletePaper, uploadFile } from "@/lib/api";
import { Plus, Trash2, FileText, Edit2 } from "lucide-react";

export default function AdminAcademicPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [abstractText, setAbstractText] = useState("");
  const [tags, setTags] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch Papers
  const { data: papers, isLoading } = useQuery({ queryKey: ["adminPapers"], queryFn: fetchAcademicPapers });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deletePaper,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminPapers"] }),
  });

  // Handle Form Submit (Upload File -> Create Record)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let pdfUrl = "";
      if (pdfFile) {
        pdfUrl = await uploadFile(pdfFile); 
      }

      const paperData = {
        title,
        abstractText,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        pdfUrl: pdfUrl || "",
      };

      if (editingId) {
        await updatePaper(editingId, paperData);
      } else {
        await createPaper(paperData);
      }

      closeForm();
      queryClient.invalidateQueries({ queryKey: ["adminPapers"] });
    } catch (error) {
      console.error("Failed to save paper", error);
      alert("Error saving paper.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (paper: any) => {
    setTitle(paper.title);
    setAbstractText(paper.abstractText);
    setTags(paper.tags?.join(", ") || "");
    setEditingId(paper.id);
    setIsFormOpen(true);
    setPdfFile(null);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setTitle(""); setAbstractText(""); setTags(""); setPdfFile(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-jakarta font-bold text-white">Academic Papers</h1>
        <button 
          onClick={() => { closeForm(); setIsFormOpen(true); }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} /> Add New Paper
        </button>
      </div>

      {isFormOpen && (
        <div className="glass-panel p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Abstract</label>
              <textarea required rows={4} value={abstractText} onChange={e => setAbstractText(e.target.value)} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tags (Comma separated)</label>
                <input required value={tags} onChange={e => setTags(e.target.value)} placeholder="AI, Machine Learning, Architecture" className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Upload PDF Document</label>
                <input type="file" accept="application/pdf" onChange={e => setPdfFile(e.target.files?.[0] || null)} className="w-full bg-black/50 border border-border rounded p-1.5 text-gray-300 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
              <button type="submit" disabled={isUploading} className="px-6 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 disabled:opacity-50">
                {isUploading ? "Uploading & Saving..." : editingId ? "Update Publication" : "Save Publication"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Data Table */}
      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-white/5">
              <th className="p-4 text-sm font-semibold text-gray-400">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Tags</th>
              <th className="p-4 text-sm font-semibold text-gray-400">PDF</th>
              <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="p-4 text-center text-gray-500">Loading data...</td></tr>
            ) : papers?.map((paper) => (
              <tr key={paper.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-gray-200">{paper.title}</td>
                <td className="p-4 text-sm text-gray-400">{paper.tags?.join(", ")}</td>
                <td className="p-4">
                  {paper.pdfUrl ? <a href={paper.pdfUrl} target="_blank" className="text-blue-400 hover:underline flex items-center gap-1"><FileText size={16}/> View</a> : <span className="text-gray-500">N/A</span>}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(paper)} className="text-blue-400 hover:text-blue-300 p-2 rounded hover:bg-blue-400/10 transition-colors mr-2">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteMutation.mutate(paper.id)} className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-400/10 transition-colors">
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