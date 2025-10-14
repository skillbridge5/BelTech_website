import { Button } from "../components/ui/button";  
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import Hero from "./../assets/insightpage/heroNew.png";
import ERPdrivesROI from "./../assets/insightpage/ERPdrivesROINew.jpg";
import RealWorldWorkFow from "./../assets/insightpage/RealWorldWorkFlowNew.jpg";
import DigitalTransformation from "./../assets/insightpage/DigitalTransformationNew.jpg";
import OvercomingERP from "./../assets/insightpage/OvercomingERP.png";
import RoleOfData from "./../assets/insightpage/RoleOfData.png";
import TrendsInAfrica from "./../assets/insightpage/TrendsInAfrica.jpg";
import above_the_footer from "./../assets/above_the_footer.png";

interface ArticleCardProps {
  imageSrc: string;
  date: string;
  title: string;
  description: string;
}

const ArticleCard = ({ imageSrc, date, title, description }: ArticleCardProps) => {
  return (
    <Card className="border border-gray-200 flex flex-col rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white overflow-hidden">
      <img className="w-full aspect-video rounded-t-lg object-cover" src={imageSrc} alt={title} />
      
      <CardHeader className="px-4 pt-2 pb-0">
        <p className="text-sm text-gray-500 font-medium leading-tight">{date}</p>
        <CardTitle className="text-xl font-bold leading-tight">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 pt-1 pb-0">
        <CardDescription className="text-gray-700 text-base leading-snug">{description}</CardDescription>
      </CardContent>
      
      <CardFooter className="px-4 pt-1 pb-2">
        <a href="#" className="inline-flex items-center text-[#27A2D8] font-medium hover:underline hover:translate-x-1 transition-transform duration-200">
          Read More
        </a>
      </CardFooter>
    </Card>
  );
};

const Insight = () => {
  return (
    <div className="font-sans antialiased bg-white text-gray-900">
      
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Hero})` }}></div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            <ArticleCard
              imageSrc={ERPdrivesROI}
              date="May 15, 2025"
              title="How ERP Drives ROI for African Businesses"
              description="Learn how implementing the right ERP solution can drive significant ROI for your business across Africa, with real-world examples."
            />
            <ArticleCard
              imageSrc={RealWorldWorkFow}
              date="April 20, 2025"
              title="Real-World Workflow Automation Success Stories"
              description="Explore case studies of African businesses that have leveraged workflow automation to significantly increase efficiency."
            />
            <ArticleCard
              imageSrc={DigitalTransformation}
              date="April 10, 2025"
              title="Digital Transformation for SMEs: A Practical Guide"
              description="A step-by-step approach to digital transformation for small and medium-sized enterprises to achieve achievable goals."
            />
            <ArticleCard
              imageSrc={TrendsInAfrica}
              date="April 05, 2025"
              title="Trends in African Tech: What's Next in 2025"
              description="An overview of emerging technology trends across African markets and how businesses can position themselves to take advantage of these developments."
            />
            <ArticleCard
              imageSrc={OvercomingERP}
              date="March 28, 2025"
              title="Overcoming ERP Implementation Challenges"
              description="Expert guidance for navigating common obstacles during ERP implementation, with specific considerations for African business environments."
            />
            <ArticleCard
              imageSrc={RoleOfData}
              date="March 12, 2025"
              title="The Role of Data in Business Decision Making"
              description="Discover how businesses can leverage data and business intelligence to make more informed decisions and drive growth."
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
              onClick={() => window.location.href = '#'}
            >
              Load More Articles
            </Button>
          </div>
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

export default Insight;
