import { Helmet } from 'react-helmet-async';
import { OG_IMAGE, SITE_URL } from '@/data/site';

type Props = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  type?: 'website' | 'article';
  jsonLd?: object | object[];
  article?: { publishedTime: string; section: string };
};

export default function Seo({ title, description, path, ogTitle, type = 'website', jsonLd, article }: Props) {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const shareTitle = ogTitle ?? title;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={shareTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:site_name" content="The Lapis AI" />
      <meta property="og:locale" content="en_NG" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={shareTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article && <meta property="article:author" content="The Lapis AI" />}
      {article && <meta property="article:section" content={article.section} />}
      {ld.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
