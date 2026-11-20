import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { loadInsights } from "../api/client"; // named import
import Hero from "./../assets/insightpage/blog-intro.jpg";
import above_the_footer from "./../assets/above_the_footer.jpg";
import { motion } from "framer-motion";
import PageIntro from "../components/PageIntro";
import { resolveImageUrl } from "../lib/image";

interface InsightType {
  _id: string;
  id?: string;
  title: string;
  description: string;
  detail: string;
  date: string;
  imageUrl: string;
}

const ArticleCard = ({
  insight,
}: {
  insight: InsightType;
}) => {
  const detailLink = `/blog/${insight._id || insight.id}`;
  return (
    <Card className="border border-gray-200 flex flex-col rounded-lg hover:scale-[1.02] transition-all duration-300 bg-white overflow-hidden h-full">
      <Link to={detailLink} className="block overflow-hidden">
        <img
          className="w-full aspect-video rounded-t-lg object-cover hover:scale-105 transition-transform duration-300"
          src={resolveImageUrl(insight.imageUrl)}
          alt={insight.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/assets/placeholder.jpg";
          }}
        />
      </Link>

      <CardHeader className="px-4 pt-3 pb-0">
        <p className="text-sm text-gray-500 font-medium leading-tight">
          {insight.date ? new Date(insight.date).toLocaleDateString() : ""}
        </p>
        <Link to={detailLink}>
          <CardTitle className="text-xl font-bold leading-tight hover:text-[#0078B7] transition-colors">
            {insight.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="px-4 pt-2 pb-0 flex-grow">
        <CardDescription className="text-gray-700 text-base leading-snug">
          {insight.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="px-4 pt-3 pb-4">
        <Link
          to={detailLink}
          className="inline-flex items-center gap-1 text-[#0078B7] font-semibold hover:underline hover:translate-x-1 transition-transform duration-200"
        >
          Read More &rarr;
        </Link>
      </CardFooter>
    </Card>
  );
};

const defaultInsights: InsightType[] = [
  {
    _id: "odoo-vs-erpnext-ethiopian-companies",
    id: "odoo-vs-erpnext-ethiopian-companies",
    title: "Odoo vs. ERPNext for Ethiopian Import/Export & Manufacturing Companies",
    description:
      "A comprehensive comparison of Odoo and ERPNext for Ethiopian businesses: local tax support, multi-currency customs, license costs, and flexibility.",
    detail:
      "Choosing between Odoo and ERPNext is one of the most common dilemmas faced by Ethiopian trade and manufacturing businesses in Addis Ababa. While both platforms are open-core, Odoo provides a mature modular marketplace with pre-built Ethiopian HRMS extensions, while ERPNext offers an all-inclusive open-source licensing model. For businesses handling multi-currency imports, customs clearance landed costs, and tiered VAT reporting, Odoo's automated landed-cost costing methods offer greater accuracy. When planning your ERP rollout, partner expertise and team training in Addis Ababa are the critical success factors.",
    date: "2026-11-15T00:00:00.000Z",
    imageUrl: "/assets/homepage/business-operations.png",
  },
  {
    _id: "automate-ethiopian-payroll-pension-odoo",
    id: "automate-ethiopian-payroll-pension-odoo",
    title: "How to Automate Ethiopian Payroll & Pension Calculations in Odoo",
    description:
      "Step-by-step guide on configuring Ethiopian income tax brackets, 7% employee and 11% employer pension contributions, and biometric attendance sync in Odoo.",
    detail:
      "Manual payroll processing using Excel spreadsheets remains a major source of calculation errors and compliance penalties for Ethiopian organizations. Under Ethiopian labor regulations, employee income tax follows a progressive scale from 0% to 35%, alongside mandatory 7% employee pension and 11% employer private organization pension fund contributions. By integrating BelTech Ethiopian HRMS with Odoo, companies automate monthly tax deductions, generate official tax summary schedules for the Ministry of Revenues, and link attendance punches directly to payslip line items.",
    date: "2026-11-10T00:00:00.000Z",
    imageUrl: "/assets/payroll.jpeg",
  },
  {
    _id: "biometric-attendance-zkteco-ethiopia",
    id: "biometric-attendance-zkteco-ethiopia",
    title: "Integrating ZKTeco Biometric Devices with Odoo HRMS in Ethiopia",
    description:
      "How to connect ZKTeco fingerprint and face recognition attendance hardware with Odoo for accurate timesheets, shift management, and automated payroll.",
    detail:
      "Buddy punching and unrecorded tardiness cost Ethiopian enterprises thousands of birr every month. Connecting ZKTeco biometric time-clocks to Odoo via automated push sync (ADMS) enables real-time attendance validation. BelTech HRMS captures device punches, correlates them with assigned shift schedules (standard, night, or rotational shifts), and automatically calculates overtime according to Ethiopian proclamation rates before pushing the final totals to payroll.",
    date: "2026-11-05T00:00:00.000Z",
    imageUrl: "/assets/homepage/attendance.jpg",
  },
  {
    _id: "insight-erp-ethiopia",
    id: "insight-erp-ethiopia",
    title: "How ERP Systems Transform Ethiopian Businesses",
    description:
      "Why integrating sales, inventory, and finance into a single platform like Odoo or ERPNext accelerates business growth.",
    detail:
      "Implementing an ERP system allows companies to eliminate redundant data entry, ensure compliance with Ethiopian tax and payroll laws, and make data-driven operational decisions across retail, wholesale, and service operations.",
    date: "2026-10-25T00:00:00.000Z",
    imageUrl: "/assets/homepage/business-operations.png",
  },
];

const Blog = () => {
  const [insights, setInsights] = useState<InsightType[]>(defaultInsights);

  useEffect(() => {
    let active = true;
    loadInsights()
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          const merged = [...data];
          for (const def of defaultInsights) {
            const exists = merged.some(
              (i) =>
                (i._id && (i._id === def._id || i._id === def.id)) ||
                (i.id && (i.id === def._id || i.id === def.id)) ||
                (i.title && i.title.toLowerCase() === def.title.toLowerCase())
            );
            if (!exists) {
              merged.push(def);
            }
          }
          merged.sort(
            (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          );
          setInsights(merged);
        }
      })
      .catch((err) => {
        console.error("Failed to load insights:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="font-sans antialiased bg-white text-gray-900">
      <PageIntro
        image={Hero}
        overlayClassName="bg-gradient-to-b from-black/55 via-black/45 to-black/60"
        title="Ideas on ERP and digital operations."
      >
        Articles and notes on ERP, corporate team training, and digital operations in Africa.
      </PageIntro>

      {/* Articles Section */}
      <section className="py-16">
        <div className="site-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 leading-tight">Latest Articles</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-snug">
              Stay informed with our latest blog posts on technology, business, and digital transformation
            </p>
          </motion.div>

          {insights.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight._id || insight.id || `insight-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
                  className="w-full flex"
                >
                  <ArticleCard insight={insight} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative pt-6 pb-8 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}></div>
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to right, #0078B7, #005C8A)", opacity: 0.5 }}></div>
        <div className="site-shell relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-snug">
            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#0078B7] text-white"
              onClick={() => window.location.href = "/contact"}
            >
              Start Your Digital Journey
            </Button>
          </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
