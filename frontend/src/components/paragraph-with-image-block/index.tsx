import { Stack, Text, Heading } from '@chakra-ui/react';
import StrapiImageBlock from '../strapi-image-block';

interface ParagraphWithImageProps {
  title: string;
  description: string;
  src: string;
  alt: string;
  reversed?: boolean;
  imageLandscape?: boolean;
}

const ParagraphWithImageBlock = (props: ParagraphWithImageProps) => {
  const {
    title,
    description,
    src,
    alt,
    reversed = false,
    imageLandscape = true,
  } = props;

  return (
    <Stack gap={6}>
      <Heading as="h3" size="2xl">
        {title}
      </Heading>

      <Stack
        direction={{ base: 'column', md: reversed ? 'row-reverse' : 'row' }}
        gap={10}
      >
        <StrapiImageBlock
          src={src}
          alt={alt}
          ratio={imageLandscape ? 1.85 / 1 : 1 / 1}
          height="auto"
          style={{ borderRadius: '10px', objectFit: 'cover' }}
        />

        <Text whiteSpace="pre-line">{description}</Text>
      </Stack>
    </Stack>
  );
};

export default ParagraphWithImageBlock;
