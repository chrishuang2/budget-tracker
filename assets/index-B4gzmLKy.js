(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function u(e,t=!1){return(t?l:c).format(r(e))}function ee(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${u(e.start,n)} – ${u(e.end,n)}`}function d(e){return t(e).slice(0,7)}function te(e,t){let[n,r]=e.split(`-`).map(Number);return d(new Date(n,r-1+t,1))}var f=new Intl.DateTimeFormat(`en-US`,{month:`long`,year:`numeric`});function p(e){let[t,n]=e.split(`-`).map(Number);return f.format(new Date(t,n-1,1))}var m=[`Food`,`Transport`,`School`,`Fun`,`Other`];function h(e){return m.includes(e)}var g={newest:`Newest first`,oldest:`Oldest first`,amount:`Amount, highest first`};function ne(e){return typeof e==`string`&&Object.hasOwn(g,e)}function re(e,t){return t===`oldest`?[...e].reverse():t===`amount`?[...e].sort((e,t)=>t.amountCents-e.amountCents):[...e]}function _(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=v(o);return{week:r,expenses:o,spentCents:s,byCategory:y(o),remainingCents:e===null?null:e-s}}function ie(e,t){let n=e.filter(e=>e.date.startsWith(`${t}-`));return{month:t,expenseCount:n.length,spentCents:v(n),byCategory:y(n)}}function v(e){return e.reduce((e,t)=>e+t.amountCents,0)}function y(e){return m.map(t=>({category:t,cents:v(e.filter(e=>e.category===t))})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents)}var b=1e7,x=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function S(e){let t=e.trim().replace(/,/g,``),n=x.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var C=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function w(e){return C.format(e/100)}function ae(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=S(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${w(b)}.`}:{cents:n}}var T=`college-budget-tracker:data`,E=`college-budget-tracker:damaged-backup`,D=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function O(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!D(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:h(t.category)?t.category:`Other`}}var k=()=>({budgetCents:null,expenses:[]});function oe(e){let t;try{t=e.getItem(T)}catch{return{status:`unavailable`,data:k()}}if(t===null)return{status:`ok`,data:k()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(E,t)}catch{}return{status:`damaged`,data:k()}}let i=D(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(O).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function se(e,t){try{return e.setItem(T,JSON.stringify(t)),!0}catch{return!1}}var A=`College Budget Tracker`;function ce(e,n){let r={app:A,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var j=e=>e===1?`1 expense`:`${e} expenses`,M=e=>e===null?`no weekly budget`:`a ${w(e)} weekly budget`;function le(e,t){return`Downloaded ${t}: ${j(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${w(e.budgetCents)} weekly budget`}.`}function ue(e,t,n=`application/json`){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,i.hidden=!0,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}var N=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function de(e){let t;try{t=JSON.parse(e)}catch{return{error:N}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==A||!Array.isArray(n.expenses))return{error:N};if(n.budgetCents!==null&&!D(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=O(e);if(t===null||!h(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function fe(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${u(t[0],!0)} to ${u(t[t.length-1],!0)}`;return`It has ${M(e.budgetCents)} and ${j(e.expenses.length)}${n}.`}function pe(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${w(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${j(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function me(e,t){return`Restored ${t}: ${j(e.expenses.length)} and ${M(e.budgetCents)}.`}var he=`text/csv;charset=utf-8`;function P(e){return/[",\r\n]/.test(e)?`"${e.replaceAll(`"`,`""`)}"`:e}function F(e){return/^[=+\-@]/.test(e)?`'${e}`:e}function ge(e){return`﻿${[[`Date`,`Description`,`Category`,`Amount`],...e.map(e=>[e.date,F(e.description),e.category,(e.amountCents/100).toFixed(2)])].map(e=>e.map(P).join(`,`)).join(`\r
`)}\r\n`}var _e=`college-budget-tracker:viewed-week`,I=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,ve=`
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
          ${m.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
      ${[`All`,...m].map(e=>`<button type="button" class="filter-button" data-filter="${e}" aria-pressed="${e===`All`}">${e}</button>`).join(``)}
    </div>
    <div id="sort-area" class="field">
      <label for="sort-order">Sort by</label>
      <select id="sort-order">
        ${Object.entries(g).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}
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
`;function L(e){return`${e.description} (${w(e.amountCents)})`}function ye(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function be(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function xe(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}var Se={newest:`newest first`,oldest:`oldest first`,amount:`highest amount first`};function R(e,r,i={}){let c=i.now??(()=>new Date),l=i.newId??xe,f=i.download??ue;e.innerHTML=ve;let m=t=>e.querySelector(t),g=m(`#expense-form`),v=m(`#expense-amount`),y=m(`#expense-description`),b=m(`#expense-date`),x=m(`#expense-category`),S=m(`#expense-status`),C=m(`#list-status`),T=null,E=null,D=Ee(),O=`All`,k=``,A=`newest`,j=0,M=m(`#budget-form`),N=m(`#budget-amount`),P=m(`#budget-status`),F=oe(r),R=F.data;it(),N.value=R.budgetCents===null?``:(R.budgetCents/100).toFixed(2),b.value=t(c()),$(),m(`#previous-month`).addEventListener(`click`,()=>{--j,tt()}),m(`#next-month`).addEventListener(`click`,()=>{j=Math.min(0,j+1),tt(),j===0&&m(`#previous-month`).focus()}),m(`#previous-week`).addEventListener(`click`,e=>X(`go to the previous week`,e.currentTarget,()=>V(D-1))),m(`#next-week`).addEventListener(`click`,e=>X(`go to the next week`,e.currentTarget,()=>{V(D+1),D===0&&m(`#previous-week`).focus()})),m(`#this-week`).addEventListener(`click`,e=>X(`go back to this week`,e.currentTarget,()=>{V(0),m(`#previous-week`).focus()}));function V(e){T!==null&&G(),D=e,De(),S.textContent=``,C.textContent=``,m(`#backup-status`).textContent=``,W(),$()}function Ee(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,o(e,c())):0}catch{return 0}}function De(){try{D===0?i.tabStorage?.removeItem(_e):i.tabStorage?.setItem(_e,K().week.start)}catch{}}m(`#download-backup`).addEventListener(`click`,()=>{let e=m(`#backup-status`),{filename:t,text:n}=ce(R,c());try{f(t,n)}catch{B(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}B(e,le(R,t),`success`)});let H=null,U=m(`#restore-file`);m(`#restore-backup`).addEventListener(`click`,()=>U.click()),U.addEventListener(`change`,async()=>{let e=U.files?.[0];if(U.value=``,e===void 0)return;W();let t=m(`#backup-status`);if(e.size>2e6){B(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{B(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=de(n);if(`error`in r){B(t,r.error,`error`);return}H={filename:e.name,data:r.data},t.textContent=``,m(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,m(`#restore-summary`).textContent=fe(r.data),m(`#restore-warning`).textContent=pe(R);let i=m(`#restore-preview`);i.hidden=!1,i.focus()}),m(`#cancel-restore`).addEventListener(`click`,()=>{W(),B(m(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),m(`#restore-backup`).focus()}),m(`#confirm-restore`).addEventListener(`click`,()=>{if(H===null)return;let{filename:e,data:t}=H,n=m(`#backup-status`);Q(t)?(W(),T!==null&&G(),N.value=R.budgetCents===null?``:(R.budgetCents/100).toFixed(2),P.textContent=``,S.textContent=``,C.textContent=``,$(),B(n,me(t,e),`success`),m(`#restore-backup`).focus()):(W(),B(n,I,`error`),m(`#restore-backup`).focus())});function W(){H=null,m(`#restore-preview`).hidden=!0}m(`#set-budget-button`).addEventListener(`click`,()=>{N.scrollIntoView({block:`center`}),N.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&$()}),M.addEventListener(`submit`,e=>{e.preventDefault(),z(M);let t=ae(N.value,`budget`);`error`in t?(Ce(N,t.error),N.focus(),P.textContent=``):Q({...R,budgetCents:t.cents})?(N.value=(t.cents/100).toFixed(2),B(P,`Weekly budget saved: ${w(t.cents)}.`,`success`),$()):B(P,I,`error`)}),g.addEventListener(`submit`,e=>{e.preventDefault();let t=Oe();t!==null&&(T===null?ke({id:l(),...t}):Ae({id:T,...t}))}),m(`#cancel-edit`).addEventListener(`click`,()=>{let e=T;G(),B(C,`Edit canceled. Nothing was changed.`,`success`),Ke(`edit`,e)});function Oe(){z(g);let e=[],t=ae(v.value,`amount`);`error`in t&&e.push([v,t.error]);let r=y.value.trim().replace(/\s+/g,` `);r===``&&e.push([y,`Say what it was for, like Lunch or Bus fare.`]);let i=x.value;return h(i)||e.push([x,`Choose a category, like Food or Transport.`]),n(b.value)||e.push([b,`Pick the date you spent it.`]),e.length>0||`error`in t||!h(i)?(e.forEach(([e,t])=>Ce(e,t)),e[0][0].focus(),S.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:b.value}}function ke(e){if(!Q({...R,expenses:[...R.expenses,e]})){B(S,I,`error`);return}let t=`Added ${e.description} (${w(e.amountCents)}).`,n=`${t} It's dated ${u(e.date)}, outside this week, so it isn't counted above.`,r=je(e.date);Le(e.date)?B(S,Te(t,He(e),r),r===null?`success`:`warning`):B(S,Ge(e.date)?`${n} Tap Previous week to see it.`:n,`success`),Ie(),v.focus(),$()}function Ae(e){let t=R.expenses.map(t=>t.id===e.id?e:t);if(!Q({...R,expenses:t})){B(S,I,`error`);return}let n=`Saved ${e.description} (${w(e.amountCents)}).`,r=je(e.date),i=r===null?`success`:`warning`;if(G(),$(),a(e.date,K().week))B(C,Te(n,He(e),r),i),Ke(`edit`,e.id);else{let t=D===0?`this week`:`that week`,a=`It's now dated ${u(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`;B(C,Te(n,a,r),i),m(`#list-heading`).focus()}}function je(e){if(!Le(e))return null;let t=_(R.budgetCents,R.expenses,c()).remainingCents;return t!==null&&t<0?`You're now over budget by ${w(-t)}.`:null}function Me(e){let t=R.expenses.find(t=>t.id===e);t!==void 0&&(T=e,z(g),S.textContent=``,C.textContent=``,m(`#add-heading`).textContent=`Editing: ${t.description}`,m(`#expense-submit`).textContent=`Save changes`,m(`#cancel-edit`).hidden=!1,v.value=(t.amountCents/100).toFixed(2),y.value=t.description,b.value=t.date,x.value=t.category,E=Pe(),$(),Ne())}function Ne(){g.closest(`section`).scrollIntoView({block:`start`}),v.focus()}function Pe(){let e=ae(v.value,`amount`);return JSON.stringify([`error`in e?v.value.trim():e.cents,y.value.trim().replace(/\s+/g,` `),b.value,x.value])}function Fe(){return T!==null&&Pe()!==E}function G(){T=null,E=null,z(g),S.textContent=``,m(`#add-heading`).textContent=`Add an expense`,m(`#expense-submit`).textContent=`Add expense`,m(`#cancel-edit`).hidden=!0,Ie(),$()}function Ie(){v.value=``,y.value=``,b.value=t(c()),x.value=``}function Le(e){return a(e,_(R.budgetCents,R.expenses,c()).week)}function K(){return _(R.budgetCents,R.expenses,s(c(),D))}function Re(e){return O===`All`||e.category===O}function ze(e){return e.description.toLocaleLowerCase().includes(k.toLocaleLowerCase())}function Be(){return re(K().expenses.filter(e=>Re(e)&&ze(e)),A)}let Ve=m(`#sort-order`);Ve.addEventListener(`change`,()=>{A=ne(Ve.value)?Ve.value:`newest`,C.textContent=``,$()});function He(e){let t=Re(e),n=ze(e);if(t&&n)return null;if(!n&&t)return`It doesn't match the search "${k}", so it's hidden until you clear the search.`;let r=`It's under ${e.category}, so it's hidden while ${O} is selected`;return n?`${r}.`:`${r} and the search is "${k}".`}let q=m(`#expense-search`);q.addEventListener(`input`,()=>{k=q.value.trim(),C.textContent=``,$()}),m(`#clear-search`).addEventListener(`click`,()=>{q.value=``,k=``,C.textContent=``,$(),q.focus()});function Ue(e){let t=O===`All`?``:`${O} `,n=k===``?``:` matching "${k}"`;return`${t}${e===1?`expense`:`expenses`}${n}`}m(`#export-csv`).addEventListener(`click`,()=>{let e=Be();if(e.length===0)return;let t=`expenses-week-of-${K().week.start}.csv`;try{f(t,ge(e),he)}catch{B(C,`Couldn't export the CSV: this browser refused to create the file. Nothing was changed.`,`error`);return}B(C,`Downloaded ${t} with ${e.length} ${Ue(e.length)}.`,`success`)});function We(){return k!==``||O!==`All`||A!==`newest`}m(`#reset-filters`).addEventListener(`click`,()=>{q.value=``,k=``,O=`All`,A=`newest`,$(),B(C,`Filters reset: showing every expense, newest first.`,`success`),m(`#list-heading`).focus()}),m(`#category-filter`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-filter]`);if(t===null)return;let n=t.dataset.filter;O=n!==void 0&&h(n)?n:`All`,C.textContent=``,$()});function Ge(e){return e<_(R.budgetCents,R.expenses,c()).week.start}function Ke(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??m(`#list-heading`)).focus()}m(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);if(n!==null)Ye(n.dataset.deleteId);else if(r!==null){let e=r.dataset.editId,t=R.expenses.find(t=>t.id===e);e===T?Ne():t!==void 0&&X(`edit ${L(t)}`,r,()=>Me(e))}});let J=m(`#discard-dialog`),Y=null;function X(e,t,n){let r=R.expenses.find(e=>e.id===T);r===void 0||!Fe()?n():(Y={action:n,trigger:t},m(`#discard-question`).textContent=`Discard your changes to ${L(r)}?`,m(`#discard-note`).textContent=`They haven't been saved. Keep editing to go back to the form, or discard them and ${e}.`,ye(J),m(`#keep-editing`).focus())}function qe(){let e=Y?.trigger;Y=null,be(J),(e?.isConnected?e:v).focus()}m(`#keep-editing`).addEventListener(`click`,qe),m(`#discard-changes`).addEventListener(`click`,()=>{let e=Y,t=R.expenses.find(e=>e.id===T);Y=null,be(J),e!==null&&t!==void 0&&(G(),e.action(),B(C,`Discarded your changes to ${L(t)}. Nothing was saved.`,`success`))}),J.addEventListener(`cancel`,e=>{e.preventDefault(),qe()}),J.addEventListener(`click`,e=>{e.target===J&&qe()});let Z=m(`#delete-dialog`),Je=null;function Ye(e){let t=R.expenses.find(t=>t.id===e);t!==void 0&&(Je=e,m(`#delete-question`).textContent=`Delete ${L(t)}?`,ye(Z),m(`#cancel-delete`).focus())}function Xe(){let e=Je;return Je=null,be(Z),e}function Ze(){Ke(`delete`,Xe())}m(`#cancel-delete`).addEventListener(`click`,Ze),m(`#confirm-delete`).addEventListener(`click`,()=>{let e=Xe();e!==null&&Qe(e)}),Z.addEventListener(`cancel`,e=>{e.preventDefault(),Ze()}),Z.addEventListener(`click`,e=>{e.target===Z&&Ze()});function Qe(t){let n=R.expenses.find(e=>e.id===t);if(n===void 0)return;let r=L(n),i=Be().map(e=>e.id).indexOf(t);if(!Q({...R,expenses:R.expenses.filter(e=>e.id!==t)})){B(C,I,`error`);return}T===t&&G(),B(C,`Deleted ${r}.`,`success`),$();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??m(`#list-heading`)).focus()}function Q(e){return se(r,e)?(R=e,!0):!1}function $(){let t=c(),n=D<0,r=K(),i=D===0?`This week`:D===-1?`Last week`:`${-D} weeks ago`,a=ee(r.week,t.getFullYear());m(`#week-range`).textContent=`${i}: ${a}`,m(`#past-note`).textContent=`To add an expense for ${a}, tap Back to this week, then choose a date in that range in the Add an expense form.`,m(`#next-week`).hidden=!n,m(`#this-week`).hidden=!n,m(`#past-note`).hidden=!n,m(`#add-section`).hidden=n&&T===null,m(`#budget-section`).hidden=n,m(`#backup-section`).hidden=n,m(`#month-section`).hidden=n,m(`#totals`).hidden=n,m(`#breakdown-heading`).textContent=n?`Spent by category that week`:`Spent by category this week`;let o=m(`#remaining`),s=m(`#summary`),l=n?null:r.remainingCents;s.classList.toggle(`past`,n),s.classList.toggle(`over`,l!==null&&l<0),s.classList.toggle(`unset`,!n&&l===null),m(`#set-budget-button`).hidden=n||l!==null,o.textContent=n?`${w(r.spentCents)} spent that week`:r.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:r.remainingCents>=0?`${w(r.remainingCents)} left this week`:`Over budget by ${w(-r.remainingCents)}`,m(`#budget-total`).textContent=R.budgetCents===null?`Not set`:w(R.budgetCents),m(`#spent-total`).textContent=w(r.spentCents);let u=m(`#meter`);if(u.hidden=n||R.budgetCents===null,R.budgetCents!==null){let e=Math.min(1,r.spentCents/R.budgetCents);m(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}m(`#category-breakdown`).hidden=r.byCategory.length===0,m(`#category-totals`).replaceChildren(...r.byCategory.map(we)),tt();let d=Be(),te=n?`that week`:`this week`,f=m(`#list-heading`),p=m(`#empty-list`),h=k!==``;if(O===`All`&&!h||r.expenses.length===0)f.textContent=`${n?`Expenses that week`:`This week's expenses`} (${r.expenses.length})`,p.textContent=n?`No expenses that week.`:`No expenses this week yet.`;else{let e=O===`All`?``:`${O} `;f.textContent=`${n?O===`All`?`Expenses that week`:`${O} expenses that week`:`This week's ${e}expenses`}${h?` matching "${k}"`:``} (${d.length} of ${r.expenses.length})`,p.textContent=h?`No ${e}expenses ${te} match "${k}". Check the spelling or tap Clear search.`:`No ${O} expenses ${te}.`}p.hidden=d.length>0,m(`#category-filter`).hidden=r.expenses.length===0,m(`#expense-search-area`).hidden=r.expenses.length===0&&!h,m(`#clear-search`).hidden=!h,m(`#sort-area`).hidden=r.expenses.length===0,m(`#reset-filters`).hidden=!We()||r.expenses.length===0&&!h,$e(d,r.expenses.length),et(d,r.expenses.length,a),m(`#sort-order`).value=A,e.querySelectorAll(`#category-filter button`).forEach(e=>{e.setAttribute(`aria-pressed`,String(e.dataset.filter===O))}),m(`#expense-list`).replaceChildren(...d.map(nt))}function $e(e,t){let n=m(`#shown-subtotal`);n.hidden=t===0||k===``&&O===`All`;let r=e.reduce((e,t)=>e+t.amountCents,0),i=t===1?`expense`:`expenses`;n.textContent=`Showing ${e.length} of ${t} ${i} · ${w(r)}`}function et(e,t,n){m(`#export-area`).hidden=t===0,m(`#export-csv`).disabled=e.length===0,m(`#export-summary`).textContent=e.length===0?`Nothing to export: no expenses match the search and category.`:`Exports ${e.length} ${Ue(e.length)} from ${n}, ${Se[A]} (date, description, category, amount).`}function tt(){let e=te(d(c()),j),t=ie(R.expenses,e),n=p(e);m(`#month-name`).textContent=j===0?`This month: ${n}`:n,m(`#next-month`).hidden=j===0;let r=`${t.expenseCount} ${t.expenseCount===1?`expense`:`expenses`}`;m(`#month-spent`).textContent=t.expenseCount===0?`No expenses in ${n}.`:`${w(t.spentCents)} spent in ${n} (${r})`,m(`#month-breakdown`).hidden=t.byCategory.length===0,m(`#month-category-totals`).replaceChildren(...t.byCategory.map(we))}function nt(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=u(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=w(e.amountCents),t.classList.toggle(`editing`,e.id===T);let s=document.createElement(`div`);return s.className=`row-actions`,s.append(rt(`Edit`,`edit`,e),rt(`Delete`,`delete`,e)),t.append(n,o,s),t}function rt(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${w(n.amountCents)})`),r}function it(){let e=m(`#load-notice`);e.textContent={ok:``,skipped:F.status===`skipped`?`${F.skipped===1?`1 saved expense`:`${F.skipped} saved expenses`} couldn't be read and ${F.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[F.status],e.hidden=F.status===`ok`}}function Ce(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function z(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function we({category:e,cents:t}){let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=w(t),n.append(r,i),n}function Te(...e){return e.filter(e=>e!==null).join(` `)}function B(e,t,n){e.textContent=t,e.dataset.kind=n}function V(e){try{return window[e]}catch{return Ee}}var Ee={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};R(document.querySelector(`#app`),V(`localStorage`),{tabStorage:V(`sessionStorage`)});