import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Certification } from "@/data/certifications";
import { seedCertifications } from "@/lib/firebaseUtils";

const Certifications = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        
        // Seed certifications if collection is empty
        await seedCertifications();
        
        const certificationsCollection = collection(db, "certifications");
        const certificationsSnapshot = await getDocs(certificationsCollection);
        const certificationsData = certificationsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            issuer: data.issuer,
            issueDate: data.issueDate,
            expiryDate: data.expiryDate,
            credentialUrl: data.credentialUrl,
            category: data.category
          } as Certification;
        });
        setCertifications(certificationsData);
      } catch (err) {
        console.error("Error fetching certifications:", err);
        setError("Failed to load certifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const categories = ["All", ...new Set(certifications.map(cert => cert.category))];
  const filteredCertifications = filter === "All" 
    ? certifications 
    : certifications.filter(cert => cert.category === filter);

  return (
    <MainLayout>
      <section className="container mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            {t("certifications.title")}
          </h1>
          <p className="text-xl text-gray-600 mb-12 font-serif">
            {t("certifications.subtitle")}
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 flex-wrap mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 ${
                  filter === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading certifications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredCertifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No certifications found for this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredCertifications.map((cert, index) => (
                <div 
                  key={cert.id} 
                  className={`border border-gray-200 p-6 hover:shadow-md transition-shadow fade-in hover-grow fade-in-${Math.min(index + 1, 5)}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium">{cert.name}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-sm">{cert.category}</span>
                  </div>
                  <p className="text-gray-600 mb-4 font-serif">{cert.issuer}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{t("certifications.issued")}: {cert.issueDate}</span>
                    {cert.expiryDate && (
                      <span className="text-gray-500">{t("certifications.expires")}: {cert.expiryDate}</span>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a 
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-underline text-sm font-medium"
                      >
                        {t("certifications.view_credential")}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Certifications;
