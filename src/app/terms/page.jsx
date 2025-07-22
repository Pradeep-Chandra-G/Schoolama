"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Shield, FileText, Clock, Users, AlertTriangle, CheckCircle } from "lucide-react";

export default function TermsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const tableOfContents = [
    { id: "acceptance", title: "Acceptance of Terms", icon: CheckCircle },
    { id: "definitions", title: "Definitions", icon: FileText },
    { id: "services", title: "Description of Services", icon: Users },
    { id: "registration", title: "User Registration", icon: Shield },
    { id: "usage", title: "Acceptable Use Policy", icon: AlertTriangle },
    { id: "privacy", title: "Privacy and Data Protection", icon: Shield },
    { id: "payment", title: "Payment Terms", icon: Clock },
    { id: "intellectual", title: "Intellectual Property", icon: FileText },
    { id: "limitation", title: "Limitation of Liability", icon: AlertTriangle },
    { id: "termination", title: "Termination", icon: Clock },
    { id: "governing", title: "Governing Law", icon: FileText },
    { id: "changes", title: "Changes to Terms", icon: Clock }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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

        .gradient-bg {
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 400% 400%;
          animation: gradient 6s ease infinite;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-card {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .nav-hover {
          transition: all 0.3s ease;
        }

        .nav-hover:hover {
          transform: translateY(-5px);
        }

        .hover-glow {
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          transition: box-shadow 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.6),
                      0 0 10px rgba(255, 255, 255, 0.7),
                      0 0 20px rgba(255, 255, 255, 0.8),
                      0 0 40px rgba(255, 255, 255, 0.9);
        }

        .text-gradient {
          background: linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .toc-item {
          transition: all 0.3s ease;
        }

        .toc-item.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateX(8px);
        }

        .toc-item:hover {
          transform: translateX(4px);
          background: rgba(102, 126, 234, 0.1);
        }

        .section-content {
          scroll-margin-top: 120px;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-effect" : ""}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">Schoolama AI LMS</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button className="text-black transition-colors nav-hover">Home</button>
              <button className="text-black transition-colors nav-hover">Features</button>
              <button className="text-black transition-colors nav-hover">Pricing</button>
              <button className="text-indigo-500 font-semibold transition-colors nav-hover">Terms</button>
              <button className="text-black transition-colors nav-hover">Contact</button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover-glow">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg pt-24 pb-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white bg-opacity-5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="animate-slide-up">
            <nav className="flex items-center justify-center space-x-2 text-white/80 mb-6">
              <span>Home</span>
              <ChevronRight size={16} />
              <span className="text-yellow-300">Terms and Conditions</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Terms and
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Conditions
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Please read these terms carefully before using our Schoolama AI LMS platform
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Clock size={20} />
                <span>Last Updated: January 15, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span>Legal Protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <div className="lg:w-1/4">
              <div className="glass-card rounded-2xl p-6 sticky top-32">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <FileText className="mr-2" size={20} />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`toc-item w-full text-left p-3 rounded-lg flex items-center space-x-3 ${
                          activeSection === item.id ? 'active' : 'text-gray-600'
                        }`}
                      >
                        <IconComponent size={16} />
                        <span className="text-sm">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Terms Content */}
            <div className="lg:w-3/4">
              <div className="glass-card rounded-2xl p-8 lg:p-12 space-y-12">
                
                {/* Acceptance of Terms */}
                <section id="acceptance" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <CheckCircle className="mr-3 text-green-500" size={28} />
                    1. Acceptance of Terms
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      By accessing or using the Schoolama AI Learning Management System (&quot;Service&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
                    </p>
                    <p>
                      These Terms constitute a legally binding agreement between you and Schoolama AI LMS regarding your use of our platform and services.
                    </p>
                  </div>
                </section>

                {/* Definitions */}
                <section id="definitions" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="mr-3 text-blue-500" size={28} />
                    2. Definitions
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>For the purposes of these Terms:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>&quot;Service&quot;</strong> refers to the Schoolama AI LMS platform and all related services</li>
                      <li><strong>&quot;User&quot;</strong> means any individual or entity using our Service</li>
                      <li><strong>&quot;Institution&quot;</strong> refers to educational organizations using our platform</li>
                      <li><strong>&quot;Content&quot;</strong> includes all data, information, and materials on our platform</li>
                      <li><strong>&quot;Account&quot;</strong> means your registered user account on our Service</li>
                    </ul>
                  </div>
                </section>

                {/* Description of Services */}
                <section id="services" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Users className="mr-3 text-purple-500" size={28} />
                    3. Description of Services
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      Schoolama AI LMS provides a comprehensive learning management system that includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>AI-powered analytics and insights</li>
                      <li>Student and teacher management tools</li>
                      <li>Curriculum and assessment management</li>
                      <li>Communication and collaboration features</li>
                      <li>Administrative and reporting capabilities</li>
                      <li>Mobile and web-based access</li>
                    </ul>
                    <p>
                      We reserve the right to modify, suspend, or discontinue any aspect of our Service at any time with reasonable notice.
                    </p>
                  </div>
                </section>

                {/* User Registration */}
                <section id="registration" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Shield className="mr-3 text-indigo-500" size={28} />
                    4. User Registration and Accounts
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      To use our Service, you must create an account and provide accurate, complete information. You are responsible for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Maintaining the confidentiality of your account credentials</li>
                      <li>All activities that occur under your account</li>
                      <li>Notifying us immediately of any unauthorized access</li>
                      <li>Keeping your account information up-to-date</li>
                    </ul>
                    <p>
                      You must be at least 18 years old to create an account, or have proper authorization from a parent/guardian or educational institution.
                    </p>
                  </div>
                </section>

                {/* Acceptable Use Policy */}
                <section id="usage" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <AlertTriangle className="mr-3 text-orange-500" size={28} />
                    5. Acceptable Use Policy
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>You agree not to use our Service to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Transmit harmful, offensive, or inappropriate content</li>
                      <li>Interfere with the Service&apos;s operation or security</li>
                      <li>Attempt unauthorized access to other accounts or systems</li>
                      <li>Use the Service for commercial purposes without permission</li>
                    </ul>
                    <p>
                      Violations may result in immediate account suspension or termination without notice.
                    </p>
                  </div>
                </section>

                {/* Privacy and Data Protection */}
                <section id="privacy" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Shield className="mr-3 text-green-500" size={28} />
                    6. Privacy and Data Protection
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                    </p>
                    <p>
                      We implement industry-standard security measures to protect your data, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security audits and assessments</li>
                      <li>Access controls and authentication measures</li>
                      <li>Compliance with educational data protection regulations</li>
                    </ul>
                  </div>
                </section>

                {/* Payment Terms */}
                <section id="payment" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Clock className="mr-3 text-blue-500" size={28} />
                    7. Payment Terms
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      For paid services, you agree to pay all applicable fees as described in your chosen plan. Payment terms include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Fees are charged in advance on a recurring basis</li>
                      <li>All fees are non-refundable except as required by law</li>
                      <li>You authorize automatic billing to your payment method</li>
                      <li>Price changes will be communicated with 30 days notice</li>
                      <li>Late payments may result in service suspension</li>
                    </ul>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section id="intellectual" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="mr-3 text-purple-500" size={28} />
                    8. Intellectual Property Rights
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      The Service and its original content, features, and functionality are owned by Schoolama AI LMS and are protected by copyright, trademark, and other intellectual property laws.
                    </p>
                    <p>
                      You retain ownership of content you upload but grant us a license to use it for providing our Service. You represent that you have the right to upload and use any content you provide.
                    </p>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section id="limitation" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <AlertTriangle className="mr-3 text-red-500" size={28} />
                    9. Limitation of Liability
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      To the fullest extent permitted by law, Schoolama AI LMS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
                    </p>
                    <p>
                      Our total liability shall not exceed the amount paid by you for the Service during the twelve months preceding the claim.
                    </p>
                  </div>
                </section>

                {/* Termination */}
                <section id="termination" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Clock className="mr-3 text-orange-500" size={28} />
                    10. Termination
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      Either party may terminate this agreement at any time. Upon termination:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your right to access the Service will cease immediately</li>
                      <li>You may download your data within 30 days</li>
                      <li>We may delete your data after the retention period</li>
                      <li>Provisions that should survive termination will remain in effect</li>
                    </ul>
                  </div>
                </section>

                {/* Governing Law */}
                <section id="governing" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="mr-3 text-indigo-500" size={28} />
                    11. Governing Law
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      These Terms are governed by and construed in accordance with the laws of [Jurisdiction], without regard to conflict of law principles. Any disputes will be resolved in the courts of [Jurisdiction].
                    </p>
                  </div>
                </section>

                {/* Changes to Terms */}
                <section id="changes" className="section-content animate-on-scroll">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <Clock className="mr-3 text-green-500" size={28} />
                    12. Changes to Terms
                  </h2>
                  <div className="prose prose-lg text-gray-600 space-y-4">
                    <p>
                      We may update these Terms from time to time. When we do, we will:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Post the updated Terms on this page</li>
                      <li>Update the &quot;Last Updated&quot; date</li>
                      <li>Notify users of significant changes via email or platform notification</li>
                      <li>Provide reasonable time to review changes before they take effect</li>
                    </ul>
                    <p>
                      Continued use of the Service after changes constitutes acceptance of the new Terms.
                    </p>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="section-content animate-on-scroll border-t border-gray-200 pt-12">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions About These Terms?</h3>
                    <p className="text-gray-600 mb-6">
                      If you have any questions about these Terms and Conditions, please contact us.
                    </p>
                    <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover-glow">
                      Contact Our Legal Team
                    </button>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">Schoolama AI LMS</span>
              </div>
              <p className="text-gray-400">
                Transforming education through intelligent technology and innovative solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Cookie Policy</button></li>
                <li><button className="hover:text-white transition-colors">Data Protection</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Contact Support</button></li>
                <li><button className="hover:text-white transition-colors">Documentation</button></li>
                <li><button className="hover:text-white transition-colors">System Status</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Schoolama AI LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}