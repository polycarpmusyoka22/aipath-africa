import WhyChoose from "./components/home/WhyChoose";
import Pricing from "./components/home/Pricing";
import FAQ from "./components/home/FAQ";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import LogoCloud from "./components/home/LogoCloud";
import About from "./components/home/About";
import Services from "./components/home/Services";
import Jobs from "./components/home/Jobs";
import Testimonials from "./components/home/Testimonials";
import Contact from "./components/home/Contact";
import CTA from "./components/home/CTA";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-[#09090B] text-white overflow-x-hidden pt-20">
      <Navbar />

      <Hero />
      <LogoCloud />
      <About />
      <Services />
      <WhyChoose />
      <Jobs />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}