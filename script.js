'use strict';
const CATS = {Tech:'#2f7f9e', Creative:'#8b5e83', Talks:'#b8892b', Service:'#3e8e6b', Sports:'#5568b8', Culture:'#a5566b'};
const INTENTS = {compete:'Compete', create:'Create', learn:'Learn', unwind:'Unwind'};
const ICONS = {
  brackets:'M38 30 18 50l20 20M62 30l20 20-20 20M54 24 46 76',
  magnifier:'M44 20a24 24 0 1 0 .1 0zM62 62 84 84',
  mic:'M36 28a14 14 0 0 1 28 0v20a14 14 0 0 1-28 0zM26 46q0 28 24 28t24-28M50 74v14M38 88h24',
  camera:'M12 36h20l6-10h24l6 10h20v46H12zM50 46a16 16 0 1 0 .1 0z',
  cross:'M38 14h24v24h24v24H62v24H38V62H14V38h24z',
  palette:'M50 14C24 14 12 34 14 52c2 20 22 34 42 32 10-1 10-10 4-14s-2-12 6-12h12c10 0 12-10 8-18C80 24 66 14 50 14zM34 42h.1M52 30h.1M70 40h.1',
  globe:'M50 14a36 36 0 1 0 .1 0zM50 14c-18 18-18 54 0 72M50 14c18 18 18 54 0 72M14 50h72',
  rook:'M24 86h52V72h-6l-3-36h7V18H61v10h-5V18H44v10h-5V18H26v18h7l-3 36h-6z',
  flame:'M50 10c8 24 28 30 24 56-2 14-14 22-24 22S28 80 26 66c-2-12 8-18 12-30 6 6 8-8 12-26z'
};
const EVENTS = [
  {id:1,name:'Code Catalyst',cat:'Tech',soc:'KSCA',intent:'compete',icon:'brackets',in:6,time:'10:00',venue:'Lab block',seats:60,taken:41,x:145,y:105,desc:'Multi-round coding contest with a final judged by guests.',more:'Solo or pairs. Early rounds screen participants, the finals run on stage. Bring your laptop and charger.'},
  {id:2,name:'Krack the Kase',cat:'Culture',soc:'Kalliope',intent:'compete',icon:'magnifier',in:10,time:'15:00',venue:'Campus-wide',seats:80,taken:52,x:400,y:228,desc:'A murder mystery crossed with a treasure hunt across campus.',more:'Teams of four follow clues through four rounds. Observation and teamwork win it. Winners receive goodies.'},
  {id:3,name:'Koffee with Kalliope',cat:'Talks',soc:'Kalliope',intent:'unwind',icon:'mic',in:4,time:'16:00',venue:'Library hall',seats:120,taken:70,x:175,y:345,desc:'A live podcast with an inspiring guest and time for questions.',more:'One hour, one guest, open questions at the end. Streamed live, but the room has the best atmosphere.'},
  {id:4,name:'Shutter Tales',cat:'Creative',soc:'KSCA',intent:'create',icon:'camera',in:14,time:'07:00',venue:'Central lawn',seats:40,taken:12,x:540,y:120,desc:'Shoot photos on any camera and turn them into a story.',more:'Phones count. Shoot for an hour, then arrange your best frames into a short photo story and present it.'},
  {id:5,name:'First Aid Bootcamp',cat:'Service',soc:'YRC KIIT',intent:'learn',icon:'cross',in:8,time:'11:00',venue:'Campus 15 open auditorium',seats:150,taken:96,x:320,y:82,desc:'Hands-on training in life-saving basics, led by trained volunteers.',more:'CPR practice, bandaging and emergency response. Wear comfortable clothes. Every attendee gets a quick-reference card.'},
  {id:6,name:'Chhavi Art Jam',cat:'Creative',soc:'KSAC',intent:'create',icon:'palette',in:18,time:'13:00',venue:'Central lawn',seats:70,taken:20,x:600,y:92,desc:'An open-air art competition on a theme revealed on the day.',more:'Basic sketching materials are provided. Bring your own colours if you have a favourite medium.'},
  {id:7,name:'Model UN Mini',cat:'Talks',soc:'KIIT MUN',intent:'learn',icon:'globe',in:21,time:'09:30',venue:'Campus 15 open auditorium',seats:90,taken:58,x:360,y:108,desc:'Represent a country, argue your case and learn how diplomacy works.',more:'First-timers welcome. A short briefing covers rules of procedure, then committees begin.'},
  {id:8,name:'Chess Mahakumbh',cat:'Sports',soc:'KIIT Chess',intent:'compete',icon:'rook',in:25,time:'09:00',venue:'Library hall',seats:64,taken:30,x:130,y:318,desc:'A two-day rapid chess tournament open to all levels.',more:'Swiss format with a rapid time control. Boards and clocks are provided. Register early, seats go quickly.'},
  {id:9,name:'Lohri Night',cat:'Culture',soc:'KIIT',intent:'unwind',icon:'flame',in:30,time:'18:30',venue:'Sports ground',seats:200,taken:120,x:610,y:332,desc:'Bonfire, music, a culinary quiz and a lot of dancing.',more:'Opening ceremony at sunset, quiz at 19:00, bonfire and bhangra to close the evening.'}
].map(e => { const d = new Date(); d.setDate(d.getDate() + e.in); const [h,m] = e.time.split(':'); d.setHours(+h,+m,0,0); return {...e, date:d}; })
 .sort((a,b) => a.date - b.date);

