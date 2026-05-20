// Triplabo App Logic
// Auto-extracted from index.html

/* TAG → filter function — Skytree area (Japanese tags) */
var TAG_FILTERS = {
  '历史探访': function(pl){return pl.ps.join('').includes('历史')||pl.ps.join('').includes('寺庙')||pl.n.includes('浅草寺')||pl.n.includes('雷门')||pl.n.includes('花屋敷');},
  '夜景推荐': function(pl){return pl.ps.join('').includes('夜景');},
  '艺术体验': function(pl){return pl.ps.join('').includes('美术馆')||pl.ps.join('').includes('艺术')||pl.ps.join('').includes('浮世绘')||pl.ps.join('').includes('展览');},
  '自然散策': function(pl){return pl.cat==='自然'||pl.ps.join('').includes('公园')||pl.ps.join('').includes('赏樱');},
  '美食发现': function(pl){return pl.cat==='美食'||pl.ps.join('').includes('美食')||pl.ps.join('').includes('料理');},
  '购物逛街': function(pl){return pl.cat==='购物'||pl.ps.join('').includes('专门店')||pl.ps.join('').includes('伴手礼');},
  '祈愿参拜': function(pl){return pl.n.includes('浅草寺')||pl.n.includes('雷门')||pl.ps.join('').includes('寺庙神社');},
};

/* ── Category colors ─────────────────────────────────── */
var CAT_COLOR={
  '景点':'#0393F4',
  '美食':'#F75E4B',
  '自然':'#4FC7A7',
  '活动':'#FF82DC',
  '购物':'#B6A6E7',
  '限时活动':'#F4CF6E',
};

