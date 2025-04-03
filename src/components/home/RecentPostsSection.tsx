
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Post } from "@/data/posts";
import RecentPostCard from "./RecentPostCard";

interface RecentPostsSectionProps {
  recentPosts: Post[];
}

const RecentPostsSection = ({ recentPosts }: RecentPostsSectionProps) => {
  const [activePost, setActivePost] = useState<string | null>(null);
  
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-medium fade-in fade-in-1">Recent Posts</h2>
          <p className="text-gray-600 dark:text-gray-300 font-serif mt-2 fade-in fade-in-2">
            Latest articles from our blog
          </p>
        </div>
        <Link to="/blog" className="flex items-center gap-2 hover-underline">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {recentPosts.map((post, index) => (
          <RecentPostCard 
            key={post.id} 
            post={post} 
            delay={index} 
            isActive={activePost === post.id}
            onMouseEnter={() => setActivePost(post.id)}
            onMouseLeave={() => setActivePost(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentPostsSection;
