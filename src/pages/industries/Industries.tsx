import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHero from '@/components/PageHero';
import ResponsiveTable from '@/components/ResponsiveTable';
import CTASection from '@/components/CTASection';
import { industries } from '@/data/industries';
import { solutions } from '@/data/solutions';
import { breadcrumbLd } from '@/data/site';

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries We Serve | The Lapis AI"
        description="AI automation and agents for professional services, clinics, real estate, hospitality, e-commerce, logistics, education and SaaS, in Nigeria and worldwide."
        path="/industries"
        jsonLd={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ])}
      />

      <PageHero
        eyebrow="Industries"
        text="Different industries. The same three walls."
        splitIndex={0}
        subtext="Whether you run a clinic in Lekki, a law firm in Manchester or a SaaS company in Toronto, growth stalls in the same places: too much work running through too few people, enquiries slipping through the cracks, and technology that never quite delivers. Here's what that looks like in your world, and how we fix it."
        ctaLabel=""
      />

      <section className="section section-paper">
        <div className="container">
          <ResponsiveTable
            className="industry-matrix"
            caption="What we deploy in each industry, for each of the three solutions"
            columns={[{ label: 'Industry' }, ...solutions.map((s) => ({ label: `${s.num} ${s.name}` }))]}
            rows={industries.map((ind) => [
              <>
                <Link to={ind.path}>{ind.matrixName}</Link>
                {ind.examples && <span className="rtable-sub">{ind.examples}</span>}
              </>,
              ...solutions.map((s) => ind.deploy[s.id]),
            ])}
          />
        </div>
      </section>

      <CTASection
        heading="Find out where your business is leaking time, leads and money."
        subtext="A free 60-minute AI audit. You leave with a written roadmap of your top three opportunities, whether or not you work with us."
      />
    </>
  );
}
