import { Heading, Stack, Text } from '@chakra-ui/react';

import StrapiImageBlock from '../strapi-image-block';

interface HeroSectionProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const HeroSection = (props: HeroSectionProps) => {
  const { src, alt, title, description } = props;

  return (
    <Stack gap={6}>
      <StrapiImageBlock
        src={src}
        alt={alt}
        ratio={21 / 9}
        style={{ borderRadius: '60px' }}
      />

      <Heading as="h1" size="5xl" textAlign="center">
        {title}
      </Heading>

      <Text>{description}</Text>
    </Stack>
  );
};

export default HeroSection;
