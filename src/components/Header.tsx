
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Search, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, setLanguage, t, theme, toggleTheme } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: 'CV', path: "http://portfolio.tuannguyenhoang.com/" },
    { name: t("nav.certifications"), path: "/certifications" },
    // { name: t("nav.videos"), path: "/videos" },
    // { name: t("nav.travel"), path: "/travel" },
    // { name: t("nav.about"), path: "/about" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90 dark:shadow-gray-800/20" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tighter hover:opacity-80 transition-opacity"
          onClick={closeMenu}
        >
          NHT
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

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Search Button */}
            <button 
              onClick={toggleSearch} 
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <Globe size={16} />
                <span className="text-sm uppercase tracking-wide">{language.toUpperCase()}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => setLanguage('fr')}>Français</DropdownMenuItem> */}
                {/* <DropdownMenuItem onClick={() => setLanguage('es')}>Español</DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => setLanguage('vi')}>Tiếng Việt</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Theme Toggle (Mobile) */}
          <button 
            onClick={toggleTheme} 
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          {/* Search Button (Mobile) */}
          <button 
            onClick={toggleSearch} 
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          
          <button
            className="p-2"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/20 flex flex-col md:hidden py-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
              <button 
                className="py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left flex items-center gap-2" 
                onClick={() => {setLanguage('en'); closeMenu();}}
              >
                <Globe size={16} /> English
              </button>
              <button 
                className="py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left flex items-center gap-2" 
                onClick={() => {setLanguage('fr'); closeMenu();}}
              >
                <Globe size={16} /> Français
              </button>
              <button 
                className="py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left flex items-center gap-2" 
                onClick={() => {setLanguage('es'); closeMenu();}}
              >
                <Globe size={16} /> Español
              </button>
              <button 
                className="py-3 px-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left flex items-center gap-2" 
                onClick={() => {setLanguage('vi'); closeMenu();}}
              >
                <Globe size={16} /> Tiếng Việt
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md p-4 animate-fade-in">
          <form className="max-w-2xl mx-auto flex">
            <input
              type="text"
              placeholder={t("blog.search")}
              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-black dark:focus:border-gray-300 transition-colors bg-white dark:bg-gray-800 text-black dark:text-white"
            />
            <button 
              type="submit" 
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
