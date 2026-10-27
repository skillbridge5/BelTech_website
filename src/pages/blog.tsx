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

const Blog = () => {
  const [insights, setInsights] = useState<InsightType[]>([]);
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

          {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : insights.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
