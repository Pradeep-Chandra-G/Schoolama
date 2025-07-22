"use client";
import { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  const features = [
    {
      title: "AI-Powered Learning",
      description:
        "Personalized learning paths adapted to each student's unique pace and learning style using advanced machine learning algorithms.",
      icon: "🧠",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Smart Assessment",
      description:
        "Automated grading and intelligent feedback systems that provide real-time insights to accelerate learning progress.",
      icon: "📊",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Interactive Content",
      description:
        "Engaging multimedia lessons with interactive elements, real-time collaboration, and immersive learning experiences.",
      icon: "🎯",
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Progress Tracking",
      description:
        "Comprehensive analytics and detailed reporting dashboard for students, teachers, and administrators.",
      icon: "📈",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Mobile Learning",
      description:
        "Seamless learning experience across all devices with offline capabilities and responsive design.",
      icon: "📱",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Collaboration Tools",
      description:
        "Built-in discussion forums, group projects, peer-to-peer learning, and social learning features.",
      icon: "👥",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Active Students", icon: "👨‍🎓" },
    { number: "2,500+", label: "Educators", icon: "👩‍🏫" },
    { number: "95%", label: "Success Rate", icon: "🎯" },
    { number: "150+", label: "Countries", icon: "🌍" },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      bio: "AI researcher with 15+ years in educational technology and machine learning innovation.",
      avatar: "👩‍💻",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Product",
      bio: "Former educator turned product strategist, passionate about transforming learning experiences.",
      avatar: "👨‍🎓",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      name: "Emily Johnson",
      role: "Lead UX Designer",
      bio: "Designer focused on creating intuitive, accessible, and engaging learning experiences.",
      avatar: "👩‍🎨",
      gradient: "from-green-400 to-teal-400",
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Full-stack engineer specialized in building scalable, high-performance educational platforms.",
      avatar: "👨‍💻",
      gradient: "from-orange-400 to-red-400",
    },
  ];

  const journeyData = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Founded by passionate educators and technologists who recognized the urgent need for personalized, AI-powered learning solutions.",
      icon: "🌱",
      subtitle: "Planting the Seed",
      details:
        "Initial research and development phase focusing on core AI learning algorithms",
      achievements: [
        "🚀 Company Founded",
        "💡 Core Team Assembled",
        "🔬 Research Initiated",
      ],
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      year: "2021",
      title: "First Launch",
      description:
        "Successfully launched our MVP with foundational AI tutoring capabilities and onboarded our first 1,000 beta users.",
      icon: "🚀",
      subtitle: "Taking Flight",
      details:
        "Beta testing with early adopters and continuous product iteration based on user feedback",
      achievements: [
        "🎯 MVP Launch",
        "👥 1K Beta Users",
        "📝 User Feedback Integration",
      ],
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      year: "2022",
      title: "Rapid Growth",
      description:
        "Expanded AI capabilities with advanced NLP, partnered with 100+ educational institutions, and reached 10,000 active learners.",
      icon: "📈",
      subtitle: "Scaling Up",
      details:
        "Major product enhancements and strategic partnerships with leading educational institutions",
      achievements: [
        "🏫 100+ Schools",
        "👨‍🎓 10K Students",
        "🤖 Advanced AI Engine",
      ],
      gradient: "from-green-500 to-teal-600",
    },
    {
      year: "2023",
      title: "Innovation Breakthrough",
      description:
        "Introduced revolutionary adaptive learning engine and real-time collaboration tools, achieving 95% student satisfaction rate.",
      icon: "🏆",
      subtitle: "Industry Recognition",
      details:
        "Received multiple EdTech awards and expanded to 50+ countries worldwide",
      achievements: [
        "🎨 Adaptive Learning",
        "🌍 50+ Countries",
        "⭐ 95% Satisfaction",
      ],
      gradient: "from-orange-500 to-red-600",
    },
    {
      year: "2024",
      title: "Global Impact",
      description:
        "Reached 50,000+ students and 2,500+ educators worldwide with our mobile app and cutting-edge AI features.",
      icon: "🌟",
      subtitle: "Global Leadership",
      details:
        "Established as a leading AI-powered learning platform with international recognition",
      achievements: [
        "📱 Mobile App Launch",
        "🎯 50K+ Students",
        "📊 Predictive Analytics",
      ],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      year: "2025",
      title: "The Future",
      description:
        "Continuing our mission with next-generation AI technologies, VR/AR integration, and unprecedented global expansion.",
      icon: "🔮",
      subtitle: "Endless Possibilities",
      details:
        "Building the future of education with innovative technologies and immersive experiences",
      achievements: [
        "🥽 VR/AR Learning",
        "🚀 Next-Gen AI",
        "🌍 Global Expansion",
      ],
      gradient: "from-cyan-500 to-blue-600",
      isFuture: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Schoolama AI LMS
              </h1>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-blue-600 font-semibold border-b-2 border-blue-600"
              >
                About
              </Link>
              <Link
                href="/#features"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </Link>
              <Link
                href="/#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="https://schoolama-ai.vercel.app"
                target="_blank"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Transforming Education with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
                AI Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Schoolama is revolutionizing online learning by combining
              cutting-edge artificial intelligence with proven educational
              methodologies to create personalized, engaging, and effective
              learning experiences.
            </p>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["mission", "vision", "values"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-xl font-medium transition-all transform hover:-translate-y-1 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                      : "bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-white hover:shadow-lg"
                  }`}
                >
                  Our {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              {activeTab === "mission" && (
                <div className="text-center">
                  <div className="text-4xl mb-6">🎯</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To democratize quality education by making personalized,
                    AI-powered learning accessible to everyone, everywhere. We
                    believe that every learner deserves an education tailored to
                    their unique needs, learning style, and pace. Through
                    innovative technology and human-centered design, we&apos;re
                    breaking down barriers to learning and empowering educators
                    to achieve unprecedented outcomes.
                  </p>
                </div>
              )}
              {activeTab === "vision" && (
                <div className="text-center">
                  <div className="text-4xl mb-6">🔮</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Vision
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To create a world where learning is limitless, engaging, and
                    perfectly adapted to each individual. We envision a future
                    where AI seamlessly integrates with human expertise to
                    provide educational experiences that are not just
                    informative, but transformative. Our platform will be the
                    bridge between traditional education and the digital future,
                    making learning more effective, enjoyable, and accessible
                    than ever before.
                  </p>
                </div>
              )}
              {activeTab === "values" && (
                <div>
                  <div className="text-4xl mb-6 text-center">💎</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Our Values
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Innovation",
                        desc: "Continuously pushing the boundaries of what's possible in education technology.",
                        icon: "🚀",
                      },
                      {
                        title: "Accessibility",
                        desc: "Making quality education available to learners regardless of location or background.",
                        icon: "🌍",
                      },
                      {
                        title: "Excellence",
                        desc: "Maintaining the highest standards in educational content and user experience.",
                        icon: "⭐",
                      },
                      {
                        title: "Community",
                        desc: "Building strong connections between learners, educators, and institutions.",
                        icon: "👥",
                      },
                    ].map((value, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl"
                      >
                        <div className="text-2xl mb-3">{value.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-700">{value.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Learners Worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of students and educators who have transformed
              their learning experience
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Schoolama?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of learning with our innovative AI-powered
              features
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              From a simple idea to transforming education worldwide
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 hidden lg:block rounded-full"></div>

            <div className="space-y-16">
              {journeyData.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  } items-center`}
                >
                  <div className="lg:w-1/2 lg:px-12 mb-8 lg:mb-0">
                    <div
                      className={`${
                        item.isFuture
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : "bg-white"
                      } p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}
                    >
                      <div className="flex items-center mb-6">
                        <div
                          className={`w-16 h-16 ${
                            item.isFuture
                              ? "bg-white/20"
                              : `bg-gradient-to-r ${item.gradient}`
                          } rounded-2xl flex items-center justify-center ${
                            item.isFuture ? "text-white" : "text-white"
                          } font-bold text-lg mr-4`}
                        >
                          {item.year}
                        </div>
                        <h3
                          className={`text-2xl font-bold ${
                            item.isFuture ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <p
                        className={`${
                          item.isFuture ? "text-blue-100" : "text-gray-600"
                        } leading-relaxed mb-6`}
                      >
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.achievements.map((achievement, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 ${
                              item.isFuture
                                ? "bg-white/20 text-white"
                                : "bg-blue-100 text-blue-800"
                            } rounded-full text-sm font-medium`}
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 lg:px-12">
                    <div
                      className={`text-center ${
                        index % 2 === 1 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <div className="text-6xl mb-4">{item.icon}</div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.subtitle}
                      </h4>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Passionate educators and technologists working together to
              transform learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform`}
                  >
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who have discovered the power of
            AI-driven education. Start your personalized learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://schoolama-ai.vercel.app/sign-up"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:-translate-y-1"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h3 className="text-xl font-bold">Schoolama</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming education through innovative AI-powered learning
                experiences that adapt to every learner&apos;s needs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://schoolama-ai.vercel.app"
                    className="hover:text-white transition-colors"
                  >
                    Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
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
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/help"
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
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Schoolama. All rights reserved. Building the future of
              AI-powered education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
