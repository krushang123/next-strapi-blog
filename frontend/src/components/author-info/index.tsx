import { formatDate } from '@/src/utils/format-date';
import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

interface AuthorInfoProps {
  name: string;
  publishedAt: string;
}

const AuthorInfo = (props: AuthorInfoProps) => {
  const { name, publishedAt } = props;

  return (
    <HStack gap="4">
      <Avatar.Root>
        <Avatar.Fallback name={name} />
        <Avatar.Image src={name} />
      </Avatar.Root>

      <Stack gap="0">
        <Text fontWeight="medium">{name}</Text>
        <Text color="fg.muted" textStyle="sm">
          {formatDate(publishedAt)}
        </Text>
      </Stack>
    </HStack>
  );
};

export default AuthorInfo;
