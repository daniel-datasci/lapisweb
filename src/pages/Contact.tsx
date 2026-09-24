import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Check, ChevronDown } from 'lucide-react';
import Seo from '@/components/Seo';
import TypewriterHeading from '@/components/TypewriterHeading';
import Button from '@/components/Button';
import { breadcrumbLd, CONTACT_EMAIL, SITE_URL, type AuditTopic } from '@/data/site';
import './Contact.css';

const heading = "Let's find where your business is leaking time, leads and money.";

const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'UK', 'US', 'Canada', 'EU', 'Other'];

type ProblemValue = AuditTopic | 'not-sure';

const problems: { value: ProblemValue; label: string }[] = [
  { value: 'capacity', label: "We can't take on more without hiring" },
  { value: 'leads', label: "We're losing leads to slow replies" },
  { value: 'ai-spend', label: "Our AI spend isn't paying off" },
  { value: 'training', label: 'We want to train our team on AI and analytics' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const teamSizes = ['1–10', '11–50', '51–200', '201–1,000', '1,000+'];

const topicSources: Record<AuditTopic, string> = {
  capacity: 'Grow Without Hiring audit link',
  leads: 'Lead Leak Audit link',
  'ai-spend': 'AI Spend Audit link',
  training: 'AI & Analytics Training page',
};

const isTopic = (topic: string | null): topic is AuditTopic =>
  topic !== null && Object.prototype.hasOwnProperty.call(topicSources, topic);

const topicToProblem = (topic: string | null): ProblemValue | '' => (isTopic(topic) ? topic : '');

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
  teamSize: string;
  message: string;
};

export default function Contact() {
  const [params] = useSearchParams();
  const topic = params.get('topic');

  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    company: '',
    country: '',
    problem: topicToProblem(topic),
    teamSize: '',
    message: '',
  });
  const [prevTopic, setPrevTopic] = useState(topic);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Follow in-app navigation between ?topic= links while the page stays mounted.
  if (topic !== prevTopic) {
    setPrevTopic(topic);
    const next = topicToProblem(topic);
    if (next) setForm((prev) => ({ ...prev, problem: next }));
  }

  const handleChange = <K extends keyof Form>(field: K, value: Form[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.country || !form.problem || !form.teamSize) {
      setError("Please fill in your name, work email, company, country, what's costing you most and your team size.");
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
    const isTraining = form.problem === 'training';
    const emailTitle = isTraining ? 'New AI &amp; Analytics Training Enquiry' : 'New Free AI Audit Request';
    const emailIntro = isTraining
      ? 'A new training enquiry came in from The Lapis AI website.'
      : 'A new audit request came in from The Lapis AI website.';
    const message = form.message.trim() || 'No additional message provided.';
    const safe = {
      name: escapeHtml(form.name),
      email: escapeHtml(form.email),
      company: escapeHtml(form.company),
      country: escapeHtml(form.country),
      problem: escapeHtml(problemLabel),
      teamSize: escapeHtml(form.teamSize),
      source: escapeHtml(isTopic(topic) ? topicSources[topic] : ''),
      message: escapeHtml(message),
    };

    setIsSubmitting(true);
    setError('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          company: form.company,
          country: form.country,
          problem: problemLabel,
          team_size: form.teamSize,
          topic: topic ?? '',
          interest: problemLabel,
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

  const seo = (
    <Seo
      title="Book a Free AI Audit | The Lapis AI"
      description="Sixty minutes, no obligation, and a written roadmap you keep. We reply within one business day."
      path="/contact"
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Book a Free AI Audit | The Lapis AI',
          url: `${SITE_URL}/contact`,
          mainEntity: {
            '@type': 'Organization',
            name: 'The Lapis AI',
            email: CONTACT_EMAIL,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              email: CONTACT_EMAIL,
              availableLanguage: ['English'],
            },
          },
        },
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
      ]}
    />
  );

  if (submitted) {
    return (
      <div className="contact-page">
        {seo}
        <section className="page-hero page-hero-navy">
          <div className="container">
            <div className="contact-success" role="status">
              <span className="contact-success-icon" aria-hidden="true">
                <Check size={48} />
              </span>
              <h1 className="contact-success-title">Thanks. We've got it.</h1>
              <p className="contact-success-body">
                Expect a reply from a senior member of our team within one business day.
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
        <div className="container contact-grid">
          <div className="contact-left">
            <span className="eyebrow hero-eyebrow">Contact</span>
            <TypewriterHeading text={heading} splitIndex={0} className="hero-title" />
            <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
              Book your free AI audit: sixty minutes, no obligation, and a written roadmap you keep. Tell us a little
              about your business and we'll reply within one business day.
            </p>
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
                  {isSubmitting ? 'Sending…' : 'Book My Free AI Audit'}
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
