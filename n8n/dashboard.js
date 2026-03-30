const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>Zuhause</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#08080f;
  --glass:rgba(255,255,255,0.04);
  --glass-h:rgba(255,255,255,0.07);
  --border:rgba(255,255,255,0.07);
  --border-lit:rgba(200,170,110,0.4);
  --text:#e8e8f0;--text2:rgba(232,232,240,0.45);--text3:rgba(232,232,240,0.22);
  --gold:#c8aa6e;--gold-dim:rgba(200,170,110,0.15);--gold-glow:rgba(200,170,110,0.07);
  --green:#6ec87c;--green-dim:rgba(110,200,124,0.12);--green-b:rgba(110,200,124,0.4);
  --flamingo:#f87aa3;--flamingo-dim:rgba(248,122,163,0.12);--flamingo-b:rgba(248,122,163,0.4);
  --yellow:#f5d035;--yellow-dim:rgba(245,208,53,0.12);--yellow-b:rgba(245,208,53,0.4);
  --r:12px
}
html,body{width:100%;height:100%;background:var(--bg);font-family:'Inter',system-ui,sans-serif;color:var(--text);overflow:hidden;-webkit-font-smoothing:antialiased}
.shell{display:flex;flex-direction:column;height:100dvh}
.topbar{flex-shrink:0;height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;border-bottom:1px solid var(--border);background:rgba(8,8,15,0.95);backdrop-filter:blur(20px);position:relative;z-index:10}
.topbar-left{display:flex;align-items:center;gap:16px}
.logo{display:flex;align-items:center;gap:8px}
.logo svg{color:var(--gold)}
.logo-label{font-size:12px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--text2)}
.tabs{display:flex;gap:2px;background:var(--glass);border:1px solid var(--border);border-radius:8px;padding:3px}
.tab{padding:5px 16px;font-size:13px;font-weight:500;border-radius:5px;cursor:pointer;transition:all .2s;color:var(--text2);border:none;background:none;font-family:inherit}
.tab.active{background:var(--gold);color:#0d0a04;font-weight:600}
.topbar-center{position:absolute;left:50%;transform:translateX(-50%);text-align:center}
.clock{font-size:26px;font-weight:300;letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
.clock-date{font-size:11px;color:var(--text2);margin-top:2px}
.topbar-right{display:flex;align-items:center;gap:16px}
.weather{display:flex;align-items:center;gap:9px}
.wx-temp{font-size:20px;font-weight:300}
.wx-sub{font-size:11px;color:var(--text2);margin-top:1px}
.presence{display:flex;gap:5px}
.av{width:30px;height:30px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid rgba(255,255,255,0.1);color:var(--text2);background:var(--glass);transition:all .4s}
.av.home{border-color:var(--gold);color:var(--gold);background:var(--gold-dim)}
.av.asleep{border-color:rgba(110,200,124,0.3);color:var(--green);background:var(--green-dim)}
.gn-btn{padding:5px 14px;font-size:12px;font-weight:500;border-radius:6px;border:1px solid rgba(248,122,163,0.3);color:var(--flamingo);background:rgba(248,122,163,0.07);cursor:pointer;font-family:inherit;transition:all .2s;-webkit-tap-highlight-color:transparent}
.gn-btn:hover{background:rgba(248,122,163,0.15);border-color:var(--flamingo)}
.rooms{flex:1;min-height:0;padding:10px 14px 8px;display:flex;flex-direction:column;overflow:hidden}
.floor{display:none}
.floor.active{flex:1;display:flex;flex-direction:column;gap:8px}
.row{display:grid;gap:8px;flex:1;min-height:0}
.r4{grid-template-columns:repeat(4,1fr)}
.r3{grid-template-columns:repeat(3,1fr)}
.r2{grid-template-columns:repeat(2,1fr)}
.card{background:var(--glass);border:1px solid var(--border);border-radius:var(--r);padding:14px;position:relative;overflow:hidden;transition:border-color .25s,background .25s;display:flex;flex-direction:column}
.card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 0%,var(--gold-glow),transparent 65%);opacity:0;transition:opacity .4s;pointer-events:none}
.card.lit{border-color:var(--border-lit);background:rgba(200,170,110,0.03)}
.card.lit::before{opacity:1}
.ch{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-shrink:0}
.rn{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text2)}
.ri{font-size:14px}
.lights{display:grid;grid-template-columns:1fr 1fr;gap:5px;flex:1}
.lbtn{border-radius:9px;border:1px solid var(--border);background:rgba(255,255,255,0.03);color:var(--text2);font-size:13px;font-weight:500;text-align:center;cursor:pointer;transition:all .18s ease;font-family:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 6px;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;min-height:38px}
.lbtn.on{border-color:rgba(200,170,110,0.45);background:rgba(200,170,110,0.12);color:var(--gold)}
.lbtn:active{transform:scale(0.96)}
.srows{margin-top:8px;padding-top:8px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:5px;flex-shrink:0}
.srow{display:flex;align-items:center;justify-content:space-between}
.sn{font-size:12px;color:var(--text2)}
.sv{font-size:12px;color:var(--text2)}
.sv.open{color:#f97316}
.sv.closed{color:var(--text3)}
.tr{display:flex;align-items:baseline;gap:4px;margin-top:8px;padding-top:8px;border-top:1px solid var(--border);flex-shrink:0}
.tv{font-size:20px;font-weight:300}
.tu{font-size:11px;color:var(--text2)}
.tl{font-size:10px;color:var(--text3);margin-left:auto}
.scenes{display:flex;gap:4px;margin-top:8px;flex-wrap:wrap;flex-shrink:0}
.scene{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:500;border:1px solid var(--border);color:var(--text2);cursor:pointer;transition:all .2s;background:none;font-family:inherit;-webkit-tap-highlight-color:transparent}
.scene:hover,.scene.active{border-color:var(--gold);color:var(--gold);background:var(--gold-dim)}
.cl-btn{background:none;border:1px solid var(--border);border-radius:6px;color:var(--text3);font-size:11px;padding:2px 5px;cursor:pointer;margin-left:auto;transition:all .2s;-webkit-tap-highlight-color:transparent;flex-shrink:0}
.cl-btn:hover{border-color:var(--gold);color:var(--gold)}
.cl-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(6px);z-index:100;display:none;align-items:center;justify-content:center;padding:20px}
.cl-overlay.open{display:flex}
.cl-sheet{background:#0d0d1c;border:1px solid rgba(200,170,110,0.2);border-radius:18px;width:100%;max-width:520px;max-height:80dvh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,0.04),0 24px 64px rgba(0,0,0,0.6)}
.cl-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 14px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;background:rgba(200,170,110,0.04)}
.cl-title{font-size:14px;font-weight:600;color:var(--gold);letter-spacing:.01em}
.cl-close{background:none;border:1px solid var(--border);border-radius:6px;color:var(--text2);font-size:14px;cursor:pointer;padding:3px 8px;line-height:1.4;font-family:inherit;transition:all .15s}
.cl-close:hover{border-color:var(--gold);color:var(--gold)}
.cl-body{overflow-y:auto;padding:0;flex:1;-webkit-overflow-scrolling:touch}
.cl-section{padding:14px 20px 10px}
.cl-section+.cl-section{border-top:1px solid rgba(255,255,255,0.05)}
.cl-section-title{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);opacity:.6;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.cl-section-title::after{content:'';flex:1;height:1px;background:rgba(200,170,110,0.12)}
.cl-item{display:flex;align-items:center;gap:12px;padding:9px 4px;border-bottom:1px solid rgba(255,255,255,0.035)}
.cl-item:last-child{border-bottom:none}
.cl-check{width:19px;height:19px;border-radius:5px;border:1.5px solid rgba(255,255,255,0.18);background:none;cursor:pointer;appearance:none;-webkit-appearance:none;flex-shrink:0;transition:all .2s;position:relative}
.cl-check:checked{background:var(--gold);border-color:var(--gold)}
.cl-check:checked::after{content:'✓';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:11px;color:#0d0a04;font-weight:800}
.cl-label{font-size:13px;color:var(--text);flex:1;line-height:1.4}
.cl-label.done{color:var(--text3);text-decoration:line-through}
.cl-meta{font-size:10px;color:var(--text3);margin-top:2px}
.cl-empty{font-size:12px;color:var(--text3);padding:6px 4px;font-style:italic}
.cl-loading{text-align:center;color:var(--text3);font-size:13px;padding:32px 0}
.cl-group{margin-bottom:6px}
.cl-group-title{font-size:10px;font-weight:600;color:var(--gold);opacity:.8;padding:8px 4px 4px;border-left:2px solid var(--gold);padding-left:8px;margin-bottom:2px;letter-spacing:.02em}
.cl-group .cl-item{padding-left:10px}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;border:1px solid var(--green-b);color:var(--green);background:var(--green-dim);margin-top:8px;flex-shrink:0}
.badge-dot{width:5px;height:5px;border-radius:50%;background:currentColor}
.plant-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:7px;flex:1}
.plant-item{padding:8px 10px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;display:flex;flex-direction:column;justify-content:center}
.plant-name{font-size:12px;font-weight:500;color:var(--text);margin-bottom:5px}
.plant-bar-wrap{height:4px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden}
.plant-bar{height:100%;border-radius:2px;transition:width .5s ease,background .5s ease}
.plant-meta{display:flex;justify-content:space-between;margin-top:4px;font-size:11px}
.water-btn{flex-shrink:0;width:100%;padding:7px;border-radius:8px;border:1px solid var(--green-b);background:var(--green-dim);color:var(--green);font-size:12px;font-weight:500;cursor:not-allowed;font-family:inherit;opacity:.45}
.spin{display:inline-block;width:12px;height:12px;border:2px solid rgba(255,255,255,0.1);border-top-color:var(--gold);border-radius:50%;animation:sp .6s linear infinite;flex-shrink:0}
@keyframes sp{to{transform:rotate(360deg)}}
.status-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.cal-strip{flex-shrink:0;height:190px;border-top:1px solid var(--border);display:grid;grid-template-columns:repeat(6,1fr);background:rgba(255,255,255,0.02)}
.sp-vol{display:flex;align-items:center;gap:6px;margin-left:8px}
.sp-vol svg{flex-shrink:0;color:var(--text3)}
.sp-vol input[type=range]{-webkit-appearance:none;width:70px;height:3px;border-radius:2px;background:rgba(255,255,255,0.15);outline:none;cursor:pointer}
.sp-vol input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:var(--green);cursor:pointer}
.cal-day{padding:10px 12px;border-right:1px solid var(--border);overflow:hidden;display:flex;flex-direction:column;gap:3px}
.cal-day:last-child{border-right:none}
.cal-day.today{background:rgba(200,170,110,0.03)}
.cdh{display:flex;align-items:baseline;gap:6px;margin-bottom:5px;padding-bottom:6px;border-bottom:1px solid var(--border);flex-shrink:0}
.cdn{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text2)}
.cdn.today{color:var(--gold)}
.cdd{font-size:10px;color:var(--text3)}
.allday{display:flex;align-items:center;gap:5px;background:var(--glass);border-radius:5px;padding:3px 7px;font-size:11px;color:var(--text2)}
.alldot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
.ev{display:flex;gap:6px;align-items:flex-start;padding:3px 5px;border-radius:5px;border-left:2px solid transparent;min-width:0}
.ev.me{border-left-color:var(--green)}
.ev.she{border-left-color:var(--gold)}
.ev.fam{border-left-color:var(--flamingo)}
.ev.greta{border-left-color:var(--flamingo)}
.ev.luisa{border-left-color:var(--flamingo)}
.ev.work{border-left-color:var(--yellow)}
.et{font-size:11px;color:var(--text3);font-variant-numeric:tabular-nums;white-space:nowrap;flex-shrink:0;padding-top:1px}
.eti{font-size:12px;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ewho{font-size:10px;color:var(--text3)}
.empty{font-size:11px;color:var(--text3);padding:3px 5px;font-style:italic}
@keyframes fi{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
.floor.active .card{animation:fi .22s ease both}
.sp-card{display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--glass);border:1px solid var(--border);border-radius:12px;margin:0 0 4px;flex-shrink:0}
.sp-cover{width:48px;height:48px;border-radius:6px;object-fit:cover;flex-shrink:0;background:var(--glass-h)}
.sp-cover.hidden{display:none}
.sp-info{flex:1;min-width:0}
.sp-title{font-size:13px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sp-artist{font-size:11px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}
.sp-controls{display:flex;align-items:center;gap:6px;flex-shrink:0}
.sp-btn{background:none;border:none;color:var(--text2);cursor:pointer;padding:6px;border-radius:50%;transition:color .15s;line-height:1;display:flex;align-items:center;justify-content:center;font-family:inherit}
.sp-btn:hover{color:var(--text)}
.sp-btn.sp-play{color:var(--green);width:36px;height:36px;border:1px solid rgba(110,200,124,0.3);border-radius:50%}
.sp-btn.sp-play:hover{background:rgba(110,200,124,0.1)}

/* ── Mobile ── */
@media(max-width:600px){
  html,body{overflow:auto}
  .shell{height:auto;min-height:100dvh}
  .topbar{height:auto;flex-wrap:wrap;gap:8px;padding:10px 14px}
  .topbar-left{width:100%;justify-content:space-between}
  .topbar-center{position:static;transform:none;order:3;width:100%;display:flex;align-items:center;gap:8px}
  .clock{font-size:18px}
  .clock-date{font-size:10px;margin-top:0}
  .topbar-right{width:100%;order:2;justify-content:space-between}
  .tabs{flex:1}
  .tab{padding:5px 10px;font-size:11px}
  .av{width:26px;height:26px;font-size:9px}
  .gn-btn{padding:4px 10px;font-size:11px}
  .rooms{overflow:auto;flex:none;padding:10px 10px 8px}
  .floor.active{flex:none}
  .row{flex:none}
  .r4,.r3{grid-template-columns:1fr}
  .r2{grid-template-columns:1fr}
  .card{padding:12px}
  .sp-card{margin:0 10px 4px;border-radius:10px}
  .sp-vol{display:none}
  .cal-strip{grid-template-columns:repeat(3,1fr);height:auto;min-height:140px}
  .cal-day:nth-child(n+4){display:none}
}
@media(min-width:601px) and (max-width:900px){
  .r4,.r3{grid-template-columns:repeat(2,1fr)}
  .cal-strip{grid-template-columns:repeat(4,1fr)}
  .cal-day:nth-child(n+5){display:none}
  .topbar{padding:0 14px}
  .tabs .tab{padding:5px 10px;font-size:12px}
}
</style>
</head>
<body>
<div class="shell">

<header class="topbar">
  <div class="topbar-left">
    <div class="logo">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span class="logo-label">Zuhause</span>
    </div>
    <div class="tabs">
      <button class="tab active" onclick="sw('eg',this)">Erdgeschoss</button>
      <button class="tab" onclick="sw('og',this)">Obergeschoss</button>
      <button class="tab" onclick="sw('draussen',this)">Draußen</button>
    </div>
  </div>
  <div class="topbar-center">
    <div class="clock" id="ck">--:--</div>
    <div class="clock-date" id="dt"></div>
  </div>
  <div class="topbar-right">
    <div class="weather">
      <span style="font-size:20px" id="wx-icon">⛅</span>
      <div><div class="wx-temp" id="wx-temp">–°</div><div class="wx-sub" id="wx-sub">Berlin</div></div>
    </div>
    <div class="presence">
      <div class="av" data-user="M">M</div>
      <div class="av" data-user="U">U</div>
      <div class="av" data-user="G">G</div>
      <div class="av" data-user="Lu">Lu</div>
      <div class="av" data-user="Ka">Ka</div>
    </div>
    <button class="gn-btn" onclick="guteNacht(this)">🌙 Gute Nacht</button>
  </div>
</header>

<div class="rooms">

  <!-- ERDGESCHOSS -->
  <div class="floor eg active" id="eg">
    <div class="row r3">

      <!-- Wohnbereich -->
      <div class="card" id="cw">
        <div class="ch"><span class="rn">Wohnbereich</span><span class="ri">🛋</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-8132-b2c0-cb2b07d88e10','Wohnbereich')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="8021e61e-eca1-4b26-9ab9-fa78af68a5a4" onclick="tg(this)">Couchtisch</button>
          <button class="lbtn" data-id="b36b3fd6-dc10-4bcc-a9ba-60717678f2ae" onclick="tg(this)">Stehlampe</button>
          <button class="lbtn" data-id="b9f01958-3445-45c5-83c6-5f1c5ad11495" onclick="tg(this)">Gelbe Lampe</button>
          <button class="lbtn" data-id="72cb3619-4723-4211-8333-933551365fec" onclick="tg(this)">Stehlampe II</button>
          <button class="lbtn" data-id="2934e122-b8fa-43ac-ad09-383bc481890a" onclick="tg(this)">Lichtervorhang</button>
          <button class="lbtn" data-id="d558070a-4cc9-4605-9682-86b23cecd7a1" onclick="tg(this)">Bücherregal</button>
        </div>
        <div class="srows">
          <div class="srow"><span class="sn">Terrassentür</span><span class="sv" id="s-tw">–</span></div>
        </div>
        <div class="scenes"><button class="scene">Abend</button><button class="scene">Film</button><button class="scene" onclick="wohnAus(this)">Alles aus</button></div>
      </div>

      <!-- Essbereich -->
      <div class="card" id="ce">
        <div class="ch"><span class="rn">Essbereich</span><span class="ri">🍽</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-817c-8afe-c076dadf5b05','Essbereich')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="a2f1d1a3-8858-4238-a174-df27330086cb" onclick="tg(this)" style="grid-column:span 2">Esstisch</button>
        </div>
        <div class="srows">
          <div class="srow"><span class="sn">Terrassentür</span><span class="sv" id="s-te">–</span></div>
        </div>
      </div>

      <!-- Küche -->
      <div class="card" id="ck2">
        <div class="ch"><span class="rn">Küche</span><span class="ri">🍳</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-8179-b1c2-ee6b2c40d378','Küche')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="6b5f55ed-1b59-44fe-8d74-25590b0c0f76" onclick="tg(this)" style="grid-column:span 2">Kücheninsel</button>
          <button class="lbtn" data-id="ef09fa0e-5115-437d-acbf-3e4a70dda13b" onclick="tg(this)" style="grid-column:span 2">Küchenzeile</button>
        </div>
      </div>

    </div>
    <div class="row r3">

      <!-- Eingang -->
      <div class="card" id="cin">
        <div class="ch"><span class="rn">Eingang</span><span class="ri">🚪</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-8180-9fdf-eb8d893f926f','Eingang')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="0c53eeb2-f0ca-4024-9081-d3e7905cf7d4" onclick="tg(this)">Flurlicht</button>
          <button class="lbtn" data-id="d0410ad3-c5ac-48b4-a21a-21d6cb633164" onclick="tg(this)">Treppenlicht</button>
        </div>
        <div class="srows">
          <div class="srow"><span class="sn">Wohnungstür</span><span class="sv" id="s-door">–</span></div>
        </div>
        <div class="badge" id="dryer-badge" style="display:none"><div class="badge-dot"></div><span id="dryer-txt">Trockner</span></div>
      </div>

      <!-- Arbeitszimmer -->
      <div class="card" id="ca">
        <div class="ch"><span class="rn">Arbeitszimmer</span><span class="ri">💻</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-81d5-8724-cc4aa403c9fe','Arbeitszimmer')">📋</button></div>
        <div class="lights">
          <span style="font-size:11px;color:var(--text3);padding:4px 2px">Licht folgt</span>
        </div>
      </div>

      <!-- Gästebad -->
      <div class="card" id="cgb">
        <div class="ch"><span class="rn">Gästebad</span><span class="ri">🚿</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-819e-bda5-dc811aa5ada1','Gästebad')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="45c38dae-9a78-4d67-9b0c-d030669c71c3" onclick="tg(this)" style="grid-column:span 2">Licht</button>
        </div>
      </div>

    </div>

  </div>

  <!-- OBERGESCHOSS -->
  <div class="floor og" id="og">
    <div class="row r3">

      <!-- Schlafzimmer -->
      <div class="card" id="cs">
        <div class="ch"><span class="rn">Schlafzimmer</span><span class="ri">🛏</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-8198-9d3a-e63989b37dec','Schlafzimmer')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="37eb07fc-94c4-4aec-afdb-dcbf8b6f0b40" onclick="tg(this)">Deckenlampe</button>
          <button class="lbtn" data-id="defdbb79-3450-4b02-996a-2543e3e733c7" onclick="tg(this)">Kommode</button>
          <button class="lbtn" data-id="a7336819-f510-447a-a218-b820b3bd7749" onclick="tg(this)" style="grid-column:span 2">Schlaftrigger</button>
        </div>
        <div class="tr" id="temp-schlaf"><span class="tv">–</span><span class="tu">°C</span></div>
      </div>

      <!-- Masterbad -->
      <div class="card" id="cmb">
        <div class="ch"><span class="rn">Masterbad</span><span class="ri">🚿</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-81f0-a816-fee7b2578edf','Masterbad')">📋</button></div>
        <div class="tr" id="temp-mbad"><span class="tv">–</span><span class="tu">°C</span></div>
      </div>

      <!-- Mädchenbad / Gästebad -->
      <div class="card" id="cmad">
        <div class="ch"><span class="rn">Mädchenbad</span><span class="ri">🪥</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-81b2-a916-dda4bd19df23','Mädchenbad')">📋</button></div>
        <div class="lights">
          <span style="font-size:11px;color:var(--text3);padding:4px 2px">Licht folgt</span>
        </div>
      </div>

    </div>
    <div class="row r2">

      <!-- Greta -->
      <div class="card" id="cgr">
        <div class="ch"><span class="rn">Greta</span><span class="ri">⭐</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-81ff-89f3-e1f37528c8f1','Greta')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="01b69433-e50b-42af-ab2e-eb76835ca8d8" onclick="tg(this)" style="grid-column:span 2">Deckenlampe</button>
        </div>
        <div class="tr" id="temp-greta"><span class="tv">–</span><span class="tu">°C</span></div>
      </div>

      <!-- Luisa -->
      <div class="card" id="clu">
        <div class="ch"><span class="rn">Luisa</span><span class="ri">🌙</span><button class="cl-btn" onclick="openChecklist('30dbea2a-e889-8179-a879-ccf0ad972ea6','Luisa')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="65dc60fd-38f5-4192-b2e6-12c53766f8d2" onclick="tg(this)">Deckenlampe</button>
          <button class="lbtn" data-id="09cb811b-b82a-4400-bd42-95dce7f68350" onclick="tg(this)">Lichterkette</button>
        </div>
        <div class="tr" id="temp-luisa"><span class="tv">–</span><span class="tu">°C</span></div>
      </div>

    </div>
  </div>

  <!-- DRAUSSEN -->
  <div class="floor draussen" id="draussen">
    <div class="row r2">

      <!-- Terrasse -->
      <div class="card" id="cte">
        <div class="ch"><span class="rn">Terrasse</span><span class="ri">🌿</span><button class="cl-btn" onclick="openChecklist('31ebea2a-e889-815d-b52b-d39fd0338ebd','Garten')">📋</button></div>
        <div class="lights">
          <button class="lbtn" data-id="3834d244-c823-4377-882a-ee138ea6d75d" onclick="tg(this)" style="grid-column:span 2">🔌 Steckdose</button>
        </div>
        <div class="srows">
          <div class="srow"><span class="sn">Terrassentür (Wohn)</span><span class="sv" id="s-tw2">–</span></div>
          <div class="srow"><span class="sn">Terrassentür (Ess)</span><span class="sv" id="s-te2">–</span></div>
        </div>
      </div>

      <!-- Pflanzen -->
      <div class="card" id="cpf">
        <div class="ch"><span class="rn">Pflanzen</span><span class="ri">🌱</span></div>
        <div class="plant-grid">
          <div class="plant-item">
            <div class="plant-name">Monstera</div>
            <div class="plant-bar-wrap"><div class="plant-bar" id="pb-mon" style="width:0%;background:var(--green)"></div></div>
            <div class="plant-meta"><span id="pv-mon" style="color:var(--text2)">–%</span><span id="ps-mon" style="color:var(--text3)">–</span></div>
          </div>
          <div class="plant-item">
            <div class="plant-name">Philodendron</div>
            <div class="plant-bar-wrap"><div class="plant-bar" id="pb-phi" style="width:0%;background:#f97316"></div></div>
            <div class="plant-meta"><span id="pv-phi" style="color:#f97316">–%</span><span id="ps-phi" style="color:#f97316">–</span></div>
          </div>
        </div>
        <button class="water-btn" disabled>💧 Gardena – demnächst</button>
      </div>

    </div>
  </div>

</div>

<!-- SPOTIFY -->
<div class="sp-card">
  <img class="sp-cover hidden" id="sp-cover" src="" alt="">
  <div class="sp-info">
    <div class="sp-title" id="sp-title">Spotify</div>
    <div class="sp-artist" id="sp-artist">Lädt…</div>
  </div>
  <div class="sp-controls">
    <button class="sp-btn" onclick="spCtrl('previous')" title="Zurück">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
    </button>
    <button class="sp-btn sp-play" id="sp-play" onclick="spToggle()" title="Play/Pause">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" id="sp-play-icon"><path d="M8 5v14l11-7z"/></svg>
    </button>
    <button class="sp-btn" onclick="spCtrl('next')" title="Weiter">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>
    </button>
  </div>
  <div class="sp-vol">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
    <input type="range" id="sp-vol" min="0" max="100" value="50" oninput="spVolume(this.value)">
  </div>
</div>

<!-- KALENDER -->
<div class="cal-strip" id="cal-strip">
  <div class="cal-day"><div class="cdh"><span class="cdn">–</span></div><div class="empty">Lädt…</div></div>
  <div class="cal-day"><div class="cdh"><span class="cdn">–</span></div><div class="empty">Lädt…</div></div>
  <div class="cal-day"><div class="cdh"><span class="cdn">–</span></div><div class="empty">Lädt…</div></div>
  <div class="cal-day"><div class="cdh"><span class="cdn">–</span></div><div class="empty">Lädt…</div></div>
  <div class="cal-day"><div class="cdh"><span class="cdn">–</span></div><div class="empty">Lädt…</div></div>
  <div class="cal-day"><div class="cdh"><span class="cdn">–</span></div><div class="empty">Lädt…</div></div>
</div>


</div>
<script>
// Clock
function uc(){var n=new Date(),h=String(n.getHours()).padStart(2,'0'),m=String(n.getMinutes()).padStart(2,'0');document.getElementById('ck').textContent=h+':'+m;var D=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],M=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];document.getElementById('dt').textContent=D[n.getDay()]+', '+n.getDate()+'. '+M[n.getMonth()]+' '+n.getFullYear()}
uc();setInterval(uc,10000);

