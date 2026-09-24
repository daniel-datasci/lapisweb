import { Database, Target, Workflow, ServerCrash, ClipboardCheck, Scale, Server, ShieldCheck, GraduationCap, LineChart } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import PainList from '@/components/PainList';
import StatGrid from '@/components/StatGrid';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import ProcessSteps from '@/components/ProcessSteps';
import CTASection from '@/components/CTASection';
import { auditLink, breadcrumbLd, serviceLd } from '@/data/site';

const PATH = '/solutions/make-your-ai-pay';
const DESCRIPTION =
  'Stalled AI pilots, unused licences, no ROI? We audit your AI spend and take the highest-return workflow into production in 45 days, with ROI tracked from day one.';

const pains = [
  "You're paying for AI licences that half the team never opens.",
  'The pilot looked great on clean examples, then failed on real data.',
  'Staff use whichever AI tools they like, with no policy or oversight.',
  'Your board, partners or investors keep asking, "What did we get for it?"',
  "Competitors seem to be pulling ahead, and you don't know who to trust.",
  'The last consultant left a strategy deck and no working system.',
];

const stats = [
  { value: '42%', label: 'of companies abandoned most AI initiatives in 2025', source: 'S&P Global' },
  { value: '46%', label: 'of AI proofs of concept scrapped before production', source: 'S&P Global' },
  { value: '~5%', label: 'of AI pilots achieve rapid revenue acceleration', source: 'MIT NANDA 2025' },
  { value: '82%', label: 'of African organisations are piloting AI, but few have scaled', source: 'PwC 2026' },
];

const stallReasons: InfoCard[] = [
  {
    icon: <Database size={26} />,
    title: 'Messy data',
    body: "The AI was tested on clean examples. Your real data lives in five systems and doesn't agree with itself.",
  },
  {
    icon: <Target size={26} />,
    title: 'No measure of "good"',
    body: 'Nobody defined what success looks like, so nobody notices when the AI quietly gets things wrong.',
  },
  {
    icon: <Workflow size={26} />,
    title: 'Wrong workflow',
    body: 'AI was bolted onto a process designed for people, instead of the process being redesigned around it.',
  },
  {
    icon: <ServerCrash size={26} />,
    title: 'No infrastructure',
    body: "No monitoring, no logging and no fallback, so it works until it doesn't, and then nobody knows why.",
  },
];

const plan = [
  {
    phase: 'Days 1–10',
    title: 'Audit & select',
    body: 'We review your AI tools, pilots, spend and data, then choose the single workflow with the clearest return. We also tell you what to cancel.',
  },
  {
    phase: 'Days 11–35',
    title: 'Build the foundation',
    body: 'Data pipelines, integrations, evaluation tests and the workflow itself, built and tested on your real data.',
  },
  {
    phase: 'Days 36–45',
    title: 'Launch & adopt',
    body: 'Go live, train your team, set a usage policy and switch on your ROI dashboard.',
  },
  {
    phase: 'Ongoing',
    title: 'Run & scale',
    body: "We monitor accuracy, cost and uptime, report ROI monthly, and roll out the next workflow when you're ready.",
  },
];

const included: InfoCard[] = [
  {
    icon: <ClipboardCheck size={26} />,
    title: 'AI spend & readiness audit',
    body: "Everything you're paying for, what it's delivering, and a clear verdict on each: keep it, fix it or cut it.",
  },
  {
    icon: <Scale size={26} />,
    title: 'Build vs. buy advice',
    body: "An independent view on whether an off-the-shelf tool will do the job or you need a custom build. We don't take vendor commissions.",
  },
  {
    icon: <Server size={26} />,
    title: 'Production infrastructure',
    body: 'Pipelines, integrations, model orchestration, monitoring and fallbacks, so the system runs reliably every day.',
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'Governance & safe use',
    body: 'Access control, audit logs, data handling rules and an AI usage policy for your team.',
  },
  {
    icon: <GraduationCap size={26} />,
    title: 'Adoption & training',
    body: 'We design the system around how your team works, then train them until they actually rely on it.',
    to: '/services/ai-analytics-training',
    linkLabel: 'Explore AI & Analytics Training',
  },
  {
    icon: <LineChart size={26} />,
    title: 'ROI dashboard',
    body: 'Live tracking of time saved, costs avoided and revenue influenced, ready for your next board meeting.',
  },
];

export default function MakeYourAIPay() {
  return (
    <>
      <Seo
        title="Make Your AI Pay | AI Pilot to Production in 45 Days | The Lapis AI"
        description={DESCRIPTION}
        path={PATH}
        jsonLd={[
          serviceLd('Make Your AI Pay', DESCRIPTION, PATH),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'Make Your AI Pay', path: PATH },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Solution ③ · AI to production"
        text="You've tried AI. Now make it pay."
        splitIndex={0}
        subtext="If you've paid for AI tools, pilots or consultants and have little to show for it, you're not alone. We audit what you already have, pick the workflow with the highest return, and take it into production in 45 days, on infrastructure that lasts and with ROI tracked from day one."
        ctaLabel="Book an AI Spend Audit"
        ctaTo={auditLink('ai-spend')}
        secondaryLabel="See the 45-Day Plan"
        secondaryTo={`${PATH}#the-45-day-plan`}
      />

      <section className="section section-paper">
        <div className="container">
          <SectionHeading eyebrow="The problem" title="The demo worked." accent="Production didn't." />
          <div className="section-body">
            <PainList items={pains} />
          </div>
          <div className="section-body">
            <StatGrid stats={stats} />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Why AI projects stall" title="It's rarely the model." accent="It's everything around it." />
          <div className="section-body">
            <InfoCards items={stallReasons} columns={4} />
          </div>
        </div>
      </section>

      <section className="section section-paper" id="the-45-day-plan">
        <div className="container">
          <SectionHeading eyebrow="The 45-day plan" title="From stalled pilot to working system in 45 days." />
          <div className="section-body">
            <ProcessSteps steps={plan} columns={4} />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="What's included" />
          <div className="section-body">
            <InfoCards items={included} columns={3} />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Why Lapis"
            title="Senior attention the big firms reserve for their biggest clients."
            intro="Big consultancies send junior teams and slide decks. Cloud providers' hands-on programmes are aimed at enterprises. Research from MIT suggests projects run with specialist partners succeed about twice as often as internal builds. We give growing and mid-market companies that same specialist, hands-on help, at a price and pace that fits them."
          />
        </div>
      </section>

      <CTASection
        heading="Find out what your AI spend should be delivering."
        subtext="Book a free AI spend audit. We'll tell you honestly what's working, what isn't, and which one workflow will pay for the rest."
        ctaLabel="Book My Free AI Spend Audit"
        ctaTo={auditLink('ai-spend')}
      />
    </>
  );
}
