import { useRouter } from 'next/router';

export function usePageIsSelected(page: string) {
  const router = useRouter();
  const pathName = router.pathname;

  return pathName.includes(page);
}