// Floor switch
function sw(f,b){document.querySelectorAll('.floor').forEach(function(x){x.classList.remove('active')});document.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active')});document.getElementById(f).classList.add('active');b.classList.add('active')}

// Card lit state
function cardLit(card){if(!card)return;card.classList.toggle('lit',card.querySelectorAll('.lbtn.on').length>0)}

// Wohnbereich – alle Lichter aus
var WOHN_IDS=['8021e61e-eca1-4b26-9ab9-fa78af68a5a4','b36b3fd6-dc10-4bcc-a9ba-60717678f2ae','b9f01958-3445-45c5-83c6-5f1c5ad11495','72cb3619-4723-4211-8333-933551365fec','2934e122-b8fa-43ac-ad09-383bc481890a','d558070a-4cc9-4605-9682-86b23cecd7a1'];
async function wohnAus(btn){
  btn.closest('.scenes').querySelectorAll('.scene').forEach(function(x){x.classList.remove('active')});
  btn.classList.add('active');
  var card=document.getElementById('cw');
  card.querySelectorAll('.lbtn').forEach(function(el){el.classList.remove('on')});
  cardLit(card);
  await Promise.all(WOHN_IDS.map(function(id){
    return fetch('/webhook/home-toggle',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceId:id,capability:'onoff',value:false})});
  }));
  setTimeout(function(){btn.classList.remove('active')},1500);
}

