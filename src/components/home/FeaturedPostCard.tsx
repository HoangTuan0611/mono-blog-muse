
import { Link } from "react-router-dom";
import { Post } from "@/data/posts";
import { formatDate } from "@/lib/utils";

interface FeaturedPostCardProps {
  post: Post;
  delay?: number;
}

const FeaturedPostCard = ({ post, delay = 0 }: FeaturedPostCardProps) => (
  <Link to={`/blog/${post.slug}`} className={`group block fade-in fade-in-${delay + 1}`}>
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

export default FeaturedPostCard;
