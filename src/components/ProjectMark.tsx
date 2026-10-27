import { resolveImageUrl } from "../lib/image";

type ProjectMarkProps = {
  src?: string;
  alt: string;
  large?: boolean;
};

const ProjectMark = ({ src, alt, large = false }: ProjectMarkProps) => {
  return (
    <div className={`relative ${large ? "h-28 w-52" : "h-20 w-40"}`}>
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          filter: "drop-shadow(0 6px 8px rgba(0, 0, 0, 0.08))",
        }}
      />
      <div
        className={`absolute inset-x-5 flex items-end justify-center ${
          large ? "bottom-2 top-10" : "bottom-1 top-8"
        }`}
      >
        {src ? (
          <img
            src={resolveImageUrl(src)}
            alt={alt}
            className={`w-auto object-contain ${large ? "max-h-14 max-w-[8rem]" : "max-h-9 max-w-[6rem]"}`}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.jpg";
            }}
          />
        ) : (
          <span className="text-lg font-bold text-[#0078B7]">{alt.slice(0, 1)}</span>
        )}
      </div>
    </div>
  );
};

export default ProjectMark;
