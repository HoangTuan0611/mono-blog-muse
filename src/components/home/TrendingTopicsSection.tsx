
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingTopicsSection = () => {
  const trendingScrollRef = useRef<HTMLDivElement>(null);

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
            {/* Trending Topics Cards */}
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
  );
};

export default TrendingTopicsSection;
