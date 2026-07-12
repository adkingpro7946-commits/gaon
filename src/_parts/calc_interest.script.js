(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var won = function(n){ return Math.round(n).toLocaleString('ko-KR') + '원'; };
  function fmt(el){ var v=el.value.replace(/[^0-9]/g,''); el.value=v?Number(v).toLocaleString('ko-KR'):''; }
  $('i-principal').addEventListener('input', function(){ fmt(this); });
  $('i-rate').addEventListener('change', function(){ $('i-custom-wrap').style.display = this.value==='custom'?'':'none'; });

  function days(a, b){ return Math.max(0, Math.round((b - a)/86400000)); }

  $('i-run').addEventListener('click', function(){
    var p = Number(($('i-principal').value||'').replace(/[^0-9]/g,''));
    var start = $('i-start').valueAsDate, end = $('i-end').valueAsDate, serve = $('i-serve').valueAsDate;
    if(!p){ $('i-principal').focus(); return; }
    if(!start || !end || end < start){ alert('기산일과 종료일을 올바르게 입력하세요.'); return; }
    var rate = $('i-rate').value === 'custom' ? (Number($('i-custom').value)||0)/100 : Number($('i-rate').value);

    var seg1=0, seg2=0, d1=0, d2=0;
    // 소촉법 12%는 송달 "다음날"부터
    var boundary = serve ? new Date(serve.getTime()+86400000) : null;
    if(boundary && boundary < end){
      d1 = days(start, boundary);
      d2 = days(boundary, end);
      seg1 = p * rate * (d1/365);
      seg2 = p * 0.12 * (d2/365);
    } else {
      d1 = days(start, end);
      seg1 = p * rate * (d1/365);
    }
    var interest = seg1 + seg2;
    $('ir-seg1').textContent = won(seg1) + ' (' + d1 + '일, 연 ' + (rate*100) + '%)';
    $('ir-seg2').textContent = d2 ? won(seg2) + ' (' + d2 + '일, 연 12%)' : '해당 없음';
    $('ir-interest').textContent = won(interest);
    $('ir-total').textContent = won(p + interest);
    $('ir-detail').textContent = '단리·365일 기준. ' + (boundary && boundary<end
      ? '소장 송달 다음날부터 소송촉진법 연 12%를 적용했습니다.'
      : '소장 송달일이 없거나 종료일 이전이 아니어서 전 구간에 기본 이율을 적용했습니다.');
    $('i-result').style.display='block';
    $('i-result').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();