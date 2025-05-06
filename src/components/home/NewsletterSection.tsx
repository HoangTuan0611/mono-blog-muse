import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  console.log('111');
  
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Subscribe to the newsletter</h2>
          <p className="text-gray-300 mb-8 font-serif text-lg">
            Get notified about new posts and updates. No spam, unsubscribe anytime.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-gray-500 rounded-none"
              required
            />
            <Button type="submit" className="rounded-none px-6 font-medium">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
