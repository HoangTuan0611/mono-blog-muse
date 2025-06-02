import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-16 border-t border-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 text-sm">
          <div>
            <h2 className="font-medium text-xl mb-4">NHT</h2>
            <p className="text-gray-500 max-w-md">
              A fullstack developer sharing thoughts on design, life, and technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="uppercase text-xs tracking-wider text-gray-500 mb-4 font-sans">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover-underline">
                    {t("nav.home")}
                  </Link>
                </li>
                <li>
                  <Link to="http://portfolio.tuannguyenhoang.com/" className="hover-underline">
                    CV
                  </Link>
                </li>
                <li>
                  <Link to="/certifications" className="hover-underline">
                    {t("nav.certifications")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/videos" className="hover-underline">
                    {t("nav.videos")}
                  </Link>
                </li>
                <li>
                  <Link to="/travel" className="hover-underline">
                    {t("nav.travel")}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover-underline">
                    {t("nav.about")}
                  </Link>
                </li> */}
              </ul>
            </div>

            <div>
              <h3 className="uppercase text-xs tracking-wider text-gray-500 mb-4 font-sans">
                Follow
              </h3>
              <ul className="space-y-2">
                {/* <li><a href="#" className="hover-underline">Twitter</a></li> */}
                {/* <li><a href="#" className="hover-underline">Instagram</a></li> */}
                {/* <li><a href="#" className="hover-underline">Github</a></li> */}
                <li>
                  <a
                    href="https://www.facebook.com/nguyen.hoang.tuan.218850/"
                    className="hover-underline"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/hoangtuan99/"
                    className="hover-underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} NHT. All rights reserved.
          </p>
          {/* <div className="text-sm text-gray-500 space-x-6">
            <a href="#" className="hover-underline">
              Privacy Policy
            </a>
            <a href="#" className="hover-underline">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
