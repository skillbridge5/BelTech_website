import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eLearning from "./../assets/solutionpage/eLearning.jpg";
import above_the_footer from "../assets/above_the_footer.png";

const CharityPlatform = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans antialiased text-gray-800 pt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative">
        <div className="lg:col-span-2 relative">
          <img
            src={eLearning}
            alt="Charity Platform for SCCMA"
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
         <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center text-black bg-white/70 hover:bg-white transition px-2 py-1 rounded shadow z-10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </button>
          <div className="mt-4">
              <h1 className="text-2xl font-bold mb-2 text-gray-900">
              Website for E learning company
            </h1>
            <div className="h-0.5 bg-[#858585] w-full rounded mb-6"></div>

          <p className="text-gray-700 mb-4">
            At Beltech Solutions, we understand the challenges of delivering effective online education. Engaging students, tracking progress, and managing course content across multiple platforms can be complex. That’s why we developed LearnSmart, an advanced e-learning platform designed to streamline course delivery, enhance student engagement, and drive learning outcomes.  </p>

            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>User-Friendly Interface: Navigate courses, modules, and resources effortlessly with an intuitive design.</li>
              <li>Course Management: Create, organize, and update courses easily with a centralized platform.</li>
              <li>Analytics & Reporting: Gain insights with dashboards, KPIs, and detailed learning analytics</li>
              <li>User-Friendly Interface: Navigate complex operations effortlessly with an intuitive design.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li>Efficiency: Simplify course administration and reduce manual workload.</li>
              <li>Engagement: Keep students motivated with interactive content and progress tracking.</li>
              <li>Insight: Make data-driven decisions to improve teaching strategies and learning outcomes.</li>
              <li>Scalability: Expand your learning platform to accommodate more courses and learners without technical limits.</li>
            </ul>

          </div>
        </div>
        <div className="border-0 rounded-lg shadow-md p-6 bg-gray-100 flex flex-col items-center text-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Stay informed with tips on family child development, parenting topics, and the vital role of play in a child’s growth. You’ll also receive updates on our upcoming events and workshops.
          </p>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1 self-start">Email</label>
          <input
            type="email"
            id="email"
            placeholder=""
            className="w-full rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#27A2D8] bg-white"
          />
          <Button className="w-full bg-[#27A2D8] hover:bg-[#4db7c5] text-white font-semibold py-2">
            Subscribe
          </Button>
        </div>
      </div>
      <section
        className="relative py-10 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
         <div
    className="absolute inset-0 z-0"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.6)", 
    }}
  ></div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to right, #31A8EB, #61C7D5)",
            opacity: 0.5,
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl font-normal mb-8 max-w-3xl mx-auto">
            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Digital Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharityPlatform;
