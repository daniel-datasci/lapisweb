import { useId, useState } from 'react';
import { Search, Hammer, Activity, BarChart3, Plus, Minus, Check } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import ProcessSteps from '@/components/ProcessSteps';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { faqs } from '@/data/faqs';
import { breadcrumbLd } from '@/data/site';
import './HowItWorks.css';

const steps = [
  {
    icon: <Search size={26} />,
    phase: 'Week 1 · Audit',
    title: 'Find the leaks',
    body: "A free 60-minute conversation to map where you're losing time, leads and money. You leave with a written roadmap of your top three opportunities, and you keep it either way.",
    points: ['Operations & data review', 'Opportunity ranking', 'Written roadmap'],
  },
  {
    icon: <Hammer size={26} />,
    phase: 'Weeks 2–5 · Build',
    title: 'Build it properly',
    body: 'We build your automations and agents on real infrastructure, connected to the tools you already use, and test them on your real data.',
    points: ['Pipelines & integrations', 'Agents & automations', 'Team onboarding'],
  },
  {
    icon: <Activity size={26} />,
    phase: 'Ongoing · Run',
    title: 'Keep it working',
    body: 'We monitor every workflow around the clock, fix issues before your team notices and improve accuracy over time.',
    points: ['24/7 monitoring', 'Maintenance & fixes', 'Continuous improvement'],
  },
  {
    icon: <BarChart3 size={26} />,
    phase: 'Monthly · Report',
    title: 'Prove the value',
    body: 'A monthly review of hours returned, leads answered and revenue recovered, plus a plan for what to automate next.',
    points: ['Results report', 'Strategy review', 'Next-workflow plan'],
  },
];

const expectations = [
  'Access to the systems and channels you want us to connect',
  'One point person who can answer questions during the build',
  'An hour for the audit, and a few hours for onboarding after launch',
  "Honesty about what's working and what isn't, because we can't fix what we can't see",
];

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={`faq-item ${open ? 'faq-open' : ''}`}>
      <h3 className="faq-heading">
        <button
          type="button"
          className="faq-question"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-answer`}
        >
          <span className="faq-q-text">{q}</span>
          <span className="faq-q-icon" aria-hidden="true">
            {open ? <Minus size={20} /> : <Plus size={20} />}
          </span>
        </button>
      </h3>
      <div className="faq-answer" id={`${id}-answer`} role="region" aria-hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How It Works | From Free Audit to Live AI System in 5 Weeks | The Lapis AI"
        description="Audit, build, run and report. No six-month discovery phase. Something live within the first month, and a team that keeps it running."
        path="/how-it-works"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'How It Works', path: '/how-it-works' },
          ]),
        ]}
      />

      <PageHero
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
            {expectations.map((e, i) => (
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

      <section className="section section-paper">
        <div className="container faq-container">
          <SectionHeading eyebrow="FAQ" title="Questions you're" accent="probably asking." />
          <div className="faq-list section-body">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to see where you're leaking time, leads and money?"
        subtext="Sixty minutes, no obligation, and a roadmap you keep."
      />
    </>
  );
}
