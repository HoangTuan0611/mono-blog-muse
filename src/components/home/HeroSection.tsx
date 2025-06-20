
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-4xl mx-auto text-center animate-slide-up">
        {/* <h5 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
          Tuan Nguyen Hoang
        </h5> */}
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-serif">
          Fullstack flows, minimal moves
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* <Button asChild className="rounded-none px-8 py-6 text-base">
            <Link to="/blog">Read the Blog</Link>
          </Button> */}
          <Button asChild variant="outline" className="rounded-none px-8 py-6 text-base dark:border-gray-700 dark:text-gray-200">
            <Link to="http://portfolio.tuannguyenhoang.com/">About Me</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
