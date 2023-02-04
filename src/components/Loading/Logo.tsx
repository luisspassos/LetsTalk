import { Img, keyframes } from '@chakra-ui/react';

const float = keyframes`
  0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-60px);
	}
	100% {
		transform: translatey(0px);
	}
`;

const animation = `${float} 4s ease-in-out infinite`;

export function Logo() {
  return (
    <Img
      height='85px'
      animation={animation}
      src='./images/favicon.svg'
      alt='Logo'
    />
  );
}
