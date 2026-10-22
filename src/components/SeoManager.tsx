import { useLocation } from "react-router-dom";
import SeoHead from "../seo/SeoHead";

const SeoManager = () => {
  const { pathname } = useLocation();
  return <SeoHead pathname={pathname} />;
};

export default SeoManager;
