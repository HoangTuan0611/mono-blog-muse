
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { videos } from "@/data/videos";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Videos = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const categories = ["All", ...new Set(videos.map(vid => vid.category))];
  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(vid => vid.category === selectedCategory);

  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {t("videos.title")}
          </h1>
          <p className="text-xl text-gray-600 mb-12 font-serif">
            {t("videos.subtitle")}
          </p>
          
          {/* Category Filter */}
          <div className="flex justify-center gap-2 flex-wrap mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <div 
                key={video.id} 
                className={`fade-in hover-grow fade-in-${Math.min(index + 1, 5)}`}
                onClick={() => setSelectedVideo(video.videoId)}
              >
                <div className="aspect-video relative overflow-hidden group cursor-pointer">
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
                <p className="text-gray-500 text-sm mt-1">{video.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo ? `https://www.youtube.com/embed/${selectedVideo}?autoplay=1` : ""}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </MainLayout>
  );
};

export default Videos;
