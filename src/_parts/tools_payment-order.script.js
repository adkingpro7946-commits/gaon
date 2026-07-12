(function(){
  'use strict';
  var $=function(id){return document.getElementById(id);};
  var CAUSES={
    loan:{name:'대여금 청구의 독촉사건', cause:'1. 채권자는 채무자에게 20○○. ○○. ○○. 금 ○○○원을 대여하였습니다. (변제기: 20○○. ○○. ○○.)\n2. 그러나 채무자는 변제기가 지나도록 위 대여금을 변제하지 않고 있습니다.\n3. 이에 채권자는 위 대여금 및 지연손해금의 지급을 구하기 위하여 이 사건 신청에 이르렀습니다.'},
    goods:{name:'물품대금 청구의 독촉사건', cause:'1. 채권자는 채무자에게 20○○. ○○. ○○.부터 20○○. ○○. ○○.까지 물품(○○○)을 공급하였고, 그 대금은 합계 금 ○○○원입니다.\n2. 그러나 채무자는 지급기일이 지나도록 위 물품대금을 지급하지 않고 있습니다.\n3. 이에 채권자는 위 물품대금 및 지연손해금의 지급을 구합니다.'},
    rent:{name:'임대차보증금 반환 청구의 독촉사건', cause:'1. 채권자는 채무자와 20○○. ○○. ○○. 임대차계약(보증금 ○○○원)을 체결하였고, 위 계약은 20○○. ○○. ○○. 종료되었습니다.\n2. 채권자는 목적물을 인도하였으나 채무자는 보증금을 반환하지 않고 있습니다.\n3. 이에 채권자는 보증금 및 지연손해금의 지급을 구합니다.'},
    wage:{name:'약정금 청구의 독촉사건', cause:'1. 채권자와 채무자는 20○○. ○○. ○○. ○○에 관하여 금 ○○○원을 지급하기로 약정하였습니다.\n2. 그러나 채무자는 약정한 지급기일이 지나도록 이를 지급하지 않고 있습니다.\n3. 이에 채권자는 위 약정금 및 지연손해금의 지급을 구합니다.'}
  };
  function fmt(el){var v=el.value.replace(/[^0-9]/g,'');el.value=v?Number(v).toLocaleString('ko-KR'):'';}
  $('f-amount').addEventListener('input',function(){fmt(this);render();});
  function setF(el,val,ph){ if(val){el.textContent=val;el.classList.remove('empty-ph');} else {el.textContent=ph;el.classList.add('empty-ph');} }

  function purport(){
    var amt=$('f-amount').value||'○○○';
    var rate=$('f-rate').value;
    var from=$('f-from').value ? $('f-from').valueAsDate : null;
    var fromStr = from ? (from.getFullYear()+'. '+(from.getMonth()+1)+'. '+from.getDate()+'.') : '20○○. ○○. ○○.';
    var s='채무자는 채권자에게 금 '+amt+'원 및 이에 대하여 '+fromStr+'부터 ';
    if(rate==='0'){
      s+='이 사건 지급명령 정본이 송달된 날의 다음날부터 다 갚는 날까지 연 12%의 비율로 계산한 지연손해금을 지급하라.';
    } else {
      s+='이 사건 지급명령 정본이 송달된 날까지는 연 '+rate+'%, 그 다음날부터 다 갚는 날까지는 연 12%의 각 비율로 계산한 지연손해금을 지급하라.';
    }
    s+='\n독촉절차비용은 채무자가 부담한다.\n라는 지급명령을 구합니다.';
    return s;
  }
  function render(){
    setF($('d-cr-name'),$('f-cr-name').value,'(채권자)');
    setF($('d-cr-addr'),$('f-cr-addr').value,'(주소)');
    var tel=$('f-cr-tel').value; $('d-cr-tel-wrap').style.display=tel?'':'none'; $('d-cr-tel').textContent=tel;
    setF($('d-db-name'),$('f-db-name').value,'(채무자)');
    setF($('d-db-addr'),$('f-db-addr').value,'(주소)');
    $('d-caseName').textContent=CAUSES[$('f-kind').value].name;
    $('d-purport').textContent=purport();
    setF($('d-cause'),$('f-cause').value,'(청구 원인을 입력하세요)');
    setF($('d-attach'),$('f-attach').value,'(첨부서류)');
    setF($('d-date'),$('f-date').value,'(작성일)');
    setF($('d-sign'),$('f-cr-name').value,'(성명)');
    setF($('d-court'),$('f-court').value ? $('f-court').value+' 귀중' : '','(관할 법원) 귀중');
  }
  function applyKind(){ $('f-cause').value=CAUSES[$('f-kind').value].cause; render(); }
  ['f-court','f-cr-name','f-cr-addr','f-cr-tel','f-db-name','f-db-addr','f-from','f-rate','f-cause','f-attach','f-date']
    .forEach(function(id){ $(id).addEventListener('input',render); });
  $('f-rate').addEventListener('change',render); $('f-from').addEventListener('change',render);
  $('f-kind').addEventListener('change',applyKind);
  $('f-print').addEventListener('click',function(){window.print();});
  $('f-clear').addEventListener('click',function(){
    ['f-court','f-cr-name','f-cr-addr','f-cr-tel','f-db-name','f-db-addr','f-amount','f-cause'].forEach(function(id){$(id).value='';});
    render();
  });
  document.addEventListener('DOMContentLoaded',function(){
    var d=new Date(); $('f-date').value=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';
    applyKind();
  });
})();