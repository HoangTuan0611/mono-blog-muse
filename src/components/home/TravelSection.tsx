
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface TravelPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  date: string;
  region: string;
  excerpt: string;
}

interface TravelSectionProps {
  travelPosts: TravelPost[];
}

const TravelSection = ({ travelPosts }: TravelSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24 visible">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-medium">{t("travel.title")}</h2>
            <p className="text-gray-600 dark:text-gray-300 font-serif mt-2">
              Adventures and explorations around the world
            </p>
          </div>
          <Link to="/travel" className="flex items-center gap-2 hover-underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {travelPosts.map((post, index) => (
              <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                <Link 
                  to={`/travel/${post.slug}`} 
                  className="group block hover-grow h-full"
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
  );
};

export default TravelSection;
