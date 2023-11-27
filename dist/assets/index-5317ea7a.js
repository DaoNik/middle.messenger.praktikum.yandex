var St=Object.defineProperty;var Ct=(s,e,t)=>e in s?St(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var o=(s,e,t)=>(Ct(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const Dt=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class _t{constructor(){o(this,"_listeners",{})}on(e,t){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t)}off(e,t){if(!this._listeners[e])throw new Error("Нет такого события");this._listeners[e]=this._listeners[e].filter(n=>n!==t)}emit(e,...t){if(!this._listeners[e])throw new Error("Нет такого события");for(const n of this._listeners[e])n(...t)}}let j;const It=new Uint8Array(16);function kt(){if(!j&&(j=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!j))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return j(It)}const f=[];for(let s=0;s<256;++s)f.push((s+256).toString(16).slice(1));function Et(s,e=0){return(f[s[e+0]]+f[s[e+1]]+f[s[e+2]]+f[s[e+3]]+"-"+f[s[e+4]]+f[s[e+5]]+"-"+f[s[e+6]]+f[s[e+7]]+"-"+f[s[e+8]]+f[s[e+9]]+"-"+f[s[e+10]]+f[s[e+11]]+f[s[e+12]]+f[s[e+13]]+f[s[e+14]]+f[s[e+15]]).toLowerCase()}const At=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),it={randomUUID:At};function Mt(s,e,t){if(it.randomUUID&&!e&&!s)return it.randomUUID();s=s||{};const n=s.random||(s.rng||kt)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,e){t=t||0;for(let r=0;r<16;++r)e[t+r]=n[r];return e}return Et(n)}const lt=(s,e)=>{const t=e.split(".");if(t.length===1)return s[e];let n=s;for(const r of t)(typeof n=="object"&&n!==null&&Object.getOwnPropertyNames(n).includes(r)||Array.isArray(n)&&Number.isNaN(Number(r))&&Number(r)>=0&&n.length>Number(r))&&(n=n[r]);return n};class Ot{constructor(){o(this,"elementsContentMap",new Map)}precompile(e,t,n){const r=e.match(/{{>[\w-]*}}/gm);let a=e;const i=new Map;if(a=a.replaceAll(/{{blockId}}/gm,n),!r||r.length===0||t.length===0)return a;for(const l of t)i.set(l.selector,l.content);for(const l of r.map(c=>c.slice(3,-2))){const c=new RegExp(`{{>${l}}}`,"gm");i.has(l)&&(a=a.replace(c,i.get(l)))}return a}compile(e,t,n=!0,r){t.children.length>0&&this._replaceTextContentChildNode(t.children,e,n,r),this._replaceTextContent(t,e,n,r)}addEvents(e,t){this._addOrRemoveEvents(e,t,!1),e.children.length>0&&this._registerEvents(e.children,t,!1)}removeEvents(e,t){this._addOrRemoveEvents(e,t,!0),e.children.length>0&&this._registerEvents(e.children,t,!0)}_registerEvents(e,t,n){for(const r of e)r.attributes.getNamedItem("blockId")||(this._addOrRemoveEvents(r,t,n),r.children.length>0&&this._registerEvents(r.children,t,n))}_addOrRemoveEvents(e,t,n){const r=/^\(.*\)$/;for(const a of e.attributes)if(r.test(a.name)){const i=a.name.slice(1,-1),c=Object.getPrototypeOf(t)[a.value];if(!c||typeof c!="function")return;n?e.removeEventListener(i,c.bind(t)):e.addEventListener(i,c.bind(t))}}_replaceTextContentChildNode(e,t,n,r){if(e.length!==0)for(const a of e)a.attributes.getNamedItem("blockId")||(a.children.length>0&&this._replaceTextContentChildNode(a.children,t,n,r),this._replaceTextContent(a,t,n,r))}_replaceTextContent(e,t,n,r){const a=e.textContent;if(this._renderSavedContent(t),!a)return;const i=a.match(/{{[\w'().-]*}}/gm);if(!(!i||i.length===0||t.length===0))for(const l of i.map(c=>c.slice(2,-2))){const c=new RegExp(`{{${l}}}`,"gm"),h=lt(t,l)??"";if(n){const u=r?`${r}.${l}`:l,m=this.elementsContentMap.get(u)??new Set;m.add(e),this.elementsContentMap.set(u,m)}typeof h=="string"||typeof h=="number"?e.textContent=a.replace(c,String(h)):Array.isArray(h)&&(e.textContent=a.replace(c,h.join(", ")))}}_renderSavedContent(e){for(const[t,n]of this.elementsContentMap.entries()){const r=lt(e,t),a=r?String(r):"";for(const i of n)i.textContent=a}}}var pt=(s=>(s.INIT="init",s.FLOW_CDM="flow:component-did-mount",s.FLOW_RENDER="flow:render",s.FLOW_CDU="flow:component-did-update",s.DESTROY="destroy",s))(pt||{});class b{constructor(e,t=[],n={},r={}){o(this,"eventBus",new _t);o(this,"props");o(this,"blockId",Mt());o(this,"content");o(this,"templater",new Ot);o(this,"declarations");o(this,"hostStyles");o(this,"element",null);this.content=e,this.declarations=t,this.hostStyles=r,this.props=this._makePropsProxy(n),this._registerEvents(),this.eventBus.emit("init")}_registerEvents(){this.eventBus.on("init",this._init.bind(this)),this.eventBus.on("flow:component-did-mount",this._componentDidMount.bind(this)),this.eventBus.on("flow:render",this._render.bind(this)),this.eventBus.on("flow:component-did-update",this._componentDidUpdate.bind(this)),this.eventBus.on("destroy",this._componentDidUnmount.bind(this))}_init(){this.init(),this.eventBus.emit("flow:render")}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.element=document.querySelector(`[blockId="${this.blockId}"]`),this.templater.addEvents(this.element,this),this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const e of this.declarations)e.eventBus.emit("flow:component-did-mount");this.templater.compile(this.props,this.element)}_render(e,t){this.render(e,t)}render(e,t){this.content&&this.element&&this.templater.compile(t??this.props,this.element)}_componentDidUpdate(e,t){this.componentDidUpdate(e,t)&&this.eventBus.emit("flow:render",e,t)}componentDidUpdate(e,t){return JSON.stringify(e)!==JSON.stringify(t)}_makePropsProxy(e){const t=this.eventBus;return new Proxy(e,{get(n,r){const a=n[r];return typeof a=="function"?a.bind(n):a},set(n,r,a){const i={...n};return n[r]=a,t.emit("flow:component-did-update",i,n),!0}})}_componentDidUnmount(){this.element&&this.templater.removeEvents(this.element,this)}show(){this.element&&(this.element.style.display=this.hostStyles.display??"block")}hide(){this.element&&(this.element.style.display="none")}setProps(e){e&&Object.assign(this.props,e)}}function O(s,e){var n;const t=s.target;(n=e.getControl(t.name))==null||n.setValue(s)}function I(s,e,t,n){var a;const r=s.target;(a=e.getControl(r.name))==null||a.blur(s,e,t,n)}function _(s){return s.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function p(s,e){return s.length>=e?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${e} символов`}}function H(s){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function G(s){return/\d{7,15}/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function Lt(s){let e=!0;for(const t of Object.values(s.controls))t.valid||(e=!1);return e}function Tt(s,e,t){const n={isValid:!0,error:""};if(e.includes(_)){const{isValid:r,error:a}=_(s);n.isValid=n.isValid&&r,n.error=a}if(e.includes(p)){const{isValid:r,error:a}=p(s,t??0);n.isValid=n.isValid&&r,n.error=a}if(e.includes(H)){const{isValid:r,error:a}=H(s);n.isValid=n.isValid&&r,n.error=a}if(e.includes(G)){const{isValid:r,error:a}=G(s);n.isValid=n.isValid&&r,n.error=a}return n}class g{constructor(e="",t=[],n){o(this,"valid",!1);o(this,"error","");this.value=e,this.validators=t,this.minLength=n}clear(){this.value="",this.error="",this.valid=!1}setValue(e){const{value:t}=e.target;if(this.value===t)return;this.value=t;const{isValid:n,error:r}=Tt(t,this.validators,this.minLength);this.error=r,this.valid=n}blur(e,t,n,r){const a=e.target;n[`${a.name}_error`]!==this.error&&(n[`${a.name}_error`]=this.error),t.valid=Lt(t);const i=r==null?void 0:r.querySelector('button[type="submit"]');i.disabled=!t.valid}}class k{constructor(e){o(this,"valid",!1);this.controls=e}getRawValue(){const e={};for(const[t,n]of Object.entries(this.controls))e[t]=n.value;return e}getControl(e){return Object.getOwnPropertyNames(this.controls).includes(e)?this.controls[e]:null}}const T={GET:"GET",POST:"POST",PUT:"PUT",PATCH:"PATCH",DELETE:"DELETE"},z="Content-Type";function Ut(s){return Object.keys(s).reduce((e,t,n,r)=>`${e}${t}=${s[t]}${n<r.length-1?"&":""}`,"?")}class Y{constructor(){o(this,"get",(e,t={},n)=>(t.data&&Object.keys(t.data).length>0&&(e+=Ut(t.data)),this.request(e,{...t,method:T.GET,headers:{Accept:"application/json",...t.headers}},t.timeout,n)));o(this,"post",(e,t={},n)=>{const r={...t.headers};return t.data instanceof FormData||(r[z]="application/json"),this.request(e,{...t,method:T.POST,headers:r},t.timeout,n)});o(this,"put",(e,t={},n)=>{const r={...t.headers};return t.data instanceof FormData||(r[z]="application/json"),this.request(e,{...t,method:T.PUT,headers:r},t.timeout,n)});o(this,"patch",(e,t={},n)=>this.request(e,{...t,method:T.PATCH},t.timeout,n));o(this,"delete",(e,t={},n)=>{const r={...t.headers};return t.data instanceof FormData||(r[z]="application/json"),this.request(e,{...t,method:T.DELETE,headers:r},t.timeout,n)})}request(e,t,n=5e3,r=!0){const{method:a="",data:i,headers:l={}}=t;return new Promise((c,h)=>{const u=new XMLHttpRequest;u.withCredentials=r,u.open(a,e);for(const m in l)u.setRequestHeader(m,l[m]);u.addEventListener("load",function(){c(u)}),u.addEventListener("abort",h),u.onerror=h,u.timeout=n,u.ontimeout=h,a===T.GET||!i?u.send():i instanceof FormData?u.send(i):u.send(JSON.stringify(i))}).then(c=>{if(c.status>=400)throw c;return c}).then(c=>{try{return JSON.parse(c.response)}catch{return c.response}})}}function $t(s,e){return s===e}class xt{constructor(e,t,n,r){o(this,"_blockClass");o(this,"_block");o(this,"_query");o(this,"_pathname");o(this,"canActivate");this._pathname=e,this._blockClass=t,this._block=null,this._query=n,this.canActivate=r??null}navigate(e){this.match(e)&&(this._pathname=e,this.render())}leave(){this._block&&this._block.hide()}match(e){return e.includes(tt.MESSENGER)&&this._pathname===tt.MESSENGER?!0:$t(e,this._pathname)}render(){const e=document.querySelector(this._query);if(!this._block){this._block=new this._blockClass,e.innerHTML=this._block.content,this._block.eventBus.emit(pt.FLOW_CDM);return}this._block.show(),e.insertAdjacentElement("afterbegin",this._block.element)}}const x=class{constructor(e){o(this,"_rootQuery","#root");o(this,"history",window.history);o(this,"_currentRoute",null);o(this,"routes",[]);if(x.__instance)return x.__instance;this.routes=[],this.history=window.history,this._currentRoute=null,this._rootQuery=e,x.__instance=this}use({path:e,component:t,canActivate:n}){const r=new xt(e,t,this._rootQuery,n);return this.routes.push(r),this}async start(){window.addEventListener("popstate",({currentTarget:e})=>{e instanceof Window&&this._onRoute(e.location.pathname)}),await this._onRoute(window.location.pathname)}async go(e){this.history.pushState({},"",e),await this._onRoute(e)}back(){this.history.back()}forward(){this.history.forward()}getRoute(e){return this.routes.find(t=>t.match(e))}async _onRoute(e){var r;const t=this.getRoute(e);if(!t||(r=this._currentRoute)!=null&&r.match(t._pathname))return;if(!(t.canActivate?await t.canActivate():!0)){console.error(`you do not have access to ${e} page`);return}this._currentRoute&&this._currentRoute.leave(),this._currentRoute=t,t.render()}};let S=x;o(S,"__instance");class Nt extends HTMLElement{constructor(){super();o(this,"_router",S.__instance)}connectedCallback(){const t=this.getAttribute("link")??"/messenger";this.addEventListener("click",()=>{this._router.go(t)})}disconnectedCallback(){const t=this.getAttribute("link")??"/messenger";this.removeEventListener("click",()=>{this._router.go(t)})}static get observedAttributes(){return["link"]}}class Ft extends b{constructor(){super(Dt)}}const Bt=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class Rt extends b{constructor(){super(Bt)}}const qt=`<div
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
`,mt="ya-praktikum.tech",M=`https://${mt}/api/v2`,Vt=`wss://${mt}`;function ct(s){const e=new Date(Date.parse(s)),t=new Date(Date.now());if(t.getFullYear()!==e.getFullYear()||t.getMonth()!==e.getMonth()||t.getDate()-e.getDate()>6)return`${e.getDate()}.${e.getMonth()}.${e.getFullYear()}`;const n=e.getMinutes(),r=n>9?n:`0${n}`;return`${e.getHours()}:${r}`}function E(s){return!s||typeof s=="number"||typeof s=="boolean"||typeof s=="function"?!0:typeof s=="string"||Array.isArray(s)?s.length===0:typeof s=="object"?s.keys?[...s].length===0:Object.keys(s).length===0:!1}function jt(s){return typeof s=="object"&&s!==null&&s.constructor===Object&&Object.prototype.toString.call(s)==="[object Object]"}function gt(s){return Array.isArray(s)}function ut(s){return jt(s)||gt(s)}function W(s,e){if(Object.keys(s).length!==Object.keys(e).length)return!1;for(const[t,n]of Object.entries(s)){const r=gt(e)?e[Number(t)]:e[t];if(ut(n)&&ut(r)){if(W(n,r))continue;return!1}if(n!==r)return!1}return!0}function et(s,e){return s.getFullYear()===e.getFullYear()&&s.getMonth()===e.getMonth()&&s.getDate()===e.getDate()}function ft(s,e){return et(s,e)?!1:s.getFullYear()>e.getFullYear()||s.getMonth()>e.getMonth()?!0:s.getDate()>e.getDate()}function ht(s,e){return!et(s,e)&&!ft(s,e)}function Pt(s){const e=typeof s;return!s||e==="string"||e==="number"||e==="boolean"||e==="bigint"}const d=(...s)=>{let e="";for(const[t,n]of s.entries())e+=String(n),!String(n).endsWith("/")&&t!==s.length-1&&!String(s[t+1]).startsWith("/")&&(e+="/");return e};function bt(s){return typeof s=="object"&&s!==null&&s.constructor===Object&&Object.prototype.toString.call(s)==="[object Object]"}function J(s){return Array.isArray(s)}function nt(s){return bt(s)||J(s)}function Z(s){if(!bt(s))throw new Error("input must be an object");const e=Object.keys(s).length;let t="",n=0;for(const[r,a]of Object.entries(s))nt(a)?J(a)?t+=st(r,a):t+=rt(r,a):t+=`${r}=${a}`,n!==e-1&&(t+="&"),n++;return t}function st(s,e){let t="";for(let n=0;n<e.length;n++){const r=e[n];nt(r)?J(r)?t+=st(`${s}[${n}]`,r):t+=rt(`${s}[${n}]`,r):t+=`${s}[${n}]=${r}`,n!==e.length-1&&(t+="&")}return t}function rt(s,e){let t="",n=0;const r=Object.keys(e).length;for(const[a,i]of Object.entries(e))nt(i)?J(i)?t+=st(`${s}[${a}]`,i):t+=rt(`${s}[${a}]`,i):t+=`${s}[${a}]=${i}`,n!==r-1&&(t+="&"),n++;return t}const L="authUser",q="currentChatId",N=class{constructor(){if(N.__instance)return N.__instance;N.__instance=this}async getItem(e){const t=localStorage.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return null}}async setItem(e,t){const n=Pt(t)?String(t):JSON.stringify(t);localStorage.setItem(e,n)}async removeItem(e){localStorage.removeItem(e)}async clear(){localStorage.clear()}};let v=N;o(v,"__instance");var K=(s=>(s.MESSAGE="message",s.FILE="file",s.USER_CONNECTED="user connected",s))(K||{});class Ht extends _t{constructor(){super(...arguments);o(this,"_state",{})}getState(){return this._state}set(t,n){this._state={...this._state,[t]:n},this.emit("update",this._state)}}const y=new Ht;function at(s){return e=>class extends e{constructor(t){super({...t,...s(y.getState())}),y.on("update",()=>{const n=s(y.getState());this.setProps(n)})}}}const F=class{constructor(){o(this,"_http",new Y);o(this,"_baseUrl",d(M,"auth"));o(this,"_router",S.__instance);o(this,"_storageService",new v);if(F.__instance)return F.__instance;F.__instance=this}signUp(e){return this._http.post(d(this._baseUrl,"signup"),{data:e})}signIn(e){return this._http.post(d(this._baseUrl,"signin"),{data:e})}async user(){try{const e=await this._http.get(d(this._baseUrl,"user"));return await this._storageService.setItem(L,e),e}catch(e){console.error(e),await this._storageService.clear(),await this._router.go("/")}}async logout(){return this._http.post(d(this._baseUrl,"logout")).then(()=>this._storageService.clear())}};let A=F;o(A,"__instance");const B=class{constructor(){o(this,"_baseUrl",d(M,"chats"));o(this,"_http",new Y);if(B.__instance)return B.__instance;B.__instance=this}getChats(e){let t=this._baseUrl;return e&&Object.keys(e).length>0&&(t+=`?${Z(e)}`),this._http.get(t)}createChat(e){return this._http.post(this._baseUrl,{data:{title:e}})}deleteChat(e){return this._http.delete(this._baseUrl,{data:{chatId:e}})}getChatFiles(e){return this._http.get(d(this._baseUrl,e,"files"))}getArchiveChats(e){let t=d(this._baseUrl,"archive");return e&&Object.keys(e).length>0&&(t+=`?${Z(e)}`),this._http.get(t)}archiveChat(e){return this._http.post(d(this._baseUrl,"archive"),{data:{chatId:e}})}unarchiveChat(e){return this._http.post(d(this._baseUrl,"unarchive"),{data:{chatId:e}})}getCommonChatWithUser(e){return this._http.get(d(this._baseUrl,e,"common"))}getChatUsers(e,t){let n=d(this._baseUrl,e,"users");return t&&Object.keys(t).length>0&&(n+=`?${Z(t)}`),this._http.get(n)}getNewChatMessages(e){return this._http.get(d(this._baseUrl,"new",e))}changeChatAvatar(e){return this._http.put(d(this._baseUrl,"avatar"),{data:e})}addUsersToChat(e,t){return this._http.put(d(this._baseUrl,"users"),{data:{users:e,chatId:t}})}deleteUsersFromChat(e,t){return this._http.delete(d(this._baseUrl,"users"),{data:{users:e,chatId:t}})}getTokenForConnectMessagesServer(e){return this._http.post(d(this._baseUrl,"token",e))}};let C=B;o(C,"__instance");const R=class{constructor(){o(this,"_baseUrl",d(M,"user"));o(this,"_http",new Y);if(R.__instance)return R.__instance;R.__instance=this}updateUserData(e){return this._http.put(d(this._baseUrl,"profile"),{data:e})}updateAvatar(e){return this._http.put(d(this._baseUrl,"profile/avatar"),{data:e})}updatePassword(e){return this._http.put(d(this._baseUrl,"password"),{data:e})}getUserById(e){return this._http.get(d(this._baseUrl,e))}searchUserByLogin(e){return this._http.post(d(this._baseUrl,"search"),{data:{login:e}})}};let D=R;o(D,"__instance");const Gt=1e4;class Wt{constructor(){o(this,"_chatsApi",new C);o(this,"_storageService",new v);o(this,"_socketsMap",new Map);o(this,"_intervalIdMap",new Map)}async connect(e){if(this.isConnected(e))return;const t=await this._storageService.getItem(L);t&&this._chatsApi.getTokenForConnectMessagesServer(Number(e)).then(n=>{const r=new WebSocket(`${Vt}/ws/chats/${t.id}/${e}/${n.token}`);this._socketsMap.set(e,r),this._initListeners(e,r)}).catch(console.error)}async sendMessage(e,t){const n=this._socketsMap.get(e);if(n)try{n.send(JSON.stringify(t))}catch{await this.connect(e)}}_initListeners(e,t){if(!this._intervalIdMap.get(e)){const n=setInterval(async()=>{await this.sendMessage(e,{type:"ping"})},Gt);this._intervalIdMap.set(e,n)}t.addEventListener("open",()=>{console.log("Соединение установлено"),this.sendMessage(e,{content:"0",type:"get old"}).then()}),t.addEventListener("close",n=>{n.wasClean?console.log("Соединение закрыто чисто"):console.log("Обрыв соединения"),console.log(`Код: ${n.code} | Причина: ${n.reason}`)}),t.addEventListener("message",n=>{try{const r=JSON.parse(n.data);if(r.type==="pong")return;const a=r,i=Array.isArray(a)?a:[a],l=y.getState().chatMessages??{},c=l[e]??[];l[e]=[...i,...c].sort((h,u)=>h.time>u.time?1:-1),y.set("chatMessages",l)}catch(r){console.error(r)}}),t.addEventListener("error",n=>{console.log("Ошибка",n.message)})}isConnected(e){const t=this._socketsMap.get(e);return!!(t&&(t.CONNECTING||t.OPEN))}}class Yt{constructor(){o(this,"_http",new Y);o(this,"_baseUrl",d(M,"resources"))}loadFile(e){return this._http.post(this._baseUrl,{data:e})}}class Jt extends b{constructor(){super(qt,[],{title_error:""});o(this,"_chatsApi",new C);o(this,"form",new k({title:new g("",[_,p],4)}));o(this,"selector","add-chat-dialog")}onSubmit(t){if(t.preventDefault(),!this.form.valid)return;const{title:n}=this.form.getRawValue();this._chatsApi.createChat(n).then(()=>this._chatsApi.getChats()).then(r=>{y.set("chats",r)}).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){O(t,this.form)}onBlur(t){I(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const zt=`<div
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
`;class Zt extends b{constructor(){super(zt,[],{login_error:""});o(this,"_chatsApi",new C);o(this,"_userApi",new D);o(this,"_storageService",new v);o(this,"form",new k({login:new g("",[_,p],4)}));o(this,"selector","add-user-dialog")}async onSubmit(t){t.preventDefault();const n=this.form;if(!n.valid)return;const r=n.controls.login,a=await this._storageService.getItem(q);a&&this._userApi.searchUserByLogin(r.value).then(i=>{if(i.length===0)throw new Error("user not found");return i[0].id}).then(i=>this._chatsApi.addUsersToChat([i],a)).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){O(t,this.form)}onBlur(t){I(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Qt=`<div
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
`;class Xt extends b{constructor(){super(Qt,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""});o(this,"_userApiService",new D);o(this,"form",new k({oldPassword:new g("",[_,p],6),newPassword:new g("",[_,p],6),password_repeat:new g("",[_,p],6)}));o(this,"selector","change-password-dialog")}componentDidMount(){super.componentDidMount()}onSubmit(t){t.preventDefault(),this.form.valid&&this._userApiService.updatePassword(this.form.getRawValue()).then(()=>{this.onDialogClose()}).catch(console.error)}onInput(t){var r;const n=t.target;(r=this.form.getControl(n.name))==null||r.setValue(t)}onBlur(t){I(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const Kt=`<div
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
`;class te extends b{constructor(){super(Kt,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",display_name_error:""});o(this,"_userApiService",new D);o(this,"_storageService",new v);o(this,"form",new k({email:new g("",[_,p,H],4),login:new g("",[_,p],4),display_name:new g("",[_,p],4),first_name:new g("",[_,p],4),second_name:new g("",[_,p],4),phone:new g("",[_,p,G],8)}));o(this,"selector","change-user-data-dialog")}render(t,n){if(!W((t==null?void 0:t.user)??{},(n==null?void 0:n.user)??{})){const{user:r}=n??{};if(r){const a=document.querySelectorAll('form[name="change-data"] input');for(const i of a)i.value=String(r[i.name]);for(const[i,l]of Object.entries(this.form.controls))l.setValue({target:{value:String(r[i])}})}}super.render(t,n)}componentDidMount(){super.componentDidMount()}onSubmit(t){t.preventDefault(),this.form.valid&&this._userApiService.updateUserData(this.form.getRawValue()).then(n=>(y.set("user",n),this._storageService.setItem(L,n))).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){O(t,this.form)}onBlur(t){I(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}function ee(s){return{user:{...s.user}}}const ne=at(ee)(te),se=`<section class="menu chat-menu" blockId="{{blockId}}">
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
`;class re extends b{constructor(){super(se);o(this,"selector","chat-menu")}onAddUserDialogOpened(){document.querySelector(".overlay-add-user").classList.add("overlay_opened"),this.close()}onRemoveUserDialogOpened(){document.querySelector(".overlay-remove-user").classList.add("overlay_opened"),this.close()}onRemoveChatDialogOpened(){document.querySelector(".overlay-confirm").classList.add("overlay_opened"),this.close()}close(){var t;(t=this.element)==null||t.classList.remove("opened")}}const ae=`<section class="menu clip-menu" blockId="{{blockId}}">
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
`;class oe extends b{constructor(){super(ae);o(this,"selector","clip-menu")}}const ie=`<div
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
`;class le extends b{constructor(){super(ie);o(this,"_userApiService",new D);o(this,"_storageService",new v);o(this,"selector","load-file-dialog");o(this,"formData",null);o(this,"filenameElement",null);o(this,"submitElement",null)}componentDidMount(){super.componentDidMount(),this.element&&(this.formData=new FormData(this.element.querySelector("form")),this.filenameElement=this.element.querySelector(".dialog__load-text"),this.submitElement=this.element.querySelector(".dialog__submit"))}onInput(t){var a;const n=t.target.files,r=this.element;n.length===0||!r||!this.filenameElement||!this.submitElement||(this.filenameElement.textContent=n[0].name,this.submitElement.disabled=!1,(a=this.formData)==null||a.append("avatar",n[0],n[0].name))}async onSubmit(t){if(t.preventDefault(),!this.formData)return;const n=await this._userApiService.updateAvatar(this.formData).catch(console.error);n&&(await this._storageService.setItem(L,n),y.set("user",n))}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const ce=`<section class="auth login" blockId="{{blockId}}">
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
`;class ue extends b{constructor(){super(ce,[],{login_error:"",password_error:""});o(this,"_authApiService",new A);o(this,"_router",S.__instance);o(this,"form",new k({login:new g("",[_,p],4),password:new g("",[_,p],6)}));o(this,"selector","login-form")}onSubmit(t){t.preventDefault(),this.form.valid&&this._authApiService.signIn(this.form.getRawValue()).then(()=>this._authApiService.user()).then(n=>{if(!n)throw new Error("Get user error");return n}).then(()=>this._router.go("/messenger")).catch(console.error)}onInput(t){O(t,this.form)}onBlur(t){I(t,this.form,this.props,this.element)}}const he=`<section class="auth register" blockId="{{blockId}}">
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
`;class de extends b{constructor(){super(he,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""});o(this,"_authApiService",new A);o(this,"_router",S.__instance);o(this,"form",new k({email:new g("",[_,p,H],4),login:new g("",[_,p],4),first_name:new g("",[_,p],4),second_name:new g("",[_,p],4),phone:new g("",[_,p,G],8),password:new g("",[_,p],6),password_repeat:new g("",[_,p],6)}));o(this,"selector","register-form")}onSubmit(t){t.preventDefault(),this.form.valid&&this._authApiService.signUp(this.form.getRawValue()).then(()=>this._authApiService.user()).then(n=>{if(!n)throw new Error("Get user error");return n}).then(()=>this._router.go("/messenger")).catch(console.error)}onInput(t){O(t,this.form)}onBlur(t){I(t,this.form,this.props,this.element)}}const _e=`<div
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
`;class pe extends b{constructor(){super(_e,[],{login_error:""});o(this,"_userApi",new D);o(this,"_chatsApi",new C);o(this,"_storageService",new v);o(this,"form",new k({login:new g("",[_,p],4)}));o(this,"selector","remove-user-dialog")}async onSubmit(t){if(t.preventDefault(),!this.form.valid)return;const{login:n}=this.form.getRawValue(),r=await this._storageService.getItem(q),a=await this._storageService.getItem(L);!r||!a||this._userApi.searchUserByLogin(n).then(i=>{if(i.length===0)throw new Error("user not found");return i[0].id}).then(i=>this._chatsApi.deleteUsersFromChat([i],r)).then(()=>{if(a.login===n){const{chats:i=[]}=y.getState(),l=i.filter(c=>c.id!==r);y.set("chats",l)}}).then(()=>this.onDialogClose()).catch(console.error)}onInput(t){O(t,this.form)}onBlur(t){I(t,this.form,this.props,this.element)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const me=`<div class="wrapper" blockId="{{blockId}}">
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
`,ge=`<div
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
`;class fe extends b{constructor(){super(ge);o(this,"_chatsApi",new C);o(this,"_storageService",new v);o(this,"selector","confirm-dialog")}async onSaveChanges(){const t=await this._storageService.getItem(q);t&&this._chatsApi.deleteChat(t).then(()=>{const{chats:n=[]}=y.getState(),r=n.filter(a=>a.id!==t);y.set("chats",r)}).then(()=>this.onDialogClose()).catch(console.error)}onDialogClose(){var t;(t=this.element)==null||t.classList.remove("overlay_opened")}onDialogNotClose(t){t.stopPropagation()}}const be=500,Q=".chat__load-files",X="chat__load-files_empty",P="chats__list-item-active";class ye extends b{constructor(){super(me,[new re,new oe,new Zt,new pe,new Jt,new fe],{chats:[],chatMessages:{}},{display:"grid"});o(this,"_chatsApiService",new C);o(this,"_webSocketApi",new Wt);o(this,"_storageService",new v);o(this,"_resourcesApiService",new Yt);o(this,"_messagesContainer",null);o(this,"_currentChatId",null);o(this,"form",new k({message:new g("",[_])}));o(this,"clipFiles",[])}async render(t,n){(t||n)&&(await this._renderMessages(t,n),await this._renderChats(t,n)),super.render(t,n)}async componentDidMount(){this._chatsApiService.getChats().then(n=>n??[]).then(n=>{y.set("chats",n)}).catch(console.error),super.componentDidMount(),this._messagesContainer=document.querySelector(".chat__messages");const t=await this._storageService.getItem(q);this._currentChatId=String(t)}async _renderChats(t,n){var h;if(W(t,n))return;const r=(t==null?void 0:t.chats)??[],a=(n==null?void 0:n.chats)??[],i=document.querySelector(".chats__list");if(a.length===0){i.innerHTML="";return}if(r.length>a.length){for(const u of r)a.includes(u)||(String(u.id)===this._currentChatId&&this._clearMessages(),(h=i.querySelector(`.chats__list-item[chatId="${u.id}"]`))==null||h.remove());return}const l=document.querySelector("#chat-list-item-template").content,c=this._getAddedChats(r,a);for(const u of c){const m=await this._createChat(u,l);i.append(m)}}async _renderMessages(t,n){const r=this._currentChatId,a=await this._storageService.getItem(L);if(!r||!a)return;const i=this._hasChatMessages(r,t),l=this._hasChatMessages(r,n);if(E(l)||!this._messagesContainer)return;const c=this._messagesContainer.children.length===0;if(W(i,l)&&!c)return;const h=document.querySelector("#chat-message-with-text-template").content,u=document.querySelector("#chat-message-with-photo-template").content;let m=null;E(i)||(m=new Date(Date.parse(i[0].time)));let w=null;const{updatedMessages:ot,isAddToEnd:yt}=this._getUpdatedMessages(c,i,l),V=[];for(const U of ot)if(U.type!==K.USER_CONNECTED){const $=new Date(Date.parse(U.time));if(!w||ft($,w)||m&&ht($,m)&&ht($,w)){const wt=this._createDateParagraph($);V.push(wt),w=$}const vt=this._createMessage(U,u,h,a);V.push(vt)}if(yt)this._messagesContainer.append(...V.slice(c?0:1));else{const U=new Date(Date.parse(ot.at(-1).time));m&&et(m,U)&&this._messagesContainer.children[0].remove(),this._messagesContainer.prepend(...V)}E(i)&&this._scrollMessagesToBottom()}async onSubmit(t){if(t.preventDefault(),!this.form.valid&&E(this.clipFiles))return;const n=this._currentChatId;if(!n){console.error("Чат не выбран");return}const r=this.form.getRawValue();if(!E(this.clipFiles)){for(const{id:i}of this.clipFiles)await this._webSocketApi.sendMessage(n,{content:String(i),type:"file"});const a=document.querySelector(Q);a.innerHTML="",a.classList.add(X)}E(r.message)||await this._webSocketApi.sendMessage(n,{content:r.message,type:"message"}),this._resetForm(),this._scrollMessagesToBottom()}onInput(t){O(t,this.form)}onInputFile(t){const n=t.target.files;if(n.length===0)return;const r=new FormData;r.append("resource",n[0],n[0].name),this._resourcesApiService.loadFile(r).then(a=>{var c;const i=document.createElement("IMG");i.src=`${M}/resources${a.path}`,i.alt=a.filename;const l=document.querySelector(Q);l!=null&&l.classList.contains(X)&&(l==null||l.classList.remove(X)),(c=document.querySelector(Q))==null||c.append(i),document.querySelector("button.chat__button-send").disabled=!1,this.clipFiles.push(a)}).catch(console.error)}onBlur(t){I(t,this.form,this.props,this.element)}onChatMenuToggled(){var t;(t=document.querySelector(".chat-menu"))==null||t.classList.toggle("opened")}onClipMenuToggled(){var t;(t=document.querySelector(".clip-menu"))==null||t.classList.toggle("opened")}onAddChatOpened(){var t;(t=document.querySelector(".overlay-add-chat"))==null||t.classList.add("overlay_opened")}async onMessagesContainerScroll(){var t,n;if(((t=this._messagesContainer)==null?void 0:t.scrollTop)===0){const r=this._currentChatId;if(!r)return;const a=this.props.chatMessages??{};await this._webSocketApi.sendMessage(r,{content:`${((n=a[r])==null?void 0:n.length)??0}`,type:"get old"})}}async onChatClicked(t){var l;if(!t.target)return;const n=t.target,r=n.tagName==="LI"?n:n.parentElement,a=r.getAttribute("chatId");if(!a)return;const i=this._currentChatId;i&&i===a||((l=document.querySelector(`.${P}`))==null||l.classList.remove(P),this._clearMessages(),this._currentChatId=a,await this._storageService.setItem(q,a),r.classList.add(P),await(this._webSocketApi.isConnected(a)?this._renderMessages(void 0,this.props):this._loadMessages(a)))}_loadMessages(t){return this._webSocketApi.connect(t)}_resetForm(){const t=document.querySelector('form[name="send-message"]');t==null||t.reset(),this.clipFiles=[],document.querySelector("button.chat__button-send").disabled=!0}_scrollMessagesToBottom(){setTimeout(()=>{this._messagesContainer&&(this._messagesContainer.scrollTop=this._messagesContainer.scrollHeight)},be)}_hasChatMessages(t,n){const r=n?n.chatMessages??{}:{};return Object.getOwnPropertyNames(r).includes(t)?r[t]:[]}_createDateParagraph(t){const n=document.createElement("p");return n.classList.add("chat__date"),n.textContent=`${t.getDate()}.${t.getMonth()}.${t.getFullYear()}`,n}_getAddedChats(t,n){const r=[];if(t.length===0)return n;const a=new Map;for(const i of t)a.set(i.id,i);for(const i of n)a.get(i.id)||r.push(i);return r}_getUpdatedMessages(t,n,r){if(t||E(n))return{updatedMessages:r,isAddToEnd:!0};const a=n[0],i=r[0];return a.id!==i.id?{updatedMessages:r.slice(0,r.length-n.length),isAddToEnd:!1}:{updatedMessages:r.slice(n.length),isAddToEnd:!0}}_clearMessages(){this._messagesContainer&&(this._messagesContainer.innerHTML="")}async _createChat(t,n){const{id:r,last_message:a,avatar:i}=t,c=n.cloneNode(!0).children[0],h=c.querySelector("img.chats__item-image"),u=document.createAttribute("chatId");u.value=String(r),c.attributes.setNamedItem(u),this._currentChatId===String(r)&&(c.classList.add(P),await this._loadMessages(String(r)));const m=a?{...a,time:ct(a.time)}:{content:"Ещё нет сообщений",time:""},w={...t,avatar:i??"/assets/no-avatar.svg",last_message:m};return h&&(h.src=w.avatar),this.templater.compile(w,c,!1),c}_createMessage(t,n,r,a){const{type:i,time:l,user_id:c,file:h}=t;let u,m;if(i===K.FILE){u=n.cloneNode(!0),m=u.children[0];const w=m.querySelector(".chat__message-photo");w.src=`${M}/resources${(h==null?void 0:h.path)??""}`,w.alt=(h==null?void 0:h.filename)??""}else u=r.cloneNode(!0),m=u.children[0];return m.children[0].classList.add(a.id===c?"chat__message_from-user":"chat__message_to-user"),this.templater.compile({...t,time:ct(l)},m,!1),m}}function ve(s){return{chatMessages:{...s.chatMessages},chats:[...s.chats??[]]}}const we=at(ve)(ye),Se=`<section blockId="{{blockId}}">{{>login-form}}</section>
`;class Ce extends b{constructor(){super(Se,[new ue])}}const De=`<section class="profile" blockId="{{blockId}}">
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
`;class Ie extends b{constructor(){super(De,[new ne({}),new Xt,new le],void 0,{display:"flex"});o(this,"_authApiService",new A);o(this,"_router",S.__instance)}render(t,n){n&&this._renderProfile(n),super.render(t,n)}onAvatarClicked(){var t;(t=document.querySelector(".overlay-load-file"))==null||t.classList.add("overlay_opened")}onChangeDataDialogOpened(){var t;(t=document.querySelector(".overlay-change-data"))==null||t.classList.add("overlay_opened")}onChangePasswordDialogOpened(){var t;(t=document.querySelector(".overlay-change-password"))==null||t.classList.add("overlay_opened")}onLogout(){this._authApiService.logout().then(()=>this._router.go("/")).catch(console.error)}_renderProfile(t){const n=document.querySelector(".profile__image");if(n){const{avatar:r}=t;r&&(n.src=`${M}/resources${r}`)}}}function ke(s){return{...s.user}}const Ee=at(ke)(Ie),Ae=`<section blockId="{{blockId}}">{{>register-form}}</section>
`;class Me extends b{constructor(){super(Ae,[new de])}}async function dt(){return!!await new v().getItem(L)}var tt=(s=>(s.MESSENGER="/messenger",s.NOT_FOUND="/404",s.ERROR_PAGE="/500",s.SIGN_UP="/sign-up",s.SETTINGS="/settings",s.LOGIN="/",s))(tt||{});window.addEventListener("DOMContentLoaded",async()=>{const s=[{path:"/messenger",component:we,canActivate:dt},{path:"/404",component:Ft},{path:"/500",component:Rt},{path:"/",component:Ce},{path:"/sign-up",component:Me},{path:"/settings",component:Ee,canActivate:dt}],e=new S("#root");for(const n of s)e.use(n);await e.start(),new A().user().then(n=>{n&&(y.set("user",n),(document.location.pathname==="/"||document.location.pathname==="/sign-up")&&e.go("/messenger"))}),customElements.get("router-link")||customElements.define("router-link",Nt)},{once:!0});
