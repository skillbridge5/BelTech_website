import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f8fa] px-6 py-24 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-semibold tracking-wide text-[#0078B7]">404</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          The page you requested is not available. Explore BelTech services,
          projects, or contact the team in Addis Ababa.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-[#0078B7] text-white hover:bg-[#005C8A]">
            <Link to="/">Go to homepage</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#0078B7] text-[#0078B7]">
            <Link to="/contact">Contact BelTech</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/services">View services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
