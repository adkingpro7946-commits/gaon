/* ============================================================
   가온(GAON) — 홈 진단 위저드 라우팅 엔진
   "나는 [분야]  문제로, [목적] 하려고 합니다."
   8분야 × 5목적 = 40경로. 입력값은 서버로 전송하지 않는다.
   ============================================================ */
(function () {
  'use strict';

  /* --- 8분야 (키는 절대 변경 금지: app.js / guides 앵커 / ?case= 에서 공유) --- */
  var FIELD = {
    lease:    { label: '집·상가 임대차', guide: 'lease',    noticeCase: 'lease',
                desc: '보증금 반환, 월세 연체, 계약 갱신·해지, 원상복구 분쟁' },
    divorce:  { label: '이혼·가족',      guide: 'divorce',  noticeCase: '',
                desc: '협의·재판이혼, 재산분할, 위자료, 양육비, 친권' },
    inherit:  { label: '상속·유류분',    guide: 'inherit',  noticeCase: 'inherit',
                desc: '상속 순위, 상속포기·한정승인, 유류분, 분할협의' },
    labor:    { label: '임금·노동',      guide: 'labor',    noticeCase: 'labor',
                desc: '임금·퇴직금 체불, 부당해고, 연차수당, 실업급여' },
    debt:     { label: '빌려준 돈·채권', guide: 'debt',     noticeCase: 'debt',
                desc: '대여금·미수금 회수, 차용증, 지급명령, 소멸시효' },
    traffic:  { label: '교통사고',       guide: 'traffic',  noticeCase: 'traffic',
                desc: '합의금, 과실비율, 치료비·휴업손해, 형사합의' },
    consumer: { label: '소비자·환불',    guide: 'consumer', noticeCase: 'consumer',
                desc: '환불 거부, 계약 해지, 하자·A/S, 청약철회' },
    defame:   { label: '명예훼손·모욕',  guide: 'defame',   noticeCase: 'defame',
                desc: '온라인 비방·악플, 모욕, 사실적시 명예훼손, 고소' }
  };

  /* --- 5목적 --- */
  var GOAL = {
    learn:  { label: '절차부터 차근차근 알아보려고' },
    write:  { label: '필요한 서류를 직접 작성하려고' },
    calc:   { label: '금액이 얼마인지 계산해보려고' },
    demand: { label: '상대에게 정식으로 요구하려고' },
    act:    { label: '법적 절차를 밟아보려고' }
  };

  /* --- 도구 링크 헬퍼 --- */
  function L(href, label) { return { href: href, label: label }; }
  function guideLink(f) { return L('/guides/#' + FIELD[f].guide, '절차 가이드 보기'); }
  function noticeLink(f) {
    var c = FIELD[f].noticeCase;
    return L('/tools/notice/' + (c ? '?case=' + c : ''), '내용증명 생성기');
  }
  var courtFee = L('/calc/court-fee/', '인지대·송달료 계산기');
  var libLink  = L('/library/', '심화 자료실');

  /* --- 분야별 대표 도구 (write/act/calc 목적에서 사용) --- */
  var TOOLS = {
    lease:    { write: noticeLink('lease'),  act: L('/tools/payment-order/','지급명령 신청서'), calc: courtFee },
    divorce:  { write: L('/tools/agreement/','합의서·협의서 작성'), act: courtFee, calc: L('/calc/divorce/','위자료·재산분할 범위 계산') },
    inherit:  { write: L('/tools/agreement/','상속재산 분할협의서'), act: courtFee, calc: L('/calc/inheritance/','상속지분·유류분 계산') },
    labor:    { write: L('/tools/labor-complaint/','임금체불 진정서'), act: L('/tools/labor-complaint/','임금체불 진정서'), calc: L('/calc/severance/','퇴직금·연차수당 계산') },
    debt:     { write: noticeLink('debt'),   act: L('/tools/payment-order/','지급명령 신청서'), calc: L('/calc/interest/','지연이자 계산') },
    traffic:  { write: noticeLink('traffic'),act: courtFee, calc: L('/calc/interest/','지연이자 계산') },
    consumer: { write: noticeLink('consumer'),act: L('/tools/small-claim/','소액사건 소장'), calc: courtFee },
    defame:   { write: L('/tools/criminal-complaint/','고소장 작성'), act: L('/tools/criminal-complaint/','고소장 작성'), calc: courtFee }
  };

  /* --- 목적별 진단 문안 템플릿 --- */
  function verdict(field, goal) {
    var f = FIELD[field], t = TOOLS[field] || {};
    var head, body, links = [];

    switch (goal) {
      case 'learn':
        head = f.label + ' 문제, 어디서부터 봐야 할까';
        body = '급하게 소송부터 갈 일은 아닐 수 있습니다. ' + f.desc + ' 등 이 분야의 절차와 순서를 먼저 정리해 두면, 불필요한 비용을 아낄 수 있습니다.';
        links = [ guideLink(field) ];
        if (t.calc) links.push(t.calc);
        break;
      case 'write':
        head = '서류는 직접 작성할 수 있습니다';
        body = f.label + ' 관련 서식을 이용자가 직접 채워 넣는 방식으로 안내합니다. 작성한 내용은 브라우저 안에서만 처리되며 서버로 전송되지 않습니다.';
        links = [ t.write || noticeLink(field), guideLink(field) ];
        break;
      case 'calc':
        head = '먼저 금액부터 가늠해 봅니다';
        body = '정확한 판단은 사안마다 다르지만, 일반적인 산정 기준으로 대략의 범위를 계산해 볼 수 있습니다. 실제 결정·판결과는 차이가 있을 수 있습니다.';
        links = [ t.calc || courtFee, guideLink(field) ];
        break;
      case 'demand':
        head = '내용증명으로 정식 의사표시를 남깁니다';
        body = '소송 전에, 상대에게 요구사항과 이행기한을 공식적으로 통지하는 단계입니다. 발송 기록 자체가 이후 절차의 근거가 됩니다.';
        links = [ noticeLink(field), guideLink(field) ];
        break;
      case 'act':
        head = '법적 절차, 순서대로 밟습니다';
        body = f.label + ' 사안에서 밟을 수 있는 정식 절차와, 그에 필요한 서식·비용을 안내합니다. 절차·기한을 놓치지 않는 것이 핵심입니다.';
        links = [ t.act || noticeLink(field), courtFee, guideLink(field) ];
        break;
      default:
        head = f.label; body = f.desc; links = [ guideLink(field) ];
    }

    // 심화가 필요한 사건은 자료실로
    links.push(libLink);
    return { head: head, body: body, links: links };
  }

  /* --- 셀렉트 채우기 --- */
  function fillSelect(sel, obj, placeholder) {
    if (!sel) return;
    var html = '<option value="" disabled selected>' + placeholder + '</option>';
    Object.keys(obj).forEach(function (k) {
      html += '<option value="' + k + '">' + obj[k].label + '</option>';
    });
    sel.innerHTML = html;
  }

  /* --- 진단 실행 --- */
  function diagnose() {
    var fs = document.getElementById('diag-field');
    var gs = document.getElementById('diag-goal');
    var box = document.getElementById('diag-result');
    if (!fs || !gs || !box) return;

    var field = fs.value, goal = gs.value;
    if (!field || !goal) {
      fs.setAttribute('aria-invalid', field ? 'false' : 'true');
      gs.setAttribute('aria-invalid', goal ? 'false' : 'true');
      return;
    }
    fs.removeAttribute('aria-invalid'); gs.removeAttribute('aria-invalid');

    var v = verdict(field, goal);
    var linksHtml = v.links.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + ' &rsaquo;</a>';
    }).join('');

    box.innerHTML =
      '<div class="stamp-box">' +
        '<div class="stamp"><span class="inner">가온<br>진단</span></div>' +
        '<div class="verdict">' +
          '<h3>' + v.head + '</h3>' +
          '<p>' + v.body + '</p>' +
          '<div class="tool-links">' + linksHtml + '</div>' +
        '</div>' +
      '</div>';

    // 도장 애니메이션 재생 (리플로우 트릭 — 두 번째 클릭부터 재생되게. 지우지 말 것)
    box.classList.remove('show');
    void box.offsetWidth;
    box.classList.add('show');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* --- 초기화 --- */
  document.addEventListener('DOMContentLoaded', function () {
    fillSelect(document.getElementById('diag-field'), FIELD, '분야 선택');
    fillSelect(document.getElementById('diag-goal'), GOAL, '목적 선택');
    var btn = document.getElementById('diag-run');
    if (btn) btn.addEventListener('click', diagnose);
  });

  // 외부에서도 호출 가능하게 노출
  window.GAON = { diagnose: diagnose, FIELD: FIELD, GOAL: GOAL };
})();