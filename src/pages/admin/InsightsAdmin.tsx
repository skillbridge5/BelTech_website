import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import {
  loadInsights,
  createInsight,
  updateInsight,
  deleteInsight,
} from "../../api/client";
import type { Insight } from "../../api/client";
import { getErrorMessage } from "../../api/client";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  ExternalLink,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import ImageUpload from "../../components/ImageUpload";
import { resolveImageUrl } from "../../lib/image";
import { RichBlogEditor } from "../../components/admin/RichBlogEditor";
import { calculateReadingTime } from "../../lib/sanitizeHtml";

interface FormState {
  title: string;
  description: string;
  detail: string;
  imageUrl: string;
  date: string;
}

const emptyForm: FormState = {
  title: "",
  description: "",
  detail: "",
  imageUrl: "",
  date: "",
};

const InsightsAdmin = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Insight | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await loadInsights();
      setInsights(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load posts"), {
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
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] });
    setShowForm(true);
  };

  const openEdit = (insight: Insight) => {
    setEditingId(insight._id || insight.id || null);
    setForm({
      title: insight.title || "",
      description: insight.description || "",
      detail: insight.detail || "",
      imageUrl: insight.imageUrl || "",
      date: insight.date ? insight.date.split("T")[0] : "",
    });
    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (!form.title.trim()) {
      toast.error("Article Title is required", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    if (!form.description.trim()) {
      toast.error("Short description/summary is required", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setSaving(true);
    try {
      let date = new Date().toISOString();
      if (form.date) {
        const parsed = new Date(form.date);
        if (!isNaN(parsed.getTime())) {
          date = parsed.toISOString();
        }
      }

      if (editingId) {
        await updateInsight(editingId, { ...form, date });
        toast.success("Blog post updated successfully!", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      } else {
        await createInsight({ ...form, date });
        toast.success("Blog post published successfully!", {
          style: { background: "#059669", color: "#ffffff" },
        });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      console.error("Failed to save insight post:", err);
      toast.error(getErrorMessage(err, "Failed to save post"), {
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
      await deleteInsight(deleteTarget._id || deleteTarget.id || "");
      toast.success("Post deleted", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete post"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = insights.filter((i) =>
    (i.title + (i.description || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Author and structure rich blog articles with multiple embedded images, formatted headings, fonts, and colors.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-[#0078B7] hover:bg-[#005c8a] text-white flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-sm font-semibold transition-all"
        >
          <Plus className="h-4 w-4" />
          Write New Article
        </Button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title or keyword..."
          className="pl-10 border-gray-300 rounded-lg bg-white"
        />
      </div>

      {loading ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
          <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 font-medium text-sm">Loading articles...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-700 font-semibold mb-1">No blog posts found</p>
          <p className="text-gray-500 text-sm mb-4">Start creating your first structured blog post with rich images and formatting.</p>
          <Button
            onClick={openAdd}
            className="bg-[#0078B7] hover:bg-[#005c8a] text-white"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Create First Post
          </Button>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                <th className="px-4 py-3 font-semibold">Cover</th>
                <th className="px-4 py-3 font-semibold">Article Title & Excerpt</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Publish Date</th>
                <th className="px-4 py-3 font-semibold hidden lg:table-cell">Read Time</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((insight) => {
                const readMinutes = calculateReadingTime(insight.detail || insight.description || "");
                return (
                  <tr key={insight._id || insight.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 align-top">
                      {insight.imageUrl ? (
                        <img
                          src={resolveImageUrl(insight.imageUrl)}
                          alt={insight.title}
                          className="h-14 w-20 object-cover rounded-lg border border-gray-200 shadow-2xs"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/assets/new-logo-free.png";
                          }}
                        />
                      ) : (
                        <div className="h-14 w-20 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          No cover
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top max-w-md">
                      <p className="font-semibold text-gray-900 leading-snug hover:text-[#0078B7] transition-colors">
                        {insight.title}
                      </p>
                      <p className="text-gray-500 text-xs line-clamp-2 mt-1 leading-relaxed">
                        {insight.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-600 text-xs hidden md:table-cell whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {insight.date
                          ? new Date(insight.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top text-gray-600 text-xs hidden lg:table-cell whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-gray-500">
                        <Clock className="h-3.5 w-3.5 text-gray-400" />
                        ~{readMinutes} min
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/blog/${insight._id || insight.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[#0078B7] hover:bg-blue-50 rounded-lg transition-colors"
                          title="View live published article"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          onClick={() => openEdit(insight)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit article"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(insight)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Structured Blog Studio Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0078B7]" />
                  {editingId ? "Edit Blog Article" : "Create New Blog Article"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Full formatting support: rich typography, fonts, colors, lists, callout boxes, and multiple embedded images.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Top metadata grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Article Title *
                  </label>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. How Enterprise ERP Drives Sustainable Growth in Modern Manufacturing"
                    className="border-gray-300 rounded-lg font-semibold text-base py-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Publication Date
                  </label>
                  <Input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border-gray-300 rounded-lg py-2.5"
                  />
                </div>
              </div>

              {/* Short Summary / Card Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Summary / Excerpt * (Shown on Blog listing cards & SEO preview)
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="A compelling 2-3 sentence overview that hooks the reader and appears on the blog feed card..."
                  className="border-gray-300 rounded-lg min-h-[75px] text-sm leading-relaxed"
                  required
                />
              </div>

              {/* Cover Image */}
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Featured Header Image (Hero Cover)
                </label>
                <ImageUpload
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                />
                <div className="mt-2">
                  <Input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="Or paste an image URL (e.g. https://... or /assets/...)"
                    className="border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Main Rich Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Full Article Body & Layout Structure
                  </label>
                  <span className="text-xs text-[#0078B7] font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Place images, colors & fonts anywhere inside
                  </span>
                </div>

                <RichBlogEditor
                  value={form.detail}
                  onChange={(html) =>
                    setForm((prev) => ({ ...prev, detail: html }))
                  }
                  minHeight="480px"
                  placeholder="Structure your story here: write paragraphs, add headings, customize font sizes and colors, and click 'Insert Image' to drop illustrations right where you need them..."
                />
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="px-5 cursor-pointer"
                >
                  Cancel
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={() => handleSave()}
                    disabled={saving}
                    className="bg-[#0078B7] hover:bg-[#005c8a] text-white px-7 font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : editingId ? (
                      "Update Article"
                    ) : (
                      "Publish Article"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Blog Article</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-gray-900">"{deleteTarget.title}"</span>? This action cannot be undone.
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
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                {deleting ? "Deleting..." : "Delete Permanently"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightsAdmin;
