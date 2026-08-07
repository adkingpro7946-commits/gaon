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
    guides: ['child-support', 'child-support-enforcement'],
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
    id: 'over-indebted',
    label: '빚이 소득으로 감당이 안 돼요',
    field: 'debtrelief',
    lead: '소득이 있으면 개인회생(3년 변제), 없으면 파산·면책. 법원 전에 채무조정도 있습니다.',
    guides: ['personal-rehabilitation', 'bankruptcy-discharge', 'debt-workout'],
    tools: [{ href: '/calc/prescription/', label: '소멸시효 계산' }],
  },
  {
    id: 'garnishment',
    label: '급여·통장이 압류되거나 불법 추심을 당해요',
    field: 'debtrelief',
    lead: '월 185만원·급여의 절반은 압류금지입니다. 야간·협박 추심은 불법이니 신고하세요.',
    guides: ['wage-garnishment', 'illegal-collection', 'debt-prescription'],
    tools: [
      { href: '/tools/notice/', label: '내용증명(소멸시효·채무부존재)' },
      { href: '/calc/prescription/', label: '소멸시효 계산' },
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
  {
    id: 'diy-lawsuit',
    label: '변호사 없이 직접 소송하려고 해요',
    field: 'litigation',
    lead: '전자소송으로 집에서 접수할 수 있습니다. 관할·소가·인지대부터 확인하세요.',
    guides: ['e-litigation', 'civil-lawsuit-flow', 'court-jurisdiction', 'evidence-in-court'],
    tools: [
      { href: '/tools/small-claim/', label: '소액사건 소장' },
      { href: '/tools/payment-order/', label: '지급명령 신청서' },
      { href: '/calc/court-fee/', label: '인지대·송달료 계산' },
    ],
  },
  {
    id: 'fraud-victim',
    label: '사기를 당했어요 (돈을 떼였어요)',
    field: 'criminal',
    lead: '형사고소로 처벌을, 민사로 돈을 받습니다. 증거 보전부터 하세요.',
    guides: ['fraud-complaint', 'criminal-complaint-process', 'evidence-preservation'],
    tools: [
      { href: '/tools/criminal-complaint/', label: '고소장 작성' },
      { href: '/tools/payment-order/', label: '지급명령 신청서' },
    ],
  },
  {
    id: 'assault-victim',
    label: '폭행·협박을 당했어요',
    field: 'criminal',
    lead: '진단서·증거부터 확보하세요. 폭행·협박은 합의 여부가 중요합니다.',
    guides: ['assault-injury', 'threat-extortion', 'criminal-complaint-process'],
    tools: [
      { href: '/tools/criminal-complaint/', label: '고소장 작성' },
      { href: '/tools/agreement/', label: '합의서 작성' },
    ],
  },
  {
    id: 'falsely-accused',
    label: '억울하게 고소·신고를 당했어요',
    field: 'criminal',
    lead: '경찰 조사에 침착하게 대응하고, 허위 신고라면 무고로 대응할 수 있습니다.',
    guides: ['false-accusation', 'criminal-complaint-process'],
    tools: [{ href: '/tools/agreement/', label: '합의서 작성' }],
  },
  {
    id: 'fine-dispute',
    label: '과태료·범칙금이 억울해요',
    field: 'admin',
    lead: '통지받은 날부터 60일 안에 이의제기하면 법원 재판으로 다툴 수 있습니다.',
    guides: ['fine-objection', 'admin-appeal'],
    tools: [],
  },
  {
    id: 'license-revoked',
    label: '운전면허가 취소·정지됐어요',
    field: 'admin',
    lead: '이의신청(60일)이나 행정심판(90일)으로 구제를 다툴 수 있습니다.',
    guides: ['license-revocation', 'admin-appeal'],
    tools: [],
  },
];
