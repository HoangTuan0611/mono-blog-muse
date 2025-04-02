
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { getFeaturedPosts, getRecentPosts, Post } from "@/data/posts";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { certifications } from "@/data/certifications";
import { videos } from "@/data/videos";
import { travelPosts } from "@/data/travel";

const Index = () => {
  const { t } = useLanguage();
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(4);
  const recentCertifications = certifications.slice(0, 3);
  const featuredVideos = videos.slice(0, 3);
  const recentTravelPosts = travelPosts.slice(0, 3);
  const [animatedElements, setAnimatedElements] = useState<NodeListOf<Element> | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    setAnimatedElements(elements);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (animatedElements) {
        animatedElements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Thoughts on minimalism, design, and life.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-serif">
            A personal blog exploring the beauty of simplicity and intentional design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-none px-8 py-6 text-base">
              <Link to="/blog">Read the Blog</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none px-8 py-6 text-base">
              <Link to="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-medium mb-12 text-center animate-on-scroll">Featured Posts</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline" className="rounded-none">
              <Link to="/blog" className="flex items-center gap-2">
                View All Posts <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-medium animate-on-scroll">Recent Posts</h2>
          <Link to="/blog" className="flex items-center gap-2 hover-underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {recentPosts.map((post) => (
            <RecentPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-medium animate-on-scroll">{t("certifications.title")}</h2>
            <Link to="/certifications" className="flex items-center gap-2 text-white hover-underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentCertifications.map((cert) => (
              <div 
                key={cert.id} 
                className="border border-gray-800 p-6 hover:bg-white/5 transition-colors animate-on-scroll"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium">{cert.name}</h3>
                  <span className="px-3 py-1 bg-white/10 text-sm">{cert.category}</span>
                </div>
                <p className="text-gray-400 mb-4 font-serif">{cert.issuer}</p>
                <Link 
                  to="/certifications" 
                  className="inline-block mt-4 text-sm hover-underline"
                >
                  {t("certifications.view_credential")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-medium animate-on-scroll">{t("videos.title")}</h2>
          <Link to="/videos" className="flex items-center gap-2 hover-underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredVideos.map((video) => (
            <div key={video.id} className="group animate-on-scroll">
              <div className="aspect-video relative overflow-hidden">
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
      </section>

      {/* Travel Section */}
      <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-medium animate-on-scroll">{t("travel.title")}</h2>
            <Link to="/travel" className="flex items-center gap-2 hover-underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentTravelPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/travel/${post.slug}`} 
                className="group block animate-on-scroll"
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
                    <span className="px-3 py-1 bg-gray-200 text-sm">{post.region}</span>
                    <time dateTime={post.date} className="text-sm text-gray-500">
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2 font-serif line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-16 md:py-24 animate-on-scroll">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Subscribe to the newsletter</h2>
            <p className="text-gray-300 mb-8 font-serif text-lg">
              Get notified about new posts and updates. No spam, unsubscribe anytime.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500 rounded-none"
                required
              />
              <Button type="submit" className="rounded-none px-6 font-medium">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

const FeaturedPostCard = ({ post }: { post: Post }) => (
  <Link to={`/blog/${post.slug}`} className="group block animate-on-scroll">
    <div className="overflow-hidden mb-4 aspect-[16/9]">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wider text-gray-500">{post.category}</span>
      <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2">{post.title}</h3>
      <p className="text-gray-600 line-clamp-2 font-serif">{post.excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime}</span>
      </div>
    </div>
  </Link>
);

const RecentPostCard = ({ post }: { post: Post }) => (
  <Link to={`/blog/${post.slug}`} className="group flex flex-col md:flex-row gap-6 animate-on-scroll">
    <div className="md:w-1/3 overflow-hidden aspect-[4/3] md:aspect-square">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="md:w-2/3 space-y-2">
      <span className="text-xs uppercase tracking-wider text-gray-500">{post.category}</span>
      <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2">{post.title}</h3>
      <p className="text-gray-600 line-clamp-2 font-serif">{post.excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime}</span>
      </div>
    </div>
  </Link>
);

export default Index;
