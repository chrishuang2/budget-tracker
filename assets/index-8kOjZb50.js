(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e){let n=r(e.start);return Array.from({length:7},(e,r)=>t(new Date(n.getFullYear(),n.getMonth(),n.getDate()+r)))}function o(e,t){return e>=t.start&&e<=t.end}function s(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function c(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),u=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function d(e,t=!1){return(t?u:l).format(r(e))}function ee(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${d(e.start,n)} – ${d(e.end,n)}`}function te(e){return t(e).slice(0,7)}function ne(e,t){let[n,r]=e.split(`-`).map(Number);return te(new Date(n,r-1+t,1))}var f=new Intl.DateTimeFormat(`en-US`,{month:`long`,year:`numeric`});function re(e){let[t,n]=e.split(`-`).map(Number);return f.format(new Date(t,n-1,1))}var p=[`Food`,`Transport`,`School`,`Fun`,`Other`];function m(e){return p.includes(e)}var h={newest:`Newest first`,oldest:`Oldest first`,amount:`Amount, highest first`};function ie(e){return typeof e==`string`&&Object.hasOwn(h,e)}function ae(e,t){return t===`oldest`?[...e].reverse():t===`amount`?[...e].sort((e,t)=>t.amountCents-e.amountCents):[...e]}function g(e,t,n){let r=i(n),s=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>o(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),c=_(s);return{week:r,expenses:s,spentCents:c,byCategory:v(s),byDay:a(r).map(e=>({date:e,cents:_(s.filter(t=>t.date===e))})),remainingCents:e===null?null:e-c}}function oe(e,t){let n=e.filter(e=>e.date.startsWith(`${t}-`));return{month:t,expenseCount:n.length,spentCents:_(n),byCategory:v(n)}}function _(e){return e.reduce((e,t)=>e+t.amountCents,0)}function v(e){return p.map(t=>({category:t,cents:_(e.filter(e=>e.category===t))})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents)}var y=1e7,b=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function x(e){let t=e.trim().replace(/,/g,``),n=b.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var S=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function C(e){return S.format(e/100)}function se(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=x(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${C(y)}.`}:{cents:n}}var w=`college-budget-tracker:data`,T=`college-budget-tracker:damaged-backup`,E=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function D(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!E(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:m(t.category)?t.category:`Other`}}var O=()=>({budgetCents:null,expenses:[]});function ce(e){let t;try{t=e.getItem(w)}catch{return{status:`unavailable`,data:O()}}if(t===null)return{status:`ok`,data:O()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(T,t)}catch{}return{status:`damaged`,data:O()}}let i=E(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(D).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function le(e,t){try{return e.setItem(w,JSON.stringify(t)),!0}catch{return!1}}var k=`College Budget Tracker`;function ue(e,n){let r={app:k,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var A=e=>e===1?`1 expense`:`${e} expenses`,j=e=>e===null?`no weekly budget`:`a ${C(e)} weekly budget`;function de(e,t){return`Downloaded ${t}: ${A(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${C(e.budgetCents)} weekly budget`}.`}function fe(e,t,n=`application/json`){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,i.hidden=!0,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}var M=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function pe(e){let t;try{t=JSON.parse(e)}catch{return{error:M}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==k||!Array.isArray(n.expenses))return{error:M};if(n.budgetCents!==null&&!E(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=D(e);if(t===null||!m(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function me(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${d(t[0],!0)} to ${d(t[t.length-1],!0)}`;return`It has ${j(e.budgetCents)} and ${A(e.expenses.length)}${n}.`}function he(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${C(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${A(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function ge(e,t){return`Restored ${t}: ${A(e.expenses.length)} and ${j(e.budgetCents)}.`}var _e=`text/csv;charset=utf-8`;function N(e){return/[",\r\n]/.test(e)?`"${e.replaceAll(`"`,`""`)}"`:e}function P(e){return/^[=+\-@]/.test(e)?`'${e}`:e}function ve(e){return`﻿${[[`Date`,`Description`,`Category`,`Amount`],...e.map(e=>[e.date,P(e.description),e.category,(e.amountCents/100).toFixed(2)])].map(e=>e.map(N).join(`,`)).join(`\r
`)}\r\n`}var ye=`college-budget-tracker:viewed-week`,be=1e4,F=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,xe=`
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

  <section id="daily-section" class="card" aria-labelledby="daily-heading">
    <h2 id="daily-heading">Daily spending this week</h2>
    <ul id="daily-totals" class="daily-totals" aria-labelledby="daily-heading"></ul>
    <p class="muted daily-note">Counts every expense in the week, whatever the search or category.</p>
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
`;function I(e){return`${e.description} (${C(e.amountCents)})`}function Se(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function L(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function Ce(e,t){e.addEventListener(`cancel`,e=>{e.preventDefault(),t()}),e.addEventListener(`click`,n=>{n.target===e&&t()})}function we(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}var Te={newest:`newest first`,oldest:`oldest first`,amount:`highest amount first`};function R(e,r,i={}){let a=i.now??(()=>new Date),l=i.newId??we,u=i.download??fe;e.innerHTML=xe;let f=t=>e.querySelector(t),p=f(`#expense-form`),h=f(`#expense-amount`),_=f(`#expense-description`),v=f(`#expense-date`),y=f(`#expense-category`),b=f(`#expense-status`),x=f(`#list-status`),S=null,w=null,T=ke(),E=`All`,D=``,O=`newest`,k=0,A=f(`#budget-form`),j=f(`#budget-amount`),M=f(`#budget-status`),N=ce(r),P=N.data;xt(),j.value=P.budgetCents===null?``:(P.budgetCents/100).toFixed(2),v.value=t(a()),$(),f(`#previous-month`).addEventListener(`click`,()=>{--k,vt()}),f(`#next-month`).addEventListener(`click`,()=>{k=Math.min(0,k+1),vt(),k===0&&f(`#previous-month`).focus()}),f(`#previous-week`).addEventListener(`click`,e=>X(`go to the previous week`,e.currentTarget,()=>R(T-1))),f(`#next-week`).addEventListener(`click`,e=>X(`go to the next week`,e.currentTarget,()=>{R(T+1),T===0&&f(`#previous-week`).focus()})),f(`#this-week`).addEventListener(`click`,e=>X(`go back to this week`,e.currentTarget,()=>{R(0),f(`#previous-week`).focus()}));function R(e){S!==null&&G(),T=e,Ae(),b.textContent=``,x.textContent=``,f(`#backup-status`).textContent=``,W(),$()}function ke(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,s(e,a())):0}catch{return 0}}function Ae(){try{T===0?i.tabStorage?.removeItem(ye):i.tabStorage?.setItem(ye,K().week.start)}catch{}}f(`#download-backup`).addEventListener(`click`,()=>{let e=f(`#backup-status`),{filename:t,text:n}=ue(P,a());try{u(t,n)}catch{V(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}V(e,de(P,t),`success`)});let H=null,U=f(`#restore-file`);f(`#restore-backup`).addEventListener(`click`,()=>U.click()),U.addEventListener(`change`,async()=>{let e=U.files?.[0];if(U.value=``,e===void 0)return;W();let t=f(`#backup-status`);if(e.size>2e6){V(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{V(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=pe(n);if(`error`in r){V(t,r.error,`error`);return}H={filename:e.name,data:r.data},t.textContent=``,f(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,f(`#restore-summary`).textContent=me(r.data),f(`#restore-warning`).textContent=he(P);let i=f(`#restore-preview`);i.hidden=!1,i.focus()}),f(`#cancel-restore`).addEventListener(`click`,()=>{W(),V(f(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),f(`#restore-backup`).focus()}),f(`#confirm-restore`).addEventListener(`click`,()=>{if(H===null)return;let{filename:e,data:t}=H,n=f(`#backup-status`);Q(t)?(W(),pt(),S!==null&&G(),j.value=P.budgetCents===null?``:(P.budgetCents/100).toFixed(2),M.textContent=``,b.textContent=``,x.textContent=``,$(),V(n,ge(t,e),`success`),f(`#restore-backup`).focus()):(W(),V(n,F,`error`),f(`#restore-backup`).focus())});function W(){H=null,f(`#restore-preview`).hidden=!0}f(`#set-budget-button`).addEventListener(`click`,()=>{j.scrollIntoView({block:`center`}),j.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&$()}),A.addEventListener(`submit`,e=>{e.preventDefault(),z(A);let t=se(j.value,`budget`);`error`in t?(Ee(j,t.error),j.focus(),M.textContent=``):Q({...P,budgetCents:t.cents})?(j.value=(t.cents/100).toFixed(2),V(M,`Weekly budget saved: ${C(t.cents)}.`,`success`),$()):V(M,F,`error`)}),p.addEventListener(`submit`,e=>{e.preventDefault();let t=je();t!==null&&(S===null?Me({id:l(),...t}):Ne({id:S,...t}))}),f(`#cancel-edit`).addEventListener(`click`,()=>{let e=S;G(),V(x,`Edit canceled. Nothing was changed.`,`success`),Ye(`edit`,e)});function je(){z(p);let e=[],t=se(h.value,`amount`);`error`in t&&e.push([h,t.error]);let r=_.value.trim().replace(/\s+/g,` `);r===``&&e.push([_,`Say what it was for, like Lunch or Bus fare.`]);let i=y.value;return m(i)||e.push([y,`Choose a category, like Food or Transport.`]),n(v.value)||e.push([v,`Pick the date you spent it.`]),e.length>0||`error`in t||!m(i)?(e.forEach(([e,t])=>Ee(e,t)),e[0][0].focus(),b.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:v.value}}function Me(e){if(!Q({...P,expenses:[...P.expenses,e]})){V(b,F,`error`);return}let t=`Added ${e.description} (${C(e.amountCents)}).`,n=`${t} It's dated ${d(e.date)}, outside this week, so it isn't counted above.`,r=Pe(e.date);Be(e.date)?V(b,B(t,Ge(e),r),r===null?`success`:`warning`):V(b,Je(e.date)?`${n} Tap Previous week to see it.`:n,`success`),ze(),h.focus(),$()}function Ne(e){let t=P.expenses.map(t=>t.id===e.id?e:t);if(!Q({...P,expenses:t})){V(b,F,`error`);return}let n=`Saved ${e.description} (${C(e.amountCents)}).`,r=Pe(e.date),i=r===null?`success`:`warning`;if(G(),$(),o(e.date,K().week))V(x,B(n,Ge(e),r),i),Ye(`edit`,e.id);else{let t=T===0?`this week`:`that week`,a=`It's now dated ${d(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`;V(x,B(n,a,r),i),f(`#list-heading`).focus()}}function Pe(e){if(!Be(e))return null;let t=g(P.budgetCents,P.expenses,a()).remainingCents;return t!==null&&t<0?`You're now over budget by ${C(-t)}.`:null}function Fe(e){let t=P.expenses.find(t=>t.id===e);t!==void 0&&(S=e,z(p),b.textContent=``,x.textContent=``,f(`#add-heading`).textContent=`Editing: ${t.description}`,f(`#expense-submit`).textContent=`Save changes`,f(`#cancel-edit`).hidden=!1,h.value=(t.amountCents/100).toFixed(2),_.value=t.description,v.value=t.date,y.value=t.category,w=Le(),$(),Ie())}function Ie(){p.closest(`section`).scrollIntoView({block:`start`}),h.focus()}function Le(){let e=se(h.value,`amount`);return JSON.stringify([`error`in e?h.value.trim():e.cents,_.value.trim().replace(/\s+/g,` `),v.value,y.value])}function Re(){return S!==null&&Le()!==w}function G(){S=null,w=null,z(p),b.textContent=``,f(`#add-heading`).textContent=`Add an expense`,f(`#expense-submit`).textContent=`Add expense`,f(`#cancel-edit`).hidden=!0,ze(),$()}function ze(){h.value=``,_.value=``,v.value=t(a()),y.value=``}function Be(e){return o(e,g(P.budgetCents,P.expenses,a()).week)}function K(){return g(P.budgetCents,P.expenses,c(a(),T))}function Ve(e){return E===`All`||e.category===E}function He(e){return e.description.toLocaleLowerCase().includes(D.toLocaleLowerCase())}function Ue(){return ae(K().expenses.filter(e=>Ve(e)&&He(e)),O)}let We=f(`#sort-order`);We.addEventListener(`change`,()=>{O=ie(We.value)?We.value:`newest`,x.textContent=``,$()});function Ge(e){let t=Ve(e),n=He(e);if(t&&n)return null;if(!n&&t)return`It doesn't match the search "${D}", so it's hidden until you clear the search.`;let r=`It's under ${e.category}, so it's hidden while ${E} is selected`;return n?`${r}.`:`${r} and the search is "${D}".`}let q=f(`#expense-search`);q.addEventListener(`input`,()=>{D=q.value.trim(),x.textContent=``,$()}),f(`#clear-search`).addEventListener(`click`,()=>{q.value=``,D=``,x.textContent=``,$(),q.focus()});function Ke(e){let t=E===`All`?``:`${E} `,n=D===``?``:` matching "${D}"`;return`${t}${e===1?`expense`:`expenses`}${n}`}f(`#export-csv`).addEventListener(`click`,()=>{let e=Ue();if(e.length===0)return;let t=`expenses-week-of-${K().week.start}.csv`;try{u(t,ve(e),_e)}catch{V(x,`Couldn't export the CSV: this browser refused to create the file. Nothing was changed.`,`error`);return}V(x,`Downloaded ${t} with ${e.length} ${Ke(e.length)}.`,`success`)});function qe(){return D!==``||E!==`All`||O!==`newest`}f(`#reset-filters`).addEventListener(`click`,()=>{q.value=``,D=``,E=`All`,O=`newest`,$(),V(x,`Filters reset: showing every expense, newest first.`,`success`),f(`#list-heading`).focus()}),f(`#category-filter`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-filter]`);if(t===null)return;let n=t.dataset.filter;E=n!==void 0&&m(n)?n:`All`,x.textContent=``,$()});function Je(e){return e<g(P.budgetCents,P.expenses,a()).week.start}function Ye(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??f(`#list-heading`)).focus()}f(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`),i=t.closest(`button[data-duplicate-id]`);if(n!==null)at(n.dataset.deleteId);else if(r!==null){let e=r.dataset.editId,t=P.expenses.find(t=>t.id===e);if(e===S)Ie();else if(t!==void 0){let n=I(t);X(`edit ${n}`,r,()=>$e(`${n} for editing`,r,t=>{Fe(e),t&&V(b,`Replaced your draft with ${n}. Nothing is saved until you tap Save changes.`,`success`)}))}}else if(i!==null){let e=P.expenses.find(e=>e.id===i.dataset.duplicateId);e!==void 0&&X(`duplicate ${I(e)}`,i,()=>$e(`a copy of ${I(e)} dated today`,i,t=>Xe(e,t)))}});function Xe(e,n=!1){S!==null&&G(),T!==0&&R(0),z(p);let r=t(a());h.value=(e.amountCents/100).toFixed(2),_.value=e.description,y.value=e.category,v.value=r,V(b,`${n?`Replaced your draft. `:``}Copied ${I(e)} with today's date, ${d(r)}. Nothing is added until you tap Add expense.`,`success`),Ie()}function Ze(){if(S!==null)return null;let e=h.value.trim(),r=se(e,`amount`),i=[_.value.trim().replace(/\s+/g,` `),e===``?``:`error`in r?e:C(r.cents),y.value,v.value===t(a())?``:n(v.value)?d(v.value):v.value].filter(e=>e!==``);return i.length===0?null:i.join(`, `)}let Qe=f(`#draft-dialog`),J=null;function $e(e,t,n){let r=Ze();r===null?n(!1):(J={action:n,trigger:t},f(`#draft-note`).textContent=`The Add form has an expense you haven't added: ${r}. Keep draft to leave it as it is, or replace it with ${e}. Nothing is saved either way.`,Se(Qe),f(`#keep-draft`).focus())}function et(){let e=J?.trigger;J=null,L(Qe),(e?.isConnected?e:h).focus()}f(`#keep-draft`).addEventListener(`click`,et),f(`#replace-draft`).addEventListener(`click`,()=>{let e=J;J=null,L(Qe),e?.action(!0)}),Ce(Qe,et);let tt=f(`#discard-dialog`),Y=null;function X(e,t,n){let r=P.expenses.find(e=>e.id===S);r===void 0||!Re()?n():(Y={action:n,trigger:t},f(`#discard-question`).textContent=`Discard your changes to ${I(r)}?`,f(`#discard-note`).textContent=`They haven't been saved. Keep editing to go back to the form, or discard them and ${e}.`,Se(tt),f(`#keep-editing`).focus())}function nt(){let e=Y?.trigger;Y=null,L(tt),(e?.isConnected?e:h).focus()}f(`#keep-editing`).addEventListener(`click`,nt),f(`#discard-changes`).addEventListener(`click`,()=>{let e=Y,t=P.expenses.find(e=>e.id===S);Y=null,L(tt),e!==null&&t!==void 0&&(G(),e.action(),V(x,`Discarded your changes to ${I(t)}. Nothing was saved.`,`success`))}),Ce(tt,nt);let rt=f(`#delete-dialog`),it=null;function at(e){let t=P.expenses.find(t=>t.id===e);t!==void 0&&(it=e,f(`#delete-question`).textContent=`Delete ${I(t)}?`,Se(rt),f(`#cancel-delete`).focus())}function ot(){let e=it;return it=null,L(rt),e}function st(){Ye(`delete`,ot())}f(`#cancel-delete`).addEventListener(`click`,st),f(`#confirm-delete`).addEventListener(`click`,()=>{let e=ot();e!==null&&ct(e)}),Ce(rt,st);function ct(t){let n=P.expenses.find(e=>e.id===t);if(n===void 0)return;let r=Ue().map(e=>e.id).indexOf(t),i=P.expenses.indexOf(n);if(!Q({...P,expenses:P.expenses.filter(e=>e.id!==t)})){V(x,F,`error`);return}S===t&&G(),x.textContent=``,dt(n,i),$();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(r,a.length-1)]??f(`#list-heading`)).focus()}let Z=f(`#undo-bar`),lt=null,ut;function dt(e,t){lt={expense:e,index:t};let n=document.createElement(`span`);n.textContent=`Deleted ${I(e)}.`;let r=document.createElement(`button`);r.type=`button`,r.id=`undo-delete`,r.textContent=`Undo`,r.setAttribute(`aria-label`,`Undo deleting ${I(e)}`),r.addEventListener(`click`,mt),Z.replaceChildren(n,r),ft()}function ft(){clearTimeout(ut),ut=setTimeout(pt,be)}function pt(){clearTimeout(ut),lt=null;let e=Z.contains(document.activeElement);Z.replaceChildren(),e&&f(`#list-heading`).focus()}Z.addEventListener(`focusin`,()=>clearTimeout(ut)),Z.addEventListener(`focusout`,()=>{lt!==null&&ft()});function mt(){let e=lt;if(pt(),e===null||P.expenses.some(t=>t.id===e.expense.id))return;let{expense:t,index:n}=e,r=[...P.expenses];if(r.splice(Math.min(n,r.length),0,t),!Q({...P,expenses:r})){V(x,F,`error`);return}$();let i=`Restored ${I(t)}.`,a=Pe(t.date),s=o(t.date,K().week)?Ge(t):`It's dated ${d(t.date)}, outside ${T===0?`this week`:`that week`}, so it isn't in this list.`;V(x,B(i,s,a),a===null?`success`:`warning`),Ye(`delete`,t.id)}function Q(e){return le(r,e)?(P=e,!0):!1}function $(){let t=a(),n=T<0,r=K(),i=T===0?`This week`:T===-1?`Last week`:`${-T} weeks ago`,o=ee(r.week,t.getFullYear());f(`#week-range`).textContent=`${i}: ${o}`,f(`#past-note`).textContent=`To add an expense for ${o}, tap Back to this week, then choose a date in that range in the Add an expense form.`,f(`#next-week`).hidden=!n,f(`#this-week`).hidden=!n,f(`#past-note`).hidden=!n,f(`#add-section`).hidden=n&&S===null,f(`#budget-section`).hidden=n,f(`#backup-section`).hidden=n,f(`#month-section`).hidden=n,f(`#totals`).hidden=n,f(`#breakdown-heading`).textContent=n?`Spent by category that week`:`Spent by category this week`;let s=f(`#remaining`),c=f(`#summary`),l=n?null:r.remainingCents;c.classList.toggle(`past`,n),c.classList.toggle(`over`,l!==null&&l<0),c.classList.toggle(`unset`,!n&&l===null),f(`#set-budget-button`).hidden=n||l!==null,s.textContent=n?`${C(r.spentCents)} spent that week`:r.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:r.remainingCents>=0?`${C(r.remainingCents)} left this week`:`Over budget by ${C(-r.remainingCents)}`,f(`#budget-total`).textContent=P.budgetCents===null?`Not set`:C(P.budgetCents),f(`#spent-total`).textContent=C(r.spentCents);let u=f(`#meter`);if(u.hidden=n||P.budgetCents===null,P.budgetCents!==null){let e=Math.min(1,r.spentCents/P.budgetCents);f(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}f(`#category-breakdown`).hidden=r.byCategory.length===0,f(`#category-totals`).replaceChildren(...r.byCategory.map(De)),_t(r.byDay,n),vt();let d=Ue(),te=n?`that week`:`this week`,ne=f(`#list-heading`),re=f(`#empty-list`),p=D!==``;if(E===`All`&&!p||r.expenses.length===0)ne.textContent=`${n?`Expenses that week`:`This week's expenses`} (${r.expenses.length})`,re.textContent=n?`No expenses that week.`:`No expenses this week yet.`;else{let e=E===`All`?``:`${E} `;ne.textContent=`${n?E===`All`?`Expenses that week`:`${E} expenses that week`:`This week's ${e}expenses`}${p?` matching "${D}"`:``} (${d.length} of ${r.expenses.length})`,re.textContent=p?`No ${e}expenses ${te} match "${D}". Check the spelling or tap Clear search.`:`No ${E} expenses ${te}.`}re.hidden=d.length>0,f(`#category-filter`).hidden=r.expenses.length===0,f(`#expense-search-area`).hidden=r.expenses.length===0&&!p,f(`#clear-search`).hidden=!p,f(`#sort-area`).hidden=r.expenses.length===0,f(`#reset-filters`).hidden=!qe()||r.expenses.length===0&&!p,ht(d,r.expenses.length),gt(d,r.expenses.length,o),f(`#sort-order`).value=O,e.querySelectorAll(`#category-filter button`).forEach(e=>{e.setAttribute(`aria-pressed`,String(e.dataset.filter===E))}),f(`#expense-list`).replaceChildren(...d.map(yt))}function ht(e,t){let n=f(`#shown-subtotal`);n.hidden=t===0||D===``&&E===`All`;let r=e.reduce((e,t)=>e+t.amountCents,0),i=t===1?`expense`:`expenses`;n.textContent=`Showing ${e.length} of ${t} ${i} · ${C(r)}`}function gt(e,t,n){f(`#export-area`).hidden=t===0,f(`#export-csv`).disabled=e.length===0,f(`#export-summary`).textContent=e.length===0?`Nothing to export: no expenses match the search and category.`:`Exports ${e.length} ${Ke(e.length)} from ${n}, ${Te[O]} (date, description, category, amount).`}function _t(e,t){f(`#daily-heading`).textContent=t?`Daily spending that week`:`Daily spending this week`;let n=Math.max(...e.map(e=>e.cents));f(`#daily-totals`).replaceChildren(...e.map(e=>Oe(e,n)))}function vt(){let e=ne(te(a()),k),t=oe(P.expenses,e),n=re(e);f(`#month-name`).textContent=k===0?`This month: ${n}`:n,f(`#next-month`).hidden=k===0;let r=`${t.expenseCount} ${t.expenseCount===1?`expense`:`expenses`}`;f(`#month-spent`).textContent=t.expenseCount===0?`No expenses in ${n}.`:`${C(t.spentCents)} spent in ${n} (${r})`,f(`#month-breakdown`).hidden=t.byCategory.length===0,f(`#month-category-totals`).replaceChildren(...t.byCategory.map(De))}function yt(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=d(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=C(e.amountCents),t.classList.toggle(`editing`,e.id===S);let s=document.createElement(`div`);return s.className=`row-actions`,s.append(bt(`Edit`,`edit`,e),bt(`Duplicate`,`duplicate`,e),bt(`Delete`,`delete`,e)),t.append(n,o,s),t}function bt(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${C(n.amountCents)})`),r}function xt(){let e=f(`#load-notice`);e.textContent={ok:``,skipped:N.status===`skipped`?`${N.skipped===1?`1 saved expense`:`${N.skipped} saved expenses`} couldn't be read and ${N.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[N.status],e.hidden=N.status===`ok`}}function Ee(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function z(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function De({category:e,cents:t}){let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=C(t),n.append(r,i),n}function Oe({date:e,cents:t},n){let r=document.createElement(`li`);r.dataset.date=e;let i=document.createElement(`span`);i.className=`day-name`,i.textContent=d(e);let a=document.createElement(`span`);a.className=`day-bar`,a.setAttribute(`aria-hidden`,`true`);let o=document.createElement(`span`);o.className=`day-bar-fill`,o.hidden=t===0,o.style.width=t===0?`0%`:`${(t/n*100).toFixed(1)}%`,a.append(o);let s=document.createElement(`span`);return s.className=`amount`,s.textContent=C(t),r.append(i,a,s),r}function B(...e){return e.filter(e=>e!==null).join(` `)}function V(e,t,n){e.textContent=t,e.dataset.kind=n}function ke(e){try{return window[e]}catch{return Ae}}var Ae={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};R(document.querySelector(`#app`),ke(`localStorage`),{tabStorage:ke(`sessionStorage`)});