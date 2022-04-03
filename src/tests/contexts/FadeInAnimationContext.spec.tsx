import { render, screen } from '@testing-library/react';
import { AuthContentPageWrapper } from '../../components/Auth/AuthContentPageWrapper';
import { FadeInAnimationProvider } from '../../contexts/FadeInAnimationContext';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        components: [1, 2, 3],
      };
    },
  };
});

describe('fadeInAnimation context', () => {
  it('should return the animation if the route that was accessed was through a link', () => {
    render(
      <FadeInAnimationProvider>
        <AuthContentPageWrapper>
          <div>component</div>
        </AuthContentPageWrapper>
      </FadeInAnimationProvider>
    );

    const component = screen.getByText('component');
    const animation = getComputedStyle(
      component.parentElement as any
    ).animation;

    expect(animation).toBeTruthy();
  });
});
