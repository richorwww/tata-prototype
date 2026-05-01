// Triplabo App Logic
// Auto-extracted from index.html

/* TAG → filter function — searches across all 30 places */
var TAG_FILTERS = {
  '春日东京好去处': function(pl){return pl.ps.join('').includes('樱')||pl.ps.join('').includes('赏花')||pl.cat==='自然'||pl.ps.join('').includes('春日');},
  '东京精品咖啡': function(pl){return pl.ps.join('').includes('咖啡')||pl.ps.join('').includes('精品')||pl.n.includes('Coffee');},
  '亲子友好活动': function(pl){return pl.ps.join('').includes('亲子')||pl.cat==='活动';},
  '免费打卡景点': function(pl){return pl.fr===1;},
  '米其林美食': function(pl){return pl.ps.join('').includes('米其林');},
  '夜景推荐': function(pl){return pl.ps.join('').includes('夜景')||pl.ps.join('').includes('夜间');},
  '东京塔周边500m': function(pl){return parseInt(pl.d)<=500;},
  '下午茶好去处': function(pl){return pl.ps.join('').includes('下午茶')||pl.ps.join('').includes('甜品')||pl.ps.join('').includes('咖啡');},
  '神社寺庙巡礼': function(pl){return pl.ps.join('').includes('神社')||pl.ps.join('').includes('寺庙')||pl.tag==='景点'&&(pl.n.includes('神社')||pl.n.includes('寺'));},
  '艺术文化探索': function(pl){return pl.ps.join('').includes('艺术')||pl.ps.join('').includes('文化')||pl.ps.join('').includes('博物馆')||pl.ps.join('').includes('展览');},
  '东京购物新地标': function(pl){return pl.cat==='购物';},
  '拉面百名店': function(pl){return pl.ps.join('').includes('拉面');},
  '沉浸体验': function(pl){return pl.ps.join('').includes('沉浸')||pl.ps.join('').includes('夜生活');},
  '无需预约': function(pl){return pl.ps.join('').includes('无需预约');},
};

/* Card builders — Unsplash images for real browser, bg+emoji as fallback */
function mkCard(pl,idx){
  return '<div class="rc" onclick="openDetail('+idx+')">'
    +'<div class="rc-iw" style="background:'+pl.bg+'">'
    +'<img src="'+pl.img+'" alt="'+pl.n+'" style="opacity:0;transition:opacity .3s" onload="this.style.opacity=1" onerror="this.style.display=\'none\'">'
    +'<div class="rc-ov"></div><div class="rc-tag '+pl.tc+'">'+pl.tag+'</div>'
    +'<div class="rc-dist">'+pl.d+'</div><div class="rc-star">⭐ '+pl.r+'</div>'
    +'</div>'
    +'<div class="rc-body"><div class="rc-name" style="font-size:'+(pl.n.length>9?'10px':'11.5px')+'">'+pl.n+'</div>'
    +'<div class="rc-desc"><span class="rc-di">✦</span><span>'+pl.desc.slice(0,30)+'…</span></div>'
    +'<div class="rc-pills">'+pl.ps.map(function(x){return'<span class="rc-pill">'+x+'</span>';}).join('')+'</div>'
    +'<div class="rc-price'+(pl.fr?' fr':'')+'">'+pl.p+'</div>'
    +'</div></div>';
}
function mkListCard(pl,idx){
  return '<div class="lc" onclick="openDetail('+idx+')">'
    +'<div class="lc-iw" style="background:'+pl.bg+';position:relative">'
    +'<img src="'+pl.img+'" alt="'+pl.n+'" style="opacity:0;transition:opacity .3s;width:100%;height:100%;object-fit:cover;display:block" onload="this.style.opacity=1" onerror="this.style.display=\'none\'">'
    +'<div class="lc-img-tag '+pl.tc+'" style="z-index:2;position:absolute;top:10px;left:10px">'+pl.tag+'</div>'
    +'<div class="lc-img-dist" style="z-index:2;position:absolute;top:10px;right:10px">📍 '+pl.d+'</div>'
    +'</div>'
    +'<div class="lc-body"><div class="lc-name">'+pl.n+'</div>'
    +'<div class="lc-desc">'+pl.desc+'</div>'
    +'<div class="lc-meta"><div class="lc-mr"><span class="lc-mr-ic">🕐</span><span>'+pl.hrs+'</span></div>'
    +'<div class="lc-mr"><span class="lc-mr-ic">📍</span><span>'+pl.venue+'</span></div></div>'
    +'<div class="lc-pills">'+pl.ps.map(function(x){return'<span class="lc-pill">'+x+'</span>';}).join('')+'</div>'
    +'<div class="lc-foot"><div class="lc-price'+(pl.fr?' fr':'')+'">'+pl.p+'</div>'
    +'<button class="lc-cta" onclick="event.stopPropagation();openDetail('+idx+')">查看详情</button>'
    +'</div></div></div>';
}

