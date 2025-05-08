import BlogCard from '@/src/components/blog-card';
import fetchContentType from '@/src/utils/fetch-api';
import { Box, SimpleGrid } from '@chakra-ui/react';

interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

interface Blog {
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
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface BlogApiResponse {
  data: Blog[];
  meta: {
    pagination: Pagination;
  };
}

async function getBlogs() {
  const urlParamsObject = {
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
    },
    sort: ['createdAt:desc'],
  };

  const res: BlogApiResponse = await fetchContentType(
    'blogs',
    urlParamsObject,
    false
  );

  const { data } = res;

  return data;
}

export default async function HomePage() {
  const blogs = await getBlogs();

  return (
    <Box p={{ base: 4, sm: 10 }}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap={6}
        alignItems="start"
      >
        {blogs.map((blog) => (
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
