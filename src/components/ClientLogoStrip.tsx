import ayura from '@/client_logos/Ayura.webp';
import canwe from '@/client_logos/canwe.webp';
import fire from '@/client_logos/fire.webp';
import holistic from '@/client_logos/holistic.webp';
import homest from '@/client_logos/Homest.webp';
import krp from '@/client_logos/krp.webp';
import mtn from '@/client_logos/mtn.webp';
import sound from '@/client_logos/sound.webp';
import sup from '@/client_logos/sup.webp';
import xfr from '@/client_logos/xfr.webp';
import './ClientLogoStrip.css';

/** `invert` flips logos that sit on a solid light badge so they read as light-on-dark;
 *  `badge` deepens a mid-tone disc so a white mark inside it stays legible in monochrome. */
const logos = [
  { src: ayura, alt: 'Ayura' },
  { src: canwe, alt: 'Can We Talk' },
  { src: fire, alt: 'Firemaps', tone: 'invert' },
  { src: holistic, alt: 'Holistic Care' },
  { src: homest, alt: 'Homest Real Estate' },
  { src: krp, alt: 'KRP' },
  { src: mtn, alt: 'MTN', tone: 'invert' },
  { src: sound, alt: 'Sound', tone: 'badge' },
  { src: sup, alt: 'Sup' },
  { src: xfr, alt: 'XFR' },
];

export default function ClientLogoStrip({ label = 'Trusted by our clients' }: { label?: string }) {
  // The second copy only exists for the seamless marquee loop, so it is hidden from assistive tech.
  const items = [...logos.map((l) => ({ ...l, copy: false })), ...logos.map((l) => ({ ...l, copy: true }))];

  return (
    <section className="client-logo-strip" aria-label={label}>
      <p className="sr-only">{label}</p>
      <div className="client-logo-marquee">
        <div className="client-logo-track" role="list" aria-label="Client logos">
          {items.map((logo, index) => (
            <div
              className={`client-logo-item${logo.tone ? ` client-logo-${logo.tone}` : ''}`}
              key={`${logo.alt}-${index}`}
              role={logo.copy ? undefined : 'listitem'}
              aria-hidden={logo.copy || undefined}
            >
              <img
                src={logo.src}
                alt={logo.copy ? '' : logo.alt}
                loading="lazy"
                decoding="async"
                width={144}
                height={144}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
