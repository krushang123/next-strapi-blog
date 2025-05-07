import { AspectRatio, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import NextImage from 'next/image';
import fetchContentType from '@/src/utils/fetch-api';
import { strapiImage } from '@/src/utils/strapi-image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Image {
  id: string;
  documentId: string;
  url: string;
  alternativeText: string;
}

interface Blog {
  id: string;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image;
  content: unknown[];
}

const BlogPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  console.log('🚀 ~ BlogPage ~ params:', slug);

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
          'blocks.heading': {
            populate: true,
          },
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

  const blog = await fetchContentType(`blogs`, urlParamsObject, false);
  console.log('🚀 ~ BlogPage ~ blogs:', blog);

  const { data } = blog;

  const { image, title, description } = data[0] as Blog;

  const strapiImageUrl = strapiImage(image.url);

  return (
    <Stack p={10} gap={20}>
      <Stack gap={6}>
        <AspectRatio maxW="full" ratio={21 / 9}>
          <NextImage
            src={strapiImageUrl}
            alt={image.alternativeText}
            fill
            style={{ borderRadius: '60px' }}
          />
        </AspectRatio>

        <Heading as="h1" size="5xl" textAlign="center">
          {title}
        </Heading>

        <Text>{description}</Text>
      </Stack>

      <Stack gap={6}>
        <Heading as="h3" size="4xl">
          Heading 2
        </Heading>

        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
          recusandae? Rerum id dolorem quasi eos minus ea iste dignissimos
          impedit dolore! Earum saepe reprehenderit velit officia voluptate
          laboriosam at nemo ipsam eius quae sapiente quaerat sed numquam neque
          praesentium similique sit voluptatibus corrupti, perspiciatis
          aspernatur pariatur cum. Sequi, exercitationem aperiam.
        </Text>
      </Stack>

      <AspectRatio w="full" h="20rem" ratio={21 / 9}>
        <NextImage
          src={strapiImageUrl}
          alt={image.alternativeText}
          fill
          style={{ borderRadius: '10px' }}
        />
      </AspectRatio>

      <Stack gap={6}>
        <Heading as="h3" size="4xl">
          Heading
        </Heading>

        <Stack direction="row" gap={20}>
          <AspectRatio w="full" ratio={1.85 / 1}>
            <NextImage
              src={strapiImageUrl}
              alt={image.alternativeText}
              fill
              style={{ borderRadius: '10px' }}
            />
          </AspectRatio>

          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            recusandae? Rerum id dolorem quasi eos minus ea iste dignissimos
            impedit dolore! Earum saepe reprehenderit velit officia voluptate
            laboriosam at nemo ipsam eius quae sapiente quaerat sed numquam
            neque praesentium similique sit voluptatibus corrupti, perspiciatis
            aspernatur pariatur cum. Sequi, exercitationem aperiam.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BlogPage;
