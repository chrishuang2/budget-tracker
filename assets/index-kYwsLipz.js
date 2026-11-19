(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){let n=r(i(r(e)).start),a=r(i(t).start),o=(n.getTime()-a.getTime())/864e5;return Math.round(o/7)}function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),l=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function u(e,t=!1){return(t?l:c).format(r(e))}function ee(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${u(e.start,n)} – ${u(e.end,n)}`}var d=[`Food`,`Transport`,`School`,`Fun`,`Other`];function f(e){return d.includes(e)}function p(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=o.reduce((e,t)=>e+t.amountCents,0);return{week:r,expenses:o,spentCents:s,byCategory:d.map(e=>({category:e,cents:o.filter(t=>t.category===e).reduce((e,t)=>e+t.amountCents,0)})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents),remainingCents:e===null?null:e-s}}var m=1e7,h=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function g(e){let t=e.trim().replace(/,/g,``),n=h.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var _=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function v(e){return _.format(e/100)}function y(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=g(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${v(m)}.`}:{cents:n}}var b=`college-budget-tracker:data`,x=`college-budget-tracker:damaged-backup`,S=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function C(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!S(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:f(t.category)?t.category:`Other`}}var w=()=>({budgetCents:null,expenses:[]});function te(e){let t;try{t=e.getItem(b)}catch{return{status:`unavailable`,data:w()}}if(t===null)return{status:`ok`,data:w()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(x,t)}catch{}return{status:`damaged`,data:w()}}let i=S(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(C).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function ne(e,t){try{return e.setItem(b,JSON.stringify(t)),!0}catch{return!1}}var T=`College Budget Tracker`;function re(e,n){let r={app:T,exportedAt:n.toISOString(),budgetCents:e.budgetCents,expenses:e.expenses};return{filename:`budget-backup-${t(n)}.json`,text:`${JSON.stringify(r,null,2)}\n`}}var E=e=>e===1?`1 expense`:`${e} expenses`,D=e=>e===null?`no weekly budget`:`a ${v(e)} weekly budget`;function ie(e,t){return`Downloaded ${t}: ${E(e.expenses.length)} and ${e.budgetCents===null?`no weekly budget set`:`your ${v(e.budgetCents)} weekly budget`}.`}function ae(e,t){let n=URL.createObjectURL(new Blob([t],{type:`application/json`})),r=document.createElement(`a`);r.href=n,r.download=e,r.hidden=!0,document.body.append(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}var O=`This file isn't a backup from Download backup in College Budget Tracker, so nothing was restored.`;function oe(e){let t;try{t=JSON.parse(e)}catch{return{error:O}}let n=typeof t==`object`&&t?t:null;if(n===null||n.app!==T||!Array.isArray(n.expenses))return{error:O};if(n.budgetCents!==null&&!S(n.budgetCents))return{error:`This backup's weekly budget couldn't be read, so nothing was restored.`};let r=[];for(let e of n.expenses){let t=C(e);if(t===null||!f(e.category)){let e=n.expenses.length;return{error:`An expense in this backup (${r.length+1} of ${e}) couldn't be read, so nothing was restored.`}}r.push(t)}return new Set(r.map(e=>e.id)).size===r.length?{data:{budgetCents:n.budgetCents,expenses:r}}:{error:`This backup lists the same expense twice, so nothing was restored.`}}function se(e){let t=e.expenses.map(e=>e.date).sort(),n=t.length===0?``:`, from ${u(t[0],!0)} to ${u(t[t.length-1],!0)}`;return`It has ${D(e.budgetCents)} and ${E(e.expenses.length)}${n}.`}function ce(e){return`Restoring will replace your current ${e.budgetCents===null?`weekly budget (not set)`:`${v(e.budgetCents)} weekly budget`} and ${e.expenses.length===0?`your expenses (none yet)`:`all ${E(e.expenses.length)} you have now`} with the backup's, in every week. This can't be undone. To keep a copy of your current data, tap Cancel, then Download backup first.`}function le(e,t){return`Restored ${t}: ${E(e.expenses.length)} and ${D(e.budgetCents)}.`}var k=`college-budget-tracker:viewed-week`,A=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,ue=`
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
          ${d.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
`;function j(e){return`${e.description} (${v(e.amountCents)})`}function de(e){typeof e.showModal==`function`?e.showModal():e.setAttribute(`open`,``)}function fe(e){typeof e.close==`function`?e.close():e.removeAttribute(`open`)}function pe(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function M(e,r,i={}){let c=i.now??(()=>new Date),l=i.newId??pe,d=i.download??ae;e.innerHTML=ue;let m=t=>e.querySelector(t),h=m(`#expense-form`),g=m(`#expense-amount`),_=m(`#expense-description`),b=m(`#expense-date`),x=m(`#expense-category`),S=m(`#expense-status`),C=m(`#list-status`),w=null,T=me(),E=m(`#budget-form`),D=m(`#budget-amount`),O=m(`#budget-status`),M=te(r),I=M.data;we(),D.value=I.budgetCents===null?``:(I.budgetCents/100).toFixed(2),b.value=t(c()),Q(),m(`#previous-week`).addEventListener(`click`,()=>L(T-1)),m(`#next-week`).addEventListener(`click`,()=>{L(T+1),T===0&&m(`#previous-week`).focus()}),m(`#this-week`).addEventListener(`click`,()=>{L(0),m(`#previous-week`).focus()});function L(e){w!==null&&H(),T=e,he(),S.textContent=``,C.textContent=``,m(`#backup-status`).textContent=``,B(),Q()}function me(){try{let e=i.tabStorage?.getItem(`college-budget-tracker:viewed-week`)??null;return e!==null&&n(e)?Math.min(0,o(e,c())):0}catch{return 0}}function he(){try{T===0?i.tabStorage?.removeItem(k):i.tabStorage?.setItem(k,G().week.start)}catch{}}m(`#download-backup`).addEventListener(`click`,()=>{let e=m(`#backup-status`),{filename:t,text:n}=re(I,c());try{d(t,n)}catch{F(e,`Couldn't download the backup: this browser refused to create the file. Nothing was changed.`,`error`);return}F(e,ie(I,t),`success`)});let R=null,z=m(`#restore-file`);m(`#restore-backup`).addEventListener(`click`,()=>z.click()),z.addEventListener(`change`,async()=>{let e=z.files?.[0];if(z.value=``,e===void 0)return;B();let t=m(`#backup-status`);if(e.size>2e6){F(t,`This file is too big to be a backup from this app, so nothing was restored.`,`error`);return}let n;try{n=await e.text()}catch{F(t,`Couldn't open that file, so nothing was restored. Try choosing it again.`,`error`);return}let r=oe(n);if(`error`in r){F(t,r.error,`error`);return}R={filename:e.name,data:r.data},t.textContent=``,m(`#restore-preview-heading`).textContent=`Restore ${e.name}?`,m(`#restore-summary`).textContent=se(r.data),m(`#restore-warning`).textContent=ce(I);let i=m(`#restore-preview`);i.hidden=!1,i.focus()}),m(`#cancel-restore`).addEventListener(`click`,()=>{B(),F(m(`#backup-status`),`Restore canceled. Your data wasn't changed.`,`success`),m(`#restore-backup`).focus()}),m(`#confirm-restore`).addEventListener(`click`,()=>{if(R===null)return;let{filename:e,data:t}=R,n=m(`#backup-status`);Z(t)?(B(),w!==null&&H(),D.value=I.budgetCents===null?``:(I.budgetCents/100).toFixed(2),O.textContent=``,S.textContent=``,C.textContent=``,Q(),F(n,le(t,e),`success`),m(`#restore-backup`).focus()):(B(),F(n,A,`error`),m(`#restore-backup`).focus())});function B(){R=null,m(`#restore-preview`).hidden=!0}m(`#set-budget-button`).addEventListener(`click`,()=>{D.scrollIntoView({block:`center`}),D.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Q()}),E.addEventListener(`submit`,e=>{e.preventDefault(),P(E);let t=y(D.value,`budget`);`error`in t?(N(D,t.error),D.focus(),O.textContent=``):Z({...I,budgetCents:t.cents})?(D.value=(t.cents/100).toFixed(2),F(O,`Weekly budget saved: ${v(t.cents)}.`,`success`),Q()):F(O,A,`error`)}),h.addEventListener(`submit`,e=>{e.preventDefault();let t=ge();t!==null&&(w===null?_e({id:l(),...t}):ve({id:w,...t}))}),m(`#cancel-edit`).addEventListener(`click`,()=>{let e=w;H(),F(C,`Edit canceled. Nothing was changed.`,`success`),K(`edit`,e)});function ge(){P(h);let e=[],t=y(g.value,`amount`);`error`in t&&e.push([g,t.error]);let r=_.value.trim().replace(/\s+/g,` `);r===``&&e.push([_,`Say what it was for, like Lunch or Bus fare.`]);let i=x.value;return f(i)||e.push([x,`Choose a category, like Food or Transport.`]),n(b.value)||e.push([b,`Pick the date you spent it.`]),e.length>0||`error`in t||!f(i)?(e.forEach(([e,t])=>N(e,t)),e[0][0].focus(),S.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:b.value}}function _e(e){if(!Z({...I,expenses:[...I.expenses,e]})){F(S,A,`error`);return}let t=`Added ${e.description} (${v(e.amountCents)}).`,n=`${t} It's dated ${u(e.date)}, outside this week, so it isn't counted above.`,r=V(e.date);r===null?W(e.date)?F(S,t,`success`):F(S,be(e.date)?`${n} Tap Previous week to see it.`:n,`success`):F(S,`${t} ${r}`,`warning`),U(),g.focus(),Q()}function ve(e){let t=I.expenses.map(t=>t.id===e.id?e:t);if(!Z({...I,expenses:t})){F(S,A,`error`);return}let n=`Saved ${e.description} (${v(e.amountCents)}).`,r=V(e.date),i=e=>r===null?e:`${e} ${r}`,o=r===null?`success`:`warning`;if(H(),Q(),a(e.date,G().week))F(C,i(n),o),K(`edit`,e.id);else{let t=T===0?`this week`:`that week`;F(C,i(`${n} It's now dated ${u(e.date)}, outside ${t}, so it was moved out of this list and isn't counted above.`),o),m(`#list-heading`).focus()}}function V(e){if(!W(e))return null;let t=p(I.budgetCents,I.expenses,c()).remainingCents;return t!==null&&t<0?`You're now over budget by ${v(-t)}.`:null}function ye(e){let t=I.expenses.find(t=>t.id===e);t!==void 0&&(w=e,P(h),S.textContent=``,C.textContent=``,m(`#add-heading`).textContent=`Editing: ${t.description}`,m(`#expense-submit`).textContent=`Save changes`,m(`#cancel-edit`).hidden=!1,g.value=(t.amountCents/100).toFixed(2),_.value=t.description,b.value=t.date,x.value=t.category,Q(),h.closest(`section`).scrollIntoView({block:`start`}),g.focus())}function H(){w=null,P(h),S.textContent=``,m(`#add-heading`).textContent=`Add an expense`,m(`#expense-submit`).textContent=`Add expense`,m(`#cancel-edit`).hidden=!0,U(),Q()}function U(){g.value=``,_.value=``,b.value=t(c()),x.value=``}function W(e){return a(e,p(I.budgetCents,I.expenses,c()).week)}function G(){return p(I.budgetCents,I.expenses,s(c(),T))}function be(e){return e<p(I.budgetCents,I.expenses,c()).week.start}function K(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??m(`#list-heading`)).focus()}m(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);n===null?r!==null&&ye(r.dataset.editId):xe(n.dataset.deleteId)});let q=m(`#delete-dialog`),J=null;function xe(e){let t=I.expenses.find(t=>t.id===e);t!==void 0&&(J=e,m(`#delete-question`).textContent=`Delete ${j(t)}?`,de(q),m(`#cancel-delete`).focus())}function Y(){let e=J;return J=null,fe(q),e}function X(){K(`delete`,Y())}m(`#cancel-delete`).addEventListener(`click`,X),m(`#confirm-delete`).addEventListener(`click`,()=>{let e=Y();e!==null&&Se(e)}),q.addEventListener(`cancel`,e=>{e.preventDefault(),X()}),q.addEventListener(`click`,e=>{e.target===q&&X()});function Se(t){let n=I.expenses.find(e=>e.id===t);if(n===void 0)return;let r=j(n),i=G().expenses.map(e=>e.id).indexOf(t);if(!Z({...I,expenses:I.expenses.filter(e=>e.id!==t)})){F(C,A,`error`);return}w===t&&H(),F(C,`Deleted ${r}.`,`success`),Q();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??m(`#list-heading`)).focus()}function Z(e){return ne(r,e)?(I=e,!0):!1}function Q(){let e=c(),t=T<0,n=G(),r=T===0?`This week`:T===-1?`Last week`:`${-T} weeks ago`,i=ee(n.week,e.getFullYear());m(`#week-range`).textContent=`${r}: ${i}`,m(`#past-note`).textContent=`To add an expense for ${i}, tap Back to this week, then choose a date in that range in the Add an expense form.`,m(`#next-week`).hidden=!t,m(`#this-week`).hidden=!t,m(`#past-note`).hidden=!t,m(`#add-section`).hidden=t&&w===null,m(`#budget-section`).hidden=t,m(`#backup-section`).hidden=t,m(`#totals`).hidden=t,m(`#breakdown-heading`).textContent=t?`Spent by category that week`:`Spent by category this week`;let a=m(`#remaining`),o=m(`#summary`),s=t?null:n.remainingCents;o.classList.toggle(`past`,t),o.classList.toggle(`over`,s!==null&&s<0),o.classList.toggle(`unset`,!t&&s===null),m(`#set-budget-button`).hidden=t||s!==null,a.textContent=t?`${v(n.spentCents)} spent that week`:n.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:n.remainingCents>=0?`${v(n.remainingCents)} left this week`:`Over budget by ${v(-n.remainingCents)}`,m(`#budget-total`).textContent=I.budgetCents===null?`Not set`:v(I.budgetCents),m(`#spent-total`).textContent=v(n.spentCents);let l=m(`#meter`);if(l.hidden=t||I.budgetCents===null,I.budgetCents!==null){let e=Math.min(1,n.spentCents/I.budgetCents);m(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}m(`#category-breakdown`).hidden=n.byCategory.length===0,m(`#category-totals`).replaceChildren(...n.byCategory.map(({category:e,cents:t})=>{let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=v(t),n.append(r,i),n})),m(`#list-heading`).textContent=`${t?`Expenses that week`:`This week's expenses`} (${n.expenses.length})`;let u=m(`#empty-list`);u.textContent=t?`No expenses that week.`:`No expenses this week yet.`,u.hidden=n.expenses.length>0,m(`#expense-list`).replaceChildren(...n.expenses.map(Ce))}function Ce(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=u(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=v(e.amountCents),t.classList.toggle(`editing`,e.id===w);let s=document.createElement(`div`);return s.className=`row-actions`,s.append($(`Edit`,`edit`,e),$(`Delete`,`delete`,e)),t.append(n,o,s),t}function $(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${v(n.amountCents)})`),r}function we(){let e=m(`#load-notice`);e.textContent={ok:``,skipped:M.status===`skipped`?`${M.skipped===1?`1 saved expense`:`${M.skipped} saved expenses`} couldn't be read and ${M.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[M.status],e.hidden=M.status===`ok`}}function N(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function P(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function F(e,t,n){e.textContent=t,e.dataset.kind=n}function I(e){try{return window[e]}catch{return L}}var L={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};M(document.querySelector(`#app`),I(`localStorage`),{tabStorage:I(`sessionStorage`)});