(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const ht=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class nt{constructor(){this._listeners={}}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){if(!this._listeners[t])throw new Error("Нет такого события");this._listeners[t]=this._listeners[t].filter(n=>n!==e)}emit(t,...e){if(!this._listeners[t])throw new Error("Нет такого события");for(const n of this._listeners[t])n(...e)}}const Q=(r,t)=>{const e=t.split(".");if(e.length===1)return r[t];let n=r;for(const s of e)(typeof n=="object"&&n!==null&&Object.getOwnPropertyNames(n).includes(s)||Array.isArray(n)&&Number.isNaN(Number(s))&&Number(s)>=0&&n.length>Number(s))&&(n=n[s]);return n};class dt{constructor(){this.elementsContentMap=new Map}precompile(t,e,n){const s=t.match(/{{>[\w-]*}}/gm);let a=t;const o=new Map;if(a=a.replace(/{{blockId}}/gm,n),!s||s.length===0||e.length===0)return a;for(const l of e)o.set(l.selector,l.content);for(const l of s.map(i=>i.slice(3,-2))){const i=new RegExp(`{{>${l}}}`,"gm");o.has(l)&&(a=a.replace(i,o.get(l)))}return a}compile(t,e,n=!0,s){e.children.length>0&&this._replaceTextContentChildNode(e.children,t,n,s),this._replaceTextContent(e,t,n,s)}addEvents(t,e){this._addOrRemoveEvents(t,e,!1),t.children.length>0&&this._registerEvents(t.children,e,!1)}removeEvents(t,e){this._addOrRemoveEvents(t,e,!0),t.children.length>0&&this._registerEvents(t.children,e,!0)}_registerEvents(t,e,n){for(const s of t)s.attributes.getNamedItem("blockId")||(this._addOrRemoveEvents(s,e,n),s.children.length>0&&this._registerEvents(s.children,e,n))}_addOrRemoveEvents(t,e,n){const s=/^\(.*\)$/;for(const a of t.attributes)if(s.test(a.name)){const o=a.name.slice(1,-1),i=Object.getPrototypeOf(e)[a.value];if(!i||typeof i!="function")return;n?t.removeEventListener(o,i.bind(e)):t.addEventListener(o,i.bind(e))}}_replaceTextContentChildNode(t,e,n,s){if(t.length!==0)for(const a of t)a.attributes.getNamedItem("blockId")||(a.children.length>0&&this._replaceTextContentChildNode(a.children,e,n,s),this._replaceTextContent(a,e,n,s))}_replaceTextContent(t,e,n,s){const a=t.textContent;if(this._renderSavedContent(e),!a)return;const o=a.match(/{{[\w'().-]*}}/gm);if(!(!o||o.length===0||e.length===0))for(const l of o.map(i=>i.slice(2,-2))){const i=new RegExp(`{{${l}}}`,"gm"),u=Q(e,l)??"";if(n){const c=s?`${s}.${l}`:l,g=this.elementsContentMap.get(c)??new Set;g.add(t),this.elementsContentMap.set(c,g)}typeof u=="string"||typeof u=="number"?t.textContent=a.replace(i,String(u)):Array.isArray(u)&&(t.textContent=a.replace(i,u.join(", ")))}}_renderSavedContent(t){for(const[e,n]of this.elementsContentMap.entries()){const s=Q(t,e),a=s?String(s):"";for(const o of n)o.textContent=a}}}let _t=(r=21)=>crypto.getRandomValues(new Uint8Array(r)).reduce((t,e)=>(e&=63,e<36?t+=e.toString(36):e<62?t+=(e-26).toString(36).toUpperCase():e>62?t+="-":t+="_",t),"");var st=(r=>(r.INIT="init",r.FLOW_CDM="flow:component-did-mount",r.FLOW_RENDER="flow:render",r.FLOW_CDU="flow:component-did-update",r.DESTROY="destroy",r))(st||{});class m{constructor(t,e=[],n={},s={}){this.eventBus=new nt,this.blockId=_t(),this.templater=new dt,this.element=null,this.content=t,this.declarations=e,this.hostStyles=s,this.props=this._makePropsProxy(n),this._registerEvents(),this.eventBus.emit("init")}_registerEvents(){this.eventBus.on("init",this._init.bind(this)),this.eventBus.on("flow:component-did-mount",this._componentDidMount.bind(this)),this.eventBus.on("flow:render",this._render.bind(this)),this.eventBus.on("flow:component-did-update",this._componentDidUpdate.bind(this)),this.eventBus.on("destroy",this._componentDidUnmount.bind(this))}_init(){this.init(),this.eventBus.emit("flow:render")}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.element=document.querySelector(`[blockId="${this.blockId}"]`),this.templater.addEvents(this.element,this),this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const t of this.declarations)t.eventBus.emit("flow:component-did-mount");this.templater.compile(this.props,this.element)}_render(t,e){this.render(t,e)}render(t,e){this.content&&this.element&&this.templater.compile(e??this.props,this.element)}_componentDidUpdate(t,e){this.componentDidUpdate(t,e)&&this.eventBus.emit("flow:render",t,e)}componentDidUpdate(t,e){return JSON.stringify(t)!==JSON.stringify(e)}_makePropsProxy(t){const e=this.eventBus;return new Proxy(t,{get(n,s){const a=n[s];return typeof a=="function"?a.bind(n):a},set(n,s,a){const o={...n};return n[s]=a,e.emit("flow:component-did-update",o,n),!0}})}_componentDidUnmount(){this.element&&this.templater.removeEvents(this.element,this)}show(){this.element&&(this.element.style.display=this.hostStyles.display??"block")}hide(){this.element&&(this.element.style.display="none")}setProps(t){t&&Object.assign(this.props,t)}}function A(r,t){var n;const e=r.target;(n=t.getControl(e.name))==null||n.setValue(r)}function C(r,t,e,n){var a;const s=r.target;(a=t.getControl(s.name))==null||a.blur(r,t,e,n)}function d(r){return r.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function _(r,t){return r.length>=t?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${t} символов`}}function N(r){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(r)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function F(r){return/\d{7,15}/.test(r)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function pt(r){let t=!0;for(const e of Object.values(r.controls))e.valid||(t=!1);return t}function mt(r,t,e){const n={isValid:!0,error:""};if(t.includes(d)){const{isValid:s,error:a}=d(r);n.isValid=n.isValid&&s,n.error=a}if(t.includes(_)){const{isValid:s,error:a}=_(r,e??0);n.isValid=n.isValid&&s,n.error=a}if(t.includes(N)){const{isValid:s,error:a}=N(r);n.isValid=n.isValid&&s,n.error=a}if(t.includes(F)){const{isValid:s,error:a}=F(r);n.isValid=n.isValid&&s,n.error=a}return n}class p{constructor(t="",e=[],n){this.value=t,this.validators=e,this.minLength=n,this.valid=!1,this.error=""}clear(){this.value="",this.error="",this.valid=!1}setValue(t){const{value:e}=t.target;if(this.value===e)return;this.value=e;const{isValid:n,error:s}=mt(e,this.validators,this.minLength);this.error=s,this.valid=n}blur(t,e,n,s){const a=t.target;n[`${a.name}_error`]!==this.error&&(n[`${a.name}_error`]=this.error),e.valid=pt(e);const o=s==null?void 0:s.querySelector('button[type="submit"]');o.disabled=!e.valid}}class k{constructor(t){this.controls=t,this.valid=!1}getRawValue(){const t={};for(const[e,n]of Object.entries(this.controls))t[e]=n.value;return t}getControl(t){return Object.getOwnPropertyNames(this.controls).includes(t)?this.controls[t]:null}}const M={GET:"GET",POST:"POST",PUT:"PUT",PATCH:"PATCH",DELETE:"DELETE"},U="Content-Type";function gt(r){return Object.keys(r).reduce((t,e,n,s)=>`${t}${e}=${r[e]}${n<s.length-1?"&":""}`,"?")}class q{constructor(){this.get=(t,e={},n)=>(e.data&&Object.keys(e.data).length>0&&(t+=gt(e.data)),this._request(t,{...e,method:M.GET,headers:{Accept:"application/json",...e.headers}},e.timeout,n)),this.post=(t,e={},n)=>{const s={...e.headers};return e.data instanceof FormData||(s[U]="application/json"),this._request(t,{...e,method:M.POST,headers:s},e.timeout,n)},this.put=(t,e={},n)=>{const s={...e.headers};return e.data instanceof FormData||(s[U]="application/json"),this._request(t,{...e,method:M.PUT,headers:s},e.timeout,n)},this.patch=(t,e={},n)=>{const s={...e.headers};return e.data instanceof FormData||(s[U]="application/json"),this._request(t,{...e,method:M.PATCH,headers:s},e.timeout,n)},this.delete=(t,e={},n)=>{const s={...e.headers};return e.data instanceof FormData||(s[U]="application/json"),this._request(t,{...e,method:M.DELETE,headers:s},e.timeout,n)}}_request(t,e,n=5e3,s=!0){const{method:a="",data:o,headers:l={}}=e;return new Promise((i,u)=>{const c=new XMLHttpRequest;c.withCredentials=s,c.open(a,t);for(const g in l)c.setRequestHeader(g,l[g]);c.addEventListener("load",function(){i(c)}),c.addEventListener("abort",u),c.onerror=u,c.timeout=n,c.ontimeout=u,a===M.GET||!o?c.send():o instanceof FormData?c.send(o):c.send(JSON.stringify(o))}).then(i=>{if(i.status>=400)throw i;return i}).then(i=>{try{return JSON.parse(i.response)}catch{return i.response}})}}function ft(r,t){return r===t}class bt{constructor(t,e,n,s){this._pathname=t,this._blockClass=e,this._block=null,this._query=n,this.canActivate=s??null}navigate(t){this.match(t)&&(this._pathname=t,this.render())}leave(){this._block&&this._block.hide()}match(t){return ft(t,this._pathname)}render(){const t=document.querySelector(this._query);if(!this._block){this._block=new this._blockClass,t.innerHTML=this._block.content,this._block.eventBus.emit(st.FLOW_CDM);return}this._block.show(),t.insertAdjacentElement("afterbegin",this._block.element)}}class v{constructor(t){if(this._rootQuery="#root",this.history=window.history,this._currentRoute=null,this.routes=[],v.__instance)return v.__instance;this.routes=[],this.history=window.history,this._currentRoute=null,this._rootQuery=t,v.__instance=this}use({path:t,component:e,canActivate:n}){const s=new bt(t,e,this._rootQuery,n);return this.routes.push(s),this}async start(){window.addEventListener("popstate",({currentTarget:t})=>{t instanceof Window&&this._onRoute(t.location.pathname)}),await this._onRoute(window.location.pathname)}async go(t){await this._onRoute(t)}back(){this.history.back()}forward(){this.history.forward()}getRoute(t){return this.routes.find(e=>e.match(t))}async _onRoute(t){var s;const e=this.getRoute(t);if(!e||(s=this._currentRoute)!=null&&s.match(e._pathname))return;if(!(e.canActivate?await e.canActivate():!0)){console.error(`you do not have access to ${t} page`);return}this.history.pushState({},"",t),this._currentRoute&&this._currentRoute.leave(),this._currentRoute=e,e.render()}}class vt extends HTMLElement{constructor(){super(),this._router=v.__instance}connectedCallback(){const t=this.getAttribute("link")??"/messenger";this.addEventListener("click",()=>{this._router.go(t)})}disconnectedCallback(){const t=this.getAttribute("link")??"/messenger";this.removeEventListener("click",()=>{this._router.go(t)})}static get observedAttributes(){return["link"]}}class yt extends m{constructor(){super(ht)}}const wt=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class St extends m{constructor(){super(wt)}}const Ct=`<div
  class="overlay overlay-add-chat"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="dialog" (click)="onDialogNotClose">
    <h3 class="dialog__title">Добавить чат</h3>
    <form name="add-chat" (submit)="onSubmit">
      <label class="dialog__label">
        <input
          class="dialog__input"
          placeholder="Название чата"
          type="text"
          name="title"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{title_error}}</span>
      </label>
      <button class="dialog__submit" type="submit" disabled>Добавить</button>
    </form>
  </section>
</div>
`,rt="ya-praktikum.tech",I=`https://${rt}/api/v2`,kt=`wss://${rt}`;function X(r){const t=new Date(Date.parse(r)),e=new Date(Date.now());if(e.getFullYear()!==t.getFullYear()||e.getMonth()!==t.getMonth()||e.getDate()-t.getDate()>6)return`${t.getDate()}.${t.getMonth()}.${t.getFullYear()}`;const n=t.getMinutes(),s=n>9?n:`0${n}`;return`${t.getHours()}:${s}`}function D(r){return!r||typeof r=="number"||typeof r=="boolean"||typeof r=="function"?!0:typeof r=="string"||Array.isArray(r)?r.length===0:typeof r=="object"?r.keys?[...r].length===0:Object.keys(r).length===0:!1}function Dt(r){return typeof r=="object"&&r!==null&&r.constructor===Object&&Object.prototype.toString.call(r)==="[object Object]"}function at(r){return Array.isArray(r)}function K(r){return Dt(r)||at(r)}function B(r,t){if(Object.keys(r).length!==Object.keys(t).length)return!1;for(const[e,n]of Object.entries(r)){const s=at(t)?t[Number(e)]:t[e];if(K(n)&&K(s)){if(B(n,s))continue;return!1}if(n!==s)return!1}return!0}function W(r,t){return r.getFullYear()===t.getFullYear()&&r.getMonth()===t.getMonth()&&r.getDate()===t.getDate()}function ot(r,t){return W(r,t)?!1:r.getFullYear()>t.getFullYear()||r.getMonth()>t.getMonth()?!0:r.getDate()>t.getDate()}function tt(r,t){return!W(r,t)&&!ot(r,t)}function It(r){const t=typeof r;return!r||t==="string"||t==="number"||t==="boolean"||t==="bigint"}const h=(...r)=>{let t="";for(const[e,n]of r.entries())t+=String(n),!String(n).endsWith("/")&&e!==r.length-1&&!String(r[e+1]).startsWith("/")&&(t+="/");return t};function it(r){return typeof r=="object"&&r!==null&&r.constructor===Object&&Object.prototype.toString.call(r)==="[object Object]"}function R(r){return Array.isArray(r)}function G(r){return it(r)||R(r)}function V(r){if(!it(r))throw new Error("input must be an object");const t=Object.keys(r).length;let e="",n=0;for(const[s,a]of Object.entries(r))G(a)?R(a)?e+=Y(s,a):e+=J(s,a):e+=`${s}=${a}`,n!==t-1&&(e+="&"),n++;return e}function Y(r,t){let e="";for(let n=0;n<t.length;n++){const s=t[n];G(s)?R(s)?e+=Y(`${r}[${n}]`,s):e+=J(`${r}[${n}]`,s):e+=`${r}[${n}]=${s}`,n!==t.length-1&&(e+="&")}return e}function J(r,t){let e="",n=0;const s=Object.keys(t).length;for(const[a,o]of Object.entries(t))G(o)?R(o)?e+=Y(`${r}[${a}]`,o):e+=J(`${r}[${a}]`,o):e+=`${r}[${a}]=${o}`,n!==s-1&&(e+="&"),n++;return e}const E="authUser",T="currentChatId";class b{constructor(){if(b.__instance)return b.__instance;b.__instance=this}async getItem(t){const e=localStorage.getItem(t);if(!e)return null;try{return JSON.parse(e)}catch{return null}}async setItem(t,e){const n=It(e)?String(e):JSON.stringify(e);localStorage.setItem(t,n)}async removeItem(t){localStorage.removeItem(t)}async clear(){localStorage.clear()}}var H=(r=>(r.MESSAGE="message",r.FILE="file",r.USER_CONNECTED="user connected",r))(H||{});class At extends nt{constructor(){super(...arguments),this._state={}}getState(){return this._state}set(t,e){this._state={...this._state,[t]:e},this.emit("update",this._state)}}const f=new At;function z(r){return t=>class extends t{constructor(e){super({...e,...r(f.getState())}),f.on("update",()=>{const n=r(f.getState());this.setProps(n)})}}}class S{constructor(){if(this._http=new q,this._baseUrl=h(I,"auth"),this._router=v.__instance,this._storageService=new b,S.__instance)return S.__instance;S.__instance=this}signUp(t){return this._http.post(h(this._baseUrl,"signup"),{data:t})}signIn(t){return this._http.post(h(this._baseUrl,"signin"),{data:t})}async user(){try{const t=await this._http.get(h(this._baseUrl,"user"));return await this._storageService.setItem(E,t),t}catch(t){console.error(t),await this._storageService.clear(),await this._router.go("/")}}async logout(){return this._http.post(h(this._baseUrl,"logout")).then(()=>this._storageService.clear())}}class y{constructor(){if(this._baseUrl=h(I,"chats"),this._http=new q,y.__instance)return y.__instance;y.__instance=this}getChats(t){let e=this._baseUrl;return t&&Object.keys(t).length>0&&(e+=`?${V(t)}`),this._http.get(e)}createChat(t){return this._http.post(this._baseUrl,{data:{title:t}})}deleteChat(t){return this._http.delete(this._baseUrl,{data:{chatId:t}})}getChatFiles(t){return this._http.get(h(this._baseUrl,t,"files"))}getArchiveChats(t){let e=h(this._baseUrl,"archive");return t&&Object.keys(t).length>0&&(e+=`?${V(t)}`),this._http.get(e)}archiveChat(t){return this._http.post(h(this._baseUrl,"archive"),{data:{chatId:t}})}unarchiveChat(t){return this._http.post(h(this._baseUrl,"unarchive"),{data:{chatId:t}})}getCommonChatWithUser(t){return this._http.get(h(this._baseUrl,t,"common"))}getChatUsers(t,e){let n=h(this._baseUrl,t,"users");return e&&Object.keys(e).length>0&&(n+=`?${V(e)}`),this._http.get(n)}getNewChatMessages(t){return this._http.get(h(this._baseUrl,"new",t))}changeChatAvatar(t){return this._http.put(h(this._baseUrl,"avatar"),{data:t})}addUsersToChat(t,e){return this._http.put(h(this._baseUrl,"users"),{data:{users:t,chatId:e}})}deleteUsersFromChat(t,e){return this._http.delete(h(this._baseUrl,"users"),{data:{users:t,chatId:e}})}getTokenForConnectMessagesServer(t){return this._http.post(h(this._baseUrl,"token",t))}}class w{constructor(){if(this._baseUrl=h(I,"user"),this._http=new q,w.__instance)return w.__instance;w.__instance=this}updateUserData(t){return this._http.put(h(this._baseUrl,"profile"),{data:t})}updateAvatar(t){return this._http.put(h(this._baseUrl,"profile/avatar"),{data:t})}updatePassword(t){return this._http.put(h(this._baseUrl,"password"),{data:t})}getUserById(t){return this._http.get(h(this._baseUrl,t))}searchUserByLogin(t){return this._http.post(h(this._baseUrl,"search"),{data:{login:t}})}}const Et=1e4;class Mt{constructor(){this._chatsApi=new y,this._storageService=new b,this._socketsMap=new Map,this._intervalIdMap=new Map}async connect(t){if(this.isConnected(t))return;const e=await this._storageService.getItem(E);e&&this._chatsApi.getTokenForConnectMessagesServer(Number(t)).then(n=>{const s=new WebSocket(`${kt}/ws/chats/${e.id}/${t}/${n.token}`);this._socketsMap.set(t,s),this._initListeners(t,s)}).catch(console.error)}async sendMessage(t,e){const n=this._socketsMap.get(t);if(n)try{n.send(JSON.stringify(e))}catch{await this.connect(t)}}_initListeners(t,e){if(!this._intervalIdMap.get(t)){const n=setInterval(async()=>{await this.sendMessage(t,{type:"ping"})},Et);this._intervalIdMap.set(t,n)}e.addEventListener("open",()=>{console.log("Соединение установлено"),this.sendMessage(t,{content:"0",type:"get old"}).then()}),e.addEventListener("close",n=>{n.wasClean?console.log("Соединение закрыто чисто"):console.log("Обрыв соединения"),console.log(`Код: ${n.code} | Причина: ${n.reason}`)}),e.addEventListener("message",n=>{try{const s=JSON.parse(n.data);if(s.type==="pong")return;const a=s,o=Array.isArray(a)?a:[a],l=f.getState().chatMessages??{},i=l[t]??[];l[t]=[...o,...i].sort((u,c)=>u.time>c.time?1:-1),f.set("chatMessages",l)}catch(s){console.error(s)}}),e.addEventListener("error",n=>{console.log("Ошибка",n.message)})}isConnected(t){const e=this._socketsMap.get(t);return!!(e&&(e.CONNECTING||e.OPEN))}}class Ot{constructor(){this._http=new q,this._baseUrl=h(I,"resources")}loadFile(t){return this._http.post(this._baseUrl,{data:t})}}class Lt extends m{constructor(){super(Ct,[],{title_error:""}),this._chatsApi=new y,this.form=new k({title:new p("",[d,_],4)}),this.selector="add-chat-dialog"}onSubmit(t){if(t.preventDefault(),!this.form.valid)return;const{title:e}=this.form.getRawValue();this._chatsApi.createChat(e).then(()=>this._chatsApi.getChats()).then(n=>{f.set("chats",n)}).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){A(t,this.form)}onBlur(t){C(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Tt=`<div
  class="overlay overlay-add-user"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="dialog" (click)="onDialogNotClose">
    <h3 class="dialog__title">Добавить пользователя</h3>
    <form name="add-user" (submit)="onSubmit">
      <label class="dialog__label">
        <input
          class="dialog__input"
          placeholder="Логин"
          type="text"
          name="login"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{login_error}}</span>
      </label>
      <button class="dialog__submit" type="submit" disabled>Добавить</button>
    </form>
  </section>
</div>
`;class $t extends m{constructor(){super(Tt,[],{login_error:""}),this._chatsApi=new y,this._userApi=new w,this._storageService=new b,this.form=new k({login:new p("",[d,_],4)}),this.selector="add-user-dialog"}async onSubmit(t){t.preventDefault();const e=this.form;if(!e.valid)return;const n=e.controls.login,s=await this._storageService.getItem(T);s&&this._userApi.searchUserByLogin(n.value).then(a=>{if(a.length===0)throw new Error("user not found");return a[0].id}).then(a=>this._chatsApi.addUsersToChat([a],s)).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){A(t,this.form)}onBlur(t){C(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Ut=`<div
  class="overlay overlay-change-password"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="auth dialog change-password" (click)="onDialogNotClose">
    <h2 class="auth__title">Изменение пароля</h2>
    <form class="auth__form" name="change-password" (submit)="onSubmit">
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Старый пароль"
          type="password"
          name="oldPassword"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{oldPassword_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Новый пароль"
          type="password"
          name="newPassword"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{newPassword_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Новый пароль (ещё раз)"
          type="password"
          name="password_repeat"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{password_repeat_error}}</span>
      </label>
      <div class="auth__actions">
        <button class="auth__submit" type="submit" disabled>Сохранить</button>
      </div>
    </form>
  </section>
</div>
`;class xt extends m{constructor(){super(Ut,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""}),this._userApiService=new w,this.form=new k({oldPassword:new p("",[d,_],6),newPassword:new p("",[d,_],6),password_repeat:new p("",[d,_],6)}),this.selector="change-password-dialog"}componentDidMount(){super.componentDidMount()}onSubmit(t){t.preventDefault(),this.form.valid&&this._userApiService.updatePassword(this.form.getRawValue()).then(()=>{this.onDialogClose()}).catch(console.error)}onInput(t){var n;const e=t.target;(n=this.form.getControl(e.name))==null||n.setValue(t)}onBlur(t){C(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Nt=`<div
  class="overlay overlay-change-data"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="auth dialog change-data" (click)="onDialogNotClose">
    <h2 class="auth__title">Изменение данных</h2>
    <form class="auth__form" name="change-data" (submit)="onSubmit">
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Почта"
          type="text"
          name="email"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{email_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Логин"
          type="text"
          name="login"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{login_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Имя"
          type="text"
          name="first_name"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{first_name_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Фамилия"
          type="text"
          name="second_name"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{second_name_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Телефон"
          type="text"
          name="phone"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{phone_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Имя в чате"
          type="text"
          name="display_name"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{display_name_error}}</span>
      </label>
      <div class="auth__actions">
        <button class="auth__submit" type="submit" disabled>Сохранить</button>
      </div>
    </form>
  </section>
</div>
`;class Ft extends m{constructor(){super(Nt,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",display_name_error:""}),this._userApiService=new w,this._storageService=new b,this.form=new k({email:new p("",[d,_,N],4),login:new p("",[d,_],4),display_name:new p("",[d,_],4),first_name:new p("",[d,_],4),second_name:new p("",[d,_],4),phone:new p("",[d,_,F],8)}),this.selector="change-user-data-dialog"}render(t,e){if(!B((t==null?void 0:t.user)??{},(e==null?void 0:e.user)??{})){const{user:n}=e??{};if(n){const s=document.querySelectorAll('form[name="change-data"] input');for(const a of s)a.value=String(n[a.name]);for(const[a,o]of Object.entries(this.form.controls))o.setValue({target:{value:String(n[a])}})}}super.render(t,e)}componentDidMount(){super.componentDidMount()}onSubmit(t){t.preventDefault(),this.form.valid&&this._userApiService.updateUserData(this.form.getRawValue()).then(e=>(f.set("user",e),this._storageService.setItem(E,e))).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){A(t,this.form)}onBlur(t){C(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}function Bt(r){return{user:{...r.user}}}const qt=z(Bt)(Ft),Rt=`<section class="menu chat-menu" blockId="{{blockId}}">
  <button
    class="menu__button menu__button_add"
    type="button"
    (click)="onAddUserDialogOpened"
  >
    <img src="/assets/plus.svg" alt="добавить" class="menu__icon" />
    Добавить пользователя
  </button>
  <button
    class="menu__button menu__button_remove"
    type="button"
    (click)="onRemoveUserDialogOpened"
  >
    <img src="/assets/close.svg" alt="удалить" class="menu__icon" />
    Удалить пользователя
  </button>
  <button
    class="menu__button menu__button_remove"
    type="button"
    (click)="onRemoveChatDialogOpened"
  >
    <img src="/assets/close.svg" alt="удалить" class="menu__icon" />
    Удалить чат
  </button>
</section>
`;class Vt extends m{constructor(){super(Rt),this.selector="chat-menu"}onAddUserDialogOpened(){document.querySelector(".overlay-add-user").classList.add("overlay_opened"),this.close()}onRemoveUserDialogOpened(){document.querySelector(".overlay-remove-user").classList.add("overlay_opened"),this.close()}onRemoveChatDialogOpened(){document.querySelector(".overlay-confirm").classList.add("overlay_opened"),this.close()}close(){var t;(t=this.element)==null||t.classList.remove("opened")}}const jt=`<section class="menu clip-menu" blockId="{{blockId}}">
  <button class="menu__button" type="button">
    <img src="/assets/photo-icon.svg" alt="фото" class="menu__icon" />
    Фото или Видео
  </button>
  <button class="menu__button" type="button">
    <img src="/assets/file-icon.svg" alt="файл" class="menu__icon" />
    Файл
  </button>
  <button class="menu__button" type="button" disabled>
    <img src="/assets/location-icon.svg" alt="локация" class="menu__icon" />
    Локация
  </button>
</section>
`;class Pt extends m{constructor(){super(jt),this.selector="clip-menu"}}const Ht=`<div
  class="overlay overlay-load-file"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="dialog" (click)="onDialogNotClose">
    <h3 class="dialog__title">Загрузите файл</h3>
    <form (submit)="onSubmit">
      <label class="dialog__load-label">
        <input
          class="dialog__load-input"
          type="file"
          name="avatar"
          accept="image/*"
          (input)="onInput"
        />
        <span class="dialog__load-text">Выбрать файл на компьютере</span>
      </label>
      <button class="dialog__submit" type="submit" disabled>Поменять</button>
    </form>
  </section>
</div>
`;class Wt extends m{constructor(){super(Ht),this._userApiService=new w,this._storageService=new b,this.selector="load-file-dialog",this.formData=null,this.filenameElement=null,this.submitElement=null}componentDidMount(){super.componentDidMount(),this.element&&(this.formData=new FormData(this.element.querySelector("form")),this.filenameElement=this.element.querySelector(".dialog__load-text"),this.submitElement=this.element.querySelector(".dialog__submit"))}onInput(t){var s;const e=t.target.files,n=this.element;e.length===0||!n||!this.filenameElement||!this.submitElement||(this.filenameElement.textContent=e[0].name,this.submitElement.disabled=!1,(s=this.formData)==null||s.append("avatar",e[0],e[0].name))}async onSubmit(t){if(t.preventDefault(),!this.formData)return;const e=await this._userApiService.updateAvatar(this.formData).catch(console.error);e&&(await this._storageService.setItem(E,e),f.set("user",e))}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Gt=`<section class="auth login" blockId="{{blockId}}">
  <h2 class="auth__title">Вход</h2>
  <form class="auth__form" name="login" (submit)="onSubmit">
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Логин"
        type="text"
        name="login"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{login_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Пароль"
        type="password"
        name="password"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{password_error}}</span>
    </label>
    <div class="auth__actions">
      <button class="auth__submit" type="submit" disabled>
        Авторизоваться
      </button>
      <router-link link="/sign-up" class="auth__link"
        >Нет аккаунта?</router-link
      >
    </div>
  </form>
</section>
`;class Yt extends m{constructor(){super(Gt,[],{login_error:"",password_error:""}),this._authApiService=new S,this._router=v.__instance,this.form=new k({login:new p("",[d,_],4),password:new p("",[d,_],6)}),this.selector="login-form"}onSubmit(t){t.preventDefault(),this.form.valid&&this._authApiService.signIn(this.form.getRawValue()).then(()=>this._authApiService.user()).then(e=>{if(!e)throw new Error("Get user error");return e}).then(()=>this._router.go("/messenger")).catch(console.error)}onInput(t){A(t,this.form)}onBlur(t){C(t,this.form,this.props,this.element)}}const Jt=`<section class="auth register" blockId="{{blockId}}">
  <h2 class="auth__title">Регистрация</h2>
  <form class="auth__form" name="register" novalidate (submit)="onSubmit">
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Почта"
        type="text"
        name="email"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{email_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Логин"
        type="text"
        name="login"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{login_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Имя"
        type="text"
        name="first_name"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{first_name_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Фамилия"
        type="text"
        name="second_name"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{second_name_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Телефон"
        type="text"
        name="phone"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{phone_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Пароль"
        type="password"
        name="password"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{password_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Пароль (ещё раз)"
        type="password"
        name="password_repeat"
        (input)="onInput"
        (blur)="onBlur"
      />
      <span class="auth__input-error">{{password_repeat_error}}</span>
    </label>
    <div class="auth__actions">
      <button class="auth__submit" type="submit" disabled>
        Зарегистрироваться
      </button>
      <a class="auth__link" href="/">Войти</a>
    </div>
  </form>
</section>
`;class zt extends m{constructor(){super(Jt,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""}),this._authApiService=new S,this._router=v.__instance,this.form=new k({email:new p("",[d,_,N],4),login:new p("",[d,_],4),first_name:new p("",[d,_],4),second_name:new p("",[d,_],4),phone:new p("",[d,_,F],8),password:new p("",[d,_],6),password_repeat:new p("",[d,_],6)}),this.selector="register-form"}onSubmit(t){t.preventDefault(),this.form.valid&&this._authApiService.signUp(this.form.getRawValue()).then(()=>this._authApiService.user()).then(e=>{if(!e)throw new Error("Get user error");return e}).then(()=>this._router.go("/messenger")).catch(console.error)}onInput(t){A(t,this.form)}onBlur(t){C(t,this.form,this.props,this.element)}}const Zt=`<div
  class="overlay overlay-remove-user"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="dialog" (click)="onDialogNotClose">
    <h3 class="dialog__title">Удалить пользователя</h3>
    <form name="remove-user" (submit)="onSubmit">
      <label class="dialog__label">
        <input
          class="dialog__input"
          placeholder="Логин"
          type="text"
          name="login"
          (input)="onInput"
          (blur)="onBlur"
        />
        <span class="auth__input-error">{{login_error}}</span>
      </label>
      <button class="dialog__submit" type="submit" disabled>Удалить</button>
    </form>
  </section>
</div>
`;class Qt extends m{constructor(){super(Zt,[],{login_error:""}),this._userApi=new w,this._chatsApi=new y,this._storageService=new b,this.form=new k({login:new p("",[d,_],4)}),this.selector="remove-user-dialog"}async onSubmit(t){if(t.preventDefault(),!this.form.valid)return;const{login:e}=this.form.getRawValue(),n=await this._storageService.getItem(T),s=await this._storageService.getItem(E);!n||!s||this._userApi.searchUserByLogin(e).then(a=>{if(a.length===0)throw new Error("user not found");return a[0].id}).then(a=>this._chatsApi.deleteUsersFromChat([a],n)).then(()=>{if(s.login===e){const{chats:a=[]}=f.getState(),o=a.filter(l=>l.id!==n);f.set("chats",o)}}).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){A(t,this.form)}onBlur(t){C(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Xt=`<div class="wrapper" blockId="{{blockId}}">
  <aside class="chats">
    <div class="chats__actions">
      <button class="chats__add-chat" (click)="onAddChatOpened">
        Добавить чат
      </button>
      <router-link class="chats__profile-link" link="/settings"
        >Профиль<span class="chats__profile-arrow"> > </span></router-link
      >
    </div>
    <input class="chats__search" placeholder="Поиск" type="text" />
    <ul
      class="chats__list"
      [forOf]="chats"
      [forLet]="chat"
      (click)="onChatClicked"
    ></ul>
  </aside>
  <section class="chat">
    <div class="chat__header">
      <h2 class="chat__name">User name</h2>
      <img class="chat__avatar" src="/assets/no-avatar.svg" />
      <button class="chat__menu" type="button" (click)="onChatMenuToggled">
        <img class="chat__menu-image" src="/assets/menu.svg" alt="меню" />
      </button>
    </div>
    <div class="chat__messages" (scroll)="onMessagesContainerScroll"></div>
    <form class="chat__add-text" name="send-message" (submit)="onSubmit">
      <input
        type="file"
        id="clip-file"
        accept="image/*"
        (input)="onInputFile"
        hidden
      />
      <label for="clip-file" class="chat__button-attach"
        ><img
          src="/assets/clip.svg"
          alt="прикрепить файл"
          class="chat__image-clip"
      /></label>
      <input
        type="text"
        placeholder="Сообщение"
        class="chat__input"
        name="message"
        (input)="onInput"
        (blur)="onBlur"
      />
      <button class="chat__button-send" type="submit" disabled>
        <img src="/assets/exit.svg" alt="отправить" class="chat__image-send" />
      </button>
      <div class="chat__load-files chat__load-files_empty"></div>
    </form>
  </section>
  <template id="chat-list-item-template">
    <li class="chats__list-item">
      <h3 class="chats__item-title">{{title}}</h3>
      <img class="chats__item-image" src="/assets/no-avatar.svg" alt="аватар" />
      <p class="chats__item-message">{{last_message.content}}</p>
      <span class="chats__item-time">{{last_message.time}}</span>
      <span class="chats__message-num">{{unread_count}}</span>
    </li>
  </template>
  <template id="chat-message-with-text-template">
    <div class="chat__message-container">
      <div class="chat__message chat__message-with-text">
        <p class="chat__message-content">{{content}}</p>
        <div class="chat__message-time">{{time}}</div>
      </div>
    </div>
  </template>
  <template id="chat-message-with-photo-template">
    <div class="chat__message-container">
      <div class="chat__message chat__message-with-photo">
        <img class="chat__message-photo" alt="" src="" />
        <span class="chat__message-time">{{time}}</span>
      </div>
    </div>
  </template>
  {{>chat-menu}} {{>clip-menu}} {{>add-user-dialog}} {{>remove-user-dialog}}
  {{>add-chat-dialog}} {{>confirm-dialog}}
</div>
`,Kt=`<div
  class="overlay overlay-confirm"
  blockId="{{blockId}}"
  (click)="onDialogClose"
>
  <section class="dialog" (click)="onDialogNotClose">
    <h3 class="dialog__title">Вы уверены, что хотите удалить чат?</h3>
    <div class="dialog__actions">
      <button
        class="dialog__submit button__warn"
        type="button"
        (click)="onSaveChanges"
      >
        Да
      </button>
      <button class="dialog__submit" type="button" (click)="onDialogClose">
        Нет
      </button>
    </div>
  </section>
</div>
`;class te extends m{constructor(){super(Kt),this._chatsApi=new y,this._storageService=new b,this.selector="confirm-dialog"}async onSaveChanges(){const t=await this._storageService.getItem(T);t&&this._chatsApi.deleteChat(t).then(()=>{const{chats:e=[]}=f.getState(),n=e.filter(s=>s.id!==t);f.set("chats",n)}).then(()=>this.onDialogClose()).catch(console.error)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const ee=500,j=".chat__load-files",P="chat__load-files_empty",x="chats__list-item-active";class ne extends m{constructor(){super(Xt,[new Vt,new Pt,new $t,new Qt,new Lt,new te],{chats:[],chatMessages:{}},{display:"grid"}),this._chatsApiService=new y,this._webSocketApi=new Mt,this._storageService=new b,this._resourcesApiService=new Ot,this._messagesContainer=null,this._currentChatId=null,this.form=new k({message:new p("",[d])}),this.clipFiles=[]}async render(t,e){(t||e)&&(await this._renderMessages(t,e),await this._renderChats(t,e)),super.render(t,e)}async componentDidMount(){this._chatsApiService.getChats().then(e=>e??[]).then(e=>{f.set("chats",e)}).catch(console.error),super.componentDidMount(),this._messagesContainer=document.querySelector(".chat__messages");const t=await this._storageService.getItem(T);this._currentChatId=String(t)}async _renderChats(t,e){var i;if(B(t,e))return;const n=(t==null?void 0:t.chats)??[],s=(e==null?void 0:e.chats)??[],a=document.querySelector(".chats__list");if(s.length===0){a.innerHTML="";return}if(n.length>s.length){for(const u of n)s.includes(u)||(String(u.id)===this._currentChatId&&this._clearMessages(),(i=a.querySelector(`.chats__list-item[chatId="${u.id}"]`))==null||i.remove());return}const o=document.querySelector("#chat-list-item-template").content,l=this._getAddedChats(n,s);for(const u of l){const c=await this._createChat(u,o);a.append(c)}}async _renderMessages(t,e){const n=this._currentChatId,s=await this._storageService.getItem(E);if(!n||!s)return;const a=this._hasChatMessages(n,t),o=this._hasChatMessages(n,e);if(D(o)||!this._messagesContainer)return;const l=this._messagesContainer.children.length===0;if(B(a,o)&&!l)return;const i=document.querySelector("#chat-message-with-text-template").content,u=document.querySelector("#chat-message-with-photo-template").content;let c=null;D(a)||(c=new Date(Date.parse(a[0].time)));let g=null;const{updatedMessages:Z,isAddToEnd:lt}=this._getUpdatedMessages(l,a,o),$=[];for(const O of Z)if(O.type!==H.USER_CONNECTED){const L=new Date(Date.parse(O.time));if(!g||ot(L,g)||c&&tt(L,c)&&tt(L,g)){const ut=this._createDateParagraph(L);$.push(ut),g=L}const ct=this._createMessage(O,u,i,s);$.push(ct)}if(lt)this._messagesContainer.append(...$.slice(l?0:1));else{const O=new Date(Date.parse(Z.at(-1).time));c&&W(c,O)&&this._messagesContainer.children[0].remove(),this._messagesContainer.prepend(...$)}D(a)&&this._scrollMessagesToBottom()}async onSubmit(t){if(t.preventDefault(),!this.form.valid&&D(this.clipFiles))return;const e=this._currentChatId;if(!e){console.error("Чат не выбран");return}const n=this.form.getRawValue();if(!D(this.clipFiles)){for(const{id:a}of this.clipFiles)await this._webSocketApi.sendMessage(e,{content:String(a),type:"file"});const s=document.querySelector(j);s.innerHTML="",s.classList.add(P)}D(n.message)||await this._webSocketApi.sendMessage(e,{content:n.message,type:"message"}),this._resetForm(),this._scrollMessagesToBottom()}onInput(t){A(t,this.form)}onInputFile(t){const e=t.target.files;if(e.length===0)return;const n=new FormData;n.append("resource",e[0],e[0].name),this._resourcesApiService.loadFile(n).then(s=>{var l;const a=document.createElement("IMG");a.src=`${I}/resources${s.path}`,a.alt=s.filename;const o=document.querySelector(j);o!=null&&o.classList.contains(P)&&(o==null||o.classList.remove(P)),(l=document.querySelector(j))==null||l.append(a),document.querySelector("button.chat__button-send").disabled=!1,this.clipFiles.push(s)}).catch(console.error)}onBlur(t){C(t,this.form,this.props,this.element)}onChatMenuToggled(){var t;(t=document.querySelector(".chat-menu"))==null||t.classList.toggle("opened")}onClipMenuToggled(){var t;(t=document.querySelector(".clip-menu"))==null||t.classList.toggle("opened")}onAddChatOpened(){var t;(t=document.querySelector(".overlay-add-chat"))==null||t.classList.add("overlay_opened")}async onMessagesContainerScroll(){var t,e;if(((t=this._messagesContainer)==null?void 0:t.scrollTop)===0){const n=this._currentChatId;if(!n)return;const s=this.props.chatMessages??{};await this._webSocketApi.sendMessage(n,{content:`${((e=s[n])==null?void 0:e.length)??0}`,type:"get old"})}}async onChatClicked(t){var o;if(!t.target)return;const e=t.target,n=e.tagName==="LI"?e:e.parentElement,s=n.getAttribute("chatId");if(!s)return;const a=this._currentChatId;a&&a===s||((o=document.querySelector(`.${x}`))==null||o.classList.remove(x),this._clearMessages(),this._currentChatId=s,await this._storageService.setItem(T,s),n.classList.add(x),await(this._webSocketApi.isConnected(s)?this._renderMessages(void 0,this.props):this._loadMessages(s)))}_loadMessages(t){return this._webSocketApi.connect(t)}_resetForm(){const t=document.querySelector('form[name="send-message"]');t==null||t.reset(),this.clipFiles=[],document.querySelector("button.chat__button-send").disabled=!0}_scrollMessagesToBottom(){setTimeout(()=>{this._messagesContainer&&(this._messagesContainer.scrollTop=this._messagesContainer.scrollHeight)},ee)}_hasChatMessages(t,e){const n=e?e.chatMessages??{}:{};return Object.getOwnPropertyNames(n).includes(t)?n[t]:[]}_createDateParagraph(t){const e=document.createElement("p");return e.classList.add("chat__date"),e.textContent=`${t.getDate()}.${t.getMonth()}.${t.getFullYear()}`,e}_getAddedChats(t,e){const n=[];if(t.length===0)return e;const s=new Map;for(const a of t)s.set(a.id,a);for(const a of e)s.get(a.id)||n.push(a);return n}_getUpdatedMessages(t,e,n){if(t||D(e))return{updatedMessages:n,isAddToEnd:!0};const s=e[0],a=n[0];return s.id!==a.id?{updatedMessages:n.slice(0,n.length-e.length),isAddToEnd:!1}:{updatedMessages:n.slice(e.length),isAddToEnd:!0}}_clearMessages(){this._messagesContainer&&(this._messagesContainer.innerHTML="")}async _createChat(t,e){const{id:n,last_message:s,avatar:a}=t,l=e.cloneNode(!0).children[0],i=l.querySelector("img.chats__item-image"),u=document.createAttribute("chatId");u.value=String(n),l.attributes.setNamedItem(u),this._currentChatId===String(n)&&(l.classList.add(x),await this._loadMessages(String(n)));const c=s?{...s,time:X(s.time)}:{content:"Ещё нет сообщений",time:""},g={...t,avatar:a??"/assets/no-avatar.svg",last_message:c};return i&&(i.src=g.avatar),this.templater.compile(g,l,!1),l}_createMessage(t,e,n,s){const{type:a,time:o,user_id:l,file:i}=t;let u,c;if(a===H.FILE){u=e.cloneNode(!0),c=u.children[0];const g=c.querySelector(".chat__message-photo");g.src=`${I}/resources${(i==null?void 0:i.path)??""}`,g.alt=(i==null?void 0:i.filename)??""}else u=n.cloneNode(!0),c=u.children[0];return c.children[0].classList.add(s.id===l?"chat__message_from-user":"chat__message_to-user"),this.templater.compile({...t,time:X(o)},c,!1),c}}function se(r){return{chatMessages:{...r.chatMessages},chats:[...r.chats??[]]}}const re=z(se)(ne),ae=`<section blockId="{{blockId}}">{{>login-form}}</section>
`;class oe extends m{constructor(){super(ae,[new Yt])}}const ie=`<section class="profile" blockId="{{blockId}}">
  <img
    src="/assets/no-avatar.svg"
    class="profile__image"
    alt="ваш аватар"
    (click)="onAvatarClicked"
  />
  <h2 class="profile__title">{{first_name}}</h2>
  <table class="profile__table profile__table_big">
    <tr class="profile__table-row">
      <td class="profile__table-cell">Почта</td>
      <td class="profile__table-cell">{{email}}</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Логин</td>
      <td class="profile__table-cell">{{login}}</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Имя</td>
      <td class="profile__table-cell">{{first_name}}</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Фамилия</td>
      <td class="profile__table-cell">{{second_name}}</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Имя в чате</td>
      <td class="profile__table-cell">{{display_name}}</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Телефон</td>
      <td class="profile__table-cell">{{phone}}</td>
    </tr>
  </table>
  <table class="profile__table profile__table_small">
    <tr class="profile__table-row">
      <td class="profile__table-cell">
        <button
          class="profile__button profile__button_data"
          type="button"
          (click)="onChangeDataDialogOpened"
        >
          Изменить данные
        </button>
      </td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">
        <button
          class="profile__button profile__button_pass"
          type="button"
          (click)="onChangePasswordDialogOpened"
        >
          Изменить пароль
        </button>
      </td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">
        <button
          class="profile__button profile__button_warn"
          type="button"
          (click)="onLogout"
        >
          Выйти
        </button>
      </td>
    </tr>
  </table>
  <aside class="sidebar">
    <router-link link="/messenger" class="sidebar__link">
      <img
        src="/assets/exit.svg"
        alt="Вернуться к чатам"
        class="sidebar__image"
      />
    </router-link>
  </aside>
  {{>change-password-dialog}} {{>change-user-data-dialog}} {{>load-file-dialog}}
</section>
`;class le extends m{constructor(){super(ie,[new qt({}),new xt,new Wt],void 0,{display:"flex"}),this._authApiService=new S,this._router=v.__instance}render(t,e){e&&this._renderProfile(e),super.render(t,e)}onAvatarClicked(){var t;(t=document.querySelector(".overlay-load-file"))==null||t.classList.add("overlay_opened")}onChangeDataDialogOpened(){var t;(t=document.querySelector(".overlay-change-data"))==null||t.classList.add("overlay_opened")}onChangePasswordDialogOpened(){var t;(t=document.querySelector(".overlay-change-password"))==null||t.classList.add("overlay_opened")}onLogout(){this._authApiService.logout().then(()=>this._router.go("/")).catch(console.error)}_renderProfile(t){const e=document.querySelector(".profile__image");if(e){const{avatar:n}=t;n&&(e.src=`${I}/resources${n}`)}}}function ce(r){return{...r.user}}const ue=z(ce)(le),he=`<section blockId="{{blockId}}">{{>register-form}}</section>
`;class de extends m{constructor(){super(he,[new zt])}}async function et(){return!!await new b().getItem(E)}window.addEventListener("DOMContentLoaded",async()=>{const r=[{path:"/messenger",component:re,canActivate:et},{path:"/404",component:yt},{path:"/500",component:St},{path:"/",component:oe},{path:"/sign-up",component:de},{path:"/settings",component:ue,canActivate:et}],t=new v("#root");for(const n of r)t.use(n);await t.start(),new S().user().then(n=>{if(n){try{f.set("user",n)}catch(s){console.error(s)}(document.location.pathname==="/"||document.location.pathname==="/sign-up")&&t.go("/messenger")}}),customElements.get("router-link")||customElements.define("router-link",vt)},{once:!0});
