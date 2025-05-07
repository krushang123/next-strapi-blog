import { Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

const Header = () => (
  <Stack
    as="header"
    maxW="full"
    mx="auto"
    p={4}
    pos="sticky"
    top={0}
    right={0}
    left={0}
    zIndex="sticky"
    bgColor="teal"
  >
    <Flex justify="space-between">
      <Stack gap={2} direction="row" align="center">
        <Heading as="h1" color="white">
          Blog Page
        </Heading>
      </Stack>
    </Flex>
  </Stack>
);

export default Header;
