import { useState } from 'react';
import emailjs from '@emailjs/browser';
import TypewriterHeading from '@/components/TypewriterHeading';
import Button from '@/components/Button';
import Reveal from '@/components/Reveal';
import { Check, ChevronDown } from 'lucide-react';
import './Contact.css';

const heading = 'Let\u2019s Find Out What You\u2019re Missing.';

const interests = [
  'AI Consulting',
  'Market & Competitive Intelligence',
  'AI Agents',
  'AI Infrastructure',
  'Not Sure Yet',
];


const stage = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Growing Company/Business',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    stage: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.interest || !form.stage) {
      setError('Please fill in your name, email, company, and what you&rsquo;re interested in.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError('Email delivery is not configured yet. Please contact the site owner directly.');
      return;
    }

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
          interest: form.interest,
          stage: form.stage,
          message: form.message || 'No additional message provided.',
          to_email: 'info.thelapisai@gmail.com',
          reply_to: form.email,
          email_content: `
            <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
              <div style="background: linear-gradient(135deg, #0b1a33 0%, #142a4d 100%); padding: 24px 32px; border-radius: 12px 12px 0 0;">
                <h2 style="margin: 0; color: #f7f8f6; font-size: 24px;">New Contact Request</h2>
                <p style="margin: 8px 0 0; color: #d9dfe8;">A new inquiry came in from the The Lapis AI website.</p>
              </div>
              <div style="padding: 24px 32px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
                <p style="margin: 0 0 12px;"><strong>Name:</strong> ${form.name}</p>
                <p style="margin: 0 0 12px;"><strong>Email:</strong> ${form.email}</p>
                <p style="margin: 0 0 12px;"><strong>Company:</strong> ${form.company}</p>
                <p style="margin: 0 0 12px;"><strong>Interest:</strong> ${form.interest}</p>
                <p style="margin: 0 0 12px;"><strong>Stage:</strong> ${form.stage}</p>
                <p style="margin: 0 0 12px;"><strong>Message:</strong></p>
                <div style="padding: 14px 16px; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${form.message || 'No additional message provided.'}</div>
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
      setError('We could not send your request right now. Please try again or email info.thelapisai@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <section className="page-hero page-hero-navy">
          <div className="container">
            <div className="contact-success">
              <span className="contact-success-icon">
                <Check size={48} />
              </span>
              <h1 className="contact-success-title">Thank you, {form.name.split(' ')[0]}.</h1>
              <p className="contact-success-body">
                We&rsquo;ve received your request and will reach out within two hours to schedule your free
                AI readiness audit. Check your inbox at {form.email}.
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
      <section className="page-hero page-hero-navy">
        <div className="container contact-grid">
          <div className="contact-left">
            <span className="eyebrow hero-eyebrow">Contact</span>
            <TypewriterHeading text={heading} splitIndex={0} className="hero-title" />
            <p className="hero-sub fade-up" style={{ animationDelay: '1.5s' }}>
              Book your free readiness audit. Sixty minutes, no obligation, a roadmap you keep. Tell us a bit
              about your business and we&rsquo;ll be in touch within one business day.
            </p>
          </div>
          <div className="contact-right fade-up" style={{ animationDelay: '1.8s' }}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
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
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Your company"
                />
              </div>
              <div className="form-field">
                <label htmlFor="interest">What are you most interested in? *</label>
                <div className="select-wrap">
                  <select
                    id="interest"
                    value={form.interest}
                    onChange={(e) => handleChange('interest', e.target.value)}
                    className={form.interest ? 'has-value' : ''}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {interests.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="stage">What stage is your compnay/business? *</label>
                <div className="select-wrap">
                  <select
                    id="stage"
                    value={form.stage}
                    onChange={(e) => handleChange('stage', e.target.value)}
                    className={form.stage ? 'has-value' : ''}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {stage.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="select-arrow" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message (optional)</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us anything that would help us prepare for the audit."
                  rows={4}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                borderWrap
                icon
                className="contact-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send & Book My Free Audit'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
