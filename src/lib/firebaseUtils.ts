// src/lib/firebaseUtils.ts
import { collection, getDocs, addDoc, writeBatch, doc, query, where, getDoc, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { certifications as initialCertifications } from "@/data/certifications";
import { posts as initialPosts } from "@/data/posts";
import { videos as initialVideos } from "@/data/videos";
import { travelPosts as initialTravelPosts } from "@/data/travel";

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

/**
 * Seeds the posts collection in Firestore with initial data if it's empty
 */
export const seedPosts = async () => {
  try {
    // Check if collection is empty
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    
    if (snapshot.empty) {
      console.log("Seeding posts collection with initial data...");
      const batch = writeBatch(db);
      
      // Add each post to the batch
      initialPosts.forEach((post) => {
        // We'll keep the id as it's used for references
        const docRef = doc(postsCollection, post.id);
        batch.set(docRef, post);
      });
      
      // Commit the batch
      await batch.commit();
      console.log("Posts data seeded successfully");
      return true;
    } else {
      console.log("Posts collection already contains data, skipping seed");
      return false;
    }
  } catch (error) {
    console.error("Error seeding posts:", error);
    return false;
  }
};

/**
 * Seeds the videos collection in Firestore with initial data if it's empty
 */
export const seedVideos = async () => {
  try {
    // Check if collection is empty
    const videosCollection = collection(db, "videos");
    const snapshot = await getDocs(videosCollection);
    
    if (snapshot.empty) {
      console.log("Seeding videos collection with initial data...");
      const batch = writeBatch(db);
      
      // Add each video to the batch
      initialVideos.forEach((video) => {
        // We'll keep the id as it's used for references
        const docRef = doc(videosCollection, video.id);
        batch.set(docRef, video);
      });
      
      // Commit the batch
      await batch.commit();
      console.log("Videos data seeded successfully");
      return true;
    } else {
      console.log("Videos collection already contains data, skipping seed");
      return false;
    }
  } catch (error) {
    console.error("Error seeding videos:", error);
    return false;
  }
};

/**
 * Seeds the travel posts collection in Firestore with initial data if it's empty
 */
export const seedTravelPosts = async () => {
  try {
    // Check if collection is empty
    const travelCollection = collection(db, "travel");
    const snapshot = await getDocs(travelCollection);
    
    if (snapshot.empty) {
      console.log("Seeding travel collection with initial data...");
      const batch = writeBatch(db);
      
      // Add each travel post to the batch
      initialTravelPosts.forEach((post) => {
        // We'll keep the id as it's used for references
        const docRef = doc(travelCollection, post.id);
        batch.set(docRef, post);
      });
      
      // Commit the batch
      await batch.commit();
      console.log("Travel posts data seeded successfully");
      return true;
    } else {
      console.log("Travel collection already contains data, skipping seed");
      return false;
    }
  } catch (error) {
    console.error("Error seeding travel posts:", error);
    return false;
  }
};

/**
 * Get a post by its slug
 */
export const getPostBySlugFromFirebase = async (slug: string) => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const postDoc = querySnapshot.docs[0];
      return { id: postDoc.id, ...postDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
};

/**
 * Get all posts
 */
export const getAllPostsFromFirebase = async () => {
  try {
    const postsCollection = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollection);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
};

/**
 * Get all videos
 */
export const getAllVideosFromFirebase = async () => {
  try {
    const videosCollection = collection(db, "videos");
    const querySnapshot = await getDocs(videosCollection);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching all videos:", error);
    return [];
  }
};

/**
 * Get all travel posts from Firebase
 */
export const getAllTravelPostsFromFirebase = async () => {
  try {
    const travelCollection = collection(db, "travel");
    const querySnapshot = await getDocs(travelCollection);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching all travel posts:", error);
    return [];
  }
};

/**
 * Get a travel post by its slug from Firebase
 */
export const getTravelPostBySlugFromFirebase = async (slug: string) => {
  try {
    const travelCollection = collection(db, "travel");
    const q = query(travelCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const postDoc = querySnapshot.docs[0];
      return { id: postDoc.id, ...postDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching travel post by slug:", error);
    return null;
  }
};

/**
 * Get featured posts
 */
export const getFeaturedPostsFromFirebase = async () => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, where("featured", "==", true));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};

/**
 * Get featured travel posts from Firebase
 */
export const getFeaturedTravelPostsFromFirebase = async () => {
  try {
    const travelCollection = collection(db, "travel");
    const q = query(travelCollection, where("featured", "==", true));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching featured travel posts:", error);
    return [];
  }
};

/**
 * Get recent posts
 */
export const getRecentPostsFromFirebase = async (count: number) => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("date", "desc"), limit(count));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
};

/**
 * Get recent travel posts from Firebase
 */
export const getRecentTravelPostsFromFirebase = async (count: number) => {
  try {
    const travelCollection = collection(db, "travel");
    const q = query(travelCollection, orderBy("date", "desc"), limit(count));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching recent travel posts:", error);
    return [];
  }
};

/**
 * Get recent videos
 */
export const getRecentVideosFromFirebase = async (count: number) => {
  try {
    const videosCollection = collection(db, "videos");
    const q = query(videosCollection, orderBy("date", "desc"), limit(count));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching recent videos:", error);
    return [];
  }
};

/**
 * Get related posts
 */
export const getRelatedPostsFromFirebase = async (currentPostId: string, category: string, count: number = 3) => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, where("category", "==", category), where("id", "!=", currentPostId), limit(count));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};

/**
 * Get related travel posts from Firebase
 */
export const getRelatedTravelPostsFromFirebase = async (currentPostId: string, region: string, count: number = 3) => {
  try {
    const travelCollection = collection(db, "travel");
    const q = query(travelCollection, where("region", "==", region), where("id", "!=", currentPostId), limit(count));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching related travel posts:", error);
    return [];
  }
};

/**
 * Get videos by category
 */
export const getVideosByCategoryFromFirebase = async (category: string) => {
  try {
    const videosCollection = collection(db, "videos");
    const q = query(videosCollection, where("category", "==", category));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching videos by category ${category}:`, error);
    return [];
  }
};

/**
 * Get travel posts by region from Firebase
 */
export const getTravelPostsByRegionFromFirebase = async (region: string) => {
  try {
    const travelCollection = collection(db, "travel");
    const q = query(travelCollection, where("region", "==", region));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching travel posts by region ${region}:`, error);
    return [];
  }
};