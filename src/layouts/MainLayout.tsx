
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const MainLayout = ({ children, title, description }: MainLayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Optimize the animation by observing elements only when they're in viewport
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once the animation is triggered, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (elements) {
        elements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Header />
      <main className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 bg-black dark:bg-white text-white dark:text-black rounded-full p-2 shadow-lg hover:bg-gray-800 dark:hover:bg-gray-300 transition-all duration-300 z-50",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default MainLayout;
