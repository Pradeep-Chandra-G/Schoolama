// app/portfolio/page.tsx
"use client";

import { useEffect } from "react";
import Cursor from "./_components/cursor/Cursor";
import Contact from "./_components/contact/Contact";
import Hero from "./_components/hero/Hero";
import Navbar from "./_components/navbar/Navbar";
import Parallax from "./_components/parallax/Parallax";
import Portfolio from "./_components/portfolio/Portfolio";
import Services from "./_components/services/Services";

const PortfolioPage = () => {
  useEffect(() => {
    // Add the data attribute to body when component mounts
    document.body.setAttribute('data-page', 'portfolio');
    
    // Clean up when component unmounts
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);

  return (
    <div>
      <Cursor />
      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>
      <section id="Services">
        <Parallax type="services" />
      </section>
      <section>
        <Services />
      </section>
      <section id="Portfolio">
        <Parallax type="portfolio" />
      </section>
      <Portfolio />
      <section id="Contact">
        <Contact />
      </section>
    </div>
  );
};

export default PortfolioPage;