import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import ProcessSteps from '@/components/ProcessSteps';
import { Target, Eye, ShieldCheck } from 'lucide-react';
import './About.css';

const heading = 'We build systems that make missed information impossible.';

const values = [
  {
    icon: <Eye size={28} />,
    title: 'Visibility First',
    body: 'Every business problem we solve starts with the same root cause: someone didn&rsquo;t know something soon enough. We close that gap.',
  },
  {
    icon: <Target size={28} />,
    title: 'Strategy Before Software',
    body: 'We won&rsquo;t build you a model until we know what decision it&rsquo;s supposed to inform. The hardest part of AI isn&rsquo;t the code \u2014 it&rsquo;s knowing what to build.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Production, Not Pilots',
    body: 'A demo that works on three clean examples isn&rsquo;t a system. We build infrastructure, evaluation loops, and workflows that hold up in the real world.',
  },
];

const team = [
  { name: 'Founder & CEO', role: 'AI Strategy & Architecture', initials: 'LA' },
  { name: 'Head of Engineering', role: 'Agent & Infrastructure Systems', initials: 'JM' },
  { name: 'Head of Intelligence', role: 'Market & Competitive Monitoring', initials: 'RK' },
];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        text={heading}
        splitIndex={0}
        subtext="The Lapis AI exists for one reason: most businesses operate blind not because they don&rsquo;t care, but because building systems that close blind spots is hard. We make it possible."
        ctaLabel="Work With Us"
      />

      {/* Origin / mission */}
      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title">
              We started where every client starts: <span className="accent">with a blind spot.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="about-narrative" style={{ marginTop: 32 }}>
              <p>
                The Lapis AI was born from a simple, frustrating observation: businesses don&rsquo;t lose to
                competitors because their competitors are smarter. They lose because their competitors know
                something they don&rsquo;t, and they find out too late.
              </p>
              <p>
                A price change missed for a week. A feature launch spotted from a churned customer. A market shift
                that showed up in a quarterly report instead of a real-time alert. The pattern is always the same:
                the information existed, but nobody was watching for it.
              </p>
              <p>
                We built The Lapis AI to fix that \u2014 not with another dashboard or another chatbot, but with
                always-on systems that monitor, alert, and inform. Strategy first, infrastructure underneath, agents
                doing the work. The kind of system that makes &ldquo;we didn&rsquo;t know&rdquo; a phrase that
                never comes up in your next leadership meeting.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section section-navy">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our Approach</span>
            <h2 className="section-title">
              Three principles <span className="accent">we don&rsquo;t compromise on.</span>
            </h2>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 56 }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i + 1) as 1 | 2 | 3}>
                <div className="card card-dark">
                  <span className="card-icon-gold">{v.icon}</span>
                  <h3 className="card-title-light">{v.title}</h3>
                  <p className="card-body-light">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology reuse */}
      <ProcessSteps />

      {/* Team */}
      <section className="section section-paper">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The Team</span>
            <h2 className="section-title">
              The people <span className="accent">building your systems.</span>
            </h2>
            <p className="section-intro">
              A small, senior team. You work with the people who design and build your system \u2014 not a layer of
              account managers.
            </p>
          </Reveal>
          <div className="grid grid-3" style={{ marginTop: 56 }}>
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i + 1) as 1 | 2 | 3}>
                <div className="team-card">
                  <div className="team-avatar">{member.initials}</div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Let&rsquo;s make \u201cwe didn&rsquo;t know\u201d impossible for your business."
        subtext="It starts with a free audit. Sixty minutes, a roadmap you keep, no obligation."
        ctaLabel="Book My Free Audit"
      />
    </div>
  );
}
