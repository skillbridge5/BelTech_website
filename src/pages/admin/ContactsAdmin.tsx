import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchContacts,
  updateContactStatus,
  getErrorMessage,
} from "../../api/client";
import { Search, Eye, X, CheckCircle2, Reply, Inbox } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  last_name?: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at?: string;
}

const statusStyles: Record<Contact["status"], string> = {
  new: "bg-blue-50 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  replied: "bg-emerald-50 text-emerald-700",
};

const statusLabels: Record<Contact["status"], string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | Contact["status"]
  >("all");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchContacts(1, 100);
      const data = res.data?.data?.contacts || [];
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load contacts"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (contact: Contact, status: Contact["status"]) => {
    setUpdating(contact.id);
    try {
      await updateContactStatus(contact.id, status);
      toast.success("Status updated", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
      setSelected((cur) => (cur && cur.id === contact.id ? { ...cur, status } : cur));
      setContacts((cur) =>
        cur.map((c) => (c.id === contact.id ? { ...c, status } : c))
      );
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update status"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setUpdating(null);
    }
  };

  const filtered = contacts.filter((c) => {
    const matchesSearch = (c.name + (c.email || "") + (c.message || ""))
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }: { status: Contact["status"] }) => (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <Button
          onClick={load}
          className="bg-[#0078B7] hover:bg-[#005C8A] text-white"
        >
          <Inbox className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "new", "read", "replied"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                statusFilter === s
                  ? "bg-[#0078B7] text-white border-[#0078B7]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All" : statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading contacts...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500">No contacts found.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Message
                </th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {c.name} {c.last_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-[280px] truncate">
                    {c.message}
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                    {c.created_at
                      ? new Date(c.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelected(c)}
                        className="p-2 text-[#0078B7] hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {c.status !== "replied" && (
                        <button
                          onClick={() => changeStatus(c, "replied")}
                          disabled={updating === c.id}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Mark as replied"
                        >
                          <Reply className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Contact Message
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Status</span>
                <StatusBadge status={selected.status} />
              </div>
              <div>
                <p className="text-gray-500 font-medium mb-1">Name</p>
                <p className="text-gray-900">
                  {selected.name} {selected.last_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500 font-medium mb-1">Email</p>
                <p className="text-gray-900">{selected.email}</p>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-gray-500 font-medium mb-1">Phone</p>
                  <p className="text-gray-900">{selected.phone}</p>
                </div>
              )}
              {selected.organization && (
                <div>
                  <p className="text-gray-500 font-medium mb-1">Organization</p>
                  <p className="text-gray-900">{selected.organization}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 font-medium mb-1">Message</p>
                <p className="text-gray-900 whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {selected.status !== "read" && (
                <Button
                  variant="outline"
                  disabled={updating === selected.id}
                  onClick={() => changeStatus(selected, "read")}
                  className="inline-flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as read
                </Button>
              )}
              {selected.status !== "replied" && (
                <Button
                  disabled={updating === selected.id}
                  onClick={() => changeStatus(selected, "replied")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white inline-flex items-center gap-2"
                >
                  <Reply className="h-4 w-4" />
                  Mark as replied
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsAdmin;