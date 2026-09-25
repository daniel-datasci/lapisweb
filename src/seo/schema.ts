/**
 * JSON-LD builders. Every page emits one connected @graph: the Organization and WebSite
 * nodes (stable @ids) plus the page's own WebPage, BreadcrumbList and main entity.
 * Only facts that are visible on the site go in here.
 */
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import {
  EXTRA_WORKER,
  PRICING_NOTE,
  aiWorkforce,
  extras,
  leadDesk,
  formatPrice,
  type Extra,
  type Money,
  type Product,
} from '@/data/pricing';
import type { FaqItem } from '@/data/faqs';
import {
  ALTERNATE_NAME,
  CONTACT_EMAIL,
  FOUNDING_YEAR,
  LEGAL_NAME,
  LOCATION,
  LOGO_PATH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PHONE_LINES,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SLOGAN,
  absoluteUrl,
} from '@/data/site';

export type JsonLdNode = Record<string, unknown>;
export type Crumb = { name: string; path: string };

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

export const orgRef = { '@id': ORG_ID };
export const webpageId = (path: string) => `${absoluteUrl(path)}#webpage`;
export const serviceId = (path: string) => `${absoluteUrl(path)}#service`;

export const AREA_SERVED: JsonLdNode[] = [
  { '@type': 'Country', name: 'Nigeria' },
  { '@type': 'Continent', name: 'Africa' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Continent', name: 'Europe' },
];

const KNOWS_ABOUT = [
  'Artificial intelligence',
  'AI consulting',
  'AI strategy',
  'AI automation',
  'Business process automation',
  'AI agents',
  'Agentic workflows',
  'AI lead response',
  'WhatsApp automation',
  'Lead qualification',
  'AI infrastructure',
  'Data pipelines',
  'AI governance',
  'AI training',
  'Business analytics',
  'AI return on investment',
  'Managed AI services',
  'AI workers',
];

const catalogItem = (name: string, path: string, description: string) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', '@id': serviceId(path), name, url: absoluteUrl(path), description },
});

export const organizationNode = (): JsonLdNode => ({
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  alternateName: ALTERNATE_NAME,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    '@id': LOGO_ID,
    url: `${SITE_URL}${LOGO_PATH}`,
    contentUrl: `${SITE_URL}${LOGO_PATH}`,
    width: 512,
    height: 512,
    caption: SITE_NAME,
  },
  image: { '@id': LOGO_ID },
  description: SITE_DESCRIPTION,
  slogan: SLOGAN,
  foundingDate: FOUNDING_YEAR,
  email: CONTACT_EMAIL,
  telephone: PHONE_LINES[0].e164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.region,
    addressCountry: LOCATION.countryCode,
  },
  contactPoint: PHONE_LINES.map((line) => ({
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: line.e164,
    email: CONTACT_EMAIL,
    areaServed: line.countryCode,
    availableLanguage: ['en'],
  })),
  areaServed: AREA_SERVED,
  sameAs: SAME_AS,
  knowsAbout: KNOWS_ABOUT,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI solutions and services',
    itemListElement: [
      ...solutions.map((s) => catalogItem(s.name, s.path, s.navDescription)),
      ...services.map((s) => catalogItem(s.name, s.path, s.seoDescription)),
    ],
  },
});

export const websiteNode = (): JsonLdNode => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: ALTERNATE_NAME,
  description: SITE_DESCRIPTION,
  publisher: orgRef,
  inLanguage: 'en',
});

export const breadcrumbNode = (crumbs: Crumb[], path: string): JsonLdNode => ({
  '@type': 'BreadcrumbList',
  '@id': `${absoluteUrl(path)}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const itemListId = (path: string) => `${absoluteUrl(path)}#list`;

/** The list a collection page (solutions, services, industries, case studies, blog) is about. */
export const itemListNode = (path: string, name: string, items: { name: string; path: string }[]): JsonLdNode => ({
  '@type': 'ItemList',
  '@id': itemListId(path),
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    url: absoluteUrl(item.path),
  })),
});
export const faqEntities = (faqs: FaqItem[]) =>
  faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ItemPage';

export type WebPageInput = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  pageType?: PageType;
  crumbs?: Crumb[];
  faqs?: FaqItem[];
  /** @id of the page's main entity (Service, BlogPosting, Article...). */
  mainEntityId?: string;
  datePublished?: string;
  dateModified?: string;
};

