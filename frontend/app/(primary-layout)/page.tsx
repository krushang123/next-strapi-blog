import BlogCard from '@/src/components/blog-card';
import fetchContentType from '@/src/utils/fetch-api';
import { Box, SimpleGrid } from '@chakra-ui/react';

// Image asset
export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

// Heading block
export interface HeadingBlock {
  __component: 'blocks.heading';
  id: number;
  heading: string;
}

// Paragraph + Image block
export interface ParagraphWithImageBlock {
  __component: 'blocks.paragraph-with-image';
  id: number;
  content: string;
  reversed: boolean;
  image_landscape: boolean;
  image: Image;
}

// Dynamic zone content block union
export type BlogContentBlock = HeadingBlock | ParagraphWithImageBlock;

// Blog post object
export interface Blog {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  content: BlogContentBlock[];
}

// Pagination info
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Full API response type
export interface BlogApiResponse {
  data: Blog[];
  meta: {
    pagination: Pagination;
  };
}

export default async function Home() {
  const urlParamsObject = {
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
    },
  };

  const blogs = await fetchContentType('blogs', urlParamsObject, false);

  console.log('🚀 ~ Home ~ articles:', blogs);

  return (
    <Box p={10}>
      <SimpleGrid columns={3} gap={6}>
        {blogs.data.map((blog: Blog) => (
          <BlogCard
            key={blog.id}
            imageUrl={blog.image.url}
            imageAlt={blog.image.alternativeText}
            title={blog.title}
            description={blog.description}
            slug={blog.slug}
            authorName={blog.author}
            publishedAt={blog.createdAt}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
