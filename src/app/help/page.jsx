"use client";

import { useState } from "react";
import Link from "next/link";

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // Remove TypeScript annotation
  const [openFAQ, setOpenFAQ] = useState(null); // Remove TypeScript annotation

  const handleChange = (e) => {
    const { name, value } = e.target; // Proper destructuring
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); // Get the response data

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          category: "",
          subject: "",
          message: "",
        });
        console.log("Support ticket created:", result); // Log success data
      } else {
        console.error("Error submitting form:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(currentOpenFAQ => currentOpenFAQ === id ? null : id);
  };

  const faqCategories = [
    {
      category: "Getting Started",
      icon: "🚀",
      questions: [
        {
          id: "getting-started-1",
          question: "How do I create my first account on Schoolama AI?",
          answer: "Simply click on 'Start Free Trial' and fill in your basic information. You'll receive a verification email to activate your account. Once verified, you can begin setting up your institution profile and invite team members."
        },
        {
          id: "getting-started-2",
          question: "What do I need to set up my school on the platform?",
          answer: "You'll need your school's basic information, administrative details, and a list of initial users (teachers, students, staff). Our setup wizard guides you through importing existing data and configuring your preferences."
        },
        {
          id: "getting-started-3",
          question: "How long does it take to fully implement Schoolama AI?",
          answer: "Basic setup can be completed in 24-48 hours. Full implementation with data migration, user training, and custom configurations typically takes 1-2 weeks depending on your school size and requirements."
        }
      ]
    },
    {
      category: "Account & Billing",
      icon: "💳",
      questions: [
        {
          id: "billing-1",
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. Educational institutions can also request invoice-based billing."
        },
        {
          id: "billing-2",
          question: "Can I upgrade or downgrade my plan anytime?",
          answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the next billing cycle. You'll only pay the difference for upgrades."
        },
        {
          id: "billing-3",
          question: "Do you offer discounts for educational institutions?",
          answer: "Yes! We offer special pricing for educational institutions, non-profits, and bulk licenses. Contact our sales team for custom pricing based on your student count and requirements."
        }
      ]
    },
    {
      category: "Features & Functionality",
      icon: "⚡",
      questions: [
        {
          id: "features-1",
          question: "How does the AI-powered grading system work?",
          answer: "Our AI analyzes student responses using natural language processing and machine learning algorithms. It can grade essays, short answers, and even provide detailed feedback. Teachers can review and adjust AI grades as needed."
        },
        {
          id: "features-2",
          question: "Can I integrate Schoolama with existing school systems?",
          answer: "Yes, Schoolama offers APIs and integrations with popular SIS systems, Google Workspace, Microsoft 365, and other educational tools. Our technical team can help with custom integrations."
        },
        {
          id: "features-3",
          question: "How does the automated attendance tracking work?",
          answer: "Students can mark attendance through the mobile app using QR codes, geolocation, or manual check-in. Teachers receive real-time notifications and can generate attendance reports instantly."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: "🔧",
      questions: [
        {
          id: "tech-1",
          question: "What browsers are supported?",
          answer: "Schoolama works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience. Mobile apps are available for iOS and Android."
        },
        {
          id: "tech-2",
          question: "Is my school's data secure?",
          answer: "Absolutely. We use enterprise-grade security with SSL encryption, regular security audits, and comply with GDPR, FERPA, and other education data privacy regulations. Your data is backed up daily and stored in secure data centers."
        },
        {
          id: "tech-3",
          question: "What if I experience technical issues?",
          answer: "Our support team is available 24/7 through live chat, email, and phone. We also have a comprehensive knowledge base, video tutorials, and can provide remote assistance when needed."
        }
      ]
    },
    {
      category: "User Management",
      icon: "👥",
      questions: [
        {
          id: "users-1",
          question: "How do I add new students and teachers?",
          answer: "You can add users individually through the admin panel, bulk import via CSV files, or integrate with your existing student information system. New users receive welcome emails with login instructions."
        },
        {
          id: "users-2",
          question: "Can I set different permission levels for staff?",
          answer: "Yes, Schoolama has role-based access control. You can create custom roles for administrators, teachers, staff, students, and parents, each with specific permissions and access levels."
        },
        {
          id: "users-3",
          question: "How do students access their assignments and grades?",
          answer: "Students log into their dashboard to view assignments, submit work, check grades, and communicate with teachers. Parents can also access progress reports and receive notifications about their child's performance."
        }
      ]
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      description: "New to Schoolama? Start here for setup guides and basics",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Account & Billing",
      icon: "💳",
      description: "Manage your subscription, payments, and account settings",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Features Guide",
      icon: "⚡",
      description: "Learn how to use Schoolama's powerful features",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Technical Support",
      icon: "🔧",
      description: "Troubleshooting, integrations, and technical help",
      color: "from-red-500 to-orange-500"
    },
    {
      title: "User Management",
      icon: "👥",
      description: "Adding users, roles, permissions, and access control",
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Training & Resources",
      icon: "📚",
      description: "Video tutorials, webinars, and training materials",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 200px;
            transform: translateY(0);
          }
        }

        .gradient-bg {
          background: linear-gradient(
            -45deg,
            #667eea,
            #764ba2,
            #f093fb,
            #f5576c,
            #4facfe,
            #00f2fe
          );
          background-size: 400% 400%;
          animation: gradient 6s ease infinite;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .text-gradient {
          background: linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .form-input {
          transition: all 0.3s ease;
        }

        .form-input:focus {
          box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.2);
          border-color: #4facfe;
        }

        .hover-glow {
          transition: box-shadow 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }

        .faq-answer.open {
          max-height: 200px;
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">
                Schoolama AI LMS
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/sign-in"
                className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg pt-24 pb-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-float"></div>
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-4xl mt-20 md:text-6xl font-bold mb-6">
              How Can We
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Help You Today?
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Find answers to your questions, get support, and make the most of
              your Schoolama AI LMS experience.
            </p>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Choose Your Help Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a category below to find specific help and resources
              tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to the most common questions about Schoolama AI LMS.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-8">
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </span>
                        <span
                          className={`text-indigo-500 transform transition-transform ${
                            openFAQ === faq.id ? "rotate-180" : ""
                          }`}
                        >
                          ⌄
                        </span>
                      </button>
                      <div
                        className={`faq-answer ${
                          openFAQ === faq.id ? "open" : ""
                        }`}
                      >
                        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Still Need Help?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or issues.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Options */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">💬</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Live Chat Support
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Get instant help from our support team
                        </p>
                        <p className="text-indigo-600 text-sm font-medium mt-2">
                          Available 24/7
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-hover bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📧</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Email Support
                        </h3>
                        <p className="text-gray-600 break-all text-sm sm:text-base">
                          pradeepchandragajendra@schoolama.studio
                        </p>
                        <p className="text-green-600 text-sm font-medium mt-2">
                          Response within 24 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-hover bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">📚</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          Knowledge Base
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Browse our comprehensive help articles
                        </p>
                        <p className="text-purple-600 text-sm font-medium mt-2">
                          Self-service resources
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-hover bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl">🎥</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          Video Tutorials
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          Step-by-step video guides and webinars
                        </p>
                        <p className="text-orange-600 text-sm font-medium mt-2">
                          Visual learning resources
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Send us Your Question
                </h3>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500 text-xl">✅</span>
                      <p className="text-green-800 font-semibold">
                        Support ticket created successfully!
                      </p>
                    </div>
                    <p className="text-green-600 mt-1">
                      Our team will get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 text-xl">❌</span>
                      <p className="text-red-800 font-semibold">
                        Failed to submit your request
                      </p>
                    </div>
                    <p className="text-red-600 mt-1">
                      Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Help Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                    >
                      <option value="">Select a category</option>
                      <option value="getting-started">Getting Started</option>
                      <option value="account-billing">Account & Billing</option>
                      <option value="features">Features & Functionality</option>
                      <option value="technical">Technical Support</option>
                      <option value="user-management">User Management</option>
                      <option value="training">Training & Resources</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Detailed Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input resize-none"
                      placeholder="Please describe your issue in detail, including any error messages or steps you've already tried..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover-glow disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      "Submit Support Request"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-pink-500">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Try Schoolama AI LMS today and see how it can transform your educational institution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://schoolama-ai.vercel.app"
              target="_blank"
              className="bg-white text-indigo-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg inline-block"
            >
              🚀 Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-500 transition-all duration-300 hover:scale-105 inline-block"
            >
              💬 Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}