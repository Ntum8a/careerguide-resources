'use client'

import Fuse from 'fuse.js'

export function createResourceSearch<T>(items: T[], keys: string[]) {
  return new Fuse(items, {
    keys,
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  })
}

export function searchItems<T>(fuse: Fuse<T>, query: string): T[] {
  if (!query.trim()) return []
  return fuse.search(query).map((r) => r.item)
}
