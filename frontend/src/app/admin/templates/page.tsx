"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTemplates, createTemplate, updateTemplate, deleteTemplate, uploadFile } from "@/lib/api";
import { Plus, Trash2, Image as ImageIcon, Edit2 } from "lucide-react";

export default function AdminTemplatesPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [features, setFeatures] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: templates, isLoading } = useQuery({ queryKey: ["adminTemplates"], queryFn: fetchTemplates });

  const deleteMutation = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminTemplates"] }),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let imageUrl = "";
      if (imageFile) imageUrl = await uploadFile(imageFile);

      const templateData = {
        title,
        description,
        category,
        liveUrl: liveUrl || "",
        features: features.split(",").map(f => f.trim()).filter(Boolean),
        imageUrl: imageUrl || ""
      };

      if (editingId) {
        await updateTemplate(editingId, templateData);
      } else {
        await createTemplate(templateData);
      }

      closeForm();
      queryClient.invalidateQueries({ queryKey: ["adminTemplates"] });
    } catch (error) {
      console.error("Failed to save template", error);
      alert("Error saving template.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (template: any) => {
    setTitle(template.title);
    setDescription(template.description);
    setCategory(template.category);
    setLiveUrl(template.liveUrl || "");
    setFeatures(template.features?.join(", ") || "");
    setEditingId(template.id);
    setIsFormOpen(true);
    setImageFile(null);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setTitle(""); setDescription(""); setCategory(""); setLiveUrl(""); setFeatures(""); setImageFile(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-jakarta font-bold text-white">Business Templates</h1>
        <button onClick={() => { closeForm(); setIsFormOpen(true); }} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus size={18} /> Add Template
        </button>
      </div>

      {isFormOpen && (
        <div className="glass-panel p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category (e.g., E-Commerce, CRM)</label>
                <input required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Live Demo URL (e.g. /demo/ecommerce)</label>
              <input value={liveUrl} onChange={e => setLiveUrl(e.target.value)} placeholder="/demo/ecommerce" className="w-full bg-black/50 border border-border rounded p-2 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/50 border border-border rounded p-2 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Features (Comma separated)</label>
              <input required value={features} onChange={e => setFeatures(e.target.value)} placeholder="User Auth, Payment Gateway, Admin Panel" className="w-full bg-black/50 border border-border rounded p-2 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Preview Image (Upload)</label>
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full bg-black/50 border border-border rounded p-1.5 text-gray-300 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white" />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
              <button type="button" onClick={closeForm} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
              <button type="submit" disabled={isUploading} className="px-6 py-2 bg-white text-black rounded font-medium hover:bg-gray-200 disabled:opacity-50">
                {isUploading ? "Uploading & Saving..." : editingId ? "Update Template" : "Save Template"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-white/5">
              <th className="p-4 text-sm font-semibold text-gray-400">Template</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Category</th>
              <th className="p-4 text-sm font-semibold text-gray-400">Inquiries</th>
              <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <tr><td colSpan={4} className="p-4 text-center text-gray-500">Loading...</td></tr> : 
              templates?.map((template) => (
              <tr key={template.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-gray-200 flex items-center gap-3">
                  {template.imageUrl ? <img src={template.imageUrl} alt="" className="w-8 h-8 rounded object-cover" /> : <ImageIcon className="text-gray-500" size={24}/>}
                  {template.title}
                </td>
                <td className="p-4 text-sm text-gray-400">
                  <span className="px-2 py-1 bg-white/5 rounded-full text-xs border border-border">{template.category}</span>
                </td>
                <td className="p-4 text-sm text-blue-400 font-medium">{template.inquiryCount || 0}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(template)} className="text-blue-400 hover:text-blue-300 p-2 rounded hover:bg-blue-400/10 transition-colors mr-2">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteMutation.mutate(template.id)} className="text-red-400 hover:text-red-300 p-2 rounded hover:bg-red-400/10 transition-colors">
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