export const SITE_URL = 'https://thelapisai.com.ng';
export const SITE_NAME = 'The Lapis AI';
export const LEGAL_NAME = 'The Lapis AI Limited';
export const ALTERNATE_NAME = 'Lapis AI';
export const SLOGAN = 'AI that keeps working and pays.';
export const FOUNDING_YEAR = '2022';
export const CONTACT_EMAIL = 'team@thelapisai.com.ng';

export const SITE_DESCRIPTION =
  'The Lapis AI builds and runs the AI systems behind growing businesses: more capacity without new hires, every lead answered in under 60 seconds, and AI that pays.';

export const LOCATION = {
  city: 'Lagos',
  region: 'Lagos',
  countryCode: 'NG',
  country: 'Nigeria',
  label: 'Lagos, Nigeria',
} as const;

export type PhoneLine = {
  country: string;
  countryCode: 'NG' | 'CA';
  display: string;
  e164: string;
  tel: string;
  whatsapp: string;
};

/** Both numbers take calls and WhatsApp messages. */
export const PHONE_LINES: PhoneLine[] = [
  {
    country: 'Nigeria',
    countryCode: 'NG',
    display: '+234 702 639 5253',
    e164: '+2347026395253',
    tel: 'tel:+2347026395253',
    whatsapp: 'https://wa.me/2347026395253',
  },
  {
    country: 'Canada',
    countryCode: 'CA',
    display: '+1 905 453 2345',
    e164: '+19054532345',
    tel: 'tel:+19054532345',
    whatsapp: 'https://wa.me/19054532345',
  },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/thelapisai',
  instagram: 'https://www.instagram.com/thelapisai',
  googleBusiness: 'https://www.google.com/search?kgmid=/g/11n4s0l8fk',
} as const;

export const SAME_AS = [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram, SOCIAL_LINKS.googleBusiness];

export const AREA_SERVED_LABEL = 'Nigeria and the rest of Africa, the UK, US, Canada and Europe';

/** Square brand logo used by structured data (Organization.logo). */
export const LOGO_PATH = '/logo-512.png';
export const DEFAULT_OG_IMAGE = '/og/default.jpg';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const DEFAULT_OG_TITLE = 'Grow without adding headcount, losing leads, or wasting money on AI.';

export type AuditTopic = 'capacity' | 'leads' | 'ai-spend' | 'training';

export const auditLink = (topic?: AuditTopic) => (topic ? `/contact?topic=${topic}` : '/contact');

/** Canonical absolute URL: the homepage keeps its slash, every other page has none. */
export const absoluteUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
