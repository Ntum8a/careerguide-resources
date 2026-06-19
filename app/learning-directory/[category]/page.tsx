import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DirectoryGrid from '@/components/DirectoryGrid'
import { getLearningByCategory, LEARNING_CATEGORIES } from '@/lib/content'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return LEARNING_CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = LEARNING_CATEGORIES.find((c) => c.slug === category)
  if (!cat) return {}
  return {
    title: `${cat.label} Courses`,
    description: `Free and affordable ${cat.label.toLowerCase()} courses and learning resources for young people.`,
  }
}

export default async function LearningCategoryPage({ params }: Props) {
  const { category } = await params
  const cat = LEARNING_CATEGORIES.find((c) => c.slug === category)
  if (!cat) notFound()

  const listings = getLearningByCategory(category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--color-brand-teal)]">Home</Link>
        <span>/</span>
        <Link href="/learning-directory" className="hover:text-[var(--color-brand-teal)]">Learning Directory</Link>
        <span>/</span>
        <span className="text-[var(--color-body)] font-medium">{cat.label}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-body)] mb-3">{cat.label}</h1>
        <p className="text-lg text-[var(--color-muted)]">
          {listings.length} free and affordable {cat.label.toLowerCase()} {listings.length === 1 ? 'course' : 'courses'} available.
        </p>
      </div>

      <DirectoryGrid listings={listings} basePath="/learning-directory" />
    </div>
  )
}
