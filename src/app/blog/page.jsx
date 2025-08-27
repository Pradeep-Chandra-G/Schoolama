"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Calendar, User, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
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

  const featuredPosts = [
    {
      title: "The Future of AI in Education: Transforming Learning Experiences",
      excerpt: "Discover how artificial intelligence is revolutionizing the educational landscape and creating personalized learning paths for students worldwide.",
      author: "Dr. Sarah Johnson",
      date: "January 15, 2025",
      category: "AI & Education",
      readTime: "8 min read",
      image: "🤖"
    },
    {
      title: "Building Effective School Management Systems: Best Practices",
      excerpt: "Learn the essential strategies and methodologies for implementing robust school management systems that enhance operational efficiency.",
      author: "Michael Chen",
      date: "January 12, 2025",
      category: "School Management",
      readTime: "6 min read",
      image: "🏫"
    },
    {
      title: "Data-Driven Decision Making in Educational Institutions",
      excerpt: "Explore how educational data analytics can provide actionable insights to improve student outcomes and institutional performance.",
      author: "Emma Rodriguez",
      date: "January 10, 2025",
      category: "Analytics",
      readTime: "7 min read",
      image: "📊"
    }
  ];

  const categories = [
    { name: "AI & Education", count: 24, color: "from-indigo-500 to-purple-500" },
    { name: "School Management", count: 18, color: "from-pink-500 to-red-500" },
    { name: "Analytics", count: 15, color: "from-blue-500 to-cyan-500" },
    { name: "Student Success", count: 21, color: "from-green-500 to-emerald-500" },
    { name: "Technology", count: 12, color: "from-yellow-500 to-orange-500" },
    { name: "Best Practices", count: 16, color: "from-purple-500 to-pink-500" }
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

        .category-hover {
          transition: all 0.3s ease;
        }

        .category-hover:hover {
          transform: scale(1.05);
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
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Insights & Innovation in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Educational Technology
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Stay ahead with the latest trends, best practices, and innovations in AI-powered education and school management.
            </p>
            <a
              href="https://blog.schoolama.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-indigo-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>Visit Full Blog</span>
              <ExternalLink className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover articles tailored to your interests in educational technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`category-hover p-6 rounded-2xl bg-gradient-to-br ${category.color} text-white cursor-pointer`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80">{category.count} articles</p>
                  </div>
                  <ArrowRight className="opacity-70" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most popular and insightful content to help you stay informed
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <article
                key={index}
                className="card-hover bg-white rounded-2xl p-8 animate-on-scroll shadow-lg"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="text-6xl mb-6 text-center">{post.image}</div>
                <div className="mb-4">
                  <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span className="text-indigo-500 font-medium">{post.readTime}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover-glow">
                  Read Article
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-pink-500">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get the latest insights, trends, and updates in educational technology delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-indigo-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Explore Our Full Blog?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover hundreds of articles, case studies, and insights on our dedicated blog platform.
            </p>
            <a
              href="https://blog.schoolama.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>Visit Our Blog</span>
              <ExternalLink className="ml-2" size={20} />
            </a>
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
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="https://schoolama-ai.vercel.app" target="_blank" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="https://blog.schoolama.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    Blog <ExternalLink className="ml-1" size={12} />
                  </a>
                </li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/docs"className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link  href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
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