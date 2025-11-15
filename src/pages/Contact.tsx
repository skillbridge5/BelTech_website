import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import contactHero from "./../assets/contactHero.png";
import above_the_footer from "./../assets/above_the_footer.png";
import { Dot } from "lucide-react";
import { submitContact } from "../api/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Now all backend-required fields are checked
    const requiredFields = ["firstName", "lastName", "email", "phone", "organization", "message"] as const;
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          name: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          message: formData.message,
        };

        await submitContact(payload);

        toast.success(
          "Your message is sent successfully! We will get back to you as soon as possible.",
          {
            style: {
              background: "#27A2D8",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            },
          }
        );

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          message: "",
        });
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to send message", {
          style: { background: "#D82727", color: "#ffffff" },
        });
      }
    } else {
      toast.error("Please fill all the required fields", {
        style: { background: "#D82727", color: "#ffffff" },
      });
    }
  };

  return (
    <div className="font-sans antialiased bg-[#f7f8fa] text-gray-900">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${contactHero})` }}
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
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Contact Us</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl">
              Want to discuss a project or ask questions? <br />
              Let us transform your business with smart software and a tailored ERP.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16 flex justify-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-6xl">
          {/* Left Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Let's talk</h2>
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#27A2D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex items-center gap-0.4">
                  <Dot className="h-8 w-8 text-black" />
                  <p className="font-semibold">Addis Ababa, Ethiopia, East Africa</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#27A2D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.4">
                    <Dot className="h-8 w-8 text-black" />
                    <p className="font-semibold">+251 955 935 455</p>
                  </div>
                  <div className="flex items-center gap-0.4">
                    <Dot className="h-8 w-8 text-black" />
                    <p className="font-semibold">+251 932 058 398</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#27A2D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.4">
                    <Dot className="h-8 w-8 text-black" />
                    <p className="font-semibold">beltechsolns@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: FORM */}
          <div className="w-full flex justify-center">
            <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
              <p className="text-gray-600 mb-6">
                Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name*"
                  className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-[#27A2D8] focus:ring-2 focus:ring-[#27A2D8]/50 ${errors.firstName ? "border-red-500" : ""}`}
                />
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name*"
                  className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-[#27A2D8] focus:ring-2 focus:ring-[#27A2D8]/50 ${errors.lastName ? "border-red-500" : ""}`}
                />
              </div>

              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email*"
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-[#27A2D8] focus:ring-2 focus:ring-[#27A2D8]/50 ${errors.email ? "border-red-500" : ""}`}
              />

              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number*"
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-[#27A2D8] focus:ring-2 focus:ring-[#27A2D8]/50 ${errors.phone ? "border-red-500" : ""}`}
              />

              <Input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                type="text"
                placeholder="Organization*"
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-[#27A2D8] focus:ring-2 focus:ring-[#27A2D8]/50 ${errors.organization ? "border-red-500" : ""}`}
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message*..."
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-[#27A2D8] focus:ring-2 focus:ring-[#27A2D8]/50 min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
              />

              <Button type="submit" className="w-full bg-[#27A2D8] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#50b5c0] transition-colors">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section
        className="relative py-10 text-white"
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
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of African businesses that have streamlined their operations with BelTech Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#27A2D8] text-white"
              onClick={() => (window.location.href = "solutions")}
            >
              View Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
