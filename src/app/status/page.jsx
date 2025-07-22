"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StatusPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
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

  // Mock status data - replace with real API calls
  const systemStatus = {
    overall: "operational", // operational, degraded, outage
    services: [
      {
        name: "Core LMS Platform",
        status: "operational",
        uptime: "99.99%",
        description: "Main learning management system",
        lastIncident: null
      },
      {
        name: "AI Analytics Engine",
        status: "operational",
        uptime: "99.95%",
        description: "AI-powered insights and analytics",
        lastIncident: null
      },
      {
        name: "Mobile Application",
        status: "operational",
        uptime: "99.97%",
        description: "iOS and Android mobile apps",
        lastIncident: null
      },
      {
        name: "Authentication Service",
        status: "operational",
        uptime: "99.98%",
        description: "User login and security systems",
        lastIncident: null
      },
      {
        name: "File Storage & CDN",
        status: "degraded",
        uptime: "98.45%",
        description: "Document storage and content delivery",
        lastIncident: "2 hours ago"
      },
      {
        name: "Email Notifications",
        status: "operational",
        uptime: "99.92%",
        description: "System notifications and alerts",
        lastIncident: null
      }
    ]
  };

  const recentIncidents = [
    {
      id: 1,
      title: "Intermittent File Upload Issues",
      status: "investigating",
      severity: "minor",
      date: "2025-07-22 14:30 UTC",
      description: "Some users experiencing slow file uploads to the CDN."
    },
    {
      id: 2,
      title: "Scheduled Maintenance - Database Optimization",
      status: "completed",
      severity: "maintenance",
      date: "2025-07-21 02:00 UTC",
      description: "Completed scheduled database maintenance for improved performance."
    },
    {
      id: 3,
      title: "AI Analytics Temporary Slowdown",
      status: "resolved",
      severity: "minor",
      date: "2025-07-20 16:15 UTC",
      description: "Resolved performance issues with AI analytics dashboard."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "operational":
        return "text-green-500 bg-green-100";
      case "degraded":
        return "text-yellow-500 bg-yellow-100";
      case "outage":
        return "text-red-500 bg-red-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return "✓";
      case "degraded":
        return "⚠";
      case "outage":
        return "✕";
      default:
        return "?";
    }
  };

  const getIncidentStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "text-green-600 bg-green-100";
      case "investigating":
        return "text-blue-600 bg-blue-100";
      case "monitoring":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-100";
      case "major":
        return "text-orange-600 bg-orange-100";
      case "minor":
        return "text-yellow-600 bg-yellow-100";
      case "maintenance":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
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

        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
          }
          40%, 50% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
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
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
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
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .pulse-indicator {
          position: relative;
        }

        .pulse-indicator::before {
          content: '';
          position: absolute;
          display: block;
          width: 300%;
          height: 300%;
          box-sizing: border-box;
          margin-left: -100%;
          margin-top: -100%;
          border-radius: 50%;
          background-color: currentColor;
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }

        .text-gradient {
          background: linear-gradient(135deg, #0f0f0f 0%, #3a3a3a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .status-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-effect" : ""}`}>
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
            </div>
          </div>
        </div>
      </nav>

      {/* Status Header */}
      <section className="pt-24 pb-12 gradient-bg">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              System Status
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Real-time status of Schoolama AI LMS services and infrastructure
            </p>
            <div className="glass-effect rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${systemStatus.overall === 'operational' ? 'bg-green-400 pulse-indicator' : systemStatus.overall === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                <span className="text-lg font-semibold">
                  {systemStatus.overall === 'operational' ? 'All Systems Operational' : 
                   systemStatus.overall === 'degraded' ? 'Some Systems Degraded' : 'System Outage'}
                </span>
              </div>
              <p className="text-sm opacity-80 mt-2">
                Last updated: {currentTime.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Status Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-on-scroll">
            Service Status
          </h2>
          
          <div className="status-grid">
            {systemStatus.services.map((service, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 card-hover animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(service.status)}`}>
                    <span>{getStatusIcon(service.status)}</span>
                    <span className="capitalize">{service.status}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Uptime</span>
                    <div className="text-lg font-bold text-gray-800">{service.uptime}</div>
                  </div>
                  {service.lastIncident && (
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Last incident</span>
                      <div className="text-sm text-gray-600">{service.lastIncident}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-on-scroll">
            Recent Incidents & Maintenance
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {recentIncidents.map((incident, index) => (
              <div
                key={incident.id}
                className="glass-card rounded-2xl p-6 card-hover animate-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                    {incident.title}
                  </h3>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getIncidentStatusColor(incident.status)}`}>
                      {incident.status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                      {incident.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">
                  {incident.description}
                </p>
                
                <div className="text-sm text-gray-500">
                  {incident.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Metrics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-on-scroll">
            Performance Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center card-hover animate-on-scroll">
              <div className="text-3xl font-bold text-green-500 mb-2">99.9%</div>
              <div className="text-gray-600">Overall Uptime</div>
              <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center card-hover animate-on-scroll">
              <div className="text-3xl font-bold text-blue-500 mb-2">142ms</div>
              <div className="text-gray-600">Avg Response Time</div>
              <div className="text-sm text-gray-500 mt-1">Global average</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center card-hover animate-on-scroll">
              <div className="text-3xl font-bold text-purple-500 mb-2">2.1M</div>
              <div className="text-gray-600">API Requests</div>
              <div className="text-sm text-gray-500 mt-1">Last 24 hours</div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center card-hover animate-on-scroll">
              <div className="text-3xl font-bold text-indigo-500 mb-2">0</div>
              <div className="text-gray-600">Active Incidents</div>
              <div className="text-sm text-gray-500 mt-1">Currently resolved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Subscription CTA */}
      <section className="py-16 gradient-bg">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Informed
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Subscribe to status updates and be the first to know about any incidents or maintenance windows
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-indigo-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">Schoolama AI LMS</span>
              </div>
              <p className="text-gray-400">
                Monitoring the health and performance of our educational platform 24/7.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/api-docs" className="hover:text-white transition-colors">API Status</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Status History</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: status@schoolama.ai</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Emergency: +1 (555) 999-0000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Schoolama AI LMS. All rights reserved. | Status Page v2.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}