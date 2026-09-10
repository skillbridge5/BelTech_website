import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getErrorMessage,
} from "../../api/client";
import type { Testimonial } from "../../api/client";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import ImageUpload from "../../components/ImageUpload";

interface FormState {
  name: string;
  testimonial: string;
  imageUrl: string;
  priority: number;
}

const emptyForm: FormState = {
  name: "",
  testimonial: "",
  imageUrl: "",
  priority: 0,
};

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load testimonials"), {
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
    setForm({ ...emptyForm, priority: 0 });
    setShowForm(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      testimonial: item.testimonial,
      imageUrl: item.imageUrl,
      priority: item.priority ?? 0,
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "priority"
          ? value === ""
            ? 0
            : parseInt(value, 10) || 0
          : value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.testimonial) {
      toast.error("Name and testimonial are required", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateTestimonial(editingId, form);
        toast.success("Testimonial updated", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      } else {
        await createTestimonial(form);
        toast.success("Testimonial created", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save testimonial"), {
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
      await deleteTestimonial(deleteTarget._id);
      toast.success("Testimonial deleted", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete testimonial"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = testimonials.filter(
    (t) =>
      (t.name + (t.testimonial || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Button
          onClick={openAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search testimonials..."
          className="pl-10 border-gray-300 rounded-lg"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading testimonials...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">No testimonials found.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Logo</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Testimonial
                </th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-12 w-12 object-contain rounded"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                    <span className="line-clamp-2">{item.testimonial}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.priority ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
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
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Eyoha Digitals"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial *
                </label>
                <Textarea
                  name="testimonial"
                  value={form.testimonial}
                  onChange={handleChange}
                  placeholder="What did the client say?"
                  className="border-gray-300 rounded-lg min-h-[100px]"
                />
              </div>
              <div>
                <div className="mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Client Logo
                  </label>
                </div>
                <ImageUpload
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                />
                <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                  Logo URL
                </label>
                <Input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <Input
                  name="priority"
                  type="number"
                  min={0}
                  value={form.priority}
                  onChange={handleChange}
                  placeholder="Lower shows first"
                  className="border-gray-300 rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Testimonials are sorted by priority (lowest first), then newest.
                </p>
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
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
              Delete Testimonial
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                "{deleteTarget.name}"
              </span>
              ?
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

export default TestimonialsAdmin;