// Toggle device
async function tg(el){
  var id=el.dataset.id;
  var isOn=el.classList.contains('on');
  var newVal=!isOn;
  el.classList.toggle('on',newVal);
  el.disabled=true;
  cardLit(el.closest('.card'));
  try{
    var res=await fetch('/webhook/home-toggle',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceId:id,capability:'onoff',value:newVal})});
    if(!res.ok)throw new Error('fail');
  }catch(e){
    el.classList.toggle('on',isOn);
    cardLit(el.closest('.card'));
  }finally{
    el.disabled=false;
  }
}

// Load state
async function loadState(){
  try{
    var res=await fetch('/webhook/home-state');
    var S=await res.json();

    // Buttons
    document.querySelectorAll('[data-id]').forEach(function(el){
      var d=S[el.dataset.id];
      if(!d)return;
      var val=d.capabilities&&d.capabilities.onoff;
      if(typeof val==='boolean'){el.classList.toggle('on',val);cardLit(el.closest('.card'));}
    });

    // Terrassentür Wohnbereich
    setSensor('s-tw',S['27df0dca-563f-47ec-bbab-b0397fc5a914']);
    setSensor('s-tw2',S['27df0dca-563f-47ec-bbab-b0397fc5a914']);
    // Terrassentür Essbereich
    setSensor('s-te',S['d5cf854e-1f53-436b-a8e7-46b0be155b33']);
    setSensor('s-te2',S['d5cf854e-1f53-436b-a8e7-46b0be155b33']);
    // Wohnungstür
    setSensor('s-door',S['0d15f47d-3820-4425-a978-618bf325c1a1']);

    // Plants
    setPlant('pb-mon','pv-mon','ps-mon',S['1c28f35e-8c29-45ad-a388-ae5d35b1fd59']);
    setPlant('pb-phi','pv-phi','ps-phi',S['95863daf-b6a0-4351-a09a-80d87144ee43']);

    // Temps
    setTemp('temp-schlaf',S['51620a55-331f-4333-9edb-889c642f1940']);
    setTemp('temp-mbad',S['aec7d013-75d0-4ff4-9151-43f054751f78']);
    setTemp('temp-greta',S['8e622360-9e44-4b91-87bc-cd4b62a9652f']);
    setTemp('temp-luisa',S['ccfd8c66-7622-4be7-bf12-9397adddc209']);

    // Dryer
    setDryer(S['b4356bdf-d77b-4720-9a9b-5078aca1ef72']);

  }catch(e){console.error('loadState:',e);}
}

