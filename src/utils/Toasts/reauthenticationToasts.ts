export const reauthenticationToasts = {
  error: async () => {
    const { toast } = await import('./toast');

    toast({
      title: 'Deslogue e faça login novamente para realizar esta ação.',
      status: 'error',
    });
  },
};
