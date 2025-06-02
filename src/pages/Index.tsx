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
      title="tuannguyenhoang.com"
      description="A fullstack developer sharing thoughts on design, life, and technology."
    >
      <HeroSection />
      <CertificationsSection />
      <TrendingTopicsSection />
      {/* <FeaturedPostsSection /> */}
      {/* <RecentPostsSection /> */}
      {/* <VideosSection /> */}
      {/* <TravelSection /> */}
      {/* <NewsletterSection /> */}
    </MainLayout>
  );
};

export default Index;