const $ = s => document.querySelector(s);
const fmtDate = d => d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
const fmtTime = d => d.toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});
const load = (k,f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const save = (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const pad = n => String(n).padStart(2,'0');
const byId = id => EVENTS.find(e => e.id == id);

/* Generated posters: tonal gradient, fine arcs, line icon */
function art(e) {
  const c = CATS[e.cat], s = e.id * 47; let arcs = '', grid = '';
  for (let i = 1; i <= 6; i++) arcs += `<circle cx="${290+s%50}" cy="${70+s%40}" r="${i*30}" fill="none" stroke="#fff" stroke-opacity="${(.26-i*.035).toFixed(2)}"/>`;
  for (let x = 0; x <= 400; x += 40) grid += `<path d="M${x} 0V225"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="#0b1b2b"/></linearGradient></defs><rect width="400" height="225" fill="url(#g)"/><g stroke="#fff" stroke-opacity=".07">${grid}</g>${arcs}<g transform="translate(236 34) scale(1.5)" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[e.icon]}"/></g><text x="22" y="198" fill="#fff" fill-opacity=".88" font-family="sans-serif" font-size="13" font-weight="600">${e.soc}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
function qr(ref) { // decorative pass code derived from the reference
  let h = 7; for (const ch of ref) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  let r = '';
  for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
    const f = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5);
    h = (h * 1103515245 + 12345) >>> 0;
    if (f || (h >> 16) & 1) r += `<rect x="${x*10}" y="${y*10}" width="10" height="10" fill="#0b1b2b"/>`;
  }
  return `<svg viewBox="0 0 90 90" role="img" aria-label="Pass code ${ref}">${r}</svg>`;
}

/* State */
let regs = load('kx-regs', []), favs = load('kx-fav', []);
let cat = 'All', view = 'grid';
const taken = e => e.taken + regs.filter(r => r.eventId === e.id).length;
const seatsLeft = e => Math.max(0, e.seats - taken(e));
const dot = c => `<i style="background:${c}"></i>`;

/* Hero board + live countdowns */
function left(d) {
  let t = Math.max(0, d - Date.now()) / 1000;
  const D = Math.floor(t/86400); t %= 86400; const H = Math.floor(t/3600); t %= 3600;
  return {D, H, M:Math.floor(t/60), S:Math.floor(t%60)};
}
const upcoming = () => EVENTS.filter(e => e.date > Date.now());
function renderBoard() {
  $('#board').innerHTML = upcoming().slice(0,4).map((e,i) => `<button class="brow" style="--i:${i}" data-open="${e.id}"><b>${e.name}</b><small>${e.soc} · ${fmtDate(e.date)}, ${fmtTime(e.date)}</small><span class="cd" data-cd="${e.date.getTime()}"></span></button>`).join('');
  const soc = new Set(EVENTS.map(e => e.soc)).size, week = EVENTS.filter(e => e.date - Date.now() < 7*864e5 && e.date > Date.now()).length;
  $('#stats').textContent = `${EVENTS.length} events from ${soc} societies, ${week} in the next 7 days.`;
}
function tick() {
  document.querySelectorAll('[data-cd]').forEach(el => { const t = left(new Date(+el.dataset.cd)); el.textContent = `${t.D}d ${pad(t.H)}:${pad(t.M)}:${pad(t.S)}`; });
  document.querySelectorAll('[data-count]').forEach(el => { const c = left(new Date(+el.dataset.count)); el.textContent = c.D ? `In ${c.D} day${c.D>1?'s':''}` : `In ${c.H}h ${c.M}m`; });
}

/* Map pins */
$('#pins').innerHTML = EVENTS.map((e,i) => `<g class="pin" tabindex="0" role="button" data-open="${e.id}" data-name="${e.name}" aria-label="${e.name}, ${e.venue}" transform="translate(${e.x} ${e.y})">${i===0?'<circle class="pulse" r="8"/>':''}<circle class="ring" r="14"/><circle class="dot" r="7"/></g>`).join('');
const tip = $('#tip');
$('#pins').addEventListener('mouseover', ev => {
  const p = ev.target.closest('.pin'); if (!p) return;
  const box = $('.mapbox').getBoundingClientRect(), r = p.getBoundingClientRect();
  tip.textContent = p.dataset.name; tip.hidden = false;
  tip.style.left = (r.left + r.width/2 - box.left) + 'px'; tip.style.top = (r.top + r.height/2 - box.top) + 'px';
});
$('#pins').addEventListener('mouseout', () => tip.hidden = true);

/* Filters + listing */
$('#soc').innerHTML = '<option value="">All societies</option>' + [...new Set(EVENTS.map(e => e.soc))].map(s => `<option>${s}</option>`).join('');
$('#intent').innerHTML = '<option value="">Any intent</option>' + Object.entries(INTENTS).map(([k,v]) => `<option value="${k}">${v}</option>`).join('');
function renderChips() {
  $('#chips').innerHTML = ['All', ...Object.keys(CATS), 'Saved'].map(c => `<button class="chip" aria-pressed="${c===cat}" data-cat="${c}">${CATS[c] ? dot(CATS[c]) : ''}${c==='Saved' ? '♥ Saved' : c}</button>`).join('');
}
function matches() {
  const q = $('#q').value.trim().toLowerCase(), soc = $('#soc').value, it = $('#intent').value;
  return EVENTS.filter(e => (cat==='All' || (cat==='Saved' ? favs.includes(e.id) : e.cat===cat)) && (!soc || e.soc===soc) && (!it || e.intent===it) &&
    `${e.name} ${e.venue} ${e.desc} ${e.cat} ${e.soc}`.toLowerCase().includes(q));
}
function seatBar(e) { const l = seatsLeft(e), p = Math.round(l / e.seats * 100); return `<div class="bar ${p<25?'low':''}" role="img" aria-label="${l} seats left"><i style="width:${p}%"></i></div>`; }
function renderGrid() {
  const list = matches(), g = $('#grid');
  g.className = view === 'grid' ? 'grid' : 'grid list';
  $('#count').textContent = `${list.length} event${list.length===1?'':'s'}`;
  $('#empty').hidden = list.length > 0;
  g.innerHTML = list.map(e => {
    const l = seatsLeft(e), seatTxt = l ? `${l} seats left` : 'Full';
    if (view === 'timeline') return `<article class="ev"><div class="when"><b>${e.date.getDate()}</b><span>${e.date.toLocaleDateString('en-IN',{month:'short'})}</span></div>
      <img src="${art(e)}" alt="" loading="lazy"><div><div class="kicker">${dot(CATS[e.cat])}${e.cat} · ${e.soc}</div><h3>${e.name}</h3><p>${fmtTime(e.date)} · ${e.venue}. ${e.desc}</p></div>
      <div class="ev-side"><span>${seatTxt}</span><button class="btn sm" data-open="${e.id}">View details</button></div></article>`;
    return `<article class="card"><img src="${art(e)}" alt="" loading="lazy">
      <button class="heart" aria-pressed="${favs.includes(e.id)}" aria-label="Save ${e.name}" data-fav="${e.id}">♥</button>
      <div class="card-body"><div class="kicker">${dot(CATS[e.cat])}${e.cat} · ${e.soc}</div><h3>${e.name}</h3>
      <div class="meta">${fmtDate(e.date)}, ${fmtTime(e.date)}<br>${e.venue}</div><p>${e.desc}</p>${seatBar(e)}
      <div class="foot"><span><span class="count" data-count="${e.date.getTime()}"></span><br><span class="meta">${seatTxt}</span></span><button class="btn sm" data-open="${e.id}">View details</button></div></div></article>`;
  }).join('');
  tick();
}

/* Passes */
function renderRegs() {
  $('#regCount').textContent = regs.length; $('#none').hidden = regs.length > 0;
  const box = $('#list'); box.replaceChildren();
  regs.forEach(r => {
    const e = byId(r.eventId), el = document.createElement('article'); el.className = 'pass';
    el.innerHTML = `<div class="stub">${qr(r.ref)}</div><div class="pass-body"><h3></h3><div class="kicker"></div><div class="meta">${fmtDate(e.date)}, ${fmtTime(e.date)} · ${e.venue}</div>
      <div class="foot"><button class="btn sm" data-ics="${r.ref}">Add to calendar</button><button class="linkbtn" data-cancel="${r.ref}">Cancel pass</button></div></div>`;
    el.querySelector('h3').textContent = e.name;
    el.querySelector('.kicker').textContent = `${r.name} · ${r.ref}`;
    box.append(el);
  });
}
function downloadIcs(ref) {
  const r = regs.find(x => x.ref === ref), e = byId(r.eventId), f = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//K Explore//EN','BEGIN:VEVENT',`UID:${ref}@kexplore`,`DTSTAMP:${f(new Date())}`,`DTSTART:${f(e.date)}`,`DTEND:${f(new Date(+e.date + 2*3600e3))}`,`SUMMARY:${e.name}`,`LOCATION:${e.venue}`,`DESCRIPTION:${e.soc} event. Pass ${ref}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], {type:'text/calendar'})); a.download = e.name.replace(/\W+/g,'-') + '.ics'; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* Event dialog + registration */
