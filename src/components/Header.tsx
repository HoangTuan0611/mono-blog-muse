
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.certifications"), path: "/certifications" },
    { name: t("nav.videos"), path: "/videos" },
    { name: t("nav.travel"), path: "/travel" },
    { name: t("nav.about"), path: "/about" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tighter hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          Minimalist
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover-underline text-sm uppercase tracking-wide"
            >
              {link.name}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <Globe size={16} />
              <span className="text-sm uppercase tracking-wide">{language.toUpperCase()}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('fr')}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')}>Español</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col md:hidden py-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="py-3 px-6 hover:bg-gray-100 transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button 
                className="py-3 px-6 hover:bg-gray-100 transition-colors w-full text-left" 
                onClick={() => {setLanguage('en'); closeMenu();}}
              >
                English
              </button>
              <button 
                className="py-3 px-6 hover:bg-gray-100 transition-colors w-full text-left" 
                onClick={() => {setLanguage('fr'); closeMenu();}}
              >
                Français
              </button>
              <button 
                className="py-3 px-6 hover:bg-gray-100 transition-colors w-full text-left" 
                onClick={() => {setLanguage('es'); closeMenu();}}
              >
                Español
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
