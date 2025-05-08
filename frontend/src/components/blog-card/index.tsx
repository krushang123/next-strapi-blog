import NextLink from 'next/link';
import { Card, Link as ChakraLink } from '@chakra-ui/react';

import AuthorInfo from '../author-info';
import StrapiImageBlock from '../strapi-image-block';

interface BlogCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  slug: string;
  authorName: string;
  publishedAt: string;
}

const BlogCard = (props: BlogCardProps) => {
  const {
    imageUrl,
    imageAlt,
    title,
    description,
    authorName,
    publishedAt,
    slug,
  } = props;

  return (
    <ChakraLink asChild _hover={{ textDecoration: 'none' }}>
      <NextLink href={slug}>
        <Card.Root w="full" overflow="hidden">
          <StrapiImageBlock
            height={400}
            src={imageUrl}
            alt={imageAlt}
            ratio={1 / 1}
          />

          <Card.Body gap="2">
            <Card.Title fontSize="2xl" lineClamp={2}>
              {title}
            </Card.Title>

            <Card.Description lineClamp={3}>{description}</Card.Description>
          </Card.Body>

          <Card.Footer>
            <AuthorInfo name={authorName} publishedAt={publishedAt} />
          </Card.Footer>
        </Card.Root>
      </NextLink>
    </ChakraLink>
  );
};

export default BlogCard;