const dlg = $('#dlg');
function openEvent(id) {
  const e = byId(id), full = seatsLeft(e) === 0;
  dlg.innerHTML = `<button class="close" aria-label="Close" data-close>&times;</button><img class="poster" src="${art(e)}" alt="">
  <div class="d-body"><div class="kicker">${dot(CATS[e.cat])}${e.cat} · ${e.soc}</div><h3 id="dTitle">${e.name}</h3><p>${e.more}</p>
  <div class="facts"><span><b>Date</b><br>${fmtDate(e.date)}</span><span><b>Time</b><br>${fmtTime(e.date)}</span><span><b>Venue</b><br>${e.venue}</span><span><b>Seats left</b><br>${seatsLeft(e)} of ${e.seats}</span></div>
  <form id="form" novalidate>
    <label>Full name<input name="name" autocomplete="name"><span class="err"></span></label>
    <label>Email address<input name="email" type="email" autocomplete="email"><span class="err"></span></label>
    <label>Phone number<input name="phone" type="tel" inputmode="numeric" placeholder="10-digit mobile number" autocomplete="tel"><span class="err"></span></label>
    <label>Event<select name="event">${EVENTS.map(x => `<option value="${x.id}" ${x.id==id?'selected':''}>${x.name}</option>`).join('')}</select><span class="err"></span></label>
    <p class="warn" hidden></p>
    <button class="btn" type="submit" ${full?'disabled':''}>${full ? 'This event is full' : 'Register'}</button>
  </form></div>`;
  dlg.showModal();
  $('#form').addEventListener('submit', submit);
}
const RULES = {
  name:  v => /^[A-Za-z][A-Za-z .'-]{2,}$/.test(v) ? '' : 'Enter your full name (letters only, at least 3 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email, like name@example.com.',
  phone: v => /^[6-9]\d{9}$/.test(v) ? '' : 'Enter a 10-digit mobile number starting with 6, 7, 8 or 9.',
  event: v => v ? '' : 'Choose an event.'
};
function submit(ev) {
  ev.preventDefault();
  const f = ev.target, data = {}; let ok = true;
  for (const k in RULES) {
    const el = f.elements[k]; data[k] = el.value.trim();
    const msg = RULES[k](data[k]);
    el.classList.toggle('bad', !!msg); el.setAttribute('aria-invalid', !!msg);
    el.parentElement.querySelector('.err').textContent = msg;
    if (msg && ok) { el.focus(); ok = false; }
  }
  if (!ok) return;
  const e = byId(data.event), say = (k, m) => { f.elements[k].classList.add('bad'); f.elements[k].parentElement.querySelector('.err').textContent = m; };
  if (seatsLeft(e) === 0) return say('event', 'That event is full. Pick another one.');
  if (regs.some(r => r.email.toLowerCase() === data.email.toLowerCase() && r.eventId === e.id)) return say('email', 'This email already has a pass for this event.');
  // Clash check: another pass within 3 hours of this event
  const clash = regs.map(r => byId(r.eventId)).find(o => o.id !== e.id && Math.abs(o.date - e.date) < 3*3600e3);
  const warn = f.querySelector('.warn');
  if (clash && f.dataset.ack !== String(e.id)) {
    warn.hidden = false; warn.textContent = `This overlaps with ${clash.name} (${fmtTime(clash.date)}). Select Register again to continue anyway.`;
    f.dataset.ack = e.id; return;
  }
  const ref = 'KX-' + Math.random().toString(36).slice(2,7).toUpperCase();
  regs.push({ref, eventId:e.id, name:data.name, email:data.email, phone:data.phone});
  save('kx-regs', regs); renderRegs(); renderGrid(); renderCmd();
  dlg.querySelector('.d-body').innerHTML = `<div class="ok-box"><svg class="tick" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29"/><path d="M19 33l9 9 17-19"/></svg><h3>You&rsquo;re registered</h3>
    <p>Thanks, <b></b>. Your place at <b>${e.name}</b> on ${fmtDate(e.date)} is confirmed.</p><p class="muted">Pass code ${ref}</p>
    <button class="btn" data-ics="${ref}">Add to calendar</button> <button class="btn ghost" data-close>Done</button></div>`;
  dlg.querySelector('.ok-box b').textContent = data.name;
}

/* Command palette (Ctrl/Cmd+K or /) */
const cmd = $('#cmd'); let sel = 0, cres = [];
function renderCmd() {
  const q = $('#cq').value.trim().toLowerCase();
  cres = EVENTS.filter(e => `${e.name} ${e.soc} ${e.venue} ${e.cat}`.toLowerCase().includes(q)).slice(0,7); sel = Math.min(sel, Math.max(0, cres.length-1));
  $('#cres').innerHTML = cres.map((e,i) => `<li role="option" data-id="${e.id}" aria-selected="${i===sel}"><span>${e.name}<br><small>${e.soc} · ${e.venue}</small></span><small>${fmtDate(e.date)}</small></li>`).join('') || '<li><small>No events found</small></li>';
}
function openCmd() { $('#cq').value = ''; sel = 0; renderCmd(); cmd.showModal(); $('#cq').focus(); }
function pick(id) { cmd.close(); openEvent(id); }
$('#cq').addEventListener('input', () => { sel = 0; renderCmd(); });
$('#cq').addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') { sel = Math.min(sel+1, cres.length-1); renderCmd(); e.preventDefault(); }
  if (e.key === 'ArrowUp') { sel = Math.max(sel-1, 0); renderCmd(); e.preventDefault(); }
  if (e.key === 'Enter' && cres[sel]) pick(cres[sel].id);
});
$('#cres').addEventListener('click', e => { const li = e.target.closest('[data-id]'); if (li) pick(li.dataset.id); });
cmd.addEventListener('click', e => { if (e.target === cmd) cmd.close(); });

