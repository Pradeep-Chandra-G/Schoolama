"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // delay to ensure layout is ready
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 overflow-x-hidden">
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

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
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
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .nav-hover {
          transition: all 0.3s ease;
        }

        .nav-hover:hover {
          transform: translateY(-5px);
        }

        .hover-glow {
          box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* No shadow by default */
          transition: box-shadow 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.6),
            0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.8),
            0 0 40px rgba(255, 255, 255, 0.9);
        }

        .text-gradient {
          background: linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect" : ""
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">
                Schoolama AI LMS
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-black  transition-colors nav-hover"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-black  transition-colors nav-hover"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-black  transition-colors nav-hover"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-black  transition-colors nav-hover"
              >
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover-glow"
              >
                Sign In
              </Link>
              <Link
                href="https://schoolama-ai.vercel.app"
                target="_blank"
                className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover-glow"
              >
                Try Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white bg-opacity-5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-bounce-slow"></div>
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Education with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Experience the future of school management with our intelligent
              LMS platform. Streamline operations, enhance learning, and empower
              educators with cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://schoolama-ai.vercel.app"
                target="_blank"
                className="bg-white text-indigo-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                🚀 Start Free Trial
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-500 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how our AI-powered tools revolutionize school management
              and learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="card-hover bg-gradient-to-br from-sky-100 to-blue-100 p-8 rounded-2xl animate-on-scroll">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                AI-Powered Analytics
              </h3>
              <p className="text-gray-600">
                Advanced analytics provide insights into student performance,
                attendance patterns, and learning outcomes with predictive
                intelligence.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-purple-100 to-violet-100 p-8 rounded-2xl animate-on-scroll">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Smart User Management
              </h3>
              <p className="text-gray-600">
                Seamlessly manage students, teachers, parents, and
                administrators with role-based access and intelligent
                automation.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-2xl animate-on-scroll">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Real-time Dashboard
              </h3>
              <p className="text-gray-600">
                Comprehensive dashboards provide real-time insights into school
                operations, attendance, and performance metrics.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-pink-100 to-rose-100 p-8 rounded-2xl animate-on-scroll">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Dynamic Curriculum
              </h3>
              <p className="text-gray-600">
                Adaptive curriculum management with AI-driven recommendations
                for personalized learning paths and assessments.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-2xl animate-on-scroll">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Mobile-First Design
              </h3>
              <p className="text-gray-600">
                Responsive design ensures seamless experience across all
                devices, enabling learning and management anywhere.
              </p>
            </div>

            <div className="card-hover bg-gradient-to-br from-orange-100 to-red-100 p-8 rounded-2xl animate-on-scroll">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Bank-level security with advanced encryption, secure
                authentication, and compliance with educational data protection
                standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Why Choose Schoolama AI LMS?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Increase Efficiency by 60%
                    </h3>
                    <p className="text-gray-600">
                      Automate routine tasks and streamline administrative
                      processes with intelligent workflows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Improve Student Outcomes
                    </h3>
                    <p className="text-gray-600">
                      Personalized learning paths and AI-driven insights help
                      students achieve better results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Enhanced Parent Engagement
                    </h3>
                    <p className="text-gray-600">
                      Keep parents informed and engaged with real-time updates
                      and communication tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Ready to Transform Your School?
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Join thousands of educators already using Schoolama AI LMS
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Setup Time</span>
                    <span className="font-semibold text-green-600">
                      &lt; 24 hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Training Required</span>
                    <span className="font-semibold text-blue-600">Minimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ROI Timeline</span>
                    <span className="font-semibold text-purple-600">
                      30 days
                    </span>
                  </div>
                </div>
                <Link
                  href="https://schoolama-ai.vercel.app"
                  target="_blank"
                  className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-6 rounded-full text-center font-semibold hover:shadow-lg transition-all duration-300 hover-glow mt-6 block"
                >
                  Get Started Now - Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your institution&apos;s needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="card-hover bg-white border-2 border-gray-200 rounded-2xl p-8 animate-on-scroll">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Starter
                </h3>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  $29<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600 mb-6">Perfect for small schools</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Up to 100
                    students
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Basic
                    analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Email support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Mobile app
                    access
                  </li>
                </ul>
                <button className="w-full border-2 border-indigo-500 text-indigo-500 py-3 px-6 rounded-full font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300">
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="card-hover bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-2xl p-8 transform scale-105 animate-on-scroll">
              <div className="text-center">
                <div className="bg-white text-indigo-500 px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-4xl font-bold mb-2">
                  $79<span className="text-lg opacity-80">/month</span>
                </div>
                <p className="opacity-80 mb-6">
                  Ideal for growing institutions
                </p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-2">✓</span> Up to 500
                    students
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-2">✓</span> Advanced AI
                    analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-2">✓</span> Priority
                    support
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-300 mr-2">✓</span> Custom
                    integrations
                  </li>
                </ul>
                <button className="w-full bg-white text-indigo-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300">
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="card-hover bg-white border-2 border-gray-200 rounded-2xl p-8 animate-on-scroll">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Enterprise
                </h3>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  Custom
                </div>
                <p className="text-gray-600 mb-6">For large institutions</p>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Unlimited
                    students
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Full AI suite
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 24/7
                    dedicated support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Custom
                    development
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="w-full border-2 border-indigo-500 text-indigo-500 py-3 px-6 rounded-full font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-indigo-500 to-pink-500"
      >
        <div className="container mx-auto px-6 text-center text-white">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Revolutionize Your School?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join the AI education revolution today. Start your free trial and
              see the difference Schoolama AI LMS can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://schoolama-ai.vercel.app"
                target="_blank"
                className="bg-white text-indigo-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                🚀 Start Free Trial Now
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-500 transition-all duration-300">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
                Transforming education through intelligent technology and
                innovative solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Demo
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    API
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Training
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Status
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <Link  href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Schoolama AI LMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
