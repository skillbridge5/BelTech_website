import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { loadInsights } from "../api/client"; // named import
import Hero from "./../assets/insightpage/heroNew.png";
import above_the_footer from "./../assets/above_the_footer.png";

interface InsightType {
  _id: string;
  title: string;
  description: string;
  detail: string;
  date: string;
  imageUrl: string;
}

const ArticleCard = ({
  insight,
  onReadMore,
}: {
  insight: InsightType;
  onReadMore: (insight: InsightType) => void;
}) => {
  return (
    <Card className="border border-gray-200 flex flex-col rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white overflow-hidden">
      <img className="w-full aspect-video rounded-t-lg object-cover" src={insight.imageUrl} alt={insight.title} />

      <CardHeader className="px-4 pt-2 pb-0">
        <p className="text-sm text-gray-500 font-medium leading-tight">{new Date(insight.date).toLocaleDateString()}</p>
        <CardTitle className="text-xl font-bold leading-tight">{insight.title}</CardTitle>
      </CardHeader>

      <CardContent className="px-4 pt-1 pb-0">
        <CardDescription className="text-gray-700 text-base leading-snug">{insight.description}</CardDescription>
      </CardContent>

      <CardFooter className="px-4 pt-1 pb-2">
        <button
          onClick={() => onReadMore(insight)}
          className="inline-flex items-center text-[#27A2D8] font-medium hover:underline hover:translate-x-1 transition-transform duration-200"
        >
          Read More
        </button>
      </CardFooter>
    </Card>
  );
};

const Insight = () => {
  const [insights, setInsights] = useState<InsightType[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<InsightType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await loadInsights();
      setInsights(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans antialiased bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${Hero})` }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)),
              linear-gradient(to left, rgba(39,162,216,0.5) 0%, rgba(39,162,216,0.0) 40%)
            `,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-4 lg:px-8 text-white">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Insights</h1>
            <p className="mt-2 text-lg md:text-xl max-w-2xl leading-snug">
              Explore our latest articles and guides on digital transformation and technology in Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-8 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 leading-tight">Latest Articles</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-snug">
              Stay informed with our latest insights on technology, business, and digital transformation
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading insights...</p>
          ) : insights.length === 0 ? (
            <p className="text-center text-gray-500">No insights at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {insights.map((insight) => (
                <ArticleCard key={insight._id} insight={insight} onReadMore={setSelectedInsight} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Read More Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedInsight(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedInsight.title}</h2>
            <p className="text-gray-700 mb-4">{selectedInsight.detail}</p>
            <p className="text-sm text-gray-500">{new Date(selectedInsight.date).toLocaleDateString()}</p>
          </div>
        </div>
      )}

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
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(to right, #31A8EB, #61C7D5)", opacity: 0.5 }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-snug">
            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
              onClick={() => window.location.href = "/contact"}
            >
              Start Your Digital Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insight;