/* ══════════════════════════════════════════════════════
   MAP — Mapbox GL JS
══════════════════════════════════════════════════════ */
mapboxgl.accessToken = 'pk.eyJ1IjoicG9wb3YyMzMiLCJhIjoiY21uemxpcmc3MGVyejJ4cHZnNjhtYms5MSJ9.Bx8xSk-jBrYZfCkjfrrW1w';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/popov233/cmogt88uf000z01ree8rk4nvp',
  center: [139.7454, 35.6586],
  zoom: 15.5,
  interactive: true,
  scrollZoom: false
});

var ZOOM_CLOSE = 15.5;
var ZOOM_FAR   = 14.8;

var TT_LL=[139.7454,35.6586];

function calcDist(ll){
  var R=6371000;
  var dLat=(ll[1]-TT_LL[1])*Math.PI/180;
  var dLng=(ll[0]-TT_LL[0])*Math.PI/180;
  var a=Math.sin(dLat/2)*Math.sin(dLat/2)+
        Math.cos(TT_LL[1]*Math.PI/180)*Math.cos(ll[1]*Math.PI/180)*
        Math.sin(dLng/2)*Math.sin(dLng/2);
  var m=R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  return m<1000?Math.round(m)+'m':(m/1000).toFixed(1)+'km';
}

PL.forEach(function(pl){
  if(pl.ll) pl.d=calcDist(pl.ll);
});

// 更新地图上硬编码的POI卡片距离
document.querySelectorAll('.poi[data-i]').forEach(function(el){
  var idx=parseInt(el.dataset.i);
  var pl=PL[idx];
  if(pl&&pl.ll){
    var distEl=el.querySelector('.poi-dist');
    if(distEl) distEl.textContent=pl.d;
  }
});

function updatePOIPositions(){
  if(appState==='lst')return;

  // Tokyo Tower center card + pulse ring
  var ttPt=map.project(TT_LL);
  var cc=document.getElementById('cc');
  var pr=document.getElementById('pr');
  cc.style.left=ttPt.x+'px';
  cc.style.top=ttPt.y+'px';
  pr.style.left=ttPt.x+'px';
  pr.style.top=ttPt.y+'px';

  // ccLabel follows cc when visible
  var ccLabel=document.getElementById('ccLabel');
  if(ccLabel.classList.contains('show')){
    ccLabel.style.left=ttPt.x+'px';
    ccLabel.style.top=(ttPt.y+12)+'px';
    ccLabel.style.transform='translateX(-50%)';
  }

  // Other POI cards
  document.querySelectorAll('.poi[data-i]').forEach(function(el){
    var idx=parseInt(el.dataset.i);
    var pl=PL[idx];
    if(!pl||!pl.ll)return;
    var pt=map.project(pl.ll);
    el.style.left=pt.x+'px';
    el.style.top=pt.y+'px';
  });
}

map.on('load',updatePOIPositions);
map.on('move',updatePOIPositions);

/* Center card — real photo with emoji fallback */
var ccImg = document.getElementById('ccImg');
ccImg.style.opacity = '0';
ccImg.style.transition = 'opacity .3s';
ccImg.onload = function(){ this.style.opacity = '1'; };
ccImg.onerror = function(){ this.style.display = 'none'; };
ccImg.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80&fit=crop&crop=center';

/* ══════════════════════════════════════════════════════
   GEOMETRY + STATE
   On real device, use actual window dimensions.
   On desktop preview, use fixed 844px phone.
══════════════════════════════════════════════════════ */
var phone=document.getElementById('phone');
var PH=phone.clientHeight||844;
var HDR=52;
var MDEF=Math.round(PH*0.46); /* ~46% of screen height for map */
var SS={def:{top:MDEF,h:PH-MDEF},lst:{top:HDR,h:PH-HDR},map:{top:PH,h:PH-MDEF}};
var EASE='0.46s cubic-bezier(.32,.72,0,1)';

