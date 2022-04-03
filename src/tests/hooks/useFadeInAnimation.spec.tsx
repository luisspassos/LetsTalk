import { render, screen } from '@testing-library/react';
import { AuthContentPageWrapper } from '../../components/Auth/AuthContentPageWrapper';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        components: [1, 2, 3],
      };
    },
  };
});

describe('fadeInAnimation hook', () => {
  it('should return the animation if the route that was accessed was through a link', () => {
    render(
      <AuthContentPageWrapper>
        <div>component</div>
      </AuthContentPageWrapper>
    );

    const component = screen.getByText('component');
    const animation = getComputedStyle(
      component.parentElement as any
    ).animation;

    expect(animation).toBeTruthy();
  });
});
