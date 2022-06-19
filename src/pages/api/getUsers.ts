import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers as getUserData } from '../../utils/getUsers';

type ResponseData = UserRecord[] | unknown;

export default async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { usersId } = req.query;
    const usersIdFormatted = usersId.toString().split(',');
    const users = await getUserData(usersIdFormatted);

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
}