var mapWrap=document.getElementById('mapWrap');
var sheet=document.getElementById('sheet'),sscr=document.getElementById('sscr');
var hdr=document.getElementById('hdr'),hint=document.getElementById('hint');
var grabStrip=document.getElementById('grabStrip');
var nearPOIs=['n1','n2','n3'].map(function(id){return document.getElementById(id);});
var extPOIs=document.querySelectorAll('.epoi');
var mapUIs=document.querySelectorAll('.muo');
var appState='def',zoomLv=0,curTop=SS.def.top,activeCat='全部';

/* CRITICAL: Initialize everything cleanly */
function init(){
  /* Sheet geometry */
  sheet.style.transition='none';
  sheet.style.top=SS.def.top+'px';
  sheet.style.height=SS.def.h+'px';
  sscr.style.height=(SS.def.h-28)+'px';
  sscr.style.overflowY='hidden';
  curTop=SS.def.top;

  /* Map */
  mapWrap.style.transition='none';
  mapWrap.style.height=MDEF+'px';

  /* Map fullscreen overlays: hidden */
  mapUIs.forEach(function(el){el.classList.remove('show');});
  hdr.classList.remove('glass');

  /* Near POIs: VISIBLE in default state (map is visible too) */
  nearPOIs.forEach(function(p){p.style.display='flex';});

  /* Extended POIs: hidden */
  extPOIs.forEach(function(p){p.classList.remove('show');});

  /* Grab strip: hidden */
  grabStrip.style.display='none';

  /* Fill sheet cards */
  document.getElementById('scards').innerHTML=PL.slice(0,3).map(function(pl,i){return mkCard(pl,i);}).join('');

  /* Center card & pulse ring: position to center of default map view */
  var cc=document.getElementById('cc'),pr=document.getElementById('pr');
  cc.style.transition='none';
  cc.style.top=Math.round(MDEF/2)+'px';
  pr.style.transition='none';
  pr.style.top=Math.round(MDEF/2)+'px';
  var cw=phone.clientWidth||390;
  cc.style.left=Math.round(cw/2)+'px';
  pr.style.left=Math.round(cw/2)+'px';
}
init();

/* ── Layout helper ── */
function applyLayout(sTop,sH,mH,anim){
  curTop=sTop;
  var T=anim?EASE:'none';
  mapWrap.style.transition=anim?('height '+T):'none';
  mapWrap.style.height=mH+'px';
  sheet.style.transition=anim?('top '+T+', height '+T):'none';
  sheet.style.top=sTop+'px';
  sheet.style.height=sH+'px';
  /* sscr must have explicit height for overflow-y scroll to work */
  sscr.style.height=(sH-28)+'px';
  /* Shift center card & pulse ring */
  var cc=document.getElementById('cc'),pr=document.getElementById('pr');
  cc.style.transition=anim?('top '+T+', width '+T+', height '+T+', border-radius '+T):'none';
  pr.style.transition=anim?('top '+T+', opacity .3s'):'none';
  var mapCenter = (sTop===SS.map.top) ? Math.round(PH/2) : Math.round(MDEF/2);
  cc.style.top = mapCenter+'px';
  pr.style.top = mapCenter+'px';
  if(sTop===SS.map.top){cc.classList.add('mapfull');pr.classList.add('mapfull');}
  else{cc.classList.remove('mapfull');pr.classList.remove('mapfull');}
}

function showHint(msg,ms){hint.textContent=msg;hint.style.opacity='1';clearTimeout(hint._t);hint._t=setTimeout(function(){hint.style.opacity='0';},ms||2000);}

/* ── State transitions ── */
function setMapOverlays(on){
  mapUIs.forEach(function(el){el.classList.toggle('show',on);});
  hdr.classList.toggle('glass',on);
  grabStrip.style.display=on?'block':'none';
  if(!on){
    document.getElementById('mstrip').classList.remove('show');
    if(zoomLv!==0)setZoom(0,false);
  }
}

