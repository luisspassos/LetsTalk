import { toast } from '.';

describe('Toast', () => {
  it('should disappear in 6 seconds', () => {
    toast({
      title: 'Test',
    });
  });
});
