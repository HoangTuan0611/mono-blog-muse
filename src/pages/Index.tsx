
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { getFeaturedPosts, getRecentPosts, Post } from "@/data/posts";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { certifications } from "@/data/certifications";
import { videos } from "@/data/videos";
import { travelPosts } from "@/data/travel";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

const Index = () => {
  const { t } = useLanguage();
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(6);
  const recentCertifications = certifications.slice(0, 3);
  const featuredVideos = videos.slice(0, 3);
  const recentTravelPosts = travelPosts.slice(0, 3);
  const [animatedElements, setAnimatedElements] = useState<NodeListOf<Element> | null>(null);
  const [activePost, setActivePost] = useState<string | null>(null);
  const trendingScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    setAnimatedElements(elements);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a small delay based on the index for a sequential animation
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (animatedElements) {
        animatedElements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  // Handle trending section navigation
  const handlePrevSlide = () => {
    if (trendingScrollRef.current) {
      const scrollContainer = trendingScrollRef.current;
      const cardWidth = 280; // Average width of a card including gap
      scrollContainer.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    }
  };

  const handleNextSlide = () => {
    if (trendingScrollRef.current) {
      const scrollContainer = trendingScrollRef.current;
      const cardWidth = 280; // Average width of a card including gap
      scrollContainer.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    }
  };

  return (
    <MainLayout 
      title="Minimalist Blog - Thoughts on design, life, and technology"
      description="Explore minimalism, design, and intentional living through our collection of articles, videos, and resources."
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Thoughts on minimalism, design, and life.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-serif">
            A personal blog exploring the beauty of simplicity and intentional design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-none px-8 py-6 text-base">
              <Link to="/blog">Read the Blog</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-none px-8 py-6 text-base dark:border-gray-700 dark:text-gray-200">
              <Link to="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Topics Section - New UI */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-medium mb-2 animate-on-scroll">Trending this month</h2>
              <p className="text-gray-600 dark:text-gray-300 font-serif animate-on-scroll" style={{ '--delay': 1 } as React.CSSProperties}>
                Popular topics our readers are exploring right now
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button 
                id="prev-slide" 
                className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={handlePrevSlide}
                aria-label="Previous topics"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                id="next-slide" 
                className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={handleNextSlide}
                aria-label="Next topics"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              ref={trendingScrollRef}
              className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {/* Trending Topics Cards based on the provided image */}
              <div className="trending-card min-w-[200px] w-[220px] flex-shrink-0 flex items-center justify-center p-8 text-white snap-start animate-on-scroll" style={{ '--delay': 2 } as React.CSSProperties}>
                <div className="text-center">
                  <div className="mb-4 inline-block bg-white/20 p-3 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trending this month</h3>
                </div>
              </div>
              
              {/* Data Preprocessing */}
              <div className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start animate-on-scroll" style={{ '--delay': 3 } as React.CSSProperties}>
                <h3 className="text-lg font-medium mb-2">Data Preprocessing | Các phương pháp tiền xử lí dữ liệu</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">(Đang cập nhật)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag tag-database">#DATABASE</span>
                  <span className="tag tag-datamesh">#DATAMESH</span>
                  <span className="tag tag-preprocessing">#PREPROCESSING</span>
                </div>
                <div className="flex items-center mt-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Author avatar" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">hangtuanthiendi</span>
                </div>
              </div>
              
              {/* Database Languages */}
              <div className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start animate-on-scroll" style={{ '--delay': 4 } as React.CSSProperties}>
                <h3 className="text-lg font-medium mb-2">Database Languages and Entity Relationship</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">10</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag tag-database">#DATABASE</span>
                  <span className="tag tag-datamesh">#DATAMESH</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-8 h-8 rounded-full mr-2 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                    MT
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Minh Trí</span>
                </div>
              </div>
              
              {/* DataMesh */}
              <div className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start animate-on-scroll" style={{ '--delay': 5 } as React.CSSProperties}>
                <h3 className="text-lg font-medium mb-2">DataMesh: Những điều cơ bản nhất bạn cần biết</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">(Updating)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag tag-database">#DATABASE</span>
                  <span className="tag tag-datamesh">#DATAMESH</span>
                </div>
                <div className="flex items-center mt-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Author avatar" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">hangtuanthiendi</span>
                </div>
              </div>
              
              {/* MongoDB Aggregation - Active/Highlighted Card */}
              <div className="topic-card active min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start animate-on-scroll" style={{ '--delay': 6 } as React.CSSProperties}>
                <h3 className="text-lg font-medium mb-2">MongoDB Aggregation</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag tag-certification">#CERTIFICATION</span>
                </div>
                <div className="flex items-center mt-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Author avatar" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">hangtuanthiendi</span>
                </div>
              </div>
              
              {/* Postgres Repository */}
              <div className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start animate-on-scroll" style={{ '--delay': 7 } as React.CSSProperties}>
                <h3 className="text-lg font-medium mb-2">Postgres Repository</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag tag-certification">#CERTIFICATION</span>
                </div>
                <div className="flex items-center mt-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Author avatar" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">hangtuanthiendi</span>
                </div>
              </div>
              
              {/* Campaign manager */}
              <div className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start animate-on-scroll" style={{ '--delay': 8 } as React.CSSProperties}>
                <h3 className="text-lg font-medium mb-2">Campaign manager 360 Certification Exam</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tag tag-certification">#CERTIFICATION</span>
                </div>
                <div className="flex items-center mt-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Author avatar" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">hangtuanthiendi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-medium mb-12 text-center animate-on-scroll">Featured Posts</h2>
          
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

      {/* Recent Posts */}
      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-medium animate-on-scroll">Recent Posts</h2>
            <p className="text-gray-600 dark:text-gray-300 font-serif mt-2 animate-on-scroll" style={{ '--delay': 1 } as React.CSSProperties}>
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

      {/* Certifications Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-medium animate-on-scroll">{t("certifications.title")}</h2>
              <p className="text-gray-300 font-serif mt-2 animate-on-scroll" style={{ '--delay': 1 } as React.CSSProperties}>
                Professional qualifications and achievements
              </p>
            </div>
            <Link to="/certifications" className="flex items-center gap-2 text-white hover-underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentCertifications.map((cert, index) => (
              <div 
                key={cert.id} 
                className="border border-gray-800 p-6 hover:bg-white/5 transition-colors animate-on-scroll"
                style={{ '--delay': index + 2 } as React.CSSProperties}
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
          <div>
            <h2 className="text-3xl font-medium animate-on-scroll">{t("videos.title")}</h2>
            <p className="text-gray-600 dark:text-gray-300 font-serif mt-2 animate-on-scroll" style={{ '--delay': 1 } as React.CSSProperties}>
              Educational content and tutorials
            </p>
          </div>
          <Link to="/videos" className="flex items-center gap-2 hover-underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredVideos.map((video, index) => (
            <div key={video.id} className="group animate-on-scroll" style={{ '--delay': index + 2 } as React.CSSProperties}>
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
      </section>

      {/* Travel Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-medium animate-on-scroll">{t("travel.title")}</h2>
              <p className="text-gray-600 dark:text-gray-300 font-serif mt-2 animate-on-scroll" style={{ '--delay': 1 } as React.CSSProperties}>
                Adventures and explorations around the world
              </p>
            </div>
            <Link to="/travel" className="flex items-center gap-2 hover-underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {recentTravelPosts.map((post, index) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link 
                    to={`/travel/${post.slug}`} 
                    className="group block animate-on-scroll h-full"
                    style={{ '--delay': index + 2 } as React.CSSProperties}
                  >
                    <Card className="border-0 shadow-md h-full dark:bg-gray-700">
                      <CardContent className="p-0">
                        <div className="overflow-hidden aspect-[4/3]">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex gap-3 items-center mb-2">
                            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-sm">{post.region}</span>
                            <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(post.date)}
                            </time>
                          </div>
                          <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mt-2 font-serif line-clamp-2">{post.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
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

const FeaturedPostCard = ({ post, delay = 0 }: { post: Post; delay?: number }) => (
  <Link to={`/blog/${post.slug}`} className="group block animate-on-scroll" style={{ '--delay': delay + 2 } as React.CSSProperties}>
    <div className="overflow-hidden mb-4 aspect-[16/9] rounded-lg">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{post.category}</span>
      <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-2">{post.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 font-serif">{post.excerpt}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime}</span>
      </div>
    </div>
  </Link>
);

interface RecentPostCardProps {
  post: Post;
  delay?: number;
  isActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const RecentPostCard = ({ post, delay = 0, isActive = false, onMouseEnter, onMouseLeave }: RecentPostCardProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link 
        to={`/blog/${post.slug}`} 
        className={cn(
          "group block animate-on-scroll transition-all duration-300",
          isActive ? "scale-[1.02] shadow-lg" : ""
        )} 
        style={{ '--delay': delay + 2 } as React.CSSProperties}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="overflow-hidden rounded-lg">
          <img
            src={post.coverImage}
            alt={post.title}
            className={cn(
              "w-full aspect-[16/9] object-cover transition-transform duration-500",
              isActive ? "scale-105" : "group-hover:scale-105"
            )}
          />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex gap-3 items-center">
            <span className={cn(
              "text-xs uppercase tracking-wider px-2 py-1 rounded",
              post.category === "MongoDB" 
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" 
                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            )}>{post.category}</span>
            <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.date)}
            </time>
          </div>
          <h3 className={cn(
            "text-lg font-medium transition-colors duration-300",
            isActive 
              ? "text-blue-600 dark:text-blue-400" 
              : "group-hover:text-blue-600 dark:group-hover:text-blue-400"
          )}>
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-2 font-serif">{post.excerpt}</p>
        </div>
      </Link>
    </HoverCardTrigger>
    <HoverCardContent className="w-80 p-0 overflow-hidden">
      <div className="p-4 pt-0 mt-3">
        <h4 className="font-medium">{post.title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default Index;
