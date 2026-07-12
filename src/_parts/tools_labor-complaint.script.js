(function(){
  'use strict';
  var $=function(id){return document.getElementById(id);};
  var won=function(n){return Number(n).toLocaleString('ko-KR');};
  function fmt(el){var v=el.value.replace(/[^0-9]/g,'');el.value=v?Number(v).toLocaleString('ko-KR'):'';}
  ['f-wage','f-sev'].forEach(function(id){$(id).addEventListener('input',function(){fmt(this);render();});});
  function setF(el,val,ph){ if(val){el.textContent=val;el.classList.remove('empty-ph');} else {el.textContent=ph;el.classList.add('empty-ph');} }
  function dstr(d){ return d?(d.getFullYear()+'. '+(d.getMonth()+1)+'. '+d.getDate()+'.'):null; }

  function purport(){
    var wage=Number(($('f-wage').value||'').replace(/[^0-9]/g,''));
    var sev=Number(($('f-sev').value||'').replace(/[^0-9]/g,''));
    var lines=[];
    if(wage) lines.push('  - 미지급 임금: '+won(wage)+'원');
    if(sev) lines.push('  - 미지급 퇴직금: '+won(sev)+'원');
    var total=wage+sev;
    var s='피진정인은 진정인에게 다음의 금품을 지급기일이 지나도록 지급하지 않고 있습니다.\n';
    s+=(lines.length?lines.join('\n'):'  - (금액을 입력하세요)');
    if(total) s+='\n  - 합계: '+won(total)+'원';
    return s;
  }
  function reason(){
    var inD=$('f-in').valueAsDate, outD=$('f-out').valueAsDate, job=$('f-job').value;
    var base='1. 진정인은 '+(dstr(inD)||'20○○. ○○. ○○.')+'부터 '+(outD?dstr(outD):'현재')+'까지 피진정인의 사업장에서 '+(job||'○○ 업무')+'에 종사하였습니다.\n';
    base+='2. 그러나 피진정인은 위 근로에 대한 임금(및 퇴직금)을 지급기일이 지나도록 지급하지 않고 있습니다.\n';
    var extra=$('f-detail').value;
    if(extra) base+='3. '+extra;
    return base;
  }
  function render(){
    setF($('d-w-name'),$('f-w-name').value,'(진정인)');
    setF($('d-w-addr'),$('f-w-addr').value,'(주소)');
    var wt=$('f-w-tel').value; $('d-w-tel-wrap').style.display=wt?'':'none'; $('d-w-tel').textContent=wt;
    setF($('d-b-name'),$('f-b-name').value,'(사업주)');
    setF($('d-b-company'),$('f-b-company').value,'(사업장명)');
    setF($('d-b-addr'),$('f-b-addr').value,'(사업장 주소)');
    var bt=$('f-b-tel').value; $('d-b-tel-wrap').style.display=bt?'':'none'; $('d-b-tel').textContent=bt;
    $('d-purport').textContent=purport();
    $('d-detail').textContent=reason();
    setF($('d-date'),$('f-date').value,'(작성일)');
    setF($('d-sign'),$('f-w-name').value,'(성명)');
    setF($('d-office'),$('f-office').value?$('f-office').value+' 귀중':'','(관할 고용노동청) 귀중');
  }
  ['f-w-name','f-w-addr','f-w-tel','f-b-name','f-b-company','f-b-addr','f-b-tel','f-in','f-out','f-job','f-detail','f-office','f-date']
    .forEach(function(id){ $(id).addEventListener('input',render); });
  $('f-in').addEventListener('change',render); $('f-out').addEventListener('change',render);
  $('f-print').addEventListener('click',function(){window.print();});
  $('f-clear').addEventListener('click',function(){['f-w-name','f-w-addr','f-w-tel','f-b-name','f-b-company','f-b-addr','f-b-tel','f-job','f-wage','f-sev','f-detail','f-office'].forEach(function(id){$(id).value='';});render();});
  document.addEventListener('DOMContentLoaded',function(){var d=new Date();$('f-date').value=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';render();});
})();