import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { getSolutions, loadInsights, fetchContacts, fetchTestimonials } from "../../api/client";
import { FolderKanban, FileText, Users, MessageCircle } from "lucide-react";

const Dashboard = () => {
  const [solutionCount, setSolutionCount] = useState<number | null>(null);
  const [insightCount, setInsightCount] = useState<number | null>(null);
  const [contactCount, setContactCount] = useState<number | null>(null);
  const [testimonialCount, setTestimonialCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const solutions = await getSolutions();
        setSolutionCount(Array.isArray(solutions) ? solutions.length : 0);
      } catch {
        setSolutionCount(0);
      }
      try {
        const insights = await loadInsights();
        setInsightCount(Array.isArray(insights) ? insights.length : 0);
      } catch {
        setInsightCount(0);
      }
      try {
        const res = await fetchContacts(1, 1);
        const data = res.data?.data?.contacts || res.data?.data || res.data;
        const total = Array.isArray(data)
          ? data.length
          : data?.totalCount ?? data?.total ?? data?.length ?? 0;
        setContactCount(total);
      } catch {
        setContactCount(0);
      }
      try {
        const testimonials = await fetchTestimonials();
        setTestimonialCount(
          Array.isArray(testimonials) ? testimonials.length : 0
        );
      } catch {
        setTestimonialCount(0);
      }
    })();
  }, []);

  const stats = [
    {
      title: "Solutions",
      value: solutionCount,
      icon: FolderKanban,
      color: "text-[#0078B7] bg-[#0078B7]/10",
      link: "/admin/solutions",
    },
    {
      title: "Blog",
      value: insightCount,
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50",
      link: "/admin/blog",
    },
    {
      title: "Contacts",
      value: contactCount,
      icon: Users,
      color: "text-amber-600 bg-amber-50",
      link: "/admin",
    },
    {
      title: "Testimonials",
      value: testimonialCount,
      icon: MessageCircle,
      color: "text-purple-600 bg-purple-50",
      link: "/admin/testimonials",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-gray-200 bg-white cursor-pointer hover:shadow-md transition-shadow"
          >
            <Link to={stat.link} className="block">
              <CardContent className="flex items-center justify-between px-6 py-5">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value === null ? "—" : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
