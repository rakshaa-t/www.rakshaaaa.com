import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCaseStudyBySlug, getAdjacentCaseStudies, getAllCaseStudySlugs } from '@/lib/case-studies-data';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudySection from '@/components/case-study/CaseStudySection';
import CaseStudyGallery from '@/components/case-study/CaseStudyGallery';
import CaseStudyNav from '@/components/case-study/CaseStudyNav';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} - ${caseStudy.subtitle} | Raksha`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.title} - ${caseStudy.subtitle}`,
      description: caseStudy.description,
      images: [caseStudy.heroImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} - ${caseStudy.subtitle}`,
      description: caseStudy.description,
      images: [caseStudy.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <main>
      {/* Hero Section */}
      <CaseStudyHero
        title={caseStudy.title}
        subtitle={caseStudy.subtitle}
        role={caseStudy.role}
        duration={caseStudy.duration}
        year={caseStudy.year}
        description={caseStudy.description}
        heroImage={caseStudy.heroImage}
        backgroundColor={caseStudy.backgroundColor}
        accentColor={caseStudy.accentColor}
      />

      {/* Content Sections */}
      <div className="bg-white">
        <div className="mx-auto max-w-5xl px-6">
          {/* Challenge */}
          <CaseStudySection
            title={caseStudy.challenge.title}
            content={caseStudy.challenge.content}
            accentColor={caseStudy.accentColor}
            index={0}
          />

          {/* Process */}
          <CaseStudySection
            title={caseStudy.process.title}
            content={caseStudy.process.content}
            items={caseStudy.process.steps}
            accentColor={caseStudy.accentColor}
            index={1}
          />

          {/* Solution */}
          <CaseStudySection
            title={caseStudy.solution.title}
            content={caseStudy.solution.content}
            highlights={caseStudy.solution.highlights}
            accentColor={caseStudy.accentColor}
            index={2}
          />

          {/* Impact */}
          <CaseStudySection
            title={caseStudy.impact.title}
            content={caseStudy.impact.content}
            metrics={caseStudy.impact.metrics}
            accentColor={caseStudy.accentColor}
            index={3}
          />

          {/* Gallery */}
          <CaseStudyGallery
            images={caseStudy.gallery}
            title={caseStudy.title}
          />

          {/* Navigation */}
          <CaseStudyNav prev={prev} next={next} />
        </div>
      </div>
    </main>
  );
}
