// 가온 사이트 전역 상수

export const SITE = {
  name: '가온',
  hanja: '家穩',
  tagline: '법률 셀프 해결 도구',
  brand: '가온(家穩) — 법률 셀프 해결 도구',
  slogan: '변호사를 부르기 전에, 스스로 할 수 있는 것부터.',
  url: 'https://gaonlaw.co.kr',
  helpline: '132',
} as const;

// 상단 내비게이션
export const NAV = [
  { href: '/tools/', label: '서식 생성' },
  { href: '/calc/', label: '계산기' },
  { href: '/guides/', label: '절차 가이드' },
  { href: '/search/', label: '검색' },
  { href: '/library/', label: '자료실', cta: true },
] as const;

// 8개 분야 (키 고정 — app.js 라우팅 / 가이드 앵커 / ?case= 에서 공유)
export const FIELDS = [
  { key: 'lease', label: '집·상가 임대차', desc: '보증금 반환, 월세 연체, 계약 갱신·해지, 원상복구' },
  { key: 'divorce', label: '이혼·가족', desc: '협의·재판이혼, 재산분할, 위자료, 양육비, 친권' },
  { key: 'inherit', label: '상속·유류분', desc: '상속 순위, 상속포기·한정승인, 유류분, 분할협의' },
  { key: 'labor', label: '임금·노동', desc: '임금·퇴직금 체불, 부당해고, 연차수당, 실업급여' },
  { key: 'debt', label: '빌려준 돈·채권', desc: '대여금·미수금 회수, 차용증, 지급명령, 소멸시효' },
  { key: 'traffic', label: '교통사고', desc: '합의금, 과실비율, 치료비·휴업손해, 형사합의' },
  { key: 'consumer', label: '소비자·환불', desc: '환불 거부, 계약 해지, 하자·A/S, 청약철회' },
  { key: 'defame', label: '명예훼손·모욕', desc: '온라인 비방·악플, 모욕, 사실적시 명예훼손, 고소' },
] as const;

export const FIELD_LABEL: Record<string, string> = Object.fromEntries(
  FIELDS.map((f) => [f.key, f.label])
);

// 인장 파비콘 (URL 인코딩 SVG data-uri)
export const FAVICON =
  "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2032%2032'%3E%3Crect%20width%3D'32'%20height%3D'32'%20rx%3D'4'%20fill%3D'%2314181F'%2F%3E%3Ccircle%20cx%3D'16'%20cy%3D'16'%20r%3D'11'%20fill%3D'none'%20stroke%3D'%23B4262A'%20stroke-width%3D'2'%2F%3E%3Ctext%20x%3D'16'%20y%3D'21'%20font-family%3D'serif'%20font-size%3D'14'%20font-weight%3D'700'%20text-anchor%3D'middle'%20fill%3D'%23fff'%3E%EA%B0%80%3C%2Ftext%3E%3C%2Fsvg%3E";