function setSensor(id,device){
  var el=document.getElementById(id);
  if(!el)return;
  var c=device&&device.capabilities&&device.capabilities.alarm_contact;
  if(c===null||c===undefined){el.textContent='–';el.className='sv';return;}
  if(c){el.textContent='offen';el.className='sv open';}
  else{el.textContent='geschlossen';el.className='sv closed';}
}

function setPlant(barId,valId,statId,device){
  if(!device)return;
  var m=device.capabilities&&device.capabilities.measure_moisture;
  if(m===null||m===undefined)return;
  var pct=Math.round(m);
  var color=pct<20?'#f97316':pct<40?'#fbbf24':pct<70?'var(--green)':'#60a5fa';
  var status=pct<20?'trocken!':pct<40?'niedrig':pct<70?'ok':'feucht';
  var bar=document.getElementById(barId);
  var val=document.getElementById(valId);
  var stat=document.getElementById(statId);
  if(bar){bar.style.width=pct+'%';bar.style.background=color;}
  if(val){val.textContent=pct+'%';val.style.color=color;}
  if(stat){stat.textContent=status;stat.style.color=color;}
}

function setTemp(id,device){
  var el=document.getElementById(id);
  if(!el||!device)return;
  var caps=device.capabilities;
  var temp=caps&&caps.measure_temperature;
  if(temp===null||temp===undefined)return;
  var hum=caps.measure_humidity;
  el.innerHTML='<span class="tv">'+temp.toFixed(1)+'</span><span class="tu">°C</span>'+(hum!=null?'<span class="tl">'+Math.round(hum)+'% Feuchte</span>':'');
}

