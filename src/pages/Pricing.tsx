import { MessageCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import FaqSection from '@/components/FaqList';
import {
  AuditOffer,
  ExtrasTable,
  ProductCards,
  RunStandardCards,
  TermsCards,
  TierGrid,
} from '@/components/PricingBlocks';
import {
  PRICING_NOTE,
  RESCUE_PRICE,
  aiWorkforce,
  everyPlanIncludes,
  leadDesk,
  ngnShort,
  pricingFaqs,
  usd,
} from '@/data/pricing';
import { AUDIT_CTA, DISCOVERY_CTA, WHATSAPP_CTA, WHATSAPP_LINK, auditLink, contactLink } from '@/data/site';
import { PAGES, crumbsFor } from '@/seo/routes';
import { PRICING_CATALOG_ID, pricingCatalogNode } from '@/seo/schema';
import './Pricing.css';

const crumbs = crumbsFor(PAGES.pricing);

function IncludesLine() {
  return (
    <Reveal>
      <p className="pricing-includes">
        <strong>Every plan includes:</strong> {everyPlanIncludes.join(' · ')}.
      </p>
    </Reveal>
  );
}

export default function Pricing() {
  return (
    <>
      <Seo
        {...PAGES.pricing}
        crumbs={crumbs}
        faqs={pricingFaqs}
        mainEntityId={PRICING_CATALOG_ID}
        schema={[pricingCatalogNode()]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Pricing"
        text="Hire AI workers, not more staff."
        splitIndex={0}
        subtext="We build them, run them and report what they did every month, for a fraction of the cost of a hire. No large upfront build fees and no systems left behind after launch."
        ctaLabel={AUDIT_CTA}
        ctaTo={auditLink()}
        secondaryLabel="See Lead Desk plans"
        secondaryTo="/pricing#lead-desk"
        extraActions={
          <Button href={WHATSAPP_LINK} variant="ghost-light" size="lg">
            <MessageCircle size={18} aria-hidden="true" className="btn-lead-icon" />
            {WHATSAPP_CTA}
          </Button>
        }
      />

      <section className="section section-paper">
        <div className="container">
          <SectionHeading
            eyebrow="Three ways to start"
            title="Pick the problem."
            accent="We run the fix every month."
            intro="Two subscriptions and one fixed-fee project. Every price is shown in US dollars and naira: global clients are billed in USD, Nigeria-based businesses in NGN."
          />
          <div className="section-body">
            <ProductCards />
          </div>
          <IncludesLine />
        </div>
      </section>

      <section className="section section-dark" id="lead-desk">
        <div className="container">
          <SectionHeading
            eyebrow="Lapis Lead Desk · Never Miss a Lead"
            title="Lead Desk:"
            accent="never miss a lead again."
            intro={`${leadDesk.blurb} If we miss the response-time SLA in a calendar month, that month's fee is credited.`}
          />
          <div className="section-body">
            <TierGrid product={leadDesk} />
          </div>
        </div>
      </section>

      <section className="section section-paper" id="ai-workforce">
        <div className="container">
          <SectionHeading
            eyebrow="Lapis AI Workforce · Grow Without Hiring"
            title="AI Workforce:"
            accent="grow without hiring."
            intro={`${aiWorkforce.blurb} Priced per AI worker, each with a job description, a KPI, an operator and a monthly impact report. Your team is freed up for higher-value work.`}
          />
          <div className="section-body">
            <TierGrid product={aiWorkforce} />
          </div>
        </div>
      </section>

      <section className="section section-dark" id="included">
        <div className="container">
          <SectionHeading
            eyebrow="The Lapis Run standard"
            title="What the monthly fee"
            accent="pays for."
            intro="Every subscription is operated, not just installed. No hourly billing: hosting, monitoring and maintenance are bundled into the monthly fee."
          />
          <div className="section-body">
            <RunStandardCards />
          </div>
          <IncludesLine />
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <AuditOffer />
        </div>
      </section>

      <section className="section section-dark" id="projects">
        <div className="container">
          <SectionHeading
            eyebrow="Projects, retainers & add-ons"
            title="45-Day AI Rescue,"
            accent="and everything else."
            intro={`Already spent money on AI that never shipped? The 45-Day AI Rescue gets it live and measured in 45 days, or we keep working free until it is. Fixed fee by scope, ${usd(RESCUE_PRICE.min.usd)}–${usd(RESCUE_PRICE.max.usd)} · ${ngnShort(RESCUE_PRICE.min.ngn)}–${ngnShort(RESCUE_PRICE.max.ngn)}, with 3 months of Run included before it moves onto AI Workforce.`}
          />
          <div className="section-body">
            <ExtrasTable />
          </div>
          <Reveal>
            <div className="cta-row-center pricing-projects-cta">
              <Button to={contactLink({ plan: 'ai-rescue' })} variant="primary" size="lg" borderWrap icon>
                Talk to us about a Rescue
              </Button>
              <Button to="/solutions/make-your-ai-pay" variant="ghost-light" size="lg">
                How the Rescue works
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper" id="terms">
        <div className="container">
          <SectionHeading
            eyebrow="Terms, guarantees & ownership"
            title="Plain terms."
            accent="No lock-in after month three."
          />
          <div className="section-body">
            <TermsCards />
          </div>
          <Reveal>
            <p className="pricing-includes">{PRICING_NOTE}</p>
          </Reveal>
        </div>
      </section>

      <FaqSection items={pricingFaqs} title="Pricing questions," accent="answered." variant="dark" />

      <CTASection
        heading="Not sure which plan fits?"
        subtext="Book a free 30-minute discovery call. We'll tell you honestly which plan, if any, makes sense for your business."
        ctaLabel={DISCOVERY_CTA}
        ctaTo={contactLink()}
        secondaryLabel={WHATSAPP_CTA}
        secondaryHref={WHATSAPP_LINK}
      />
    </>
  );
}
