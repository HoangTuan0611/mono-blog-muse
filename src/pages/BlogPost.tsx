
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { getPostBySlug, getRelatedPosts } from "@/data/posts";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = getPostBySlug(slug || "");
  
  useEffect(() => {
    if (!post) {
      navigate("/blog");
    }
    
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  if (!post) return null;
  
  const relatedPosts = getRelatedPosts(post.id, post.category, 3);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Post URL has been copied to clipboard",
      });
    }
  };

  return (
    <MainLayout>
      <article className="pt-8 pb-16 md:pt-16 md:pb-24">
        {/* Back button */}
        <div className="container mx-auto px-4 sm:px-6 mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </Link>
        </div>
        
        {/* Post Header */}
        <header className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12">
          <div className="space-y-4 text-center animate-slide-up">
            <div className="flex justify-center gap-4 items-center text-sm">
              <span className="px-3 py-1 bg-gray-100">{post.category}</span>
              <time dateTime={post.date} className="text-gray-500">{formatDate(post.date)}</time>
              <span className="text-gray-500">{post.readingTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
              {post.excerpt}
            </p>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12">
          <div className="aspect-[16/9] overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
        
        {/* Post Content */}
        <div className="container mx-auto px-4 sm:px-6">
          <div 
            className="post-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          
          {/* Post Footer */}
          <div className="max-w-3xl mx-auto border-t border-b border-gray-200 py-6 my-12 flex justify-between items-center">
            <div className="text-sm">
              <p className="text-gray-500">Posted in</p>
              <Link to={`/blog?category=${post.category}`} className="font-medium hover-underline">
                {post.category}
              </Link>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="inline-flex items-center gap-2 rounded-full"
              onClick={handleShare}
            >
              <Share2 size={16} />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-16 mt-16">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-medium mb-8 text-center">Related Posts</h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.slug}`} 
                    className="group block"
                  >
                    <div className="overflow-hidden mb-4 aspect-[16/9]">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                      <time dateTime={relatedPost.date}>{formatDate(relatedPost.date)}</time>
                      <span>{relatedPost.readingTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </MainLayout>
  );
};

export default BlogPost;
