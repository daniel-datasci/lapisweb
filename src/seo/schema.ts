/**
 * JSON-LD builders. Every page emits one connected @graph: the Organization and WebSite
 * nodes (stable @ids) plus the page's own WebPage, BreadcrumbList and main entity.
 * Only facts that are visible on the site go in here.
 */
import { solutions } from '@/data/solutions';
import { services } from '@/data/services';
import { pricingTiers } from '@/data/pricing';
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

type PriceSpec = { price: string; unitCode?: string; description: string };

export type ServiceInput = {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  audience?: string;
  offers?: { name: string; description: string; price: string; specs?: PriceSpec[] }[];
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
  ...(offers?.length
    ? {
        offers: offers.map((o) => ({
          '@type': 'Offer',
          name: o.name,
          description: o.description,
          price: o.price,
          priceCurrency: 'USD',
          url: absoluteUrl('/pricing'),
          seller: orgRef,
          ...(o.specs?.length
            ? {
                priceSpecification: o.specs.map((s) => ({
                  '@type': 'UnitPriceSpecification',
                  price: s.price,
                  priceCurrency: 'USD',
                  description: s.description,
                  ...(s.unitCode
                    ? { referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: s.unitCode } }
                    : {}),
                })),
              }
            : {}),
        })),
      }
    : {}),
});

/** Turns "$2,790" into "2790". */
export const priceNumber = (price: string) => price.replace(/[^0-9.]/g, '');

const stripMarkup = (s: string) => s.replace(/\*/g, '');

type OfferInput = NonNullable<ServiceInput['offers']>[number];

/** An offer built from the current pricing tiers, or undefined for unpriced ("Custom") tiers. */
export const tierOffer = (tierName: string): OfferInput | undefined => {
  const tier = pricingTiers.find((t) => t.name === tierName);
  if (!tier || !/\d/.test(tier.price)) return undefined;
  const monthly = tier.tagline.match(/\$([\d,.]+)\/month/);
  const oneTime = priceNumber(tier.price);
  return {
    name: tier.name,
    description: stripMarkup(tier.tagline),
    price: oneTime,
    specs: monthly
      ? [
          { price: oneTime, description: 'One-time build' },
          { price: priceNumber(monthly[1]), unitCode: 'MON', description: 'Lapis Run, per month' },
        ]
      : undefined,
  };
};

export const PRICING_CATALOG_ID = `${absoluteUrl('/pricing')}#offers`;

export const pricingCatalogNode = (): JsonLdNode => ({
  '@type': 'OfferCatalog',
  '@id': PRICING_CATALOG_ID,
  name: `${SITE_NAME} pricing`,
  url: absoluteUrl('/pricing'),
  itemListElement: pricingTiers.map((t) => {
    const offer = tierOffer(t.name);
    return {
      '@type': 'Offer',
      name: t.name,
      description: stripMarkup(t.tagline),
      seller: orgRef,
      itemOffered: { '@type': 'Service', name: t.name, description: t.features.map(stripMarkup).join('; ') },
      ...(offer
        ? {
            price: offer.price,
            priceCurrency: 'USD',
            ...(offer.specs
              ? {
                  priceSpecification: offer.specs.map((s) => ({
                    '@type': 'UnitPriceSpecification',
                    price: s.price,
                    priceCurrency: 'USD',
                    description: s.description,
                    ...(s.unitCode
                      ? { referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: s.unitCode } }
                      : {}),
                  })),
                }
              : {}),
          }
        : {}),
    };
  }),
});
