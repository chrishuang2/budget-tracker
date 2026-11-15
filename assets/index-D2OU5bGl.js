(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}function o(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()+t*7)}var s=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),c=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`,year:`numeric`});function l(e,t=!1){return(t?c:s).format(r(e))}function u(e,t){let n=!e.start.startsWith(`${t}-`)||!e.end.startsWith(`${t}-`);return`${l(e.start,n)} – ${l(e.end,n)}`}var d=[`Food`,`Transport`,`School`,`Fun`,`Other`];function f(e){return d.includes(e)}function p(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=o.reduce((e,t)=>e+t.amountCents,0);return{week:r,expenses:o,spentCents:s,byCategory:d.map(e=>({category:e,cents:o.filter(t=>t.category===e).reduce((e,t)=>e+t.amountCents,0)})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents),remainingCents:e===null?null:e-s}}var m=1e7,h=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function g(e){let t=e.trim().replace(/,/g,``),n=h.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var _=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function v(e){return _.format(e/100)}function y(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=g(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${v(m)}.`}:{cents:n}}var b=`college-budget-tracker:data`,x=`college-budget-tracker:damaged-backup`,S=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function C(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!S(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:f(t.category)?t.category:`Other`}}var w=()=>({budgetCents:null,expenses:[]});function T(e){let t;try{t=e.getItem(b)}catch{return{status:`unavailable`,data:w()}}if(t===null)return{status:`ok`,data:w()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(x,t)}catch{}return{status:`damaged`,data:w()}}let i=S(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(C).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function E(e,t){try{return e.setItem(b,JSON.stringify(t)),!0}catch{return!1}}var D=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,O=`
  <header class="page-header">
    <h1>College Budget Tracker</h1>
    <p id="week-range" class="week-range" aria-live="polite"></p>
    <nav class="week-nav" aria-label="Weeks">
      <button id="previous-week" type="button" class="secondary"><span aria-hidden="true">← </span>Previous week</button>
      <button id="this-week" type="button" class="secondary" hidden>Back to this week</button>
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
`;function k(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function A(e,r,i={}){let s=i.now??(()=>new Date),c=i.newId??k,d=i.confirm??(e=>window.confirm(e));e.innerHTML=O;let m=t=>e.querySelector(t),h=m(`#expense-form`),g=m(`#expense-amount`),_=m(`#expense-description`),b=m(`#expense-date`),x=m(`#expense-category`),S=m(`#expense-status`),C=m(`#list-status`),w=null,A=0,P=m(`#budget-form`),F=m(`#budget-amount`),I=m(`#budget-status`),L=T(r),R=L.data;ee(),F.value=R.budgetCents===null?``:(R.budgetCents/100).toFixed(2),b.value=t(s()),Z(),m(`#previous-week`).addEventListener(`click`,()=>z(A-1)),m(`#this-week`).addEventListener(`click`,()=>{z(0),m(`#previous-week`).focus()});function z(e){w!==null&&W(),A=e,S.textContent=``,C.textContent=``,Z()}m(`#set-budget-button`).addEventListener(`click`,()=>{F.scrollIntoView({block:`center`}),F.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Z()}),P.addEventListener(`submit`,e=>{e.preventDefault(),M(P);let t=y(F.value,`budget`);`error`in t?(j(F,t.error),F.focus(),I.textContent=``):X({...R,budgetCents:t.cents})?(F.value=(t.cents/100).toFixed(2),N(I,`Weekly budget saved: ${v(t.cents)}.`,`success`),Z()):N(I,D,`error`)}),h.addEventListener(`submit`,e=>{e.preventDefault();let t=B();t!==null&&(w===null?V({id:c(),...t}):H({id:w,...t}))}),m(`#cancel-edit`).addEventListener(`click`,()=>{let e=w;W(),N(C,`Edit canceled. Nothing was changed.`,`success`),J(`edit`,e)});function B(){M(h);let e=[],t=y(g.value,`amount`);`error`in t&&e.push([g,t.error]);let r=_.value.trim().replace(/\s+/g,` `);r===``&&e.push([_,`Say what it was for, like Lunch or Bus fare.`]);let i=x.value;return f(i)||e.push([x,`Choose a category, like Food or Transport.`]),n(b.value)||e.push([b,`Pick the date you spent it.`]),e.length>0||`error`in t||!f(i)?(e.forEach(([e,t])=>j(e,t)),e[0][0].focus(),S.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:b.value}}function V(e){if(!X({...R,expenses:[...R.expenses,e]})){N(S,D,`error`);return}let t=`Added ${e.description} (${v(e.amountCents)}).`,n=`${t} It's dated ${l(e.date)}, outside this week, so it isn't counted above.`;N(S,K(e.date)?t:q(e.date)?`${n} Tap Previous week to see it.`:n,`success`),G(),g.focus(),Z()}function H(e){let t=R.expenses.map(t=>t.id===e.id?e:t);if(!X({...R,expenses:t})){N(S,D,`error`);return}let n=`Saved ${e.description} (${v(e.amountCents)}).`;W(),Z(),K(e.date)?(N(C,n,`success`),J(`edit`,e.id)):(N(C,`${n} It's now dated ${l(e.date)}, outside this week, so it was moved out of this list and isn't counted above.`,`success`),m(`#list-heading`).focus())}function U(e){let t=R.expenses.find(t=>t.id===e);t!==void 0&&(w=e,M(h),S.textContent=``,C.textContent=``,m(`#add-heading`).textContent=`Editing: ${t.description}`,m(`#expense-submit`).textContent=`Save changes`,m(`#cancel-edit`).hidden=!1,g.value=(t.amountCents/100).toFixed(2),_.value=t.description,b.value=t.date,x.value=t.category,Z(),h.closest(`section`).scrollIntoView({block:`start`}),g.focus())}function W(){w=null,M(h),S.textContent=``,m(`#add-heading`).textContent=`Add an expense`,m(`#expense-submit`).textContent=`Add expense`,m(`#cancel-edit`).hidden=!0,G(),Z()}function G(){g.value=``,_.value=``,b.value=t(s()),x.value=``}function K(e){return a(e,p(R.budgetCents,R.expenses,s()).week)}function q(e){return e<p(R.budgetCents,R.expenses,s()).week.start}function J(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??m(`#list-heading`)).focus()}m(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);n===null?r!==null&&U(r.dataset.editId):Y(n.dataset.deleteId)});function Y(t){let n=R.expenses.find(e=>e.id===t);if(n===void 0)return;let r=`${n.description} (${v(n.amountCents)})`;if(!d(`Delete ${r}?`))return;let i=p(R.budgetCents,R.expenses,s()).expenses.map(e=>e.id).indexOf(t);if(!X({...R,expenses:R.expenses.filter(e=>e.id!==t)})){N(C,D,`error`);return}w===t&&W(),N(C,`Deleted ${r}.`,`success`),Z();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??m(`#list-heading`)).focus()}function X(e){return E(r,e)?(R=e,!0):!1}function Z(){let e=s(),t=A<0,n=p(R.budgetCents,R.expenses,o(e,A)),r=A===0?`This week`:A===-1?`Last week`:`${-A} weeks ago`,i=u(n.week,e.getFullYear());m(`#week-range`).textContent=`${r}: ${i}`,m(`#past-note`).textContent=`Past weeks are read-only. To add an expense for ${i}, tap Back to this week, then choose a date in that range in the Add an expense form.`,m(`#this-week`).hidden=!t,m(`#past-note`).hidden=!t,m(`#add-section`).hidden=t,m(`#budget-section`).hidden=t,m(`#totals`).hidden=t,m(`#breakdown-heading`).textContent=t?`Spent by category that week`:`Spent by category this week`;let a=m(`#remaining`),c=m(`#summary`),l=t?null:n.remainingCents;c.classList.toggle(`past`,t),c.classList.toggle(`over`,l!==null&&l<0),c.classList.toggle(`unset`,!t&&l===null),m(`#set-budget-button`).hidden=t||l!==null,a.textContent=t?`${v(n.spentCents)} spent that week`:n.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:n.remainingCents>=0?`${v(n.remainingCents)} left this week`:`Over budget by ${v(-n.remainingCents)}`,m(`#budget-total`).textContent=R.budgetCents===null?`Not set`:v(R.budgetCents),m(`#spent-total`).textContent=v(n.spentCents);let d=m(`#meter`);if(d.hidden=t||R.budgetCents===null,R.budgetCents!==null){let e=Math.min(1,n.spentCents/R.budgetCents);m(`#meter-fill`).style.width=`${(e*100).toFixed(1)}%`}m(`#category-breakdown`).hidden=n.byCategory.length===0,m(`#category-totals`).replaceChildren(...n.byCategory.map(({category:e,cents:t})=>{let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=v(t),n.append(r,i),n})),m(`#list-heading`).textContent=`${t?`Expenses that week`:`This week's expenses`} (${n.expenses.length})`;let f=m(`#empty-list`);f.textContent=t?`No expenses that week.`:`No expenses this week yet.`,f.hidden=n.expenses.length>0,m(`#expense-list`).replaceChildren(...n.expenses.map(e=>Q(e,!t)))}function Q(e,t){let n=document.createElement(`li`),r=document.createElement(`div`),i=document.createElement(`span`);i.className=`description`,i.textContent=e.description;let a=document.createElement(`span`);a.className=`muted day`,a.textContent=l(e.date);let o=document.createElement(`span`);o.className=`muted category`,o.textContent=e.category,r.append(i,a,o);let s=document.createElement(`span`);if(s.className=`amount`,s.textContent=v(e.amountCents),n.classList.toggle(`editing`,e.id===w),n.append(r,s),t){let t=document.createElement(`div`);t.className=`row-actions`,t.append($(`Edit`,`edit`,e),$(`Delete`,`delete`,e)),n.append(t)}return n}function $(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${v(n.amountCents)})`),r}function ee(){let e=m(`#load-notice`);e.textContent={ok:``,skipped:L.status===`skipped`?`${L.skipped===1?`1 saved expense`:`${L.skipped} saved expenses`} couldn't be read and ${L.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[L.status],e.hidden=L.status===`ok`}}function j(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function M(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function N(e,t,n){e.textContent=t,e.dataset.kind=n}function P(){try{return window.localStorage}catch{return F}}var F={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};A(document.querySelector(`#app`),P());