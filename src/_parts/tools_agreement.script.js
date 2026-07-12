(function(){
  'use strict';
  var $=function(id){return document.getElementById(id);};
  var won=function(n){return Number(n).toLocaleString('ko-KR');};
  function fmt(el){var v=el.value.replace(/[^0-9]/g,'');el.value=v?Number(v).toLocaleString('ko-KR'):'';}
  ['l-amount','s-money'].forEach(function(id){$(id).addEventListener('input',function(){fmt(this);render();});});
  function dstr(d){ return d?(d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일'):'20○○년 ○○월 ○○일'; }
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\n/g,'<br>'); }
  function ph(v,text){ return v?esc(v):'<span class="empty-ph">'+text+'</span>'; }

  function renderLoan(){
    $('d-title').innerHTML='차&nbsp;용&nbsp;증';
    var amt=$('l-amount').value||'○○○';
    var rate=Number($('l-rate').value)||0;
    var lend=$('l-lend-date').valueAsDate, due=$('l-due').valueAsDate;
    var html='';
    html+='<p style="text-align:center;font-size:1.15rem;margin:1rem 0 1.6rem;">금 '+ph($('l-amount').value,'○○○')+' 원정 (₩'+amt+')</p>';
    html+='<div class="doc-sec"><p class="doc-flow">위 금원을 채무자는 채권자로부터 '+dstr(lend)+' 정히 차용하였습니다.</p></div>';
    html+='<div class="doc-sec"><h4>제1조 (변제기)</h4><p class="doc-flow">채무자는 위 원금을 '+dstr(due)+'까지 채권자에게 변제한다.</p></div>';
    if(rate>0) html+='<div class="doc-sec"><h4>제2조 (이자)</h4><p class="doc-flow">이자는 연 '+rate+'%로 하며, 원금 변제 시 함께 지급한다.</p></div>';
    else html+='<div class="doc-sec"><h4>제2조 (이자)</h4><p class="doc-flow">본 대여금에 대한 이자는 없는 것으로 한다.</p></div>';
    if($('l-extra').value) html+='<div class="doc-sec"><h4>제3조 (특약)</h4><p class="doc-flow">'+esc($('l-extra').value)+'</p></div>';
    $('d-body').innerHTML=html;
    $('d-signs').innerHTML=
      '<p class="doc-field" style="margin-top:1.4rem;"><b>채권자</b> '+ph($('l-cr').value,'(성명)')+' <span class="sealmark">(인)</span></p>'+
      '<p class="doc-field"><b></b> '+ph($('l-cr-id').value,'(주민등록번호/주소)')+'</p>'+
      '<p class="doc-field" style="margin-top:.8rem;"><b>채무자</b> '+ph($('l-db').value,'(성명)')+' <span class="sealmark">(인)</span></p>'+
      '<p class="doc-field"><b></b> '+ph($('l-db-id').value,'(주민등록번호/주소)')+'</p>';
  }

  function renderSettle(){
    $('d-title').innerHTML='합&nbsp;의&nbsp;서';
    var html='';
    html+='<div class="doc-sec"><p class="doc-flow">'+ph($('s-bg').value,'(분쟁 개요를 입력하세요)')+' 갑과 을은 다음과 같이 원만히 합의한다.</p></div>';
    var n=1;
    if($('s-money').value){
      html+='<div class="doc-sec"><h4>제'+n+'조</h4><p class="doc-flow">을은 갑에게 합의금으로 금 '+$('s-money').value+'원을 지급한다.</p></div>'; n++;
    }
    if($('s-terms').value){
      html+='<div class="doc-sec"><h4>제'+n+'조</h4><p class="doc-flow">'+esc($('s-terms').value)+'</p></div>'; n++;
    }
    if($('s-waive').checked){
      html+='<div class="doc-sec"><h4>제'+n+'조 (부제소 합의)</h4><p class="doc-flow">갑과 을은 본 합의로써 위 사안에 관한 일체의 청구를 포기하며, 향후 민·형사상 어떠한 이의도 제기하지 아니한다.</p></div>';
    }
    $('d-body').innerHTML=html;
    $('d-signs').innerHTML=
      '<p class="doc-field" style="margin-top:1.4rem;"><b>갑</b> '+ph($('s-a').value,'(성명)')+' <span class="sealmark">(인)</span></p>'+
      '<p class="doc-field"><b></b> '+ph($('s-a-addr').value,'(주소)')+'</p>'+
      '<p class="doc-field" style="margin-top:.8rem;"><b>을</b> '+ph($('s-b').value,'(성명)')+' <span class="sealmark">(인)</span></p>'+
      '<p class="doc-field"><b></b> '+ph($('s-b-addr').value,'(주소)')+'</p>';
  }

  function render(){
    if($('f-type').value==='loan') renderLoan(); else renderSettle();
    $('d-date').textContent=$('f-date').value||'(작성일)';
    $('d-date').className='doc-date'+($('f-date').value?'':' empty-ph');
  }
  $('f-type').addEventListener('change',function(){
    $('grp-loan').style.display=this.value==='loan'?'':'none';
    $('grp-settle').style.display=this.value==='settle'?'':'none';
    render();
  });
  ['l-cr','l-cr-id','l-db','l-db-id','l-lend-date','l-due','l-rate','l-extra',
   's-a','s-a-addr','s-b','s-b-addr','s-bg','s-terms','f-date'].forEach(function(id){ $(id).addEventListener('input',render); });
  $('l-lend-date').addEventListener('change',render); $('l-due').addEventListener('change',render); $('s-waive').addEventListener('change',render);
  $('f-print').addEventListener('click',function(){window.print();});
  $('f-clear').addEventListener('click',function(){
    ['l-cr','l-cr-id','l-db','l-db-id','l-amount','l-extra','s-a','s-a-addr','s-b','s-b-addr','s-bg','s-money','s-terms'].forEach(function(id){$(id).value='';});
    $('l-rate').value=0; render();
  });
  document.addEventListener('DOMContentLoaded',function(){var d=new Date();$('f-date').value=d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일';render();});
})();