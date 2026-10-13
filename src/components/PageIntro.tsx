import type { ReactNode } from "react";

type PageIntroProps = {
  image: string;
  mobileImage?: string;
  title: string;
  children: ReactNode;
  overlayClassName?: string;
};

const PageIntro = ({
  image,
  mobileImage,
  title,
  children,
  overlayClassName = "bg-gradient-to-b from-black/60 via-black/45 to-black/65",
}: PageIntroProps) => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden text-white"
      style={{ backgroundColor: "black" }}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center ${mobileImage ? "hidden md:block" : ""}`}
        style={{ backgroundImage: `url(${image})` }}
      />
      {mobileImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${mobileImage})` }}
        />
      ) : null}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="site-shell relative pt-28 text-center">
        <h1
          className="text-4xl leading-tight md:text-5xl lg:text-6xl"
          style={{ fontFamily: "Poppins", fontWeight: 90 }}
        >
          {title}
        </h1>
        <p
          className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl"
          style={{ fontFamily: "Poppins", fontWeight: 90 }}
        >
          {children}
        </p>
      </div>
    </section>
  );
};

export default PageIntro;
