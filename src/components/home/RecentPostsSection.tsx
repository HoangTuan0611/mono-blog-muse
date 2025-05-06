import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Post } from "@/data/posts";
import RecentPostCard from "./RecentPostCard";
import { getRecentPostsFromFirebase } from "@/lib/firebaseUtils";
import { Skeleton } from "@/components/ui/skeleton";

const RecentPostsSection = () => {
  const [activePost, setActivePost] = useState<string | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        // Fetch recent posts from Firebase, limit to 6
        const postsData = await getRecentPostsFromFirebase(6) as Post[];
        setRecentPosts(postsData);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
        // No fallback needed as Posts will be handled by the parent component
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentPosts();
  }, []);
  
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 fade-in">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-medium">Recent Posts</h2>
          <p className="text-gray-600 dark:text-gray-300 font-serif mt-2">
            Latest articles from our blog
          </p>
        </div>
        <Link to="/blog" className="!flex items-center gap-2 hover-underline">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      
      {loading ? (
        // Loading skeletons for recent posts
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default RecentPostsSection;