function setState(next){
  appState=next;
  if(next==='def'){
    applyLayout(SS.def.top,SS.def.h,MDEF,true);
    sscr.style.overflowY='hidden';sscr.scrollTop=0;
    setMapOverlays(false);
    /* Show near POIs — map is still visible */
    nearPOIs.forEach(function(p){p.style.display='flex';});
  }
  if(next==='map'){
    applyLayout(SS.map.top,SS.map.h,PH,true);
    sscr.style.overflowY='hidden';sscr.scrollTop=0;
    nearPOIs.forEach(function(p){p.style.display='flex';});
    setTimeout(function(){
      map.resize();
      setMapOverlays(true);
      var list=zoomLv?PL.slice(0,10):PL.slice(0,3);
      document.getElementById('mcards').innerHTML=list.map(function(pl,i){return mkCard(pl,i);}).join('');
      document.getElementById('mstrip').classList.add('show');
    },280);
  }
  if(next==='lst'){
    applyLayout(SS.lst.top,SS.lst.h,0,true);
    setMapOverlays(false);
    nearPOIs.forEach(function(p){p.style.display='none';});
    /* Enable scroll after animation completes (460ms) */
    setTimeout(function(){sscr.style.overflowY='auto';},480);
  }
}

function setZoom(lv,showMsg){
  zoomLv=lv;var far=(lv>=1);
  map.flyTo({zoom: far ? ZOOM_FAR : ZOOM_CLOSE, duration: 600});
  extPOIs.forEach(function(p){p.classList.toggle('show',far);});
  var cc=document.getElementById('cc');
  var ccLbl=document.getElementById('ccLabel');
  cc.classList.toggle('far',far);
  document.getElementById('pr').style.opacity=far?'0':'1';
  if(far){
    /* Position label just below the red dot: dot is 12px, so top = cc.top + 6 + 6 + 10 */
    var ccTop=parseInt(cc.style.top)||Math.round(PH/2);
    ccLbl.style.top=(ccTop+18)+'px';
    ccLbl.classList.add('show');
  } else {
    ccLbl.classList.remove('show');
  }
  document.getElementById('wbtxt').textContent=far?'地铁3站以内 (5km)':'步行 10 min (800m)';
  /* close zoom: 3 cards | far zoom: exactly 10 cards (near map spots only) */
  var list=far?PL.slice(0,10):PL.slice(0,3);
  document.getElementById('mcards').innerHTML=list.map(function(pl,i){return mkCard(pl,i);}).join('');
  document.getElementById('vaBtn').classList.toggle('show',far);
  if(showMsg)showHint(far?'已缩小 · 发现10个附近地点':'已放大');
}

document.getElementById('zinBtn').onclick=function(){if(zoomLv===1)setZoom(0,true);};
document.getElementById('zoutBtn').onclick=function(){if(zoomLv===0)setZoom(1,true);};
document.getElementById('vaBtn').onclick=openListSheet;
document.getElementById('seeAllBtn').onclick=openListSheet;
document.getElementById('cc').onclick=function(){
  setState('lst');
};
document.getElementById('ccLabel').onclick=function(){
  setState('lst');
};

/* Pinch */
var pd=0,pinching=false;
mapWrap.addEventListener('touchstart',function(e){if(appState!=='map'||e.touches.length!==2)return;pinching=true;pd=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);},{passive:true});
mapWrap.addEventListener('touchmove',function(e){if(!pinching||e.touches.length!==2)return;var d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(Math.abs(d-pd)>30){setZoom(d<pd?1:0,true);pinching=false;}},{passive:true});
mapWrap.addEventListener('touchend',function(){pinching=false;},{passive:true});
var lt=0;mapWrap.addEventListener('click',function(){if(appState!=='map')return;var now=Date.now();if(now-lt<300){setZoom(zoomLv===0?1:0,true);}lt=now;});
document.querySelectorAll('.poi').forEach(function(el){el.addEventListener('click',function(e){e.stopPropagation();openDetail(parseInt(el.dataset.i||'0'));});});

/* ── DRAG — only triggered from the handle strip ── */
var dragging=false,cancelled=false,dragSY=0,dragSX=0,dragSTOP=0,vel=0,prevY=0,prevT=0;
var hdlWrap=document.querySelector('.hdl-wrap');

