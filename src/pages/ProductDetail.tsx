// @ts-ignore
import { ArrowLeft } from "lucide-react";
// @ts-ignore
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Building2,
  CalendarCheck,
  Fingerprint,
  Calculator,
  Clock,
  LayoutDashboard,
  Shield,
  Target,
  Users,
  PieChart,
  Wallet,
// @ts-ignore
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { getProducts } from "../api/client";
import type { Product } from "../api/client";
import { resolveImageUrl } from "../lib/image";
import { sanitizeBlogHtml, isHtmlContent } from "../lib/sanitizeHtml";
import above_the_footer from "../assets/above_the_footer.jpg";
import humanResource from "../assets/homepage/human-resource.svg";
type ProductModule = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type ProductPage = {
  title: string;
  kicker: string;
  summary: string;
  detail?: string;
  image: string;
  modules: ProductModule[];
  more?: { heading?: string; intro: string; items: { title: string; icon: LucideIcon }[] };
  flow?: {
    heading: string;
    intro: string;
    steps: { title: string; body: string; icon: LucideIcon }[];
  };
  spotlight?: { kicker: string; title: string; titleAccent?: string; body: string; image: string; imageAlt: string; flip?: boolean; objectPosition?: string };
  companion?: { kicker: string; title: string; titleAccent?: string; body: string; image: string; imageAlt: string; flip?: boolean; objectPosition?: string };
  closing?: { title: string; body: string; options?: { title: string; body: string; icon: LucideIcon }[] };
};

const tones = ["#0078B7", "#1493D4", "#0C6A8A", "#3D8EB5"];

// @ts-ignore
const products: Record<string, ProductPage> = {};

const AppMark = ({ icon: Icon, tone, size = "lg" }: { icon: LucideIcon; tone: string; size?: "lg" | "sm" }) => (
  <div
    className={`flex items-center justify-center text-white ${
      size === "lg" ? "h-[4.75rem] w-[4.75rem] rounded-[1.4rem]" : "h-11 w-11 rounded-2xl"
    }`}
    style={{ backgroundColor: tone, boxShadow: "0 12px 28px rgba(0, 90, 140, 0.18)" }}
  >
    <Icon className={size === "lg" ? "h-8 w-8" : "h-5 w-5"} strokeWidth={1.75} />
  </div>
);

