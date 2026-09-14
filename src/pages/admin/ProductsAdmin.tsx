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
import { Plus, Pencil, Trash2, X, Search, ExternalLink } from "lucide-react";
import ImageUpload from "../../components/ImageUpload";

interface FormState {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  priority: number;
}

const emptyForm: FormState = {
  title: "",
  description: "",
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
    setEditingId(product._id);
    setForm({
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      link: product.link,
      priority: product.priority ?? 0,
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
    if (!form.title) {
      toast.error("Title is required", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        toast.success("Product updated", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      } else {
        await createProduct(form);
        toast.success("Product created", {
          style: { background: "#0078B7", color: "#ffffff" },
        });
      }
      setShowForm(false);
      load();
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
      await deleteProduct(deleteTarget._id);
      toast.success("Product deleted", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete product"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button
          onClick={openAdd}
          className="bg-[#0078B7] hover:bg-[#005C8A] text-white"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-gray-600">
          These products appear in the "Our Products" section on the homepage.
          The link you set here is used by the "Learn More" button on each
          product card.
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
        <p className="text-gray-500">Loading products...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">No products found.</p>
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
                <th className="px-4 py-3 font-medium">Link</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-xs">
                    <span className="line-clamp-2">
                      {product.description}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.link ? (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#0078B7] hover:underline max-w-[160px] truncate"
                      >
                        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{product.link}</span>
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">No link</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {product.priority ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 text-[#0078B7] hover:bg-[#0078B7]/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(product)}
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
              {editingId ? "Edit Product" : "Add Product"}
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
                  placeholder="e.g. School360"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
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
                  Link (destination for the Learn More button)
                </label>
                <Input
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="e.g. https://school360.beltech.com or /about"
                  className="border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority (lower number shows first)
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
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                "{deleteTarget.title}"
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

export default ProductsAdmin;