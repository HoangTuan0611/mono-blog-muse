
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { posts, Post } from "@/data/posts";
import { formatDate } from "@/lib/utils";

const CATEGORIES = ["All", ...Array.from(new Set(posts.map(post => post.category)))];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            The Blog
          </h1>
          <p className="text-xl text-gray-600 mb-12 font-serif">
            Thoughts, ideas, and insights on minimalism, design, and creativity.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <input
              type="text"
              placeholder="Search posts..."
              className="flex-1 px-4 py-3 border border-gray-200 focus:outline-none focus:border-black transition-colors rounded-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 md:gap-4 pb-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 whitespace-nowrap ${
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
        </div>

        {/* Blog Posts */}
        <div className="max-w-5xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid gap-12">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl mb-2">No posts found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

const BlogPostCard = ({ post }: { post: Post }) => (
  <Link to={`/blog/${post.slug}`} className="group grid md:grid-cols-5 gap-8 animate-on-scroll">
    <div className="md:col-span-2 overflow-hidden aspect-[4/3]">
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="md:col-span-3 space-y-3">
      <div className="flex flex-wrap gap-4 items-center text-sm">
        <span className="px-3 py-1 bg-gray-100">{post.category}</span>
        <time dateTime={post.date} className="text-gray-500">{formatDate(post.date)}</time>
        <span className="text-gray-500">{post.readingTime}</span>
      </div>
      <h2 className="text-2xl font-medium group-hover:underline decoration-1 underline-offset-2">
        {post.title}
      </h2>
      <p className="text-gray-600 font-serif">{post.excerpt}</p>
      <div className="pt-2">
        <span className="hover-underline text-sm font-medium">Read more</span>
      </div>
    </div>
  </Link>
);

export default Blog;
