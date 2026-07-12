(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var won = function(n){ return Math.round(n).toLocaleString('ko-KR') + '원'; };
  var num = function(id){ return Number(($(id).value||'').replace(/[^0-9]/g,'')); };
  function fmt(el){ var v=el.value.replace(/[^0-9]/g,''); el.value = v?Number(v).toLocaleString('ko-KR'):''; }
  ['s-wage3','s-bonus','s-annual','a-wage'].forEach(function(id){ $(id).addEventListener('input', function(){ fmt(this); }); });

  function daysBetween(a, b){ return Math.round((b - a) / 86400000); }
  function minus3Months(d){ var x = new Date(d.getTime()); x.setMonth(x.getMonth()-3); return x; }

  $('s-run').addEventListener('click', function(){
    var inD = $('s-in').valueAsDate, outD = $('s-out').valueAsDate;
    var wage3 = num('s-wage3');
    if(!inD || !outD || outD <= inD){ alert('입사일과 퇴사일을 올바르게 입력하세요.'); return; }
    if(!wage3){ $('s-wage3').focus(); return; }
    var tenure = daysBetween(inD, outD);                 // 재직일수
    var periodStart = minus3Months(outD);
    var periodDays = daysBetween(periodStart, outD);     // 평균임금 산정 기간(달력일)
    var bonus = num('s-bonus'), annual = num('s-annual');
    var base = wage3 + bonus*(3/12) + annual*(3/12);     // 평균임금 산정 임금총액
    var avg = base / periodDays;                          // 1일 평균임금
    var pay = avg * 30 * (tenure / 365);                 // 퇴직금

    $('sr-days').textContent = tenure.toLocaleString('ko-KR') + '일 (약 ' + (tenure/365).toFixed(1) + '년)';
    $('sr-base').textContent = won(base);
    $('sr-avg').textContent = won(avg);
    $('sr-total').textContent = won(pay);
    $('sr-detail').textContent = '평균임금 산정기간 ' + periodDays + '일 기준. 퇴직금 = 1일 평균임금 × 30 × (' + tenure + '일 ÷ 365). 1년 미만 재직 시 법정 퇴직금 지급의무가 없을 수 있습니다.';
    $('s-result').style.display='block';
    $('s-result').scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  $('a-run').addEventListener('click', function(){
    var wage = num('a-wage'), days = Number($('a-days').value)||0, hours = Number($('a-hours').value);
    if(!wage || !days){ $('a-wage').focus(); return; }
    var hourly = wage / hours;
    var daily = hourly * 8;
    var total = daily * days;
    $('ar-hour').textContent = won(hourly);
    $('ar-day').textContent = won(daily);
    $('ar-total').textContent = won(total);
    $('a-result').style.display='block';
    $('a-result').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();