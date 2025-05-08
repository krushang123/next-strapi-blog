'use client';

import { ReactNode } from 'react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

interface ProviderProps {
  children: ReactNode;
}

const Provider = (props: ProviderProps) => {
  const { children } = props;

  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
};

export default Provider;
