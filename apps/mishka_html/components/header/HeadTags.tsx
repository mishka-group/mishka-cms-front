import type { NextPage } from 'next';
import Head from 'next/head';

interface HeadTagsTypes {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
  type?: string;
}

const HeadTags: NextPage<HeadTagsTypes> = ({ title, description, keywords, url, image, type = 'website' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link href={url} rel="canonical" />
        <base href={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="482" />
        <meta property="og:image:height" content="451" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
    </>
  );
};

export default HeadTags;
