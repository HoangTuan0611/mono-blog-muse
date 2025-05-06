import MainLayout from "@/layouts/MainLayout";

// Import components
import HeroSection from "@/components/home/HeroSection";
import TrendingTopicsSection from "@/components/home/TrendingTopicsSection";
import FeaturedPostsSection from "@/components/home/FeaturedPostsSection";
import RecentPostsSection from "@/components/home/RecentPostsSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import VideosSection from "@/components/home/VideosSection";
import TravelSection from "@/components/home/TravelSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <MainLayout 
      title="NHT Blog - Thoughts on design, life, and technology"
      description="Explore minimalism, design, and intentional living through our collection of articles, videos, and resources."
    >
      <HeroSection />
      <TrendingTopicsSection />
      <FeaturedPostsSection />
      <RecentPostsSection />
      <CertificationsSection />
      <VideosSection />
      <TravelSection />
      <NewsletterSection />
    </MainLayout>
  );
};

export default Index;
