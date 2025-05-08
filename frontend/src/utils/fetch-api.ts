/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';

interface StrapiData {
  id: number;
  [key: string]: any;
}

interface StrapiResponse {
  data: StrapiData | StrapiData[];
}

export function spreadStrapiData(data: StrapiResponse): StrapiData | null {
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data[0];
  }
  if (!Array.isArray(data.data)) {
    return data.data;
  }
  return null;
}

export default async function fetchContentType(
  contentType: string,
  params: Record<string, unknown> = {},
  spreadData?: boolean
): Promise<any> {
  try {
    const queryParams = { ...params };

    const url = new URL(`api/${contentType}`, process.env.NEXT_PUBLIC_API_URL);

    const response = await fetch(`${url.href}?${qs.stringify(queryParams)}`, {
      method: 'GET',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi (url=${url.toString()}, status=${
          response.status
        })`
      );
    }

    const jsonData: StrapiResponse = await response.json();

    return spreadData ? spreadStrapiData(jsonData) : jsonData;
  } catch (error) {
    console.error('FetchContentTypeError', error);
  }
}
