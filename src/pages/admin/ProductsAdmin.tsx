import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/client";
import type { Product } from "../../api/client";
import { getErrorMessage } from "../../api/client";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Layers,
  Workflow,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import ImageUpload from "../../components/ImageUpload";
import RichBlogEditor from "../../components/admin/RichBlogEditor";
import { resolveImageUrl } from "../../lib/image";

interface FormState {
  title: string;
  description: string;
  kicker: string;
  detail: string;
  modules: string;
  flow: string;
  imageUrl: string;
  link: string;
  priority: number;
}

const emptyForm: FormState = {
  title: "",
  description: "",
  kicker: "",
  detail: "",
  modules: "",
  flow: "",
  imageUrl: "",
  link: "",
  priority: 0,
};

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load products"), {
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

  const openEdit = (product: Product) => {
    setEditingId(product._id || product.id || null);
    setForm({
      title: product.title || "",
      description: product.description || "",
      kicker: product.kicker || "",
      detail: product.detail || "",
      modules: product.modules || "",
      flow: product.flow || "",
      imageUrl: product.imageUrl || "",
      link: product.link || "",
      priority: product.priority ?? 0,
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
      toast.error("Product Title is required", {
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

    let link = form.link.trim();
    if (!link) {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      link = `/products/${slug}`;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        link,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success("Product updated successfully!", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      } else {
        await createProduct(payload);
        toast.success("Product created successfully!", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      }
      setShowForm(false);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to save product"), {
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
      await deleteProduct(deleteTarget._id || deleteTarget.id || "");
      toast.success("Product deleted", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setDeleteTarget(null);
      await load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete product"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = products.filter((p) =>
    (p.title || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Studio</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your flagship products, homepage cards, and rich product detail pages.
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-[#0078B7] hover:bg-[#005C8A] text-white flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-sky-900 leading-relaxed">
          <strong>Tip:</strong> Products appear in the "Our Products" section on the homepage. Clicking "Learn More" directs visitors to the rich product detail page. Each detail page can be customized just like a blog with multiple embedded images, headings, callout boxes, and full typography.
        </p>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="pl-10 border-gray-300 rounded-lg"
        />
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <div className="h-7 w-7 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Loading products...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title & Subtitle</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Card Summary
                </th>
                <th className="px-4 py-3 font-medium">Detail Route</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((product) => (
                <tr key={product._id || product.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3">
                    {product.imageUrl ? (
                      <img
                        src={resolveImageUrl(product.imageUrl)}
                        alt={product.title}
                        className="h-12 w-16 object-contain rounded border border-gray-100 bg-gray-50 p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/new-logo-free.png";
                        }}
                      />
                    ) : (
                      <div className="h-12 w-16 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs font-medium">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div className="font-bold">{product.title}</div>
                    {product.kicker ? (
                      <div className="text-xs text-[#0078B7] font-normal truncate max-w-xs">{product.kicker}</div>
                    ) : (
                      <div className="text-xs text-gray-400 font-normal">No kicker</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-xs">
                    <span className="line-clamp-2 text-xs">
                      {product.description}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.link ? (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#0078B7] hover:underline max-w-[170px] truncate text-xs font-semibold"
                      >
                        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{product.link}</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">
                        /products/{product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {product.priority ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={product.link || `/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View Live Detail Page"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 text-[#0078B7] hover:bg-[#0078B7]/10 rounded-lg transition-colors cursor-pointer"
                        title="Edit Product & Detail Page"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
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

      {/* Structured Product Studio Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0078B7]" />
                  {editingId ? "Edit Product & Detail Page" : "Add New Product & Detail Page"}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure product cards, hero subtitles, core modules, and full blog-style detail pages with multiple embedded images and formatting.
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. School360 or Ethiopian HRMS"
                    className="border-gray-300 rounded-lg font-semibold text-base py-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Display Priority
                  </label>
                  <Input
                    name="priority"
                    type="number"
                    min={0}
                    value={form.priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority: parseInt(e.target.value || "0", 10),
                      })
                    }
                    className="border-gray-300 rounded-lg py-2.5"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Lower numbers appear first on homepage.</p>
                </div>
              </div>

              {/* Subtitle / Kicker & Route */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Detail Page Subtitle / Kicker
                  </label>
                  <Input
                    name="kicker"
                    value={form.kicker}
                    onChange={handleChange}
                    placeholder="e.g. Complete HR and payroll management for Ethiopian businesses"
                    className="border-gray-300 rounded-lg py-2 text-sm"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Displayed prominently beneath the product title on the detail page hero.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Detail Page Route URL
                  </label>
                  <Input
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    placeholder="e.g. /products/carecentral (leave empty to auto-generate)"
                    className="border-gray-300 rounded-lg py-2 text-sm"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Destination when visitors click "Learn More" on the homepage card.
                  </p>
                </div>
              </div>

              {/* Short Summary */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Card Summary / Short Excerpt * (Homepage card & detail page header)
                </label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="A clear 2-3 sentence overview that appears on the homepage product card..."
                  className="border-gray-300 rounded-lg min-h-[75px] text-sm leading-relaxed"
                  required
                />
              </div>

              {/* Featured Product Hero Image */}
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4 text-[#0078B7]" />
                  Product Featured Image (Card & Hero Preview)
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
                    placeholder="Or paste an image URL (e.g. /assets/homepage/care.jpg or https://...)"
                    className="border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Core Modules Builder */}
              <div className="p-4 bg-sky-50/60 rounded-xl border border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#0078B7] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    Key Modules & Capabilities (One per line)
                  </label>
                  <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-sky-200 text-sky-800 font-medium">
                    Rendered in "One System" Grid
                  </span>
                </div>
                <Textarea
                  name="modules"
                  value={form.modules}
                  onChange={handleChange}
                  placeholder={"Employee Management: Comprehensive profiles, digital contract records, and career history.\nBiometric Attendance: ZKTeco fingerprint device synchronization with automated punch validation.\nShift Scheduling: Fixed, rotating, overnight, and flexible work schedules.\nEthiopian Payroll: Tax tiered calculations, pension deductions, and automated payslips."}
                  className="border-gray-300 rounded-lg bg-white min-h-[110px] text-xs font-mono"
                />
                <p className="text-[11px] text-gray-600">
                  Format: <code>Module Title: Description of capability</code> on each line. These automatically generate the icons and cards in the detail page modules grid.
                </p>
              </div>

              {/* Workflow Journey / The Flow Steps */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Workflow className="h-4 w-4 text-emerald-600" />
                    Workflow Journey ("The Flow" Connected Timeline)
                  </label>
                  <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800 font-medium">
                    Rendered in "The Flow" Section
                  </span>
                </div>
                <Textarea
                  name="flow"
                  value={form.flow}
                  onChange={handleChange}
                  placeholder={"Employee Record: Profiles, contracts, departments, and career history in one record.\nBiometric Attendance: Staff check in on ZKTeco device with automated validation.\nShifts, Leave & Overtime: Shift schedules, leave requests, and overtime feed time tracking.\nPayroll & Pension: Tax tiered calculations, pension contributions, and automated payslips."}
                  className="border-gray-300 rounded-lg bg-white min-h-[100px] text-xs font-mono"
                />
                <p className="text-[11px] text-gray-600">
                  Optional. Format: <code>Step Title: Step Description</code> on each line. If left blank, the system automatically builds the connected flow timeline from your core modules.
                </p>
              </div>

              {/* Rich Detail Page Editor (Blog-Style Deep Dive) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#0078B7]" />
                    In-Depth Product Detail Page (Rich Studio Editor)
                  </label>
                  <span className="text-xs text-[#0078B7] font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Drop images, headings, colors, tables & callouts anywhere
                  </span>
                </div>

                <RichBlogEditor
                  value={form.detail}
                  onChange={(html) =>
                    setForm((prev) => ({ ...prev, detail: html }))
                  }
                  minHeight="480px"
                  placeholder="Structure your product detail page here: write section overviews, add headings, customize font sizes and brand colors, and click 'Insert Image' to embed product screenshots, architecture diagrams, and workflow visuals right where you want them..."
                />
              </div>

              {/* Actions */}
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
                      "Update Product"
                    ) : (
                      "Publish Product"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                "{deleteTarget.title}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
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

export default ProductsAdmin;
