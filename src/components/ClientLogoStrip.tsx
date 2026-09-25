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

const logos = [
  { src: ayura, alt: 'Ayura' },
  { src: canwe, alt: 'Can We Talk' },
  { src: fire, alt: 'Firemaps' },
  { src: holistic, alt: 'Holistic Care' },
  { src: homest, alt: 'Homest Real Estate' },
  { src: krp, alt: 'KRP' },
  { src: mtn, alt: 'MTN' },
  { src: sound, alt: 'Sound' },
  { src: sup, alt: 'Sup' },
  { src: xfr, alt: 'XFR' },
];

export default function ClientLogoStrip({ label = 'Trusted by our clients' }: { label?: string }) {
  // The second copy only exists for the seamless marquee loop, so it is hidden from assistive tech.
  const items = [...logos.map((l) => ({ ...l, copy: false })), ...logos.map((l) => ({ ...l, copy: true }))];

  return (
    <section className="client-logo-strip">
      <div className="container">
        <p className="client-logo-label">{label}</p>
        <div className="client-logo-marquee">
          <div className="client-logo-track" role="list" aria-label="Client logos">
            {items.map((logo, index) => (
              <div
                className="client-logo-item"
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
      </div>
    </section>
  );
}
