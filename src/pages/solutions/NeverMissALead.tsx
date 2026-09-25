import { Inbox, Zap, CalendarCheck, Users, Repeat, LineChart } from 'lucide-react';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import PainList from '@/components/PainList';
import QuoteGrid from '@/components/QuoteGrid';
import InfoCards, { InfoCard } from '@/components/InfoCards';
import ResponsiveTable from '@/components/ResponsiveTable';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import FaqSection from '@/components/FaqList';
import RelatedLinks from '@/components/RelatedLinks';
import { AuditOffer, FeeCovers, GuaranteeNote, TierGrid } from '@/components/PricingBlocks';
import { discoveryLink } from '@/data/site';
import { leadDesk } from '@/data/pricing';
import { solutionFaqs } from '@/data/faqs';
import { solutionRelated } from '@/data/related';
import { PAGES, crumbsFor, solutionMeta } from '@/seo/routes';
import { offersFor, serviceId, serviceNode } from '@/seo/schema';

const META = solutionMeta('leads');
const PATH = META.path;
const CRUMBS = crumbsFor(PAGES.solutions, META);
const FAQS = solutionFaqs.leads;
const pains = [
  'Calls go to voicemail at your busiest times.',
  'After-hours and weekend enquiries go cold by Monday.',
  'Follow-ups depend on someone remembering.',
  "Customer conversations sit on staff's personal phones, and leave when they do.",
  'Leads arrive on five channels and nobody sees them all.',
  'You tried a chatbot once, and it annoyed customers more than it helped.',
];

const voices = [
  {
    quote:
      'I counted 6 enquiries that went cold before I could properly respond to them. All of them came in during busy periods or after hours.',
    cite: 'Small business owner, 2026',
  },
  { quote: 'One missed call and they are on to the next opportunity.', cite: 'Dental practice, 2026' },
  {
    quote: "I lose so many potential clients because I send one email and then just… don't follow up.",
    cite: 'Service business owner, 2026',
  },
];

const included: InfoCard[] = [
  {
    icon: <Inbox size={26} />,
    title: 'Every channel in one place',
    body: 'WhatsApp, phone, website chat, email, Instagram and Facebook all feed one system, so no enquiry falls through the gaps.',
  },
  {
    icon: <Zap size={26} />,
    title: 'Instant, accurate replies',
    body: "Your AI assistant answers in under 60 seconds, 24/7, using your real prices, services and policies. It doesn't make things up.",
  },
  {
    icon: <CalendarCheck size={26} />,
    title: 'Qualification & booking',
    body: 'It asks the right questions, scores the lead and books it straight into your calendar or CRM.',
  },
  {
    icon: <Users size={26} />,
    title: 'Human handoff',
    body: 'High-value, complex or emotional conversations go to the right person on your team immediately, with the full context.',
  },
  {
    icon: <Repeat size={26} />,
    title: 'Automatic follow-up',
    body: 'Polite, personal follow-ups until the lead books or says no, so nobody is forgotten.',
  },
  {
    icon: <LineChart size={26} />,
    title: 'Revenue recovered report',
    body: 'A monthly report of enquiries answered, response times, bookings made and the revenue they represent.',
  },
];

const compareRows = [
  ['Channels', 'One channel per tool', 'Every channel, one system'],
  ['Accuracy', 'Generic scripts that sometimes invent answers', 'Trained on your business, with guardrails and testing'],
  ['Customer experience', 'Bot-only, frustrating dead ends', 'AI for speed, humans for judgement'],
  ['Measured on', 'Messages sent', 'Bookings and revenue recovered'],
  ['After setup', 'Self-serve, on your own', 'Monitored, tuned and improved monthly by our team'],
  ['How you pay', 'A software licence you set up and run yourself', 'One monthly fee that covers running, fixes and reporting'],
];

