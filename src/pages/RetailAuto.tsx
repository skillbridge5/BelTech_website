import ProjectCase from "../components/ProjectCase";
import eyoha from "../assets/clientLogo/eyoha-mark.png";

const RetailAuto = () => {
  return (
    <ProjectCase
      kind="Website"
      title="Eyoha Digitals"
      summary="A site for the studio’s services, portfolio, and consultation requests."
      logo={eyoha}
      sections={[
        {
          title: "The situation",
          body: "Eyoha Digitals needed a site that could show the studio’s services and past work, and let a potential client ask for a consultation.",
        },
        {
          title: "What BelTech built",
          body: "The Eyoha Digitals website, with services, a portfolio, and a consultation request.",
        },
        {
          title: "What changed",
          body: "The studio can present its work and take enquiries from the site.",
        },
      ]}
    />
  );
};

export default RetailAuto;