/* ── Full custom category SVGs (circle + icon, 36×36 viewBox) ── */
var CAT_SVG_INNER={
  '景点':'<circle cx="18" cy="18" r="18" fill="#0393F4"/><path d="M27.0672 16.765C26.3683 17.01 25.5737 16.6455 25.3288 15.9526C25.0839 15.2596 25.4901 14.4889 26.1831 14.244C26.201 14.238 25.747 12.9417 25.747 12.9417C25.275 11.5975 23.7935 10.8866 22.4553 11.3586L9.53957 15.8749C8.19543 16.3468 7.48453 17.8284 7.95647 19.1666C7.95647 19.1666 8.39855 20.4629 8.42244 20.4569C9.1214 20.212 9.92191 20.5585 10.1668 21.2575C10.4118 21.9564 9.99957 22.733 9.30659 22.978C9.28867 22.9839 9.87411 24.6387 9.87411 24.6387C10.3461 25.9829 11.8216 26.6938 13.1658 26.2218L26.0815 21.7055C27.4256 21.2336 28.1366 19.752 27.6646 18.4138C27.6646 18.4138 27.0851 16.759 27.0732 16.765H27.0672Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.2168 14.2688L22.6529 21.0782" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.63 1.88"/>',
  '美食':'<circle cx="18" cy="18" r="18" fill="#F75E4B"/><path d="M21.144 9.66675L19.2273 11.5834C18.7693 12.0507 18.5127 12.679 18.5127 13.3334C18.5127 13.9878 18.7693 14.6161 19.2273 15.0834L20.7273 16.5834C21.1947 17.0415 21.823 17.2981 22.4773 17.2981C23.1317 17.2981 23.76 17.0415 24.2273 16.5834L26.144 14.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.3103 20.5L10.5603 10.75C10.2277 11.0759 9.96345 11.4648 9.78306 11.8941C9.60268 12.3234 9.50977 12.7844 9.50977 13.25C9.50977 13.7156 9.60268 14.1766 9.78306 14.6059C9.96345 15.0352 10.2277 15.4241 10.5603 15.75L16.6436 21.8333C17.2269 22.4167 18.3103 22.4167 18.9769 21.8333L20.3103 20.5ZM20.3103 20.5L26.1436 26.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.56055 26.1667L14.8939 20.9167" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.6439 12.1667L17.8105 18.0001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  '自然':'<circle cx="18" cy="18" r="18" fill="#4FC7A7"/><path d="M10.3277 26.7768C10.0065 26.7768 9.74367 26.514 9.74367 26.1927V24.5924H9.73198C9.11288 24.5924 8.34777 24.5223 7.9915 23.9675C7.51841 23.2374 8.06158 22.6125 8.60476 22.1627C8.54635 22.1277 8.49962 22.0868 8.4529 22.0342C8.2952 21.859 8.21343 21.6371 8.22512 21.4035C8.24848 20.9129 8.6398 20.469 9.21217 19.9258C9.07784 19.8499 8.96103 19.7389 8.89094 19.5754C8.74493 19.2425 8.82086 18.8336 9.13625 18.2963C9.43412 17.7882 10.5029 16.3631 11.2973 16.293C11.3148 16.293 11.3557 16.293 11.3732 16.293C12.1967 16.293 13.2305 17.5429 13.5984 18.1444C13.9898 18.7811 14.0832 19.2775 13.8846 19.663C13.8321 19.7681 13.762 19.844 13.6744 19.9083C14.1708 20.3405 14.6614 20.8895 14.5037 21.5845C14.4512 21.8357 14.2993 21.9992 14.1124 22.1043C14.6731 22.6008 15.2046 23.2432 14.8191 23.95C14.5154 24.499 13.7912 24.5691 13.1954 24.5691H13.0553V26.1927C13.0553 26.514 12.7924 26.7768 12.4712 26.7768H10.3277Z" stroke="white" stroke-width="1.88" stroke-linejoin="round"/><path d="M20.671 26.7769C20.3498 26.7769 20.0869 26.5141 20.0869 26.1929V23.039C19.9234 23.039 19.754 23.0448 19.573 23.0448C18.4107 23.0448 17.155 22.9397 16.6527 22.1629C15.87 20.9597 17.079 19.8617 17.9551 19.1083C17.7332 19.0499 17.5404 18.9623 17.3944 18.8046C16.4716 17.8 17.8033 16.3632 18.8662 15.271C18.6034 15.1717 18.3523 15.014 18.2179 14.7103C18.0778 14.4008 17.996 13.8226 18.8429 12.3858C19.3218 11.5739 20.9221 9.23188 21.9968 9.13843H22.0844C23.1941 9.13843 24.6835 11.0833 25.3201 12.1113C26.0794 13.3436 26.313 14.2664 26.0209 14.8447C25.91 15.0608 25.7231 15.1834 25.507 15.271C26.3071 16.0186 27.3117 17.0232 27.0489 18.2264C26.9496 18.6819 26.6108 18.9039 26.2546 19.0207C27.154 19.8559 28.252 21.0181 27.6271 22.1571C27.2183 22.9046 26.0443 23.0039 24.9463 23.0039H24.1812V26.1929C24.1812 26.5141 23.9183 26.7769 23.5971 26.7769H20.671Z" stroke="white" stroke-width="1.88" stroke-linejoin="round"/>',
  '活动':'<circle cx="18" cy="18" r="18" fill="#FF82DC"/><path d="M17.9561 10.3535C18.8253 10.3536 19.7224 10.8485 20.0859 11.8359L21.2852 15.0771C21.3103 15.1451 21.3658 15.2039 21.4434 15.2344L24.6846 16.4336C26.6591 17.1686 26.6591 19.9642 24.6846 20.6992L21.4434 21.8984C21.373 21.924 21.3132 21.9815 21.2832 22.0615L20.0869 25.2939C19.7231 26.2856 18.8171 26.7792 17.9561 26.7793C17.0949 26.7793 16.188 26.2858 15.8242 25.2939L14.627 22.0557C14.6018 21.9875 14.5457 21.9289 14.4678 21.8984L11.2266 20.6992C9.25249 19.9641 9.25243 17.1688 11.2266 16.4336L14.4697 15.2344C14.5381 15.2091 14.5966 15.1525 14.627 15.0742L15.8252 11.8359C16.1897 10.8459 17.0957 10.3535 17.9561 10.3535Z" stroke="white" stroke-width="2" stroke-linejoin="round"/><path d="M25.8171 8.51367C25.983 8.51367 26.1551 8.60587 26.2227 8.7964L26.6284 9.90275C26.6714 10.0195 26.7636 10.1179 26.8866 10.1609L27.9929 10.5666C28.374 10.7079 28.374 11.2427 27.9929 11.384L26.8866 11.7897C26.7698 11.8327 26.6714 11.9249 26.6284 12.0478L26.2227 13.1542C26.1551 13.3447 25.983 13.4369 25.8171 13.4369C25.6511 13.4369 25.479 13.3447 25.4114 13.1542L25.0058 12.0478C24.9627 11.9311 24.8706 11.8327 24.7476 11.7897L23.6413 11.384C23.2602 11.2427 23.2602 10.7079 23.6413 10.5666L24.7476 10.1609C24.8644 10.1179 24.9627 10.0257 25.0058 9.90275L25.4114 8.7964C25.479 8.60587 25.6511 8.51367 25.8171 8.51367Z" fill="white"/>',
  '购物':'<circle cx="18" cy="18" r="18" fill="#B6A6E7"/><path d="M23.6971 27.6318H12.3019C10.1934 27.6318 8.60875 25.7063 9.01911 23.6356L10.5658 15.8452C10.8752 14.2795 12.2514 13.1558 13.8487 13.1558H22.1504C23.7477 13.1558 25.1176 14.2858 25.4332 15.8452L26.98 23.6356C27.3903 25.7063 25.8057 27.6318 23.6971 27.6318Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21.6521 16.5459V18.2946C21.6521 20.2201 20.0738 21.7984 18.1483 21.7984C16.2228 21.7984 14.6445 20.2201 14.6445 18.2946V16.5459" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.6445 12.9664V11.1356C14.6445 9.21012 16.2228 7.63184 18.1483 7.63184C20.0738 7.63184 21.6521 9.21012 21.6521 11.1356V12.9664" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  '限时活动':'<circle cx="18" cy="18" r="18" fill="#F4CF6E"/><path d="M8.5 16.9907H27.1277" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M24.7029 11.3906H10.9182C9.20191 11.3906 7.81055 12.782 7.81055 14.4983V23.7537C7.81055 25.47 9.20191 26.8614 10.9182 26.8614H24.7029C26.4192 26.8614 27.8105 25.47 27.8105 23.7537V14.4983C27.8105 12.782 26.4192 11.3906 24.7029 11.3906Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.1709 10.1384C13.2605 10.1384 13.2607 10.2273V12.5789C13.2605 12.6677 13.1709 12.6677C13.1219 12.6675 13.082 12.5789V10.2273L13.0889 10.1931C13.1023 10.1611 13.134 10.1386 13.1709 10.1384Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.4561 10.1384C22.5457 10.1384 22.5459 10.2273V12.5789C22.5457 12.6677 22.4561 12.6677C22.4071 12.6675 22.3672 12.5789V10.2273L22.374 10.1931C22.3875 10.1611 22.4192 10.1386 22.4561 10.1384Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

/* Return full category SVG (circle+icon) at given pixel size.
   pointer-events="none" lets all clicks fall through to the .poi element. */
function getCatSVG(cat,sz){
  var inner=CAT_SVG_INNER[cat]||CAT_SVG_INNER['景点'];
  return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events:none;display:block">'+inner+'</svg>';
}

function injectCatIcons(lv){
  document.querySelectorAll('.poi[data-i]').forEach(function(el){
    var old=el.querySelector('.poi-cat-icon');
    if(old)old.remove();
    var card=el.querySelector('.poi-card');
    var dist=el.querySelector('.poi-dist');
    var idx=parseInt(el.dataset.i);
    var pl=PL[idx];if(!pl)return;
    /* For event POIs, use venueCat (the underlying POI type) for the circle icon */
    var iconCat=pl.isEvent&&pl.venueCat?pl.venueCat:pl.cat;
    var color=CAT_COLOR[iconCat]||'#0393F4';
    if(dist)dist.style.background=color;
    if(lv>=1&&card){
      var sz=lv===1?40:26;
      var d=document.createElement('div');
      d.className='poi-cat-icon';
      d.style.cssText='pointer-events:none;position:relative';
      d.innerHTML=getCatSVG(iconCat,sz);
      /* Event badge: animated star dot in top-right corner */
      if(pl.isEvent&&lv===1){
        d.innerHTML+=
          '<span style="position:absolute;top:-3px;right:-3px;width:12px;height:12px;'
          +'background:#F4CF6E;border-radius:50%;border:2px solid #fff;'
          +'display:flex;align-items:center;justify-content:center;'
          +'font-size:7px;line-height:1;z-index:2;'
          +'animation:evStarPulse 1.8s ease-in-out infinite">✦</span>';
      }
      card.insertBefore(d,card.firstChild);
    } else if(lv===0&&card){
      var d=document.createElement('div');
      d.className='poi-cat-icon';
      d.style.pointerEvents='none';
      d.innerHTML=getCatSVG(iconCat,32);
      var oldIc=card.querySelector('.poi-ic');
      if(oldIc){oldIc.parentNode.replaceChild(d,oldIc);}
      else{card.insertBefore(d,card.firstChild);}
    }
  });
}

/* Compact card for Level 1 carousel */
function mkCompactCard(pl,idx){
  return '<div class="cc2" data-poi-idx="'+idx+'" onclick="openDetail('+idx+')">'
    +'<div class="cc2-iw" style="background:'+pl.bg+'">'
    +'<img src="'+pl.img+'" alt="'+pl.n+'" onload="this.style.opacity=1" onerror="this.style.display=\'none\'">'
    +'<div class="rc-ov"></div>'
    +'<div class="rc-tag '+pl.tc+'">'+pl.tag+'</div>'
    +'<div class="rc-dist">'+pl.d+'</div>'
    +'</div>'
    +'<div class="cc2-body">'
    +'<div class="cc2-name">'+pl.n+'</div>'
    +'<div class="cc2-price'+(pl.fr?' fr':'')+'">'+pl.p+'</div>'
    +'</div></div>';
}

/* Unified card builder — same format at all zoom levels */
function mkCard(pl,idx){
  var sub=pl.ps&&pl.ps[0]?pl.ps[0]:pl.desc.slice(0,16);
  return '<div class="rc" data-poi-idx="'+idx+'" onclick="openDetail('+idx+')">'
    +'<div class="rc-iw" style="background:'+pl.bg+'">'
    +'<img src="'+pl.img+'" alt="'+pl.n+'" style="opacity:0;transition:opacity .3s" onload="this.style.opacity=1" onerror="this.style.display=\'none\'">'
    +'<div class="rc-ov"></div>'
    +'<div class="rc-tag '+pl.tc+'">'+pl.tag+'</div>'
    +'<div class="rc-dist">'+pl.d+'</div>'
    +'<div class="rc-star">⭐ '+pl.r+'</div>'
    +'</div>'
    +'<div class="rc-body">'
    +'<div class="rc-name">'+pl.n+'</div>'
    +'<div class="rc-sub">'+sub+'</div>'
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
  style: 'mapbox://styles/popov233/cmogt89bl005d01sx1blv8jce',
  center: [139.8107, 35.710064],
  zoom: 15.5,
  interactive: true,
  scrollZoom: false
});

