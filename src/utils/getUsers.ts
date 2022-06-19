import { auth } from '../services/firebaseAdmin';

export async function getUsers(usersId: string[]) {
  const usersIdInObj = usersId.map((id) => ({
    uid: id,
  }));

  const users = (await auth.getUsers(usersIdInObj)).users;

  return users;
}
