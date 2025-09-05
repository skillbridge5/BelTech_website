import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import solutionHero from "./../assets/solutionpage/solutionHero.png"
import ERPforTextile from "./../assets/solutionpage/ERPforTextile.png"
import charityForSccma from "./../assets/solutionpage/charityForSccma.png"
import retailAutomation from "./../assets/solutionpage/retailAutomation.png"
import above_the_footer from "./../assets/above_the_footer.png"

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
      <section className=" bg-white relative w-full h-[200px] md:h-[30px] lg:h-[400px] overflow-hidden">
        <img
          src={solutionHero}
          alt="solution Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="absolute inset-0 container mx-auto px-4 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Solution in Action</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            See how we've helped businesses streamline their operations with powerful, customized software.
          </p>
        </div>
      </section>



      <section className="container mx-auto my-16 px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Success Stories</h2>
          <p className="mb-12 text-gray-600">
            Explore how our solutions have helped businesses overcome challenges and achieve growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-0 flex flex-col rounded-lg shadow-md">
            <img
              src={ERPforTextile}
              alt="ERP for Textile Manufacturer"
              className="w-full aspect-video rounded-t-lg object-cover"
            />
            <CardHeader className="px-6 pt-4 pb-2">
              <CardTitle className="text-lg font-bold mb-1">ERP for a Textile Manufacturer</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2">
              <CardDescription>
                Deployed a full-scale Odoo ERP to manage production, sales, inventory, and logistics for an East African textile plant.
              </CardDescription>
              <a href="ERPDetail" className="mt-4 flex items-center text-sm font-medium text-[#61C7D5] hover:text-[#61C7D5]-700">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </CardContent>
          </Card>
          <Card className="border-0 flex flex-col rounded-lg shadow-md">
            <img
              src={charityForSccma}
              alt="Charity Platform"
              className="w-full aspect-video rounded-t-lg object-cover"
            />
            <CardHeader className="px-6 pt-4 pb-2">
              <CardTitle className="text-lg font-bold mb-1">Charity Platform for SCCMA</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2">
              <CardDescription>
                Built a volunteer & donation portal with dashboards, secure processes, and automated reports.
              </CardDescription>
              <a href="CharityPlatform" className="mt-4 flex items-center text-sm font-medium text-[#61C7D5] hover:text-[#61C7D5]-700">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </CardContent>
          </Card>

          <Card className="border-0 flex flex-col rounded-lg shadow-md">
            <img
              src={retailAutomation}
              alt="Retail Automation"
              className="w-full aspect-video rounded-t-lg object-cover"
            />
            <CardHeader className="px-6 pt-4 pb-2">
              <CardTitle className="text-lg font-bold mb-1">Retail Automation</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2">
              <CardDescription>
                Automated sales-stock syncing for a regional retail chain, ensuring accurate inventory across branches.
              </CardDescription>
              <a href="RetailAuto" className="mt-4 flex items-center text-sm font-medium text-[#61C7D5] hover:text-[#61C7D5]-700">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </CardContent>
          </Card>

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

export default SolutionsPage;
