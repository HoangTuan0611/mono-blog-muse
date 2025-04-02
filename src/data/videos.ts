
export interface Video {
  id: string;
  title: string;
  description: string;
  videoId: string;
  thumbnail: string;
  category: string;
  duration: string;
  date: string;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "Minimalist Web Design Principles",
    description: "Learn the core principles of minimalist design for creating clean and effective websites.",
    videoId: "dQw4w9WgXcQ", // Example YouTube ID
    thumbnail: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
    category: "Design",
    duration: "12:34",
    date: "2023-09-15"
  },
  {
    id: "2",
    title: "Typography in Modern UX",
    description: "How to use typography effectively in modern user experience design.",
    videoId: "dQw4w9WgXcQ", // Example YouTube ID
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Design",
    duration: "18:42",
    date: "2023-08-22"
  },
  {
    id: "3",
    title: "Building Responsive Interfaces",
    description: "Learn how to create interfaces that work perfectly across all device sizes.",
    videoId: "dQw4w9WgXcQ", // Example YouTube ID
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Development",
    duration: "24:18",
    date: "2023-07-10"
  },
  {
    id: "4",
    title: "The Art of Visual Storytelling",
    description: "How to use visual elements to tell compelling stories in your design work.",
    videoId: "dQw4w9WgXcQ", // Example YouTube ID
    thumbnail: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    category: "Creativity",
    duration: "15:20",
    date: "2023-06-28"
  },
  {
    id: "5",
    title: "Fundamentals of JavaScript",
    description: "A beginner-friendly introduction to JavaScript programming.",
    videoId: "dQw4w9WgXcQ", // Example YouTube ID
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Development",
    duration: "32:45",
    date: "2023-05-15"
  },
  {
    id: "6",
    title: "Color Theory for Designers",
    description: "Understanding how to use color effectively in your design projects.",
    videoId: "dQw4w9WgXcQ", // Example YouTube ID
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Design",
    duration: "21:08",
    date: "2023-04-03"
  }
];
