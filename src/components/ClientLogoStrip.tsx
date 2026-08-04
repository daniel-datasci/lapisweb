import ayura from '@/client_logos/Ayura.png';
import canwe from '@/client_logos/canwe.png';
import fire from '@/client_logos/fire.png';
import holistic from '@/client_logos/holistic.png';
import homest from '@/client_logos/Homest.png';
import krp from '@/client_logos/krp.png';
import mtn from '@/client_logos/mtn.png';
import sound from '@/client_logos/sound.png';
import sup from '@/client_logos/sup.png';
import xfr from '@/client_logos/xfr.png';
import './ClientLogoStrip.css';

const logos = [
  { src: ayura, alt: 'Ayura' },
  { src: canwe, alt: 'Canwe' },
  { src: fire, alt: 'Fire' },
  { src: holistic, alt: 'Holistic' },
  { src: homest, alt: 'Homest' },
  { src: krp, alt: 'KRP' },
  { src: mtn, alt: 'MTN' },
  { src: sound, alt: 'Sound' },
  { src: sup, alt: 'Sup' },
  { src: xfr, alt: 'XFR' },
];

export default function ClientLogoStrip() {
  const items = [...logos, ...logos];

  return (
    <section className="client-logo-strip">
      <div className="container">
        <p className="client-logo-label">TRUSTED BY OUR CLIENTS</p>
        <div className="client-logo-marquee" aria-label="Client logos">
          <div className="client-logo-track">
            {items.map((logo, index) => (
              <div className="client-logo-item" key={`${logo.alt}-${index}`}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
