import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Mail, X } from "lucide-react";
import toast from "react-hot-toast";
import { fetchContacts } from "../../api/client";

interface Contact {
  id: string;
  name: string;
  last_name?: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at?: string;
}

const POLL_INTERVAL_MS = 45000;

const NotificationsBell = () => {
  const navigate = useNavigate();
  const [newCount, setNewCount] = useState(0);
  const [newest, setNewest] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const prevCountRef = useRef<number | null>(null);

  const showToast = (contact: Contact) => {
    toast.custom((t) => (
      <div
        onClick={() => {
          toast.dismiss(t.id);
          navigate("/admin/contact");
        }}
        className="flex items-start gap-3 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors min-w-[300px]"
      >
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#0078B7]/10 flex items-center justify-center">
          <Mail className="h-4 w-4 text-[#0078B7]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            New contact message from {contact.name} {contact.last_name || ""}
          </p>
          <p className="text-xs text-gray-500 truncate">{contact.email}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ));
  };

  const check = async (announce: boolean) => {
    try {
      const res = await fetchContacts(1, 50);
      const contacts: Contact[] = res.data?.data?.contacts || [];
      const news = contacts.filter((c) => c.status === "new");
      setNewCount(news.length);
      setNewest(news.slice(0, 5));

      const prev = prevCountRef.current;
      if (announce && prev !== null && news.length > prev && news[0]) {
        showToast(news[0]);
      }
      prevCountRef.current = news.length;
    } catch {
      // ignore transient errors (e.g. backend sleeping)
    }
  };

  useEffect(() => {
    check(true);
    const id = setInterval(() => check(true), POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Notifications"
      >
        <Bell className="h-5 w-5 text-gray-700" />
        {newCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {newCount > 99 ? "99+" : newCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
          ></div>
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-40 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                Notifications
              </p>
              <span className="text-xs text-gray-500">
                {newCount} new message{newCount === 1 ? "" : "s"}
              </span>
            </div>

            {newCount === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500">No new messages.</p>
              </div>
            ) : (
              <div>
                {newest.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setOpen(false);
                      navigate("/admin/contact");
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {c.name} {c.last_name || ""}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {c.message}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleString()
                        : ""}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/admin/contact");
                }}
                className="text-sm font-medium text-[#0078B7] hover:underline"
              >
                View all contacts
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationsBell;