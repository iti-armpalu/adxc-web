// src/types/content.ts — shared DTOs, start minimal
export type Audience = 'brands' | 'data-providers' | 'ai-platforms'

export interface SeoMetadata {
  title: string
  description: string
  ogImage?: string
}