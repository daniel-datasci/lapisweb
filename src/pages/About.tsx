import { Helmet } from 'react-helmet-async';
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
    body: 'Every business problem we solve starts with the same root cause: someone didn\u2019t know something soon enough. We close that gap.',
  },
  {
    icon: <Target size={28} />,
    title: 'Strategy Before Software',
    body: 'We won\u2019t build you a model until we know what decision it\u2019s supposed to inform. The hardest part of AI isn&rsquo;t the code \u2014 it\u2019s knowing what to build.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Production, Not Pilots',
    body: 'A demo that works on three clean examples isn\u2019t a system. We build infrastructure, evaluation loops, and workflows that hold up in the real world.',
  },
];

const team = [
  { name: 'Founder & CEO', role: 'AI Strategy & Architecture', initials: 'LA' },
  { name: 'Head of Engineering', role: 'Agent & Infrastructure Systems', initials: 'JM' },
  { name: 'Head of Intelligence', role: 'Market & Competitive Monitoring', initials: 'RK' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | The Lapis AI</title>
        <meta
          name="description"
          content="The Lapis AI exists to close the blind spots that cost businesses. We build always-on intelligence systems, AI agents, and the infrastructure underneath them."
        />
        <link rel="canonical" href="https://thelapisai.com.ng/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About | The Lapis AI" />
        <meta
          property="og:description"
          content="The Lapis AI exists to close the blind spots that cost businesses. We build always-on intelligence systems, AI agents, and the infrastructure underneath them."
        />
        <meta property="og:url" content="https://thelapisai.com.ng/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://thelapisai.com.ng/og-back.png" />
        <meta property="og:site_name" content="The Lapis AI" />
        <meta property="og:locale" content="en_NG" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://thelapisai.com.ng/og-back.png" />
      </Helmet>

      {/* Organization structured data – vital for brand search and AI tools */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'The Lapis AI',
          url: 'https://thelapisai.com.ng',
          logo: 'https://thelapisai.com.ng/og-back.png',
          description:
            'The Lapis AI builds always-on intelligence systems, AI agents, and the infrastructure underneath them so businesses stop losing to information gaps.',
          foundingDate: '2022',
          founder: {
            '@type': 'Person',
            name: 'Founder & CEO', // Ideally replace with the real name
          },
          sameAs: [
            'https://twitter.com/thelapisai', // adjust when you have social profiles
            'https://linkedin.com/company/thelapisai',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            url: 'https://thelapisai.com.ng/contact',
            availableLanguage: ['English'],
          },
        })}
      </script>

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
                  Established in 2022, The Lapis AI was born from a simple, frustrating observation: businesses don&rsquo;t lose to
                  competitors because their competitors are smarter. They lose because their competitors know
                  something they don&rsquo;t, and they find out too late.
                </p>
                <p>
                  A price change missed for a week. A feature launch spotted from a churned customer. A market shift
                  that showed up in a quarterly report instead of a real-time alert. The pattern is always the same:
                  the information existed, but nobody was watching for it.
                </p>
                <p>
                  We built The Lapis AI to fix that, not with another dashboard or another chatbot, but with
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
                A small, senior team. You work with the people who design and build your system, not a layer of
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
          heading="Let&rsquo;s make - we didn&rsquo;t know - impossible for your business."
          subtext="It starts with a free audit. Sixty minutes, a roadmap you keep, no obligation."
          ctaLabel="Book My Free Audit"
        />
      </div>
    </>
  );
}