var Ce=Object.defineProperty;var ke=(s,t,e)=>t in s?Ce(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var o=(s,t,e)=>(ke(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const Ie=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class _e{constructor(){o(this,"_listeners",{})}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){if(!this._listeners[t])throw new Error("Нет такого события");this._listeners[t]=this._listeners[t].filter(n=>n!==e)}emit(t,...e){if(!this._listeners[t])throw new Error("Нет такого события");for(const n of this._listeners[t])n(...e)}}let j;const De=new Uint8Array(16);function Ee(){if(!j&&(j=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!j))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return j(De)}const f=[];for(let s=0;s<256;++s)f.push((s+256).toString(16).slice(1));function Ae(s,t=0){return(f[s[t+0]]+f[s[t+1]]+f[s[t+2]]+f[s[t+3]]+"-"+f[s[t+4]]+f[s[t+5]]+"-"+f[s[t+6]]+f[s[t+7]]+"-"+f[s[t+8]]+f[s[t+9]]+"-"+f[s[t+10]]+f[s[t+11]]+f[s[t+12]]+f[s[t+13]]+f[s[t+14]]+f[s[t+15]]).toLowerCase()}const Me=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ie={randomUUID:Me};function Oe(s,t,e){if(ie.randomUUID&&!t&&!s)return ie.randomUUID();s=s||{};const n=s.random||(s.rng||Ee)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){e=e||0;for(let r=0;r<16;++r)t[e+r]=n[r];return t}return Ae(n)}const le=(s,t)=>{const e=t.split(".");if(e.length===1)return s[t];let n=s;for(const r of e)(typeof n=="object"&&n!==null&&Object.getOwnPropertyNames(n).includes(r)||Array.isArray(n)&&Number.isNaN(Number(r))&&Number(r)>=0&&n.length>Number(r))&&(n=n[r]);return n};class Le{constructor(){o(this,"elementsContentMap",new Map)}precompile(t,e,n){const r=t.match(/{{>[\w-]*}}/gm);let a=t;const i=new Map;if(a=a.replaceAll(/{{blockId}}/gm,n),!r||r.length===0||e.length===0)return a;for(const l of e)i.set(l.selector,l.content);for(const l of r.map(c=>c.slice(3,-2))){const c=new RegExp(`{{>${l}}}`,"gm");i.has(l)&&(a=a.replace(c,i.get(l)))}return a}compile(t,e,n=!0,r){e.children.length>0&&this._replaceTextContentChildNode(e.children,t,n,r),this._replaceTextContent(e,t,n,r)}addEvents(t,e){this._addOrRemoveEvents(t,e,!1),t.children.length>0&&this._registerEvents(t.children,e,!1)}removeEvents(t,e){this._addOrRemoveEvents(t,e,!0),t.children.length>0&&this._registerEvents(t.children,e,!0)}_registerEvents(t,e,n){for(const r of t)r.attributes.getNamedItem("blockId")||(this._addOrRemoveEvents(r,e,n),r.children.length>0&&this._registerEvents(r.children,e,n))}_addOrRemoveEvents(t,e,n){const r=/^\(.*\)$/;for(const a of t.attributes)if(r.test(a.name)){const i=a.name.slice(1,-1),c=Object.getPrototypeOf(e)[a.value];if(!c||typeof c!="function")return;n?t.removeEventListener(i,c.bind(e)):t.addEventListener(i,c.bind(e))}}_replaceTextContentChildNode(t,e,n,r){if(t.length!==0)for(const a of t)a.attributes.getNamedItem("blockId")||(a.children.length>0&&this._replaceTextContentChildNode(a.children,e,n,r),this._replaceTextContent(a,e,n,r))}_replaceTextContent(t,e,n,r){const a=t.textContent;if(this._renderSavedContent(e),!a)return;const i=a.match(/{{[\w'().-]*}}/gm);if(!(!i||i.length===0||e.length===0))for(const l of i.map(c=>c.slice(2,-2))){const c=new RegExp(`{{${l}}}`,"gm"),m=le(e,l)??"";if(n){const u=r?`${r}.${l}`:l,g=this.elementsContentMap.get(u)??new Set;g.add(t),this.elementsContentMap.set(u,g)}typeof m=="string"||typeof m=="number"?t.textContent=a.replace(c,String(m)):Array.isArray(m)&&(t.textContent=a.replace(c,m.join(", ")))}}_renderSavedContent(t){for(const[e,n]of this.elementsContentMap.entries()){const r=le(t,e),a=r?String(r):"";for(const i of n)i.textContent=a}}}var pe=(s=>(s.INIT="init",s.FLOW_CDM="flow:component-did-mount",s.FLOW_RENDER="flow:render",s.FLOW_CDU="flow:component-did-update",s.DESTROY="destroy",s))(pe||{});class M{constructor(t,e=[],n={},r={}){o(this,"eventBus",new _e);o(this,"props");o(this,"blockId",Oe());o(this,"content");o(this,"templater",new Le);o(this,"declarations");o(this,"hostStyles");o(this,"element",null);this.content=t,this.declarations=e,this.hostStyles=r,this.props=this._makePropsProxy(n),this._registerEvents(),this.eventBus.emit("init")}_registerEvents(){this.eventBus.on("init",this._init.bind(this)),this.eventBus.on("flow:component-did-mount",this._componentDidMount.bind(this)),this.eventBus.on("flow:render",this._render.bind(this)),this.eventBus.on("flow:component-did-update",this._componentDidUpdate.bind(this)),this.eventBus.on("destroy",this._componentDidUnmount.bind(this))}_init(){this.init(),this.eventBus.emit("flow:render")}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.element=document.querySelector(`[blockId="${this.blockId}"]`),this.templater.addEvents(this.element,this),this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const t of this.declarations)t.eventBus.emit("flow:component-did-mount");this.templater.compile(this.props,this.element)}_render(t,e){this.render(t,e)}render(t,e){this.content&&this.element&&this.templater.compile(e??this.props,this.element)}_componentDidUpdate(t,e){this.componentDidUpdate(t,e)&&this.eventBus.emit("flow:render",t,e)}componentDidUpdate(t,e){return JSON.stringify(t)!==JSON.stringify(e)}_makePropsProxy(t){const e=this.eventBus;return new Proxy(t,{get(n,r){const a=n[r];return typeof a=="function"?a.bind(n):a},set(n,r,a){const i={...n};return n[r]=a,e.emit("flow:component-did-update",i,n),!0}})}_componentDidUnmount(){this.element&&this.templater.removeEvents(this.element,this)}show(){this.element&&(this.element.style.display=this.hostStyles.display??"block")}hide(){this.element&&(this.element.style.display="none")}setProps(t){t&&Object.assign(this.props,t)}}function O(s,t){var n;const e=s.target;(n=t.getControl(e.name))==null||n.setValue(s)}function k(s,t,e,n){var a;const r=s.target;(a=t.getControl(r.name))==null||a.blur(s,t,e,n)}function d(s){return s.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function _(s,t){return s.length>=t?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${t} символов`}}function G(s){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function W(s){return/\d{7,15}/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function Te(s){let t=!0;for(const e of Object.values(s.controls))e.valid||(t=!1);return t}function Ue(s,t,e){const n={isValid:!0,error:""};if(t.includes(d)){const{isValid:r,error:a}=d(s);n.isValid=n.isValid&&r,n.error=a}if(t.includes(_)){const{isValid:r,error:a}=_(s,e??0);n.isValid=n.isValid&&r,n.error=a}if(t.includes(G)){const{isValid:r,error:a}=G(s);n.isValid=n.isValid&&r,n.error=a}if(t.includes(W)){const{isValid:r,error:a}=W(s);n.isValid=n.isValid&&r,n.error=a}return n}class p{constructor(t="",e=[],n){o(this,"valid",!1);o(this,"error","");this.value=t,this.validators=e,this.minLength=n}clear(){this.value="",this.error="",this.valid=!1}setValue(t){const{value:e}=t.target;if(this.value===e)return;this.value=e;const{isValid:n,error:r}=Ue(e,this.validators,this.minLength);this.error=r,this.valid=n}blur(t,e,n,r){const a=t.target;n[`${a.name}_error`]!==this.error&&(n[`${a.name}_error`]=this.error),e.valid=Te(e);const i=r==null?void 0:r.querySelector('button[type="submit"]');i.disabled=!e.valid}}class I{constructor(t){o(this,"valid",!1);this.controls=t}getRawValue(){const t={};for(const[e,n]of Object.entries(this.controls))t[e]=n.value;return t}getControl(t){return Object.getOwnPropertyNames(this.controls).includes(t)?this.controls[t]:null}}const T={GET:"GET",POST:"POST",PUT:"PUT",PATCH:"PATCH",DELETE:"DELETE"},Z="Content-Type";function $e(s){return Object.keys(s).reduce((t,e,n,r)=>`${t}${e}=${s[e]}${n<r.length-1?"&":""}`,"?")}class J{get(t,e={},n){return e.data&&Object.keys(e.data).length>0&&(t+=$e(e.data)),this.request(t,{...e,method:T.GET,headers:{Accept:"application/json",...e.headers}},e.timeout,n)}post(t,e={},n){const r={...e.headers};return e.data instanceof FormData||(r[Z]="application/json"),this.request(t,{...e,method:T.POST,headers:r},e.timeout,n)}put(t,e={},n){const r={...e.headers};return e.data instanceof FormData||(r[Z]="application/json"),this.request(t,{...e,method:T.PUT,headers:r},e.timeout,n)}patch(t,e={},n){return this.request(t,{...e,method:T.PATCH},e.timeout,n)}delete(t,e={},n){const r={...e.headers};return e.data instanceof FormData||(r[Z]="application/json"),this.request(t,{...e,method:T.DELETE,headers:r},e.timeout,n)}request(t,e,n=5e3,r=!0){const{method:a="",data:i,headers:l={}}=e;return new Promise((c,m)=>{const u=new XMLHttpRequest;u.withCredentials=r,u.open(a,t);for(const g in l)u.setRequestHeader(g,l[g]);u.addEventListener("load",function(){c(u)}),u.addEventListener("abort",m),u.onerror=m,u.timeout=n,u.ontimeout=m,a===T.GET||!i?u.send():i instanceof FormData?u.send(i):u.send(JSON.stringify(i))}).then(c=>{if(c.status>=400)throw c;return c}).then(c=>{try{return JSON.parse(c.response)}catch{return}})}}function Ne(s,t){return s===t}class xe{constructor(t,e,n,r){o(this,"_blockClass");o(this,"_block");o(this,"_query");o(this,"_pathname");o(this,"canActivate");this._pathname=t,this._blockClass=e,this._block=null,this._query=n,this.canActivate=r??null}navigate(t){this.match(t)&&(this._pathname=t,this.render())}leave(){this._block&&this._block.hide()}match(t){return t.includes(te.MESSENGER)&&this._pathname===te.MESSENGER?!0:Ne(t,this._pathname)}render(){const t=document.querySelector(this._query);if(!this._block){this._block=new this._blockClass,t.innerHTML=this._block.content,this._block.eventBus.emit(pe.FLOW_CDM);return}this._block.show(),t.insertAdjacentElement("afterbegin",this._block.element)}}const x=class{constructor(t){o(this,"_rootQuery","#root");o(this,"history",window.history);o(this,"_currentRoute",null);o(this,"routes",[]);if(x.__instance)return x.__instance;this.routes=[],this.history=window.history,this._currentRoute=null,this._rootQuery=t,x.__instance=this}use({path:t,component:e,canActivate:n}){const r=new xe(t,e,this._rootQuery,n);return this.routes.push(r),this}async start(){window.addEventListener("popstate",({currentTarget:t})=>{t instanceof Window&&this._onRoute(t.location.pathname)}),await this._onRoute(window.location.pathname)}async go(t){this.history.pushState({},"",t),await this._onRoute(t)}back(){this.history.back()}forward(){this.history.forward()}getRoute(t){return this.routes.find(e=>e.match(t))}refresh(){window.location.reload()}async _onRoute(t){var r;const e=this.getRoute(t);if(!e||(r=this._currentRoute)!=null&&r.match(e._pathname))return;if(!(e.canActivate?await e.canActivate():!0)){console.error(`you do not have access to ${t} page`);return}this._currentRoute&&this._currentRoute.leave(),this._currentRoute=e,e.render()}};let y=x;o(y,"__instance");class Pe extends HTMLElement{constructor(){super();o(this,"_router",y.__instance)}connectedCallback(){const e=this.getAttribute("link")??"/messenger";this.addEventListener("click",()=>{this._router.go(e)})}disconnectedCallback(){const e=this.getAttribute("link")??"/messenger";this.removeEventListener("click",()=>{this._router.go(e)})}static get observedAttributes(){return["link"]}}class Fe extends M{constructor(){super(Ie)}}const Be=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class Re extends M{constructor(){super(Be)}}class v extends M{}const qe=`<div
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
`,me="ya-praktikum.tech",A=`https://${me}/api/v2`,Ve=`wss://${me}`;function ce(s){const t=new Date(Date.parse(s)),e=new Date(Date.now());if(e.getFullYear()!==t.getFullYear()||e.getMonth()!==t.getMonth()||e.getDate()-t.getDate()>6)return`${t.getDate()}.${t.getMonth()}.${t.getFullYear()}`;const n=t.getMinutes(),r=n>9?n:`0${n}`;return`${t.getHours()}:${r}`}function D(s){return!s||typeof s=="number"||typeof s=="boolean"||typeof s=="function"?!0:typeof s=="string"||Array.isArray(s)?s.length===0:typeof s=="object"?s.keys?[...s].length===0:Object.keys(s).length===0:!1}function je(s){return typeof s=="object"&&s!==null&&s.constructor===Object&&Object.prototype.toString.call(s)==="[object Object]"}function ge(s){return Array.isArray(s)}function ue(s){return je(s)||ge(s)}function fe(s,t){if(Object.keys(s).length!==Object.keys(t).length)return!1;for(const[e,n]of Object.entries(s)){const r=ge(t)?t[Number(e)]:t[e];if(ue(n)&&ue(r)){if(fe(n,r))continue;return!1}if(n!==r)return!1}return!0}function ne(s,t){return s.getFullYear()===t.getFullYear()&&s.getMonth()===t.getMonth()&&s.getDate()===t.getDate()}function be(s,t){return ne(s,t)?!1:s.getFullYear()>t.getFullYear()||s.getMonth()>t.getMonth()?!0:s.getDate()>t.getDate()}function he(s,t){return!ne(s,t)&&!be(s,t)}function He(s){const t=typeof s;return!s||t==="string"||t==="number"||t==="boolean"||t==="bigint"}const h=(...s)=>{let t="";for(const[e,n]of s.entries())t+=String(n),!String(n).endsWith("/")&&e!==s.length-1&&!String(s[e+1]).startsWith("/")&&(t+="/");return t};function ye(s){return typeof s=="object"&&s!==null&&s.constructor===Object&&Object.prototype.toString.call(s)==="[object Object]"}function Y(s){return Array.isArray(s)}function se(s){return ye(s)||Y(s)}function Q(s){if(!ye(s))throw new Error("input must be an object");const t=Object.keys(s).length;let e="",n=0;for(const[r,a]of Object.entries(s))se(a)?Y(a)?e+=re(r,a):e+=ae(r,a):e+=`${r}=${a}`,n!==t-1&&(e+="&"),n++;return e}function re(s,t){let e="";for(let n=0;n<t.length;n++){const r=t[n];se(r)?Y(r)?e+=re(`${s}[${n}]`,r):e+=ae(`${s}[${n}]`,r):e+=`${s}[${n}]=${r}`,n!==t.length-1&&(e+="&")}return e}function ae(s,t){let e="",n=0;const r=Object.keys(t).length;for(const[a,i]of Object.entries(t))se(i)?Y(i)?e+=re(`${s}[${a}]`,i):e+=ae(`${s}[${a}]`,i):e+=`${s}[${a}]=${i}`,n!==r-1&&(e+="&"),n++;return e}const L="authUser",q="currentChatId",P=class{constructor(){if(P.__instance)return P.__instance;P.__instance=this}async getItem(t){return localStorage.getItem(t)}async setItem(t,e){const n=He(e)?String(e):JSON.stringify(e);localStorage.setItem(t,n)}async removeItem(t){localStorage.removeItem(t)}async clear(){localStorage.clear()}};let b=P;o(b,"__instance");var ee=(s=>(s.MESSAGE="message",s.FILE="file",s.USER_CONNECTED="user connected",s))(ee||{});class Ge extends _e{constructor(){super(...arguments);o(this,"_state",{})}getState(){return this._state}set(e,n){this._state={...this._state,[e]:n},this.emit("update",this._state)}}const N=new Ge;function We(s){return t=>class extends t{constructor(e){super({...e,...s(N.getState())}),N.on("update",()=>{const n=s(N.getState());this.setProps(n)})}}}const F=class{constructor(){o(this,"_http",new J);o(this,"_baseUrl",h(A,"auth"));o(this,"_router",y.__instance);o(this,"_storageService",new b);if(F.__instance)return F.__instance;F.__instance=this}signUp(t){return this._http.post(h(this._baseUrl,"signup"),{data:t})}signIn(t){return this._http.post(h(this._baseUrl,"signin"),{data:t})}async user(){try{const t=await this._http.get(h(this._baseUrl,"user"));return await this._storageService.setItem(L,t),t}catch(t){console.error(t),await this._storageService.clear(),this._router.go("/")}}async logout(){await this._http.post(h(this._baseUrl,"logout")),await this._storageService.clear(),this._router.go("/")}};let E=F;o(E,"__instance");const B=class{constructor(){o(this,"_baseUrl",h(A,"chats"));o(this,"_http",new J);if(B.__instance)return B.__instance;B.__instance=this}getChats(t){let e=this._baseUrl;return t&&Object.keys(t).length>0&&(e+=`?${Q(t)}`),this._http.get(e)}createChat(t){return this._http.post(this._baseUrl,{data:{title:t}})}deleteChat(t){return this._http.delete(this._baseUrl,{data:{chatId:t}})}getChatFiles(t){return this._http.get(h(this._baseUrl,t,"files"))}getArchiveChats(t){let e=h(this._baseUrl,"archive");return t&&Object.keys(t).length>0&&(e+=`?${Q(t)}`),this._http.get(e)}archiveChat(t){return this._http.post(h(this._baseUrl,"archive"),{data:{chatId:t}})}unarchiveChat(t){return this._http.post(h(this._baseUrl,"unarchive"),{data:{chatId:t}})}getCommonChatWithUser(t){return this._http.get(h(this._baseUrl,t,"common"))}getChatUsers(t,e){let n=h(this._baseUrl,t,"users");return e&&Object.keys(e).length>0&&(n+=`?${Q(e)}`),this._http.get(n)}getNewChatMessages(t){return this._http.get(h(this._baseUrl,"new",t))}changeChatAvatar(t){return this._http.put(h(this._baseUrl,"avatar"),{data:t})}addUsersToChat(t,e){return this._http.put(h(this._baseUrl,"users"),{data:{users:t,chatId:e}})}deleteUsersFromChat(t,e){return this._http.delete(h(this._baseUrl,"users"),{data:{users:t,chatId:e}})}getTokenForConnectMessagesServer(t){return this._http.post(h(this._baseUrl,"token",t))}};let S=B;o(S,"__instance");const R=class{constructor(){o(this,"_baseUrl",h(A,"user"));o(this,"_http",new J);if(R.__instance)return R.__instance;R.__instance=this}updateUserData(t){return this._http.put(h(this._baseUrl,"profile"),{data:t})}updateAvatar(t){return this._http.put(h(this._baseUrl,"profile/avatar"),{data:t})}updatePassword(t){return this._http.put(h(this._baseUrl,"password"),{data:t})}getUserById(t){return this._http.get(h(this._baseUrl,t))}searchUserByLogin(t){return this._http.post(h(this._baseUrl,"search"),{data:{login:t}})}};let C=R;o(C,"__instance");const Je=1e4;class Ye{constructor(){o(this,"_chatsApi",new S);o(this,"_storageService",new b);o(this,"_socketsMap",new Map);o(this,"_intervalIdMap",new Map)}async connect(t){if(this.isConnected(t))return;const e=await this._storageService.getItem(L);if(!e)return;const n=JSON.parse(e);this._chatsApi.getTokenForConnectMessagesServer(Number(t)).then(r=>{const a=new WebSocket(`${Ve}/ws/chats/${n.id}/${t}/${r.token}`);this._socketsMap.set(t,a),this._initListeners(t,a)})}async sendMessage(t,e){const n=this._socketsMap.get(t);if(n)try{n.send(JSON.stringify(e))}catch{await this.connect(t)}}_initListeners(t,e){if(!this._intervalIdMap.get(t)){const n=setInterval(async()=>{await this.sendMessage(t,{type:"ping"})},Je);this._intervalIdMap.set(t,n)}e.addEventListener("open",()=>{console.log("Соединение установлено"),this.sendMessage(t,{content:"0",type:"get old"}).then()}),e.addEventListener("close",n=>{n.wasClean?console.log("Соединение закрыто чисто"):console.log("Обрыв соединения"),console.log(`Код: ${n.code} | Причина: ${n.reason}`)}),e.addEventListener("message",n=>{if(JSON.parse(n.data).type==="pong")return;const r=JSON.parse(n.data),a=Array.isArray(r)?r:[r],i=N.getState().chatMessages??{},l=i[t]??[];i[t]=[...a,...l].sort((c,m)=>c.time>m.time?1:-1),N.set("chatMessages",i)}),e.addEventListener("error",n=>{console.log("Ошибка",n.message)})}isConnected(t){const e=this._socketsMap.get(t);return!!(e&&(e.CONNECTING||e.OPEN))}}class ze{constructor(){o(this,"_http",new J);o(this,"_baseUrl",h(A,"resources"))}loadFile(t){return this._http.post(this._baseUrl,{data:t})}}class Ze extends v{constructor(){super(qe,[],{title_error:""});o(this,"_chatsApi",new S);o(this,"form",new I({title:new p("",[d,_],4)}));o(this,"selector","add-chat-dialog")}onSubmit(e){if(e.preventDefault(),!this.form.valid)return;const{title:n}=this.form.getRawValue();this._chatsApi.createChat(n).then(()=>{document.location.reload()})}onInput(e){O(e,this.form)}onBlur(e){k(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const Qe=`<div
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
`;class Xe extends v{constructor(){super(Qe,[],{login_error:""});o(this,"_chatsApi",new S);o(this,"_userApi",new C);o(this,"_storageService",new b);o(this,"form",new I({login:new p("",[d,_],4)}));o(this,"selector","add-user-dialog")}async onSubmit(e){e.preventDefault();const n=this.form;if(!n.valid)return;const r=n.controls.login,a=await this._storageService.getItem(q);a&&this._userApi.searchUserByLogin(r.value).then(i=>i[0].id).then(i=>this._chatsApi.addUsersToChat([i],Number(a))).then(()=>{document.location.reload()})}onInput(e){O(e,this.form)}onBlur(e){k(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const Ke=`<div
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
`;class et extends v{constructor(){super(Ke,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""});o(this,"_userApiService",new C);o(this,"form",new I({oldPassword:new p("",[d,_],6),newPassword:new p("",[d,_],6),password_repeat:new p("",[d,_],6)}));o(this,"selector","change-password-dialog")}componentDidMount(){super.componentDidMount()}onSubmit(e){e.preventDefault(),this.form.valid&&this._userApiService.updatePassword(this.form.getRawValue()).then(()=>{this.onDialogClose()})}onInput(e){var r;const n=e.target;(r=this.form.getControl(n.name))==null||r.setValue(e)}onBlur(e){k(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const tt=`<div
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
`;class nt extends v{constructor(){super(tt,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",display_name_error:""});o(this,"_userApiService",new C);o(this,"_router",y.__instance);o(this,"_storageService",new b);o(this,"form",new I({email:new p("",[d,_,G],4),login:new p("",[d,_],4),display_name:new p("",[d,_],4),first_name:new p("",[d,_],4),second_name:new p("",[d,_],4),phone:new p("",[d,_,W],8)}));o(this,"selector","change-user-data-dialog")}onSubmit(e){e.preventDefault(),this.form.valid&&this._userApiService.updateUserData(this.form.getRawValue()).then(n=>this._storageService.setItem(L,n)).then(()=>{this._router.refresh()})}onInput(e){O(e,this.form)}onBlur(e){k(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const st=`<section class="menu chat-menu" blockId="{{blockId}}">
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
`;class rt extends v{constructor(){super(st);o(this,"selector","chat-menu")}onAddUserDialogOpened(){document.querySelector(".overlay-add-user").classList.add("overlay_opened")}onRemoveUserDialogOpened(){document.querySelector(".overlay-remove-user").classList.add("overlay_opened")}onRemoveChatDialogOpened(){document.querySelector(".overlay-confirm").classList.add("overlay_opened")}}const at=`<section class="menu clip-menu" blockId="{{blockId}}">
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
`;class ot extends v{constructor(){super(at);o(this,"selector","clip-menu")}}const it=`<div
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
`;class lt extends v{constructor(){super(it);o(this,"_userApiService",new C);o(this,"_router",y.__instance);o(this,"_storageService",new b);o(this,"selector","load-file-dialog");o(this,"formData",null);o(this,"filenameElement",null);o(this,"submitElement",null)}componentDidMount(){super.componentDidMount(),this.element&&(this.formData=new FormData(this.element.querySelector("form")),this.filenameElement=this.element.querySelector(".dialog__load-text"),this.submitElement=this.element.querySelector(".dialog__submit"))}onInput(e){var a;const n=e.target.files,r=this.element;n.length===0||!r||!this.filenameElement||!this.submitElement||(this.filenameElement.textContent=n[0].name,this.submitElement.disabled=!1,(a=this.formData)==null||a.append("avatar",n[0],n[0].name))}async onSubmit(e){if(e.preventDefault(),!this.formData)return;const n=await this._userApiService.updateAvatar(this.formData);n&&(await this._storageService.setItem(L,n),this._router.refresh())}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const ct=`<section class="auth login" blockId="{{blockId}}">
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
`;class ut extends v{constructor(){super(ct,[],{login_error:"",password_error:""});o(this,"_authApiService",new E);o(this,"_router",y.__instance);o(this,"form",new I({login:new p("",[d,_],4),password:new p("",[d,_],6)}));o(this,"selector","login-form")}onSubmit(e){e.preventDefault(),this.form.valid&&this._authApiService.signIn(this.form.getRawValue()).then(()=>this._authApiService.user()).then(n=>{n&&this._router.go("/messenger")})}onInput(e){O(e,this.form)}onBlur(e){k(e,this.form,this.props,this.element)}}const ht=`<section class="auth register" blockId="{{blockId}}">
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
`;class dt extends v{constructor(){super(ht,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""});o(this,"_authApiService",new E);o(this,"_router",y.__instance);o(this,"form",new I({email:new p("",[d,_,G],4),login:new p("",[d,_],4),first_name:new p("",[d,_],4),second_name:new p("",[d,_],4),phone:new p("",[d,_,W],8),password:new p("",[d,_],6),password_repeat:new p("",[d,_],6)}));o(this,"selector","register-form")}onSubmit(e){e.preventDefault(),this.form.valid&&this._authApiService.signUp(this.form.getRawValue()).then(()=>this._authApiService.user()).then(n=>{n&&this._router.go("/messenger")})}onInput(e){O(e,this.form)}onBlur(e){k(e,this.form,this.props,this.element)}}const _t=`<div
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
`;class pt extends v{constructor(){super(_t,[],{login_error:""});o(this,"_userApi",new C);o(this,"_chatsApi",new S);o(this,"_storageService",new b);o(this,"form",new I({login:new p("",[d,_],4)}));o(this,"selector","remove-user-dialog")}async onSubmit(e){if(e.preventDefault(),!this.form.valid)return;const{login:n}=this.form.getRawValue(),r=await this._storageService.getItem(q);r&&this._userApi.searchUserByLogin(n).then(a=>a[0].id).then(a=>this._chatsApi.deleteUsersFromChat([a],Number(r))).then(()=>{document.location.reload()})}onInput(e){O(e,this.form)}onBlur(e){k(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const mt=`<div class="wrapper" blockId="{{blockId}}">
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
    >
      <template id="chat-list-item-template">
        <li class="chats__list-item">
          <h3 class="chats__item-title">{{title}}</h3>
          <img
            class="chats__item-image"
            src="/assets/no-avatar.svg"
            alt="аватар"
          />
          <p class="chats__item-message">{{last_message.content}}</p>
          <span class="chats__item-time">{{last_message.time}}</span>
          <span class="chats__message-num">{{unread_count}}</span>
        </li>
      </template>
    </ul>
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
`,gt=`<div
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
`;class ft extends v{constructor(){super(gt);o(this,"_chatsApi",new S);o(this,"_storageService",new b);o(this,"selector","confirm-dialog")}async onSaveChanges(){const e=await this._storageService.getItem(q);e&&this._chatsApi.deleteChat(Number(e)).then(()=>{document.location.reload()})}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const bt=500,X=".chat__load-files",K="chat__load-files_empty",H="chats__list-item-active";class yt extends M{constructor(){super(mt,[new rt,new ot,new Xe,new pt,new Ze,new ft],{chats:[],chatMessages:{}},{display:"grid"});o(this,"_chatsApiService",new S);o(this,"_webSocketApi",new Ye);o(this,"_storageService",new b);o(this,"_resourcesApiService",new ze);o(this,"_messagesContainer",null);o(this,"_currentChatId",null);o(this,"form",new I({message:new p("",[d])}));o(this,"clipFiles",[])}async render(e,n){await this._renderMessages(e,n),super.render(n)}async componentDidMount(){this._chatsApiService.getChats().then(e=>e??[]).then(e=>(this.props.chats=e,e)).then(e=>this._renderChats(e)),super.componentDidMount(),this._messagesContainer=document.querySelector(".chat__messages"),this._currentChatId=await this._storageService.getItem(q)}async _renderChats(e){const n=document.querySelector(".chats__list");if(e.length===0){n.innerHTML="";return}const r=document.querySelector("#chat-list-item-template").content;for(const a of e){const{id:i,last_message:l,avatar:c}=a,u=r.cloneNode(!0).children[0],g=document.createAttribute("chatId");g.value=String(i),u.attributes.setNamedItem(g),this._currentChatId===String(i)&&(u.classList.add(H),await this._loadMessages(String(i)));const w=l?{...l,time:ce(l.time)}:{content:"Ещё нет сообщений",time:""},z={...a,avatar:c??"/assets/no-avatar.svg",last_message:w};this.templater.compile(z,u,!1),n.append(u)}}async _renderMessages(e,n){if(!e&&!n)return;const r=this._currentChatId,a=await this._storageService.getItem(L);if(!r||!a)return;const i=this._hasChatMessages(r,e),l=this._hasChatMessages(r,n);if(D(l)||!this._messagesContainer)return;const c=this._messagesContainer.children.length===0;if(fe(i,l)&&!c)return;const m=document.querySelector("#chat-message-with-text-template").content,u=document.querySelector("#chat-message-with-photo-template").content;let g=null;D(i)||(g=new Date(Date.parse(i[0].time)));let w=null;const z=JSON.parse(a),{updatedMessages:oe,isAddToEnd:ve}=this._getUpdatedMessages(c,i,l),V=[];for(const U of oe)if(U.type!==ee.USER_CONNECTED){const $=new Date(Date.parse(U.time));if(!w||be($,w)||g&&he($,g)&&he($,w)){const Se=this._createDateParagraph($);V.push(Se),w=$}const we=this._createMessage(U,u,m,z);V.push(we)}if(ve)this._messagesContainer.append(...V.slice(1));else{const U=new Date(Date.parse(oe.at(-1).time));g&&ne(g,U)&&this._messagesContainer.children[0].remove(),this._messagesContainer.prepend(...V)}D(i)&&this._scrollMessagesToBottom()}async onSubmit(e){if(e.preventDefault(),!this.form.valid&&D(this.clipFiles))return;const n=this._currentChatId;if(!n){console.error("Чат не выбран");return}const r=this.form.getRawValue();if(!D(this.clipFiles)){for(const{id:i}of this.clipFiles)await this._webSocketApi.sendMessage(n,{content:String(i),type:"file"});const a=document.querySelector(X);a.innerHTML="",a.classList.add(K)}D(r.message)||await this._webSocketApi.sendMessage(n,{content:r.message,type:"message"}),this._resetForm(),this._scrollMessagesToBottom()}onInput(e){O(e,this.form)}onInputFile(e){const n=e.target.files;if(n.length===0)return;const r=new FormData;r.append("resource",n[0],n[0].name),this._resourcesApiService.loadFile(r).then(a=>{var c;const i=document.createElement("IMG");i.src=`${A}/resources${a.path}`,i.alt=a.filename;const l=document.querySelector(X);l!=null&&l.classList.contains(K)&&(l==null||l.classList.remove(K)),(c=document.querySelector(X))==null||c.append(i),document.querySelector("button.chat__button-send").disabled=!1,this.clipFiles.push(a)})}onBlur(e){k(e,this.form,this.props,this.element)}onChatMenuToggled(){var e;(e=document.querySelector(".chat-menu"))==null||e.classList.toggle("opened")}onClipMenuToggled(){var e;(e=document.querySelector(".clip-menu"))==null||e.classList.toggle("opened")}onAddChatOpened(){var e;(e=document.querySelector(".overlay-add-chat"))==null||e.classList.add("overlay_opened")}async onMessagesContainerScroll(){var e,n;if(((e=this._messagesContainer)==null?void 0:e.scrollTop)===0){const r=this._currentChatId;if(!r)return;const a=this.props.chatMessages??{};await this._webSocketApi.sendMessage(r,{content:`${((n=a[r])==null?void 0:n.length)??0}`,type:"get old"})}}async onChatClicked(e){var c;if(!e.target)return;const n=e.target,r=n.tagName==="LI"?n:n.parentElement,a=r.getAttribute("chatId"),i=document.querySelector(".chat__messages");if(!a)return;const l=this._currentChatId;l&&l===a||((c=document.querySelector(`.${H}`))==null||c.classList.remove(H),i&&(i.innerHTML=""),this._currentChatId=a,await this._storageService.setItem(q,a),r.classList.add(H),await(this._webSocketApi.isConnected(a)?this._renderMessages({},this.props):this._loadMessages(a)))}_loadMessages(e){return this._webSocketApi.connect(e)}_resetForm(){const e=document.querySelector('form[name="send-message"]');e==null||e.reset(),this.clipFiles=[],document.querySelector("button.chat__button-send").disabled=!0}_scrollMessagesToBottom(){setTimeout(()=>{this._messagesContainer&&(this._messagesContainer.scrollTop=this._messagesContainer.scrollHeight)},bt)}_hasChatMessages(e,n){const r=n?n.chatMessages??{}:{};return Object.getOwnPropertyNames(r).includes(e)?r[e]:[]}_createDateParagraph(e){const n=document.createElement("p");return n.classList.add("chat__date"),n.textContent=`${e.getDate()}.${e.getMonth()}.${e.getFullYear()}`,n}_getUpdatedMessages(e,n,r){if(e||D(n))return{updatedMessages:r,isAddToEnd:!0};const a=n[0],i=r[0];return a.id!==i.id?{updatedMessages:r.slice(0,r.length-n.length),isAddToEnd:!1}:{updatedMessages:r.slice(n.length),isAddToEnd:!0}}_createMessage(e,n,r,a){const{type:i,time:l,user_id:c,file:m}=e;let u,g;if(i===ee.FILE){u=n.cloneNode(!0),g=u.children[0];const w=g.querySelector(".chat__message-photo");w.src=`${A}/resources${(m==null?void 0:m.path)??""}`,w.alt=(m==null?void 0:m.filename)??""}else u=r.cloneNode(!0),g=u.children[0];return g.children[0].classList.add(a.id===c?"chat__message_from-user":"chat__message_to-user"),this.templater.compile({...e,time:ce(l)},g,!1),g}}function vt(s){return{chatMessages:{...s.chatMessages}}}const wt=We(vt)(yt),St=`<section blockId="{{blockId}}">{{>login-form}}</section>
`;class Ct extends M{constructor(){super(St,[new ut])}}const kt=`<section class="profile" blockId="{{blockId}}">
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
`;class It extends M{constructor(){super(kt,[new nt,new et,new lt],{email:"",login:"",first_name:"",second_name:"",phone:"",display_name:""},{display:"flex"});o(this,"_authApiService",new E);o(this,"_router",y.__instance);o(this,"_storageService",new b)}async componentDidMount(){const e=await this._storageService.getItem(L),n=document.querySelector(".profile__image");if(e){const r=JSON.parse(e);if(this.props=r,n){const{avatar:a}=r;a&&(n.src=`${A}/resources${a}`)}}super.componentDidMount()}onAvatarClicked(){var e;(e=document.querySelector(".overlay-load-file"))==null||e.classList.add("overlay_opened")}onChangeDataDialogOpened(){var e;(e=document.querySelector(".overlay-change-data"))==null||e.classList.add("overlay_opened")}onChangePasswordDialogOpened(){var e;(e=document.querySelector(".overlay-change-password"))==null||e.classList.add("overlay_opened")}onLogout(){this._authApiService.logout().then(()=>{this._router.go("/")})}}const Dt=`<section blockId="{{blockId}}">{{>register-form}}</section>
`;class Et extends M{constructor(){super(Dt,[new dt])}}async function de(){return!!await new b().getItem(L)}var te=(s=>(s.MESSENGER="/messenger",s.NOT_FOUND="/404",s.ERROR_PAGE="/500",s.SIGN_UP="/sign-up",s.SETTINGS="/settings",s.LOGIN="/",s))(te||{});window.addEventListener("DOMContentLoaded",async()=>{const s=[{path:"/messenger",component:wt,canActivate:de},{path:"/404",component:Fe},{path:"/500",component:Re},{path:"/",component:Ct},{path:"/sign-up",component:Et},{path:"/settings",component:It,canActivate:de}],t=new y("#root");for(const n of s)t.use(n);await t.start(),new E().user().then(n=>{n&&(document.location.pathname==="/"||document.location.pathname==="/sign-up")&&t.go("/messenger")}),customElements.get("router-link")||customElements.define("router-link",Pe)},{once:!0});
