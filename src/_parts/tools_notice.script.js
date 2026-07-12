(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };

  // 상황별 문안 프리셋 (참고용 일반 예시 — 단정적 법률판단 없음)
  var PRESETS = {
    lease: {
      subject: '임대차보증금 반환 청구',
      body: '1. 귀하와 발신인은 20○○. ○○. ○○. 아래 부동산에 관하여 임대차계약(보증금 ○○○원)을 체결하였습니다.\n   - 목적물: ○○시 ○○구 ○○로 00, 000호\n2. 위 임대차계약은 20○○. ○○. ○○.자로 기간이 만료되었고, 발신인은 목적물을 원상대로 인도(예정)하였습니다.\n3. 그러나 귀하는 계약 종료 후 상당한 기간이 지나도록 보증금을 반환하지 않고 있습니다.',
      demand: '이에 발신인은 귀하에게 임대차보증금 ○○○원의 반환을 청구합니다.',
      deadline: '본 통지서 수령일로부터 14일 이내'
    },
    debt: {
      subject: '대여금 반환 청구',
      body: '1. 발신인은 귀하에게 20○○. ○○. ○○. 금 ○○○원을 대여하였습니다. (변제기: 20○○. ○○. ○○.)\n2. 그러나 귀하는 변제기가 도과하였음에도 위 대여금을 변제하지 않고 있습니다.',
      demand: '이에 발신인은 귀하에게 대여금 원금 ○○○원 및 이에 대한 지연이자의 지급을 청구합니다.',
      deadline: '본 통지서 수령일로부터 14일 이내'
    },
    labor: {
      subject: '체불 임금·퇴직금 지급 청구',
      body: '1. 발신인은 20○○. ○○. ○○.부터 20○○. ○○. ○○.까지 귀 사업장에서 근로를 제공하였습니다.\n2. 그러나 귀하(사용자)는 아래 금품을 지급기일이 지나도록 지급하지 않고 있습니다.\n   - 미지급 임금: ○○○원 (○○년 ○월분 등)\n   - 미지급 퇴직금: ○○○원',
      demand: '이에 발신인은 위 체불 금품 합계 ○○○원의 지급을 청구합니다. 지급되지 않을 경우 관할 지방고용노동청에 진정을 제기할 예정입니다.',
      deadline: '본 통지서 수령일로부터 7일 이내'
    },
    consumer: {
      subject: '계약 해지 및 환불(대금 반환) 요구',
      body: '1. 발신인은 20○○. ○○. ○○. 귀하로부터 아래 상품/서비스를 대금 ○○○원에 구매(계약)하였습니다.\n   - 내용: ○○○\n2. 그러나 (환불 거부 / 하자 / 계약 불이행 등) 사유로 계약의 목적을 달성할 수 없는 상태입니다.',
      demand: '이에 발신인은 위 계약의 해지(해제)를 통지하고, 기지급한 대금 ○○○원의 반환을 요구합니다.',
      deadline: '본 통지서 수령일로부터 14일 이내'
    },
    traffic: {
      subject: '교통사고 손해배상 청구',
      body: '1. 귀하는 20○○. ○○. ○○. ○○:○○경 ○○ 앞 도로에서 발신인에 대하여 교통사고를 일으켰습니다.\n2. 위 사고로 발신인은 치료비·휴업손해 등 손해를 입었습니다.\n   - 치료비: ○○○원 / 휴업손해: ○○○원 등',
      demand: '이에 발신인은 위 사고로 인한 손해액 ○○○원의 배상을 청구합니다.',
      deadline: '본 통지서 수령일로부터 14일 이내'
    },
    inherit: {
      subject: '유류분 반환 청구',
      body: '1. 피상속인 망 ○○○(20○○. ○○. ○○. 사망)의 상속인으로 발신인과 귀하 등이 있습니다.\n2. 피상속인은 생전 증여 및 유증으로 귀하에게 재산을 이전하였고, 그 결과 발신인의 유류분이 침해되었습니다.',
      demand: '이에 발신인은 민법에 따라 침해된 유류분에 상당하는 가액 ○○○원의 반환을 청구합니다.',
      deadline: '본 통지서 수령일로부터 14일 이내'
    },
    defame: {
      subject: '게시물 삭제 및 게시 중단 요구',
      body: '1. 귀하는 20○○. ○○. ○○. ○○(사이트/게시판)에 발신인에 관한 아래 게시물을 작성·게시하였습니다.\n   - 위치(URL): ○○○\n   - 내용 요지: ○○○\n2. 위 게시물은 발신인의 명예를 훼손하는 것으로, 발신인은 이에 대한 삭제와 재게시 중단을 요구합니다.',
      demand: '이에 발신인은 위 게시물의 즉시 삭제 및 동일·유사 내용의 게시 중단을 요구합니다. 불이행 시 민·형사상 조치를 검토하겠습니다.',
      deadline: '본 통지서 수령일로부터 7일 이내'
    },
    blank: { subject:'', body:'', demand:'', deadline:'본 통지서 수령일로부터 14일 이내' }
  };

  function setField(el, val, ph){
    if(val){ el.textContent = val; el.classList.remove('empty-ph'); }
    else { el.textContent = ph; el.classList.add('empty-ph'); }
  }

  function render(){
    setField($('d-to-name'), $('n-to-name').value, '(수신인 성명)');
    setField($('d-to-addr'), $('n-to-addr').value ? '주소: ' + $('n-to-addr').value : '', '(수신인 주소)');
    setField($('d-from-name'), $('n-from-name').value, '(발신인 성명)');
    setField($('d-from-addr'), $('n-from-addr').value ? '주소: ' + $('n-from-addr').value : '', '(발신인 주소)');
    var tel = $('n-from-tel').value;
    $('d-from-tel-wrap').style.display = tel ? '' : 'none';
    $('d-from-tel').textContent = tel ? '연락처: ' + tel : '';
    setField($('d-subject'), $('n-subject').value, '(제목)');
    setField($('d-body'), $('n-body').value, '(사건 경위를 입력하세요)');
    setField($('d-demand'), $('n-demand').value, '(요구사항을 입력하세요)');
    var dl = $('n-deadline').value || '기한 내';
    $('d-deadline-inline').textContent = dl;
    setField($('d-date'), $('n-date').value, '(작성일)');
    setField($('d-sign-name'), $('n-from-name').value, '(성명)');
  }

  function applyPreset(key){
    var p = PRESETS[key] || PRESETS.blank;
    $('n-subject').value = p.subject;
    $('n-body').value = p.body;
    $('n-demand').value = p.demand;
    $('n-deadline').value = p.deadline;
    render();
  }

  // 쿼리스트링 ?case= 진입
  function initCase(){
    var q = new URLSearchParams(location.search).get('case');
    var sel = $('n-case');
    var valid = q && PRESETS.hasOwnProperty(q) ? q : 'lease';
    sel.value = valid;
    applyPreset(valid);
  }

  // 오늘 날짜 기본값
  function todayKo(){
    // new Date() 사용 (브라우저 로컬 — 서버 전송 없음)
    var d = new Date();
    return d.getFullYear() + '년 ' + (d.getMonth()+1) + '월 ' + d.getDate() + '일';
  }

  // 이벤트 바인딩
  ['n-from-name','n-from-addr','n-from-tel','n-to-name','n-to-addr','n-subject','n-body','n-demand','n-deadline','n-date']
    .forEach(function(id){ $(id).addEventListener('input', render); });
  $('n-case').addEventListener('change', function(){ applyPreset(this.value); });
  $('n-print').addEventListener('click', function(){ window.print(); });
  $('n-clear').addEventListener('click', function(){
    ['n-from-name','n-from-addr','n-from-tel','n-to-name','n-to-addr','n-subject','n-body','n-demand'].forEach(function(id){ $(id).value=''; });
    render();
  });

  document.addEventListener('DOMContentLoaded', function(){
    $('n-date').value = todayKo();
    initCase();
  });
})();