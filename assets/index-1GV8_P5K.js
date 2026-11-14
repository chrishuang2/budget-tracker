(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}var o=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`});function s(e){return o.format(r(e))}function c(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=o.reduce((e,t)=>e+t.amountCents,0);return{week:r,expenses:o,spentCents:s,remainingCents:e===null?null:e-s}}var l=1e7,u=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function d(e){let t=e.trim().replace(/,/g,``),n=u.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var f=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function p(e){return f.format(e/100)}function m(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=d(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${p(l)}.`}:{cents:n}}var h=`college-budget-tracker:data`,g=`college-budget-tracker:damaged-backup`,_=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function v(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!_(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date}}var y=()=>({budgetCents:null,expenses:[]});function b(e){let t;try{t=e.getItem(h)}catch{return{status:`unavailable`,data:y()}}if(t===null)return{status:`ok`,data:y()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(g,t)}catch{}return{status:`damaged`,data:y()}}let i=_(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(v).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function x(e,t){try{return e.setItem(h,JSON.stringify(t)),!0}catch{return!1}}var S=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,C=`
  <header class="page-header">
    <h1>College Budget Tracker</h1>
    <p id="week-range" class="muted"></p>
  </header>

  <section id="summary" class="card summary" aria-labelledby="remaining">
    <p id="remaining" class="remaining" aria-live="polite"></p>
    <div id="meter" class="meter" hidden><div id="meter-fill" class="meter-fill"></div></div>
    <button id="set-budget-button" type="button" class="secondary" hidden>Set weekly budget</button>
    <dl class="totals">
      <div><dt>Weekly budget</dt><dd id="budget-total"></dd></div>
      <div><dt>Spent this week</dt><dd id="spent-total"></dd></div>
    </dl>
  </section>

  <p id="load-notice" class="notice" role="alert" hidden></p>

  <section class="card" aria-labelledby="add-heading">
    <h2 id="add-heading">Add an expense</h2>
    <form id="expense-form" novalidate>
      <div class="field">
        <label for="expense-amount">Amount ($)</label>
        <input id="expense-amount" name="amount" type="text" inputmode="decimal" autocomplete="off"
          placeholder="e.g. 12.50" aria-describedby="expense-amount-error" />
        <p id="expense-amount-error" class="field-error" hidden></p>
      </div>
      <div class="field">
        <label for="expense-description">What was it for?</label>
        <input id="expense-description" name="description" type="text" maxlength="80" autocomplete="off"
          placeholder="e.g. Lunch" aria-describedby="expense-description-error" />
        <p id="expense-description-error" class="field-error" hidden></p>
      </div>
      <div class="field">
        <label for="expense-date">Date</label>
        <input id="expense-date" name="date" type="date" aria-describedby="expense-date-error" />
        <p id="expense-date-error" class="field-error" hidden></p>
      </div>
      <button type="submit">Add expense</button>
      <p id="expense-status" class="status" role="status"></p>
    </form>
  </section>

  <section class="card" aria-labelledby="list-heading">
    <h2 id="list-heading" tabindex="-1">This week's expenses</h2>
    <p id="empty-list" class="muted">No expenses this week yet.</p>
    <ul id="expense-list" class="expense-list"></ul>
    <p id="list-status" class="status" role="status"></p>
  </section>

  <section class="card" aria-labelledby="budget-heading">
    <h2 id="budget-heading">Weekly budget</h2>
    <form id="budget-form" novalidate>
      <div class="field">
        <label for="budget-amount">Budget per week ($)</label>
        <input id="budget-amount" name="budget" type="text" inputmode="decimal" autocomplete="off"
          placeholder="e.g. 100" aria-describedby="budget-amount-error" />
        <p id="budget-amount-error" class="field-error" hidden></p>
      </div>
      <button type="submit">Save budget</button>
      <p id="budget-status" class="status" role="status"></p>
    </form>
  </section>
`;function w(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function T(e,r,i={}){let o=i.now??(()=>new Date),l=i.newId??w,u=i.confirm??(e=>window.confirm(e));e.innerHTML=C;let d=t=>e.querySelector(t),f=d(`#expense-form`),h=d(`#expense-amount`),g=d(`#expense-description`),_=d(`#expense-date`),v=d(`#expense-status`),y=d(`#budget-form`),T=d(`#budget-amount`),k=d(`#budget-status`),A=b(r),j=A.data;I(),T.value=j.budgetCents===null?``:(j.budgetCents/100).toFixed(2),_.value=t(o()),P(),d(`#set-budget-button`).addEventListener(`click`,()=>{T.scrollIntoView({block:`center`}),T.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&P()}),y.addEventListener(`submit`,e=>{e.preventDefault(),D(y);let t=m(T.value,`budget`);`error`in t?(E(T,t.error),T.focus(),k.textContent=``):N({...j,budgetCents:t.cents})?(T.value=(t.cents/100).toFixed(2),O(k,`Weekly budget saved: ${p(t.cents)}.`,`success`),P()):O(k,S,`error`)}),f.addEventListener(`submit`,e=>{e.preventDefault(),D(f);let r=[],i=m(h.value,`amount`);`error`in i&&r.push([h,i.error]);let u=g.value.trim().replace(/\s+/g,` `);if(u===``&&r.push([g,`Say what it was for, like Lunch or Bus fare.`]),n(_.value)||r.push([_,`Pick the date you spent it.`]),r.length>0||`error`in i){r.forEach(([e,t])=>E(e,t)),r[0][0].focus(),v.textContent=``;return}let d={id:l(),description:u,amountCents:i.cents,date:_.value};if(!N({...j,expenses:[...j.expenses,d]})){O(v,S,`error`);return}let y=`Added ${d.description} (${p(d.amountCents)}).`,b=c(j.budgetCents,j.expenses,o()).week;O(v,a(d.date,b)?y:`${y} It's dated ${s(d.date)}, outside this week, so it isn't counted above.`,`success`),h.value=``,g.value=``,_.value=t(o()),h.focus(),P()}),d(`#expense-list`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-delete-id]`);t!==null&&M(t.dataset.deleteId)});function M(t){let n=j.expenses.find(e=>e.id===t);if(n===void 0)return;let r=d(`#list-status`),i=`${n.description} (${p(n.amountCents)})`;if(!u(`Delete ${i}?`))return;let a=c(j.budgetCents,j.expenses,o()).expenses.map(e=>e.id).indexOf(t);if(!N({...j,expenses:j.expenses.filter(e=>e.id!==t)})){O(r,S,`error`);return}O(r,`Deleted ${i}.`,`success`),P();let s=e.querySelectorAll(`#expense-list button[data-delete-id]`);(s[Math.min(a,s.length-1)]??d(`#list-heading`)).focus()}function N(e){return x(r,e)?(j=e,!0):!1}function P(){let e=c(j.budgetCents,j.expenses,o());d(`#week-range`).textContent=`This week: ${s(e.week.start)} – ${s(e.week.end)}`;let t=d(`#remaining`),n=d(`#summary`);n.classList.toggle(`over`,e.remainingCents!==null&&e.remainingCents<0),n.classList.toggle(`unset`,e.remainingCents===null),d(`#set-budget-button`).hidden=e.remainingCents!==null,t.textContent=e.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:e.remainingCents>=0?`${p(e.remainingCents)} left this week`:`Over budget by ${p(-e.remainingCents)}`,d(`#budget-total`).textContent=j.budgetCents===null?`Not set`:p(j.budgetCents),d(`#spent-total`).textContent=p(e.spentCents);let r=d(`#meter`);if(r.hidden=j.budgetCents===null,j.budgetCents!==null){let t=Math.min(1,e.spentCents/j.budgetCents);d(`#meter-fill`).style.width=`${(t*100).toFixed(1)}%`}d(`#list-heading`).textContent=`This week's expenses (${e.expenses.length})`,d(`#empty-list`).hidden=e.expenses.length>0,d(`#expense-list`).replaceChildren(...e.expenses.map(F))}function F(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=s(e.date),n.append(r,i);let a=document.createElement(`span`);a.className=`amount`,a.textContent=p(e.amountCents);let o=document.createElement(`button`);return o.type=`button`,o.className=`secondary delete`,o.textContent=`Delete`,o.dataset.deleteId=e.id,o.setAttribute(`aria-label`,`Delete ${e.description} (${p(e.amountCents)})`),t.append(n,a,o),t}function I(){let e=d(`#load-notice`);e.textContent={ok:``,skipped:A.status===`skipped`?`${A.skipped===1?`1 saved expense`:`${A.skipped} saved expenses`} couldn't be read and ${A.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[A.status],e.hidden=A.status===`ok`}}function E(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function D(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function O(e,t,n){e.textContent=t,e.dataset.kind=n}function k(){try{return window.localStorage}catch{return A}}var A={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};T(document.querySelector(`#app`),k());