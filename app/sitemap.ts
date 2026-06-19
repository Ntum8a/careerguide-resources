import type { MetadataRoute } from 'next'
import { getResources, LEARNING_CATEGORIES, HIDDEN_SUBCATEGORIES } from '@/lib/content'

const BASE_URL = 'https://resources.careerguide.network'

export default function sitemap(): MetadataRoute.Sitemap {
  const resources = getResources()

  const staticRoutes = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/resources`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/learning-directory`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/hidden-opportunities`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/contact`, priority: 0.5, changeFrequency: 'yearly' as const },
  ]

  const resourceRoutes = resources.map((r) => ({
    url: `${BASE_URL}/resources/${r.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(r.publishedAt),
  }))

  const learningCategoryRoutes = LEARNING_CATEGORIES.map((c) => ({
    url: `${BASE_URL}/learning-directory/${c.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const hiddenSubcategoryRoutes = HIDDEN_SUBCATEGORIES.map((s) => ({
    url: `${BASE_URL}/hidden-opportunities/${s.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...resourceRoutes, ...learningCategoryRoutes, ...hiddenSubcategoryRoutes]
}
