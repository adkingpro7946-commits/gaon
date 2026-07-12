(function(){
  'use strict';
  var $ = function(id){ return document.getElementById(id); };
  var won = function(n){ return Math.round(n).toLocaleString('ko-KR') + '원'; };
  var pct = function(x){ return (x*100).toFixed(2).replace(/\.?0+$/,'') + '%'; };
  var frac = function(x){ // 근사 분수 표기
    var denom = [2,3,4,5,6,7,8,9,10,11,12,14,15];
    for(var i=0;i<denom.length;i++){ var nu = x*denom[i]; if(Math.abs(nu-Math.round(nu))<1e-6) return Math.round(nu)+'/'+denom[i]; }
    return pct(x);
  };
  function fmt(el){ var v=el.value.replace(/[^0-9]/g,''); el.value=v?Number(v).toLocaleString('ko-KR'):''; }
  $('h-estate').addEventListener('input', function(){ fmt(this); });

  $('h-run').addEventListener('click', function(){
    var spouse = $('h-spouse').value==='1';
    var kids = Math.max(0, Number($('h-children').value)||0);
    var parents = Math.max(0, Math.min(2, Number($('h-parents').value)||0));
    var estate = Number(($('h-estate').value||'').replace(/[^0-9]/g,''));
    var rows = [];

    if(kids>0){
      var units = (spouse?1.5:0) + kids;
      if(spouse) rows.push({name:'배우자', type:'spouse', share:1.5/units});
      for(var i=1;i<=kids;i++) rows.push({name:'자녀 '+i, type:'desc', share:1/units});
    } else if(parents>0){
      var u2 = (spouse?1.5:0) + parents;
      if(spouse) rows.push({name:'배우자', type:'spouse', share:1.5/u2});
      for(var j=1;j<=parents;j++) rows.push({name:'부모 '+j, type:'asc', share:1/u2});
    } else if(spouse){
      rows.push({name:'배우자', type:'spouse', share:1});
    } else {
      $('h-tbody').innerHTML = '<tr><td colspan="3">1·2순위 상속인(자녀·부모·배우자)이 없습니다. 형제자매 등 후순위가 상속하며, 이 경우 유류분은 인정되지 않습니다(2026 개정).</td></tr>';
      $('h-detail').textContent = '';
      $('h-result').style.display='block'; return;
    }

    // 유류분 비율: 직계비속·배우자 1/2, 직계존속 1/3
    var html = rows.map(function(r){
      var uratio = (r.type==='asc') ? (1/3) : (1/2);
      var ury = r.share * uratio;
      var legalCell = frac(r.share) + (estate ? '<br><span class="won">'+won(r.share*estate)+'</span>' : '');
      var uryCell = frac(ury) + (estate ? '<br><span class="won">'+won(ury*estate)+'</span>' : '');
      return '<tr><td class="name">'+r.name+'</td><td>'+legalCell+'</td><td>'+uryCell+'</td></tr>';
    }).join('');
    $('h-tbody').innerHTML = html;
    $('h-detail').textContent = '법정상속분: 배우자 1.5, 그 외 각 1 비율. 유류분: 직계비속·배우자는 법정상속분의 1/2, 직계존속은 1/3.' + (estate?'':' 금액은 상속재산 총액을 입력하면 표시됩니다.');
    $('h-result').style.display='block';
    $('h-result').scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();