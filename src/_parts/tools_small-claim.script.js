(function(){
  'use strict';
  var $=function(id){return document.getElementById(id);};
  function fmt(el){var v=el.value.replace(/[^0-9]/g,'');el.value=v?Number(v).toLocaleString('ko-KR'):'';}
  $('f-amount').addEventListener('input',function(){fmt(this);render();});
  function setF(el,val,ph){ if(val){el.textContent=val;el.classList.remove('empty-ph');} else {el.textContent=ph;el.classList.add('empty-ph');} }

  function purport(){
    var amt=$('f-amount').value||'○○○';
    var rate=$('f-rate').value;
    var from=$('f-from').value?$('f-from').valueAsDate:null;
    var fromStr=from?(from.getFullYear()+'. '+(from.getMonth()+1)+'. '+from.getDate()+'.'):'20○○. ○○. ○○.';
    var s='1. 피고는 원고에게 금 '+amt+'원 및 이에 대하여 '+fromStr+'부터 ';
    if(rate==='0') s+='이 사건 소장 부본 송달일 다음날부터 다 갚는 날까지 연 12%의 비율로 계산한 돈을 지급하라.';
    else s+='이 사건 소장 부본 송달일까지는 연 '+rate+'%, 그 다음날부터 다 갚는 날까지는 연 12%의 각 비율로 계산한 돈을 지급하라.';
    s+='\n2. 소송비용은 피고가 부담한다.\n3. 제1항은 가집행할 수 있다.\n라는 판결을 구합니다.';
    return s;
  }
  function render(){
    setF($('d-p-name'),$('f-p-name').value,'(원고)');
    setF($('d-p-addr'),$('f-p-addr').value?'주소: '+$('f-p-addr').value:'','(주소)');
    var tel=$('f-p-tel').value; $('d-p-tel-wrap').style.display=tel?'':'none'; $('d-p-tel').textContent=tel?'연락처: '+tel:'';
    setF($('d-d-name'),$('f-d-name').value,'(피고)');
    setF($('d-d-addr'),$('f-d-addr').value?'주소: '+$('f-d-addr').value:'','(주소)');
    $('d-caseName').textContent=$('f-case').value+' 청구의 소';
    $('d-purport').textContent=purport();
    setF($('d-cause'),$('f-cause').value,'(청구 원인을 입력하세요)');
    setF($('d-proof'),$('f-proof').value,'(입증방법)');
    setF($('d-date'),$('f-date').value,'(작성일)');
    setF($('d-sign'),$('f-p-name').value,'(성명)');
    setF($('d-court'),$('f-court').value?$('f-court').value+' 귀중':'','(관할 법원) 귀중');
  }
  ['f-court','f-case','f-p-name','f-p-addr','f-p-tel','f-d-name','f-d-addr','f-from','f-rate','f-cause','f-proof','f-date']
    .forEach(function(id){ $(id).addEventListener('input',render); });
  $('f-case').addEventListener('change',render); $('f-rate').addEventListener('change',render); $('f-from').addEventListener('change',render);
  $('f-print').addEventListener('click',function(){window.print();});
  $('f-clear').addEventListener('click',function(){['f-court','f-p-name','f-p-addr','f-p-tel','f-d-name','f-d-addr','f-amount','f-cause'].forEach(function(id){$(id).value='';});render();});
  document.addEventListener('DOMContentLoaded',function(){var d=new Date();$('f-date').value=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';render();});
})();