function setDryer(device){
  var badge=document.getElementById('dryer-badge');
  var txt=document.getElementById('dryer-txt');
  if(!badge||!device)return;
  var caps=device.capabilities;
  var contact=caps&&caps.alarm_contact;
  var remaining=caps&&caps['bshc_string.remaining_time'];
  if(contact){
    badge.style.display='inline-flex';
    badge.style.borderColor='var(--green-b)';
    badge.style.color='var(--green)';
    txt.textContent='Trockner fertig';
  }else if(remaining&&remaining!=='0:00'&&remaining!=='00:00'&&remaining!==''){
    badge.style.display='inline-flex';
    badge.style.borderColor='rgba(251,191,36,0.4)';
    badge.style.color='#fbbf24';
    txt.textContent='Trockner: '+remaining;
  }else{
    badge.style.display='none';
  }
}

// Floor via URL param (?floor=og)
var urlFloor=new URLSearchParams(location.search).get('floor');
if(urlFloor&&urlFloor!=='eg'){document.querySelectorAll('.tab').forEach(function(t){if(t.getAttribute('onclick')&&t.getAttribute('onclick').indexOf(urlFloor)>=0){sw(urlFloor,t);}});}

// Calendar
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function calDotColor(c){return{me:'var(--green)',fam:'var(--flamingo)',she:'var(--gold)',greta:'var(--flamingo)',luisa:'var(--flamingo)',work:'var(--yellow)',holiday:'rgba(200,170,110,0.45)'}[c]||'var(--text3)';}
function renderCalendar(days){
  var strip=document.getElementById('cal-strip');
  if(!strip||!days)return;
  strip.innerHTML='';
  days.forEach(function(day){
    var col=document.createElement('div');
    col.className='cal-day'+(day.isToday?' today':'');
    var h='<div class="cdh"><span class="cdn'+(day.isToday?' today':'')+'">'+(day.isToday?'Heute':day.dayShort)+'</span><span class="cdd">'+day.dayNum+'</span></div>';
    day.allDay.forEach(function(e){
      h+='<div class="allday"><div class="alldot" style="background:'+calDotColor(e.color)+'"></div>'+esc(e.title)+'</div>';
    });
    day.events.forEach(function(e){
      h+='<div class="ev '+e.color+'"><span class="et">'+e.time+'</span><div><div class="eti">'+esc(e.title)+'</div></div></div>';
    });
    if(!day.allDay.length&&!day.events.length)h+='<div class="empty">frei</div>';
    col.innerHTML=h;
    strip.appendChild(col);
  });
}
async function loadCalendar(){
  try{
    var res=await fetch('/webhook/home-calendar');
    if(!res.ok)throw new Error('HTTP '+res.status);
    var data=await res.json();
    if(data&&data.days&&data.days.length){
      renderCalendar(data.days);
    }else{
      showCalendarEmpty();
    }
  }catch(e){
    console.error('loadCalendar:',e);
    showCalendarError();
  }
}
function showCalendarEmpty(){
  var strip=document.getElementById('cal-strip');
  if(!strip)return;
  strip.innerHTML='<div class="cal-day" style="grid-column:1/-1;display:flex;align-items:center;justify-content:center"><div class="empty">Keine Termine</div></div>';
}
function showCalendarError(){
  var strip=document.getElementById('cal-strip');
  if(!strip)return;
  strip.innerHTML='<div class="cal-day" style="grid-column:1/-1;display:flex;align-items:center;justify-content:center"><div class="empty">Kalender nicht erreichbar</div></div>';
}

