import { Box, Container, SkipNavContent, SkipNavLink } from '@chakra-ui/react';
import { type ReactNode } from 'react';
import Header from '@/src/components/header';

interface PrimaryLayoutProps {
  children: ReactNode;
}

const PrimaryLayout = (props: PrimaryLayoutProps) => {
  const { children } = props;

  console.log('primary layout');

  return (
    <>
      <SkipNavLink id="skip-nav" zIndex="skipLink" color="black">
        Skip to Content
      </SkipNavLink>

      <Header />

      <Container as="main" maxW="100vw" p={0}>
        <SkipNavContent id="skip-nav" />

        <Box id="content" maxW={{ base: 'full', xl: '80%' }} px={4} mx="auto">
          {children}
        </Box>
      </Container>
    </>
  );
};

export default PrimaryLayout;
