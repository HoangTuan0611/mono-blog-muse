
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 text-sm">
          <div>
            <h2 className="font-medium text-xl mb-4">Minimalist</h2>
            <p className="text-gray-500 max-w-md">
              A personal blog where I share my thoughts on design, technology, and life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="uppercase text-xs tracking-wider text-gray-500 mb-4 font-sans">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover-underline">Home</Link></li>
                <li><Link to="/blog" className="hover-underline">Blog</Link></li>
                <li><Link to="/about" className="hover-underline">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="uppercase text-xs tracking-wider text-gray-500 mb-4 font-sans">Follow</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover-underline">Twitter</a></li>
                <li><a href="#" className="hover-underline">Instagram</a></li>
                <li><a href="#" className="hover-underline">Github</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Minimalist. All rights reserved.
          </p>
          <div className="text-sm text-gray-500 space-x-6">
            <a href="#" className="hover-underline">Privacy Policy</a>
            <a href="#" className="hover-underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