function startDrag(e){
  /* In lst state, only allow drag from the handle area */
  if(appState==='lst'&&e.target!==hdlWrap&&!hdlWrap.contains(e.target))return;
  if(appState==='lst'&&sscr.scrollTop>6)return;
  dragging=true;cancelled=false;
  var t=e.touches?e.touches[0]:e;
  dragSY=t.clientY;dragSX=t.clientX;dragSTOP=curTop;vel=0;prevY=dragSY;prevT=Date.now();
  sheet.style.transition='none';mapWrap.style.transition='none';
}
function moveDrag(e){
  if(!dragging)return;
  var t=e.touches?e.touches[0]:e;
  var dy=t.clientY-dragSY,dx=t.clientX-dragSX;
  if(!cancelled&&(Math.abs(dy)>6||Math.abs(dx)>6)){
    if(Math.abs(dx)>Math.abs(dy)){cancelled=true;return;}
    if(appState==='lst'&&sscr.scrollTop>3){cancelled=true;return;}
  }
  if(cancelled)return;
  /* Only preventDefault when we're actually dragging the sheet, not scrolling content */
  if(e.cancelable)e.preventDefault();
  var now=Date.now();
  if(now>prevT)vel=(t.clientY-prevY)/(now-prevT);
  prevY=t.clientY;prevT=now;
  var newTop=Math.max(SS.lst.top,Math.min(SS.map.top,dragSTOP+dy));
  curTop=newTop;
  var newH=PH-newTop;
  sheet.style.top=newTop+'px';sheet.style.height=newH+'px';
  sscr.style.height=(newH-28)+'px';
  var mapH;
  if(newTop<=MDEF){mapH=((newTop-HDR)/(MDEF-HDR))*MDEF;}
  else{mapH=MDEF+((newTop-MDEF)/(PH-MDEF))*(PH-MDEF);}
  mapWrap.style.height=Math.max(0,Math.min(PH,mapH))+'px';
}
function endDrag(e){
  if(!dragging)return;dragging=false;
  if(cancelled){cancelled=false;return;}
  var t=e.changedTouches?e.changedTouches[0]:e;
  var dy=t.clientY-dragSY;var target;
  if(vel>0.45||dy>80){target='map';}
  else if(vel<-0.45||dy<-60){target='lst';}
  else{var dD=Math.abs(curTop-SS.def.top),dM=Math.abs(curTop-SS.map.top),dL=Math.abs(curTop-SS.lst.top);var mn=Math.min(dD,dM,dL);target=mn===dM?'map':(mn===dL?'lst':'def');}
  if(appState==='lst'&&target==='map')target='def';
  setState(target);
  if(target==='map')showHint('双击或 ± 缩放地图');
  if(target==='lst')showHint('下拉收起');
}
/* Bind drag ONLY to the handle for reliable mobile scroll */
hdlWrap.addEventListener('mousedown',startDrag);
hdlWrap.addEventListener('touchstart',startDrag,{passive:true});
grabStrip.addEventListener('mousedown',startDrag);
grabStrip.addEventListener('touchstart',startDrag,{passive:true});
/* Also allow drag from sheet header in non-lst states */
sheet.addEventListener('mousedown',function(e){if(appState!=='lst')startDrag(e);});
sheet.addEventListener('touchstart',function(e){if(appState!=='lst')startDrag(e);},{passive:true});
document.addEventListener('mousemove',moveDrag);
/* Use passive:false only needed during active drag — but we can't toggle, so keep false */
document.addEventListener('touchmove',moveDrag,{passive:false});
document.addEventListener('mouseup',endDrag);
document.addEventListener('touchend',endDrag);

/* ══════════════════════════════════════════════════════
   SEARCH OVERLAY
══════════════════════════════════════════════════════ */
var searchMode='tags'; // 'tags' | 'result' | 'chat'

function openSearch(){
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(function(){document.getElementById('soInput').focus();},300);
}
function closeSearch(){
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('soInput').value='';
  document.getElementById('soClear').classList.remove('show');
  showTagMode();
}

function onSearchInput(){
  var v=document.getElementById('soInput').value;
  document.getElementById('soClear').classList.toggle('show',v.length>0);
  if(v.length>0){
    showChatMode(v);
  } else {
    showTagMode();
  }
}
function clearSearch(){
  document.getElementById('soInput').value='';
  document.getElementById('soClear').classList.remove('show');
  showTagMode();
}

