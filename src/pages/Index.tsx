
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { getFeaturedPosts, getRecentPosts, Post } from "@/data/posts";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const Index = () => {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(4);
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