/* Wiring */
document.addEventListener('click', e => {
  const t = e.target, q = s => t.closest(s);
  if (q('[data-open]')) openEvent(q('[data-open]').dataset.open);
  if (q('[data-cat]')) { cat = q('[data-cat]').dataset.cat; renderChips(); renderGrid(); }
  if (q('[data-view]')) { view = q('[data-view]').dataset.view; document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === view)); renderGrid(); }
  if (q('[data-fav]')) { const id = +q('[data-fav]').dataset.fav; favs = favs.includes(id) ? favs.filter(i => i !== id) : [...favs, id]; save('kx-fav', favs); renderGrid(); }
  if (q('[data-ics]')) downloadIcs(q('[data-ics]').dataset.ics);
  if (q('[data-cancel]')) { regs = regs.filter(r => r.ref !== q('[data-cancel]').dataset.cancel); save('kx-regs', regs); renderRegs(); renderGrid(); }
  if (q('[data-close]') || t === dlg) dlg.close();
});
document.addEventListener('keydown', e => {
  const typing = /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
  if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); openCmd(); }
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('pin')) { e.preventDefault(); openEvent(document.activeElement.dataset.open); }
});
$('#openCmd').addEventListener('click', openCmd);
['input','change'].forEach(ev => { $('#q').addEventListener(ev, renderGrid); $('#soc').addEventListener(ev, renderGrid); $('#intent').addEventListener(ev, renderGrid); });

/* Theme */
$('#theme').addEventListener('click', () => {
  const root = document.documentElement, dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme:dark)').matches);
  root.dataset.theme = dark ? 'light' : 'dark'; save('kx-theme', root.dataset.theme);
});
const th = load('kx-theme', null); if (th) document.documentElement.dataset.theme = th;

renderBoard(); renderChips(); renderGrid(); renderRegs(); setInterval(tick, 1000);
