import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import Hero from "./../assets/insightpage/hero.png";
import ERPdrivesROI from "./../assets/insightpage/ERPdrivesROI.png"
import RealWorldWorkFow from "./../assets/insightpage/RealWorldWorkFow.png"
import DigitalTransformation from "./../assets/insightpage/DigitalTransformation.png"
import OvercomingERP from "./../assets/insightpage/OvercomingERP.png"
import RoleOfData from "./../assets/insightpage/RoleOfData.png"
import TrendsInAfrica from "./../assets/insightpage/TrendsInAfrica.png"
import above_the_footer from "./../assets/above_the_footer.png"

interface ArticleCardProps {
  imageSrc: string;
  date: string;
  title: string;
  description: string;
}

const ArticleCard = ({ imageSrc, date, title, description }: ArticleCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 max-w-sm rounded-lg overflow-hidden shadow-sm transition-transform duration-150 hover:scale-[1.01] hover:shadow-sm">
      <div className="-mt-6">
        <img className="w-full h-48 object-cover rounded-t-lg" src={imageSrc} alt={title} />
      </div>
      <CardHeader className="pt-4">
        <p className="text-sm text-gray-500 font-medium">{date}</p>
        <CardTitle className="text-lg font-bold mt-1 leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <a href="#" className="text-[#61C7D5] hover:underline font-semibold">Read More</a>
      </CardFooter>
    </Card>
  );
};

const Insight = () => {
  return (
    <div className="font-sans antialiased bg-white text-gray-900">

      <section className="relative w-full h-[200px] md:h-[30px] lg:h-[400px] overflow-hidden">
        <img
          src={Hero}
          alt="insight Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="absolute inset-0 container mx-auto px-4 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Insights</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Explore our latest articles, guides, and thought leadership on digital transformation and technology in Africa.
          </p>
        </div>
      </section>


      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest insights on technology, business, and digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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
        </div>
      </section>

  
           <section
        className="relative py-10 text-white"
        style={{
          backgroundImage: `url(${above_the_footer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#61C7D5]/50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] text-white"
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
