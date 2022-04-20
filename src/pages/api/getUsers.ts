import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../services/firebaseAdmin';

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { usersId } = req.query;
    const usersIdFormatted = usersId.toString().split(',');
    const usersIdInObj = usersIdFormatted.map((id) => ({
      uid: id,
    }));
    const users = (await auth.getUsers(usersIdInObj)).users;

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
}
