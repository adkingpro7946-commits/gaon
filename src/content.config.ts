import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 절차 가이드 콘텐츠 모델 (스펙 §10 Article 적용)
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(), // <title>·og
    h1: z.string(), // 페이지 대제목 (title과 다름)
    description: z.string(),
    field: z.enum([
      'lease',
      'divorce',
      'inherit',
      'labor',
      'debt',
      'traffic',
      'consumer',
      'defame',
    ]),
    kicker: z.string(),
    audience: z.string().optional(),
    status: z
      .enum(['researching', 'drafted', 'fact_checked', 'legal_review', 'published', 'archived'])
      .default('published'),
    publishedAt: z.string().default('2026-07-11'),
    updatedAt: z.string().default('2026-07-11'),
    lastVerifiedAt: z.string().default('2026-07-11'),
    author: z.string().default('가온 편집팀'),
    reviewer: z.string().default('가온 편집팀'),
    readingTime: z.string().optional(),
    // 공식 출처 (스펙 §10 SourceReference 간소화)
    sources: z
      .array(
        z.object({
          issuer: z.string(),
          title: z.string(),
          url: z.string().optional(),
        })
      )
      .default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { guides };
