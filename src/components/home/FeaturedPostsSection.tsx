
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Post } from "@/data/posts";
import FeaturedPostCard from "./FeaturedPostCard";

interface FeaturedPostsSectionProps {
  featuredPosts: Post[];
}

const FeaturedPostsSection = ({ featuredPosts }: FeaturedPostsSectionProps) => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-medium mb-12 text-center fade-in fade-in-1">Featured Posts</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <FeaturedPostCard key={post.id} post={post} delay={index} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" className="rounded-none dark:border-gray-700 dark:text-gray-200">
            <Link to="/blog" className="flex items-center gap-2">
              View All Posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPostsSection;
