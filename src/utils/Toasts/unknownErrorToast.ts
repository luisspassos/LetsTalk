import { toast } from './toast';

export function unknownErrorToast() {
  toast({ status: 'error', title: 'Ocorreu um erro desconhecido' });
}