var ZOOM_CLOSE = 15.5;
var ZOOM_MED   = 13.6;
var ZOOM_FAR   = 12.3;

var TT_LL=[139.8107,35.710064];

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

  // Tokyo Tower center card
  var ttPt=map.project(TT_LL);
  var cc=document.getElementById('cc');
  cc.style.left=ttPt.x+'px';
  cc.style.top=ttPt.y+'px';

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

map.on('load',function(){updatePOIPositions();injectCatIcons(0);});
map.on('move',updatePOIPositions);

/* Center card — real photo with emoji fallback */
var ccImg = document.getElementById('ccImg');
ccImg.style.opacity = '0';
ccImg.style.transition = 'opacity .3s';
ccImg.onload = function(){ this.style.opacity = '1'; };
ccImg.onerror = function(){ this.style.display = 'none'; };
ccImg.src = 'https://lh3.googleusercontent.com/place-photos/AJRVUZNwXcpxVpNWj09JFD_vC4CgB0lPXnTuk2RAx7sWbI_KmRo9bPCc4OYgFX4qkLow4kUHUg13nCQpEOFf_Y0nahQ3Jd7gOKWj_iNKVXfDiy74O6JyYd3x821Cq0EeazciAGdZsokRRApxz5a6vg=s800';

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
var extPOIs=document.querySelectorAll('.epoi:not(.lv2poi)');
var lv2POIs=document.querySelectorAll('.lv2poi');
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

  /* Center card: position to center of default map view */
  var cc=document.getElementById('cc');
  cc.style.transition='none';
  cc.style.top=Math.round(MDEF/2)+'px';
  var cw=phone.clientWidth||390;
  cc.style.left=Math.round(cw/2)+'px';
}/* == Skytree content patch == */
(function patchContent(){
  function q(s){return document.querySelector(s);}
  function qa(s){return document.querySelectorAll(s);}
  // Labels
  var c=q('.cc-lbl'); if(c)c.textContent='晴空塔';
  var cn=q('#ccLabel .poi-name'); if(cn)cn.textContent='晴空塔';
  // Near POIs
  [['n1','0','展览馆','免费展示'],['n2','1','墓田水族馆','水族馆'],['n3','2','隆田公园','公园·樱花']].forEach(function(e){
    var el=document.getElementById(e[0]);if(!el)return;
    el.dataset.i=e[1];
    var nm=el.querySelector('.poi-name');var sb=el.querySelector('.poi-sub');
    if(nm)nm.textContent=e[2];if(sb)sb.textContent=e[3];
  });
  // Extended POIs
  [['e1','3','雷门','浅草历史'],['e2','4','浅草寺','东京最古老的寺'],
   ['e3','5','锦丝公园','赏樱名所'],['e4','6','浅草花屋敷','日本最古老游乐园'],
   ['e5','7','武士忍者馆','体验历史'],['e6','8','北旋美术馆','浮世绘艺术'],
   ['e7','9','东武博物馆','铁道历史'],
   ['v1','10','合羽桥','专门店街'],['v2','10','隆田川散步','散步河畑'],
   ['v3','10','索拉玛奇','购物'],['v4','10','抑上街区','咋啡杂货'],
   ['v5','10','向岛百花园','幭园自然'],
   ['ev1','30','BLUE LOCK','限时活动'],['ev2','31','台湾祭','限时活动']
  ].forEach(function(e){
    var el=document.getElementById(e[0]);if(!el)return;
    el.dataset.i=e[1];
    var nm=el.querySelector('.poi-name');var sb=el.querySelector('.poi-sub');
    if(nm)nm.textContent=e[2];if(sb)sb.textContent=e[3];
  });
  // Hero
  var ht=q('.hero-title');if(ht)ht.innerHTML='<span>&#x1F5FC;</span>开启晴空塔之旅';
  var hi=qa('.hi-row span:last-child');
  if(hi[0])hi[0].textContent='地上350米天望甲板360°全景';
  if(hi[1])hi[1].textContent='天望回廊（450米）体验空中漫步';
  if(hi[2])hi[2].textContent='东京第一夜景，日落后最美';
  // Ticket
  var tr=qa('.tkt-rows>div');
  if(tr[0]){var v=tr[0].querySelector('.tkt-val');if(v)v.textContent='天望甲板（350米）入场券';}
  if(tr[1]){var v=tr[1].querySelector('.tkt-val');if(v)v.textContent='2026-07-15、9:00';}
  if(tr[2]){var v=tr[2].querySelector('.tkt-val');if(v)v.textContent='大人 ×2  儿童 ×1';}
  var mr=qa('.tkt-mr span:last-child');
  if(mr[0])mr[0].textContent='营业时间：10:00～22:00  最终入场 21:30';
  if(mr[1])mr[1].textContent='东京都墓田区抑上1丁目1−1−2';
  var tp=qa('.tkt-tip span');
  if(tp[0])tp[0].innerHTML='<b>时间：</b>上午或傅晒后人少，推荐前往。';
  if(tp[1])tp[1].innerHTML='<b>夜景：</b>日落30分后魔法时刻最美，选晴天前往。';
  if(tp[2])tp[2].innerHTML='<b>购物：</b>别忘了在索拉玛奇买限定周边和伴手礼！';
  var wb=q('.tkt-acts .btn-g');if(wb)wb.onclick=function(){window.open('https://www.tokyo-skytree.jp/','_blank');};
})();