function showTagMode(){
  searchMode='tags';
  document.getElementById('soTags').style.display='block';
  document.getElementById('soResult').classList.remove('show');
  document.getElementById('soChat').classList.remove('show');
}
function showResultMode(){
  searchMode='result';
  document.getElementById('soTags').style.display='none';
  document.getElementById('soResult').classList.add('show');
  document.getElementById('soChat').classList.remove('show');
}
function showChatMode(){
  if(searchMode==='chat')return;
  searchMode='chat';
  document.getElementById('soTags').style.display='none';
  document.getElementById('soResult').classList.remove('show');
  document.getElementById('soChat').classList.add('show');
  /* Init chat if empty */
  var msgs=document.getElementById('chatMsgs');
  if(!msgs.childElementCount){
    addBotMsg('你好！我是Triplabo智能助手 ✦\n告诉我你想去什么类型的地方，我来为你推荐东京塔周边最适合你的景点。',[
      '我想找免费景点','有什么适合亲子的','米其林餐厅推荐','有没有不用排队的'
    ]);
  }
}
function backToTags(){showTagMode();document.getElementById('soInput').value='';document.getElementById('soClear').classList.remove('show');}

function selectTag(el,tag){
  document.getElementById('soResultTag').textContent=tag;
  var fn=TAG_FILTERS[tag]||function(){return true;};
  var results=PL.filter(fn);
  document.getElementById('soResultCount').textContent=results.length+'个地点';
  document.getElementById('soResultList').innerHTML=results.length
    ?results.map(function(pl){return mkListCard(pl,PL.indexOf(pl));}).join('')
    :'<div style="padding:32px;text-align:center;color:#A0ACA9;font-size:14px">暂无相关地点</div>';
  showResultMode();
}

/* Chat */
function addBotMsg(text,chips){
  var msgs=document.getElementById('chatMsgs');
  var div=document.createElement('div');div.className='chat-msg';
  div.innerHTML='<div class="chat-avatar bot">AI</div><div><div class="chat-bubble">'+text.replace(/\n/g,'<br>')+'</div></div>';
  msgs.appendChild(div);
  if(chips&&chips.length){
    var cd=document.createElement('div');cd.className='chat-chips';
    chips.forEach(function(c){
      var b=document.createElement('div');b.className='chat-chip';b.textContent=c;
      b.onclick=function(){sendChatMsg(c);};
      cd.appendChild(b);
    });
    msgs.appendChild(cd);
  }
  msgs.scrollTop=msgs.scrollHeight;
}
function addUserMsg(text){
  var msgs=document.getElementById('chatMsgs');
  var div=document.createElement('div');div.className='chat-msg user';
  div.innerHTML='<div class="chat-avatar user">我</div><div class="chat-bubble">'+text+'</div>';
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
}
function showTyping(){
  var msgs=document.getElementById('chatMsgs');
  var div=document.createElement('div');div.className='chat-msg';div.id='typingDiv';
  div.innerHTML='<div class="chat-avatar bot">AI</div><div class="chat-bubble"><div class="chat-typing"><div class="chat-dot"></div><div class="chat-dot"></div><div class="chat-dot"></div></div></div>';
  msgs.appendChild(div);msgs.scrollTop=msgs.scrollHeight;
}
function removeTyping(){var d=document.getElementById('typingDiv');if(d)d.remove();}

var chatReplies={
  '免费':['好的！东京塔周边有几个免费打卡的绝佳地点：','增上寺（免费入场，可与东京塔同框）、芝公园（全天开放，宠物友好）、神明神社（千年古社，清幽参道）。要了解某个的详情吗？',['告诉我增上寺详情','芝公园在哪里','还有其他推荐吗']],
  '亲子':['亲子游的话，这几个地方很适合：','RED° TOKYO TOWER 有50+沉浸式游戏项目，全年龄友好；芝公园绿地宽阔，宠物也欢迎；増上寺历史氛围浓，小朋友能感受传统文化。',['RED° TOKYO TOWER怎么玩','芝公园有什么设施','还有没有其他选择']],
  '米其林':['米其林推荐的话，附近最值得去的是：','鮨 田中 ——江户前握寿司，食材每日丰洲直送，限定午间套餐性价比很高，建议提前一周预约。',['怎么预约','价格大概多少','还有其他餐厅吗']],
  '排队':['不想排队的话，这些地方都无需预约：','炭火烧浓厚中华そば（拉面百名店，随到随吃）、Blue Bottle Coffee（精品咖啡，直接进店）、RED° TOKYO TOWER（随时入场）。',['炭火烧在哪里','Blue Bottle的环境怎么样']],
};

