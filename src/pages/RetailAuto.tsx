import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import retailAutomation from "./../assets/solutionpage/retailAutomation.png"

const RetailAuto = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-700 hover:text-[#61C7D5] transition"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </button>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="border-0 rounded-lg shadow-md overflow-hidden lg:col-span-2">
          <img
            src={retailAutomation}
            alt="ERP for Textile Manufacturer"
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">
              ERP for a Textile Manufacturer
            </h1>
            <p className="text-gray-600">
          Automated sales-stock syncing for a regional retail chain, ensuring accurate inventory across branches.
            </p>
          </div>
        </Card>

        <Card className="border-0 rounded-lg shadow-md p-6 bg-gray-50 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">Subscribe</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Stay informed with tips on digital transformation and ERP adoption.
            You’ll also get updates on our upcoming events and workshops.
          </p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="w-full bg-[#61C7D5] hover:bg-[#4db7c5] text-white">
            Subscribe
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default RetailAuto;
