// src/lib/firebaseUtils.ts
import { collection, getDocs, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { certifications as initialCertifications } from "@/data/certifications";

/**
 * Seeds the certifications collection in Firestore with initial data if it's empty
 */
export const seedCertifications = async () => {
  try {
    // Check if collection is empty
    const certificationsCollection = collection(db, "certifications");
    const snapshot = await getDocs(certificationsCollection);
    
    if (snapshot.empty) {
      console.log("Seeding certifications collection with initial data...");
      const batch = writeBatch(db);
      
      // Add each certification to the batch
      initialCertifications.forEach((certification) => {
        // Remove the id from the data as Firestore will generate its own
        const { id, ...certificationData } = certification;
        const docRef = doc(certificationsCollection);
        batch.set(docRef, certificationData);
      });
      
      // Commit the batch
      await batch.commit();
      console.log("Certification data seeded successfully");
      return true;
    } else {
      console.log("Certifications collection already contains data, skipping seed");
      return false;
    }
  } catch (error) {
    console.error("Error seeding certifications:", error);
    return false;
  }
};