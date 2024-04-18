// import { db } from '../firebaseConfig';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import my3Dobjects from '../data/3d_objects_list.json';

// const uploadDataToFirestore = async () => {
//   const collectionRef = collection(db, 'objects');

//   for (const obj of my3Dobjects) {
//     console.log('Object to upload:', obj);
//     const { id, ...data } = obj;
//     console.log(`Data for document ID ${id}:`, data);
//     try {
//       const docRef = doc(collectionRef, id.toString());
//       await setDoc(docRef, { ...data }); // Spread the data into the document
//       console.log(`Document with ID ${id} uploaded successfully`);
//     } catch (error) {
//       console.error(`Error uploading document with ID ${id}:`, error);
//     }
//   }
// };  

// uploadDataToFirestore();



