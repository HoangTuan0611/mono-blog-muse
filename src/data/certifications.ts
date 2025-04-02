
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  category: string;
}

export const certifications: Certification[] = [
  {
    id: "1",
    name: "Certified Web Developer",
    issuer: "Web Development Institute",
    issueDate: "June 2023",
    category: "Development"
  },
  {
    id: "2",
    name: "UX Design Professional",
    issuer: "Design Academy",
    issueDate: "January 2023",
    expiryDate: "January 2026",
    credentialUrl: "https://example.com/credential/ux-design",
    category: "Design"
  },
  {
    id: "3",
    name: "Advanced JavaScript",
    issuer: "Frontend Masters",
    issueDate: "March 2022",
    category: "Development"
  },
  {
    id: "4",
    name: "Digital Marketing Specialist",
    issuer: "Marketing Institute",
    issueDate: "November 2022",
    credentialUrl: "https://example.com/credential/marketing",
    category: "Marketing"
  },
  {
    id: "5",
    name: "Responsive Web Design",
    issuer: "Web Development Institute",
    issueDate: "May 2022",
    category: "Development"
  },
  {
    id: "6",
    name: "Project Management Professional",
    issuer: "Project Management Institute",
    issueDate: "February 2021",
    expiryDate: "February 2024",
    credentialUrl: "https://example.com/credential/pmp",
    category: "Management"
  }
];
