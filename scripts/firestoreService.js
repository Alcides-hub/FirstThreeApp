import { db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

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