function getBotReply(msg){
  for(var k in chatReplies){
    if(msg.includes(k))return chatReplies[k];
  }
  return ['收到！让我帮你看看附近有什么合适的地方…',
    '根据你的需求，我推荐：増上寺（免费·历史·景色绝佳）、鮨 田中（米其林·必尝）、森美术馆（艺术·夜间开放）。',
    ['告诉我更多偏好','查看全部10个地点']];
}

function sendChatMsg(text){
  addUserMsg(text);
  showTyping();
  setTimeout(function(){
    removeTyping();
    var reply=getBotReply(text);
    if(reply.length===3){
      addBotMsg(reply[0],[]);
      setTimeout(function(){addBotMsg(reply[1],reply[2]);},600);
    } else {
      addBotMsg(reply[0],reply[1]||[]);
    }
  },900);
}
function sendChat(){
  var inp=document.getElementById('chatInput');
  var v=inp.value.trim();if(!v)return;
  inp.value='';sendChatMsg(v);
}
document.getElementById('chatInput').addEventListener('keydown',function(e){if(e.key==='Enter')sendChat();});

/* ══════════════════════════════════════════════════════
   LIST SHEET
══════════════════════════════════════════════════════ */
function openListSheet(){document.getElementById('listSheet').classList.add('open');renderList();}
function closeListSheet(){document.getElementById('listSheet').classList.remove('open');}
function selectCat(el){activeCat=el.dataset.cat;document.querySelectorAll('.ls-cat').forEach(function(c){c.classList.remove('active');});el.classList.add('active');renderList();}
function renderList(){
  var q=(document.getElementById('lsInput').value||'').toLowerCase();
  var filtered=PL.filter(function(pl){
    var mc=(activeCat==='全部'||pl.cat===activeCat||pl.tag===activeCat);
    var mq=!q||(pl.n.toLowerCase().includes(q)||pl.desc.includes(q)||pl.ps.join('').includes(q));
    return mc&&mq;
  });
  document.getElementById('lsCount').textContent='共 '+filtered.length+' 个地点';
  document.getElementById('lsScroll').innerHTML=filtered.length?filtered.map(function(pl){return mkListCard(pl,PL.indexOf(pl));}).join(''):'<div style="padding:40px;text-align:center;color:#A0ACA9;font-size:14px">没有找到相关地点</div>';
}

/* List sheet swipe to close */
var lsDrag=false,lsY0=0;
document.getElementById('listSheet').addEventListener('touchstart',function(e){if(document.getElementById('lsScroll').scrollTop>4)return;lsDrag=true;lsY0=e.touches[0].clientY;},{passive:true});
document.getElementById('listSheet').addEventListener('touchmove',function(e){if(!lsDrag)return;if(e.touches[0].clientY-lsY0>60){closeListSheet();lsDrag=false;}},{passive:true});
document.getElementById('listSheet').addEventListener('touchend',function(){lsDrag=false;},{passive:true});

/* ══════════════════════════════════════════════════════
   DETAIL SHEET
══════════════════════════════════════════════════════ */
function openDetail(idx){
  var pl=PL[idx];
  var diw=document.querySelector('.d-iw');
  diw.style.background=pl.bg;
  diw.innerHTML='<img id="d-img" src="'+pl.img+'" alt="'+pl.n+'" style="width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .3s">';
  var img=document.getElementById('d-img');
  img.onload=function(){this.style.opacity='1';};
  img.onerror=function(){this.style.display='none';};
  document.getElementById('d-tags').innerHTML='<span class="d-tag">'+pl.tag+'</span><span class="d-tag loc">📍 '+pl.loc+'</span>';
  document.getElementById('d-name').textContent=pl.n;
  document.getElementById('d-desc').textContent=pl.desc;
  document.getElementById('d-hrs').textContent=pl.hrs;
  document.getElementById('d-dur').textContent=pl.dur;
  document.getElementById('d-hl').innerHTML='<div class="d-hl-ttl"><span style="color:#00A17B">✦</span> 智能看点</div>'+pl.hl.map(function(h){return'<div class="d-hl-row"><span class="d-hl-ic">'+h[0]+'</span><span>'+h[1]+'</span></div>';}).join('');
  document.getElementById('dscr').scrollTop=0;
  var webBtn=document.getElementById('d-web-btn');
  if(pl.url){webBtn.onclick=function(){window.open(pl.url,'_blank');};webBtn.style.opacity='1';webBtn.style.pointerEvents='auto';}
  else{webBtn.onclick=null;webBtn.style.opacity='.4';webBtn.style.pointerEvents='none';}
  document.getElementById('bd').classList.add('on');
  document.getElementById('dsheet').classList.add('open');
}
function closeDetail(){document.getElementById('bd').classList.remove('on');document.getElementById('dsheet').classList.remove('open');}
var dsDrag=false,dsY0=0;
document.getElementById('dsheet').addEventListener('touchstart',function(e){if(document.getElementById('dscr').scrollTop>4)return;dsDrag=true;dsY0=e.touches[0].clientY;},{passive:true});
document.getElementById('dsheet').addEventListener('touchmove',function(e){if(!dsDrag)return;if(e.touches[0].clientY-dsY0>60){closeDetail();dsDrag=false;}},{passive:true});
document.getElementById('dsheet').addEventListener('touchend',function(){dsDrag=false;},{passive:true});

