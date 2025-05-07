import { Card } from '@chakra-ui/react';
import NextImage from 'next/image';
import AuthorInfo from './author-info';
import { strapiImage } from '../utils/strapi-image';

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
  const { imageUrl, imageAlt, title, description, authorName, publishedAt } =
    props;

  const strapiImageUrl = strapiImage(imageUrl);

  return (
    <Card.Root w="auto" overflow="hidden">
      <NextImage src={strapiImageUrl} alt={imageAlt} width={700} height={500} />

      <Card.Body gap="2">
        <Card.Title fontSize="2xl" lineClamp={2}>
          {title}
        </Card.Title>

        <Card.Description lineClamp={3}>{description}</Card.Description>
      </Card.Body>

      <Card.Footer gap="2">
        <AuthorInfo name={authorName} publishedAt={publishedAt} />
      </Card.Footer>
    </Card.Root>
  );
};

export default BlogCard;
