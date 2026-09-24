import { Compass, Cpu, Activity } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import InfoCards from '@/components/InfoCards';
import { breadcrumbLd, organizationLd } from '@/data/site';
import './About.css';

const principles = [
  {
    title: 'Outcomes, not output',
    body: 'We measure success in hours returned and revenue recovered, not in features shipped.',
  },
  {
    title: 'Strategy before software',
    body: "We won't build anything until we know what problem it solves and how we'll measure it.",
  },
  {
    title: 'Built to last',
    body: 'Real infrastructure, testing and monitoring underneath everything, so it works on your real data and not just in a demo.',
  },
  {
    title: 'We stay',
    body: "We run what we build. If something breaks, it's our problem, not yours.",
  },
];

const team = [
  { role: 'Founder & CEO', focus: 'AI strategy and solution architecture', icon: <Compass size={32} /> },
  { role: 'Head of Engineering', focus: 'Automation, agents and infrastructure', icon: <Cpu size={32} /> },
  {
    role: 'Head of Operations & Intelligence',
    focus: 'Running client systems, monitoring and results reporting',
    icon: <Activity size={32} />,
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us | The Team That Stays | The Lapis AI"
        description="Founded in 2022, The Lapis AI builds and runs AI systems for growing businesses, from Lagos to London."
        path="/about"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About The Lapis AI',
            url: 'https://thelapisai.com.ng/about',
            mainEntity: organizationLd,
          },
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About"
        text="We're the AI team that stays."
        splitIndex={0}
        subtext="The Lapis AI exists because growing businesses deserve AI that keeps working after the launch party. We build it, run it, and prove what it's worth, every single month."
        ctaLabel=""
      />

      <section className="section section-paper">
        <div className="container" style={{ maxWidth: 880 }}>
          <SectionHeading eyebrow="Our story" title="We kept seeing" accent="the same three walls." />
          <Reveal delay={2}>
            <div className="about-narrative" style={{ marginTop: 32 }}>
              <p>
                The Lapis AI was founded in 2022 to help businesses see what was happening in their markets before it
                cost them. Working with teams across real estate, hospitality and SaaS, we noticed that the businesses
                struggling most had the same three problems, whatever their industry.
              </p>
              <p>
                First, too much of the work ran through too few people, so growth meant hiring, and the founders were
                exhausted. Second, customers slipped through the cracks: missed calls, WhatsApp messages answered the
                next day, follow-ups that never happened. Third, many had already spent money on AI tools, agencies or
                consultants, and had very little to show for it.
              </p>
              <p>
                The technology wasn't the problem. The problem was that most providers built something, handed it over
                and left. So we decided to be different.{' '}
                <strong>
                  We build it properly, we stay to run it, and we show you every month exactly what it's worth.
                </strong>
              </p>
              <p>
                Today, we help growing businesses from Lagos to London do more without hiring more, answer every
                customer, and finally get a return on AI.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal>
            <div className="about-mission">
              <h2 className="eyebrow about-mission-label">Mission</h2>
              <p className="about-mission-line">To make AI the most dependable member of every growing team.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <SectionHeading eyebrow="How we work" title="Four principles" accent="we don't compromise on." />
          <div className="section-body">
            <InfoCards items={principles} columns={4} dark />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading
            eyebrow="The team"
            title="Small, senior"
            accent="and hands-on."
            intro="You work directly with the people who design, build and run your systems. There are no account managers and no hand-offs to juniors."
          />
          <div className="grid grid-3 equal-grid section-body">
            {team.map((member, i) => (
              <Reveal key={member.role} delay={(i + 1) as 1 | 2 | 3}>
                <div className="team-card">
                  <div className="team-avatar" aria-hidden="true">
                    {member.icon}
                  </div>
                  <h3 className="team-name">{member.role}</h3>
                  <p className="team-role">{member.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={`Let's make "we can't take on more" a thing of the past.`}
        subtext="Start with a free audit: sixty minutes, and a roadmap you keep."
      />
    </>
  );
}
