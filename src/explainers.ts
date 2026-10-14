// 도구·계산기 해설 레지스트리 — src/explainers/<id>.ts (id 예: calc-severance, tools-notice)
export interface Explainer {
  title: string; // 해설 섹션 제목 (h2)
  updated: string; // 최종 검토일 YYYY-MM-DD
  html: string; // 본문 HTML (h3·p·ul·ol·table·statute·casebox 사용)
  faq: { q: string; a: string }[];
  sources: { issuer: string; title: string; url?: string }[];
  related: string[]; // 가이드 slug
}

const mods = import.meta.glob<{ default: Explainer }>('./explainers/*.ts', { eager: true });
export const EXPLAINERS: Record<string, Explainer> = Object.fromEntries(
  Object.entries(mods).map(([p, m]) => [p.replace(/^.*\/(.+)\.ts$/, '$1'), m.default])
);
