export const SITE_URL = 'https://thelapisai.com.ng';
export const OG_IMAGE = `${SITE_URL}/og-back.png`;
export const CONTACT_EMAIL = 'team@thelapisai.com.ng';

export const DEFAULT_OG_TITLE = 'Grow without adding headcount, losing leads, or wasting money on AI.';

export type AuditTopic = 'capacity' | 'leads' | 'ai-spend' | 'training';

export const auditLink = (topic?: AuditTopic) => (topic ? `/contact?topic=${topic}` : '/contact');

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Lapis AI',
  legalName: 'The Lapis AI Limited',
  url: SITE_URL,
  logo: OG_IMAGE,
  email: CONTACT_EMAIL,
  description:
    'The Lapis AI builds and runs the AI systems behind growing teams: more capacity, every lead answered, and AI that pays.',
  areaServed: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United Kingdom', 'United States', 'Canada', 'European Union'],
};

export const serviceLd = (name: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: `${SITE_URL}${path}`,
  provider: { '@type': 'Organization', name: 'The Lapis AI', url: SITE_URL },
  areaServed: organizationLd.areaServed,
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
  })),
});