export default function NeverMissALead() {
  return (
    <>
      <Seo
        {...META}
        crumbs={CRUMBS}
        faqs={FAQS}
        mainEntityId={serviceId(PATH)}
        schema={[
          serviceNode({
            path: PATH,
            name: META.label,
            description: META.description,
            serviceType: 'AI lead response and lead qualification',
            audience: 'Growing businesses',
            offers: offersFor('lead-desk', 'audit'),
          }),
        ]}
      />

      <PageHero
        crumbs={CRUMBS}
        eyebrow="Solution ② · Lapis Lead Desk"
        text="Every enquiry answered in under 60 seconds. On every channel."
        splitIndex={0}
        subtext="Lapis Lead Desk answers, qualifies and books every call, WhatsApp message, Instagram DM, web form and email, day and night. Your team steps in when it matters, and every month you see exactly what it recovered. From $390/month · ₦250,000/month."
        ctaTo={discoveryLink('leads', 'lead-desk')}
        secondaryLabel="See Lead Desk plans"
        secondaryTo={`${PATH}#plans`}
      />

      <section className="section section-paper">
        <div className="container">
          <SectionHeading
            eyebrow="The problem"
            title="Your next customer is already talking to a competitor."
            intro="They messaged you at 9pm. They called while your team was with another client. They filled in the form and waited, and while they waited, someone else replied."
          />
          <div className="section-body">
            <PainList items={pains} />
          </div>
          <div className="section-body">
            <QuoteGrid items={voices} />
          </div>
        </div>
      </section>

      <section className="section section-dark" id="how-it-works">
        <div className="container">
          <SectionHeading eyebrow="What's included" title="One response system instead of five disconnected tools." />
          <div className="section-body">
            <InfoCards items={included} columns={3} />
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <SectionHeading
            eyebrow="Why Lapis"
            title="A front desk that never sleeps,"
            accent="and never makes things up."
          />
          <div className="section-body">
            <ResponsiveTable
              caption="Typical AI receptionist or AI SDR compared with Lapis Lead Desk"
              variant="vs"
              columns={[
                { label: 'Compared on', hideLabel: true },
                { label: 'Typical AI receptionist / AI SDR' },
                { label: 'Lapis Lead Desk' },
              ]}
              rows={compareRows}
            />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <Reveal className="built-for">
            <h2 className="eyebrow section-eyebrow-heading">Built for</h2>
            <p className="built-for-text">
              Clinics and dental practices · Real estate agencies · Law firms · Home services · Schools and training
              providers · Hotels and short-lets · B2B service firms. In short, any business where one missed enquiry
              costs real money.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper" id="plans">
        <div className="container">
          <SectionHeading
            eyebrow="Lapis Lead Desk · Plans"
            title="Three plans."
            accent="No enquiry left waiting."
            intro="A monthly subscription, not a one-off build: we set it up, run it and report on it every month. Prices exclude VAT; annual plans get 2 months free."
          />
          <div className="section-body">
            <TierGrid product={leadDesk} />
          </div>
          <FeeCovers />
          <GuaranteeNote text="if we miss the response-time SLA in a calendar month, that month's fee is credited." />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <AuditOffer
            topic="leads"
            title="Want to see what you're missing first?"
            body="The AI Opportunity Audit ($490 · ₦250,000) reviews your enquiry channels and lead handling, and shows where leads go unanswered, with a ranked plan of what to fix and what it's worth each month. The fee is credited back when you start."
          />
        </div>
      </section>

      <FaqSection items={FAQS} title="Never Miss a Lead:" accent="your questions answered." />

      <RelatedLinks title="Go deeper on" accent="Never Miss a Lead." items={solutionRelated('leads')} />

      <CTASection
        heading="Stop losing customers to slow replies."
        subtext="Book a free 30-minute discovery call. We'll look at how enquiries reach you today and which Lead Desk plan fits."
        ctaTo={discoveryLink('leads', 'lead-desk')}
        secondaryLabel="See Lead Desk pricing"
        secondaryTo="/pricing#lead-desk"
      />
    </>
  );
}
