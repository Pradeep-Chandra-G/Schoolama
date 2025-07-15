"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PrivacyPolicyPage(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "overview",
        "information-collection",
        "data-usage",
        "data-sharing",
        "data-security",
        "user-rights",
        "cookies",
        "third-party",
        "children-privacy",
        "updates",
        "contact",
      ];

      let closestSection: string | null = null;
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance && rect.top <= window.innerHeight) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }

      if (closestSection && closestSection !== activeSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once to initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const privacySections: { id: string; title: string; icon: string }[] = [
    { id: "overview", title: "Overview", icon: "🔍" },
    {
      id: "information-collection",
      title: "Information Collection",
      icon: "📊",
    },
    { id: "data-usage", title: "Data Usage", icon: "⚙️" },
    { id: "data-sharing", title: "Data Sharing", icon: "🤝" },
    { id: "data-security", title: "Data Security", icon: "🔒" },
    { id: "user-rights", title: "Your Rights", icon: "✋" },
    { id: "cookies", title: "Cookies & Tracking", icon: "🍪" },
    { id: "third-party", title: "Third-Party Services", icon: "🔗" },
    { id: "children-privacy", title: "Children's Privacy", icon: "👶" },
    { id: "updates", title: "Policy Updates", icon: "📝" },
    { id: "contact", title: "Contact Us", icon: "📞" },
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

        .glass-card {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .sidebar-glass {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .text-gradient {
          background: linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
        }

        .section-active {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .section-inactive {
          background: rgba(255, 255, 255, 0.7);
          color: #374151;
        }

        .section-inactive:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateX(5px);
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
              <span className="text-xl font-bold text-gradient">
                Schoolama AI LMS
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-indigo-500 transition-colors"
              >
                ← Back to Home
              </Link>
              <Link
                href="/sign-in"
                className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover-glow"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-float"></div>
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-4xl mt-20 md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your privacy is our priority. Learn how we collect, use, and protect
            your data.
          </p>
          <div className="glass-card rounded-2xl p-4 max-w-md mx-auto">
            <div className="text-gray-800">
              <p className="font-semibold">Last Updated: January 15, 2025</p>
              <p className="text-sm mt-2">Effective Date: January 15, 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-32">
              <div className="sidebar-glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                        activeSection === section.id
                          ? "section-active"
                          : "section-inactive"
                      }`}
                    >
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-medium text-sm">
                        {section.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {/* Overview */}
              <section id="overview" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">🔍</span>
                  <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Welcome to Schoolama AI LMS. This Privacy Policy explains
                    how we collect, use, disclose, and safeguard your
                    information when you use our learning management system
                    platform and related services.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We are committed to protecting your privacy and maintaining
                    the security of your personal information. This policy
                    applies to all users of our platform, including students,
                    teachers, administrators, and parents.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-blue-800 font-semibold">
                      By using Schoolama AI LMS, you agree to the collection and
                      use of information in accordance with this policy.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Collection */}
              <section
                id="information-collection"
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">📊</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Information We Collect
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Name, email address, and contact information</li>
                      <li>• User profile information and preferences</li>
                      <li>• Academic records and performance data</li>
                      <li>• Communication logs and messages</li>
                      <li>
                        • Authentication credentials and security information
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Usage Information
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Device information and IP addresses</li>
                      <li>• Browser type and operating system</li>
                      <li>• Pages visited and time spent on platform</li>
                      <li>• Learning analytics and progress tracking</li>
                      <li>• Feature usage and interaction patterns</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Usage */}
              <section id="data-usage" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">⚙️</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    How We Use Your Data
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Platform Operations
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Provide and maintain our services</li>
                      <li>• Process transactions and payments</li>
                      <li>• Authenticate user access</li>
                      <li>• Generate analytics and insights</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Educational Enhancement
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Personalize learning experiences</li>
                      <li>• Track academic progress</li>
                      <li>• Provide AI-powered recommendations</li>
                      <li>• Facilitate communication</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">🤝</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Data Sharing
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                      We DO NOT sell your personal information
                    </h3>
                    <p className="text-red-700">
                      Your data is never sold to third parties for marketing or
                      commercial purposes.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Limited Sharing Scenarios
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li>
                        • <strong>Service Providers:</strong> Trusted partners
                        who help us operate our platform
                      </li>
                      <li>
                        • <strong>Legal Requirements:</strong> When required by
                        law or to protect our rights
                      </li>
                      <li>
                        • <strong>School Officials:</strong> Academic data
                        shared with authorized educational personnel
                      </li>
                      <li>
                        • <strong>Parent/Guardian Access:</strong> Student
                        information accessible to parents/guardians
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section
                id="data-security"
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">🔒</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Data Security
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Technical Safeguards
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• End-to-end encryption</li>
                        <li>• Secure data transmission (SSL/TLS)</li>
                        <li>• Regular security audits</li>
                        <li>• Multi-factor authentication</li>
                        <li>• Access controls and monitoring</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Operational Security
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Employee training and background checks</li>
                        <li>• Data backup and recovery procedures</li>
                        <li>• Incident response protocols</li>
                        <li>• Regular security updates</li>
                        <li>• Compliance with industry standards</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* User Rights */}
              <section id="user-rights" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">✋</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Your Rights
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Access & Control
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Access your personal information</li>
                      <li>• Update or correct your data</li>
                      <li>• Delete your account and data</li>
                      <li>• Export your data</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Privacy Controls
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Opt-out of marketing communications</li>
                      <li>• Manage privacy settings</li>
                      <li>• Control data sharing preferences</li>
                      <li>• Request data portability</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">🍪</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Cookies & Tracking
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    We use cookies and similar tracking technologies to enhance
                    your experience and analyze platform usage.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Essential Cookies
                      </h4>
                      <p className="text-sm text-gray-600">
                        Required for basic platform functionality
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm text-gray-600">
                        Help us understand usage patterns
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Preference Cookies
                      </h4>
                      <p className="text-sm text-gray-600">
                        Remember your settings and preferences
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Third-Party Services */}
              <section id="third-party" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">🔗</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Third-Party Services
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Our platform integrates with selected third-party services
                    to enhance functionality:
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      External Links
                    </h3>
                    <p className="text-yellow-700">
                      Our platform may contain links to third-party websites. We
                      are not responsible for their privacy practices.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Cloud Services
                      </h4>
                      <p className="text-sm text-gray-600">
                        Secure hosting and data storage providers
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Analytics Tools
                      </h4>
                      <p className="text-sm text-gray-600">
                        Platform performance and usage analytics
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section
                id="children-privacy"
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">👶</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Children's Privacy
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      COPPA Compliance
                    </h3>
                    <p className="text-green-700">
                      We comply with the Children's Online Privacy Protection
                      Act (COPPA) and similar regulations.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Special Protections
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Parental consent required for children under 13</li>
                      <li>• Limited data collection for minors</li>
                      <li>• Enhanced security measures for student data</li>
                      <li>• Regular privacy training for staff</li>
                      <li>• Clear data retention policies</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Policy Updates */}
              <section id="updates" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">📝</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Policy Updates
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Updates sent to your registered email address
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Platform Announcements
                      </h4>
                      <p className="text-sm text-gray-600">
                        In-app notifications for important changes
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl">📞</span>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Contact Us
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Privacy Officer
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <p>📧 privacy@schoolama-ai.com</p>
                        <p>📞 +1 (555) 123-4567</p>
                        <p>📍 123 Education Ave, Tech City, TC 12345</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Support Team
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <p>📧 support@schoolama-ai.com</p>
                        <p>💬 Live chat available 24/7</p>
                        <p>📚 Help Center: help.schoolama-ai.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      href="https://schoolama-ai.vercel.app"
                      target="_blank"
                      className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover-glow"
                    >
                      Visit Our Platform
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">Schoolama AI LMS</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming education through intelligent technology and
              innovative solutions.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400">
              <p>&copy; 2024 Schoolama AI LMS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
