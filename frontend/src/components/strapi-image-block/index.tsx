import { strapiImage } from '@/src/utils/strapi-image';
import { AspectRatio } from '@chakra-ui/react';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface StrapiImageBlockProps {
  src: string;
  alt: string;
  ratio: number;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
}

const StrapiImageBlock = (props: StrapiImageBlockProps) => {
  const { src, alt, ratio, width = 'full', height = 'full', style } = props;

  const strapiImageUrl = strapiImage(src);

  return (
    <AspectRatio w={width} h={height} ratio={ratio}>
      <Image src={strapiImageUrl} alt={alt} fill style={style} />
    </AspectRatio>
  );
};

export default StrapiImageBlock;
