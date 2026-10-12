import ProjectCase from "../components/ProjectCase";
import diligent from "../assets/clientLogo/diligent-mark.png";

const ERPDetail = () => {
  return (
    <ProjectCase
      kind="Odoo ERP"
      title="Diligent Trade"
      summary="An import-export company running orders, inventory, and finance in one Odoo system."
      logo={diligent}
      sections={[
        {
          title: "The situation",
          body: "Import and export work was split across orders, shipments, stock, and accounts. The company needed one system that could follow a shipment from the supplier through the warehouse and into the books.",
        },
        {
          title: "What BelTech built",
          body: "Diligent Trade on Odoo. The system covers trade orders and shipments, inventory, and financial reporting for the import-export operation.",
        },
        {
          title: "What changed",
          body: "The team follows an order through stock and accounts in the same system, instead of keeping those records apart.",
        },
      ]}
    />
  );
};

export default ERPDetail;
