import { ShoppingCart, Factory, Truck, Building2, FileText, Hospital, UtensilsCrossed, CheckCircle, GraduationCap } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import above_the_footer from "./../assets/above_the_footer.png";
import hero from "../../src/assets/in/hero1.png"
import hos from "../../src/assets/in/hospital.png"
import market from "../../src/assets/in/market.png"
import importexport from "../../src/assets/in/import.png"
import acc from "../../src/assets/in/acc.png"
const industries = [
  {
    id: "retail",
    icon: ShoppingCart,
    title: "Retail & Supermarkets",
    lead: "Run your shop like a modern chain.",
    bullets: [
      "Multi-branch POS",
      "Barcode inventory + automated stock alerts",
      "Real-time sales dashboards",
    ],
    quote: "Know exactly what's selling, what's missing, and what's making money — from your phone.",
    image: market,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    lead: "Turn production into a controlled, measurable process.",
    bullets: [
      "BoM, work orders, quality control",
      "Batch & lot tracking for compliance",
      "Production cost analysis",
    ],
    quote: "No more guesswork. Know your cost per product before you produce.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    id: "import",
    icon: Truck,
    title: "Import, Export & Distribution",
    lead: "Visibility from shipment to warehouse shelf.",
    bullets: [
      "Landed cost (tax, transport, freight, insurance)",
      "Multi-currency vendor management",
      "Warehouse + delivery tracking",
    ],
    quote: "Stop losing profit on hidden costs. Track every birr from customs to customer.",
    image: importexport,
    gradient: "from-teal-500 to-green-500",
  },
  {
    id: "construction",
    icon: Building2,
    title: "Construction & Real Estate",
    lead: "Control project costs and eliminate leakage.",
    bullets: [
      "Material usage tracking + supplier invoicing",
      "Project budget vs. actual cost monitoring",
      "Timesheets & subcontractor management",
    ],
    quote: "See where money is going — before it disappears.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "services",
    icon: FileText,
    title: "Service Businesses & Accounting Firms",
    lead: "Get paid without chasing clients.",
    bullets: [
      "CRM + Projects + Invoicing in one system",
      "Subscription billing (perfect for retainers)",
      "Automated follow-ups for unpaid invoices",
    ],
    quote: "Invoice smarter — not harder.",
    image:acc,
    gradient: "from-emerald-500 to-blue-500",
  },
  {
    id: "health",
    icon: Hospital,
    title: "Hospitals, Clinics & Pharmacies",
    lead: "Less paper. More patient care.",
    bullets: [
      "Patient management + appointment scheduling",
      "Pharmacy stock expiry tracking",
      "Integrated billing + accounting",
    ],
    quote: "Your whole facility in one system — zero paperwork.",
    image: hos,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "restaurants",
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    lead: "Fast service. Zero wastage.",
    bullets: [
      "POS + kitchen display",
      "Recipe costing and ingredient consumption",
      "Delivery, takeaway, and table management",
    ],
    quote: "Know your profit per plate — not just your daily sales.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Schools, Colleges & Universities",
    lead: "Smart management. Seamless operations.",
    bullets: [
      "Student enrollment & academic records",
      "Attendance, grading, and timetable management",
      "Fees, accounting, and administration in one system",
    ],
    quote: "Run your institution with clarity",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    gradient: "from-indigo-500 to-sky-500",
  },
];

const Industries = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 lg:px-25 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
                Industries We Serve
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl">
                We automate business operations so you stop managing chaos and start managing growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      {industries.map((industry, index) => {
        const Icon = industry.icon;
        const isEven = index % 2 === 0;
        const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-[#f7f8fa]';

        return (
          <section key={industry.id} className={`py-20 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Section */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-10 rounded-3xl blur-2xl group-hover:opacity-15 transition-opacity duration-500`}></div>
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-[400px] lg:h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-3 bg-[#27A2D8] rounded-xl">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {industry.title}
                          </h3>
                        </div>
                        <p className="text-white/90 text-lg font-medium">
                          {industry.lead}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="space-y-6">
                    {/* Features List */}
                    <div className="space-y-4">
                      {industry.bullets.map((bullet, bulletIndex) => (
                        <motion.div
                          key={bulletIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: bulletIndex * 0.1 }}
                          className="flex items-start gap-4 group"
                        >
                          <div className="shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full bg-[#27A2D8] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <p className="text-gray-700 text-lg leading-relaxed pt-1">
                            {bullet}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="relative p-6 rounded-2xl bg-gradient-to-br from-[#27A2D8]/10 to-[#27A2D8]/5 border-l-4 border-[#27A2D8]"
                    >
                      <p className="text-gray-800 text-lg italic leading-relaxed">
                        "{industry.quote}"
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      
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
              Join hundreds of African businesses that have streamlined their
              operations with BelTech Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8]  text-white hover:bg-[#27A2D8]-100"
                onClick={() => (window.location.href = "/contact")}
              >
                Start Your Digital Journey
              </Button>
              <Button
                size="lg"
                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8]  text-white hover:bg-[#27A2D8]-100"
                onClick={() => (window.location.href = "/solutions")}
              >
                View Success Stories
              </Button>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Industries;
