(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function u(e,t=!1){return(t?l:c).format(r(e))}function ee(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${u(e.start,n)} – ${u(e.end,n)}`}function d(e){return t(e).slice(0,7)}function te(e,t){let[n,r]=e.split(`-`).map(Number);return d(new Date(n,r-1+t,1))}var f=new Intl.DateTimeFormat(`en-US`,{month:`long`,year:`numeric`});function ne(e){let[t,n]=e.split(`-`).map(Number);return f.format(new Date(t,n-1,1))}var p=[`Food`,`Transport`,`School`,`Fun`,`Other`];function m(e){return p.includes(e)}var h={newest:`Newest first`,oldest:`Oldest first`,amount:`Amount, highest first`};function re(e){return typeof e==`string`&&Object.hasOwn(h,e)}function ie(e,t){return t===`oldest`?[...e].reverse():t===`amount`?[...e].sort((e,t)=>t.amountCents-e.amountCents):[...e]}function g(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=_(o);return{week:r,expenses:o,spentCents:s,byCategory:v(o),remainingCents:e===null?null:e-s}}function ae(e,t){let n=e.filter(e=>e.date.startsWith(`${t}-`));return{month:t,expenseCount:n.length,spentCents:_(n),byCategory:v(n)}}function _(e){return e.reduce((e,t)=>e+t.amountCents,0)}function v(e){return p.map(t=>({category:t,cents:_(e.filter(e=>e.category===t))})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents)}var y=1e7,b=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function x(e){let t=e.trim().replace(/,/g,``),n=b.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var S=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function C(e){return S.format(e/100)}function w(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=x(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${C(y)}.`}:{cents:n}}var T=`college-budget-tracker:data`,oe=`college-budget-tracker:damaged-backup`,E=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function D(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!E(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:m(t.category)?t.category:`Other`}}var O=()=>({budgetCents:null,expenses:[]});function se(e){let t;try{t=e.getItem(T)}catch{return{status:`unavailable`,data:O()}}if(t===null)return{status:`ok`,data:O()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(oe,t)}catch{}return{status:`damaged`,data:O()}}let i=E(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(D).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function ce(e,t){try{return e.setItem(T,JSON.stringify(t)),!0}catch{return!1}}var k=`College Budget Tracker`;function le(e,n){let r={app:k,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var A=e=>e===1?`1 expense`:`${e} expenses`,ue=e=>e===null?`no weekly budget`:`a ${C(e)} weekly budget`;function de(e,t){return`Downloaded ${t}: ${A(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${C(e.budgetCents)} weekly budget`}.`}function fe(e,t,n=`application/json`){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,i.hidden=!0,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}var j=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function pe(e){let t;try{t=JSON.parse(e)}catch{return{error:j}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==k||!Array.isArray(n.expenses))return{error:j};if(n.budgetCents!==null&&!E(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=D(e);if(t===null||!m(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function me(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${u(t[0],!0)} to ${u(t[t.length-1],!0)}`;return`It has ${ue(e.budgetCents)} and ${A(e.expenses.length)}${n}.`}function he(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${C(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${A(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function ge(e,t){return`Restored ${t}: ${A(e.expenses.length)} and ${ue(e.budgetCents)}.`}var _e=`text/csv;charset=utf-8`;function M(e){return/[",\r\n]/.test(e)?`"${e.replaceAll(`"`,`""`)}"`:e}function N(e){return/^[=+\-@]/.test(e)?`'${e}`:e}function ve(e){return`﻿${[[`Date`,`Description`,`Category`,`Amount`],...e.map(e=>[e.date,N(e.description),e.category,(e.amountCents/100).toFixed(2)])].map(e=>e.map(M).join(`,`)).join(`\r
`)}\r\n`}var ye=`college-budget-tracker:viewed-week`,be=1e4,P=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,xe=`
  <header class="page-header">
    <h1>College Budget Tracker</h1>
    <p id="week-range" class="week-range" aria-live="polite"></p>
    <nav class="week-nav" aria-label="Weeks">
      <button id="previous-week" type="button" class="secondary"><span aria-hidden="true">← </span>Previous week</button>
      <button id="next-week" type="button" class="secondary" hidden>Next week<span aria-hidden="true"> →</span></button>
      <button id="this-week" type="button" class="secondary this-week" hidden>Back to this week</button>
    </nav>
    <p id="past-note" class="muted" hidden></p>
  </header>

  <section id="summary" class="card summary" aria-labelledby="remaining">
    <p id="remaining" class="remaining" aria-live="polite"></p>
    <div id="meter" class="meter" hidden><div id="meter-fill" class="meter-fill"></div></div>
    <button id="set-budget-button" type="button" class="secondary" hidden>Set weekly budget</button>
    <dl id="totals" class="totals">
      <div><dt>Weekly budget</dt><dd id="budget-total"></dd></div>
      <div><dt>Spent this week</dt><dd id="spent-total"></dd></div>
    </dl>
    <div id="category-breakdown" class="breakdown" hidden>
      <h3 id="breakdown-heading">Spent by category this week</h3>
      <ul id="category-totals" aria-labelledby="breakdown-heading"></ul>
    </div>
  </section>

  <p id="load-notice" class="notice" role="alert" hidden></p>

  <section id="add-section" class="card" aria-labelledby="add-heading">
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
        <label for="expense-category">Category</label>
        <select id="expense-category" name="category" aria-describedby="expense-category-error">
          <option value="">Choose a category</option>
          ${p.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
        <p id="expense-category-error" class="field-error" hidden></p>
      </div>
      <div class="field">
        <label for="expense-date">Date</label>
        <input id="expense-date" name="date" type="date" aria-describedby="expense-date-error" />
        <p id="expense-date-error" class="field-error" hidden></p>
      </div>
      <div class="form-buttons">
        <button id="expense-submit" type="submit">Add expense</button>
        <button id="cancel-edit" type="button" class="secondary" hidden>Cancel</button>
      </div>
      <p id="expense-status" class="status" role="status"></p>
    </form>
  </section>

  <section class="card" aria-labelledby="list-heading">
    <h2 id="list-heading" tabindex="-1">This week's expenses</h2>
    <div id="expense-search-area" class="field">
      <label for="expense-search">Search descriptions</label>
      <div class="search-row">
        <input id="expense-search" type="search" autocomplete="off" placeholder="e.g. lunch" />
        <button id="clear-search" type="button" class="secondary" hidden>Clear search</button>
      </div>
    </div>
    <div id="category-filter" class="category-filter" role="group" aria-label="Show expenses in category">
      ${[`All`,...p].map(e=>`<button type="button" class="filter-button" data-filter="${e}" aria-pressed="${e===`All`}">${e}</button>`).join(``)}
    </div>
    <div id="sort-area" class="field">
      <label for="sort-order">Sort by</label>
      <select id="sort-order">
        ${Object.entries(h).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}
      </select>
    </div>
    <button id="reset-filters" type="button" class="secondary" hidden>Reset filters</button>
    <p id="shown-subtotal" class="shown-subtotal" aria-live="polite" hidden></p>
    <p id="empty-list" class="muted">No expenses this week yet.</p>
    <ul id="expense-list" class="expense-list"></ul>
    <div id="export-area" class="export-area">
      <button id="export-csv" type="button" class="secondary" aria-describedby="export-summary">Export CSV</button>
      <p id="export-summary" class="muted export-summary"></p>
    </div>
    <p id="list-status" class="status" role="status"></p>
  </section>

  <section id="month-section" class="card" aria-labelledby="month-heading">
    <h2 id="month-heading">Monthly spending</h2>
    <p id="month-name" class="month-name" aria-live="polite"></p>
    <nav class="week-nav" aria-label="Months">
      <button id="previous-month" type="button" class="secondary"><span aria-hidden="true">← </span>Previous month</button>
      <button id="next-month" type="button" class="secondary" hidden>Next month<span aria-hidden="true"> →</span></button>
    </nav>
    <p id="month-spent" class="month-spent"></p>
    <div id="month-breakdown" class="breakdown" hidden>
      <h3 id="month-breakdown-heading">Spent by category</h3>
      <ul id="month-category-totals" aria-labelledby="month-breakdown-heading"></ul>
    </div>
    <p class="muted month-note">Counts every expense dated in that calendar month. It isn't part of the weekly budget.</p>
  </section>

  <section id="budget-section" class="card" aria-labelledby="budget-heading">
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

  <section id="backup-section" class="card" aria-labelledby="backup-heading">
    <h2 id="backup-heading">Backup</h2>
    <p class="muted">
      Save a copy of your weekly budget and every expense, from all weeks, as a file, or restore one you saved.
    </p>
    <p id="browser-only-note" class="note">
      Your data is saved only in this browser on this device. It doesn't sync to your other devices or browsers.
      To move it, tap Download backup here, then open the app on the other device and use Restore backup with
      that file.
    </p>
    <div class="form-buttons">
      <button id="download-backup" type="button" class="secondary">Download backup</button>
      <button id="restore-backup" type="button" class="secondary">Restore backup</button>
    </div>
    <input id="restore-file" type="file" accept=".json,application/json" hidden aria-label="Backup file to restore" />
    <div id="restore-preview" class="restore-preview" tabindex="-1" aria-labelledby="restore-preview-heading" hidden>
      <h3 id="restore-preview-heading"></h3>
      <p id="restore-summary"></p>
      <p id="restore-warning" class="warning"></p>
      <div class="form-buttons">
        <button id="confirm-restore" type="button" class="danger">Replace my data</button>
        <button id="cancel-restore" type="button" class="secondary">Cancel</button>
      </div>
    </div>
    <p id="backup-status" class="status" role="status"></p>
  </section>

  <div id="undo-bar" class="undo-bar" role="status"></div>

  <dialog id="delete-dialog" class="confirm-dialog" aria-labelledby="delete-question" aria-describedby="delete-note">
    <h2 id="delete-question"></h2>
    <p id="delete-note">This can't be undone.</p>
    <div class="form-buttons">
      <button id="confirm-delete" type="button" class="danger">Delete</button>
      <button id="cancel-delete" type="button" class="secondary" autofocus>Cancel</button>
    </div>
  </dialog>

  <dialog id="discard-dialog" class="confirm-dialog" aria-labelledby="discard-question" aria-describedby="discard-note">
    <h2 id="discard-question"></h2>
    <p id="discard-note"></p>
    <div class="form-buttons">
      <button id="discard-changes" type="button" class="danger">Discard changes</button>
      <button id="keep-editing" type="button" class="secondary" autofocus>Keep editing</button>
    </div>
  </dialog>

  <dialog id="draft-dialog" class="confirm-dialog" aria-labelledby="draft-question" aria-describedby="draft-note">
    <h2 id="draft-question">Replace your draft?</h2>
    <p id="draft-note"></p>
    <div class="form-buttons">
      <button id="replace-draft" type="button" class="danger">Replace draft</button>
      <button id="keep-draft" type="button" class="secondary" autofocus>Keep draft</button>
    </div>
  </dialog>
`;function F(e){return`${e.description} (${C(e.amountCents)})`}function Se(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function I(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function Ce(e,t){e.addEventListener(`cancel`,e=>{e.preventDefault(),t()}),e.addEventListener(`click`,n=>{n.target===e&&t()})}function we(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}var Te={newest:`newest first`,oldest:`oldest first`,amount:`highest amount first`};function L(e,r,i={}){let c=i.now??(()=>new Date),l=i.newId??we,f=i.download??fe;e.innerHTML=xe;let p=t=>e.querySelector(t),h=p(`#expense-form`),_=p(`#expense-amount`),v=p(`#expense-description`),y=p(`#expense-date`),b=p(`#expense-category`),x=p(`#expense-status`),S=p(`#list-status`),T=null,oe=null,E=Oe(),D=`All`,O=``,k=`newest`,A=0,ue=p(`#budget-form`),j=p(`#budget-amount`),M=p(`#budget-status`),N=se(r),L=N.data;yt(),j.value=L.budgetCents===null?``:(L.budgetCents/100).toFixed(2),y.value=t(c()),$(),p(`#previous-month`).addEventListener(`click`,()=>{--A,gt()}),p(`#next-month`).addEventListener(`click`,()=>{A=Math.min(0,A+1),gt(),A===0&&p(`#previous-month`).focus()}),p(`#previous-week`).addEventListener(`click`,e=>X(`go to the previous week`,e.currentTarget,()=>V(E-1))),p(`#next-week`).addEventListener(`click`,e=>X(`go to the next week`,e.currentTarget,()=>{V(E+1),E===0&&p(`#previous-week`).focus()})),p(`#this-week`).addEventListener(`click`,e=>X(`go back to this week`,e.currentTarget,()=>{V(0),p(`#previous-week`).focus()}));function V(e){T!==null&&G(),E=e,ke(),x.textContent=``,S.textContent=``,p(`#backup-status`).textContent=``,W(),$()}function Oe(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,o(e,c())):0}catch{return 0}}function ke(){try{E===0?i.tabStorage?.removeItem(ye):i.tabStorage?.setItem(ye,K().week.start)}catch{}}p(`#download-backup`).addEventListener(`click`,()=>{let e=p(`#backup-status`),{filename:t,text:n}=le(L,c());try{f(t,n)}catch{B(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}B(e,de(L,t),`success`)});let H=null,U=p(`#restore-file`);p(`#restore-backup`).addEventListener(`click`,()=>U.click()),U.addEventListener(`change`,async()=>{let e=U.files?.[0];if(U.value=``,e===void 0)return;W();let t=p(`#backup-status`);if(e.size>2e6){B(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{B(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=pe(n);if(`error`in r){B(t,r.error,`error`);return}H={filename:e.name,data:r.data},t.textContent=``,p(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,p(`#restore-summary`).textContent=me(r.data),p(`#restore-warning`).textContent=he(L);let i=p(`#restore-preview`);i.hidden=!1,i.focus()}),p(`#cancel-restore`).addEventListener(`click`,()=>{W(),B(p(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),p(`#restore-backup`).focus()}),p(`#confirm-restore`).addEventListener(`click`,()=>{if(H===null)return;let{filename:e,data:t}=H,n=p(`#backup-status`);Q(t)?(W(),ft(),T!==null&&G(),j.value=L.budgetCents===null?``:(L.budgetCents/100).toFixed(2),M.textContent=``,x.textContent=``,S.textContent=``,$(),B(n,ge(t,e),`success`),p(`#restore-backup`).focus()):(W(),B(n,P,`error`),p(`#restore-backup`).focus())});function W(){H=null,p(`#restore-preview`).hidden=!0}p(`#set-budget-button`).addEventListener(`click`,()=>{j.scrollIntoView({block:`center`}),j.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&$()}),ue.addEventListener(`submit`,e=>{e.preventDefault(),R(ue);let t=w(j.value,`budget`);`error`in t?(Ee(j,t.error),j.focus(),M.textContent=``):Q({...L,budgetCents:t.cents})?(j.value=(t.cents/100).toFixed(2),B(M,`Weekly budget saved: ${C(t.cents)}.`,`success`),$()):B(M,P,`error`)}),h.addEventListener(`submit`,e=>{e.preventDefault();let t=Ae();t!==null&&(T===null?je({id:l(),...t}):Me({id:T,...t}))}),p(`#cancel-edit`).addEventListener(`click`,()=>{let e=T;G(),B(S,`Edit canceled. Nothing was changed.`,`success`),Je(`edit`,e)});function Ae(){R(h);let e=[],t=w(_.value,`amount`);`error`in t&&e.push([_,t.error]);let r=v.value.trim().replace(/\s+/g,` `);r===``&&e.push([v,`Say what it was for, like Lunch or Bus fare.`]);let i=b.value;return m(i)||e.push([b,`Choose a category, like Food or Transport.`]),n(y.value)||e.push([y,`Pick the date you spent it.`]),e.length>0||`error`in t||!m(i)?(e.forEach(([e,t])=>Ee(e,t)),e[0][0].focus(),x.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:y.value}}function je(e){if(!Q({...L,expenses:[...L.expenses,e]})){B(x,P,`error`);return}let t=`Added ${e.description} (${C(e.amountCents)}).`,n=`${t} It's dated ${u(e.date)}, outside this week, so it isn't counted above.`,r=Ne(e.date);ze(e.date)?B(x,z(t,We(e),r),r===null?`success`:`warning`):B(x,qe(e.date)?`${n} Tap Previous week to see it.`:n,`success`),Re(),_.focus(),$()}function Me(e){let t=L.expenses.map(t=>t.id===e.id?e:t);if(!Q({...L,expenses:t})){B(x,P,`error`);return}let n=`Saved ${e.description} (${C(e.amountCents)}).`,r=Ne(e.date),i=r===null?`success`:`warning`;if(G(),$(),a(e.date,K().week))B(S,z(n,We(e),r),i),Je(`edit`,e.id);else{let t=E===0?`this week`:`that week`,a=`It's now dated ${u(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`;B(S,z(n,a,r),i),p(`#list-heading`).focus()}}function Ne(e){if(!ze(e))return null;let t=g(L.budgetCents,L.expenses,c()).remainingCents;return t!==null&&t<0?`You're now over budget by ${C(-t)}.`:null}function Pe(e){let t=L.expenses.find(t=>t.id===e);t!==void 0&&(T=e,R(h),x.textContent=``,S.textContent=``,p(`#add-heading`).textContent=`Editing: ${t.description}`,p(`#expense-submit`).textContent=`Save changes`,p(`#cancel-edit`).hidden=!1,_.value=(t.amountCents/100).toFixed(2),v.value=t.description,y.value=t.date,b.value=t.category,oe=Ie(),$(),Fe())}function Fe(){h.closest(`section`).scrollIntoView({block:`start`}),_.focus()}function Ie(){let e=w(_.value,`amount`);return JSON.stringify([`error`in e?_.value.trim():e.cents,v.value.trim().replace(/\s+/g,` `),y.value,b.value])}function Le(){return T!==null&&Ie()!==oe}function G(){T=null,oe=null,R(h),x.textContent=``,p(`#add-heading`).textContent=`Add an expense`,p(`#expense-submit`).textContent=`Add expense`,p(`#cancel-edit`).hidden=!0,Re(),$()}function Re(){_.value=``,v.value=``,y.value=t(c()),b.value=``}function ze(e){return a(e,g(L.budgetCents,L.expenses,c()).week)}function K(){return g(L.budgetCents,L.expenses,s(c(),E))}function Be(e){return D===`All`||e.category===D}function Ve(e){return e.description.toLocaleLowerCase().includes(O.toLocaleLowerCase())}function He(){return ie(K().expenses.filter(e=>Be(e)&&Ve(e)),k)}let Ue=p(`#sort-order`);Ue.addEventListener(`change`,()=>{k=re(Ue.value)?Ue.value:`newest`,S.textContent=``,$()});function We(e){let t=Be(e),n=Ve(e);if(t&&n)return null;if(!n&&t)return`It doesn't match the search "${O}", so it's hidden until you clear the search.`;let r=`It's under ${e.category}, so it's hidden while ${D} is selected`;return n?`${r}.`:`${r} and the search is "${O}".`}let q=p(`#expense-search`);q.addEventListener(`input`,()=>{O=q.value.trim(),S.textContent=``,$()}),p(`#clear-search`).addEventListener(`click`,()=>{q.value=``,O=``,S.textContent=``,$(),q.focus()});function Ge(e){let t=D===`All`?``:`${D} `,n=O===``?``:` matching "${O}"`;return`${t}${e===1?`expense`:`expenses`}${n}`}p(`#export-csv`).addEventListener(`click`,()=>{let e=He();if(e.length===0)return;let t=`expenses-week-of-${K().week.start}.csv`;try{f(t,ve(e),_e)}catch{B(S,`Couldn't export the CSV: this browser refused to create the file. Nothing was changed.`,`error`);return}B(S,`Downloaded ${t} with ${e.length} ${Ge(e.length)}.`,`success`)});function Ke(){return O!==``||D!==`All`||k!==`newest`}p(`#reset-filters`).addEventListener(`click`,()=>{q.value=``,O=``,D=`All`,k=`newest`,$(),B(S,`Filters reset: showing every expense, newest first.`,`success`),p(`#list-heading`).focus()}),p(`#category-filter`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-filter]`);if(t===null)return;let n=t.dataset.filter;D=n!==void 0&&m(n)?n:`All`,S.textContent=``,$()});function qe(e){return e<g(L.budgetCents,L.expenses,c()).week.start}function Je(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??p(`#list-heading`)).focus()}p(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`),i=t.closest(`button[data-duplicate-id]`);if(n!==null)it(n.dataset.deleteId);else if(r!==null){let e=r.dataset.editId,t=L.expenses.find(t=>t.id===e);e===T?Fe():t!==void 0&&X(`edit ${F(t)}`,r,()=>Pe(e))}else if(i!==null){let e=L.expenses.find(e=>e.id===i.dataset.duplicateId);e!==void 0&&X(`duplicate ${F(e)}`,i,()=>Qe(e,i))}});function Ye(e,n=!1){T!==null&&G(),E!==0&&V(0),R(h);let r=t(c());_.value=(e.amountCents/100).toFixed(2),v.value=e.description,b.value=e.category,y.value=r,B(x,`${n?`Replaced your draft. `:``}Copied ${F(e)} with today's date, ${u(r)}. Nothing is added until you tap Add expense.`,`success`),Fe()}function Xe(){if(T!==null)return null;let e=_.value.trim(),r=w(e,`amount`),i=[v.value.trim().replace(/\s+/g,` `),e===``?``:`error`in r?e:C(r.cents),b.value,y.value===t(c())?``:n(y.value)?u(y.value):y.value].filter(e=>e!==``);return i.length===0?null:i.join(`, `)}let Ze=p(`#draft-dialog`),J=null;function Qe(e,t){let n=Xe();n===null?Ye(e):(J={expense:e,trigger:t},p(`#draft-note`).textContent=`The Add form has an expense you haven't added: ${n}. Keep draft to leave it as it is, or replace it with a copy of ${F(e)} dated today. Nothing is saved either way.`,Se(Ze),p(`#keep-draft`).focus())}function $e(){let e=J?.trigger;J=null,I(Ze),(e?.isConnected?e:_).focus()}p(`#keep-draft`).addEventListener(`click`,$e),p(`#replace-draft`).addEventListener(`click`,()=>{let e=J;J=null,I(Ze),e!==null&&Ye(e.expense,!0)}),Ce(Ze,$e);let et=p(`#discard-dialog`),Y=null;function X(e,t,n){let r=L.expenses.find(e=>e.id===T);r===void 0||!Le()?n():(Y={action:n,trigger:t},p(`#discard-question`).textContent=`Discard your changes to ${F(r)}?`,p(`#discard-note`).textContent=`They haven't been saved. Keep editing to go back to the form, or discard them and ${e}.`,Se(et),p(`#keep-editing`).focus())}function tt(){let e=Y?.trigger;Y=null,I(et),(e?.isConnected?e:_).focus()}p(`#keep-editing`).addEventListener(`click`,tt),p(`#discard-changes`).addEventListener(`click`,()=>{let e=Y,t=L.expenses.find(e=>e.id===T);Y=null,I(et),e!==null&&t!==void 0&&(G(),e.action(),B(S,`Discarded your changes to ${F(t)}. Nothing was saved.`,`success`))}),Ce(et,tt);let nt=p(`#delete-dialog`),rt=null;function it(e){let t=L.expenses.find(t=>t.id===e);t!==void 0&&(rt=e,p(`#delete-question`).textContent=`Delete ${F(t)}?`,Se(nt),p(`#cancel-delete`).focus())}function at(){let e=rt;return rt=null,I(nt),e}function ot(){Je(`delete`,at())}p(`#cancel-delete`).addEventListener(`click`,ot),p(`#confirm-delete`).addEventListener(`click`,()=>{let e=at();e!==null&&st(e)}),Ce(nt,ot);function st(t){let n=L.expenses.find(e=>e.id===t);if(n===void 0)return;let r=He().map(e=>e.id).indexOf(t),i=L.expenses.indexOf(n);if(!Q({...L,expenses:L.expenses.filter(e=>e.id!==t)})){B(S,P,`error`);return}T===t&&G(),S.textContent=``,ut(n,i),$();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(r,a.length-1)]??p(`#list-heading`)).focus()}let Z=p(`#undo-bar`),ct=null,lt;function ut(e,t){ct={expense:e,index:t};let n=document.createElement(`span`);n.textContent=`Deleted ${F(e)}.`;let r=document.createElement(`button`);r.type=`button`,r.id=`undo-delete`,r.textContent=`Undo`,r.setAttribute(`aria-label`,`Undo deleting ${F(e)}`),r.addEventListener(`click`,pt),Z.replaceChildren(n,r),dt()}function dt(){clearTimeout(lt),lt=setTimeout(ft,be)}function ft(){clearTimeout(lt),ct=null;let e=Z.contains(document.activeElement);Z.replaceChildren(),e&&p(`#list-heading`).focus()}Z.addEventListener(`focusin`,()=>clearTimeout(lt)),Z.addEventListener(`focusout`,()=>{ct!==null&&dt()});function pt(){let e=ct;if(ft(),e===null||L.expenses.some(t=>t.id===e.expense.id))return;let{expense:t,index:n}=e,r=[...L.expenses];if(r.splice(Math.min(n,r.length),0,t),!Q({...L,expenses:r})){B(S,P,`error`);return}$();let i=`Restored ${F(t)}.`,o=Ne(t.date),s=a(t.date,K().week)?We(t):`It's dated ${u(t.date)}, outside ${E===0?`this week`:`that week`}, so it isn't in this list.`;B(S,z(i,s,o),o===null?`success`:`warning`),Je(`delete`,t.id)}function Q(e){return ce(r,e)?(L=e,!0):!1}function $(){let t=c(),n=E<0,r=K(),i=E===0?`This week`:E===-1?`Last week`:`${-E} weeks ago`,a=ee(r.week,t.getFullYear());p(`#week-range`).textContent=`${i}: ${a}`,p(`#past-note`).textContent=`To add an expense for ${a}, tap Back to this week, then choose a date in that range in the Add an expense form.`,p(`#next-week`).hidden=!n,p(`#this-week`).hidden=!n,p(`#past-note`).hidden=!n,p(`#add-section`).hidden=n&&T===null,p(`#budget-section`).hidden=n,p(`#backup-section`).hidden=n,p(`#month-section`).hidden=n,p(`#totals`).hidden=n,p(`#breakdown-heading`).textContent=n?`Spent by category that week`:`Spent by category this week`;let o=p(`#remaining`),s=p(`#summary`),l=n?null:r.remainingCents;s.classList.toggle(`past`,n),s.classList.toggle(`over`,l!==null&&l<0),s.classList.toggle(`unset`,!n&&l===null),p(`#set-budget-button`).hidden=n||l!==null,o.textContent=n?`${C(r.spentCents)} spent that week`:r.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:r.remainingCents>=0?`${C(r.remainingCents)} left this week`:`Over budget by ${C(-r.remainingCents)}`,p(`#budget-total`).textContent=L.budgetCents===null?`Not set`:C(L.budgetCents),p(`#spent-total`).textContent=C(r.spentCents);let u=p(`#meter`);if(u.hidden=n||L.budgetCents===null,L.budgetCents!==null){let e=Math.min(1,r.spentCents/L.budgetCents);p(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}p(`#category-breakdown`).hidden=r.byCategory.length===0,p(`#category-totals`).replaceChildren(...r.byCategory.map(De)),gt();let d=He(),te=n?`that week`:`this week`,f=p(`#list-heading`),ne=p(`#empty-list`),m=O!==``;if(D===`All`&&!m||r.expenses.length===0)f.textContent=`${n?`Expenses that week`:`This week's expenses`} (${r.expenses.length})`,ne.textContent=n?`No expenses that week.`:`No expenses this week yet.`;else{let e=D===`All`?``:`${D} `;f.textContent=`${n?D===`All`?`Expenses that week`:`${D} expenses that week`:`This week's ${e}expenses`}${m?` matching "${O}"`:``} (${d.length} of ${r.expenses.length})`,ne.textContent=m?`No ${e}expenses ${te} match "${O}". Check the spelling or tap Clear search.`:`No ${D} expenses ${te}.`}ne.hidden=d.length>0,p(`#category-filter`).hidden=r.expenses.length===0,p(`#expense-search-area`).hidden=r.expenses.length===0&&!m,p(`#clear-search`).hidden=!m,p(`#sort-area`).hidden=r.expenses.length===0,p(`#reset-filters`).hidden=!Ke()||r.expenses.length===0&&!m,mt(d,r.expenses.length),ht(d,r.expenses.length,a),p(`#sort-order`).value=k,e.querySelectorAll(`#category-filter button`).forEach(e=>{e.setAttribute(`aria-pressed`,String(e.dataset.filter===D))}),p(`#expense-list`).replaceChildren(...d.map(_t))}function mt(e,t){let n=p(`#shown-subtotal`);n.hidden=t===0||O===``&&D===`All`;let r=e.reduce((e,t)=>e+t.amountCents,0),i=t===1?`expense`:`expenses`;n.textContent=`Showing ${e.length} of ${t} ${i} · ${C(r)}`}function ht(e,t,n){p(`#export-area`).hidden=t===0,p(`#export-csv`).disabled=e.length===0,p(`#export-summary`).textContent=e.length===0?`Nothing to export: no expenses match the search and category.`:`Exports ${e.length} ${Ge(e.length)} from ${n}, ${Te[k]} (date, description, category, amount).`}function gt(){let e=te(d(c()),A),t=ae(L.expenses,e),n=ne(e);p(`#month-name`).textContent=A===0?`This month: ${n}`:n,p(`#next-month`).hidden=A===0;let r=`${t.expenseCount} ${t.expenseCount===1?`expense`:`expenses`}`;p(`#month-spent`).textContent=t.expenseCount===0?`No expenses in ${n}.`:`${C(t.spentCents)} spent in ${n} (${r})`,p(`#month-breakdown`).hidden=t.byCategory.length===0,p(`#month-category-totals`).replaceChildren(...t.byCategory.map(De))}function _t(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=u(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=C(e.amountCents),t.classList.toggle(`editing`,e.id===T);let s=document.createElement(`div`);return s.className=`row-actions`,s.append(vt(`Edit`,`edit`,e),vt(`Duplicate`,`duplicate`,e),vt(`Delete`,`delete`,e)),t.append(n,o,s),t}function vt(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${C(n.amountCents)})`),r}function yt(){let e=p(`#load-notice`);e.textContent={ok:``,skipped:N.status===`skipped`?`${N.skipped===1?`1 saved expense`:`${N.skipped} saved expenses`} couldn't be read and ${N.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[N.status],e.hidden=N.status===`ok`}}function Ee(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function R(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function De({category:e,cents:t}){let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=C(t),n.append(r,i),n}function z(...e){return e.filter(e=>e!==null).join(` `)}function B(e,t,n){e.textContent=t,e.dataset.kind=n}function V(e){try{return window[e]}catch{return Oe}}var Oe={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};L(document.querySelector(`#app`),V(`localStorage`),{tabStorage:V(`sessionStorage`)});