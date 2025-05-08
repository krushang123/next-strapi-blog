import { Stack } from '@chakra-ui/react';

import fetchContentType from '@/src/utils/fetch-api';
import { strapiImage } from '@/src/utils/strapi-image';
import HeroSection from '@/src/components/hero-section';
import StrapiImageBlock from '@/src/components/strapi-image-block';
import ParagraphWithImageBlock from '@/src/components/paragraph-with-image-block';
import ParagraphBlock from '@/src/components/paragraph-block';

interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}

interface FullImageBlock {
  __component: 'blocks.full-image';
  id: number;
  image: Image;
}

interface ParagraphWithImageBlock {
  __component: 'blocks.paragraph-with-image';
  id: number;
  content: string;
  heading: string;
  reversed: boolean;
  image_landscape: boolean;
  image: Image;
}
interface ParagraphBlock {
  __component: 'blocks.paragraph';
  id: number;
  content: string;
  heading: string;
}

type BlogContentBlock =
  | FullImageBlock
  | ParagraphWithImageBlock
  | ParagraphBlock;

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
  content: BlogContentBlock[];
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

async function getBlog(slug: string) {
  const urlParamsObject = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: ['url', 'alternativeText'],
      },
      content: {
        on: {
          'blocks.paragraph-with-image': {
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
            },
          },
          'blocks.paragraph': {
            populate: true,
          },
          'blocks.full-image': {
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
            },
          },
        },
      },
    },
  };

  const blog: BlogApiResponse = await fetchContentType(
    'blogs',
    urlParamsObject,
    false
  );

  return blog.data[0];
}

export async function generateStaticParams() {
  const urlParamsObject = {};

  const blogs: BlogApiResponse = await fetchContentType(
    'blogs',
    urlParamsObject,
    false
  );

  return blogs.data.map((blog: Blog) => ({ slug: blog.slug }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  const { title, description, image, content } = blog;
  const strapiImageUrl = strapiImage(image.url);

  return (
    <Stack p={10} gap={20}>
      <HeroSection
        title={title}
        description={description}
        src={strapiImageUrl}
        alt={image.alternativeText}
      />

      {content.map((block) => {
        switch (block.__component) {
          case 'blocks.full-image':
            return (
              <StrapiImageBlock
                key={block.id}
                height="20rem"
                src={block.image.url}
                alt={block.image.alternativeText}
                ratio={21 / 9}
                style={{ borderRadius: '10px', objectPosition: 'center' }}
              />
            );
          case 'blocks.paragraph-with-image':
            return (
              <ParagraphWithImageBlock
                key={block.id}
                title={block.heading}
                description={block.content}
                src={block.image.url}
                alt={block.image.alternativeText}
                reversed={block.reversed}
                imageLandscape={block.image_landscape}
              />
            );
          case 'blocks.paragraph':
            return (
              <ParagraphBlock
                key={block.id}
                title={block.heading}
                description={block.content}
              />
            );
          default:
            return null;
        }
      })}
    </Stack>
  );
}
