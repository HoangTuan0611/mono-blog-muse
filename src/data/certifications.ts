export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialUrlImage?: string;
  category: string;
}

export const certifications: Certification[] = [
  {
    id: "1",
    name: "Certified Web Developer",
    issuer: "Web Development Institute",
    issueDate: "June 2023",
    credentialUrlImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    category: "Development"
  },
  {
    id: "2",
    name: "UX Design Professional",
    issuer: "Design Academy",
    issueDate: "January 2023",
    expiryDate: "January 2026",
    credentialUrl: "https://example.com/credential/ux-design",
    credentialUrlImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop",
    category: "Design"
  },
  {
    id: "3",
    name: "Advanced JavaScript",
    issuer: "Frontend Masters",
    issueDate: "March 2022",
    credentialUrlImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    category: "Development"
  },
  {
    id: "4",
    name: "Digital Marketing Specialist",
    issuer: "Marketing Institute",
    issueDate: "November 2022",
    credentialUrl: "https://example.com/credential/marketing",
    credentialUrlImage: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070&auto=format&fit=crop",
    category: "Marketing"
  },
  {
    id: "5",
    name: "Responsive Web Design",
    issuer: "Web Development Institute",
    issueDate: "May 2022",
    credentialUrlImage: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?q=80&w=2070&auto=format&fit=crop",
    category: "Development"
  },
  {
    id: "6",
    name: "Project Management Professional",
    issuer: "Project Management Institute",
    issueDate: "February 2021",
    expiryDate: "February 2024",
    credentialUrl: "https://example.com/credential/pmp",
    credentialUrlImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    category: "Management"
  }
];
