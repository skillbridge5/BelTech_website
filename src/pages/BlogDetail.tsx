import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { loadInsights } from "../api/client";
import type { Insight } from "../api/client";
import { resolveImageUrl } from "../lib/image";
import { Button } from "../components/ui/button";
import above_the_footer from "../assets/above_the_footer.jpg";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!id) return;

    loadInsights()
      .then((items: Insight[]) => {
        if (!active || !Array.isArray(items)) return;
        const normalized = id.toLowerCase().trim();

        const match = items.find((i) => {
          const iId = (i._id || i.id || "").toLowerCase();
          const iSlug = (i.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return iId === normalized || iSlug === normalized;
        });

        if (match) {
          setInsight(match);
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!", {
        style: { background: "#0078B7", color: "#ffffff" },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-white px-4 pb-20 pt-32 text-gray-800">
        <div className="site-shell text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = (insight.detail || insight.description || "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const formattedDate = insight.date
    ? new Date(insight.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently published";

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased pt-28">
      {/* Article Header */}
      <article className="site-wide max-w-4xl mx-auto px-4 pb-16">
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F4FB] text-[#0078B7] px-3 py-1 rounded-full font-semibold text-xs">
            BelTech Insights
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-400" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-gray-400" />
            BelTech Engineering Team
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gray-400" />
            4 min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
          {insight.title}
        </h1>

        <p className="text-xl text-gray-600 font-medium leading-relaxed mb-8">
          {insight.description}
        </p>

        {/* Cover Image */}
        {insight.imageUrl && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-gray-100 shadow-md bg-gray-50">
            <img
              src={resolveImageUrl(insight.imageUrl)}
              alt={insight.title}
              className="w-full max-h-[460px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/new-logo-free.png";
              }}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gray-800 space-y-6 leading-relaxed">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-lg leading-relaxed text-gray-700">
              {p}
            </p>
          ))}
        </div>

        {/* Share & Actions */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-semibold text-[#0078B7] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            More Articles
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            Share Article
          </button>
        </div>
      </article>

      {/* Bottom CTA */}
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078B7]/80 to-[#005C8A]/80" />
        <div className="site-shell relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Accelerate Your Digital Operations?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Partner with BelTech to engineer scalable ERP, custom software, and corporate digital systems.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-[#0078B7] hover:bg-gray-100 font-bold px-8">
                Speak to our consultants
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
