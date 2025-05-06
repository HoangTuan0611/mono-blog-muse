import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define the TrendingTopic interface
interface TrendingTopic {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  author: string;
  avatar?: string;
  active?: boolean;
}

const TrendingTopicsSection = () => {
  const trendingScrollRef = useRef<HTMLDivElement>(null);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      const topicsCollection = collection(db, "trending-topics");
      try {
        setLoading(true);

        // Fetch trending topics from Firebase 'trending-topics' collection
        const topicsCollection = collection(db, "trending-topics");
        // You could add where("trending", "==", true) if you have a trending flag
        // const q = query(topicsCollection, orderBy("updatedAt", "desc"), limit(8));
        const querySnapshot = await getDocs(topicsCollection);

        if (!querySnapshot.empty) {
          const topicsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TrendingTopic[];

          setTrendingTopics(topicsData);
        } else {
          // Fallback to hardcoded data if no trending topics found
          const batch = writeBatch(db);

          // Add each certification to the batch
          getDefaultTrendingTopics().forEach((certification) => {
            // Remove the id from the data as Firestore will generate its own
            const { id, ...trendingTopicData } = certification;
            const docRef = doc(topicsCollection);
            batch.set(docRef, trendingTopicData);
          });

          // Commit the batch
          await batch.commit();
          // setTrendingTopics(getDefaultTrendingTopics());
        }
      } catch (error) {
        console.error("Error fetching trending topics:", error);
        // Fallback to hardcoded data if Firebase fetch fails
        // setTrendingTopics(getDefaultTrendingTopics());
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
  }, []);

  // Handle trending section navigation
  const handlePrevSlide = () => {
    if (trendingScrollRef.current) {
      const scrollContainer = trendingScrollRef.current;
      const cardWidth = 280; // Average width of a card including gap
      scrollContainer.scrollBy({ left: -cardWidth * 2, behavior: "smooth" });
    }
  };

  const handleNextSlide = () => {
    if (trendingScrollRef.current) {
      const scrollContainer = trendingScrollRef.current;
      const cardWidth = 280; // Average width of a card including gap
      scrollContainer.scrollBy({ left: cardWidth * 2, behavior: "smooth" });
    }
  };

  // Helper function to get initials from author name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 visible">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-medium mb-2">Trending this month</h2>
            <p className="text-gray-600 dark:text-gray-300 font-serif">
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

        <div className="relative overflow-visible">
          <div
            ref={trendingScrollRef}
            className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {/* Trending Topics Header Card */}
            <div className="trending-card min-w-[200px] w-[220px] flex-shrink-0 flex items-center justify-center p-8 text-white snap-start">
              <div className="text-center">
                <div className="mb-4 inline-block bg-white/20 p-3 rounded-full">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Trending this month
                </h3>
              </div>
            </div>

            {loading
              ? // Loading skeletons for trending topics
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start"
                  >
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-3" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="flex items-center mt-4">
                      <Skeleton className="w-8 h-8 rounded-full mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))
              : // Render actual trending topics from Firebase
                trendingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className={`topic-card min-w-[280px] w-[280px] flex-shrink-0 p-6 snap-start ${
                      topic.active ? "active" : ""
                    }`}
                  >
                    <h3 className="text-lg font-medium mb-2">{topic.title}</h3>
                    {topic.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {topic.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {topic.tags &&
                        topic.tags.map((tag, idx) => {
                          const tagClass = `tag tag-${tag
                            .toLowerCase()
                            .replace("#", "")}`;
                          return (
                            <span key={idx} className={tagClass}>
                              {tag}
                            </span>
                          );
                        })}
                    </div>
                    <div className="flex items-center mt-4">
                      {topic.avatar ? (
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage
                            src={topic.avatar}
                            alt={`${topic.author} avatar`}
                          />
                          <AvatarFallback>
                            {getInitials(topic.author)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 h-8 rounded-full mr-2 bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                          {getInitials(topic.author)}
                        </div>
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {topic.author}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Default trending topics for fallback
const getDefaultTrendingTopics = (): TrendingTopic[] => [
  {
    id: "1",
    title: "Data Preprocessing | Các phương pháp tiền xử lí dữ liệu",
    description: "(Đang cập nhật)",
    tags: ["#DATABASE", "#DATAMESH", "#PREPROCESSING"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    title: "Database Languages and Entity Relationship",
    description: "10",
    tags: ["#DATABASE", "#DATAMESH"],
    author: "Minh Trí",
  },
  {
    id: "3",
    title: "DataMesh: Những điều cơ bản nhất bạn cần biết",
    description: "(Updating)",
    tags: ["#DATABASE", "#DATAMESH"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "4",
    title: "MongoDB Aggregation",
    tags: ["#CERTIFICATION"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    active: true,
  },
  {
    id: "5",
    title: "Postgres Repository",
    tags: ["#CERTIFICATION"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "6",
    title: "Campaign manager 360 Certification Exam",
    tags: ["#CERTIFICATION"],
    author: "hangtuanthiendi",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export default TrendingTopicsSection;
