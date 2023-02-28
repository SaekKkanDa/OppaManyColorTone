import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const addNumberOfUsers = async () => {
  const docRef = doc(db, 'numberOfUsers', 'numberOfUsers');
  const docSnap = await getDoc(docRef);

  const numberOfUsers = docSnap.data().numberOfUsers + 1;
  setDoc(docRef, { numberOfUsers });
};

export default addNumberOfUsers;
