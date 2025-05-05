import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { travelPosts } from "@/data/travel";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllTravelPostsFromFirebase, seedTravelPosts } from "@/lib/firebaseUtils";
import { Skeleton } from "@/components/ui/skeleton";

// Define the TravelPost interface
interface TravelPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  region: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  featured?: boolean;
}

const Travel = () => {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<TravelPost[]>([]);
  const [regions, setRegions] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelPosts = async () => {
      try {
        setLoading(true);
        // Seed travel posts if the collection is empty
        await seedTravelPosts();
        
        // Get all travel posts from Firebase
        const travelPostsData = await getAllTravelPostsFromFirebase() as TravelPost[];
        setPosts(travelPostsData);
        
        // Extract unique regions for filtering
        const uniqueRegions = ["All", ...new Set(travelPostsData.map(post => post.region))];
        setRegions(uniqueRegions);
      } catch (error) {
        console.error("Error fetching travel posts:", error);
        // Fallback to static data if Firebase fetch fails
        setPosts(travelPosts);
        setRegions(["All", ...new Set(travelPosts.map(post => post.region))]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTravelPosts();
  }, []);
  
  const filteredPosts = posts.filter(post => {
    const matchesRegion = selectedRegion === "All" || post.region === selectedRegion;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {t("travel.title")}
          </h1>
          <p className="text-xl text-gray-600 mb-12 font-serif">
            {t("travel.subtitle")}
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <input
              type="text"
              placeholder={t("blog.search")}
              className="flex-1 px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors rounded-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 md:gap-4 pb-2">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 whitespace-nowrap ${
                    selectedRegion === region
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  } transition-colors`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Posts Grid */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            // Loading skeletons
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="w-full h-64" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link 
                  key={post.id}
                  to={`/travel/${post.slug}`} 
                  className={`group block fade-in hover-grow fade-in-${Math.min(index + 1, 5)}`}
                >
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-3 items-center mb-2">
                      <span className="px-3 py-1 bg-gray-100 text-sm">{post.region}</span>
                      <time dateTime={post.date} className="text-sm text-gray-500">
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <h2 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mt-2 font-serif line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl mb-2">{t("blog.no_posts")}</h3>
              <p className="text-gray-600">{t("blog.adjust_search")}</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Travel;
