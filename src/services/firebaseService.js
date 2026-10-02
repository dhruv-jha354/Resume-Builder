import { db } from "../firebase";
import { collection, doc, setDoc, getDoc, getDocs, updateDoc, query, deleteDoc } from "firebase/firestore";

/**
 * Creates a new resume document for a user
 * @param {string} userId - The Firebase auth user UID
 * @param {string} title - The title of the new resume
 * @returns {object} The created resume object with its random ID
 */
export const createResume = async (userId, title) => {
    try {
        const resumesRef = collection(db, "users", userId, "resumes");
        const newResumeRef = doc(resumesRef); // Generates auto ID
        
        const initialData = {
            id: newResumeRef.id,
            title: title || "Untitled Resume",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Ensure step default structures
            template: "minimal",
            personalInfo: {
                fullName: "", email: "", phone: "", location: "", profession: "", linkedin: "", website: "", profileImage: ""
            },
            summary: "",
            experience: [],
            education: [],
            skills: [],
            projects: []
        };

        await setDoc(newResumeRef, initialData);
        return initialData;
    } catch (error) {
        console.error("Error creating resume:", error);
        throw error;
    }
};

/**
 * Gets all resumes for a specific user
 * @param {string} userId - The Firebase auth user UID
 * @returns {Array} Array of resume objects
 */
export const getUserResumes = async (userId) => {
    try {
        const resumesRef = collection(db, "users", userId, "resumes");
        const q = query(resumesRef);
        const querySnapshot = await getDocs(q);
        
        const resumes = [];
        querySnapshot.forEach((doc) => {
            resumes.push({ ...doc.data() });
        });
        
        // Sort descending by update time
        return resumes.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } catch (error) {
        console.error("Error fetching resumes:", error);
        throw error;
    }
};

/**
 * Fetch a specific resume by its ID
 * @param {string} userId - The Firebase auth user UID
 * @param {string} resumeId - The resume document ID
 * @returns {object|null} The resume data or null if not found
 */
export const getResumeById = async (userId, resumeId) => {
    try {
        const resumeRef = doc(db, "users", userId, "resumes", resumeId);
        const resumeSnap = await getDoc(resumeRef);
        
        if (resumeSnap.exists()) {
            return resumeSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching resume:", error);
        throw error;
    }
};

/**
 * Updates an existing resume document
 * @param {string} userId - The Firebase auth user UID
 * @param {string} resumeId - The resume document ID
 * @param {object} data - Partial data to update (e.g. { personalInfo: {...} })
 * @returns {boolean} Success state
 */
export const updateResume = async (userId, resumeId, data) => {
    try {
        const resumeRef = doc(db, "users", userId, "resumes", resumeId);
        await updateDoc(resumeRef, {
            ...data,
            updatedAt: new Date().toISOString() // Force updated timestamp whenever modified
        });
        return true;
    } catch (error) {
        console.error("Error updating resume:", error);
        throw error;
    }
};

/**
 * Deletes a specific resume document
 * @param {string} userId - The Firebase auth user UID
 * @param {string} resumeId - The resume document ID
 * @returns {boolean} Success state
 */
export const deleteResume = async (userId, resumeId) => {
    try {
        const resumeRef = doc(db, "users", userId, "resumes", resumeId);
        await deleteDoc(resumeRef);
        return true;
    } catch (error) {
        console.error("Error deleting resume:", error);
        throw error;
    }
};

import { DEMO_RESUMES } from "../data/demoResumes";

/**
 * Fetches all demo resumes from Firestore 'demoResumes' collection,
 * falling back to static DEMO_RESUMES if collection is empty or fails.
 * @returns {Array} Array of demo resume objects
 */
export const getDemoResumes = async () => {
    try {
        const demoRef = collection(db, "demoResumes");
        const querySnapshot = await getDocs(demoRef);
        const firestoreDemos = [];
        querySnapshot.forEach((doc) => {
            firestoreDemos.push({ ...doc.data(), id: doc.id });
        });
        if (firestoreDemos.length > 0) {
            return firestoreDemos;
        }
    } catch (error) {
        console.warn("Could not fetch from 'demoResumes' collection, using fallback static demo dataset:", error.message);
    }
    return DEMO_RESUMES;
};

/**
 * Fetches a single demo resume by ID from Firestore or static dataset fallback.
 * @param {string} resumeId - The demo resume ID
 * @returns {object|null} The demo resume object
 */
export const getDemoResumeById = async (resumeId) => {
    try {
        const demoDocRef = doc(db, "demoResumes", resumeId);
        const demoSnap = await getDoc(demoDocRef);
        if (demoSnap.exists()) {
            return { ...demoSnap.data(), id: demoSnap.id };
        }
    } catch (error) {
        console.warn("Could not fetch demo resume from Firestore, searching static fallback:", error.message);
    }
    const found = DEMO_RESUMES.find(r => r.id === resumeId);
    return found || null;
};

/**
 * Duplicates a demo resume into a logged-in user's account ('users/{userId}/resumes')
 * @param {string} userId - The logged in user UID
 * @param {object} demoResume - The demo resume object to duplicate
 * @returns {object} The newly created user resume object
 */
export const duplicateDemoResume = async (userId, demoResume) => {
    try {
        const resumesRef = collection(db, "users", userId, "resumes");
        const newResumeRef = doc(resumesRef);
        
        const duplicatedData = {
            ...demoResume,
            id: newResumeRef.id,
            title: demoResume.title || "My Resume (Demo Copy)",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isDemo: false
        };

        await setDoc(newResumeRef, duplicatedData);
        return duplicatedData;
    } catch (error) {
        console.error("Error duplicating demo resume:", error);
        throw error;
    }
};

