import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';

// Function to clear all documents from a specific collection
export const clearFirestoreCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletePromises);  // Wait for all delete operations to complete
  console.log(`All items from the '${collectionName}' collection have been removed.`);
};
