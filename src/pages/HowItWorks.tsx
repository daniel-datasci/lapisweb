import { useState } from 'react';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import { Search, Wrench, Activity, Plus, Minus, ClipboardList } from 'lucide-react';
import { faqs } from '@/data/faqs';
import './HowItWorks.css';

const heading = 'From free audit to live system in weeks.';

const phases = [
  {
    icon: <Search size={32} />,
    num: '01',
    phase: 'Discovery',
    duration: 'Week 1',
    body: 'We start with a free readiness audit \u2014 a 60-minute conversation where we map your operations, your data, and your blind spots. You leave with a written roadmap identifying your top three AI opportunities.',
    details: ['Readiness assessment across your operations', 'Data and systems audit', 'Opportunity prioritization', 'Written roadmap delivered'],
  },
  {
    icon: <Wrench size={32} />,
    num: '02',
    phase: 'Build',
    duration: 'Weeks 2\u20135',
    body: 'We build your intelligence and agent systems on real infrastructure \u2014 data pipelines, integrations, model orchestration, and dashboards \u2014 connected to the tools your team already uses. You get something usable within the first month.',
    details: ['Data pipelines and integrations built', 'Agent development and testing', 'Dashboard deployment', 'Team onboarding and training'],
  },
  {
    icon: <Activity size={32} />,
    num: '03',
    phase: 'Monitor',
    duration: 'Ongoing',
    body: 'Your system runs 24/7. Agents monitor your market, flag changes, and feed intelligence to your team. We maintain, optimize, and meet monthly to keep the system ahead of your competitors.',
    details: ['24/7 monitoring and alerts', 'System maintenance and optimization', 'Monthly strategy reviews', 'Continuous improvement'],
  },
];

const expectations = [
  'Access to the systems and data sources you want us to connect to',
  'A point person on your team who can answer questions during the build',
  'An hour for the free audit, and a few hours for onboarding after launch',
  'Honesty about what\u2019s working and what isn\u2019t \u2014 we can\u2019t fix what you don\u2019t tell us',
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'faq-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon">{open ? <Minus size={20} /> : <Plus size={20} />}</span>
      </button>
      <div className="faq-answer">
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div>
      <PageHero
        eyebrow="How It Works"
        text={heading}
        splitIndex={42}
        subtext="No six-month discovery phase. No vague timelines. Here&rsquo;s exactly what happens from your first conversation to a live system."
        ctaLabel="Book a Free Readiness Audit"
      />

      {/* Timeline */}
      <section className="section section-paper">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The Timeline</span>
            <h2 className="section-title">
              Three phases. <span className="accent">Five weeks to live.</span>
            </h2>
          </Reveal>
          <div className="timeline" style={{ marginTop: 56 }}>
            {phases.map((p, i) => (
              <Reveal key={p.phase} delay={(i + 1) as 1 | 2 | 3}>
                <div className="timeline-card">
                  <div className="timeline-left">
                    <span className="timeline-num">{p.num}</span>
                    <span className="timeline-icon">{p.icon}</span>
                  </div>
                  <div className="timeline-right">
                    <span className="timeline-phase">{p.phase}</span>
                    <span className="timeline-duration">{p.duration}</span>
                    <p className="timeline-body">{p.body}</p>
                    <ul className="timeline-details">
                      {p.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we need from you */}
      <section className="section section-navy">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow">What We Need From You</span>
            <h2 className="section-title">
              Not much. <span className="accent">But it matters.</span>
            </h2>
          </Reveal>
          <ul className="expectations-list" style={{ marginTop: 40 }}>
            {expectations.map((e, i) => (
              <Reveal key={i} delay={((i % 2) + 1) as 1 | 2}>
                <li className="expectation-item">
                  <span className="expectation-icon">
                    <ClipboardList size={20} />
                  </span>
                  <span>{e}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title">
              Questions you&rsquo;re <span className="accent">probably asking.</span>
            </h2>
          </Reveal>
          <div className="faq-list" style={{ marginTop: 40 }}>
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to see your blind spots close?"
        subtext="The free audit is the first step. Sixty minutes, no obligation, a roadmap you keep."
        ctaLabel="Book My Free Audit"
      />
    </div>
  );
}
