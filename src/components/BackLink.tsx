import NextLink from 'next/link';
import { Link, Icon, Text, LinkProps } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';

type BackLinkProps = {
  route: string;
  text: string;
} & LinkProps;

export function BackLink({ route, text, ...rest }: BackLinkProps) {
  return (
    <NextLink href={route} passHref>
      <Link
        boxShadow={0}
        {...rest}
        color='gray.400'
        d='flex'
        alignItems='center'
        gap='.3rem'
      >
        <Icon fontSize='1.5rem' as={BiArrowBack} />
        <Text fontSize='1.4rem'>{text}</Text>
      </Link>
    </NextLink>
  );
}
