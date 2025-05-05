import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Post } from "@/data/posts";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { seedPosts, getAllPostsFromFirebase } from "@/lib/firebaseUtils";

const Blog = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Seed posts if collection is empty
        await seedPosts();
        
        // Fetch all posts from Firebase
        const postsData = await getAllPostsFromFirebase();
        setPosts(postsData as Post[]);
        
        // Extract unique categories from posts
        const uniqueCategories = Array.from(
          new Set(postsData.map((post: any) => post.category))
        );
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24 fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {t("blog.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 font-serif">
            {t("blog.subtitle")}
          </p>
          
          {/* Search input */}
          <div className="flex mb-8">
            <input
              type="text"
              placeholder={t("blog.search")}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 transition-colors rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue={selectedCategory} onValueChange={handleCategoryChange} className="w-full mb-8">
            <TabsList className="w-full flex overflow-x-auto pb-2 bg-transparent justify-start md:justify-center gap-2 h-auto">
              {categories.map(category => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="px-4 py-2 whitespace-nowrap data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-md transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Blog Posts */}
        <div className="max-w-7xl mx-auto mt-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 fade-in">
              <h3 className="text-xl mb-2">{t("blog.no_posts")}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t("blog.adjust_search")}</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

const BlogPostCard = ({ post, index }: { post: Post; index: number }) => {
  const { t } = useLanguage();
  
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className={`group block fade-in fade-in-${Math.min(index + 1, 5)} hover-grow bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <div className="overflow-hidden aspect-[16/9]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex flex-wrap gap-3 items-center text-sm">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200">{post.category}</span>
          <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">{formatDate(post.date)}</time>
          <span className="text-gray-500 dark:text-gray-400">{post.readingTime}</span>
        </div>
        <h2 className="text-xl font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-serif line-clamp-2">{post.excerpt}</p>
        <div className="pt-2">
          <span className="hover-underline text-sm font-medium text-blue-600 dark:text-blue-400">{t("blog.read_more")}</span>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
