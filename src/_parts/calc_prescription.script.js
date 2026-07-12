(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var YEARS = { '10':10, '5':5, '3':3, '3b':3, '3c':3, '3d':3, '1':1, 'tort':3 };

  $('p-type').addEventListener('change', function(){
    $('p-tort-wrap').style.display = this.value==='tort' ? '' : 'none';
    $('p-start-label').textContent = this.value==='tort'
      ? '손해와 가해자를 안 날 (3년 기산)' : '기산일 (권리를 행사할 수 있는 때)';
  });

  function addYears(d, y){ var x=new Date(d.getTime()); x.setFullYear(x.getFullYear()+y); return x; }
  function fmtDate(d){ return d.getFullYear()+'년 '+(d.getMonth()+1)+'월 '+d.getDate()+'일'; }

  $('p-run').addEventListener('click', function(){
    var type = $('p-type').value;
    var start = $('p-start').valueAsDate;
    if(!start){ $('p-start').focus(); return; }
    var years = YEARS[type];
    var complete = addYears(start, years);
    var label = '', detail = '';

    if(type==='tort'){
      var tortDate = $('p-tort-date').valueAsDate;
      var tenYear = tortDate ? addYears(tortDate, 10) : null;
      // 둘 중 먼저 도래하는 날이 시효 완성
      if(tenYear && tenYear < complete){ complete = tenYear; detail='불법행위일부터 10년이 먼저 도래하여 이 날 시효가 완성됩니다.'; }
      else detail='안 날부터 3년과 불법행위일부터 10년 중 먼저 오는 날에 완성됩니다.';
      label = '3년(안 날) / 10년(행위일)';
    } else {
      label = years + '년';
    }

    // 남은 기간 (오늘 기준 — 브라우저 로컬)
    var today = new Date(); today.setHours(0,0,0,0);
    var remainDays = Math.round((complete - today)/86400000);

    $('pr-years').textContent = label;
    $('pr-date').textContent = fmtDate(complete);
    if(remainDays > 0){
      $('pr-status-label').textContent = '남은 기간';
      $('pr-remain').textContent = remainDays.toLocaleString('ko-KR') + '일 (약 ' + (remainDays/365).toFixed(1) + '년)';
      $('pr-remain').style.color = remainDays < 180 ? 'var(--seal)' : '';
    } else {
      $('pr-status-label').textContent = '상태';
      $('pr-remain').textContent = '이미 완성 (' + Math.abs(remainDays).toLocaleString('ko-KR') + '일 경과)';
      $('pr-remain').style.color = 'var(--seal)';
    }
    $('pr-detail').textContent = (detail ? detail + ' ' : '') + '시효는 중단·정지될 수 있으므로 실제와 다를 수 있습니다.';
    $('p-result').style.display='block';
    $('p-result').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();