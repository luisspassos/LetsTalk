import NextLink from 'next/link';
import {
  Link,
  Icon,
  Text,
  LinkProps,
  useColorModeValue,
} from '@chakra-ui/react';
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
        color={useColorModeValue('gray.400', 'gray.200')}
        alignItems='center'
        gap='.3rem'
        d='inline-flex'
        w='min-content'
      >
        <Icon fontSize='1.5rem' as={BiArrowBack} />
        <Text whiteSpace='nowrap' fontSize='1.4rem'>
          {text}
        </Text>
      </Link>
    </NextLink>
  );
}
