import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFeaturedTravelPosts } from "@/data/travel";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFeaturedTravelPostsFromFirebase } from "@/lib/firebaseUtils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

// Define the TravelPost interface
interface TravelPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  region: string;
  location: string;
}

const TravelSection = () => {
  const { t } = useLanguage();
  const [featuredPosts, setFeaturedPosts] = useState<TravelPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedTravelPosts = async () => {
      try {
        setLoading(true);
        // Fetch featured travel posts from Firebase
        const travelPostsData = await getFeaturedTravelPostsFromFirebase() as TravelPost[];
        setFeaturedPosts(travelPostsData);
      } catch (error) {
        console.error("Error fetching featured travel posts:", error);
        // Fallback to static data if Firebase fetch fails
        const staticPosts = getFeaturedTravelPosts();
        setFeaturedPosts(staticPosts);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedTravelPosts();
  }, []);

  if (featuredPosts.length === 0 && !loading) return null;

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            {t("travel.title")}
          </h2>
          <p className="text-lg text-gray-600 font-serif">
            {t("travel.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="w-full h-64" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          ) : (
            featuredPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/travel/${post.slug}`}
                className={`group block fade-in fade-in-${Math.min(index + 1, 3)}`}
              >
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-sm">
                      {post.region}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 font-serif line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            variant="outline"
            className="rounded-none dark:border-gray-700 dark:text-gray-200"
          >
            <Link to="/travel" className="flex items-center gap-2">
              View All Posts <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelSection;
