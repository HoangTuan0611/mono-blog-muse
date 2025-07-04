import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Video } from "@/data/videos";
import { useLanguage } from "@/contexts/LanguageContext";
import { getRecentVideosFromFirebase } from "@/lib/firebaseUtils";
import { Skeleton } from "@/components/ui/skeleton";

const VideosSection = () => {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Fetch recent videos from Firebase, limit to 3
        const videosData = await getRecentVideosFromFirebase(3) as Video[];
        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching videos:", error);
        // No fallback needed as this will be handled by the parent component
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-medium fade-in fade-in-1">{t("videos.title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 font-serif mt-2 fade-in fade-in-2">
            Educational content and tutorials
          </p>
        </div>
        <Link to="/videos" className="!flex items-center gap-2 hover-underline">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      
      {loading ? (
        // Loading skeletons for videos
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="w-full aspect-video rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={video.id} className={`group fade-in hover-grow fade-in-${index + 3}`}>
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-black/70 flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-medium">{video.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{video.duration}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default VideosSection;
