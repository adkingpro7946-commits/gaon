// 분야별 관련 도구 링크 (가이드 하단 도구 박스)
export interface ToolLink {
  href: string;
  label: string;
}

export const GUIDE_TOOLS: Record<string, ToolLink[]> = {
  lease: [
    { href: '/tools/notice/?case=lease', label: '임대차 내용증명' },
    { href: '/tools/payment-order/', label: '지급명령 신청서' },
    { href: '/calc/court-fee/', label: '인지대 계산기' },
  ],
  divorce: [
    { href: '/tools/agreement/', label: '합의서·협의서 작성' },
    { href: '/calc/divorce/', label: '위자료·재산분할 범위' },
    { href: '/calc/court-fee/', label: '인지대 계산기' },
  ],
  inherit: [
    { href: '/calc/inheritance/', label: '상속지분·유류분 계산' },
    { href: '/tools/agreement/', label: '상속재산 분할협의서' },
    { href: '/tools/notice/?case=inherit', label: '유류분 내용증명' },
  ],
  labor: [
    { href: '/tools/labor-complaint/', label: '임금체불 진정서' },
    { href: '/calc/severance/', label: '퇴직금·연차수당 계산' },
  ],
  debt: [
    { href: '/tools/notice/?case=debt', label: '대여금 내용증명' },
    { href: '/tools/payment-order/', label: '지급명령 신청서' },
    { href: '/calc/prescription/', label: '소멸시효 계산' },
    { href: '/calc/interest/', label: '지연이자 계산' },
  ],
  traffic: [
    { href: '/tools/notice/?case=traffic', label: '손해배상 내용증명' },
    { href: '/calc/interest/', label: '지연이자 계산' },
  ],
  consumer: [
    { href: '/tools/notice/?case=consumer', label: '환불 요구 내용증명' },
    { href: '/tools/small-claim/', label: '소액사건 소장' },
  ],
  defame: [
    { href: '/tools/criminal-complaint/', label: '고소장 작성' },
    { href: '/tools/notice/?case=defame', label: '게시물 삭제 내용증명' },
  ],
};
