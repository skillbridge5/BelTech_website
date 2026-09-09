import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import {
  getSolutions,
  createSolution,
  updateSolution,
  deleteSolution,
} from "../../api/client";
import type { Solution } from "../../api/client";
import { getErrorMessage } from "../../api/client";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import ImageUpload from "../../components/ImageUpload";

interface FormState {
  title: string;
  description: string;
  detail: string;
  imageUrl: string;
  link: string;
}

const emptyForm: FormState = {
  title: "",
  description: "",
  detail: "",
  imageUrl: "",
  link: "",
};

const SolutionsAdmin = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Solution | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getSolutions();
      setSolutions(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load solutions"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (solution: Solution) => {
    setEditingId(solution._id);
    setForm({
      title: solution.title,
      description: solution.description,
      detail: solution.detail,
      imageUrl: solution.imageUrl,
      link: solution.link,
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateSolution(editingId, form);
        toast.success("Solution updated", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      } else {
        await createSolution(form);
        toast.success("Solution created", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save solution"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSolution(deleteTarget._id);
      toast.success("Solution deleted", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete solution"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = solutions.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Solutions</h1>
        <Button
          onClick={openAdd}
          className="bg-[#0078B7] hover:bg-[#005C8A] text-white"
        >
          <Plus className="h-4 w-4" />
          Add Solution
        </Button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search solutions..."
          className="pl-10 border-gray-300 rounded-lg"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading solutions...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">No solutions found.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((solution) => (
                <tr key={solution._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {solution.imageUrl ? (
                      <img
                        src={solution.imageUrl}
                        alt={solution.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {solution.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-xs">
                    <span className="line-clamp-2">
                      {solution.description}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(solution)}
                        className="p-2 text-[#0078B7] hover:bg-[#0078B7]/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(solution)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              {editingId ? "Edit Solution" : "Add Solution"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. ERP for Import-Export company"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short summary shown on the card"
                  className="border-gray-300 rounded-lg min-h-[80px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detail Content
                </label>
                <Textarea
                  name="detail"
                  value={form.detail}
                  onChange={handleChange}
                  placeholder="Full details about the solution"
                  className="border-gray-300 rounded-lg min-h-[120px]"
                />
              </div>
              <div>
                <div className="mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                </div>
                <ImageUpload
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                />
                <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                  Image URL
                </label>
                <Input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link (route)
                </label>
                <Input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="e.g. /ERPDetail"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0078B7] hover:bg-[#005C8A] text-white"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Solution
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                "{deleteTarget.title}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolutionsAdmin;
