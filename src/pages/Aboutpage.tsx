import { Target, Flag, Handshake, LineChart, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import abouthero from "./../assets/aboutPage/hero1.png"
import beltechMark from "./../assets/new-logo-free.png";
import { Button } from "../components/ui/button";
import above_the_footer from "./../assets/above_the_footer.png"
import { motion } from "framer-motion";
import PageIntro from "../components/PageIntro";

const About = () => {
    // Define a single, consistent container class for all section content.
    // This ensures maximum width, centering (mx-auto), and responsive horizontal padding.
    const contentContainerClasses = "site-wide";

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 antialiased">
            <main>
                <PageIntro image={abouthero} title="Built in Addis Ababa for African businesses.">
                  A company born in Ethiopia, supporting businesses across Africa with ERP, corporate training, and digital solutions.
                </PageIntro>


                {/* Section 2: Our Story */}
                <section className="bg-white py-20" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <div className={contentContainerClasses}>
                        <div className="mb-14 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                                Our <span className="text-[#0078B7]">Story</span>
                                <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-[#0078B7]" aria-hidden="true" />
                            </h2>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="grid items-stretch gap-8 lg:grid-cols-12"
                        >
                            <div className="flex flex-col items-center justify-center rounded-3xl bg-[#f4f7fb] px-8 py-14 lg:col-span-4">
                                <img
                                    src={beltechMark}
                                    alt="BelTech Solutions"
                                    className="w-40 mix-blend-multiply sm:w-48"
                                />
                                <p className="mt-8 text-4xl font-bold text-[#0078B7]">2024</p>
                                <p className="mt-2 text-center text-sm font-semibold text-gray-700">Addis Ababa, Ethiopia</p>
                            </div>
                            <div className="flex flex-col justify-center gap-8 lg:col-span-8">
                                <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                                    BelTech Solutions was founded in 2024 in Addis Ababa, Ethiopia with a clear vision to empower African businesses through technology. What began as a small team of passionate professionals is growing into a comprehensive service provider, driven by a commitment to creating a more connected Africa. Alongside implementation, BelTech runs corporate ERP training so a company's own team can use Odoo and ERPNext with confidence.
                                </p>
                                <p className="border-t border-[#E8F4FB] pt-8 text-base leading-relaxed text-gray-600 md:text-lg">
                                    We understand that while many international technology solutions exist, there is a need to adapt them to the unique challenges and opportunities within the Ethiopian and wider African market. This perspective guides our approach, blending global practices with local realities.
                                </p>
                                <p className="border-t border-[#E8F4FB] pt-8 text-base leading-relaxed text-gray-600 md:text-lg">
                                    Today, BelTech is steadily building its presence by supporting businesses in modernizing their operations, streamlining processes, and laying the foundation for sustainable growth through carefully tailored digital solutions.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* Section 3: Mission & Vision */}
                <section className="bg-[#f7f8fa] py-20">
                    <div className={contentContainerClasses}>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F4FB] text-[#0078B7]">
                                    <Target className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold text-gray-900">Our Mission</h3>
                                <p className="mt-4 text-xl font-semibold leading-snug text-gray-900">
                                    "To build scalable, efficient digital systems that empower local businesses."
                                </p>
                                <p className="mt-4 text-base leading-relaxed text-gray-600">
                                    We strive to provide technology solutions that are specifically tailored to the needs and challenges of African businesses, helping them compete effectively in the global marketplace.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex h-full flex-col rounded-3xl bg-[#0078B7] p-8 text-white shadow-sm md:p-10"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                                    <Eye className="h-6 w-6" />
                                </div>
                                <h3 className="mt-6 text-2xl font-bold">Our Vision</h3>
                                <p className="mt-4 text-xl font-semibold leading-snug">
                                    "To be the #1 partner for ERP, automation, and software development in Africa by 2030."
                                </p>
                                <p className="mt-4 text-base leading-relaxed text-white/90">
                                    We aim to lead the digital transformation of African businesses by providing innovative, reliable, and accessible technology solutions that drive growth and efficiency.
                                </p>
                            </motion.div>
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
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                            <Card className="border-0 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Target className="h-6 w-6 text-[#0078B7] " />
                                    </div>
                                    <CardTitle className="mt-4">Precision</CardTitle>
                                    <CardDescription>
                                        We deliver accurate, reliable solutions and pay attention to detail.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                            <Card className="border-0 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Flag className="h-6 w-6 text-[#0078B7] " />
                                    </div>
                                    <CardTitle className="mt-4">Purpose</CardTitle>
                                    <CardDescription>
                                        Every project we undertake is aligned with the goals of our clients.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                            <Card className="border-0 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <Handshake className="h-6 w-6 text-[#0078B7] " />
                                    </div>
                                    <CardTitle className="mt-4">Partnership</CardTitle>
                                    <CardDescription>
                                        We work collaboratively with clients as a strategic technology partner.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                            <Card className="border-0 text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                        <LineChart className="h-6 w-6 text-[#0078B7] " />
                                    </div>
                                    <CardTitle className="mt-4">Progress</CardTitle>
                                    <CardDescription>
                                        Continuously implementing improvements and pushing the boundaries of technology.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            </motion.div>
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
                            background: "linear-gradient(to right, #0078B7, #005C8A)",
                            opacity: 0.5,
                        }}
                    ></div>
                    <div className="site-shell relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Let's discuss your project.
                        </h2>
                        <p className="text-xl mb-8 max-w-3xl mx-auto">
                            Based in Addis Ababa, BelTech helps businesses put ERP, corporate training, automation, and custom software into daily operations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#0078B7] text-white"
                                onClick={() => window.location.href = '/Contact'}
                            >
                                Contact the team
                            </Button>
                            <Button
                                size="lg"
                                className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#0078B7] text-white"
                                onClick={() => window.location.href = '/Solutions'}
                            >
                                View Success Stories
                            </Button>
                        </div>
                        </motion.div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default About;