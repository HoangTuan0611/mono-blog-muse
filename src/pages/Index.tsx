
import MainLayout from "@/layouts/MainLayout";
import { getFeaturedPosts, getRecentPosts } from "@/data/posts";
import { certifications } from "@/data/certifications";
import { videos } from "@/data/videos";
import { travelPosts } from "@/data/travel";

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
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(6);
  const recentCertifications = certifications.slice(0, 3);
  const featuredVideos = videos.slice(0, 3);
  const recentTravelPosts = travelPosts.slice(0, 3);

  return (
    <MainLayout 
      title="NHT Blog - Thoughts on design, life, and technology"
      description="Explore minimalism, design, and intentional living through our collection of articles, videos, and resources."
    >
      <HeroSection />
      <TrendingTopicsSection />
      <FeaturedPostsSection featuredPosts={featuredPosts} />
      <RecentPostsSection recentPosts={recentPosts} />
      <CertificationsSection certifications={recentCertifications} />
      <VideosSection videos={featuredVideos} />
      <TravelSection travelPosts={recentTravelPosts} />
      <NewsletterSection />
    </MainLayout>
  );
};

export default Index;
