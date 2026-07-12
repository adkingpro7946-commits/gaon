(function(){
  'use strict';
  var SERVICE_UNIT = 5200; // 송달료 1회분 단가 (예시)
  var $ = function(id){ return document.getElementById(id); };
  var won = function(n){ return n.toLocaleString('ko-KR') + '원'; };

  function baseStamp(sog){
    var f;
    if(sog < 10000000)       f = sog * 0.005;
    else if(sog < 100000000) f = sog * 0.0045 + 5000;
    else if(sog < 1000000000)f = sog * 0.004  + 55000;
    else                     f = sog * 0.0035 + 555000;
    return f;
  }
  function round100(f){ f = Math.floor(f/100)*100; return f < 1000 ? 1000 : f; }

  // 관할 + 송달 횟수
  function courtInfo(sog, proc){
    if(proc === 'payment') return { name:'지급명령 (독촉절차)', rounds:6 };
    if(sog <= 30000000)  return { name:'소액사건 (3천만원 이하)', rounds:10 };
    if(sog <= 500000000) return { name:'민사 단독 (5억원 이하)', rounds:15 };
    return { name:'민사 합의 (5억원 초과)', rounds:15 };
  }

  function fmtNum(el){
    var v = el.value.replace(/[^0-9]/g,'');
    el.value = v ? Number(v).toLocaleString('ko-KR') : '';
  }
  $('cf-sog').addEventListener('input', function(){ fmtNum(this); });

  // 지급명령 선택 시 심급 숨김
  $('cf-proc').addEventListener('change', function(){
    $('cf-instance-wrap').style.display = (this.value === 'payment') ? 'none' : '';
  });

  function calc(){
    var sog = Number(($('cf-sog').value || '').replace(/[^0-9]/g,''));
    if(!sog || sog < 1){ $('cf-sog').focus(); $('cf-sog').setAttribute('aria-invalid','true'); return; }
    $('cf-sog').removeAttribute('aria-invalid');

    var proc = $('cf-proc').value;
    var instance = proc === 'payment' ? 1 : Number($('cf-instance').value);
    var online = $('cf-online').value === '1';
    var parties = Math.max(2, Number($('cf-parties').value) || 2);

    var base = baseStamp(sog);
    var stamp;
    if(proc === 'payment'){
      stamp = round100(base * 0.1);              // 지급명령: 소송 인지액의 1/10
    } else {
      stamp = round100(base * instance);         // 항소 1.5 / 상고 2
    }
    if(online) stamp = round100(stamp * 0.9);     // 전자소송 10% 할인

    var info = courtInfo(sog, proc);
    var service = parties * info.rounds * SERVICE_UNIT;
    var total = stamp + service;

    $('r-bracket').textContent = info.name;
    $('r-stamp').textContent = won(stamp);
    $('r-service').textContent = won(service);
    $('r-parties-note').textContent = '(' + parties + '명 × ' + info.rounds + '회 × ' + won(SERVICE_UNIT) + ')';
    $('r-total').textContent = won(total);

    var detail = '기본 인지액 ' + won(round100(base));
    if(proc === 'payment') detail += ' → 지급명령 1/10 적용';
    else if(instance !== 1) detail += ' → ' + (instance===1.5?'항소심 1.5배':'상고심 2배') + ' 적용';
    if(online) detail += ' → 전자소송 10% 할인';
    detail += '. 송달료 단가는 1회 ' + won(SERVICE_UNIT) + '으로 가정했습니다.';
    $('r-detail').textContent = detail;

    $('cf-result').style.display = 'block';
    $('cf-result').scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  $('cf-run').addEventListener('click', calc);
  $('cf-reset').addEventListener('click', function(){
    $('cf-sog').value=''; $('cf-parties').value=2; $('cf-proc').value='suit';
    $('cf-instance').value='1'; $('cf-online').value='1';
    $('cf-instance-wrap').style.display=''; $('cf-result').style.display='none';
  });
  $('cf-sog').addEventListener('keydown', function(e){ if(e.key==='Enter') calc(); });
})();