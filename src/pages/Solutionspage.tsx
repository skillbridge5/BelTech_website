import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { getSolutions } from "../api/client";
import type { Solution } from "../api/client";
import solutionHero from "../assets/solutionpage/projects-intro.jpg";
import above_the_footer from "../assets/above_the_footer.jpg";
import diligent from "../assets/clientLogo/diligent-mark.png";
import skillBridge from "../assets/clientLogo/skillBridge-mark.png";
import eyoha from "../assets/clientLogo/eyoha-mark.png";
import PageIntro from "../components/PageIntro";
import ProjectMark from "../components/ProjectMark";

type Project = {
  client: string;
  kind: string;
  summary: string;
  logo?: string;
  imageUrl?: string;
  link: string;
};

const projects: Project[] = [
  {
    client: "Diligent Trade",
    kind: "Odoo ERP",
    summary:
      "An import-export company running orders, inventory, and finance in one Odoo system.",
    logo: diligent,
    link: "/projects/diligent-trade",
  },
  {
    client: "SkillBridge Institute of Technology",
    kind: "Website",
    summary:
      "A site where the institute presents its programs and prospective students can enquire.",
    logo: skillBridge,
    link: "/projects/skillbridge",
  },
  {
    client: "Eyoha Digitals",
    kind: "Website",
    summary:
      "A site for the studio’s services, portfolio, and consultation requests.",
    logo: eyoha,
    link: "/projects/eyoha-digitals",
  },
];

const coveredLinks = new Set([
  ...projects.map((project) => project.link),
  "/ERPDetail",
  "/CharityPlatform",
  "/RetailAuto",
]);

const SolutionsPage = () => {
  const [extraProjects, setExtraProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true;
    getSolutions()
      .then((data: Solution[]) => {
        if (!mounted || !Array.isArray(data)) return;
        const extras = data
          .filter((item) => item.link && !coveredLinks.has(item.link))
          .map((item) => ({
            client: item.title,
            kind: "Project",
            summary: item.description,
            imageUrl: item.imageUrl,
            link: item.link,
          }));
        setExtraProjects(extras);
      })
      .catch(() => {
        if (mounted) setExtraProjects([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const allProjects = [...projects, ...extraProjects];

  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <PageIntro
        image={solutionHero}
        overlayClassName="bg-gradient-to-b from-black/55 via-black/45 to-black/60"
        title="Projects we have delivered."
      >
        ERP systems and websites built for the companies BelTech works with.
      </PageIntro>

      <section className="bg-[#f7f8fa] py-20">
        <div className="site-wide">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((project) => (
              <article
                key={project.link}
                className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-md"
              >
                <div className="relative bg-gradient-to-b from-[#2B9AD4] to-[#0078B7] px-6 pb-14 pt-6 text-white">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
                  <div className="relative flex items-start justify-between gap-4">
                    <p className="text-[1.7rem] font-extrabold leading-[0.95] tracking-tight">
                      {project.kind}
                    </p>
                    <p className="max-w-[8.5rem] text-right text-[11px] font-semibold leading-tight tracking-wide text-white/85">
                      {project.client}
                    </p>
                  </div>
                  <div className="relative mt-5">
                    <span className="inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold">
                      {project.kind}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-[54%]">
                    <ProjectMark src={project.logo || project.imageUrl} alt="" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
                  <h2 className="text-center text-lg font-extrabold leading-snug tracking-tight text-gray-900">
                    {project.client}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-[#0078B7]">BelTech Solutions</span>
                    <span className="rounded-full bg-[#E8F4FB] px-3 py-1 text-xs font-semibold text-[#5B7C99]">
                      {project.kind}
                    </span>
                  </div>
                  <div className="mt-5 rounded-2xl bg-[#E8F4FB] px-4 py-4 text-center">
                    <p className="text-sm font-semibold leading-relaxed text-[#0078B7]">{project.summary}</p>
                  </div>
                  <Link
                    to={project.link}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#0078B7] px-4 py-3 text-sm font-semibold text-white hover:bg-[#005C8A]"
                  >
                    Read the project
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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

export default SolutionsPage;