const defaultModuleIcons: LucideIcon[] = [
  Boxes,
  Building2,
  CalendarCheck,
  Fingerprint,
  Shield,
  Target,
  Users,
  PieChart,
  Wallet,
  Clock,
  LayoutDashboard,
  Calculator,
];

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductPage | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((items: Product[]) => {
        if (!active || !Array.isArray(items) || !slug) return;
        const normalizedSlug = slug.toLowerCase().trim();

        // Find backend product matching slug, link, or id
        const match = items.find((p) => {
          const pId = (p._id || p.id || "").toLowerCase();
          const pLink = (p.link || "").toLowerCase().replace(/^\/products\//, "").replace(/^\//, "");
          const pTitleSlug = (p.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return (
            pId === normalizedSlug ||
            pLink === normalizedSlug ||
            pTitleSlug === normalizedSlug ||
            p.link === `/products/${slug}` ||
            p.link === slug
          );
        });

        if (match) {
          const parsedModules: ProductModule[] = (match.modules || "")
            .split("\n")
            .filter((l) => l.trim().length > 0)
            .map((line, idx) => {
              const parts = line.split(/:(.+)/);
              const title = parts[0]?.trim() || `Module ${idx + 1}`;
              const body = parts[1]?.trim() || parts[0]?.trim();
              return { title, body, icon: defaultModuleIcons[idx % defaultModuleIcons.length] };
            });

          const parsedFlow = (match.flow || "").trim()
            ? {
                heading: `The ${match.title} flow`,
                intro: "One connected path through your core operational lifecycle.",
                steps: (match.flow || "")
                  .split("\n")
                  .filter((l) => l.trim().length > 0)
                  .map((line, idx) => {
                    const parts = line.split(/:(.+)/);
                    const title = parts[0]?.trim() || `Step ${idx + 1}`;
                    const body = parts[1]?.trim() || parts[0]?.trim();
                    return { title, body, icon: defaultModuleIcons[idx % defaultModuleIcons.length] };
                  }),
              }
            : parsedModules.length >= 3
            ? {
                heading: `The ${match.title} flow`,
                intro: "One connected path through your core operational workflow.",
                steps: parsedModules.slice(0, 5).map((m) => ({ title: m.title, body: m.body, icon: m.icon })),
              }
            : undefined;

          const image = match.imageUrl ? resolveImageUrl(match.imageUrl) : "";
          setProduct({
            title: match.title,
            kicker: match.kicker || "Enterprise software engineered for high-performance operations",
            summary: match.description || "",
            detail: match.detail || "",
            image,
            modules: parsedModules,
            flow: parsedFlow,
            spotlight: image ? { kicker: match.kicker || "Product", title: match.title, body: match.description || "", image, imageAlt: match.title } : undefined,
            closing: {
              title: `Ready to get started with ${match.title}?`,
              body: "Talk to our engineering team for a full demonstration, architecture review, and deployment roadmap.",
              options: [
                { title: "Cloud SaaS", body: "Fully managed, secure cloud hosting with automatic updates, high availability, and 24/7 monitoring.", icon: Shield },
                { title: "On-Premise Deployment", body: "Deploy directly on your local servers for complete data residency and internal network compliance.", icon: Building2 },
              ],
            },
          });
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f8fb] px-4 pb-20 pt-32 text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-3 border-gray-300 border-t-[#0078B7] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3f8fb] px-4 pb-20 pt-32 text-gray-800">
        <div className="site-shell">
          <h1 className="text-3xl font-bold text-gray-900">This product is not listed.</h1>
          <Link to="/#products" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#0078B7]">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const rawDetail = product.detail || "";
  const hasHtml = isHtmlContent(rawDetail);
  const detailHtml = hasHtml ? sanitizeBlogHtml(rawDetail) : "";
  const detailParagraphs = !hasHtml && rawDetail.trim()
    ? rawDetail
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <section className="relative overflow-hidden bg-[#f3f8fb] pt-28">
        <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#0078B7]/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-48 h-80 w-80 rounded-full bg-[#2B9AD4]/20" aria-hidden="true" />
        <div className="site-wide relative pb-20 pt-4">
          <Link to="/#products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0078B7]">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">{product.title}</h1>
            <p className="mt-4 text-xl font-medium text-[#0078B7]">{product.kicker}</p>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">{product.summary}</p>
          </div>
          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="absolute inset-x-8 top-8 h-44 rounded-[2.75rem] bg-[#0078B7] md:inset-x-16" aria-hidden="true" />
            <div className="relative flex min-h-72 items-center justify-center rounded-[2rem] bg-white px-8 py-10 shadow-[0_28px_70px_rgba(0,70,110,0.14)]">
              <img
                src={resolveImageUrl(product.image)}
                alt={product.title}
                className="max-h-60 w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = humanResource;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {product.modules && product.modules.length > 0 ? (
        <section className="py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">One system</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-600">The modules this product is built around.</p>
            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
              {product.modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <article key={module.title} className="text-center">
                    <div className="mx-auto w-fit transition duration-300 hover:-translate-y-1">
                      <AppMark icon={Icon} tone={tones[index % tones.length]} />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-gray-900">{module.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{module.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {[product.spotlight, product.companion].some(Boolean) ? (
        <section className="bg-white py-8">
          <div className="site-wide space-y-8">
            {[product.spotlight, product.companion].filter(Boolean).map((panel) => (
              <div key={panel!.kicker} className="grid min-h-80 items-stretch overflow-hidden rounded-[2rem] bg-[#f3f8fb] sm:min-h-96 lg:grid-cols-2">
                <div className={`relative min-h-80 bg-white sm:min-h-96 ${panel!.flip ? "order-2 lg:order-2" : ""}`}>
                  <img
                    src={resolveImageUrl(panel!.image)}
                    alt={panel!.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: panel!.objectPosition ?? "center" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = humanResource;
                    }}
                  />
                </div>
                <div className={`flex min-h-80 flex-col justify-center px-8 py-12 sm:min-h-96 lg:px-12 lg:py-16 ${panel!.flip ? "order-1 lg:order-1" : ""}`}>
                  <p className="text-sm font-bold tracking-wide text-[#0078B7]">{panel!.kicker}</p>
                  <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                    {panel!.title}
                    {panel!.titleAccent ? <span className="text-[#0078B7]"> {panel!.titleAccent}</span> : null}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">{panel!.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {product.flow ? (
        <section className="bg-[#f3f8fb] py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{product.flow.heading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">{product.flow.intro}</p>
            <ol className="mx-auto mt-16 max-w-5xl">
              {product.flow.steps.map((step, index) => {
                const Icon = step.icon;
                const last = index === product.flow!.steps.length - 1;
                return (
                  <li key={step.title} className="flex gap-5">
                    <div className="flex w-14 shrink-0 flex-col items-center">
                      <div className="transition duration-300 hover:-translate-y-1">
                        <AppMark icon={Icon} tone={tones[index % tones.length]} size="sm" />
                      </div>
                      {last ? null : <div className="my-2 w-px flex-1 bg-[#0078B7]/25" aria-hidden="true" />}
                    </div>
                    <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-10"}`}>
                      <p className="text-sm font-bold text-[#0078B7]">Step {index + 1}</p>
                      <h3 className="mt-1 text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className="mt-2 max-w-xl text-base leading-relaxed text-gray-600">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {product.more ? (
        <section className="bg-[#f3f8fb] py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{product.more.heading ?? "Expand as you grow"}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">{product.more.intro}</p>
            <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {product.more.items.map((item, index) => (
                <li key={item.title} className="text-center">
                  <div className="mx-auto w-fit">
                    <AppMark icon={item.icon} tone={tones[index % tones.length]} size="sm" />
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-snug text-gray-900">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* In-Depth Product Deep Dive & Architecture (Configured via the Rich Studio Editor) */}
      {(detailHtml || detailParagraphs.length > 0) && (
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="site-wide max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-wide text-[#0078B7] uppercase">Deep Dive & Technical Details</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Inside {product.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Explore comprehensive specifications, architecture workflows, and integration guides.
              </p>
            </div>

            <div className="bg-[#fcfdfd] border border-gray-100 rounded-3xl p-6 sm:p-12 shadow-xs">
              {detailHtml ? (
                <div
                  className="blog-content leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: detailHtml }}
                />
              ) : (
                <div className="blog-content space-y-6 leading-relaxed">
                  {detailParagraphs.map((p, idx) => (
                    <p key={idx} className="text-lg leading-relaxed text-gray-700">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {product.closing ? (
        <section className="py-20">
          <div className="site-wide">
            <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">{product.closing.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed text-gray-600">{product.closing.body}</p>
            {product.closing.options ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                {product.closing.options.map((option, index) => {
                  const Icon = option.icon;
                  const lead = index === 0;
                  return (
                    <article key={option.title} className={`rounded-[2rem] p-10 ${lead ? "bg-[#0078B7] text-white" : "bg-[#e8f4fb] text-gray-900"}`}>
                      <Icon className="h-8 w-8" />
                      <h3 className="mt-6 text-3xl font-bold">{option.title}</h3>
                      <p className={`mt-3 text-lg leading-relaxed ${lead ? "text-white/90" : "text-gray-600"}`}>{option.body}</p>
                    </article>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0078B7] to-[#005C8A] opacity-50" />
        <div className="site-shell relative z-10 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let's discuss your project.</h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl font-normal">
            Based in Addis Ababa, BelTech helps businesses put ERP, corporate training, automation, and custom software into daily operations.
          </p>
          <Button
            size="lg"
            className="bg-[#0078B7] px-8 py-3 text-lg text-white hover:bg-[#005C8A]"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
            Contact the team
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
