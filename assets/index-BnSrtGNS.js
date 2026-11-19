(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function u(e,t=!1){return(t?l:c).format(r(e))}function d(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${u(e.start,n)} – ${u(e.end,n)}`}var f=[`Food`,`Transport`,`School`,`Fun`,`Other`];function p(e){return f.includes(e)}function m(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=o.reduce((e,t)=>e+t.amountCents,0);return{week:r,expenses:o,spentCents:s,byCategory:f.map(e=>({category:e,cents:o.filter(t=>t.category===e).reduce((e,t)=>e+t.amountCents,0)})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents),remainingCents:e===null?null:e-s}}var h=1e7,g=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function _(e){let t=e.trim().replace(/,/g,``),n=g.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var v=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function y(e){return v.format(e/100)}function b(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=_(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${y(h)}.`}:{cents:n}}var x=`college-budget-tracker:data`,S=`college-budget-tracker:damaged-backup`,C=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function w(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!C(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:p(t.category)?t.category:`Other`}}var T=()=>({budgetCents:null,expenses:[]});function ee(e){let t;try{t=e.getItem(x)}catch{return{status:`unavailable`,data:T()}}if(t===null)return{status:`ok`,data:T()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(S,t)}catch{}return{status:`damaged`,data:T()}}let i=C(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(w).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function te(e,t){try{return e.setItem(x,JSON.stringify(t)),!0}catch{return!1}}var E=`College Budget Tracker`;function D(e,n){let r={app:E,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var O=e=>e===1?`1 expense`:`${e} expenses`,k=e=>e===null?`no weekly budget`:`a ${y(e)} weekly budget`;function ne(e,t){return`Downloaded ${t}: ${O(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${y(e.budgetCents)} weekly budget`}.`}function re(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=document.createElement(`a`);r.href=n,r.download=e,r.hidden=!0,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}var A=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function ie(e){let t;try{t=JSON.parse(e)}catch{return{error:A}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==E||!Array.isArray(n.expenses))return{error:A};if(n.budgetCents!==null&&!C(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=w(e);if(t===null||!p(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function ae(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${u(t[0],!0)} to ${u(t[t.length-1],!0)}`;return`It has ${k(e.budgetCents)} and ${O(e.expenses.length)}${n}.`}function oe(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${y(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${O(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function se(e,t){return`Restored ${t}: ${O(e.expenses.length)} and ${k(e.budgetCents)}.`}var j=`college-budget-tracker:viewed-week`,M=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,ce=`
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
          ${f.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
    <p id="empty-list" class="muted">No expenses this week yet.</p>
    <ul id="expense-list" class="expense-list"></ul>
    <p id="list-status" class="status" role="status"></p>
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
`;function N(e){return`${e.description} (${y(e.amountCents)})`}function le(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function ue(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function de(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function P(e,r,i={}){let c=i.now??(()=>new Date),l=i.newId??de,f=i.download??re;e.innerHTML=ce;let h=t=>e.querySelector(t),g=h(`#expense-form`),_=h(`#expense-amount`),v=h(`#expense-description`),x=h(`#expense-date`),S=h(`#expense-category`),C=h(`#expense-status`),w=h(`#list-status`),T=null,E=fe(),O=h(`#budget-form`),k=h(`#budget-amount`),A=h(`#budget-status`),P=ee(r),R=P.data;Ce(),k.value=R.budgetCents===null?``:(R.budgetCents/100).toFixed(2),x.value=t(c()),Q(),h(`#previous-week`).addEventListener(`click`,()=>z(E-1)),h(`#next-week`).addEventListener(`click`,()=>{z(E+1),E===0&&h(`#previous-week`).focus()}),h(`#this-week`).addEventListener(`click`,()=>{z(0),h(`#previous-week`).focus()});function z(e){T!==null&&U(),E=e,pe(),C.textContent=``,w.textContent=``,h(`#backup-status`).textContent=``,H(),Q()}function fe(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,o(e,c())):0}catch{return 0}}function pe(){try{E===0?i.tabStorage?.removeItem(j):i.tabStorage?.setItem(j,G().week.start)}catch{}}h(`#download-backup`).addEventListener(`click`,()=>{let e=h(`#backup-status`),{filename:t,text:n}=D(R,c());try{f(t,n)}catch{L(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}L(e,ne(R,t),`success`)});let B=null,V=h(`#restore-file`);h(`#restore-backup`).addEventListener(`click`,()=>V.click()),V.addEventListener(`change`,async()=>{let e=V.files?.[0];if(V.value=``,e===void 0)return;H();let t=h(`#backup-status`);if(e.size>2e6){L(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{L(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=ie(n);if(`error`in r){L(t,r.error,`error`);return}B={filename:e.name,data:r.data},t.textContent=``,h(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,h(`#restore-summary`).textContent=ae(r.data),h(`#restore-warning`).textContent=oe(R);let i=h(`#restore-preview`);i.hidden=!1,i.focus()}),h(`#cancel-restore`).addEventListener(`click`,()=>{H(),L(h(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),h(`#restore-backup`).focus()}),h(`#confirm-restore`).addEventListener(`click`,()=>{if(B===null)return;let{filename:e,data:t}=B,n=h(`#backup-status`);Z(t)?(H(),T!==null&&U(),k.value=R.budgetCents===null?``:(R.budgetCents/100).toFixed(2),A.textContent=``,C.textContent=``,w.textContent=``,Q(),L(n,se(t,e),`success`),h(`#restore-backup`).focus()):(H(),L(n,M,`error`),h(`#restore-backup`).focus())});function H(){B=null,h(`#restore-preview`).hidden=!0}h(`#set-budget-button`).addEventListener(`click`,()=>{k.scrollIntoView({block:`center`}),k.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Q()}),O.addEventListener(`submit`,e=>{e.preventDefault(),I(O);let t=b(k.value,`budget`);`error`in t?(F(k,t.error),k.focus(),A.textContent=``):Z({...R,budgetCents:t.cents})?(k.value=(t.cents/100).toFixed(2),L(A,`Weekly budget saved: ${y(t.cents)}.`,`success`),Q()):L(A,M,`error`)}),g.addEventListener(`submit`,e=>{e.preventDefault();let t=me();t!==null&&(T===null?he({id:l(),...t}):ge({id:T,...t}))}),h(`#cancel-edit`).addEventListener(`click`,()=>{let e=T;U(),L(w,`Edit canceled. Nothing was changed.`,`success`),K(`edit`,e)});function me(){I(g);let e=[],t=b(_.value,`amount`);`error`in t&&e.push([_,t.error]);let r=v.value.trim().replace(/\s+/g,` `);r===``&&e.push([v,`Say what it was for, like Lunch or Bus fare.`]);let i=S.value;return p(i)||e.push([S,`Choose a category, like Food or Transport.`]),n(x.value)||e.push([x,`Pick the date you spent it.`]),e.length>0||`error`in t||!p(i)?(e.forEach(([e,t])=>F(e,t)),e[0][0].focus(),C.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:x.value}}function he(e){if(!Z({...R,expenses:[...R.expenses,e]})){L(C,M,`error`);return}let t=`Added ${e.description} (${y(e.amountCents)}).`,n=`${t} It's dated ${u(e.date)}, outside this week, so it isn't counted above.`;if(!ve(e.date))L(C,ye(e.date)?`${n} Tap Previous week to see it.`:n,`success`);else{let e=m(R.budgetCents,R.expenses,c()).remainingCents;e!==null&&e<0?L(C,`${t} You're now over budget by ${y(-e)}.`,`warning`):L(C,t,`success`)}W(),_.focus(),Q()}function ge(e){let t=R.expenses.map(t=>t.id===e.id?e:t);if(!Z({...R,expenses:t})){L(C,M,`error`);return}let n=`Saved ${e.description} (${y(e.amountCents)}).`;if(U(),Q(),a(e.date,G().week))L(w,n,`success`),K(`edit`,e.id);else{let t=E===0?`this week`:`that week`;L(w,`${n} It's now dated ${u(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`,`success`),h(`#list-heading`).focus()}}function _e(e){let t=R.expenses.find(t=>t.id===e);t!==void 0&&(T=e,I(g),C.textContent=``,w.textContent=``,h(`#add-heading`).textContent=`Editing: ${t.description}`,h(`#expense-submit`).textContent=`Save changes`,h(`#cancel-edit`).hidden=!1,_.value=(t.amountCents/100).toFixed(2),v.value=t.description,x.value=t.date,S.value=t.category,Q(),g.closest(`section`).scrollIntoView({block:`start`}),_.focus())}function U(){T=null,I(g),C.textContent=``,h(`#add-heading`).textContent=`Add an expense`,h(`#expense-submit`).textContent=`Add expense`,h(`#cancel-edit`).hidden=!0,W(),Q()}function W(){_.value=``,v.value=``,x.value=t(c()),S.value=``}function ve(e){return a(e,m(R.budgetCents,R.expenses,c()).week)}function G(){return m(R.budgetCents,R.expenses,s(c(),E))}function ye(e){return e<m(R.budgetCents,R.expenses,c()).week.start}function K(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??h(`#list-heading`)).focus()}h(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);n===null?r!==null&&_e(r.dataset.editId):be(n.dataset.deleteId)});let q=h(`#delete-dialog`),J=null;function be(e){let t=R.expenses.find(t=>t.id===e);t!==void 0&&(J=e,h(`#delete-question`).textContent=`Delete ${N(t)}?`,le(q),h(`#cancel-delete`).focus())}function Y(){let e=J;return J=null,ue(q),e}function X(){K(`delete`,Y())}h(`#cancel-delete`).addEventListener(`click`,X),h(`#confirm-delete`).addEventListener(`click`,()=>{let e=Y();e!==null&&xe(e)}),q.addEventListener(`cancel`,e=>{e.preventDefault(),X()}),q.addEventListener(`click`,e=>{e.target===q&&X()});function xe(t){let n=R.expenses.find(e=>e.id===t);if(n===void 0)return;let r=N(n),i=G().expenses.map(e=>e.id).indexOf(t);if(!Z({...R,expenses:R.expenses.filter(e=>e.id!==t)})){L(w,M,`error`);return}T===t&&U(),L(w,`Deleted ${r}.`,`success`),Q();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??h(`#list-heading`)).focus()}function Z(e){return te(r,e)?(R=e,!0):!1}function Q(){let e=c(),t=E<0,n=G(),r=E===0?`This week`:E===-1?`Last week`:`${-E} weeks ago`,i=d(n.week,e.getFullYear());h(`#week-range`).textContent=`${r}: ${i}`,h(`#past-note`).textContent=`To add an expense for ${i}, tap Back to this week, then choose a date in that range in the Add an expense form.`,h(`#next-week`).hidden=!t,h(`#this-week`).hidden=!t,h(`#past-note`).hidden=!t,h(`#add-section`).hidden=t&&T===null,h(`#budget-section`).hidden=t,h(`#backup-section`).hidden=t,h(`#totals`).hidden=t,h(`#breakdown-heading`).textContent=t?`Spent by category that week`:`Spent by category this week`;let a=h(`#remaining`),o=h(`#summary`),s=t?null:n.remainingCents;o.classList.toggle(`past`,t),o.classList.toggle(`over`,s!==null&&s<0),o.classList.toggle(`unset`,!t&&s===null),h(`#set-budget-button`).hidden=t||s!==null,a.textContent=t?`${y(n.spentCents)} spent that week`:n.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:n.remainingCents>=0?`${y(n.remainingCents)} left this week`:`Over budget by ${y(-n.remainingCents)}`,h(`#budget-total`).textContent=R.budgetCents===null?`Not set`:y(R.budgetCents),h(`#spent-total`).textContent=y(n.spentCents);let l=h(`#meter`);if(l.hidden=t||R.budgetCents===null,R.budgetCents!==null){let e=Math.min(1,n.spentCents/R.budgetCents);h(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}h(`#category-breakdown`).hidden=n.byCategory.length===0,h(`#category-totals`).replaceChildren(...n.byCategory.map(({category:e,cents:t})=>{let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=y(t),n.append(r,i),n})),h(`#list-heading`).textContent=`${t?`Expenses that week`:`This week's expenses`} (${n.expenses.length})`;let u=h(`#empty-list`);u.textContent=t?`No expenses that week.`:`No expenses this week yet.`,u.hidden=n.expenses.length>0,h(`#expense-list`).replaceChildren(...n.expenses.map(Se))}function Se(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=u(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=y(e.amountCents),t.classList.toggle(`editing`,e.id===T);let s=document.createElement(`div`);return s.className=`row-actions`,s.append($(`Edit`,`edit`,e),$(`Delete`,`delete`,e)),t.append(n,o,s),t}function $(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${y(n.amountCents)})`),r}function Ce(){let e=h(`#load-notice`);e.textContent={ok:``,skipped:P.status===`skipped`?`${P.skipped===1?`1 saved expense`:`${P.skipped} saved expenses`} couldn't be read and ${P.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[P.status],e.hidden=P.status===`ok`}}function F(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function I(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function L(e,t,n){e.textContent=t,e.dataset.kind=n}function R(e){try{return window[e]}catch{return z}}var z={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};P(document.querySelector(`#app`),R(`localStorage`),{tabStorage:R(`sessionStorage`)});