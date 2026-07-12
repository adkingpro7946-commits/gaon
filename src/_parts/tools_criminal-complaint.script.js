(function(){
  'use strict';
  var $=function(id){return document.getElementById(id);};
  var CRIMES={
    defame:'정보통신망 이용촉진 및 정보보호 등에 관한 법률 위반(명예훼손)',
    defame2:'명예훼손 (형법 제307조)',
    insult:'모욕 (형법 제311조)',
    fraud:'사기 (형법 제347조)',
    embezzle:'횡령 (형법 제355조)',
    threat:'협박 (형법 제283조)',
    custom:''
  };
  function setF(el,val,ph){ if(val){el.textContent=val;el.classList.remove('empty-ph');} else {el.textContent=ph;el.classList.add('empty-ph');} }
  function crimeName(){ var k=$('f-crime').value; return k==='custom'?($('f-crime-custom').value||''):CRIMES[k]; }

  function render(){
    setF($('d-c-name'),$('f-c-name').value,'(고소인)');
    setF($('d-c-addr'),$('f-c-addr').value,'(주소)');
    var ct=$('f-c-tel').value; $('d-c-tel-wrap').style.display=ct?'':'none'; $('d-c-tel').textContent=ct;
    setF($('d-s-name'),$('f-s-name').value,'(피고소인)');
    setF($('d-s-addr'),$('f-s-addr').value,'(주소/인적사항)');
    var cn=crimeName();
    setF($('d-crime'),cn,'(죄명)');
    $('d-purport').textContent='고소인은 피고소인을 위 죄명으로 고소하오니, 철저히 수사하여 법에 따라 처벌하여 주시기 바랍니다.';
    setF($('d-fact'),$('f-fact').value,'(범죄사실을 육하원칙에 따라 입력하세요)');
    var rz=$('f-reason').value; $('d-reason-sec').style.display=rz?'':'none'; $('d-reason').textContent=rz;
    setF($('d-evidence'),$('f-evidence').value,'(증거자료)');
    setF($('d-date'),$('f-date').value,'(작성일)');
    setF($('d-sign'),$('f-c-name').value,'(성명)');
    setF($('d-office'),$('f-office').value?$('f-office').value+' 귀중':'','(제출처) 귀중');
  }
  $('f-crime').addEventListener('change',function(){
    $('f-crime-custom-wrap').style.display=this.value==='custom'?'':'none'; render();
  });
  ['f-crime-custom','f-c-name','f-c-addr','f-c-tel','f-s-name','f-s-addr','f-fact','f-reason','f-evidence','f-office','f-date']
    .forEach(function(id){ $(id).addEventListener('input',render); });
  $('f-print').addEventListener('click',function(){window.print();});
  $('f-clear').addEventListener('click',function(){['f-crime-custom','f-c-name','f-c-addr','f-c-tel','f-s-name','f-s-addr','f-fact','f-reason','f-office'].forEach(function(id){$(id).value='';});render();});
  document.addEventListener('DOMContentLoaded',function(){var d=new Date();$('f-date').value=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';render();});
})();