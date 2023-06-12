export const getUserRef = async (username: string) => {
  const { doc } = await import('firebase/firestore');
  const { db } = await import('services/firebase');

  const userRef = doc(db, 'users', username);

  return { userRef, doc, db };
};
