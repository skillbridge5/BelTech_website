import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import above_the_footer from "../assets/above_the_footer.jpg";
import ProjectMark from "./ProjectMark";

type Section = {
  title: string;
  body: string;
};

type ProjectCaseProps = {
  kind: string;
  title: string;
  summary: string;
  logo: string;
  sections: Section[];
};

const ProjectCase = ({ kind, title, summary, logo, sections }: ProjectCaseProps) => {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-800 antialiased">
      <section className="relative bg-gradient-to-b from-[#2B9AD4] to-[#0078B7] pb-20 pt-32 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-16 top-16 h-56 w-56 rounded-full bg-white/10" />
        </div>
        <div className="site-shell relative">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <div className="mt-8 flex items-start justify-between gap-6">
            <p className="text-4xl font-extrabold leading-[0.95] tracking-tight md:text-5xl">{kind}</p>
            <p className="max-w-[12rem] text-right text-sm font-semibold leading-tight tracking-wide text-white/85">
              {title}
            </p>
          </div>
          <div className="mt-6">
            <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold">
              {kind}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-[54%]">
          <ProjectMark src={logo} alt="" large />
        </div>
      </section>

      <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-20 sm:px-6">
        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-base font-semibold text-[#0078B7]">BelTech Solutions</span>
          <span className="rounded-full bg-[#E8F4FB] px-3 py-1 text-sm font-semibold text-[#5B7C99]">{kind}</span>
        </div>
        <div className="mt-6 rounded-2xl bg-white px-6 py-5 text-center shadow-sm">
          <p className="text-lg font-semibold leading-relaxed text-[#0078B7]">{summary}</p>
        </div>

        <div className="mt-10 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl bg-white px-6 py-5 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-gray-900">{section.title}</h2>
              <div className="mt-2 h-0.5 w-14 bg-[#0078B7]" />
              <p className="mt-4 text-base leading-relaxed text-gray-700">{section.body}</p>
            </section>
          ))}
        </div>
      </article>

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

export default ProjectCase;
