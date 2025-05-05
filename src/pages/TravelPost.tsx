import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { getTravelPostBySlug, getRelatedTravelPosts, TravelPost } from "@/data/travel";
import { ArrowLeft, Share2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTravelPostBySlugFromFirebase, getRelatedTravelPostsFromFirebase } from "@/lib/firebaseUtils";
import { Skeleton } from "@/components/ui/skeleton";

const TravelPostPage = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<TravelPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<TravelPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        if (!slug) {
          navigate("/travel");
          return;
        }
        
        // Fetch post from Firebase
        const postData = await getTravelPostBySlugFromFirebase(slug) as TravelPost | null;
        
        if (!postData) {
          // Fallback to static data if not found in Firebase
          const staticPost = getTravelPostBySlug(slug);
          if (!staticPost) {
            navigate("/travel");
            return;
          }
          setPost(staticPost);
          
          // Get related posts from static data
          const staticRelatedPosts = getRelatedTravelPosts(staticPost.id, staticPost.region, 3);
          setRelatedPosts(staticRelatedPosts);
        } else {
          setPost(postData);
          
          // Fetch related posts
          const relatedPostsData = await getRelatedTravelPostsFromFirebase(postData.id, postData.region, 3) as TravelPost[];
          setRelatedPosts(relatedPostsData);
        }
      } catch (error) {
        console.error("Error fetching travel post:", error);
        navigate("/travel");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostData();
    // Scroll to top when post loads
    window.scrollTo(0, 0);
  }, [slug, navigate]);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || "",
          text: post?.excerpt || "",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t("common.copied"),
        description: "Post URL has been copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-12" />
            <Skeleton className="w-full aspect-[16/9] mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) return null;

  return (
    <MainLayout>
      <article className="pt-8 pb-16 md:pt-16 md:pb-24">
        {/* Back button */}
        <div className="container mx-auto px-4 sm:px-6 mb-8">
          <Link 
            to="/travel" 
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>{t("common.back")} to Travel</span>
          </Link>
        </div>
        
        {/* Post Header */}
        <header className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12">
          <div className="space-y-4 text-center animate-slide-up">
            <div className="flex justify-center gap-4 items-center text-sm">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100">
                <MapPin size={14} />
                {post.region}
              </span>
              <time dateTime={post.date} className="text-gray-500">{formatDate(post.date)}</time>
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
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl mb-12">
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
              <p className="text-gray-500">{t("common.posted_in")}</p>
              <Link to={`/travel?region=${post.region}`} className="font-medium hover-underline">
                {post.region}
              </Link>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="inline-flex items-center gap-2 rounded-full"
              onClick={handleShare}
            >
              <Share2 size={16} />
              <span>{t("common.share")}</span>
            </Button>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-100 py-16 mt-16">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-medium mb-8 text-center">
                {t("common.related")} Travel Stories
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/travel/${relatedPost.slug}`} 
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
                      <span>{relatedPost.region}</span>
                      <time dateTime={relatedPost.date}>{formatDate(relatedPost.date)}</time>
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

export default TravelPostPage;
