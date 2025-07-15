"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CareersPage() {
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

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
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

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
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
          animation: gradient 8s ease infinite;
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .glass-card {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .glass-dark {
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s ease;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .card-hover {
          transition: all 0.4s ease;
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .construction-pattern {
          background-image: repeating-linear-gradient(
            45deg,
            #fbbf24,
            #fbbf24 10px,
            #1f2937 10px,
            #1f2937 20px
          );
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-black">
                Schoolama AI LMS
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-black hover:text-gray-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-black hover:text-gray-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-gray-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/careers"
                className="text-black hover:text-gray-600 transition-colors"
              >
                Careers
              </Link>
            </div>
            <Link
              href="/sign-in"
              className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg pt-24 pb-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div
            className="absolute top-3/4 right-1/4 w-32 h-32 bg-white bg-opacity-5 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-5xl mt-20 md:text-6xl font-bold mb-6 leading-tight">
              Join the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Educational Innovation
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Help us revolutionize education technology and shape the learning
              experience for millions of students worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Construction Notice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="construction-pattern w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚧</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Careers Portal Under Construction
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are currently building our comprehensive careers portal to
                provide you with the best possible application experience. Our
                team is working diligently to create a platform that reflects
                our commitment to innovation and excellence.
              </p>
              <div className="inline-flex items-center space-x-2 text-indigo-600 font-semibold">
                <div className="w-3 h-3 bg-indigo-500 rounded-full pulse-glow"></div>
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-on-scroll">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Our Current Journey
              </h2>
              <p className="text-xl text-gray-600">
                Building the foundation for tomorrow&apos;s education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8 card-hover animate-on-scroll">
                <div className="text-4xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  At Schoolama AI LMS, we envision a world where artificial
                  intelligence enhances every aspect of education. We&apos;re
                  building cutting-edge solutions that empower educators, engage
                  students, and streamline administrative processes.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 card-hover animate-on-scroll">
                <div className="text-4xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Current Focus
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team is currently in the product development phase,
                  focusing on creating robust, scalable solutions that will
                  transform how educational institutions operate and deliver
                  learning experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Status */}
      <section className="py-16 bg-inherit">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll">
            <div className="bg-gradient-to-br from-indigo-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden ">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-pink-500/10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  We&apos;re Growing, But Strategically
                </h2>
                <p className="text-lg opacity-90 mb-8 leading-relaxed">
                  While we recognize the immense talent in the market and have
                  identified key positions that would accelerate our growth, we
                  are currently operating in a lean startup phase. Our focus
                  remains on developing our core product and establishing market
                  validation before scaling our team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black border border-gray-600 rounded-xl p-6">
                    <div className="text-2xl mb-3">💡</div>
                    <h4 className="font-bold mb-2">Innovation First</h4>
                    <p className="text-sm text-gray-300">
                      Focusing on product excellence and market fit
                    </p>
                  </div>
                  <div className="bg-black border border-gray-600 rounded-xl p-6">
                    <div className="text-2xl mb-3">📈</div>
                    <h4 className="font-bold mb-2">Sustainable Growth</h4>
                    <p className="text-sm text-gray-300">
                      Building a solid foundation for future expansion
                    </p>
                  </div>
                  <div className="bg-black border border-gray-600 rounded-xl p-6">
                    <div className="text-2xl mb-3">🎯</div>
                    <h4 className="font-bold mb-2">Strategic Timing</h4>
                    <p className="text-sm text-gray-300">
                      Waiting for the right moment to scale our team
                    </p>
                  </div>
                </div>

                <div className="bg-black border border-gray-600 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Future Opportunities We&apos;re Considering
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-black border border-yellow-400 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(250,204,21)] cursor-default">
                      Full-Stack Developers
                    </div>
                    <div className="bg-black border border-red-600 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(220,38,38)] cursor-default">
                      AI/ML Engineers
                    </div>
                    <div className="bg-black border border-blue-600 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(37,99,235)] cursor-default">
                      UX/UI Designers
                    </div>
                    <div className="bg-black border border-green-500 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(34,197,94)] cursor-default">
                      DevOps Engineers
                    </div>
                    <div className="bg-black border border-pink-600 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(219,39,119)] cursor-default">
                      Product Managers
                    </div>
                    <div className="bg-black border border-teal-400 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(45,212,191)] cursor-default">
                      QA Engineers
                    </div>
                    <div className="bg-black border border-orange-500 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(249,115,22)] cursor-default">
                      Technical Writers
                    </div>
                    <div className="bg-black border border-violet-600 rounded-lg p-3 transition-shadow hover:shadow-[0_0_12px_rgb(124,58,237)] cursor-default">
                      Sales Executives
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-pink-500">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Connected for Future Opportunities
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We believe in transparency and keeping our community informed. If
              you&apos;re interested in joining our mission when the time is
              right, we&apos;d love to stay in touch.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                📧 Get Notified About Openings
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="glass-effect rounded-2xl p-6">
              <p className="text-sm opacity-80">
                <strong>Note:</strong> We appreciate your interest and patience
                as we build something remarkable. When we&apos;re ready to
                expand our team, we&apos;ll be looking for passionate
                individuals who share our vision of transforming education
                through technology.
              </p>
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
                  <Link href="/" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Demo
                  </Link>
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
                  <span className="text-indigo-400">Careers</span>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Support
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