loadState();
setInterval(loadState,30000);
loadCalendar();
setInterval(loadCalendar,300000);

// Scene buttons
document.querySelectorAll('.scene').forEach(function(b){b.addEventListener('click',function(){this.closest('.scenes').querySelectorAll('.scene').forEach(function(x){x.classList.remove('active')});this.classList.add('active')})});

// Spotify
var spPlaying=false;
function loadSpotify(){
  fetch('/webhook/spotify-state').then(function(r){return r.json();}).then(function(d){
    spPlaying=!!d.playing;
    var cover=document.getElementById('sp-cover');
    var title=document.getElementById('sp-title');
    var artist=document.getElementById('sp-artist');
    var icon=document.getElementById('sp-play-icon');
    if(!d.playing||!d.title){
      title.textContent='Nichts läuft';artist.textContent='';
      cover.classList.add('hidden');
      icon.innerHTML='<path d="M8 5v14l11-7z"/>';
      return;
    }
    title.textContent=d.title;artist.textContent=d.artist;
    if(d.cover){cover.src=d.cover;cover.classList.remove('hidden');}
    icon.innerHTML=d.playing?'<path d="M6 19h4V5H6zm8-14v14h4V5z"/>':'<path d="M8 5v14l11-7z"/>';
    if(d.volume!==null&&d.volume!==undefined){var vol=document.getElementById('sp-vol');if(vol)vol.value=d.volume;}
  }).catch(function(){});
}
function spCtrl(action,value){
  var body={action:action};
  if(value!==undefined)body.value=value;
  fetch('/webhook/spotify-control',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    .then(function(){setTimeout(loadSpotify,800);});
}
function spToggle(){spCtrl(spPlaying?'pause':'play');}
var spVolTimer=null;
function spVolume(v){
  clearTimeout(spVolTimer);
  spVolTimer=setTimeout(function(){spCtrl('volume',parseInt(v));},300);
}
loadSpotify();
setInterval(loadSpotify,15000);

// Presence
async function loadPresence(){
  try{
    var res=await fetch('/webhook/home-presence');
    var data=await res.json();
    var users=data.users||{};
    document.querySelectorAll('.av[data-user]').forEach(function(el){
      var u=users[el.dataset.user];
      el.classList.remove('home','asleep');
      if(!u)return;
      if(u.asleep)el.classList.add('asleep');
      else if(u.present)el.classList.add('home');
    });
  }catch(e){}
}
loadPresence();
setInterval(loadPresence,60000);

// Weather (Open-Meteo, Berlin)
function wxDesc(code){
  if(code===0)return['☀️','klar'];
  if(code<=2)return['🌤️','leicht bewölkt'];
  if(code===3)return['☁️','bedeckt'];
  if(code<=48)return['🌫️','neblig'];
  if(code<=55)return['🌦️','Nieselregen'];
  if(code<=65)return['🌧️','Regen'];
  if(code<=75)return['❄️','Schnee'];
  if(code<=82)return['🌦️','Schauer'];
  if(code<=99)return['⛈️','Gewitter'];
  return['🌡️',''];
}
async function loadWeather(){
  try{
    var res=await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&current=temperature_2m,weathercode&timezone=Europe%2FBerlin');
    var d=await res.json();
    var c=d.current;
    var wx=wxDesc(c.weathercode);
    document.getElementById('wx-icon').textContent=wx[0];
    document.getElementById('wx-temp').textContent=Math.round(c.temperature_2m)+'°';
    document.getElementById('wx-sub').textContent='Berlin \u00b7 '+wx[1];
  }catch(e){}
}
loadWeather();
setInterval(loadWeather,600000);

// Gute Nacht
async function guteNacht(btn){
  btn.textContent='⏳';
  btn.disabled=true;
  try{
    await fetch('/webhook/gute-nacht',{method:'POST'});
    btn.textContent='✓ Gute Nacht';
    // Update all light buttons to off
    document.querySelectorAll('.lbtn.on').forEach(function(el){
      el.classList.remove('on');
      cardLit(el.closest('.card'));
    });
    setTimeout(function(){btn.textContent='🌙 Gute Nacht';btn.disabled=false;},3000);
  }catch(e){
    btn.textContent='🌙 Gute Nacht';
    btn.disabled=false;
  }
}

</script>
<!-- Checkliste Modal -->
<div class="cl-overlay" id="cl-overlay" onclick="closeChecklist(event)">
  <div class="cl-sheet" id="cl-sheet">
    <div class="cl-header">
      <span class="cl-title" id="cl-title">Checkliste</span>
      <button class="cl-close" onclick="closeChecklist()">✕</button>
    </div>
    <div class="cl-body" id="cl-body">
      <div class="cl-loading">Lädt…</div>
    </div>
  </div>
</div>

<script>
var CL_VERBS = ['installieren','beschaffen','planen','anbringen','einrichten','integrieren','festlegen','auswählen','kaufen','montieren','aufstellen','anlegen','testen','prüfen','aufbauen','einbauen'];
var CL_PREPS = ['in','im','mit','für','zu','am','an','bei'];

async function openChecklist(roomId, roomName) {
  var clBody = document.getElementById('cl-body');
  document.getElementById('cl-title').textContent = roomName;
  clBody.innerHTML = '<div class="cl-loading">Lädt…</div>';
  document.getElementById('cl-overlay').classList.add('open');
  try {
    var resp = await fetch('/webhook/room-checklist?roomId=' + encodeURIComponent(roomId));
    var data = await resp.json();
    renderChecklist(clBody, data);
  } catch(e) {
    clBody.innerHTML = '<div class="cl-empty">Fehler beim Laden.</div>';
  }
}

function closeChecklist(e) {
  if (e && e.target !== document.getElementById('cl-overlay')) return;
  document.getElementById('cl-overlay').classList.remove('open');
}

function stripPrefix(name) {
  var i = name.indexOf(':');
  return i >= 0 ? name.substring(i + 1).trim() : name.trim();
}

function getGroupKey(name) {
  var clean = stripPrefix(name);
  // Strip trailing "(optional)" etc.
  var parenIdx = clean.lastIndexOf('(');
  if (parenIdx > 0 && clean.trim().endsWith(')')) {
    clean = clean.substring(0, parenIdx).trim();
  }
  // Split at " – " (em-dash with spaces)
  var dashIdx = clean.indexOf(' \u2013 ');
  var first = dashIdx >= 0 ? clean.substring(0, dashIdx).trim() : clean;
  // Strip trailing German verb (simple list)
  var words = first.split(' ');
  if (words.length > 1) {
    var lastW = words[words.length - 1].toLowerCase().replace(/[()]/g,'');
    var isVerb = CL_VERBS.indexOf(lastW) >= 0 || lastW.endsWith('ieren') || (lastW.length > 3 && lastW.endsWith('en') && 'bcdfghjklmnpqrstvwxyz'.indexOf(lastW[lastW.length-3]) >= 0);
    if (isVerb) words.pop();
  }
  var noVerb = words.join(' ').trim();
  // Strip trailing preposition phrase "in Xxx", "im Yyy"
  var nvWords = noVerb.split(' ');
  for (var pi = 0; pi < nvWords.length - 1; pi++) {
    if (CL_PREPS.indexOf(nvWords[pi].toLowerCase()) >= 0) {
      noVerb = nvWords.slice(0, pi).join(' ').trim();
      break;
    }
  }
  return noVerb || first || clean;
}

function renderTaskItem(t, shortName) {
  var checked = t.done ? 'checked' : '';
  var labelClass = t.done ? 'done' : '';
  var h = '<div class="cl-item">';
  h += '<input type="checkbox" class="cl-check" data-id="' + escAttr(t.id) + '" data-type="task" ' + checked + ' onchange="toggleItem(this)">';
  h += '<div class="cl-label ' + labelClass + '">' + escHtml(shortName) + '</div>';
  h += '</div>';
  return h;
}

function renderChecklist(clBody, data) {
  var tasks   = Array.isArray(data && data.tasks)   ? data.tasks   : [];
  var devices = Array.isArray(data && data.devices) ? data.devices : [];
  var html = '';

  // --- Aufgaben ---
  html += '<div class="cl-section">';
  var openCount = tasks.filter(function(t){ return !t.done; }).length;
  html += '<div class="cl-section-title">Aufgaben (' + openCount + ' offen)</div>';

  if (tasks.length === 0) {
    html += '<div class="cl-empty">Keine Aufgaben</div>';
  } else {
    // Group by extracted key
    var groups = {};
    var groupOrder = [];
    tasks.forEach(function(t) {
      var key = getGroupKey(t.name);
      if (!groups[key]) { groups[key] = []; groupOrder.push(key); }
      groups[key].push(t);
    });

    var multiKeys = groupOrder.filter(function(k){ return groups[k].length > 1; });
    var singleKeys = groupOrder.filter(function(k){ return groups[k].length === 1; });

    // Grouped tasks first (with header)
    multiKeys.forEach(function(key) {
      html += '<div class="cl-group">';
      html += '<div class="cl-group-title">' + escHtml(key) + '</div>';
      groups[key].forEach(function(t) {
        var stripped = stripPrefix(t.name);
        var short = stripped;
        var keyLower = key.toLowerCase();
        if (keyLower && stripped.toLowerCase().indexOf(keyLower) === 0) {
          var rest = stripped.substring(key.length).replace(/^[-– ]+/, '').trim();
          if (rest) short = rest;
        }
        html += renderTaskItem(t, short);
      });
      html += '</div>';
    });

    // Singles: show full name without room prefix
    singleKeys.forEach(function(key) {
      html += renderTaskItem(groups[key][0], stripPrefix(groups[key][0].name));
    });
  }
  html += '</div>';

  // --- Einkaufsliste ---
  html += '<div class="cl-section">';
  html += '<div class="cl-section-title">Einkaufsliste (' + devices.length + ' ausstehend)</div>';
  if (devices.length === 0) {
    html += '<div class="cl-empty">Alles vorhanden</div>';
  } else {
    devices.forEach(function(d) {
      var short = stripPrefix(d.name);
      var meta = [d.typ, d.hersteller].filter(Boolean).join(' \u00b7 ');
      html += '<div class="cl-item">';
      html += '<input type="checkbox" class="cl-check" data-id="' + escAttr(d.id) + '" data-type="device" onchange="toggleItem(this)">';
      html += '<div class="cl-label">' + escHtml(short) + (meta ? '<div class="cl-meta">' + escHtml(meta) + '</div>' : '') + '</div>';
      html += '</div>';
    });
  }
  html += '</div>';

  clBody.innerHTML = html;
}

async function toggleItem(el) {
  var pageId = el.dataset.id;
  var type = el.dataset.type;
  var done = el.checked;
  // Optimistisch: Label strikethrough
  var label = el.nextElementSibling;
  if (type === 'task') {
    if (done) label.classList.add('done'); else label.classList.remove('done');
  }
  try {
    var res = await fetch('/webhook/room-check', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({pageId: pageId, type: type, done: done})
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    if (type === 'device' && done) {
      // Gerät nach kurzer Zeit aus der Liste entfernen
      setTimeout(function() {
        var item = el.closest('.cl-item');
        if (item) item.style.opacity = '0.3';
      }, 1000);
    }
  } catch(e) {
    el.checked = !done; // Rollback
    if (type === 'task') {
      if (!done) label.classList.add('done'); else label.classList.remove('done');
    }
  }
}

function escHtml(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escAttr(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
</script>
</body>
</html>`;
return [{json:{html}}];
