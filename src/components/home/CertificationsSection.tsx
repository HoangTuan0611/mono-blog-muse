
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Certification } from "@/data/certifications";
import { useLanguage } from "@/contexts/LanguageContext";

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-medium animate-on-scroll">{t("certifications.title")}</h2>
            <p className="text-gray-300 font-serif mt-2 animate-on-scroll" style={{ '--delay': 1 } as React.CSSProperties}>
              Professional qualifications and achievements
            </p>
          </div>
          <Link to="/certifications" className="flex items-center gap-2 text-white hover-underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className="border border-gray-800 p-6 hover:bg-white/5 transition-colors animate-on-scroll"
              style={{ '--delay': index + 2 } as React.CSSProperties}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium">{cert.name}</h3>
                <span className="px-3 py-1 bg-white/10 text-sm">{cert.category}</span>
              </div>
              <p className="text-gray-400 mb-4 font-serif">{cert.issuer}</p>
              <Link 
                to="/certifications" 
                className="inline-block mt-4 text-sm hover-underline"
              >
                {t("certifications.view_credential")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
