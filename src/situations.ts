// 상황 선택기 (스펙 §7.3) — 현재 상태 → 다음 행동·가이드·도구
export interface Situation {
  id: string;
  label: string;
  field: string;
  lead: string; // 한 줄 안내
  guides: string[]; // 가이드 slug
  tools: { href: string; label: string }[];
}

export const SITUATIONS: Situation[] = [
  {
    id: 'lease-deposit',
    label: '전세·월세 보증금을 못 돌려받고 있어요',
    field: 'lease',
    lead: '계약이 끝났는데 집주인이 보증금을 안 줄 때. 이사 전 대항력부터 지키세요.',
    guides: ['lease-deposit-return', 'jeonse-fraud', 'lease-priority'],
    tools: [
      { href: '/tools/notice/?case=lease', label: '보증금 반환 내용증명' },
      { href: '/tools/payment-order/', label: '지급명령 신청서' },
      { href: '/calc/court-fee/', label: '인지대 계산' },
    ],
  },
  {
    id: 'divorce-prep',
    label: '이혼을 준비하고 있어요',
    field: 'divorce',
    lead: '협의·재판, 재산분할, 양육까지 순서대로 확인하세요.',
    guides: ['divorce-procedure', 'property-division', 'child-support', 'divorce-cost'],
    tools: [
      { href: '/tools/agreement/', label: '합의서·협의서 작성' },
      { href: '/calc/divorce/', label: '위자료·재산분할 범위' },
    ],
  },
  {
    id: 'child-support',
    label: '양육비를 못 받고 있어요',
    field: 'divorce',
    lead: '정해진 양육비를 안 줄 때, 강제할 수 있는 방법이 있습니다.',
    guides: ['child-support'],
    tools: [
      { href: '/tools/notice/?case=labor', label: '내용증명(이행 촉구)' },
      { href: '/tools/payment-order/', label: '지급명령 신청서' },
    ],
  },
  {
    id: 'inherit-start',
    label: '가족이 사망해 상속을 정리해야 해요',
    field: 'inherit',
    lead: '재산·빚 조회부터 분할·등기까지. 기한이 있는 절차가 많습니다.',
    guides: ['inheritance-order', 'safe-inheritance-service', 'estate-division', 'inheritance-registration'],
    tools: [
      { href: '/calc/inheritance/', label: '상속지분·유류분 계산' },
      { href: '/tools/agreement/', label: '상속재산 분할협의서' },
    ],
  },
  {
    id: 'inherit-debt',
    label: '상속받을 재산보다 빚이 많아요',
    field: 'inherit',
    lead: '3개월 안에 상속포기 또는 한정승인을 결정해야 합니다.',
    guides: ['renounce-inheritance', 'safe-inheritance-service'],
    tools: [{ href: '/calc/inheritance/', label: '상속지분 계산' }],
  },
  {
    id: 'reserved-share',
    label: '유류분을 못 받았어요',
    field: 'inherit',
    lead: '유언·증여로 최소한의 몫을 침해당했다면 반환청구할 수 있습니다.',
    guides: ['yuryubun-claim', 'yuryubun-2026'],
    tools: [
      { href: '/calc/inheritance/', label: '유류분 계산' },
      { href: '/tools/notice/?case=inherit', label: '유류분 내용증명' },
    ],
  },
  {
    id: 'unpaid-wage',
    label: '월급·퇴직금을 못 받았어요',
    field: 'labor',
    lead: '고용노동청 진정으로 국가가 대신 조사·압박해 줍니다.',
    guides: ['unpaid-wages', 'severance-claim', 'overtime-pay'],
    tools: [
      { href: '/tools/labor-complaint/', label: '임금체불 진정서' },
      { href: '/calc/severance/', label: '퇴직금·연차수당 계산' },
    ],
  },
  {
    id: 'dismissal',
    label: '부당하게 해고당했어요',
    field: 'labor',
    lead: '3개월 안에 노동위원회에 구제신청을 할 수 있습니다.',
    guides: ['unfair-dismissal'],
    tools: [{ href: '/tools/labor-complaint/', label: '진정서 작성' }],
  },
  {
    id: 'harassment',
    label: '직장 내 괴롭힘을 당하고 있어요',
    field: 'labor',
    lead: '참을 문제가 아닙니다. 사내 신고와 고용노동청 진정 절차가 있습니다.',
    guides: ['workplace-harassment', 'unfair-dismissal'],
    tools: [{ href: '/tools/labor-complaint/', label: '진정서 작성' }],
  },
  {
    id: 'lent-money',
    label: '빌려준 돈을 못 받고 있어요',
    field: 'debt',
    lead: '내용증명 → 지급명령 → 소송 순서로 압박하세요. 소멸시효 주의.',
    guides: ['debt-recovery-steps', 'iou-notarization', 'debt-prescription'],
    tools: [
      { href: '/tools/notice/?case=debt', label: '대여금 내용증명' },
      { href: '/tools/payment-order/', label: '지급명령 신청서' },
      { href: '/calc/interest/', label: '지연이자 계산' },
    ],
  },
  {
    id: 'traffic',
    label: '교통사고 합의를 앞두고 있어요',
    field: 'traffic',
    lead: '합의금 항목과 과실비율을 알아야 손해 안 봅니다.',
    guides: ['traffic-settlement', 'fault-ratio', 'criminal-settlement'],
    tools: [{ href: '/calc/interest/', label: '지연이자 계산' }],
  },
  {
    id: 'refund',
    label: '환불을 거부당했어요',
    field: 'consumer',
    lead: '청약철회·중도해지 권리가 판매자 약관보다 우선합니다.',
    guides: ['refund-withdrawal', 'contract-cancellation', 'defect-refund'],
    tools: [
      { href: '/tools/notice/?case=consumer', label: '환불 요구 내용증명' },
      { href: '/tools/small-claim/', label: '소액사건 소장' },
    ],
  },
  {
    id: 'scam',
    label: '중고거래 사기를 당했어요',
    field: 'consumer',
    lead: '금액이 작아도 대응할 수 있습니다. 증거 보전 → 경찰 신고 → 민사.',
    guides: ['secondhand-fraud'],
    tools: [
      { href: '/tools/criminal-complaint/', label: '고소장 작성' },
      { href: '/tools/small-claim/', label: '소액사건 소장' },
    ],
  },
  {
    id: 'defame',
    label: '온라인에서 명예훼손·모욕을 당했어요',
    field: 'defame',
    lead: '삭제되기 전 증거부터. 캡처 → 고소 → 손해배상 순서입니다.',
    guides: ['defamation-response', 'sns-defamation', 'evidence-preservation', 'stalking-response'],
    tools: [
      { href: '/tools/criminal-complaint/', label: '고소장 작성' },
      { href: '/tools/notice/?case=defame', label: '게시물 삭제 내용증명' },
    ],
  },
];