/* ══════════════════════════════════════════════════════
   TATA MASCOT
══════════════════════════════════════════════════════ */
var tataWrap=document.getElementById('tataWrap');
var tataHidden=document.getElementById('tataHidden');
var tataFull=document.getElementById('tataFull');
var tataBd=document.getElementById('tataBd');
var tataPopup=document.getElementById('tataPopup');
var tataRevealed=false;
var tataPopupOpen=false;

/* Position tata just above the sheet edge */
function positionTata(){
  var sheetTop=curTop||SS.def.top;
  /* Only show in default state, hidden in map/list */
  if(appState==='map'||appState==='lst'){
    tataWrap.style.opacity='0';
    tataWrap.style.pointerEvents='none';
    return;
  }
  tataWrap.style.opacity='1';
  tataWrap.style.pointerEvents='auto';
  if(tataRevealed){
    /* Revealed: full head above sheet */
    tataWrap.style.top=(sheetTop-86)+'px';
  } else {
    /* Hidden: roughly half of head visible above sheet edge (~34px of 68px SVG) */
    tataWrap.style.top=(sheetTop-34)+'px';
  }
}

/* Called on every setState to reposition Tata */
var _origSetState=setState;
setState=function(next){
  _origSetState(next);
  setTimeout(positionTata,50);
};

function tataReveal(){
  if(!tataRevealed){
    /* First click: pop up head */
    tataRevealed=true;
    tataHidden.style.display='none';
    tataFull.style.display='block';
    positionTata();
    /* Auto-open popup after short delay */
    setTimeout(openTataPopup, 400);
  } else {
    /* Already revealed: just open popup */
    openTataPopup();
  }
}

function openTataPopup(){
  if(tataPopupOpen)return;
  tataPopupOpen=true;
  tataBd.classList.add('on');
  tataPopup.classList.add('open');
  /* Animate progress bar */
  setTimeout(function(){
    document.getElementById('tataProgress').style.width='30%';
  },200);
}

function closeTataPopup(){
  tataPopupOpen=false;
  tataBd.classList.remove('on');
  tataPopup.classList.remove('open');
  /* Return tata to hidden state */
  tataRevealed=false;
  tataFull.style.display='none';
  tataHidden.style.display='block';
  positionTata();
}

/* Profile page */
function openProfile(){
  closeTataPopup();
  document.getElementById('profilePage').classList.add('open');
}
function closeProfile(){
  document.getElementById('profilePage').classList.remove('open');
}

/* Init tata position */
positionTata();

/* Swipe down to close tata popup */
var tpDrag=false,tpY0=0;
tataPopup.addEventListener('touchstart',function(e){tpDrag=true;tpY0=e.touches[0].clientY;},{passive:true});
tataPopup.addEventListener('touchmove',function(e){if(!tpDrag)return;if(e.touches[0].clientY-tpY0>60){closeTataPopup();tpDrag=false;}},{passive:true});
tataPopup.addEventListener('touchend',function(){tpDrag=false;},{passive:true});

setTimeout(function(){showHint('↓ 下拉探索地图　↑ 上拉查看详情',2800);},800);