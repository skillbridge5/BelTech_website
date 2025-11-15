import { Target, Flag, Handshake, LineChart, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import abouthero from "./../assets/aboutPage/heroNew.png"
import beltech from "./../assets/aboutPage/beltech.jpg";
import { Button } from "../components/ui/button";
import above_the_footer from "./../assets/above_the_footer.png"

const About = () => {
    // Define a single, consistent container class for all section content.
    // This ensures maximum width, centering (mx-auto), and responsive horizontal padding.
    const contentContainerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
            <main>
                {/* Section 1: Hero Section */}
              <section className="relative w-full h-screen overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
    style={{ backgroundImage: `url(${abouthero})` }}
  ></div>

  {/* Gradient Overlay */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)),
        linear-gradient(to left, rgba(39,162,216,0.5) 0%, rgba(39,162,216,0.0) 40%)
      `,
    }}
  ></div>

  {/* Content */}
  <div className="absolute inset-0 flex items-center">
    <div className="w-full px-4 lg:px-8 text-white">
      <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
        About Us
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl">
        A company born in Ethiopia, supporting businesses across Africa with digital transformation solutions.
      </p>
    </div>
  </div>
</section>


                {/* Section 2: Our Story */}
                <section className="py-8 bg-white">
                    <div className={contentContainerClasses}>
                        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                            <div className="order-1 md:order-1">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                                    Our Story
                                </h2>
                                <p className="mb-4 text-gray-600">
                                    BelTech Solutions was founded in 2024 in Addis Ababa, Ethiopia with a clear vision to empower African businesses through technology. What began as a small team of passionate professionals is growing into a comprehensive service provider, driven by a commitment to creating a more connected Africa.
                                </p>
                                <p className="mb-4 text-gray-600">
                                    We understand that while many international technology solutions exist, there is a need to adapt them to the unique challenges and opportunities within the Ethiopian and wider African market. This perspective guides our approach, blending global practices with local realities.
                                </p>
                                <p className="text-gray-600">
                                    Today, BelTech is steadily building its presence by supporting businesses in modernizing their operations, streamlining processes, and laying the foundation for sustainable growth through carefully tailored digital solutions.
                                </p>
                            </div>
                            <div className="order-2 md:order-2 flex justify-center">
                                <img
                                    src={beltech}
                                    alt="Bel Tech Solutions Logo"
                                    className="w-full max-w-xs mt-4"
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* Section 3: Mission & Vision */}
                <section className="bg-gray-50 py-10">
                    <div className={contentContainerClasses}>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="rounded-lg bg-white p-8 shadow-md">
                                <div className="mb-4 flex items-center">
                                    <Target className="h-8 w-8 text-[#27A2D8] " />
                                    <h3 className="ml-4 text-2xl font-bold text-gray-900">Our Mission</h3>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    "To build scalable, efficient digital systems that empower local businesses."
                                </p>
                                <p className="mt-4 text-gray-600">
                                    We strive to provide technology solutions that are specifically tailored to the needs and challenges of African businesses, helping them compete effectively in the global marketplace.
                                </p>
                            </div>
                            <div className="rounded-lg bg-white p-8 shadow-md">
                                <div className="mb-4 flex items-center">
                                    <Eye className="h-8 w-8 text-[#27A2D8] " />
                                    <h3 className="ml-4 text-2xl font-bold text-gray-900">Our Vision</h3>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    "To be the #1 partner for ERP, automation, and software development in Africa by 2030."
                                </p>
                                <p className="mt-4 text-gray-900">
                                    We aim to lead the digital transformation of African businesses by providing innovative, reliable, and accessible technology solutions that drive growth and efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Core Values */}
                <section className="my-10">
                    <div className={contentContainerClasses}>
                        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Core Values</h2>
                        <p className="mb-12 text-center text-gray-900">
                            The principles that guide our work and define our company culture
                        </p>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Target className="h-6 w-6 text-[#27A2D8] " />
                                    </div>
                                    <CardTitle className="mt-4">Precision</CardTitle>
                                    <CardDescription>
                                        We deliver accurate, reliable solutions and pay attention to detail.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Flag className="h-6 w-6 text-[#27A2D8] " />
                                    </div>
                                    <CardTitle className="mt-4">Purpose</CardTitle>
                                    <CardDescription>
                                        Every project we undertake is aligned with the goals of our clients.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Handshake className="h-6 w-6 text-[#27A2D8] " />
                                    </div>
                                    <CardTitle className="mt-4">Partnership</CardTitle>
                                    <CardDescription>
                                        We work collaboratively with clients as a strategic technology partner.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <LineChart className="h-6 w-6 text-[#27A2D8] " />
                                    </div>
                                    <CardTitle className="mt-4">Progress</CardTitle>
                                    <CardDescription>
                                        Continuously implementing improvements and pushing the boundaries of technology.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Section 5: CTA Footer */}
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
                    <div className={`relative z-10 text-center ${contentContainerClasses}`}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
                                onClick={() => window.location.href = '/Contact'}
                            >
                                Start Your Digital Journey
                            </Button>
                            <Button
                                size="lg"
                                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
                                onClick={() => window.location.href = '/Solutions'}
                            >
                                View Success Stories
                            </Button>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default About;