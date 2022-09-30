import type { NextPage } from 'next';
import Head from 'next/head';
const MainHead: NextPage = () => {
  return (
    <>
      <Head>
        <title>MishkaCMS NextJS</title>
        <meta name="description" content="This is a test description from mishka cms" />
        <meta name="keywords" content="cms, mishka, elixir, nextjs" />
        <base href="http://localhost:3000/" />
        <link href="http://localhost:3000/" rel="canonical" />
        <meta property="og:image" content="http://localhost:4000/images/mylogo.png" />
        <meta property="og:image:width" content="482" />
        <meta property="og:image:height" content="451" />
        <meta property="og:title" content="This is a test title" />
        <meta property="og:description" content="This is a test description" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:4000/" />
        <meta name="twitter:image" content="http://localhost:4000/images/mylogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="http://localhost:4000/" />
        <meta name="twitter:title" content="This is a test title" />
        <meta name="twitter:description" content="This is a test description" />
      </Head>
    </>
  );
};

export default MainHead;
