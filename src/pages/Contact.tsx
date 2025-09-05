import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import toast, { Toaster } from "react-hot-toast";
import contactHero from "./../assets/contactHero.png";
import above_the_footer from "./../assets/above_the_footer.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    message: ""
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = "This field is required";
    if (!formData.lastName) newErrors.lastName = "This field is required";
    if (!formData.email) newErrors.email = "This field is required";
    if (!formData.phone) newErrors.phone = "This field is required";
    if (!formData.organization) newErrors.organization = "This field is required";
    if (!formData.message) newErrors.message = "This field is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success("Your message is sent successfully! We will get back to you as soon as possible.", {
        style: {
          background: "#61C7D5",
          color: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        },
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        message: ""
      });
    }
  };

  return (
    <div className="font-sans antialiased bg-[#ededed] text-gray-900">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="relative w-full h-[200px] md:h-[30px] lg:h-[400px] overflow-hidden">
        <img
          src={contactHero}
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="absolute inset-0 container mx-auto px-4 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Want to discuss a project or ask questions? Please feel free to contact us.
            <br />
            We're here to help you transform your business.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Let's talk with us</h2>
            <p className="text-gray-600 mb-8">
              Questions, comments, or suggestions? Simply fill in the form and we'll be in touch shortly.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#61C7D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-semibold">Bole Sub City, Addis Ababa, Ethiopia, East Africa</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#61C7D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-semibold">+251 911 123 456</p>
                  <p className="font-semibold">+251 911 789 012</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#61C7D5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-semibold">info@beltechsolutions.com</p>
                  <p className="font-semibold">support@beltechsolutions.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="First Name*"
                  className={`py-3 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:border-[#61C7D5] focus:ring-2 focus:ring-[#61C7D5]/50 ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Last Name*"
                  className={`py-3 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:border-[#61C7D5] focus:ring-2 focus:ring-[#61C7D5]/50 ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>

              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email*"
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:border-[#61C7D5] focus:ring-2 focus:ring-[#61C7D5]/50 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number*"
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:border-[#61C7D5] focus:ring-2 focus:ring-[#61C7D5]/50 ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

              <Input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                type="text"
                placeholder="Organization*"
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:border-[#61C7D5] focus:ring-2 focus:ring-[#61C7D5]/50 ${errors.organization ? "border-red-500" : ""}`}
              />
              {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                className={`w-full py-3 px-4 border border-gray-300 rounded-lg bg-gray-100 focus:bg-white focus:border-[#61C7D5] focus:ring-2 focus:ring-[#61C7D5]/50 min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

              <Button type="submit" className="w-full bg-[#61C7D5] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#50b5c0] transition-colors">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
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
              onClick={() => window.location.href = '#'}
            >
              Start Your Digital Journey
            </Button>
            <Button
              size="lg"
              className="px-8 py-3 text-lg transition-all duration-200 hover:scale-105 bg-[#61C7D5] text-white"
              onClick={() => window.location.href = 'solutions'}
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
