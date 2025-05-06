import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Post } from "@/data/posts";
import FeaturedPostCard from "./FeaturedPostCard";
import { getFeaturedPostsFromFirebase } from "@/lib/firebaseUtils";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedPostsSection = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        // Fetch featured posts from Firebase
        const postsData = (await getFeaturedPostsFromFirebase()) as Post[];
        setFeaturedPosts(postsData);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
        // No fallback needed as the Posts will be loaded in parent component
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24 fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-medium mb-12 text-center">
          Featured Posts
        </h2>

        {loading ? (
          // Loading skeletons for featured posts
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <FeaturedPostCard key={post.id} post={post} delay={index} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button
            asChild
            variant="outline"
            className="rounded-none dark:border-gray-700 dark:text-gray-200"
          >
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
