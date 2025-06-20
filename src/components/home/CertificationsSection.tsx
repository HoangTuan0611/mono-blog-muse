import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Certification } from "@/data/certifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CertificationsSection = () => {
  const { t } = useLanguage();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);

        // Fetch certifications from Firebase
        const certificationsCollection = collection(db, "certifications");
        // const q = query(certificationsCollection, orderBy("date", "desc"), limit(3));
        const querySnapshot = await getDocs(certificationsCollection);

        const certificationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Certification[];

        setCertifications(certificationsData);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        // No fallback needed as this will be handled by the parent component
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  // Remove console.log in production
  // console.log("certifications", certifications);

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-medium fade-in fade-in-1">
              {t("certifications.title")}
            </h2>
            <p className="text-gray-300 font-serif mt-2 fade-in fade-in-2">
              Professional qualifications and achievements
            </p>
          </div>
          <Link
            to="/certifications"
            className="!flex items-center gap-2 text-white hover-underline"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          // Loading skeletons for certifications
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border border-gray-800 p-6">
                <Skeleton className="h-40 w-full mb-4 bg-gray-700" />
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-6 w-3/4 bg-gray-700" />
                  <Skeleton className="h-6 w-20 bg-gray-700" />
                </div>
                <Skeleton className="h-4 w-1/2 mb-4 bg-gray-700" />
                <Skeleton className="h-4 w-24 mt-4 bg-gray-700" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.slice(0, 3).map((cert, index) => (
              <div
                key={cert.id}
                className={`border border-gray-800 p-6 hover:bg-white/5 transition-colors fade-in hover-grow fade-in-${
                  index + 3
                } flex flex-col justify-between`}
              >
                {cert.credentialUrlImage && (
                  <div className="mb-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="w-full text-left"
                          onClick={() =>
                            setSelectedImage(cert.credentialUrlImage)
                          }
                        >
                          <AspectRatio
                            ratio={16 / 9}
                            className="bg-gray-900 overflow-hidden rounded-md cursor-pointer"
                          >
                            <img
                              src={cert.credentialUrlImage}
                              alt={`${cert.name} Certificate`}
                              className="object-cover w-full h-full transition-transform hover:scale-105"
                            />
                          </AspectRatio>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="p-0 max-w-4xl w-[90vw] sm:w-[85vw] md:w-[80vw] bg-transparent border-0">
                        <div className="relative w-full h-full">
                          <img
                            src={cert.credentialUrlImage}
                            alt={`${cert.name} Certificate - Full View`}
                            className="w-full h-auto object-contain max-h-[80vh]"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium">{cert.name}</h3>
                    <span className="px-3 py-1 bg-white/10 text-sm">
                      {cert.category}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 font-serif">{cert.issuer}</p>
                </div>
                {cert.credentialUrl && (
                  <div className="mt-4">
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
  );
};

export default CertificationsSection;
