import { Search, Hammer, Activity, BarChart3, Check } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import ProcessSteps from '@/components/ProcessSteps';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import FaqSection from '@/components/FaqList';
import { faqs } from '@/data/faqs';
import { clientExpectations, processSteps } from '@/data/process';
import { PAGES, crumbsFor } from '@/seo/routes';

const icons = [Search, Hammer, Activity, BarChart3];

const steps = processSteps.map((s, i) => {
  const Icon = icons[i];
  return { ...s, icon: <Icon size={26} /> };
});

const crumbs = crumbsFor(PAGES.howItWorks);

export default function HowItWorks() {
  return (
    <>
      <Seo {...PAGES.howItWorks} crumbs={crumbs} faqs={faqs} />

      <PageHero
        crumbs={crumbs}
        eyebrow="How it works"
        text="Audit. Build. Run. Report."
        splitIndex={0}
        subtext="No six-month discovery phase and no vague timelines. Here's exactly what happens from your first conversation to a system that runs every day, and who keeps it running."
      />

      <section className="section section-paper">
        <div className="container">
          <ProcessSteps steps={steps} columns={4} />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="What we need from you" title="Not much," accent="but it matters." />
          <ul className="check-rows check-rows-single section-body">
            {clientExpectations.map((e, i) => (
              <Reveal as="li" key={e} delay={((i % 2) + 1) as 1 | 2} className="check-row">
                <span className="check-row-icon" aria-hidden="true">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span>{e}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={faqs} />

      <CTASection
        heading="Ready to see where you're leaking time, leads and money?"
        subtext="Sixty minutes, no obligation, and a roadmap you keep."
      />
    </>
  );
}
