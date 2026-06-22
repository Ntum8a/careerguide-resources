import resourcesData from '@/content/resources.json'
import learningData from '@/content/learning-directory.json'
import apprenticeshipsData from '@/content/hidden-opportunities/apprenticeships.json'
import insightData from '@/content/hidden-opportunities/insight-programmes.json'
import workExpData from '@/content/hidden-opportunities/work-experience.json'
import competitionsData from '@/content/hidden-opportunities/competitions.json'
import scholarshipsData from '@/content/hidden-opportunities/scholarships.json'
import mentoringData from '@/content/hidden-opportunities/mentoring.json'

export type Resource = (typeof resourcesData.resources)[0]
export type LearningListing = (typeof learningData.listings)[0]

export type HiddenSubcategory =
  | 'apprenticeships'
  | 'insight-programmes'
  | 'work-experience'
  | 'competitions'
  | 'scholarships'
  | 'mentoring'

export const HIDDEN_SUBCATEGORIES: { slug: HiddenSubcategory; label: string; description: string }[] = [
  { slug: 'apprenticeships', label: 'Apprenticeships', description: 'Earn while you learn — degree-level to advanced qualifications' },
  { slug: 'insight-programmes', label: 'Insight Programmes', description: 'Short structured looks inside industries and employers' },
  { slug: 'work-experience', label: 'Work Experience', description: 'Hands-on placements from 1 week to several months' },
  { slug: 'competitions', label: 'Competitions', description: 'Business challenges, design prizes, STEM competitions' },
  { slug: 'scholarships', label: 'Scholarships', description: 'Funding and bursaries for your education and career' },
  { slug: 'mentoring', label: 'Mentoring', description: 'Guidance from professionals in your chosen field' },
]

export const LEARNING_CATEGORIES = [
  { slug: 'digital-skills', label: 'Digital Skills' },
  { slug: 'business-finance', label: 'Business & Finance' },
  { slug: 'creative-skills', label: 'Creative Skills' },
  { slug: 'employability', label: 'Employability' },
  { slug: 'stem', label: 'STEM' },
  { slug: 'languages', label: 'Languages' },
  { slug: 'health-social', label: 'Health & Social' },
  { slug: 'leadership', label: 'Leadership' },
]

export const RESOURCE_CATEGORIES = [
  { slug: 'getting-started', label: 'Getting Started' },
  { slug: 'cv-applications', label: 'CV & Applications' },
  { slug: 'interview-prep', label: 'Interview Prep' },
  { slug: 'money-work', label: 'Money & Work' },
  { slug: 'future-skills', label: 'Future Skills' },
]

export function getResources(): Resource[] {
  return resourcesData.resources
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return resourcesData.resources.find((r) => r.slug === slug)
}

export function getFeaturedResources(): Resource[] {
  return resourcesData.resources.filter((r) => r.featured)
}

export function getLearningListings(): LearningListing[] {
  return learningData.listings
}

export function getLearningListingBySlug(slug: string) {
  return learningData.listings.find((l) => l.slug === slug)
}

export function getLearningByCategory(category: string): LearningListing[] {
  return learningData.listings.filter((l) => l.category === category)
}

const hiddenOpportunitiesMap: Record<HiddenSubcategory, { listings: unknown[] }> = {
  'apprenticeships': apprenticeshipsData,
  'insight-programmes': insightData,
  'work-experience': workExpData,
  'competitions': competitionsData,
  'scholarships': scholarshipsData,
  'mentoring': mentoringData,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHiddenOpportunities(subcategory: HiddenSubcategory): any[] {
  return hiddenOpportunitiesMap[subcategory]?.listings ?? []
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHiddenOpportunityBySlug(subcategory: HiddenSubcategory, slug: string): any | undefined {
  return getHiddenOpportunities(subcategory).find((l: any) => l.slug === slug)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getFeaturedHiddenOpportunities(): { listing: any; subcategory: HiddenSubcategory }[] {
  const results: { listing: any; subcategory: HiddenSubcategory }[] = []
  for (const sub of HIDDEN_SUBCATEGORIES) {
    for (const listing of getHiddenOpportunities(sub.slug)) {
      if (listing.isFeatured) results.push({ listing, subcategory: sub.slug })
    }
  }
  return results
}

export function formatDownloadCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace('.0', '')}k`
  return count.toString()
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    'getting-started': 'bg-[var(--color-cat-getting-started)] text-white',
    'cv-applications': 'bg-[var(--color-cat-cv)] text-white',
    'interview-prep': 'bg-[var(--color-cat-interview)] text-white',
    'money-work': 'bg-[var(--color-cat-money)] text-white',
    'future-skills': 'bg-[var(--color-cat-future)] text-white',
  }
  return map[category] ?? 'bg-slate-500 text-white'
}

export function getDeadlineStatus(deadline: string): 'urgent' | 'soon' | 'normal' | 'rolling' {
  if (deadline === 'rolling') return 'rolling'
  const d = new Date(deadline)
  const now = new Date()
  const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  if (diff < 14) return 'urgent'
  if (diff < 30) return 'soon'
  return 'normal'
}
