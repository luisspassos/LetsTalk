import axios from 'axios';

const currentUrl = process.env.NEXT_PUBLIC_CURRENT_URL;

export const api = axios.create({
  baseURL: `${currentUrl}/api`,
});
