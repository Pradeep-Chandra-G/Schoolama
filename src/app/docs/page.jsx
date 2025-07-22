// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function DocsPage() {
//   const [activeSection, setActiveSection] = useState("getting-started");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Section observer for active navigation
//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.3,
//       rootMargin: "-100px 0px -50% 0px",
//     };

//     const sectionObserver = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setActiveSection(entry.target.id);
//         }
//       });
//     }, observerOptions);

//     document.querySelectorAll("[data-section]").forEach((el) => {
//       sectionObserver.observe(el);
//     });

//     return () => sectionObserver.disconnect();
//   }, []);

//   // Animate elements on scroll
//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px",
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("animate-in");
//         }
//       });
//     }, observerOptions);

//     document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//     setIsMobileMenuOpen(false);
//   };

//   const navigationItems = [
//     { id: "getting-started", title: "Getting Started", icon: "🚀" },
//     { id: "installation", title: "Installation", icon: "⚙️" },
//     { id: "configuration", title: "Configuration", icon: "🔧" },
//     { id: "user-management", title: "User Management", icon: "👥" },
//     { id: "analytics", title: "Analytics", icon: "📊" },
//     { id: "api-reference", title: "API Reference", icon: "📚" },
//     { id: "integrations", title: "Integrations", icon: "🔗" },
//     { id: "troubleshooting", title: "Troubleshooting", icon: "🔍" },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes gradient-shift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         @keyframes pulse-glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
//           50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); }
//         }
//         .glass-effect {
//           backdrop-filter: blur(20px);
//           background: rgba(255, 255, 255, 0.05);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .glass-sidebar {
//           backdrop-filter: blur(20px);
//           background: rgba(0, 0, 0, 0.8);
//           border-right: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//         .animate-on-scroll {
//           opacity: 0;
//           transform: translateY(30px);
//           transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//         }
//         .animate-on-scroll.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         .hover-lift {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }
//         .hover-lift:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
//         }
//         .nav-item {
//           transition: all 0.3s ease;
//           border-left: 2px solid transparent;
//         }
//         .nav-item.active {
//           border-left-color: #6b7280;
//           background: rgba(255, 255, 255, 0.05);
//         }
//         .nav-item:hover {
//           background: rgba(255, 255, 255, 0.03);
//           border-left-color: #9ca3af;
//         }
//         .code-block {
//           background: linear-gradient(135deg, rgba(17, 17, 17, 0.8), rgba(31, 31, 31, 0.8));
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .gradient-text {
//           background: linear-gradient(135deg, #ffffff, #9ca3af);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .search-highlight {
//           background: rgba(59, 130, 246, 0.3);
//           padding: 0 4px;
//           border-radius: 4px;
//         }
//         /* Scrollbar styling */
//         ::-webkit-scrollbar {
//           width: 6px;
//         }
//         ::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//         }
//         ::-webkit-scrollbar-thumb {
//           background: rgba(255, 255, 255, 0.3);
//           border-radius: 3px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 255, 255, 0.5);
//         }
//         /* Mobile responsive improvements */
//         @media (max-width: 768px) {
//           .hero-title {
//             font-size: 2.5rem;
//           }
//           .section-padding {
//             padding: 1rem;
//           }
//         }
//       `}</style>

//       {/* Navigation Header */}
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-effect shadow-lg" : ""}`}>
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <Link href="/" className="flex items-center space-x-3 group">
//               <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-white font-bold text-xl">S</span>
//               </div>
//               <div>
//                 <span className="text-xl font-bold gradient-text">Schoolama AI LMS</span>
//                 <div className="text-sm text-gray-400">Documentation</div>
//               </div>
//             </Link>
//             <div className="hidden md:flex items-center space-x-6">
//               <Link href="/" className="text-gray-300 hover:text-white transition-colors">
//                 Home
//               </Link>
//               <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
//                 Blog
//               </Link>
//               <Link 
//                 href="https://schoolama-ai.vercel.app" 
//                 target="_blank"
//                 className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
//               >
//                 Try Now
//               </Link>
//             </div>
//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 text-gray-300 hover:text-white"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Navigation Overlay */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 md:hidden">
//           <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
//           <div className="fixed right-0 top-0 h-full w-80 glass-effect p-6 overflow-y-auto">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-xl font-bold">Navigation</h2>
//               <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <div className="space-y-2">
//               {navigationItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className={`w-full text-left p-3 rounded-lg nav-item ${activeSection === item.id ? "active" : ""}`}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.title}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex pt-20">
//         {/* Sidebar */}
//         <aside className="hidden md:block w-80 fixed left-0 top-20 bottom-0 glass-sidebar overflow-y-auto">
//           <div className="p-6">
//             <div className="mb-8">
//               <h2 className="text-lg font-bold mb-4 gradient-text">Table of Contents</h2>
//               <div className="space-y-1">
//                 {navigationItems.map((item) => (
//                   <button
//                     key={item.id}
//                     onClick={() => scrollToSection(item.id)}
//                     className={`w-full text-left p-3 rounded-lg nav-item text-sm ${activeSection === item.id ? "active" : ""}`}
//                   >
//                     <span className="mr-3 text-base">{item.icon}</span>
//                     {item.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {/* Quick Links */}
//             <div className="space-y-4">
//               <div className="glass-effect rounded-xl p-4">
//                 <h3 className="font-semibold mb-2 text-gray-300">Quick Start</h3>
//                 <p className="text-sm text-gray-400 mb-3">Get up and running in minutes</p>
//                 <Link 
//                   href="https://schoolama-ai.vercel.app" 
//                   target="_blank"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Start Free Trial →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 md:ml-80">
//           <div className="max-w-4xl mx-auto px-6 py-8">
//             {/* Hero Section */}
//             <section className="mb-16 animate-on-scroll">
//               <div className="text-center mb-12">
//                 <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 gradient-text">
//                   Documentation
//                 </h1>
//                 <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                   Complete guide to integrating and using Schoolama AI LMS. 
//                   From quick setup to advanced features.
//                 </p>
//               </div>
//             </section>

//             {/* Getting Started */}
//             <section id="getting-started" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">🚀</span>
//                   <h2 className="text-3xl font-bold">Getting Started</h2>
//                 </div>
//                 <div className="prose prose-invert max-w-none">
//                   <p className="text-gray-300 text-lg mb-6">
//                     Welcome to Schoolama AI LMS! This guide will help you set up and start using 
//                     our platform in just a few minutes.
//                   </p>
//                   <div className="grid md:grid-cols-2 gap-6 mb-8">
//                     <div className="glass-effect rounded-xl p-6">
//                       <h3 className="text-xl font-semibold mb-3 text-white">For Administrators</h3>
//                       <p className="text-gray-400 mb-4">Set up your school's digital infrastructure</p>
//                       <ul className="space-y-2 text-gray-300">
//                         <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> School configuration</li>
//                         <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> User management</li>
//                         <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Role assignments</li>
//                       </ul>
//                     </div>
//                     <div className="glass-effect rounded-xl p-6">
//                       <h3 className="text-xl font-semibold mb-3 text-white">For Teachers</h3>
//                       <p className="text-gray-400 mb-4">Create engaging learning experiences</p>
//                       <ul className="space-y-2 text-gray-300">
//                         <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Course creation</li>
//                         <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Student tracking</li>
//                         <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Assessment tools</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Installation */}
//             <section id="installation" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">⚙️</span>
//                   <h2 className="text-3xl font-bold">Installation</h2>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="text-gray-300 text-lg">
//                     Choose your preferred installation method:
//                   </p>
                  
//                   <div className="space-y-4">
//                     <div className="glass-effect rounded-lg p-4">
//                       <h3 className="font-semibold mb-2 text-white">Option 1: Cloud Hosted (Recommended)</h3>
//                       <p className="text-gray-400 mb-4">Get started instantly with our managed cloud solution.</p>
//                       <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
//                         <div className="text-green-400"># No installation required!</div>
//                         <div>Visit: https://schoolama-ai.vercel.app</div>
//                         <div>Sign up and start your free trial</div>
//                       </div>
//                     </div>

//                     <div className="glass-effect rounded-lg p-4">
//                       <h3 className="font-semibold mb-2 text-white">Option 2: Self-Hosted</h3>
//                       <p className="text-gray-400 mb-4">Deploy on your own infrastructure for maximum control.</p>
//                       <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
//                         <div className="text-blue-400"># Clone the repository</div>
//                         <div>git clone https://github.com/schoolama/ai-lms.git</div>
//                         <div className="mt-2 text-blue-400"># Install dependencies</div>
//                         <div>npm install</div>
//                         <div className="mt-2 text-blue-400"># Start development server</div>
//                         <div>npm run dev</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Configuration */}
//             <section id="configuration" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">🔧</span>
//                   <h2 className="text-3xl font-bold">Configuration</h2>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="text-gray-300 text-lg">
//                     Configure your Schoolama AI LMS instance to match your institution's needs.
//                   </p>
                  
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h3 className="text-xl font-semibold text-white">Basic Settings</h3>
//                       <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
//                         <div className="text-yellow-400">// config/school.js</div>
//                         <div>export const schoolConfig = &#123;</div>
//                         <div className="ml-4">name: "Your School Name",</div>
//                         <div className="ml-4">timezone: "America/New_York",</div>
//                         <div className="ml-4">academic_year: "2024-2025",</div>
//                         <div className="ml-4">currency: "USD"</div>
//                         <div>&#125;</div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h3 className="text-xl font-semibold text-white">AI Settings</h3>
//                       <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
//                         <div className="text-yellow-400">// config/ai.js</div>
//                         <div>export const aiConfig = &#123;</div>
//                         <div className="ml-4">analytics: true,</div>
//                         <div className="ml-4">recommendations: true,</div>
//                         <div className="ml-4">auto_grading: true,</div>
//                         <div className="ml-4">language: "en"</div>
//                         <div>&#125;</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* User Management */}
//             <section id="user-management" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">👥</span>
//                   <h2 className="text-3xl font-bold">User Management</h2>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="text-gray-300 text-lg">
//                     Manage users with role-based access control and automated workflows.
//                   </p>
                  
//                   <div className="grid md:grid-cols-3 gap-4">
//                     <div className="glass-effect rounded-lg p-4">
//                       <div className="text-2xl mb-2">👨‍🎓</div>
//                       <h4 className="font-semibold text-white">Students</h4>
//                       <p className="text-sm text-gray-400">Access courses, assignments, and grades</p>
//                     </div>
//                     <div className="glass-effect rounded-lg p-4">
//                       <div className="text-2xl mb-2">👨‍🏫</div>
//                       <h4 className="font-semibold text-white">Teachers</h4>
//                       <p className="text-sm text-gray-400">Create content, grade, and track progress</p>
//                     </div>
//                     <div className="glass-effect rounded-lg p-4">
//                       <div className="text-2xl mb-2">👨‍💼</div>
//                       <h4 className="font-semibold text-white">Admins</h4>
//                       <p className="text-sm text-gray-400">Full system access and management</p>
//                     </div>
//                   </div>

//                   <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
//                     <div className="text-green-400"># Create a new user</div>
//                     <div>POST /api/users</div>
//                     <div className="text-gray-500">&#123;</div>
//                     <div className="ml-4">"name": "John Doe",</div>
//                     <div className="ml-4">"email": "john@school.edu",</div>
//                     <div className="ml-4">"role": "student",</div>
//                     <div className="ml-4">"class": "10A"</div>
//                     <div className="text-gray-500">&#125;</div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Analytics */}
//             <section id="analytics" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">📊</span>
//                   <h2 className="text-3xl font-bold">Analytics & Insights</h2>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="text-gray-300 text-lg">
//                     Harness the power of AI-driven analytics to improve educational outcomes.
//                   </p>
                  
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="glass-effect rounded-lg p-6">
//                       <h3 className="text-lg font-semibold mb-4 text-white">Performance Tracking</h3>
//                       <ul className="space-y-2 text-gray-300">
//                         <li className="flex items-center"><span className="text-blue-400 mr-2">📈</span> Real-time grade analytics</li>
//                         <li className="flex items-center"><span className="text-green-400 mr-2">🎯</span> Learning outcome predictions</li>
//                         <li className="flex items-center"><span className="text-yellow-400 mr-2">⚡</span> Engagement metrics</li>
//                         <li className="flex items-center"><span className="text-purple-400 mr-2">🔍</span> Risk identification</li>
//                       </ul>
//                     </div>
                    
//                     <div className="glass-effect rounded-lg p-6">
//                       <h3 className="text-lg font-semibold mb-4 text-white">Reporting</h3>
//                       <ul className="space-y-2 text-gray-300">
//                         <li className="flex items-center"><span className="text-red-400 mr-2">📋</span> Custom report builder</li>
//                         <li className="flex items-center"><span className="text-indigo-400 mr-2">📅</span> Scheduled reports</li>
//                         <li className="flex items-center"><span className="text-teal-400 mr-2">📊</span> Interactive dashboards</li>
//                         <li className="flex items-center"><span className="text-orange-400 mr-2">📤</span> Export capabilities</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* API Reference */}
//             <section id="api-reference" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">📚</span>
//                   <h2 className="text-3xl font-bold">API Reference</h2>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="text-gray-300 text-lg">
//                     Integrate Schoolama AI LMS with your existing systems using our REST API.
//                   </p>
                  
//                   <div className="space-y-4">
//                     <div className="glass-effect rounded-lg p-4">
//                       <h3 className="font-semibold mb-2 text-white">Authentication</h3>
//                       <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
//                         <div className="text-yellow-400"># Get API token</div>
//                         <div>curl -X POST https://api.schoolama.ai/auth/token \</div>
//                         <div className="ml-4">-H "Content-Type: application/json" \</div>
//                         <div className="ml-4">-d '&#123;"email":"admin@school.edu","password":"***"&#125;'</div>
//                       </div>
//                     </div>

//                     <div className="glass-effect rounded-lg p-4">
//                       <h3 className="font-semibold mb-2 text-white">Common Endpoints</h3>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex justify-between items-center p-2 rounded bg-gray-800">
//                           <code className="text-green-400">GET /api/students</code>
//                           <span className="text-gray-400">List all students</span>
//                         </div>
//                         <div className="flex justify-between items-center p-2 rounded bg-gray-800">
//                           <code className="text-blue-400">POST /api/courses</code>
//                           <span className="text-gray-400">Create new course</span>
//                         </div>
//                         <div className="flex justify-between items-center p-2 rounded bg-gray-800">
//                           <code className="text-yellow-400">PUT /api/grades/:id</code>
//                           <span className="text-gray-400">Update grade</span>
//                         </div>
//                         <div className="flex justify-between items-center p-2 rounded bg-gray-800">
//                           <code className="text-red-400">DELETE /api/users/:id</code>
//                           <span className="text-gray-400">Remove user</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Integrations */}
//             <section id="integrations" data-section className="mb-16 animate-on-scroll">
//               <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//                 <div className="flex items-center mb-6">
//                   <span className="text-3xl mr-4">🔗</span>
//                   <h2 className="text-3xl font-bold">Integrations</h2>
//                 </div>
//                 <div className="space-y-6">
//                   <p className="text-gray-300 text-lg">
//                     Connect with popular educational tools and services.
//                   </p>
                  
//                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {[
//                       { name: "Google Classroom", icon: "🎓", status: "Active" },
//                       { name: "Microsoft Teams", icon: "💼", status: "Active" },
//                       { name: "Zoom", icon: "📹", status: "Active" },
//                       { name: "Canvas LMS", icon: "🎨", status: "Beta" },
//                       { name: "Blackboard", icon: "⚫", status: "Coming Soon" },
//                       { name: "Moodle", icon: "📚", status: "Active" }
//                     ].map((integration, index) => (
//                       <div key={index} className="glass-effect rounded-lg p-4 hover-lift">
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="flex items-center">
//                             <span className="text-2xl mr-3">{integration.icon}</span>
//                             <span className="font-medium text-white">{integration.name}</span>
//                           </div>
//                           <span
//                             className={`text-sm px-2 py-1 rounded-full ${
//                               integration.status === "Active"
//                                 ? "bg-green-600 text-white"
//                                 : integration.status === "Beta"
//                                 ? "bg-yellow-600 text-white"
//                                 : "bg-gray-600 text-white"
//                             }`}
//                           >
//                             {integration.status}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
// </div>
//               </div>
//             </section>


//         {/* Troubleshooting */}
//         <section id="troubleshooting" data-section className="mb-24 animate-on-scroll">
//           <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
//             <div className="flex items-center mb-6">
//               <span className="text-3xl mr-4">🔍</span>
//               <h2 className="text-3xl font-bold">Troubleshooting</h2>
//             </div>
//             <div className="space-y-6">
//               <p className="text-gray-300 text-lg">
//                 Encountered an issue? Here are some common problems and how to solve them.
//               </p>
//               <ul className="space-y-4">
//                 <li>
//                   <h4 className="font-semibold text-white">Problem: Cannot login</h4>
//                   <p className="text-sm text-gray-400">Ensure your credentials are correct and the server is reachable.</p>
//                 </li>
//                 <li>
//                   <h4 className="font-semibold text-white">Problem: API requests failing</h4>
//                   <p className="text-sm text-gray-400">Check your API token and endpoint URL. Refer to the API Reference section above.</p>
//                 </li>
//                 <li>
//                   <h4 className="font-semibold text-white">Problem: Dashboard not loading</h4>
//                   <p className="text-sm text-gray-400">Try clearing browser cache or switching to incognito mode.</p>
//                 </li>
//                 <li>
//                   <h4 className="font-semibold text-white">Problem: AI recommendations not showing</h4>
//                   <p className="text-sm text-gray-400">Ensure AI features are enabled in your configuration and you have enough usage data.</p>
//                 </li>
//               </ul>
//               <p className="text-gray-400 text-sm">
//                 Still stuck? <Link href="/help" className="underline text-white hover:text-blue-400">Contact support</Link>
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8 pb-12">
//           &copy; {new Date().getFullYear()} Schoolama AI LMS. All rights reserved.
//         </footer>
//         </div>
//         </main>
//       </div>
//     </div>
//   )
// };


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer for active navigation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -50% 0px",
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-section]").forEach((el) => {
      sectionObserver.observe(el);
    });

    return () => sectionObserver.disconnect();
  }, []);

  // Animate elements on scroll
  useEffect(() => {
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
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: "getting-started", title: "Getting Started", icon: "🚀" },
    { id: "installation", title: "Installation", icon: "⚙️" },
    { id: "configuration", title: "Configuration", icon: "🔧" },
    { id: "user-management", title: "User Management", icon: "👥" },
    { id: "analytics", title: "Analytics", icon: "📊" },
    { id: "api-reference", title: "API Reference", icon: "📚" },
    { id: "integrations", title: "Integrations", icon: "🔗" },
    { id: "troubleshooting", title: "Troubleshooting", icon: "🔍" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); }
        }
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-sidebar {
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.8);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
        }
        .nav-item {
          transition: all 0.3s ease;
          border-left: 2px solid transparent;
        }
        .nav-item.active {
          border-left-color: #6b7280;
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.03);
          border-left-color: #9ca3af;
        }
        .code-block {
          background: linear-gradient(135deg, rgba(17, 17, 17, 0.9), rgba(31, 31, 31, 0.9));
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          overflow-x: auto;
        }
        .gradient-text {
          background: linear-gradient(135deg, #ffffff, #9ca3af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .search-highlight {
          background: rgba(59, 130, 246, 0.3);
          padding: 0 4px;
          border-radius: 4px;
        }
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        /* Mobile responsive improvements */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .section-padding {
            padding: 1rem;
          }
        }
      `}</style>

      {/* Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-effect shadow-lg" : ""}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Schoolama AI LMS</span>
                <div className="text-sm text-gray-400">Documentation</div>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link 
                href="https://schoolama-ai.vercel.app" 
                target="_blank"
                className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Try Now
              </Link>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 glass-effect p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Navigation</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left p-3 rounded-lg nav-item ${activeSection === item.id ? "active" : ""}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="hidden md:block w-80 fixed left-0 top-20 bottom-0 glass-sidebar overflow-y-auto">
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 gradient-text">Table of Contents</h2>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-3 rounded-lg nav-item text-sm ${activeSection === item.id ? "active" : ""}`}
                  >
                    <span className="mr-3 text-base">{item.icon}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            {/* Quick Links */}
            <div className="space-y-4">
              <div className="glass-effect rounded-xl p-4">
                <h3 className="font-semibold mb-2 text-gray-300">Quick Start</h3>
                <p className="text-sm text-gray-400 mb-3">Get up and running in minutes</p>
                <Link 
                  href="https://schoolama-ai.vercel.app" 
                  target="_blank"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Start Free Trial →
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-80">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <section className="mb-16 animate-on-scroll">
              <div className="text-center mb-12">
                <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 gradient-text">
                  Documentation
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Complete guide to integrating and using Schoolama AI LMS. 
                  From quick setup to advanced features.
                </p>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">🚀</span>
                  <h2 className="text-3xl font-bold">Getting Started</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg mb-6">
                    Welcome to Schoolama AI LMS! This guide will help you set up and start using 
                    our platform in just a few minutes.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="glass-effect rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-3 text-white">For Administrators</h3>
                      <p className="text-gray-400 mb-4">Set up your school's digital infrastructure</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> School configuration</li>
                        <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> User management</li>
                        <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Role assignments</li>
                      </ul>
                    </div>
                    <div className="glass-effect rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-3 text-white">For Teachers</h3>
                      <p className="text-gray-400 mb-4">Create engaging learning experiences</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Course creation</li>
                        <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Student tracking</li>
                        <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Assessment tools</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section id="installation" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">⚙️</span>
                  <h2 className="text-3xl font-bold">Installation</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Choose your preferred installation method:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="glass-effect rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-white">Option 1: Cloud Hosted (Recommended)</h3>
                      <p className="text-gray-400 mb-4">Get started instantly with our managed cloud solution.</p>
                      <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
                        <div className="text-green-400"># No installation required!</div>
                        <div>Visit: https://schoolama-ai.vercel.app</div>
                        <div>Sign up and start your free trial</div>
                      </div>
                    </div>

                    <div className="glass-effect rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-white">Option 2: Self-Hosted</h3>
                      <p className="text-gray-400 mb-4">Deploy on your own infrastructure for maximum control.</p>
                      <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
                        <div className="text-blue-400"># Clone the repository</div>
                        <div>git clone https://github.com/schoolama/ai-lms.git</div>
                        <div className="mt-2 text-blue-400"># Install dependencies</div>
                        <div>npm install</div>
                        <div className="mt-2 text-blue-400"># Start development server</div>
                        <div>npm run dev</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Configuration */}
            <section id="configuration" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">🔧</span>
                  <h2 className="text-3xl font-bold">Configuration</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Configure your Schoolama AI LMS instance to match your institution's needs.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Basic Settings</h3>
                      <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
                        <div className="text-yellow-400">// config/school.js</div>
                        <div>export const schoolConfig = &#123;</div>
                        <div className="ml-4">name: "Your School Name",</div>
                        <div className="ml-4">timezone: "America/New_York",</div>
                        <div className="ml-4">academic_year: "2024-2025",</div>
                        <div className="ml-4">currency: "USD"</div>
                        <div>&#125;</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">AI Settings</h3>
                      <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
                        <div className="text-yellow-400">// config/ai.js</div>
                        <div>export const aiConfig = &#123;</div>
                        <div className="ml-4">analytics: true,</div>
                        <div className="ml-4">recommendations: true,</div>
                        <div className="ml-4">auto_grading: true,</div>
                        <div className="ml-4">language: "en"</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* User Management */}
            <section id="user-management" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">👥</span>
                  <h2 className="text-3xl font-bold">User Management</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Manage users with role-based access control and automated workflows.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="glass-effect rounded-lg p-4">
                      <div className="text-2xl mb-2">👨‍🎓</div>
                      <h4 className="font-semibold text-white">Students</h4>
                      <p className="text-sm text-gray-400">Access courses, assignments, and grades</p>
                    </div>
                    <div className="glass-effect rounded-lg p-4">
                      <div className="text-2xl mb-2">👨‍🏫</div>
                      <h4 className="font-semibold text-white">Teachers</h4>
                      <p className="text-sm text-gray-400">Create content, grade, and track progress</p>
                    </div>
                    <div className="glass-effect rounded-lg p-4">
                      <div className="text-2xl mb-2">👨‍💼</div>
                      <h4 className="font-semibold text-white">Admins</h4>
                      <p className="text-sm text-gray-400">Full system access and management</p>
                    </div>
                  </div>

                  <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
                    <div className="text-green-400"># Create a new user</div>
                    <div>POST /api/users</div>
                    <div className="text-gray-500">&#123;</div>
                    <div className="ml-4">"name": "John Doe",</div>
                    <div className="ml-4">"email": "john@school.edu",</div>
                    <div className="ml-4">"role": "student",</div>
                    <div className="ml-4">"class": "10A"</div>
                    <div className="text-gray-500">&#125;</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Analytics */}
            <section id="analytics" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">📊</span>
                  <h2 className="text-3xl font-bold">Analytics & Insights</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Harness the power of AI-driven analytics to improve educational outcomes.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-white">Performance Tracking</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center"><span className="text-blue-400 mr-2">📈</span> Real-time grade analytics</li>
                        <li className="flex items-center"><span className="text-green-400 mr-2">🎯</span> Learning outcome predictions</li>
                        <li className="flex items-center"><span className="text-yellow-400 mr-2">⚡</span> Engagement metrics</li>
                        <li className="flex items-center"><span className="text-purple-400 mr-2">🔍</span> Risk identification</li>
                      </ul>
                    </div>
                    
                    <div className="glass-effect rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-white">Reporting</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center"><span className="text-red-400 mr-2">📋</span> Custom report builder</li>
                        <li className="flex items-center"><span className="text-indigo-400 mr-2">📅</span> Scheduled reports</li>
                        <li className="flex items-center"><span className="text-teal-400 mr-2">📊</span> Interactive dashboards</li>
                        <li className="flex items-center"><span className="text-orange-400 mr-2">📤</span> Export capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">📚</span>
                  <h2 className="text-3xl font-bold">API Reference</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Integrate Schoolama AI LMS with your existing systems using our REST API.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="glass-effect rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-white">Authentication</h3>
                      <div className="code-block rounded-lg p-4 font-mono text-sm text-gray-300">
                        <div className="text-yellow-400"># Get API token</div>
                        <div>curl -X POST https://api.schoolama.ai/auth/token \</div>
                        <div className="ml-4">-H "Content-Type: application/json" \</div>
                        <div className="ml-4">-d '&#123;"email":"admin@school.edu","password":"***"&#125;'</div>
                      </div>
                    </div>

                    <div className="glass-effect rounded-lg p-4">
                      <h3 className="font-semibold mb-2 text-white">Common Endpoints</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2 rounded bg-gray-800">
                          <code className="text-green-400">GET /api/students</code>
                          <span className="text-gray-400">List all students</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-800">
                          <code className="text-blue-400">POST /api/courses</code>
                          <span className="text-gray-400">Create new course</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-800">
                          <code className="text-yellow-400">PUT /api/grades/:id</code>
                          <span className="text-gray-400">Update grade</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-800">
                          <code className="text-red-400">DELETE /api/users/:id</code>
                          <span className="text-gray-400">Remove user</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Integrations */}
            <section id="integrations" data-section className="mb-16 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">🔗</span>
                  <h2 className="text-3xl font-bold">Integrations</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Connect with popular educational tools and services.
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: "Google Classroom", icon: "🎓", status: "Active" },
                      { name: "Microsoft Teams", icon: "💼", status: "Active" },
                      { name: "Zoom", icon: "📹", status: "Active" },
                      { name: "Canvas LMS", icon: "🎨", status: "Beta" },
                      { name: "Blackboard", icon: "⚫", status: "Coming Soon" },
                      { name: "Moodle", icon: "📚", status: "Active" }
                    ].map((integration, index) => (
                      <div key={index} className="glass-effect rounded-lg p-4 hover-lift">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{integration.icon}</span>
                            <span className="font-medium text-white">{integration.name}</span>
                          </div>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              integration.status === "Active"
                                ? "bg-green-600 text-white"
                                : integration.status === "Beta"
                                ? "bg-yellow-600 text-white"
                                : "bg-gray-600 text-white"
                            }`}
                          >
                            {integration.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" data-section className="mb-24 animate-on-scroll">
              <div className="glass-effect rounded-2xl p-8 hover-lift section-padding">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">🔍</span>
                  <h2 className="text-3xl font-bold">Troubleshooting</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg">
                    Encountered an issue? Here are some common problems and how to solve them.
                  </p>
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-semibold text-white">Problem: Cannot login</h4>
                      <p className="text-sm text-gray-400">Ensure your credentials are correct and the server is reachable.</p>
                    </li>
                    <li>
                      <h4 className="font-semibold text-white">Problem: API requests failing</h4>
                      <p className="text-sm text-gray-400">Check your API token and endpoint URL. Refer to the API Reference section above.</p>
                    </li>
                    <li>
                      <h4 className="font-semibold text-white">Problem: Dashboard not loading</h4>
                      <p className="text-sm text-gray-400">Try clearing browser cache or switching to incognito mode.</p>
                    </li>
                    <li>
                      <h4 className="font-semibold text-white">Problem: AI recommendations not showing</h4>
                      <p className="text-sm text-gray-400">Ensure AI features are enabled in your configuration and you have enough usage data.</p>
                    </li>
                  </ul>
                  <p className="text-gray-400 text-sm">
                    Still stuck? <Link href="/help" className="underline text-white hover:text-blue-400">Contact support</Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-gray-500 text-sm border-t border-gray-800 pt-8 pb-12">
              &copy; {new Date().getFullYear()} Schoolama AI LMS. All rights reserved.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}