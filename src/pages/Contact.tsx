import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, ChevronDown, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Seo from '@/components/Seo';
import TypewriterHeading from '@/components/TypewriterHeading';
import Button from '@/components/Button';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  AREA_SERVED_LABEL,
  CONTACT_EMAIL,
  LOCATION,
  PHONE_LINES,
  WHATSAPP_CTA,
  WHATSAPP_LINK,
  type ContactTopic,
  type InterestPlan,
} from '@/data/site';
import { PLAN_OPTIONS } from '@/data/pricing';
import { useHydrated } from '@/hooks/useHydrated';
import { PAGES, crumbsFor } from '@/seo/routes';
import { ORG_ID } from '@/seo/schema';
import './Contact.css';

// Word joiners keep "30-minute" together on narrow screens.
const heading = 'Book a free 30\u2060-\u2060minute discovery call.';

const crumbs = crumbsFor(PAGES.contact);

const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'UK', 'US', 'Canada', 'EU', 'Other'];

type ProblemValue = ContactTopic | 'not-sure';

const problems: { value: ProblemValue; label: string }[] = [
  { value: 'capacity', label: "We can't take on more without hiring" },
  { value: 'leads', label: "We're losing leads to slow replies" },
  { value: 'ai-spend', label: "Our AI spend isn't paying off" },
  { value: 'training', label: 'We want to train our team on AI and analytics' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const teamSizes = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];

const topicSources: Record<ContactTopic, string> = {
  capacity: 'Grow Without Hiring page',
  leads: 'Never Miss a Lead page',
  'ai-spend': 'Make Your AI Pay page',
  training: 'AI & Analytics Training page',
};

/** The plan each problem most often leads to, used when a link only carries ?topic=. */
const topicPlans: Record<ContactTopic, InterestPlan> = {
  capacity: 'ai-workforce',
  leads: 'lead-desk',
  'ai-spend': 'ai-rescue',
  training: 'workshop',
};

const planProblems: Partial<Record<InterestPlan, ContactTopic>> = {
  'ai-workforce': 'capacity',
  'lead-desk': 'leads',
  'ai-rescue': 'ai-spend',
  workshop: 'training',
};

const isTopic = (topic: string | null): topic is ContactTopic =>
  topic !== null && Object.prototype.hasOwnProperty.call(topicSources, topic);

const isPlan = (plan: string | null): plan is InterestPlan =>
  plan !== null && PLAN_OPTIONS.some((p) => p.value === plan);

const initialProblem = (topic: string | null, plan: string | null): ProblemValue | '' =>
  isTopic(topic) ? topic : isPlan(plan) ? (planProblems[plan] ?? '') : '';

const initialPlan = (topic: string | null, plan: string | null): InterestPlan | '' =>
  isPlan(plan) ? plan : isTopic(topic) ? topicPlans[topic] : '';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Form = {
  name: string;
  email: string;
  company: string;
  country: string;
  problem: ProblemValue | '';
  plan: InterestPlan | '';
  teamSize: string;
  message: string;
};

export default function Contact() {
  const [params] = useSearchParams();
  // The prerendered page has no query string, so ?topic= and ?plan= are read once hydrated to keep both renders identical.
  const hydrated = useHydrated();
  const topic = hydrated ? params.get('topic') : null;
  const planParam = hydrated ? params.get('plan') : null;
  const linkKey = `${topic ?? ''}|${planParam ?? ''}`;

  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    company: '',
    country: '',
    problem: initialProblem(topic, planParam),
    plan: initialPlan(topic, planParam),
    teamSize: '',
    message: '',
  });
  const [prevLinkKey, setPrevLinkKey] = useState(linkKey);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Follow in-app navigation between ?topic= / ?plan= links while the page stays mounted.
  if (linkKey !== prevLinkKey) {
    setPrevLinkKey(linkKey);
    const nextProblem = initialProblem(topic, planParam);
    const nextPlan = initialPlan(topic, planParam);
    if (nextProblem || nextPlan) {
      setForm((prev) => ({
        ...prev,
        problem: nextProblem || prev.problem,
        plan: nextPlan || prev.plan,
      }));
    }
  }

  const handleChange = <K extends keyof Form>(field: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const isAudit = form.plan === 'audit';
  const submitLabel = isAudit ? 'Request My AI Opportunity Audit' : 'Book My Free Discovery Call';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.company ||
      !form.country ||
      !form.problem ||
      !form.plan ||
      !form.teamSize
    ) {
      setError(
        "Please fill in your name, work email, company, country, what's costing you most, what you're interested in and your team size.",
      );
      return;
    }
    if (!EMAIL_PATTERN.test(form.email)) {
      setError('Please enter a valid work email address.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError('Email delivery is not configured yet. Please contact the site owner directly.');
      return;
    }

    const problemLabel = problems.find((p) => p.value === form.problem)?.label ?? form.problem;
    const planLabel = PLAN_OPTIONS.find((p) => p.value === form.plan)?.label ?? form.plan;
    const isWorkshop = form.plan === 'workshop';
    const emailTitle = isWorkshop
      ? 'New Team AI Workshop Enquiry'
      : isAudit
        ? 'New AI Opportunity Audit Request'
        : 'New Free Discovery Call Request';
    const emailIntro = isWorkshop
      ? 'A new workshop enquiry came in from The Lapis AI website.'
      : isAudit
        ? 'A new AI Opportunity Audit request came in from The Lapis AI website.'
        : 'A new discovery call request came in from The Lapis AI website.';
    const message = form.message.trim() || 'No additional message provided.';
    const sourceParts = [
      isTopic(topic) ? topicSources[topic] : '',
      isPlan(planParam) ? `plan link: ${PLAN_OPTIONS.find((p) => p.value === planParam)?.label ?? planParam}` : '',
    ].filter(Boolean);
    const safe = {
      name: escapeHtml(form.name),
      email: escapeHtml(form.email),
      company: escapeHtml(form.company),
      country: escapeHtml(form.country),
      problem: escapeHtml(problemLabel),
      plan: escapeHtml(planLabel),
      teamSize: escapeHtml(form.teamSize),
      source: escapeHtml(sourceParts.join(' · ')),
      message: escapeHtml(message),
    };

    setIsSubmitting(true);
    setError('');

    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          company: form.company,
          country: form.country,
          problem: problemLabel,
          plan: planLabel,
          team_size: form.teamSize,
          topic: topic ?? '',
          interest: planLabel,
          stage: form.teamSize,
          message,
          to_email: 'info.thelapisai@gmail.com',
          reply_to: form.email,
          email_content: `
            <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
              <div style="background: linear-gradient(135deg, #0b1a33 0%, #142a4d 100%); padding: 24px 32px; border-radius: 12px 12px 0 0;">
                <h2 style="margin: 0; color: #f7f8f6; font-size: 24px;">${emailTitle}</h2>
                <p style="margin: 8px 0 0; color: #d9dfe8;">${emailIntro}</p>
              </div>
              <div style="padding: 24px 32px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
                <p style="margin: 0 0 12px;"><strong>Name:</strong> ${safe.name}</p>
                <p style="margin: 0 0 12px;"><strong>Work email:</strong> ${safe.email}</p>
                <p style="margin: 0 0 12px;"><strong>Company:</strong> ${safe.company}</p>
                <p style="margin: 0 0 12px;"><strong>Country:</strong> ${safe.country}</p>
                <p style="margin: 0 0 12px;"><strong>What's costing them most:</strong> ${safe.problem}</p>
                <p style="margin: 0 0 12px;"><strong>Interested in:</strong> ${safe.plan}</p>
                <p style="margin: 0 0 12px;"><strong>Team size:</strong> ${safe.teamSize}</p>
                ${safe.source ? `<p style="margin: 0 0 12px;"><strong>Came from:</strong> ${safe.source}</p>` : ''}
                <p style="margin: 0 0 12px;"><strong>Anything else:</strong></p>
                <div style="padding: 14px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${safe.message}</div>
                <p style="margin: 20px 0 0; font-size: 13px; color: #64748b;">Reply directly to this sender by using the reply function in your email client.</p>
              </div>
            </div>
          `,
        },
        publicKey,
      );
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form submission failed', err);
      setError(`We couldn't send your request right now. Please try again or email ${CONTACT_EMAIL} directly.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const seo = <Seo {...PAGES.contact} pageType="ContactPage" crumbs={crumbs} mainEntityId={ORG_ID} />;

  if (submitted) {
    return (
      <div className="contact-page">
        {seo}
        <section className="page-hero page-hero-navy">
          <Breadcrumbs items={crumbs} />
          <div className="container">
            <div className="contact-success" role="status">
              <span className="contact-success-icon" aria-hidden="true">
                <Check size={48} />
              </span>
              <h1 className="contact-success-title">Thanks. We've got it.</h1>
              <p className="contact-success-body">
                Expect a reply from a senior member of our team within one business day to find a time that suits you.
              </p>
              <Button to="/" variant="ghost-light" size="lg">
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {seo}
      <section className="page-hero page-hero-navy">
        <Breadcrumbs items={crumbs} />
        <div className="container contact-grid">
          <div className="contact-left">
            <span className="eyebrow hero-eyebrow">Contact</span>
            <TypewriterHeading text={heading} splitIndex={0} className="hero-title" />
            <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
              Thirty minutes with a senior member of our team, with no obligation. We'll talk through where your
              business is losing time, leads or money, and which AI workers would help. Tell us a little about your
              business and we'll reply within one business day to book a time.
            </p>
            <address className="contact-details fade-up" style={{ animationDelay: '1.7s' }}>
              <h2 className="contact-details-title">Prefer to call, WhatsApp or email?</h2>
              <ul className="contact-details-list">
                {PHONE_LINES.map((line) => (
                  <li key={line.e164}>
                    <span className="contact-details-icon" aria-hidden="true">
                      <Phone size={18} />
                    </span>
                    <span>
                      <span className="contact-details-label">{line.country}</span>
                      <a href={line.tel}>{line.display}</a>
                      <span className="contact-details-sep" aria-hidden="true">
                        ·
                      </span>
                      <a
                        href={line.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${line.display}`}
                      >
                        WhatsApp
                      </a>
                    </span>
                  </li>
                ))}
                <li>
                  <span className="contact-details-icon" aria-hidden="true">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="contact-details-label">Email</span>
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </span>
                </li>
                <li>
                  <span className="contact-details-icon" aria-hidden="true">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="contact-details-label">Based in</span>
                    {LOCATION.label}. Serving {AREA_SERVED_LABEL}.
                  </span>
                </li>
              </ul>
            </address>
            <div className="contact-whatsapp fade-up" style={{ animationDelay: '1.8s' }}>
              <Button href={WHATSAPP_LINK} variant="ghost-light">
                <MessageCircle size={18} aria-hidden="true" className="btn-lead-icon" />
                {WHATSAPP_CTA}
              </Button>
            </div>
          </div>

          <div className="contact-right fade-up" style={{ animationDelay: '1.8s' }}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-required="true"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Work email *</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              <div className="form-field">
                <label htmlFor="company">Company *</label>
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  aria-required="true"
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Company name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="country">Country *</label>
                <div className="select-wrap">
                  <select
                    id="country"
                    aria-required="true"
                    value={form.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className={form.country ? 'has-value' : ''}
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow" aria-hidden="true" />
                </div>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="problem">What's costing you most right now? *</label>
                <div className="select-wrap">
                  <select
                    id="problem"
                    aria-required="true"
                    value={form.problem}
                    onChange={(e) => handleChange('problem', e.target.value as ProblemValue)}
                    className={form.problem ? 'has-value' : ''}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {problems.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow" aria-hidden="true" />
                </div>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="plan">Interested in *</label>
                <div className="select-wrap">
                  <select
                    id="plan"
                    aria-required="true"
                    value={form.plan}
                    onChange={(e) => handleChange('plan', e.target.value as InterestPlan)}
                    className={form.plan ? 'has-value' : ''}
                  >
                    <option value="" disabled>
                      Select a plan or service
                    </option>
                    {PLAN_OPTIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow" aria-hidden="true" />
                </div>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="teamSize">Team size *</label>
                <div className="select-wrap">
                  <select
                    id="teamSize"
                    aria-required="true"
                    value={form.teamSize}
                    onChange={(e) => handleChange('teamSize', e.target.value)}
                    className={form.teamSize ? 'has-value' : ''}
                  >
                    <option value="" disabled>
                      Select your team size
                    </option>
                    {teamSizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow" aria-hidden="true" />
                </div>
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="message">Anything else we should know? (optional)</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder={`Tools you use, what you've tried, what "success" would look like…`}
                  rows={4}
                />
              </div>

              {error && (
                <p className="form-error form-field-full" role="alert">
                  {error}
                </p>
              )}

              <div className="form-field-full">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  borderWrap
                  icon
                  className="contact-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending…' : submitLabel}
                </Button>
              </div>

              <p className="contact-alt form-field-full">
                Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
