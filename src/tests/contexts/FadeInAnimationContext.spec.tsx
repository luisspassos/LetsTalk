import { usePrefersReducedMotion } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { AuthContentPageWrapper } from '../../components/Auth/AuthContentPageWrapper';
import { FadeInAnimationProvider } from '../../contexts/FadeInAnimationContext';

jest.mock('@chakra-ui/react', () => {
  return {
    ...jest.requireActual('@chakra-ui/react'),
    usePrefersReducedMotion: jest.fn(),
  };
});

const usePrefersReducedMotionMock = mocked(usePrefersReducedMotion);

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        components: [1, 2, 3],
      };
    },
  };
});

function renderAnimation() {
  render(
    <FadeInAnimationProvider>
      <AuthContentPageWrapper>
        <div>component</div>
      </AuthContentPageWrapper>
    </FadeInAnimationProvider>
  );

  const component = screen.getByText('component');
  const animation = getComputedStyle(component.parentElement as any).animation;

  return { animation };
}

describe('fadeInAnimation context', () => {
  it('should return the animation if the route that was accessed was through a link', () => {
    const { animation } = renderAnimation();

    expect(animation).toBeTruthy();
  });

  it('should not have animation if usePrefersReducedMotion returns true', () => {
    usePrefersReducedMotionMock.mockReturnValue(true);

    const { animation } = renderAnimation();

    expect(animation).toBeFalsy();
  });
});
