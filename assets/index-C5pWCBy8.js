(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>String(e).padStart(2,`0`);function t(t){return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}function n(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(t===null)return!1;let[n,r,i]=[Number(t[1]),Number(t[2]),Number(t[3])],a=new Date(n,r-1,i);return a.getFullYear()===n&&a.getMonth()===r-1&&a.getDate()===i}function r(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function i(e){let n=(e.getDay()+6)%7,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()-n),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6);return{start:t(r),end:t(i)}}function a(e,t){return e>=t.start&&e<=t.end}var o=new Intl.DateTimeFormat(`en-US`,{weekday:`short`,month:`short`,day:`numeric`});function s(e){return o.format(r(e))}var c=[`Food`,`Transport`,`School`,`Fun`,`Other`];function l(e){return c.includes(e)}function u(e,t,n){let r=i(n),o=t.map((e,t)=>({expense:e,addedOrder:t})).filter(({expense:e})=>a(e.date,r)).sort((e,t)=>t.expense.date.localeCompare(e.expense.date)||t.addedOrder-e.addedOrder).map(({expense:e})=>e),s=o.reduce((e,t)=>e+t.amountCents,0);return{week:r,expenses:o,spentCents:s,byCategory:c.map(e=>({category:e,cents:o.filter(t=>t.category===e).reduce((e,t)=>e+t.amountCents,0)})).filter(({cents:e})=>e>0).sort((e,t)=>t.cents-e.cents),remainingCents:e===null?null:e-s}}var d=1e7,f=/^\$?(\d*)(?:\.(\d{0,2}))?$/;function p(e){let t=e.trim().replace(/,/g,``),n=f.exec(t);if(n===null)return null;let[,r,i=``]=n;if(r===``&&i===``)return null;let a=r===``?0:Number(r),o=i===``?0:Number(i.padEnd(2,`0`));return a*100+o}var m=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`});function h(e){return m.format(e/100)}function g(e,t){if(e.trim()===``)return{error:`Enter the ${t}.`};let n=p(e);return n===null?{error:`Enter the ${t} as a number, like 12.50.`}:n===0?{error:`The ${t} must be more than $0.`}:n>1e7?{error:`The ${t} can be at most ${h(d)}.`}:{cents:n}}var _=`college-budget-tracker:data`,v=`college-budget-tracker:damaged-backup`,y=e=>typeof e==`number`&&Number.isInteger(e)&&e>0&&e<=1e7;function b(e){if(typeof e!=`object`||!e)return null;let t=e;return typeof t.id!=`string`||typeof t.description!=`string`||t.description.trim()===``||!y(t.amountCents)||typeof t.date!=`string`||!n(t.date)?null:{id:t.id,description:t.description,amountCents:t.amountCents,date:t.date,category:l(t.category)?t.category:`Other`}}var x=()=>({budgetCents:null,expenses:[]});function S(e){let t;try{t=e.getItem(_)}catch{return{status:`unavailable`,data:x()}}if(t===null)return{status:`ok`,data:x()};let n;try{n=JSON.parse(t)}catch{n=void 0}let r=typeof n==`object`&&n?n:null;if(r===null||!Array.isArray(r.expenses)){try{e.setItem(v,t)}catch{}return{status:`damaged`,data:x()}}let i=y(r.budgetCents)?r.budgetCents:null,a=r.expenses.map(b).filter(e=>e!==null),o=r.expenses.length-a.length,s={budgetCents:i,expenses:a};return o===0?{status:`ok`,data:s}:{status:`skipped`,skipped:o,data:s}}function C(e,t){try{return e.setItem(_,JSON.stringify(t)),!0}catch{return!1}}var w=`Couldn't save: this browser refused to store it (storage may be full or blocked). Nothing was changed.`,T=`
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
    <div id="category-breakdown" class="breakdown" hidden>
      <h3 id="breakdown-heading">Spent by category this week</h3>
      <ul id="category-totals" aria-labelledby="breakdown-heading"></ul>
    </div>
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
        <label for="expense-category">Category</label>
        <select id="expense-category" name="category" aria-describedby="expense-category-error">
          <option value="">Choose a category</option>
          ${c.map(e=>`<option value="${e}">${e}</option>`).join(``)}
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
`;function E(){return typeof crypto<`u`&&`randomUUID`in crypto?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`}function D(e,r,i={}){let o=i.now??(()=>new Date),c=i.newId??E,d=i.confirm??(e=>window.confirm(e));e.innerHTML=T;let f=t=>e.querySelector(t),p=f(`#expense-form`),m=f(`#expense-amount`),_=f(`#expense-description`),v=f(`#expense-date`),y=f(`#expense-category`),b=f(`#expense-status`),x=f(`#list-status`),D=null,j=f(`#budget-form`),M=f(`#budget-amount`),N=f(`#budget-status`),P=S(r),F=P.data;Y(),M.value=F.budgetCents===null?``:(F.budgetCents/100).toFixed(2),v.value=t(o()),K(),f(`#set-budget-button`).addEventListener(`click`,()=>{M.scrollIntoView({block:`center`}),M.focus()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&K()}),j.addEventListener(`submit`,e=>{e.preventDefault(),k(j);let t=g(M.value,`budget`);`error`in t?(O(M,t.error),M.focus(),N.textContent=``):G({...F,budgetCents:t.cents})?(M.value=(t.cents/100).toFixed(2),A(N,`Weekly budget saved: ${h(t.cents)}.`,`success`),K()):A(N,w,`error`)}),p.addEventListener(`submit`,e=>{e.preventDefault();let t=I();t!==null&&(D===null?L({id:c(),...t}):R({id:D,...t}))}),f(`#cancel-edit`).addEventListener(`click`,()=>{let e=D;B(),A(x,`Edit canceled. Nothing was changed.`,`success`),U(`edit`,e)});function I(){k(p);let e=[],t=g(m.value,`amount`);`error`in t&&e.push([m,t.error]);let r=_.value.trim().replace(/\s+/g,` `);r===``&&e.push([_,`Say what it was for, like Lunch or Bus fare.`]);let i=y.value;return l(i)||e.push([y,`Choose a category, like Food or Transport.`]),n(v.value)||e.push([v,`Pick the date you spent it.`]),e.length>0||`error`in t||!l(i)?(e.forEach(([e,t])=>O(e,t)),e[0][0].focus(),b.textContent=``,null):{description:r,amountCents:t.cents,category:i,date:v.value}}function L(e){if(!G({...F,expenses:[...F.expenses,e]})){A(b,w,`error`);return}let t=`Added ${e.description} (${h(e.amountCents)}).`;A(b,H(e.date)?t:`${t} It's dated ${s(e.date)}, outside this week, so it isn't counted above.`,`success`),V(),m.focus(),K()}function R(e){let t=F.expenses.map(t=>t.id===e.id?e:t);if(!G({...F,expenses:t})){A(b,w,`error`);return}let n=`Saved ${e.description} (${h(e.amountCents)}).`;B(),K(),H(e.date)?(A(x,n,`success`),U(`edit`,e.id)):(A(x,`${n} It's now dated ${s(e.date)}, outside this week, so it was moved out of this list and isn't counted above.`,`success`),f(`#list-heading`).focus())}function z(e){let t=F.expenses.find(t=>t.id===e);t!==void 0&&(D=e,k(p),b.textContent=``,x.textContent=``,f(`#add-heading`).textContent=`Editing: ${t.description}`,f(`#expense-submit`).textContent=`Save changes`,f(`#cancel-edit`).hidden=!1,m.value=(t.amountCents/100).toFixed(2),_.value=t.description,v.value=t.date,y.value=t.category,K(),p.closest(`section`).scrollIntoView({block:`start`}),m.focus())}function B(){D=null,k(p),b.textContent=``,f(`#add-heading`).textContent=`Add an expense`,f(`#expense-submit`).textContent=`Add expense`,f(`#cancel-edit`).hidden=!0,V(),K()}function V(){m.value=``,_.value=``,v.value=t(o()),y.value=``}function H(e){return a(e,u(F.budgetCents,F.expenses,o()).week)}function U(t,n){(e.querySelector(`#expense-list button[data-${t}-id="${n}"]`)??f(`#list-heading`)).focus()}f(`#expense-list`).addEventListener(`click`,e=>{let t=e.target,n=t.closest(`button[data-delete-id]`),r=t.closest(`button[data-edit-id]`);n===null?r!==null&&z(r.dataset.editId):W(n.dataset.deleteId)});function W(t){let n=F.expenses.find(e=>e.id===t);if(n===void 0)return;let r=`${n.description} (${h(n.amountCents)})`;if(!d(`Delete ${r}?`))return;let i=u(F.budgetCents,F.expenses,o()).expenses.map(e=>e.id).indexOf(t);if(!G({...F,expenses:F.expenses.filter(e=>e.id!==t)})){A(x,w,`error`);return}D===t&&B(),A(x,`Deleted ${r}.`,`success`),K();let a=e.querySelectorAll(`#expense-list button[data-delete-id]`);(a[Math.min(i,a.length-1)]??f(`#list-heading`)).focus()}function G(e){return C(r,e)?(F=e,!0):!1}function K(){let e=u(F.budgetCents,F.expenses,o());f(`#week-range`).textContent=`This week: ${s(e.week.start)} – ${s(e.week.end)}`;let t=f(`#remaining`),n=f(`#summary`);n.classList.toggle(`over`,e.remainingCents!==null&&e.remainingCents<0),n.classList.toggle(`unset`,e.remainingCents===null),f(`#set-budget-button`).hidden=e.remainingCents!==null,t.textContent=e.remainingCents===null?`No weekly budget yet. Set one to see what's left this week.`:e.remainingCents>=0?`${h(e.remainingCents)} left this week`:`Over budget by ${h(-e.remainingCents)}`,f(`#budget-total`).textContent=F.budgetCents===null?`Not set`:h(F.budgetCents),f(`#spent-total`).textContent=h(e.spentCents);let r=f(`#meter`);if(r.hidden=F.budgetCents===null,F.budgetCents!==null){let t=Math.min(1,e.spentCents/F.budgetCents);f(`#meter-fill`).style.width=`${(t*100).toFixed(1)}%`}f(`#category-breakdown`).hidden=e.byCategory.length===0,f(`#category-totals`).replaceChildren(...e.byCategory.map(({category:e,cents:t})=>{let n=document.createElement(`li`),r=document.createElement(`span`);r.textContent=e;let i=document.createElement(`span`);return i.className=`amount`,i.textContent=h(t),n.append(r,i),n})),f(`#list-heading`).textContent=`This week's expenses (${e.expenses.length})`,f(`#empty-list`).hidden=e.expenses.length>0,f(`#expense-list`).replaceChildren(...e.expenses.map(q))}function q(e){let t=document.createElement(`li`),n=document.createElement(`div`),r=document.createElement(`span`);r.className=`description`,r.textContent=e.description;let i=document.createElement(`span`);i.className=`muted day`,i.textContent=s(e.date);let a=document.createElement(`span`);a.className=`muted category`,a.textContent=e.category,n.append(r,i,a);let o=document.createElement(`span`);o.className=`amount`,o.textContent=h(e.amountCents);let c=document.createElement(`div`);return c.className=`row-actions`,c.append(J(`Edit`,`edit`,e),J(`Delete`,`delete`,e)),t.classList.toggle(`editing`,e.id===D),t.append(n,o,c),t}function J(e,t,n){let r=document.createElement(`button`);return r.type=`button`,r.className=`secondary row-button`,r.textContent=e,r.setAttribute(`data-${t}-id`,n.id),r.setAttribute(`aria-label`,`${e} ${n.description} (${h(n.amountCents)})`),r}function Y(){let e=f(`#load-notice`);e.textContent={ok:``,skipped:P.status===`skipped`?`${P.skipped===1?`1 saved expense`:`${P.skipped} saved expenses`} couldn't be read and ${P.skipped===1?`was`:`were`} left out.`:``,damaged:`Your saved budget data couldn't be read, so the app started empty. A copy of the old data was kept in this browser.`,unavailable:`This browser won't let the app read its saved data (site data may be blocked), so nothing can be saved here.`}[P.status],e.hidden=P.status===`ok`}}function O(e,t){let n=e.form.querySelector(`#${e.id}-error`);n.textContent=t,n.hidden=!1,e.setAttribute(`aria-invalid`,`true`)}function k(e){e.querySelectorAll(`.field-error`).forEach(e=>{e.textContent=``,e.hidden=!0}),e.querySelectorAll(`[aria-invalid]`).forEach(e=>e.removeAttribute(`aria-invalid`))}function A(e,t,n){e.textContent=t,e.dataset.kind=n}function j(){try{return window.localStorage}catch{return M}}var M={length:0,clear:()=>{},key:()=>null,getItem:()=>{throw Error(`Storage is blocked`)},setItem:()=>{throw Error(`Storage is blocked`)},removeItem:()=>{}};D(document.querySelector(`#app`),j());