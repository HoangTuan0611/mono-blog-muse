
import { Link } from "react-router-dom";
import { Post } from "@/data/posts";
import { formatDate, cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
          `group block fade-in fade-in-${delay + 1} transition-all duration-300`,
          isActive ? "scale-[1.02] shadow-lg" : ""
        )}
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

export default RecentPostCard;
