(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function u(e,t=!1){return(t?l:c).format(r(e))}function ee(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${u(e.start,n)} – ${u(e.end,n)}`}function d(e){return t(e).slice(0,7)}function f(e,t){let[n,r]=e.split(`-`).map(Number);return d(new Date(n,r-1+t,1))}var p=new Intl.DateTimeFormat(`en-US`,{month:`long`,year:`numeric`});function m(e){let[t,n]=e.split(`-`).map(Number);return p.format(new Date(t,n-1,1))}var h=[`Food`,`Transport`,`School`,`Fun`,`Other`];function g(e){return h.includes(e)}var _={newest:`Newest first`,oldest:`Oldest first`,amount:`Amount, highest first`};function te(e){return typeof e==`string`&&Object.hasOwn(_,e)}function ne(e,t){return t===`oldest`?[...e].reverse():t===`amount`?[...e].sort((e,t)=>t.amountCents-e.amountCents):[...e]}function v(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=y(o);return{week:r,expenses:o,spentCents:s,byCategory:b(o),remainingCents:e===null?null:e-s}}function re(e,t){let n=e.filter(e=>e.date.startsWith(`${t}-`));return{month:t,expenseCount:n.length,spentCents:y(n),byCategory:b(n)}}function y(e){return e.reduce((e,t)=>e+t.amountCents,0)}function b(e){return h.map(t=>({category:t,cents:y(e.filter(e=>e.category===t))})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents)}var x=1e7,S=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function C(e){let t=e.trim().replace(/,/g,``),n=S.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var w=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function T(e){return w.format(e/100)}function ie(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=C(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${T(x)}.`}:{cents:n}}var E=`college-budget-tracker:data`,D=`college-budget-tracker:damaged-backup`,O=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function k(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!O(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:g(t.category)?t.category:`Other`}}var A=()=>({budgetCents:null,expenses:[]});function ae(e){let t;try{t=e.getItem(E)}catch{return{status:`unavailable`,data:A()}}if(t===null)return{status:`ok`,data:A()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(D,t)}catch{}return{status:`damaged`,data:A()}}let i=O(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(k).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function oe(e,t){try{return e.setItem(E,JSON.stringify(t)),!0}catch{return!1}}var j=`College Budget Tracker`;function se(e,n){let r={app:j,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var M=e=>e===1?`1 expense`:`${e} expenses`,N=e=>e===null?`no weekly budget`:`a ${T(e)} weekly budget`;function ce(e,t){return`Downloaded ${t}: ${M(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${T(e.budgetCents)} weekly budget`}.`}function le(e,t,n=`application/json`){let r=URL.createObjectURL(new Blob([t],{type:n})),i=document.createElement(`a`);i.href=r,i.download=e,i.hidden=!0,document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}var P=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function ue(e){let t;try{t=JSON.parse(e)}catch{return{error:P}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==j||!Array.isArray(n.expenses))return{error:P};if(n.budgetCents!==null&&!O(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=k(e);if(t===null||!g(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function de(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${u(t[0],!0)} to ${u(t[t.length-1],!0)}`;return`It has ${N(e.budgetCents)} and ${M(e.expenses.length)}${n}.`}function fe(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${T(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${M(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function pe(e,t){return`Restored ${t}: ${M(e.expenses.length)} and ${N(e.budgetCents)}.`}var me=`text/csv;charset=utf-8`;function F(e){return/[",\r\n]/.test(e)?`"${e.replaceAll(`"`,`""`)}"`:e}function I(e){return/^[=+\-@]/.test(e)?`'${e}`:e}function he(e){return`﻿${[[`Date`,`Description`,`Category`,`Amount`],...e.map(e=>[e.date,I(e.description),e.category,(e.amountCents/100).toFixed(2)])].map(e=>e.map(F).join(`,`)).join(`\r
`)}\r\n`}var ge=`college-budget-tracker:viewed-week`,L=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,_e=`
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
          ${h.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
      ${[`All`,...h].map(e=>`<button type="button" class="filter-button" data-filter="${e}" aria-pressed="${e===`All`}">${e}</button>`).join(``)}
    </div>
    <div id="sort-area" class="field">
      <label for="sort-order">Sort by</label>
      <select id="sort-order">
        ${Object.entries(_).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}
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

  <dialog id="delete-dialog" class="delete-dialog" aria-labelledby="delete-question" aria-describedby="delete-note">
    <h2 id="delete-question"></h2>
    <p id="delete-note">This can't be undone.</p>
    <div class="form-buttons">
      <button id="confirm-delete" type="button" class="danger">Delete</button>
      <button id="cancel-delete" type="button" class="secondary" autofocus>Cancel</button>
    </div>
  </dialog>
`;function ve(e){return`${e.description} (${T(e.amountCents)})`}function ye(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function be(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function xe(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}var Se={newest:`newest first`,oldest:`oldest first`,amount:`highest amount first`};function R(e,r,i={}){let c=i.now??(()=>new Date),l=i.newId??xe,p=i.download??le;e.innerHTML=_e;let h=t=>e.querySelector(t),_=h(`#expense-form`),y=h(`#expense-amount`),b=h(`#expense-description`),x=h(`#expense-date`),S=h(`#expense-category`),C=h(`#expense-status`),w=h(`#list-status`),E=null,D=H(),O=`All`,k=``,A=`newest`,j=0,M=h(`#budget-form`),N=h(`#budget-amount`),P=h(`#budget-status`),F=ae(r),I=F.data;Xe(),N.value=I.budgetCents===null?``:(I.budgetCents/100).toFixed(2),x.value=t(c()),$(),h(`#previous-month`).addEventListener(`click`,()=>{--j,qe()}),h(`#next-month`).addEventListener(`click`,()=>{j=Math.min(0,j+1),qe(),j===0&&h(`#previous-month`).focus()}),h(`#previous-week`).addEventListener(`click`,()=>R(D-1)),h(`#next-week`).addEventListener(`click`,()=>{R(D+1),D===0&&h(`#previous-week`).focus()}),h(`#this-week`).addEventListener(`click`,()=>{R(0),h(`#previous-week`).focus()});function R(e){E!==null&&K(),D=e,Te(),C.textContent=``,w.textContent=``,h(`#backup-status`).textContent=``,G(),$()}function H(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,o(e,c())):0}catch{return 0}}function Te(){try{D===0?i.tabStorage?.removeItem(ge):i.tabStorage?.setItem(ge,q().week.start)}catch{}}h(`#download-backup`).addEventListener(`click`,()=>{let e=h(`#backup-status`),{filename:t,text:n}=se(I,c());try{p(t,n)}catch{V(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}V(e,ce(I,t),`success`)});let U=null,W=h(`#restore-file`);h(`#restore-backup`).addEventListener(`click`,()=>W.click()),W.addEventListener(`change`,async()=>{let e=W.files?.[0];if(W.value=``,e===void 0)return;G();let t=h(`#backup-status`);if(e.size>2e6){V(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{V(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=ue(n);if(`error`in r){V(t,r.error,`error`);return}U={filename:e.name,data:r.data},t.textContent=``,h(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,h(`#restore-summary`).textContent=de(r.data),h(`#restore-warning`).textContent=fe(I);let i=h(`#restore-preview`);i.hidden=!1,i.focus()}),h(`#cancel-restore`).addEventListener(`click`,()=>{G(),V(h(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),h(`#restore-backup`).focus()}),h(`#confirm-restore`).addEventListener(`click`,()=>{if(U===null)return;let{filename:e,data:t}=U,n=h(`#backup-status`);Q(t)?(G(),E!==null&&K(),N.value=I.budgetCents===null?``:(I.budgetCents/100).toFixed(2),P.textContent=``,C.textContent=``,w.textContent=``,$(),V(n,pe(t,e),`success`),h(`#restore-backup`).focus()):(G(),V(n,L,`error`),h(`#restore-backup`).focus())});function G(){U=null,h(`#restore-preview`).hidden=!0}h(`#set-budget-button`).addEventListener(`click`,()=>{N.scrollIntoView({block:`center`}),N.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&$()}),M.addEventListener(`submit`,e=>{e.preventDefault(),z(M);let t=ie(N.value,`budget`);`error`in t?(Ce(N,t.error),N.focus(),P.textContent=``):Q({...I,budgetCents:t.cents})?(N.value=(t.cents/100).toFixed(2),V(P,`Weekly budget saved: ${T(t.cents)}.`,`success`),$()):V(P,L,`error`)}),_.addEventListener(`submit`,e=>{e.preventDefault();let t=Ee();t!==null&&(E===null?De({id:l(),...t}):Oe({id:E,...t}))}),h(`#cancel-edit`).addEventListener(`click`,()=>{let e=E;K(),V(w,`Edit canceled. Nothing was changed.`,`success`),ze(`edit`,e)});function Ee(){z(_);let e=[],t=ie(y.value,`amount`);`error`in t&&e.push([y,t.error]);let r=b.value.trim().replace(/\s+/g,` `);r===``&&e.push([b,`Say what it was for, like Lunch or Bus fare.`]);let i=S.value;return g(i)||e.push([S,`Choose a category, like Food or Transport.`]),n(x.value)||e.push([x,`Pick the date you spent it.`]),e.length>0||`error`in t||!g(i)?(e.forEach(([e,t])=>Ce(e,t)),e[0][0].focus(),C.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:x.value}}function De(e){if(!Q({...I,expenses:[...I.expenses,e]})){V(C,L,`error`);return}let t=`Added ${e.description} (${T(e.amountCents)}).`,n=`${t} It's dated ${u(e.date)}, outside this week, so it isn't counted above.`,r=ke(e.date);Me(e.date)?V(C,B(t,Fe(e),r),r===null?`success`:`warning`):V(C,Re(e.date)?`${n} Tap Previous week to see it.`:n,`success`),je(),y.focus(),$()}function Oe(e){let t=I.expenses.map(t=>t.id===e.id?e:t);if(!Q({...I,expenses:t})){V(C,L,`error`);return}let n=`Saved ${e.description} (${T(e.amountCents)}).`,r=ke(e.date),i=r===null?`success`:`warning`;if(K(),$(),a(e.date,q().week))V(w,B(n,Fe(e),r),i),ze(`edit`,e.id);else{let t=D===0?`this week`:`that week`,a=`It's now dated ${u(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`;V(w,B(n,a,r),i),h(`#list-heading`).focus()}}function ke(e){if(!Me(e))return null;let t=v(I.budgetCents,I.expenses,c()).remainingCents;return t!==null&&t<0?`You're now over budget by ${T(-t)}.`:null}function Ae(e){let t=I.expenses.find(t=>t.id===e);t!==void 0&&(E=e,z(_),C.textContent=``,w.textContent=``,h(`#add-heading`).textContent=`Editing: ${t.description}`,h(`#expense-submit`).textContent=`Save changes`,h(`#cancel-edit`).hidden=!1,y.value=(t.amountCents/100).toFixed(2),b.value=t.description,x.value=t.date,S.value=t.category,$(),_.closest(`section`).scrollIntoView({block:`start`}),y.focus())}function K(){E=null,z(_),C.textContent=``,h(`#add-heading`).textContent=`Add an expense`,h(`#expense-submit`).textContent=`Add expense`,h(`#cancel-edit`).hidden=!0,je(),$()}function je(){y.value=``,b.value=``,x.value=t(c()),S.value=``}function Me(e){return a(e,v(I.budgetCents,I.expenses,c()).week)}function q(){return v(I.budgetCents,I.expenses,s(c(),D))}function Ne(e){return O===`All`||e.category===O}function Pe(e){return e.description.toLocaleLowerCase().includes(k.toLocaleLowerCase())}function J(){return ne(q().expenses.filter(e=>Ne(e)&&Pe(e)),A)}let Y=h(`#sort-order`);Y.addEventListener(`change`,()=>{A=te(Y.value)?Y.value:`newest`,w.textContent=``,$()});function Fe(e){let t=Ne(e),n=Pe(e);if(t&&n)return null;if(!n&&t)return`It doesn't match the search "${k}", so it's hidden until you clear the search.`;let r=`It's under ${e.category}, so it's hidden while ${O} is selected`;return n?`${r}.`:`${r} and the search is "${k}".`}let X=h(`#expense-search`);X.addEventListener(`input`,()=>{k=X.value.trim(),w.textContent=``,$()}),h(`#clear-search`).addEventListener(`click`,()=>{X.value=``,k=``,w.textContent=``,$(),X.focus()});function Ie(e){let t=O===`All`?``:`${O} `,n=k===``?``:` matching "${k}"`;return`${t}${e===1?`expense`:`expenses`}${n}`}h(`#export-csv`).addEventListener(`click`,()=>{let e=J();if(e.length===0)return;let t=`expenses-week-of-${q().week.start}.csv`;try{p(t,he(e),me)}catch{V(w,`Couldn't export the CSV: this browser refused to create the file. Nothing was changed.`,`error`);return}V(w,`Downloaded ${t} with ${e.length} ${Ie(e.length)}.`,`success`)});function Le(){return k!==``||O!==`All`||A!==`newest`}h(`#reset-filters`).addEventListener(`click`,()=>{X.value=``,k=``,O=`All`,A=`newest`,$(),V(w,`Filters reset: showing every expense, newest first.`,`success`),h(`#list-heading`).focus()}),h(`#category-filter`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-filter]`);if(t===null)return;let n=t.dataset.filter;O=n!==void 0&&g(n)?n:`All`,w.textContent=``,$()});function Re(e){return e<v(I.budgetCents,I.expenses,c()).week.start}function ze(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??h(`#list-heading`)).focus()}h(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);n===null?r!==null&&Ae(r.dataset.editId):Ve(n.dataset.deleteId)});let Z=h(`#delete-dialog`),Be=null;function Ve(e){let t=I.expenses.find(t=>t.id===e);t!==void 0&&(Be=e,h(`#delete-question`).textContent=`Delete ${ve(t)}?`,ye(Z),h(`#cancel-delete`).focus())}function He(){let e=Be;return Be=null,be(Z),e}function Ue(){ze(`delete`,He())}h(`#cancel-delete`).addEventListener(`click`,Ue),h(`#confirm-delete`).addEventListener(`click`,()=>{let e=He();e!==null&&We(e)}),Z.addEventListener(`cancel`,e=>{e.preventDefault(),Ue()}),Z.addEventListener(`click`,e=>{e.target===Z&&Ue()});function We(t){let n=I.expenses.find(e=>e.id===t);if(n===void 0)return;let r=ve(n),i=J().map(e=>e.id).indexOf(t);if(!Q({...I,expenses:I.expenses.filter(e=>e.id!==t)})){V(w,L,`error`);return}E===t&&K(),V(w,`Deleted ${r}.`,`success`),$();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??h(`#list-heading`)).focus()}function Q(e){return oe(r,e)?(I=e,!0):!1}function $(){let t=c(),n=D<0,r=q(),i=D===0?`This week`:D===-1?`Last week`:`${-D} weeks ago`,a=ee(r.week,t.getFullYear());h(`#week-range`).textContent=`${i}: ${a}`,h(`#past-note`).textContent=`To add an expense for ${a}, tap Back to this week, then choose a date in that range in the Add an expense form.`,h(`#next-week`).hidden=!n,h(`#this-week`).hidden=!n,h(`#past-note`).hidden=!n,h(`#add-section`).hidden=n&&E===null,h(`#budget-section`).hidden=n,h(`#backup-section`).hidden=n,h(`#month-section`).hidden=n,h(`#totals`).hidden=n,h(`#breakdown-heading`).textContent=n?`Spent by category that week`:`Spent by category this week`;let o=h(`#remaining`),s=h(`#summary`),l=n?null:r.remainingCents;s.classList.toggle(`past`,n),s.classList.toggle(`over`,l!==null&&l<0),s.classList.toggle(`unset`,!n&&l===null),h(`#set-budget-button`).hidden=n||l!==null,o.textContent=n?`${T(r.spentCents)} spent that week`:r.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:r.remainingCents>=0?`${T(r.remainingCents)} left this week`:`Over budget by ${T(-r.remainingCents)}`,h(`#budget-total`).textContent=I.budgetCents===null?`Not set`:T(I.budgetCents),h(`#spent-total`).textContent=T(r.spentCents);let u=h(`#meter`);if(u.hidden=n||I.budgetCents===null,I.budgetCents!==null){let e=Math.min(1,r.spentCents/I.budgetCents);h(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}h(`#category-breakdown`).hidden=r.byCategory.length===0,h(`#category-totals`).replaceChildren(...r.byCategory.map(we)),qe();let d=J(),f=n?`that week`:`this week`,p=h(`#list-heading`),m=h(`#empty-list`),g=k!==``;if(O===`All`&&!g||r.expenses.length===0)p.textContent=`${n?`Expenses that week`:`This week's expenses`} (${r.expenses.length})`,m.textContent=n?`No expenses that week.`:`No expenses this week yet.`;else{let e=O===`All`?``:`${O} `;p.textContent=`${n?O===`All`?`Expenses that week`:`${O} expenses that week`:`This week's ${e}expenses`}${g?` matching "${k}"`:``} (${d.length} of ${r.expenses.length})`,m.textContent=g?`No ${e}expenses ${f} match "${k}". Check the spelling or tap Clear search.`:`No ${O} expenses ${f}.`}m.hidden=d.length>0,h(`#category-filter`).hidden=r.expenses.length===0,h(`#expense-search-area`).hidden=r.expenses.length===0&&!g,h(`#clear-search`).hidden=!g,h(`#sort-area`).hidden=r.expenses.length===0,h(`#reset-filters`).hidden=!Le()||r.expenses.length===0&&!g,Ge(d,r.expenses.length),Ke(d,r.expenses.length,a),h(`#sort-order`).value=A,e.querySelectorAll(`#category-filter button`).forEach(e=>{e.setAttribute(`aria-pressed`,String(e.dataset.filter===O))}),h(`#expense-list`).replaceChildren(...d.map(Je))}function Ge(e,t){let n=h(`#shown-subtotal`);n.hidden=t===0||k===``&&O===`All`;let r=e.reduce((e,t)=>e+t.amountCents,0),i=t===1?`expense`:`expenses`;n.textContent=`Showing ${e.length} of ${t} ${i} · ${T(r)}`}function Ke(e,t,n){h(`#export-area`).hidden=t===0,h(`#export-csv`).disabled=e.length===0,h(`#export-summary`).textContent=e.length===0?`Nothing to export: no expenses match the search and category.`:`Exports ${e.length} ${Ie(e.length)} from ${n}, ${Se[A]} (date, description, category, amount).`}function qe(){let e=f(d(c()),j),t=re(I.expenses,e),n=m(e);h(`#month-name`).textContent=j===0?`This month: ${n}`:n,h(`#next-month`).hidden=j===0;let r=`${t.expenseCount} ${t.expenseCount===1?`expense`:`expenses`}`;h(`#month-spent`).textContent=t.expenseCount===0?`No expenses in ${n}.`:`${T(t.spentCents)} spent in ${n} (${r})`,h(`#month-breakdown`).hidden=t.byCategory.length===0,h(`#month-category-totals`).replaceChildren(...t.byCategory.map(we))}function Je(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=u(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=T(e.amountCents),t.classList.toggle(`editing`,e.id===E);let s=document.createElement(`div`);return s.className=`row-actions`,s.append(Ye(`Edit`,`edit`,e),Ye(`Delete`,`delete`,e)),t.append(n,o,s),t}function Ye(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${T(n.amountCents)})`),r}function Xe(){let e=h(`#load-notice`);e.textContent={ok:``,skipped:F.status===`skipped`?`${F.skipped===1?`1 saved expense`:`${F.skipped} saved expenses`} couldn't be read and ${F.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[F.status],e.hidden=F.status===`ok`}}function Ce(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function z(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function we({category:e,cents:t}){let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=T(t),n.append(r,i),n}function B(...e){return e.filter(e=>e!==null).join(` `)}function V(e,t,n){e.textContent=t,e.dataset.kind=n}function H(e){try{return window[e]}catch{return Te}}var Te={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};R(document.querySelector(`#app`),H(`localStorage`),{tabStorage:H(`sessionStorage`)});