import PageHero from '@/components/PageHero';
import IncludedGrid from '@/components/IncludedGrid';
import DarkCallout from '@/components/DarkCallout';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import SavingsEstimator from '@/components/SavingsEstimator';

const heading = 'Most Companies Don\u2019t Have an AI Problem. They Have an AI Strategy Problem.';

const included = [
  { title: 'Readiness Audit', body: 'A 60-minute deep dive into your operations, data, and workflows to identify where AI actually moves the needle \u2014 and where it doesn\u2019t.' },
  { title: 'Strategic Roadmap', body: 'A written, prioritized plan showing which AI initiatives to build first, what infrastructure they need, and what ROI to expect.' },
  { title: 'Build vs. Buy Analysis', body: 'For each initiative, a clear-eyed assessment of whether an off-the-shelf tool works or whether you need a custom build \u2014 and why.' },
  { title: 'Vendor Evaluation', body: 'If buying is the right call, we evaluate vendors against your specific requirements so you don\u2019t waste budget on the wrong tool.' },
  { title: 'Implementation Partnership', body: 'We don\u2019t just hand you a deck. We work alongside your team to build and deploy the first system \u2014 so it actually ships.' },
  { title: 'Change Management', body: 'AI systems fail when nobody uses them. We design adoption into the process so your team trusts and relies on what we build.' },
];

export default function AIConsulting() {
  return (
    <div>
      <PageHero
        eyebrow="AI Consulting"
        text={heading}
        splitIndex={48}
        subtext="Before you hire an engineer or buy a tool, make sure you know what to build. The most expensive mistake isn't hiring the wrong person, it's building the wrong thing."
        ctaLabel="Book a Free Readiness Audit"
      />

      <section className="section section-paper">
        <div className="container">
          <Reveal>
            <span className="eyebrow">What&rsquo;s Included</span>
            <h2 className="section-title">
              Six things you get <span className="accent">before you build anything.</span>
            </h2>
            <p className="section-intro">
              Strategy is cheaper than software. This phase saves you from building the wrong system.
            </p>
          </Reveal>
          <IncludedGrid items={included} />
        </div>
      </section>

      <SavingsEstimator
        subtitle="Strategy isn&rsquo;t free, but building the wrong system costs ten times more. See what you could save by getting AI right the first time."
        laborSavingsRate={0.45}
        toolSavingsRate={0.25}
        analyticsSavingsRate={0.55}
        growthRate={0.03}
      />

      <DarkCallout
        title="We don&rsquo;t sell AI. We sell the judgment that tells you where AI goes."
        body="Any engineer can build a model. The hard part is knowing which problem to solve, which data to use, and which workflow to redesign. That&rsquo;s what consulting delivers \u2014 and it&rsquo;s the difference between an AI pilot that ships and one that stalls."
      />

      <CTASection
        heading="Not sure where AI fits? Let&rsquo;s find out for free."
        subtext="The readiness audit is a 60-minute conversation. You leave with a roadmap. No obligation, no hard sell."
        ctaLabel="Book My Free Audit"
      />
    </div>
  );
}
