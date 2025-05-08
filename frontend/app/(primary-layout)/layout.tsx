import { type ReactNode } from 'react';

import { Box, Container } from '@chakra-ui/react';

import Header from '@/src/components/header';

interface PrimaryLayoutProps {
  children: ReactNode;
}

const PrimaryLayout = (props: PrimaryLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />

      <Container as="main" maxW="100vw" p={0}>
        <Box maxW={{ base: 'full', xl: '80%' }} px={4} mx="auto">
          {children}
        </Box>
      </Container>
    </>
  );
};

export default PrimaryLayout;
