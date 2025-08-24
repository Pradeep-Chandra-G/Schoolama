// app/portfolio/page.tsx
"use client";

import Cursor from "./_components/cursor/Cursor";
import Contact from "./_components/contact/Contact";
import Hero from "./_components/hero/Hero";
import Navbar from "./_components/navbar/Navbar";
import Parallax from "./_components/parallax/Parallax";
import Portfolio from "./_components/portfolio/Portfolio";
import Services from "./_components/services/Services";

const PortfolioPage = () => {
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