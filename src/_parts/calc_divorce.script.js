(function(){
  'use strict';
  var $=function(id){return document.getElementById(id);};
  function fmt(el){var v=el.value.replace(/[^0-9]/g,'');el.value=v?Number(v).toLocaleString('ko-KR'):'';}
  $('d-asset').addEventListener('input',function(){fmt(this);});
  function man(won){ // 원 → "○○○만원" 또는 "○.○억원"
    if(won>=100000000){ return (won/100000000).toFixed(won%100000000?1:0).replace(/\.0$/,'')+'억원'; }
    return Math.round(won/10000).toLocaleString('ko-KR')+'만원';
  }

  // 위자료: 범위(만원)로만 제시. 유책·혼인기간에 따른 일반적 경향치(참고용 휴리스틱)
  $('d-run1').addEventListener('click',function(){
    var y=Math.max(0,Number($('d-years').value)||0);
    var fault=$('d-fault').value;
    var lo,hi;
    if(fault==='low'){ lo=500; hi=1500; }
    else if(fault==='high'){ lo=2000; hi=5000; }
    else { lo=1000; hi=3000; }
    // 혼인기간 가중(완만하게)
    var add=Math.min(2000, y*80);
    lo=Math.round((lo+add*0.5)/100)*100;
    hi=Math.round((hi+add)/100)*100;
    $('r-alimony').textContent='약 '+lo.toLocaleString('ko-KR')+'만 ~ '+hi.toLocaleString('ko-KR')+'만원';
    $('d-res1').style.display='block';
    $('d-res1').scrollIntoView({behavior:'smooth',block:'nearest'});
  });

  // 재산분할: 기여도 범위(%) + 금액 범위. 단일값 아님
  $('d-run2').addEventListener('click',function(){
    var asset=Number(($('d-asset').value||'').replace(/[^0-9]/g,''));
    var y=Math.max(0,Number($('d-years2').value)||0);
    var type=$('d-type').value;
    var lo,hi;
    if(type==='dual'){ lo=40; hi=50; } else { lo=30; hi=45; }
    // 혼인기간 길수록 상향(전업 배우자 기여 반영)
    if(y>=20){ lo+=5; hi=Math.min(50,hi+5); }
    else if(y>=10){ lo+=3; hi=Math.min(50,hi+3); }
    lo=Math.min(lo,hi);
    $('r-ratio').textContent=lo+'% ~ '+hi+'%';
    if(asset>0){
      $('r-amount').textContent='약 '+man(asset*lo/100)+' ~ '+man(asset*hi/100);
    } else {
      $('r-amount').textContent='순재산을 입력하면 표시됩니다';
      $('r-amount').style.fontSize='.9rem';
    }
    $('d-res2').style.display='block';
    $('d-res2').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();