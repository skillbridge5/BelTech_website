import ProjectCase from "../components/ProjectCase";
import skillBridge from "../assets/clientLogo/skillBridge-mark.png";

const CharityPlatform = () => {
  return (
    <ProjectCase
      kind="Website"
      title="SkillBridge Institute of Technology"
      summary="A site where the institute presents its programs and prospective students can enquire."
      logo={skillBridge}
      sections={[
        {
          title: "The situation",
          body: "SkillBridge Institute of Technology needed a public site for its programs, with a clear way for prospective students to enquire.",
        },
        {
          title: "What BelTech built",
          body: "A website that presents the institute’s programs and brings course information and enquiries into one place.",
        },
        {
          title: "What changed",
          body: "People looking at the institute can read the programs and send an enquiry from the site.",
        },
      ]}
    />
  );
};

export default CharityPlatform;
