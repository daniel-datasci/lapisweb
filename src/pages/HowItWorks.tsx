import { PhoneCall, Search, ClipboardList, FileSignature, Rocket, BarChart3, Check } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import ProcessSteps from '@/components/ProcessSteps';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import FaqSection from '@/components/FaqList';
import { RunStandardCards } from '@/components/PricingBlocks';
import { faqs } from '@/data/faqs';
import { clientExpectations, processSteps } from '@/data/process';
import { WHATSAPP_CTA, WHATSAPP_LINK, auditLink } from '@/data/site';
import { PAGES, crumbsFor } from '@/seo/routes';

const icons = [PhoneCall, Search, ClipboardList, FileSignature, Rocket, BarChart3];

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
        text="Six steps from first call to AI workers on the job."
        splitIndex={0}
        subtext="No six-month discovery phase and no vague timelines. Here's exactly what happens from a free discovery call to AI workers that go live 2–4 weeks after signing, and who keeps them running every month."
        secondaryLabel="Book your audit"
        secondaryTo={auditLink()}
      />

      <section className="section section-paper">
        <div className="container">
          <ProcessSteps steps={steps} columns={3} />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="The Lapis Run standard"
            title="What the monthly fee"
            accent="pays for."
            intro="From go-live, every AI worker is run to the same standard, whichever plan you're on."
          />
          <div className="section-body">
            <RunStandardCards />
          </div>
        </div>
      </section>

      <section className="section section-paper">
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

      <FaqSection items={faqs} variant="dark" />

      <CTASection
        heading="Ready to find your first AI worker?"
        subtext="Start with a free 30-minute discovery call. No obligation, and a straight answer on whether we can help."
        secondaryLabel={WHATSAPP_CTA}
        secondaryHref={WHATSAPP_LINK}
      />
    </>
  );
}
