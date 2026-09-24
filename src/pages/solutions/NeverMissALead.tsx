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
import { auditLink, breadcrumbLd, serviceLd } from '@/data/site';

const PATH = '/solutions/never-miss-a-lead';
const DESCRIPTION =
  'Every enquiry answered in under 60 seconds, then qualified and booked, on every channel, day and night, with a monthly report of revenue recovered.';

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
];

export default function NeverMissALead() {
  return (
    <>
      <Seo
        title="Never Miss a Lead | AI Lead Response on WhatsApp, Phone & Web | The Lapis AI"
        description={DESCRIPTION}
        path={PATH}
        jsonLd={[
          serviceLd('Never Miss a Lead', DESCRIPTION, PATH),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: 'Never Miss a Lead', path: PATH },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Solution ② · Revenue response"
        text="Every enquiry answered in under 60 seconds. On every channel."
        splitIndex={0}
        subtext="Calls, WhatsApp messages, Instagram DMs, web forms and emails are answered, qualified and booked into your calendar, day and night. Your team steps in when it matters, and every month you see exactly how much revenue we recovered."
        ctaLabel="Get a Free Lead Leak Audit"
        ctaTo={auditLink('leads')}
        secondaryLabel="See How It Works"
        secondaryTo={`${PATH}#how-it-works`}
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
              caption="Typical AI receptionist or AI SDR compared with Lapis Revenue Response"
              variant="vs"
              columns={[
                { label: 'Compared on', hideLabel: true },
                { label: 'Typical AI receptionist / AI SDR' },
                { label: 'Lapis Revenue Response' },
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

      <section className="section section-paper">
        <div className="container">
          <Reveal>
            <div className="offer-box">
              <span className="eyebrow">Free Lead Leak Audit</span>
              <h2 className="section-title">See what you're missing, free.</h2>
              <p className="section-intro">
                We'll review your enquiry channels and show you how many leads went unanswered, how long replies took and
                what that likely cost you. If it doesn't change how you handle leads, you owe nothing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        heading="Stop losing customers to slow replies."
        subtext="Book a free audit and we'll show you exactly where your leads are leaking, and how quickly we can fix it."
        ctaLabel="Get My Free Lead Leak Audit"
        ctaTo={auditLink('leads')}
      />
    </>
  );
}
