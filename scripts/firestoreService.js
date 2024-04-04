// Assuming db is correctly initialized
import { db } from '../firebaseConfig';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';

export const pushInteractedItemToFirestore = async (itemName) => {
  try {
    const docRef = doc(collection(db, 'objects'), itemName);
    await setDoc(docRef, {
      name: itemName,
      interacted: true,
    }, { merge: true });

    console.log(`Item ${itemName} has been marked as interacted in Firestore.`);
  } catch (error) {
    console.error(`Error pushing interacted item to Firestore: ${error}`);
  }
};

export const addItemToFirestore = async (item) => {
  try {
    const docRef = await addDoc(collection(db, "objects"), item);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

