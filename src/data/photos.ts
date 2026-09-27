/**
 * Graded stock photography (Unsplash License; see CREDITS.md), plus the owner-supplied Home hero artwork
 * (tone-matched only). Files live in public/images/photos as <name>-<width>.webp. To swap a photo, export
 * new files with the same names and widths (scripts/grade-photo.mjs).
 */

export type PhotoSource = { w: number; h: number };

export const photoSources = {
  'about-hands': [{ w: 640, h: 267 }, { w: 1280, h: 533 }],
  'about-office': [{ w: 400, h: 400 }, { w: 800, h: 800 }],
  'about-portrait': [{ w: 400, h: 400 }, { w: 800, h: 800 }],
  'final-cta': [{ w: 960, h: 533 }, { w: 1600, h: 889 }, { w: 2400, h: 1333 }],
  'forest-fill': [{ w: 1280, h: 854 }, { w: 2400, h: 1601 }],
  'forest-floor': [{ w: 1280, h: 533 }, { w: 2400, h: 1000 }],
  'forest-mist': [{ w: 480, h: 672 }, { w: 960, h: 1344 }],
  'hero-404': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-about': [{ w: 960, h: 640 }, { w: 1600, h: 1067 }, { w: 2400, h: 1601 }],
  'hero-blog': [{ w: 960, h: 540 }, { w: 1600, h: 900 }],
  'hero-cases': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-contact': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-grow': [{ w: 960, h: 640 }, { w: 1600, h: 1067 }, { w: 2400, h: 1600 }],
  'hero-how': [{ w: 960, h: 640 }, { w: 1600, h: 1067 }, { w: 2400, h: 1600 }],
  'hero-industries': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-lead': [{ w: 960, h: 672 }, { w: 1600, h: 1120 }, { w: 2400, h: 1680 }],
  'hero-pay': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-pricing': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-services': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 2400, h: 1350 }],
  'hero-solutions': [{ w: 960, h: 640 }, { w: 1600, h: 1067 }, { w: 2400, h: 1600 }],
  'home-hero': [{ w: 960, h: 540 }, { w: 1600, h: 900 }, { w: 1920, h: 1080 }],
  'how-we-work': [{ w: 960, h: 640 }, { w: 1600, h: 1067 }, { w: 2400, h: 1600 }],
} as const satisfies Record<string, readonly PhotoSource[]>;

export type PhotoName = keyof typeof photoSources;

export const photoSrc = (name: PhotoName, w: number) => `/images/photos/${name}-${w}.webp`;

export function photoSet(name: PhotoName) {
  const list = photoSources[name];
  const largest = list[list.length - 1];
  const middle = list[Math.min(1, list.length - 1)];
  return {
    src: photoSrc(name, middle.w),
    srcSet: list.map((s) => `${photoSrc(name, s.w)} ${s.w}w`).join(', '),
    width: largest.w,
    height: largest.h,
  };
}
