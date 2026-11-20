(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function u(e,t=!1){return(t?l:c).format(r(e))}function ee(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${u(e.start,n)} – ${u(e.end,n)}`}function d(e){return t(e).slice(0,7)}function te(e,t){let[n,r]=e.split(`-`).map(Number);return d(new Date(n,r-1+t,1))}var f=new Intl.DateTimeFormat(`en-US`,{month:`long`,year:`numeric`});function p(e){let[t,n]=e.split(`-`).map(Number);return f.format(new Date(t,n-1,1))}var m=[`Food`,`Transport`,`School`,`Fun`,`Other`];function h(e){return m.includes(e)}function g(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=_(o);return{week:r,expenses:o,spentCents:s,byCategory:v(o),remainingCents:e===null?null:e-s}}function ne(e,t){let n=e.filter(e=>e.date.startsWith(`${t}-`));return{month:t,expenseCount:n.length,spentCents:_(n),byCategory:v(n)}}function _(e){return e.reduce((e,t)=>e+t.amountCents,0)}function v(e){return m.map(t=>({category:t,cents:_(e.filter(e=>e.category===t))})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents)}var y=1e7,b=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function x(e){let t=e.trim().replace(/,/g,``),n=b.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var S=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function C(e){return S.format(e/100)}function re(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=x(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${C(y)}.`}:{cents:n}}var w=`college-budget-tracker:data`,T=`college-budget-tracker:damaged-backup`,E=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function D(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!E(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:h(t.category)?t.category:`Other`}}var O=()=>({budgetCents:null,expenses:[]});function ie(e){let t;try{t=e.getItem(w)}catch{return{status:`unavailable`,data:O()}}if(t===null)return{status:`ok`,data:O()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(T,t)}catch{}return{status:`damaged`,data:O()}}let i=E(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(D).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function ae(e,t){try{return e.setItem(w,JSON.stringify(t)),!0}catch{return!1}}var k=`College Budget Tracker`;function oe(e,n){let r={app:k,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var A=e=>e===1?`1 expense`:`${e} expenses`,j=e=>e===null?`no weekly budget`:`a ${C(e)} weekly budget`;function se(e,t){return`Downloaded ${t}: ${A(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${C(e.budgetCents)} weekly budget`}.`}function ce(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=document.createElement(`a`);r.href=n,r.download=e,r.hidden=!0,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}var M=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function le(e){let t;try{t=JSON.parse(e)}catch{return{error:M}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==k||!Array.isArray(n.expenses))return{error:M};if(n.budgetCents!==null&&!E(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=D(e);if(t===null||!h(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function ue(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${u(t[0],!0)} to ${u(t[t.length-1],!0)}`;return`It has ${j(e.budgetCents)} and ${A(e.expenses.length)}${n}.`}function de(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${C(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${A(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function fe(e,t){return`Restored ${t}: ${A(e.expenses.length)} and ${j(e.budgetCents)}.`}var pe=`college-budget-tracker:viewed-week`,N=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,me=`
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
    <div id="category-filter" class="category-filter" role="group" aria-label="Show expenses in category">
      ${[`All`,...m].map(e=>`<button type="button" class="filter-button" data-filter="${e}" aria-pressed="${e===`All`}">${e}</button>`).join(``)}
    </div>
    <p id="empty-list" class="muted">No expenses this week yet.</p>
    <ul id="expense-list" class="expense-list"></ul>
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
`;function P(e){return`${e.description} (${C(e.amountCents)})`}function he(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function ge(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function _e(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function F(e,r,i={}){let c=i.now??(()=>new Date),l=i.newId??_e,f=i.download??ce;e.innerHTML=me;let m=t=>e.querySelector(t),_=m(`#expense-form`),v=m(`#expense-amount`),y=m(`#expense-description`),b=m(`#expense-date`),x=m(`#expense-category`),S=m(`#expense-status`),w=m(`#list-status`),T=null,E=ye(),D=`All`,O=0,k=m(`#budget-form`),A=m(`#budget-amount`),j=m(`#budget-status`),M=ie(r),F=M.data;Fe(),A.value=F.budgetCents===null?``:(F.budgetCents/100).toFixed(2),b.value=t(c()),Z(),m(`#previous-month`).addEventListener(`click`,()=>{--O,Q()}),m(`#next-month`).addEventListener(`click`,()=>{O=Math.min(0,O+1),Q(),O===0&&m(`#previous-month`).focus()}),m(`#previous-week`).addEventListener(`click`,()=>B(E-1)),m(`#next-week`).addEventListener(`click`,()=>{B(E+1),E===0&&m(`#previous-week`).focus()}),m(`#this-week`).addEventListener(`click`,()=>{B(0),m(`#previous-week`).focus()});function B(e){T!==null&&W(),E=e,be(),S.textContent=``,w.textContent=``,m(`#backup-status`).textContent=``,U(),Z()}function ye(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,o(e,c())):0}catch{return 0}}function be(){try{E===0?i.tabStorage?.removeItem(pe):i.tabStorage?.setItem(pe,G().week.start)}catch{}}m(`#download-backup`).addEventListener(`click`,()=>{let e=m(`#backup-status`),{filename:t,text:n}=oe(F,c());try{f(t,n)}catch{z(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}z(e,se(F,t),`success`)});let V=null,H=m(`#restore-file`);m(`#restore-backup`).addEventListener(`click`,()=>H.click()),H.addEventListener(`change`,async()=>{let e=H.files?.[0];if(H.value=``,e===void 0)return;U();let t=m(`#backup-status`);if(e.size>2e6){z(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{z(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=le(n);if(`error`in r){z(t,r.error,`error`);return}V={filename:e.name,data:r.data},t.textContent=``,m(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,m(`#restore-summary`).textContent=ue(r.data),m(`#restore-warning`).textContent=de(F);let i=m(`#restore-preview`);i.hidden=!1,i.focus()}),m(`#cancel-restore`).addEventListener(`click`,()=>{U(),z(m(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),m(`#restore-backup`).focus()}),m(`#confirm-restore`).addEventListener(`click`,()=>{if(V===null)return;let{filename:e,data:t}=V,n=m(`#backup-status`);X(t)?(U(),T!==null&&W(),A.value=F.budgetCents===null?``:(F.budgetCents/100).toFixed(2),j.textContent=``,S.textContent=``,w.textContent=``,Z(),z(n,fe(t,e),`success`),m(`#restore-backup`).focus()):(U(),z(n,N,`error`),m(`#restore-backup`).focus())});function U(){V=null,m(`#restore-preview`).hidden=!0}m(`#set-budget-button`).addEventListener(`click`,()=>{A.scrollIntoView({block:`center`}),A.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Z()}),k.addEventListener(`submit`,e=>{e.preventDefault(),L(k);let t=re(A.value,`budget`);`error`in t?(I(A,t.error),A.focus(),j.textContent=``):X({...F,budgetCents:t.cents})?(A.value=(t.cents/100).toFixed(2),z(j,`Weekly budget saved: ${C(t.cents)}.`,`success`),Z()):z(j,N,`error`)}),_.addEventListener(`submit`,e=>{e.preventDefault();let t=xe();t!==null&&(T===null?Se({id:l(),...t}):Ce({id:T,...t}))}),m(`#cancel-edit`).addEventListener(`click`,()=>{let e=T;W(),z(w,`Edit canceled. Nothing was changed.`,`success`),K(`edit`,e)});function xe(){L(_);let e=[],t=re(v.value,`amount`);`error`in t&&e.push([v,t.error]);let r=y.value.trim().replace(/\s+/g,` `);r===``&&e.push([y,`Say what it was for, like Lunch or Bus fare.`]);let i=x.value;return h(i)||e.push([x,`Choose a category, like Food or Transport.`]),n(b.value)||e.push([b,`Pick the date you spent it.`]),e.length>0||`error`in t||!h(i)?(e.forEach(([e,t])=>I(e,t)),e[0][0].focus(),S.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:b.value}}function Se(e){if(!X({...F,expenses:[...F.expenses,e]})){z(S,N,`error`);return}let t=`Added ${e.description} (${C(e.amountCents)}).`,n=`${t} It's dated ${u(e.date)}, outside this week, so it isn't counted above.`,r=we(e.date);De(e.date)?z(S,R(t,ke(e),r),r===null?`success`:`warning`):z(S,Ae(e.date)?`${n} Tap Previous week to see it.`:n,`success`),Ee(),v.focus(),Z()}function Ce(e){let t=F.expenses.map(t=>t.id===e.id?e:t);if(!X({...F,expenses:t})){z(S,N,`error`);return}let n=`Saved ${e.description} (${C(e.amountCents)}).`,r=we(e.date),i=r===null?`success`:`warning`;if(W(),Z(),a(e.date,G().week))z(w,R(n,ke(e),r),i),K(`edit`,e.id);else{let t=E===0?`this week`:`that week`,a=`It's now dated ${u(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`;z(w,R(n,a,r),i),m(`#list-heading`).focus()}}function we(e){if(!De(e))return null;let t=g(F.budgetCents,F.expenses,c()).remainingCents;return t!==null&&t<0?`You're now over budget by ${C(-t)}.`:null}function Te(e){let t=F.expenses.find(t=>t.id===e);t!==void 0&&(T=e,L(_),S.textContent=``,w.textContent=``,m(`#add-heading`).textContent=`Editing: ${t.description}`,m(`#expense-submit`).textContent=`Save changes`,m(`#cancel-edit`).hidden=!1,v.value=(t.amountCents/100).toFixed(2),y.value=t.description,b.value=t.date,x.value=t.category,Z(),_.closest(`section`).scrollIntoView({block:`start`}),v.focus())}function W(){T=null,L(_),S.textContent=``,m(`#add-heading`).textContent=`Add an expense`,m(`#expense-submit`).textContent=`Add expense`,m(`#cancel-edit`).hidden=!0,Ee(),Z()}function Ee(){v.value=``,y.value=``,b.value=t(c()),x.value=``}function De(e){return a(e,g(F.budgetCents,F.expenses,c()).week)}function G(){return g(F.budgetCents,F.expenses,s(c(),E))}function Oe(){let{expenses:e}=G();return D===`All`?e:e.filter(e=>e.category===D)}function ke(e){return D===`All`||e.category===D?null:`It's under ${e.category}, so it's hidden while ${D} is selected.`}m(`#category-filter`).addEventListener(`click`,e=>{let t=e.target.closest(`button[data-filter]`);if(t===null)return;let n=t.dataset.filter;D=n!==void 0&&h(n)?n:`All`,w.textContent=``,Z()});function Ae(e){return e<g(F.budgetCents,F.expenses,c()).week.start}function K(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??m(`#list-heading`)).focus()}m(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);n===null?r!==null&&Te(r.dataset.editId):je(n.dataset.deleteId)});let q=m(`#delete-dialog`),J=null;function je(e){let t=F.expenses.find(t=>t.id===e);t!==void 0&&(J=e,m(`#delete-question`).textContent=`Delete ${P(t)}?`,he(q),m(`#cancel-delete`).focus())}function Me(){let e=J;return J=null,ge(q),e}function Y(){K(`delete`,Me())}m(`#cancel-delete`).addEventListener(`click`,Y),m(`#confirm-delete`).addEventListener(`click`,()=>{let e=Me();e!==null&&Ne(e)}),q.addEventListener(`cancel`,e=>{e.preventDefault(),Y()}),q.addEventListener(`click`,e=>{e.target===q&&Y()});function Ne(t){let n=F.expenses.find(e=>e.id===t);if(n===void 0)return;let r=P(n),i=Oe().map(e=>e.id).indexOf(t);if(!X({...F,expenses:F.expenses.filter(e=>e.id!==t)})){z(w,N,`error`);return}T===t&&W(),z(w,`Deleted ${r}.`,`success`),Z();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??m(`#list-heading`)).focus()}function X(e){return ae(r,e)?(F=e,!0):!1}function Z(){let t=c(),n=E<0,r=G(),i=E===0?`This week`:E===-1?`Last week`:`${-E} weeks ago`,a=ee(r.week,t.getFullYear());m(`#week-range`).textContent=`${i}: ${a}`,m(`#past-note`).textContent=`To add an expense for ${a}, tap Back to this week, then choose a date in that range in the Add an expense form.`,m(`#next-week`).hidden=!n,m(`#this-week`).hidden=!n,m(`#past-note`).hidden=!n,m(`#add-section`).hidden=n&&T===null,m(`#budget-section`).hidden=n,m(`#backup-section`).hidden=n,m(`#month-section`).hidden=n,m(`#totals`).hidden=n,m(`#breakdown-heading`).textContent=n?`Spent by category that week`:`Spent by category this week`;let o=m(`#remaining`),s=m(`#summary`),l=n?null:r.remainingCents;s.classList.toggle(`past`,n),s.classList.toggle(`over`,l!==null&&l<0),s.classList.toggle(`unset`,!n&&l===null),m(`#set-budget-button`).hidden=n||l!==null,o.textContent=n?`${C(r.spentCents)} spent that week`:r.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:r.remainingCents>=0?`${C(r.remainingCents)} left this week`:`Over budget by ${C(-r.remainingCents)}`,m(`#budget-total`).textContent=F.budgetCents===null?`Not set`:C(F.budgetCents),m(`#spent-total`).textContent=C(r.spentCents);let u=m(`#meter`);if(u.hidden=n||F.budgetCents===null,F.budgetCents!==null){let e=Math.min(1,r.spentCents/F.budgetCents);m(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}m(`#category-breakdown`).hidden=r.byCategory.length===0,m(`#category-totals`).replaceChildren(...r.byCategory.map(ve)),Q();let d=Oe(),te=n?`that week`:`this week`,f=m(`#list-heading`),p=m(`#empty-list`);D===`All`||r.expenses.length===0?(f.textContent=`${n?`Expenses that week`:`This week's expenses`} (${r.expenses.length})`,p.textContent=n?`No expenses that week.`:`No expenses this week yet.`):(f.textContent=`${n?`${D} expenses that week`:`This week's ${D} expenses`} (${d.length} of ${r.expenses.length})`,p.textContent=`No ${D} expenses ${te}.`),p.hidden=d.length>0,m(`#category-filter`).hidden=r.expenses.length===0,e.querySelectorAll(`#category-filter button`).forEach(e=>{e.setAttribute(`aria-pressed`,String(e.dataset.filter===D))}),m(`#expense-list`).replaceChildren(...d.map(Pe))}function Q(){let e=te(d(c()),O),t=ne(F.expenses,e),n=p(e);m(`#month-name`).textContent=O===0?`This month: ${n}`:n,m(`#next-month`).hidden=O===0;let r=`${t.expenseCount} ${t.expenseCount===1?`expense`:`expenses`}`;m(`#month-spent`).textContent=t.expenseCount===0?`No expenses in ${n}.`:`${C(t.spentCents)} spent in ${n} (${r})`,m(`#month-breakdown`).hidden=t.byCategory.length===0,m(`#month-category-totals`).replaceChildren(...t.byCategory.map(ve))}function Pe(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=u(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=C(e.amountCents),t.classList.toggle(`editing`,e.id===T);let s=document.createElement(`div`);return s.className=`row-actions`,s.append($(`Edit`,`edit`,e),$(`Delete`,`delete`,e)),t.append(n,o,s),t}function $(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${C(n.amountCents)})`),r}function Fe(){let e=m(`#load-notice`);e.textContent={ok:``,skipped:M.status===`skipped`?`${M.skipped===1?`1 saved expense`:`${M.skipped} saved expenses`} couldn't be read and ${M.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[M.status],e.hidden=M.status===`ok`}}function I(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function L(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function ve({category:e,cents:t}){let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=C(t),n.append(r,i),n}function R(...e){return e.filter(e=>e!==null).join(` `)}function z(e,t,n){e.textContent=t,e.dataset.kind=n}function B(e){try{return window[e]}catch{return ye}}var ye={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};F(document.querySelector(`#app`),B(`localStorage`),{tabStorage:B(`sessionStorage`)});