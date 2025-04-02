
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readingTime: string;
  category: string;
  featured?: boolean;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "The Beauty of Minimalistic Design",
    slug: "beauty-of-minimalistic-design",
    excerpt: "Exploring how stripping away the unnecessary reveals the essence of good design.",
    content: `
      <p>Minimalism isn't about emptiness—it's about intentionality. Every element that remains serves a purpose, whether functional or aesthetic. This intentional approach creates designs that feel clean, purposeful, and timeless.</p>
      
      <p>The principles of minimalist design have evolved from various art movements and philosophical approaches to life. From Japanese Zen aesthetics to the Bauhaus school, minimalism has always sought to distill the essence of function while maintaining beauty.</p>
      
      <h2>Why Minimalism Works</h2>
      
      <p>In a world of constant stimulation and information overload, minimalist design provides a sense of calm. It removes distractions and allows the user to focus on what truly matters. This isn't just pleasant—it's increasingly necessary for effective communication.</p>
      
      <p>Cognitive load theory tells us that our brains have limited processing capacity. By reducing visual noise and unnecessary elements, minimalist design reduces the mental effort required to engage with content. This leads to better comprehension, retention, and overall user experience.</p>
      
      <h2>Principles of Minimalist Design</h2>
      
      <p>Successful minimalist design typically follows several key principles:</p>
      
      <ul>
        <li>Simplification: Reduce elements to their essential forms</li>
        <li>Negative Space: Use emptiness as a design element</li>
        <li>Limited Color Palette: Often monochromatic or with very few accent colors</li>
        <li>Typography: Clean, readable type with intentional hierarchy</li>
        <li>Grid Systems: Creating order through careful alignment</li>
      </ul>
      
      <p>When applied thoughtfully, these principles create designs that feel both modern and timeless, focused and expressive.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1510115661393-d048695consf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "2023-06-12",
    readingTime: "5 min read",
    category: "Design",
    featured: true
  },
  {
    id: "2",
    title: "Typography in Modern Web Design",
    slug: "typography-modern-web-design",
    excerpt: "How thoughtful typography choices can transform the user experience of your website.",
    content: `
      <p>Typography is perhaps the most fundamental element of web design. It's not just about making text readable—it's about creating hierarchy, establishing mood, and guiding the user's attention.</p>
      
      <h2>The Importance of Typographic Hierarchy</h2>
      
      <p>A clear typographic hierarchy helps users scan content and understand the relative importance of different elements. This is typically achieved through variations in size, weight, spacing, and sometimes color.</p>
      
      <p>The most basic hierarchy consists of headings, subheadings, body text, and possibly captions or footnotes. Each level should be visually distinct while maintaining overall coherence.</p>
      
      <h2>Choosing the Right Typefaces</h2>
      
      <p>Selecting typefaces is both an art and a science. Technical considerations include readability at different sizes, loading performance, and compatibility across devices.</p>
      
      <p>Aesthetic considerations include the mood and personality you want to convey, historical connotations of certain styles, and how different typefaces pair together.</p>
      
      <p>For web design, it's common to use a sans-serif font for headings and a serif font for body text—or vice versa. This creates contrast while maintaining harmony.</p>
      
      <h2>The Technical Side</h2>
      
      <p>Beyond aesthetics, modern web typography must address technical concerns:</p>
      
      <ul>
        <li>Responsive behavior across device sizes</li>
        <li>Loading performance with variable fonts or font subsetting</li>
        <li>Accessibility for users with visual impairments</li>
        <li>Internationalization for multi-language support</li>
      </ul>
      
      <p>When these technical aspects are handled thoughtfully, typography becomes the invisible foundation of great user experience.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    date: "2023-07-24",
    readingTime: "6 min read",
    category: "Typography",
    featured: true
  },
  {
    id: "3",
    title: "The Art of Visual Storytelling",
    slug: "art-of-visual-storytelling",
    excerpt: "How images and layout can create compelling narratives in digital spaces.",
    content: `
      <p>Visual storytelling predates written language, from cave paintings to modern cinematography. In web design, it combines elements of graphic design, photography, typography, and layout to create narratives that engage and persuade.</p>
      
      <h2>Elements of Visual Storytelling</h2>
      
      <p>Effective visual storytelling typically incorporates several key elements:</p>
      
      <ul>
        <li>Characters: People or subjects that viewers can connect with</li>
        <li>Setting: The environment or context where the story takes place</li>
        <li>Plot: A sequence of visuals that guide the user through a journey</li>
        <li>Conflict and Resolution: Creating tension and release through visual means</li>
        <li>Emotional arc: Using color, composition, and pacing to evoke feelings</li>
      </ul>
      
      <p>These elements don't need to be explicit—they can be implied through subtle design choices.</p>
      
      <h2>Practical Applications</h2>
      
      <p>In web design, visual storytelling can take many forms:</p>
      
      <ul>
        <li>Scrollytelling: Revealing narrative elements as the user scrolls</li>
        <li>Interactive data visualization: Allowing users to discover insights through exploration</li>
        <li>Product photography sequences: Showing a product's features through a logical progression</li>
        <li>Before/after comparisons: Demonstrating transformation and results</li>
        <li>User testimonials paired with contextual imagery: Adding authenticity to claims</li>
      </ul>
      
      <p>When done well, visual storytelling creates an immersive experience that keeps users engaged and helps them connect emotionally with your content.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "2023-08-15",
    readingTime: "7 min read",
    category: "Design"
  },
  {
    id: "4",
    title: "White Space: The Silent Hero of Interface Design",
    slug: "white-space-interface-design",
    excerpt: "Understanding how emptiness creates meaning and improves user experience.",
    content: `
      <p>White space—also called negative space—is the empty area between and around elements in a design. Despite its name, it doesn't need to be white; it simply refers to the absence of content.</p>
      
      <p>Far from being "wasted space," white space is an active design element that shapes how we perceive information. It creates relationships between elements, establishes hierarchy, and improves readability.</p>
      
      <h2>Macro and Micro White Space</h2>
      
      <p>Designers typically distinguish between two types of white space:</p>
      
      <ul>
        <li>Macro white space: The larger spaces between major elements, like the space between columns or sections</li>
        <li>Micro white space: The smaller spaces between elements, like line spacing or padding around text</li>
      </ul>
      
      <p>Both types are essential for creating balanced, readable designs.</p>
      
      <h2>Benefits of Generous White Space</h2>
      
      <p>Research consistently shows that appropriate use of white space offers several advantages:</p>
      
      <ul>
        <li>Improved comprehension: Studies show up to 20% better understanding when text has adequate spacing</li>
        <li>Increased attention: Elements surrounded by space receive more visual attention</li>
        <li>Perception of elegance: Brands often use white space to signal sophistication and quality</li>
        <li>Reduced cognitive load: Simpler visual patterns require less mental processing</li>
        <li>Better interaction: Properly spaced interactive elements reduce errors and frustration</li>
      </ul>
      
      <p>These benefits make white space not just an aesthetic choice, but a practical one that directly impacts user experience.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    date: "2023-09-03",
    readingTime: "4 min read",
    category: "Design"
  },
  {
    id: "5",
    title: "Designing for Accessibility",
    slug: "designing-for-accessibility",
    excerpt: "How inclusive design principles make better products for everyone.",
    content: `
      <p>Accessibility in design isn't just about compliance with regulations—it's about creating products and experiences that can be used by as many people as possible, regardless of ability or circumstance.</p>
      
      <p>Designing for accessibility benefits everyone. Features originally intended for people with disabilities often become mainstream conveniences: curb cuts help people with strollers, captions help people watching videos in noisy environments, and voice interfaces help people whose hands are occupied.</p>
      
      <h2>Key Principles of Accessible Design</h2>
      
      <p>The Web Content Accessibility Guidelines (WCAG) organize accessibility principles around four main concepts:</p>
      
      <ul>
        <li>Perceivable: Information must be presentable to users in ways they can perceive</li>
        <li>Operable: User interface components must be operable by a variety of means</li>
        <li>Understandable: Information and operation must be understandable</li>
        <li>Robust: Content must be robust enough to work with current and future technologies</li>
      </ul>
      
      <p>These principles provide a framework for creating accessible experiences across digital platforms.</p>
      
      <h2>Practical Accessibility Techniques</h2>
      
      <p>Implementing accessibility doesn't have to be overwhelming. Start with these practical steps:</p>
      
      <ul>
        <li>Provide sufficient color contrast (at least 4.5:1 for normal text)</li>
        <li>Use semantic HTML elements that clearly describe their purpose</li>
        <li>Ensure keyboard navigability for all interactive elements</li>
        <li>Add descriptive alt text to images</li>
        <li>Create clear, consistent navigation patterns</li>
        <li>Design forms with visible labels and helpful error messages</li>
        <li>Test with actual assistive technologies like screen readers</li>
      </ul>
      
      <p>By incorporating these practices into your workflow, accessibility becomes a natural part of the design process rather than an afterthought.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "2023-10-18",
    readingTime: "8 min read",
    category: "Accessibility"
  },
  {
    id: "6",
    title: "The Psychology of Black and White Design",
    slug: "psychology-black-white-design",
    excerpt: "Exploring how monochromatic design affects user perception and behavior.",
    content: `
      <p>Black and white design—the ultimate in color minimalism—has a powerful psychological impact. By removing color, we focus attention on contrast, form, texture, and typography, creating experiences that feel timeless and sophisticated.</p>
      
      <h2>Historical Context</h2>
      
      <p>Monochromatic design has a rich history across cultures and art movements. From East Asian ink paintings to Modernist architecture, black and white has been used to convey elegance, clarity, and truth.</p>
      
      <p>In the digital age, black and white design stands out precisely because it rejects the easy appeal of vibrant color, suggesting a confidence in the quality of content and concept.</p>
      
      <h2>Psychological Effects</h2>
      
      <p>Research in visual perception and psychology suggests several effects of black and white design:</p>
      
      <ul>
        <li>Increased focus on content: Without color to distract, users pay more attention to the actual information</li>
        <li>Perception of sophistication: Monochromatic designs are often perceived as more luxurious and refined</li>
        <li>Stronger emotional contrast: Black and white can emphasize emotional polarities</li>
        <li>Enhanced memory: Studies suggest that high-contrast monochromatic images may be more memorable</li>
        <li>Reduced decision fatigue: Limiting visual variables can make interfaces feel more straightforward</li>
      </ul>
      
      <p>These effects make black and white particularly suitable for content-focused experiences like reading platforms, photography portfolios, and luxury brand sites.</p>
      
      <h2>Practical Applications</h2>
      
      <p>To use black and white effectively in digital design:</p>
      
      <ul>
        <li>Pay special attention to typography—it carries more weight without color</li>
        <li>Use texture and subtle gradients to create visual interest</li>
        <li>Consider strategic use of a single accent color for crucial interactions</li>
        <li>Ensure sufficient contrast for readability and accessibility</li>
        <li>Use varied grayscale values, not just pure black and white</li>
      </ul>
      
      <p>When executed with care, black and white design creates experiences that feel both contemporary and classic, with a sense of refinement that colored designs often struggle to achieve.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "2023-11-05",
    readingTime: "6 min read",
    category: "Design",
    featured: true
  }
];

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (): Post[] => {
  return posts.filter(post => post.featured);
};

export const getRecentPosts = (count: number): Post[] => {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getRelatedPosts = (currentPostId: string, category: string, count: number = 3): Post[] => {
  return posts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, count);
};