init();
injectCatIcons(0);

/* ── Cycling search placeholder ──────────────────────── */
(function(){
  var TAGS=['历史探访 🏛️','夜景推荐 🌃','艺术体验 🎨','自然散策 🌿','美食发现 🍜','祈愿参拜 ⛩️'];
  var idx=0;
  function cycle(){
    var els=[
      document.getElementById('msearchTxt'),
      document.getElementById('sheetSearchTxt')
    ];
    els.forEach(function(el){if(el)el.classList.add('fade');});
    setTimeout(function(){
      idx=(idx+1)%TAGS.length;
      els.forEach(function(el){if(!el)return;el.textContent=TAGS[idx];el.classList.remove('fade');});
    },320);
  }
  setInterval(cycle,3000);
})();

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
  /* Shift center card */
  var cc=document.getElementById('cc');
  cc.style.transition=anim?('top '+T+', width '+T+', height '+T+', border-radius '+T):'none';
  var mapCenter = (sTop===SS.map.top) ? Math.round(PH/2) : Math.round(MDEF/2);
  cc.style.top = mapCenter+'px';
  if(sTop===SS.map.top){cc.classList.add('mapfull');}
  else{cc.classList.remove('mapfull');}
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
    nearPOIs.forEach(function(p){p.style.display='flex';});
    /* Restore Tokyo Tower full photo card in def state */
    _ccRestoreFull();
  }
  if(next==='map'){
    applyLayout(SS.map.top,SS.map.h,PH,true);
    sscr.style.overflowY='hidden';sscr.scrollTop=0;
    nearPOIs.forEach(function(p){p.style.display='flex';});
    setTimeout(function(){
      map.resize();
      setMapOverlays(true);
      /* Minimize Tokyo Tower to icon when entering map mode at lv0 */
      if(zoomLv===0)_ccMinimize(1);
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

/* ── Tokyo Tower cc helpers ─────────────────────────── */
function _ccMinimize(effectiveLv){
  var cc=document.getElementById('cc');
  var ccCatIcon=document.getElementById('cc-cat-icon');
  var ccLbl=document.getElementById('ccLabel');
  cc.classList.remove('lv1','lv2');
  cc.classList.add('lv'+(effectiveLv||1));
  if(ccCatIcon){ccCatIcon.style.display='flex';ccCatIcon.innerHTML=getCatSVG('景点',effectiveLv===2?26:40);}
  var ccTop=parseInt(cc.style.top)||Math.round(PH/2);
  ccLbl.style.top=(ccTop+(effectiveLv===2?30:44))+'px';
  ccLbl.classList.add('show');
}
function _ccRestoreFull(){
  var cc=document.getElementById('cc');
  var ccCatIcon=document.getElementById('cc-cat-icon');
  var ccLbl=document.getElementById('ccLabel');
  cc.classList.remove('lv1','lv2');
  if(ccCatIcon){ccCatIcon.style.display='none';ccCatIcon.innerHTML='';}
  ccLbl.classList.remove('show');
}

function setZoom(lv,showMsg){
  zoomLv=lv;
  var zoomVals=[ZOOM_CLOSE,ZOOM_MED,ZOOM_FAR];
  map.flyTo({zoom:zoomVals[lv],duration:600});

  var cc=document.getElementById('cc');
  var ccLbl=document.getElementById('ccLabel');
  var mcards=document.getElementById('mcards');
  var vaBtn=document.getElementById('vaBtn');
  var mCountBar=document.getElementById('mCountBar');
  var mstrip=document.getElementById('mstrip');

  /* ── POI visual levels ── */
  document.querySelectorAll('.poi[data-i]').forEach(function(el){
    el.classList.remove('zoom-lv0','zoom-lv1','zoom-lv2');
  });
  nearPOIs.forEach(function(p){
    p.style.display='flex';
    p.classList.add('zoom-lv'+lv);
  });
  extPOIs.forEach(function(p){
    p.classList.remove('show');
    if(lv>=1){p.classList.add('show','zoom-lv'+lv);}
  });
  lv2POIs.forEach(function(p){
    p.classList.remove('show');
    if(lv>=2){p.classList.add('show','zoom-lv2');}
  });
  injectCatIcons(lv);

  /* ── Center card (Tokyo Tower) ── */
  if(lv>=1){
    _ccMinimize(lv);
  } else if(appState==='map'){
    /* lv=0 in map mode: still show as icon (no big photo card) */
    _ccMinimize(1);
  } else {
    /* lv=0 in def state: full photo card */
    _ccRestoreFull();
  }

  /* ── Distance badge ── */
  var distLabels=['步行范围 · 500m','地铁 2站以内 · 2km','地铁 5站以内 · 5km'];
  document.getElementById('wbtxt').textContent=distLabels[lv];

  /* ── Bottom area — unified mkCard for all levels ── */
  closeMiniPop();
  var count=lv===0?3:10;
  mstrip.style.display='';
  mcards.innerHTML=PL.slice(0,count).map(function(pl,i){return mkCard(pl,i);}).join('');
  vaBtn.classList.remove('show');
  mCountBar.classList.remove('show-bar');

  if(showMsg){
    var msgs=['已放大','已缩小 · 地铁2站范围','已缩小 · 地铁5站范围'];
    showHint(msgs[lv]);
  }
}

/* ── Mini popup ── */
var miniPopIdx=-1;
function openMiniPop(idx,x,y){
  var pl=PL[idx];if(!pl)return;
  miniPopIdx=idx;
  var mp=document.getElementById('miniPop');
  /* Category icon circle */
  document.getElementById('miniPopIc').innerHTML=getCatSVG(pl.isEvent&&pl.venueCat?pl.venueCat:pl.cat,36);
  document.getElementById('miniPopName').textContent=pl.n;
  document.getElementById('miniPopSub').textContent=pl.ps&&pl.ps[0]?pl.ps[0]:pl.tag;
  var distEl=document.getElementById('miniPopDist');
  distEl.textContent=pl.d;
  distEl.style.background=CAT_COLOR[pl.cat]||'#0393F4';
  /* Click anywhere to open detail */
  mp.onclick=function(){closeMiniPop();openDetail(idx);};
  mp.style.left=x+'px';
  mp.style.top=y+'px';
  mp.style.display='block';
}
function closeMiniPop(){
  document.getElementById('miniPop').style.display='none';
  miniPopIdx=-1;
}

document.getElementById('zinBtn').onclick=function(){if(zoomLv>0)setZoom(zoomLv-1,true);};
document.getElementById('zoutBtn').onclick=function(){if(zoomLv<2)setZoom(zoomLv+1,true);};
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
mapWrap.addEventListener('touchmove',function(e){if(!pinching||e.touches.length!==2)return;var d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(Math.abs(d-pd)>30){if(d<pd&&zoomLv<2)setZoom(zoomLv+1,true);else if(d>pd&&zoomLv>0)setZoom(zoomLv-1,true);pinching=false;}},{passive:true});
mapWrap.addEventListener('touchend',function(){pinching=false;},{passive:true});
var lt=0;mapWrap.addEventListener('click',function(){if(appState!=='map')return;var now=Date.now();if(now-lt<300){setZoom(zoomLv<2?zoomLv+1:0,true);}lt=now;closeMiniPop();});
document.querySelectorAll('.poi').forEach(function(el){
  el.addEventListener('click',function(e){
    e.stopPropagation();
    var idx=parseInt(el.dataset.i||'0');
    if(zoomLv>=1){
      /* Show mini popup positioned at the POI */
      var rect=el.getBoundingClientRect();
      var mapRect=document.getElementById('mapWrap').getBoundingClientRect();
      var x=rect.left+rect.width/2-mapRect.left;
      var y=rect.top-mapRect.top;
      openMiniPop(idx,x,y);
    } else {
      openDetail(idx);
    }
    /* Sync bottom card strip to this POI */
    scrollMcardToIdx(idx);
  });
});

/* ── Map ↔ Card strip sync ──────────────────────────── */
function scrollMcardToIdx(idx){
  var mcards=document.getElementById('mcards');
  var card=mcards.querySelector('[data-poi-idx="'+idx+'"]');
  if(!card)return;
  /* Anchor to left edge with small padding */
  mcards.scrollTo({left:Math.max(0,card.offsetLeft-14),behavior:'smooth'});
}

(function(){
  var mcards=document.getElementById('mcards');
  var scrollTimer=null;
  mcards.addEventListener('scroll',function(){
    clearTimeout(scrollTimer);
    scrollTimer=setTimeout(function(){
      var cards=mcards.querySelectorAll('[data-poi-idx]');
      if(!cards.length)return;
      /* Detect leftmost visible card */
      var leftEdge=mcards.scrollLeft+14;
      var closest=null,closestDist=Infinity;
      cards.forEach(function(c){
        var dist=Math.abs(c.offsetLeft-leftEdge);
        if(dist<closestDist){closestDist=dist;closest=c;}
      });
      if(closest){
        var pidx=parseInt(closest.dataset.poiIdx);
        var pl=PL[pidx];
        if(pl&&pl.ll)map.flyTo({center:pl.ll,duration:350,essential:true});
      }
    },200);
  },{passive:true});
})();

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
  '免费':['好的！晴空塔周边有几个免费打卡的绝佳地点：','隅田公园（全天开放，可远眺晴空塔）、浅草寺（东京最古老寺院）、雷门（浅草象征，夜间灯光超美）。要了解某个地点的详情吗？',['告诉我隅田公园详情','浅草寺在哪里','还有其他推荐吗']],
  '亲子':['亲子游的话，这几个地方很适合：','墨田水族馆有日本最大室内企鹅泳池，孩子超爱；浅草花屋敷是日本最古老游乐园，昭和复古超好玩；隅田公园草坪宽阔适合野餐。',['墨田水族馆怎么玩','花屋敷适合几岁','还有没有其他选择']],
  '历史':['历史探访推荐：','浅草寺——东京最古老寺院，已有1400年历史；雷门——浅草标志，每天游客云集；武士忍者博物馆——体验武士文化，评分极高（4.9分）。',['浅草寺如何前往','武士博物馆怎么预约','还有什么历史景点']],
  '夜景':['夜景推荐的话，晴空塔周边绝对不能错过：','东京晴空塔天望甲板（350米）——东京第一夜景；隅田公园沿河步道——可拍晴空塔倒影；浅草寺夜间参拜——提灯灯光超美。',['天望甲板票价多少','晴空塔几点开到几点','还有什么推荐']],
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
var _dEvIdx=-1; /* current event index for tab switching */

/* ── Helpers ─────────────────────────────────────────── */
function _setDetailWebsite(url){
  var wsec=document.getElementById('d-website');
  var wlink=document.getElementById('d-web-link');
  if(url){
    wlink.href=url;
    wlink.textContent=url.replace(/^https?:\/\//,'');
    wsec.style.display='block';
  } else {
    wsec.style.display='none';
  }
}
function _setDetailTicket(pl){
  var sec=document.getElementById('d-ticket-section');
  if(!sec)return;
  if(pl.fr){
    sec.innerHTML='';/* free tag is added to d-tags instead */
  } else if(pl.p){
    /* 去购票 only for 景点 category */
    var isJingDian=(pl.cat==='景点'||pl.tag==='景点');
    sec.innerHTML='<div class="d-ticket-block">'
      +'<div><div class="d-ticket-lbl">🎫 票价</div>'
      +'<div class="d-ticket-price">'+pl.p+'</div></div>'
      +(isJingDian&&pl.url?'<a href="'+pl.url+'" target="_blank" class="d-buy-btn">去购票 →</a>':'')
      +'</div>';
  } else {
    sec.innerHTML='';
  }
}
function _clearDetailTicket(){
  var sec=document.getElementById('d-ticket-section');
  if(sec)sec.innerHTML='';
}
function _setDetailImage(src,bg){
  var diw=document.querySelector('.d-iw');
  diw.style.background=bg||'#555';
  diw.innerHTML='<img id="d-img" src="'+src+'" style="width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .3s">';
  var img=document.getElementById('d-img');
  img.onload=function(){this.style.opacity='1';};
  img.onerror=function(){this.style.display='none';};
}
function _buildTickets(tickets){
  return tickets.map(function(t){
    return '<div class="ev-ticket">'
      +'<div style="flex:1"><div class="ev-ticket-name">'+t.name+'</div>'
      +'<div class="ev-ticket-sub">'+t.sub+'</div></div>'
      +'<div class="ev-ticket-price">'+t.price+'</div>'
      +'</div>';
  }).join('');
}

/* ── Render event tab 0 (活动详情) ───────────────────── */
function _renderEventTab(pl){
  _setDetailImage(pl.img,pl.bg);
  document.getElementById('d-name').textContent=pl.n;
  document.getElementById('d-desc').textContent=pl.desc;
  /* 时间: 活动时间 + 开放时间 */
  document.getElementById('d-hrs-lbl').textContent='🗓 活动时间';
  document.getElementById('d-hrs').textContent=pl.eventPeriod||pl.hrs;
  document.getElementById('d-dur-lbl').textContent='🕐 开放时间';
  document.getElementById('d-dur').textContent=pl.hrs;
  /* 地点 */
  var venueSec=document.getElementById('d-venue');
  var venueTxt=document.getElementById('d-venue-txt');
  if(pl.venue){
    venueTxt.textContent=pl.venue;
    venueSec.style.display='block';
  } else {
    venueSec.style.display='none';
  }
  document.getElementById('d-tags').innerHTML=
    '<span class="d-tag ev-tag">限时活动</span>'
    +'<span class="d-tag loc">📍 '+pl.loc+'</span>';

  var menuBlock='';
  if(pl.eventMenu&&pl.eventMenu.length){
    var menuHtml=pl.eventMenu.map(function(item){
      return '<div class="ev-menu-row">'
        +'<div><div class="ev-menu-name">'+item.name+'</div>'
        +(item.note?'<div class="ev-menu-note">'+item.note+'</div>':'')
        +'</div>'
        +'<div class="ev-menu-price">'+item.price+'</div>'
        +'</div>';
    }).join('');
    menuBlock='<div class="ev-section-hd" style="margin-top:14px">🍽 活动菜单</div>'
      +'<div class="ev-menu">'+menuHtml+'</div>';
  }

  document.getElementById('d-hl').innerHTML=
    '<div class="d-hl-ttl"><span style="color:#0393F4">✦</span> 活动亮点</div>'
    +pl.hl.map(function(h){return'<div class="d-hl-row"><span class="d-hl-ic">'+h[0]+'</span><span>'+h[1]+'</span></div>';}).join('')
    +menuBlock;

  /* 价格: simple price block (no 去购票 for events since not 景点) */
  _setDetailTicket(pl);
  /* Detailed ticket tiers */
  _removeEvTickets();
  if(pl.eventTickets&&pl.eventTickets.length){
    var sec=document.createElement('div');
    sec.id='d-ev-tickets';
    sec.innerHTML='<div class="ev-sec-ttl">🎟 票价明细</div>'+_buildTickets(pl.eventTickets);
    document.getElementById('d-ticket-section').insertAdjacentElement('afterend',sec);
  }

  _setDetailWebsite(pl.url);
}

function _removeEvTickets(){
  var t=document.getElementById('d-ev-tickets');
  if(t)t.remove();
}

/* ── Render event tab 1 (设施信息) ───────────────────── */
function _renderVenueTab(pl){
  _removeEvTickets();
  _setDetailImage(pl.poiImg||pl.img, '#4A4A5A');
  document.getElementById('d-name').textContent=pl.poiName;
  document.getElementById('d-desc').textContent=pl.poiDesc;
  document.getElementById('d-hrs-lbl').textContent='🕐 营业时间';
  document.getElementById('d-hrs').textContent=pl.poiHrs;
  document.getElementById('d-dur-lbl').textContent='⏱ 畅游路程';
  document.getElementById('d-dur').textContent=pl.poiDur||'2-3小时';
  document.getElementById('d-venue').style.display='none';
  document.getElementById('d-tags').innerHTML=
    '<span class="d-tag">设施</span>'
    +'<span class="d-tag loc">📍 '+pl.loc+'</span>';
  document.getElementById('d-hl').innerHTML=
    '<div class="d-hl-ttl"><span style="color:#0393F4">✦</span> 设施亮点</div>'
    +(pl.poiHl||[]).map(function(h){return'<div class="d-hl-row"><span class="d-hl-ic">'+h[0]+'</span><span>'+h[1]+'</span></div>';}).join('');

  _setDetailWebsite(pl.poiUrl||'');
  _clearDetailTicket();
}

/* ── Tab switching ───────────────────────────────────── */
function switchDetailTab(tabIdx){
  var pl=PL[_dEvIdx];
  document.getElementById('dTab0').classList.toggle('d-tab-active',tabIdx===0);
  document.getElementById('dTab1').classList.toggle('d-tab-active',tabIdx===1);
  if(tabIdx===0) _renderEventTab(pl); else _renderVenueTab(pl);
  document.getElementById('dscr').scrollTop=0;
}

/* ── Open / Close ────────────────────────────────────── */
function openDetail(idx){
  var pl=PL[idx];
  _dEvIdx=idx;

  var tabBar=document.getElementById('dTabBar');
  if(pl.isEvent){
    /* Show tab bar and reset to tab 0 */
    tabBar.style.display='flex';
    document.getElementById('dTab0').classList.add('d-tab-active');
    document.getElementById('dTab1').classList.remove('d-tab-active');
    _renderEventTab(pl);
  } else {
    /* Hide tab bar, render regular POI */
    tabBar.style.display='none';
    _removeEvTickets();
    _setDetailImage(pl.img,pl.bg);
    document.getElementById('d-name').textContent=pl.n;
    document.getElementById('d-desc').textContent=pl.desc;
    /* Reset meta labels */
    document.getElementById('d-hrs-lbl').textContent='🕐 营业时间';
    document.getElementById('d-hrs').textContent=pl.hrs;
    document.getElementById('d-dur-lbl').textContent='⏱ 畅游路程';
    document.getElementById('d-dur').textContent=pl.dur;
    document.getElementById('d-venue').style.display='none';
    /* Tags: add free badge if applicable */
    var freeBadge=pl.fr?'<span class="d-tag d-tag-free">🆓 免费</span>':'';
    document.getElementById('d-tags').innerHTML=freeBadge+'<span class="d-tag">'+pl.tag+'</span><span class="d-tag loc">📍 '+pl.loc+'</span>';
    document.getElementById('d-hl').innerHTML='<div class="d-hl-ttl"><span style="color:#0393F4">✦</span> 智能看点</div>'+pl.hl.map(function(h){return'<div class="d-hl-row"><span class="d-hl-ic">'+h[0]+'</span><span>'+h[1]+'</span></div>';}).join('');
    _setDetailWebsite(pl.url);
    _setDetailTicket(pl);
  }

  document.getElementById('dscr').scrollTop=0;
  document.getElementById('bd').classList.add('on');
  document.getElementById('dsheet').classList.add('open');
}

function closeDetail(){
  document.getElementById('bd').classList.remove('on');
  document.getElementById('dsheet').classList.remove('open');
  document.getElementById('dTabBar').style.display='none';
  _removeEvTickets();
  _clearDetailTicket();
  _setDetailWebsite('');
  document.getElementById('d-venue').style.display='none';
  document.getElementById('d-hrs-lbl').textContent='🕐 营业时间';
  document.getElementById('d-dur-lbl').textContent='⏱ 畅游路程';
  _dEvIdx=-1;
}
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