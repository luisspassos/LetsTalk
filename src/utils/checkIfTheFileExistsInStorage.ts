import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../services/firebase';

export async function checkIfFileExistsInStorage(filePath: string) {
  const storageRef = ref(storage, filePath);

  try {
    await getDownloadURL(storageRef);

    return Promise.resolve(true);
  } catch (err) {
    const { FirebaseError } = await import('firebase/app');

    if (!(err instanceof FirebaseError)) return;

    if (err.code === 'storage/object-not-found') {
      return Promise.resolve(false);
    } else {
      return Promise.reject(err);
    }
  }
}
