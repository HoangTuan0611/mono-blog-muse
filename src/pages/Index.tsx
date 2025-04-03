
import { useEffect, useRef } from "react";
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
  const animatedElementsRef = useRef<NodeListOf<Element> | null>(null);
  
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    animatedElementsRef.current = elements;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a small delay based on the index for a sequential animation
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 100);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (animatedElementsRef.current) {
        animatedElementsRef.current.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <MainLayout 
      title="Minimalist Blog - Thoughts on design, life, and technology"
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
