import { Heading, Stack, Text } from '@chakra-ui/react';

interface ParagraphProps {
  title: string;
  description: string;
}

const ParagraphBlock = (props: ParagraphProps) => {
  const { title, description } = props;

  return (
    <Stack gap={6}>
      <Heading as="h3" size="2xl">
        {title}
      </Heading>

      <Text>{description}</Text>
    </Stack>
  );
};

export default ParagraphBlock;
