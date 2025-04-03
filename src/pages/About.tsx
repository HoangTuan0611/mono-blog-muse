import MainLayout from "@/layouts/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="animate-slide-up hardware-accelerated">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-12">
              About
            </h1>
            
            <div className="aspect-[16/9] mb-12">
              <img 
                src="https://images.unsplash.com/photo-1568607689150-fca102b4d8ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Designer working on a minimalist layout" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none font-serif fade-in">
              <p className="lead">
                Hello, I'm a designer and writer passionate about the intersection of aesthetics and functionality. My work focuses on minimalist approaches to design and living.
              </p>
              
              <p>
                With over a decade of experience in design across various media, I've developed a philosophy centered on the principle that less truly is more. I believe that by stripping away unnecessary elements, we can create more meaningful, powerful, and accessible experiences.
              </p>

              <p>
                On this blog, I explore topics related to:
              </p>

              <ul>
                <li>Minimalist design principles</li>
                <li>Typography and visual communication</li>
                <li>User experience and interface design</li>
                <li>Sustainable and ethical approaches to creation</li>
                <li>The psychology behind visual perception</li>
              </ul>

              <p>
                My approach is both theoretical and practical. I aim to share insights that are academically grounded but immediately applicable to real-world design challenges.
              </p>

              <h2>Professional Background</h2>

              <p>
                My journey in design began with traditional graphic design but quickly expanded to include digital interfaces, user experience, and eventually, design systems. I've worked with brands ranging from small startups to global corporations, always bringing a minimalist sensibility to each project.
              </p>

              <p>
                I hold a Master's degree in Design Studies and regularly speak at industry conferences about the power of restraint in visual communication.
              </p>

              <h2>Philosophy</h2>

              <p>
                I believe that design should solve problems without creating new ones. This means creating systems that are:
              </p>

              <ul>
                <li><strong>Inclusive:</strong> Designed with all users in mind</li>
                <li><strong>Sustainable:</strong> Built to last, both technically and aesthetically</li>
                <li><strong>Purposeful:</strong> Every element serves a clear function</li>
                <li><strong>Honest:</strong> Transparent in intention and execution</li>
              </ul>

              <p>
                These principles guide not just my design work but also how I approach this blog and the ideas I share with my readers.
              </p>

              <h2>Connect</h2>

              <p>
                I'm always interested in connecting with like-minded individuals, potential collaborators, or anyone with questions about design and minimalism. Feel free to reach out through the social links below.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 fade-in fade-in-5">
              <h3 className="text-xl font-medium mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                <a href="#" className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
