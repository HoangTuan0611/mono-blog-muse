
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-8xl md:text-9xl font-medium mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-serif">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
