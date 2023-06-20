import { render, screen } from '@testing-library/react';
import { AudioComponent } from '.';

describe('Audio component', () => {
  it('should play the audio', () => {
    render(<AudioComponent index={0} isContact />);

    expect(screen.getByText('0:00')).toBeVisible();
  });
});