export const webPageNode = ({
  path,
  title,
  description,
  image,
  imageAlt,
  pageType = 'WebPage',
  crumbs,
  faqs,
  mainEntityId,
  datePublished,
  dateModified,
}: WebPageInput): JsonLdNode => {
  const type = faqs?.length ? (pageType === 'WebPage' ? 'FAQPage' : [pageType, 'FAQPage']) : pageType;
  return {
    '@type': type,
    '@id': webpageId(path),
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: faqs?.length && mainEntityId ? { '@id': mainEntityId } : orgRef,
    publisher: orgRef,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image,
      contentUrl: image,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      caption: imageAlt,
    },
    ...(crumbs?.length ? { breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` } } : {}),
    ...(mainEntityId && !faqs?.length ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(faqs?.length ? { mainEntity: faqEntities(faqs) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
};

export type ServiceInput = {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  audience?: string;
  /** Offer nodes from the price book (see `offersFor`). */
  offers?: JsonLdNode[];
};

export const serviceNode = ({ path, name, description, serviceType, audience, offers }: ServiceInput): JsonLdNode => ({
  '@type': 'Service',
  '@id': serviceId(path),
  name,
  description,
  serviceType,
  url: absoluteUrl(path),
  provider: orgRef,
  brand: orgRef,
  areaServed: AREA_SERVED,
  mainEntityOfPage: { '@id': webpageId(path) },
  ...(audience ? { audience: { '@type': 'BusinessAudience', audienceType: audience } } : {}),
  ...(offers?.length ? { offers } : {}),
});

/* ---------- Price book offers ---------- */

const PRICING_URL = absoluteUrl('/pricing');
const offerId = (id: string) => `${PRICING_URL}#offer-${id}`;

const perMonth = { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' };

/** Monthly fee in USD. `from` makes it a starting price. */
const monthlySpecs = (m: Money, label: string, from = false): JsonLdNode[] => [
  {
    '@type': 'UnitPriceSpecification',
    ...(from ? { minPrice: m.usd } : { price: m.usd }),
    priceCurrency: 'USD',
    unitCode: 'MON',
    referenceQuantity: perMonth,
    valueAddedTaxIncluded: false,
    description: `${label}${from ? ', from' : ''}, per month.`,
  },
];

/** One-off fee (or fee range) in USD. */
const oneOffSpecs = (m: Money, label: string, max?: Money): JsonLdNode[] => [
  {
    '@type': 'PriceSpecification',
    ...(max ? { minPrice: m.usd, maxPrice: max.usd } : { price: m.usd }),
    priceCurrency: 'USD',
    valueAddedTaxIncluded: false,
    description: `${label}.`,
  },
];

type OfferInput = {
  id: string;
  name: string;
  description: string;
  anchor: string;
  category: string;
  specs: JsonLdNode[];
  /** Headline USD price, when the offer has a single fixed price. */
  usdPrice?: number;
};

const offerNode = ({ id, name, description, anchor, category, specs, usdPrice }: OfferInput): JsonLdNode => ({
  '@type': 'Offer',
  '@id': offerId(id),
  name,
  description,
  category,
  url: `${PRICING_URL}#${anchor}`,
  seller: orgRef,
  ...(usdPrice !== undefined ? { price: usdPrice, priceCurrency: 'USD' } : {}),
  priceSpecification: specs,
  itemOffered: { '@type': 'Service', name, description, provider: orgRef },
});

const planOffers = (product: Product): JsonLdNode[] =>
  (product.tiers ?? []).map((tier) =>
    offerNode({
      id: tier.id,
      name: `${product.name} ${tier.name}`,
      description: `${tier.summary} ${tier.features.join('; ')}. Onboarding: ${
        tier.onboarding ? formatPrice(tier.onboarding) : tier.onboardingText
      }.`,
      anchor: product.anchor,
      category: 'Subscription',
      usdPrice: tier.from ? undefined : tier.monthly.usd,
      specs: [
        ...monthlySpecs(tier.monthly, `${product.name} ${tier.name} subscription`, tier.from),
        ...(tier.onboarding ? oneOffSpecs(tier.onboarding, 'One-off onboarding fee, billed at signing') : []),
      ],
    }),
  );

const extraOffer = (e: Extra, anchor = 'projects'): JsonLdNode | undefined => {
  if (!e.price) return undefined;
  const monthly = e.cadence === 'month';
  return offerNode({
    id: e.id,
    name: e.name,
    description: e.description,
    anchor,
    category: e.kind,
    usdPrice: e.maxPrice ? undefined : e.price.usd,
    specs: monthly
      ? monthlySpecs(e.price, e.name)
      : oneOffSpecs(e.price, e.cadence === 'conversation' ? `${e.name}, per conversation` : `${e.name}, one-off fee`, e.maxPrice),
  });
};

const extraWorkerOffer = (): JsonLdNode =>
  offerNode({
    id: 'extra-ai-worker',
    name: 'Extra AI worker',
    description: 'An additional AI worker on any AI Workforce tier.',
    anchor: 'ai-workforce',
    category: 'Add-on',
    usdPrice: EXTRA_WORKER.usd,
    specs: monthlySpecs(EXTRA_WORKER, 'Extra AI worker'),
  });

const extraById = (id: string) => {
  const e = extras.find((x) => x.id === id);
  return e ? extraOffer(e) : undefined;
};

export type OfferGroup = 'lead-desk' | 'ai-workforce' | 'audit' | 'ai-rescue' | 'fractional-head-of-ai' | 'market-watch' | 'workshop';

/** Offer nodes for the products a page describes. */
export const offersFor = (...groups: OfferGroup[]): JsonLdNode[] =>
  groups.flatMap((g) => {
    if (g === 'lead-desk') return planOffers(leadDesk);
    if (g === 'ai-workforce') return [...planOffers(aiWorkforce), extraWorkerOffer()];
    const node = extraById(g);
    return node ? [node] : [];
  });

export const PRICING_CATALOG_ID = `${PRICING_URL}#offers`;

export const pricingCatalogNode = (): JsonLdNode => ({
  '@type': 'OfferCatalog',
  '@id': PRICING_CATALOG_ID,
  name: `${SITE_NAME} pricing: AI workers on subscription`,
  description: PRICING_NOTE,
  url: PRICING_URL,
  itemListElement: [
    {
      '@type': 'OfferCatalog',
      name: leadDesk.name,
      description: leadDesk.blurb,
      url: `${PRICING_URL}#lead-desk`,
      itemListElement: planOffers(leadDesk),
    },
    {
      '@type': 'OfferCatalog',
      name: aiWorkforce.name,
      description: aiWorkforce.blurb,
      url: `${PRICING_URL}#ai-workforce`,
      itemListElement: [...planOffers(aiWorkforce), extraWorkerOffer()],
    },
    {
      '@type': 'OfferCatalog',
      name: 'Projects, retainers and add-ons',
      url: `${PRICING_URL}#projects`,
      itemListElement: extras.map((e) => extraOffer(e)).filter((n): n is JsonLdNode => !!n),
    },
  ],
});
