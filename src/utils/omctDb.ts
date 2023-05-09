import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

class OmctDb {
  static #instance: InstanceType<typeof OmctDb>;

  #docRef = doc(db, 'numberOfUsers', 'numberOfUsers');

  constructor() {
    if (OmctDb.#instance) return OmctDb.#instance;
    OmctDb.#instance = this;
  }

  async getNumberOfUsers() {
    const docSnap = await getDoc(this.#docRef);

    try {
      if (docSnap.exists()) {
        return docSnap.data().numberOfUsers;
      }

      throw new Error(
        'firebase document에서 numberOfUsers를 찾을 수 없습니다.'
      );
    } catch (error) {
      console.error(error);

      const NUMBER_IN_CASE_ERROR = 404;
      return NUMBER_IN_CASE_ERROR;
    }
  }

  async addNumberOfUsers() {
    const addedNumberOfUsers = (await this.getNumberOfUsers()) + 1;
    setDoc(this.#docRef, { numberOfUsers: addedNumberOfUsers });
  }
}

const omctDb = new OmctDb();
export default omctDb;
