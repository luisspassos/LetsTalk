import { Button, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type TestProps = {
  timestamp: number;
};

export default function Test({ timestamp }: TestProps) {
  const router = useRouter();

  async function handle() {
    await router.push('/');
  }

  useEffect(() => {
    console.log(timestamp);
  }, [timestamp]);

  return (
    <>
      <Heading>Test</Heading>
      <Button onClick={handle} colorScheme='pink'>
        Voltar para a home
      </Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      timestamp: Date.now(),
    },
  };
};
