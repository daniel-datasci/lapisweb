import { Helmet } from 'react-helmet-async';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SLOGAN,
  absoluteUrl,
} from '@/data/site';
import type { FaqItem } from '@/data/faqs';
import type { ShareImage } from '@/seo/routes';
import { ogImagePath } from '@/seo/og';
import {
  breadcrumbNode,
  organizationNode,
  webPageNode,
  websiteNode,
  type Crumb,
  type JsonLdNode,
  type PageType,
} from '@/seo/schema';

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, follow';
const TITLE_SUFFIX = ' | The Lapis AI';

const GOOGLE_VERIFICATION = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = import.meta.env.VITE_BING_SITE_VERIFICATION;

type Props = {
  title: string;
  description: string;
  path: string;
  /** Share-image text (from the route list); used for the image alt text. */
  og?: ShareImage;
  label?: string;
  /** Share title; defaults to the page title without the brand suffix. */
  ogTitle?: string;
  pageType?: PageType;
  /** Breadcrumb trail, starting at Home and ending at this page. */
  crumbs?: Crumb[];
  /** FAQs that are visible on the page. */
  faqs?: FaqItem[];
  article?: { published?: string; modified?: string; section?: string };
  /** Extra JSON-LD nodes for the page's main entity (Service, BlogPosting...). */
  schema?: JsonLdNode[];
  /** @id of the node the WebPage is mainly about. */
  mainEntityId?: string;
  noindex?: boolean;
};

const jsonLdString = (graph: JsonLdNode[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');

export default function Seo({
  title,
  description,
  path,
  og,
  ogTitle,
  pageType,
  crumbs,
  faqs,
  article,
  schema = [],
  mainEntityId,
  noindex = false,
}: Props) {
  const url = absoluteUrl(path);
  const image = absoluteUrl(ogImagePath(path));
  const imageAlt = `${SITE_NAME}: ${og?.headline ?? SLOGAN}`;
  const shareTitle = ogTitle ?? (title.endsWith(TITLE_SUFFIX) ? title.slice(0, -TITLE_SUFFIX.length) : title);
  const isArticle = Boolean(article);

  const graph: JsonLdNode[] = [
    organizationNode(),
    websiteNode(),
    webPageNode({
      path,
      title,
      description,
      image,
      imageAlt,
      pageType,
      crumbs,
      faqs,
      mainEntityId,
      datePublished: article?.published,
      dateModified: article?.modified ?? article?.published,
    }),
    ...(crumbs && crumbs.length > 1 ? [breadcrumbNode(crumbs, path)] : []),
    ...schema,
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX} />
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:title" content={shareTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content="en_NG" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_US" />
      {article?.published && <meta property="article:published_time" content={article.published} />}
      {article?.published && (
        <meta property="article:modified_time" content={article.modified ?? article.published} />
      )}
      {article?.section && <meta property="article:section" content={article.section} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={shareTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {GOOGLE_VERIFICATION && <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />}
      {BING_VERIFICATION && <meta name="msvalidate.01" content={BING_VERIFICATION} />}

      <script type="application/ld+json">{jsonLdString(graph)}</script>
    </Helmet>
  );
}
