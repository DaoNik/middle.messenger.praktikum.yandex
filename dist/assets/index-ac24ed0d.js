var we=Object.defineProperty;var Se=(s,t,e)=>t in s?we(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var a=(s,t,e)=>(Se(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const Ce=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class pe{constructor(){a(this,"_listeners",{})}on(t,e){this._listeners[t]||(this._listeners[t]=[]),this._listeners[t].push(e)}off(t,e){if(!this._listeners[t])throw new Error("Нет такого события");this._listeners[t]=this._listeners[t].filter(n=>n!==e)}emit(t,...e){if(!this._listeners[t])throw new Error("Нет такого события");for(const n of this._listeners[t])n(...e)}}let J;const ke=new Uint8Array(16);function Ie(){if(!J&&(J=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!J))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return J(ke)}const g=[];for(let s=0;s<256;++s)g.push((s+256).toString(16).slice(1));function De(s,t=0){return(g[s[t+0]]+g[s[t+1]]+g[s[t+2]]+g[s[t+3]]+"-"+g[s[t+4]]+g[s[t+5]]+"-"+g[s[t+6]]+g[s[t+7]]+"-"+g[s[t+8]]+g[s[t+9]]+"-"+g[s[t+10]]+g[s[t+11]]+g[s[t+12]]+g[s[t+13]]+g[s[t+14]]+g[s[t+15]]).toLowerCase()}const Ee=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ae={randomUUID:Ee};function Ae(s,t,e){if(ae.randomUUID&&!t&&!s)return ae.randomUUID();s=s||{};const n=s.random||(s.rng||Ie)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){e=e||0;for(let r=0;r<16;++r)t[e+r]=n[r];return t}return De(n)}const ie=(s,t)=>{const e=t.split(".");if(e.length===1)return s[t];let n=s;for(const r of e)(typeof n=="object"&&n!==null&&Object.getOwnPropertyNames(n).includes(r)||Array.isArray(n)&&Number.isNaN(Number(r))&&Number(r)>=0&&n.length>Number(r))&&(n=n[r]);return n};class Oe{constructor(){a(this,"elementsContentMap",new Map)}precompile(t,e,n){const r=t.match(/{{>[\w-]*}}/gm);let o=t;const i=new Map;if(o=o.replaceAll(/{{blockId}}/gm,n),!r||r.length===0||e.length===0)return o;for(const l of e)i.set(l.selector,l.content);for(const l of r.map(c=>c.slice(3,-2))){const c=new RegExp(`{{>${l}}}`,"gm");i.has(l)&&(o=o.replace(c,i.get(l)))}return o}compile(t,e,n=!0,r){e.children.length>0&&this._replaceTextContentChildNode(e.children,t,n,r),this._replaceTextContent(e,t,n,r)}addEvents(t,e){this._addOrRemoveEvents(t,e,!1),t.children.length>0&&this._registerEvents(t.children,e,!1)}removeEvents(t,e){this._addOrRemoveEvents(t,e,!0),t.children.length>0&&this._registerEvents(t.children,e,!0)}_registerEvents(t,e,n){for(const r of t)r.attributes.getNamedItem("blockId")||(this._addOrRemoveEvents(r,e,n),r.children.length>0&&this._registerEvents(r.children,e,n))}_addOrRemoveEvents(t,e,n){const r=/^\(.*\)$/;for(const o of t.attributes)if(r.test(o.name)){const i=o.name.slice(1,-1),l=e[o.value];if(!l||typeof l!="function")return;n?t.removeEventListener(i,l.bind(e)):t.addEventListener(i,l.bind(e))}}_replaceTextContentChildNode(t,e,n,r){if(t.length!==0)for(const o of t)o.attributes.getNamedItem("blockId")||(o.children.length>0&&this._replaceTextContentChildNode(o.children,e,n,r),this._replaceTextContent(o,e,n,r))}_replaceTextContent(t,e,n,r){const o=t.textContent;for(const[i,l]of this.elementsContentMap.entries()){const c=ie(e,i),m=c?String(c):"";for(const u of l)u.textContent=m}if(o){const i=o.match(/{{[\w\-.'()]*}}/gm);if(!i||i.length===0||e.length===0)return;for(const l of i.map(c=>c.slice(2,-2))){const c=new RegExp(`{{${l}}}`,"gm"),m=ie(e,l)??"";if(n){const u=r?`${r}.${l}`:l,b=this.elementsContentMap.get(u)??new Set;b.add(t),this.elementsContentMap.set(u,b)}typeof m=="string"||typeof m=="number"?t.textContent=o.replace(c,String(m)):Array.isArray(m)&&(t.textContent=o.replace(c,m.join(", ")))}}}}var me=(s=>(s.INIT="init",s.FLOW_CDM="flow:component-did-mount",s.FLOW_RENDER="flow:render",s.FLOW_CDU="flow:component-did-update",s.DESTROY="destroy",s))(me||{});class L{constructor(t,e=[],n={},r={}){a(this,"eventBus",new pe);a(this,"props");a(this,"blockId",Ae());a(this,"content");a(this,"templater",new Oe);a(this,"declarations");a(this,"hostStyles");a(this,"element",null);this.content=t,this.declarations=e,this.hostStyles=r,this.props=this._makePropsProxy(n),this._registerEvents(),this.eventBus.emit("init")}_registerEvents(){this.eventBus.on("init",this._init.bind(this)),this.eventBus.on("flow:component-did-mount",this._componentDidMount.bind(this)),this.eventBus.on("flow:render",this._render.bind(this)),this.eventBus.on("flow:component-did-update",this._componentDidUpdate.bind(this)),this.eventBus.on("destroy",this._componentDidUnmount.bind(this))}_init(){this.init(),this.eventBus.emit("flow:render")}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.element=document.querySelector(`[blockId="${this.blockId}"]`),this.templater.addEvents(this.element,this),this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const t of this.declarations)t.eventBus.emit("flow:component-did-mount");this.templater.compile(this.props,this.element)}_render(t,e){this.render(t,e)}render(t,e){this.content&&this.element&&this.templater.compile(e??this.props,this.element)}_componentDidUpdate(t,e){this.componentDidUpdate(t,e)&&this.eventBus.emit("flow:render",t,e)}componentDidUpdate(t,e){return JSON.stringify(t)!==JSON.stringify(e)}_makePropsProxy(t){const e=this.eventBus;return new Proxy(t,{get(n,r){const o=n[r];return typeof o=="function"?o.bind(n):o},set(n,r,o){const i={...n};return n[r]=o,e.emit("flow:component-did-update",i,n),!0}})}_componentDidUnmount(){this.element&&this.templater.removeEvents(this.element,this)}show(){this.element&&(this.element.style.display=this.hostStyles.display??"block")}hide(){this.element&&(this.element.style.display="none")}setProps(t){t&&Object.assign(this.props,t)}}function U(s,t){var n;const e=s.target;(n=t.getControl(e.name))==null||n.setValue(s)}function I(s,t,e,n){var o;const r=s.target;(o=t.getControl(r.name))==null||o.blur(s,t,e,n)}function _(s){return s.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function d(s,t){return s.length>=t?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${t} символов`}}function z(s){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function Y(s){return/\d{7,15}/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function Le(s){let t=!0;for(const e of Object.values(s.controls))e.valid||(t=!1);return t}function Ue(s,t,e){const n={isValid:!0,error:""};if(t.includes(_)){const{isValid:r,error:o}=_(s);n.isValid=n.isValid&&r,n.error=o}if(t.includes(d)){const{isValid:r,error:o}=d(s,e??0);n.isValid=n.isValid&&r,n.error=o}if(t.includes(z)){const{isValid:r,error:o}=z(s);n.isValid=n.isValid&&r,n.error=o}if(t.includes(Y)){const{isValid:r,error:o}=Y(s);n.isValid=n.isValid&&r,n.error=o}return n}class p{constructor(t="",e=[],n){a(this,"valid",!1);a(this,"error","");this.value=t,this.validators=e,this.minLength=n}clear(){this.value="",this.error="",this.valid=!1}setValue(t){const{value:e}=t.target;if(this.value===e)return;this.value=e;const{isValid:n,error:r}=Ue(e,this.validators,this.minLength);this.error=r,this.valid=n}blur(t,e,n,r){const o=t.target;n[`${o.name}_error`]!==this.error&&(n[`${o.name}_error`]=this.error),e.valid=Le(e);const i=r==null?void 0:r.querySelector('button[type="submit"]');i.disabled=!e.valid}}class D{constructor(t){a(this,"valid",!1);this.controls=t}getRawValue(){const t={};for(const[e,n]of Object.entries(this.controls))t[e]=n.value;return t}getControl(t){return Object.getOwnPropertyNames(this.controls).includes(t)?this.controls[t]:null}}const T={GET:"GET",POST:"POST",PUT:"PUT",PATCH:"PATCH",DELETE:"DELETE"};function Me(s){return Object.keys(s).reduce((t,e,n,r)=>`${t}${e}=${s[e]}${n<r.length-1?"&":""}`,"?")}class Z{get(t,e={},n){return e.data&&Object.keys(e.data).length>0&&(t+=Me(e.data)),this.request(t,{...e,method:T.GET,headers:{Accept:"application/json",...e.headers}},e.timeout,n)}post(t,e={},n){const r={...e.headers};return e.data instanceof FormData||(r["Content-Type"]="application/json"),this.request(t,{...e,method:T.POST,headers:r},e.timeout,n)}put(t,e={},n){const r={...e.headers};return e.data instanceof FormData||(r["Content-Type"]="application/json"),this.request(t,{...e,method:T.PUT,headers:r},e.timeout,n)}patch(t,e={},n){return this.request(t,{...e,method:T.PATCH},e.timeout,n)}delete(t,e={},n){const r={...e.headers};return e.data instanceof FormData||(r["Content-Type"]="application/json"),this.request(t,{...e,method:T.DELETE,headers:r},e.timeout,n)}request(t,e,n=5e3,r=!0){const{method:o="",data:i,headers:l={}}=e;return new Promise((c,m)=>{const u=new XMLHttpRequest;u.withCredentials=r,u.open(o,t);for(const b in l)u.setRequestHeader(b,l[b]);u.addEventListener("load",function(){c(u)}),u.addEventListener("abort",m),u.onerror=m,u.timeout=n,u.ontimeout=m,o===T.GET||!i?u.send():i instanceof FormData?u.send(i):u.send(JSON.stringify(i))}).then(c=>c.status>=400?Promise.reject(c):c).then(c=>{try{return JSON.parse(c.response)}catch{return}})}}function $e(s,t){return s===t}class Ne{constructor(t,e,n,r){a(this,"_blockClass");a(this,"_block");a(this,"_query");a(this,"_pathname");a(this,"canActivate");this._pathname=t,this._blockClass=e,this._block=null,this._query=n,this.canActivate=r??null}navigate(t){this.match(t)&&(this._pathname=t,this.render())}leave(){this._block&&this._block.hide()}match(t){return t.includes(ee.MESSENGER)&&this._pathname===ee.MESSENGER?!0:$e(t,this._pathname)}render(){const t=document.querySelector(this._query);if(!this._block){this._block=new this._blockClass,t.innerHTML=this._block.content,this._block.eventBus.emit(me.FLOW_CDM);return}this._block.show(),t.insertAdjacentElement("afterbegin",this._block.element)}}const P=class{constructor(t){a(this,"_rootQuery","#root");a(this,"history",window.history);a(this,"_currentRoute",null);a(this,"routes",[]);if(P.__instance)return P.__instance;this.routes=[],this.history=window.history,this._currentRoute=null,this._rootQuery=t,P.__instance=this}use({path:t,component:e,canActivate:n}){const r=new Ne(t,e,this._rootQuery,n);return this.routes.push(r),this}start(){window.onpopstate=({currentTarget:t})=>{t instanceof Window&&this._onRoute(t.location.pathname)},this._onRoute(window.location.pathname)}go(t){this.history.pushState({},"",t),this._onRoute(t)}back(){this.history.back()}forward(){this.history.forward()}getRoute(t){return this.routes.find(e=>e.match(t))}refresh(){window.location.reload()}_onRoute(t){var n;const e=this.getRoute(t);if(!(!e||(n=this._currentRoute)!=null&&n.match(e._pathname))){if(e.canActivate&&!e.canActivate()){console.error(`you do not have access to ${t} page`);return}this._currentRoute&&this._currentRoute.leave(),this._currentRoute=e,e.render()}}};let v=P;a(v,"__instance");class Te extends HTMLElement{constructor(){super();a(this,"_router",v.__instance)}connectedCallback(){const e=this.getAttribute("link")??"/messenger";this.addEventListener("click",()=>{this._router.go(e)})}disconnectedCallback(){const e=this.getAttribute("link")??"/messenger";this.removeEventListener("click",()=>{this._router.go(e)})}static get observedAttributes(){return["link"]}}class xe extends L{constructor(){super(Ce)}}const Be=`<div class="server-error" blockId="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <router-link link="/messenger" class="server-error__link"
    >Назад к чатам</router-link
  >
</div>
`;class Pe extends L{constructor(){super(Be)}}class y extends L{}const Re=`<div
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
`,ge="ya-praktikum.tech",O=`https://${ge}/api/v2`,Fe=`wss://${ge}`;function le(s){const t=new Date(Date.parse(s)),e=new Date(Date.now());if(e.getFullYear()!==t.getFullYear()||e.getMonth()!==t.getMonth()||e.getDate()-t.getDate()>6)return`${t.getDate()}.${t.getMonth()}.${t.getFullYear()}`;const n=t.getMinutes(),r=n>9?n:`0${n}`;return`${t.getHours()}:${r}`}function x(s){return!s||typeof s=="number"||typeof s=="boolean"||typeof s=="function"?!0:typeof s=="string"||Array.isArray(s)?s.length===0:typeof s=="object"?s.keys?[...s].length===0:Object.keys(s).length===0:!1}function Ve(s){return typeof s=="object"&&s!==null&&s.constructor===Object&&Object.prototype.toString.call(s)==="[object Object]"}function je(s){return Array.isArray(s)}function ce(s){return Ve(s)||je(s)}function fe(s,t){if(Object.keys(s).length!==Object.keys(t).length)return!1;for(const[e,n]of Object.entries(s)){const r=t[e];if(ce(n)&&ce(r)){if(fe(n,r))continue;return!1}if(n!==r)return!1}return!0}function qe(s){const t=typeof s;return!s||t==="string"||t==="number"||t==="boolean"||t==="bigint"}const h=(...s)=>{let t="";return s.forEach((e,n)=>{t+=String(e),!String(e).endsWith("/")&&n!==s.length-1&&!String(s[n+1]).startsWith("/")&&(t+="/")}),t};function be(s){return typeof s=="object"&&s!==null&&s.constructor===Object&&Object.prototype.toString.call(s)==="[object Object]"}function Q(s){return Array.isArray(s)}function te(s){return be(s)||Q(s)}function X(s){if(!be(s))throw new Error("input must be an object");const t=Object.keys(s).length;let e="",n=0;for(const[r,o]of Object.entries(s))te(o)?Q(o)?e+=ne(r,o):e+=se(r,o):e+=`${r}=${o}`,n!==t-1&&(e+="&"),n++;return e}function ne(s,t){let e="";for(let n=0;n<t.length;n++){const r=t[n];te(r)?Q(r)?e+=ne(`${s}[${n}]`,r):e+=se(`${s}[${n}]`,r):e+=`${s}[${n}]=${r}`,n!==t.length-1&&(e+="&")}return e}function se(s,t){let e="",n=0;const r=Object.keys(t).length;for(const[o,i]of Object.entries(t))te(i)?Q(i)?e+=ne(`${s}[${o}]`,i):e+=se(`${s}[${o}]`,i):e+=`${s}[${o}]=${i}`,n!==r-1&&(e+="&"),n++;return e}const M="authUser",w="currentChatId",R=class{constructor(){if(R.__instance)return R.__instance;R.__instance=this}getItem(t){return localStorage.getItem(t)}setItem(t,e){let n=qe(e)?String(e):JSON.stringify(e);localStorage.setItem(t,n)}removeItem(t){localStorage.removeItem(t)}clear(){localStorage.clear()}};let f=R;a(f,"__instance");var K=(s=>(s.MESSAGE="message",s.FILE="file",s.USER_CONNECTED="user connected",s))(K||{});class He extends pe{constructor(){super(...arguments);a(this,"_state",{})}getState(){return this._state}set(e,n){this._state={...this._state,[e]:n},this.emit("update",this._state)}}const B=new He;function Ge(s){return t=>class extends t{constructor(e){super({...e,...s(B.getState())}),B.on("update",()=>{const n=s(B.getState());this.setProps(n)})}}}const F=class{constructor(){a(this,"_http",new Z);a(this,"_baseUrl",h(O,"auth"));a(this,"_router",v.__instance);a(this,"_storageService",new f);if(F.__instance)return F.__instance;F.__instance=this}signUp(t){return this._http.post(h(this._baseUrl,"signup"),{data:t})}signIn(t){return this._http.post(h(this._baseUrl,"signin"),{data:t})}user(){return this._http.get(h(this._baseUrl,"user")).then(t=>(this._storageService.setItem(M,t),t)).catch(t=>{console.error(t),this._storageService.clear(),this._router.go("/")})}logout(){return this._http.post(h(this._baseUrl,"logout")).then(()=>{this._storageService.clear(),this._router.go("/")})}};let A=F;a(A,"__instance");const V=class{constructor(){a(this,"_baseUrl",h(O,"chats"));a(this,"_http",new Z);if(V.__instance)return V.__instance;V.__instance=this}getChats(t){let e=this._baseUrl;return t&&Object.keys(t).length>0&&(e+=`?${X(t)}`),this._http.get(e)}createChat(t){return this._http.post(this._baseUrl,{data:{title:t}})}deleteChat(t){return this._http.delete(this._baseUrl,{data:{chatId:t}})}getChatFiles(t){return this._http.get(h(this._baseUrl,t,"files"))}getArchiveChats(t){let e=h(this._baseUrl,"archive");return t&&Object.keys(t).length>0&&(e+=`?${X(t)}`),this._http.get(e)}archiveChat(t){return this._http.post(h(this._baseUrl,"archive"),{data:{chatId:t}})}unarchiveChat(t){return this._http.post(h(this._baseUrl,"unarchive"),{data:{chatId:t}})}getCommonChatWithUser(t){return this._http.get(h(this._baseUrl,t,"common"))}getChatUsers(t,e){let n=h(this._baseUrl,t,"users");return e&&Object.keys(e).length>0&&(n+=`?${X(e)}`),this._http.get(n)}getNewChatMessages(t){return this._http.get(h(this._baseUrl,"new",t))}changeChatAvatar(t){return this._http.put(h(this._baseUrl,"avatar"),{data:t})}addUsersToChat(t,e){return this._http.put(h(this._baseUrl,"users"),{data:{users:t,chatId:e}})}deleteUsersFromChat(t,e){return this._http.delete(h(this._baseUrl,"users"),{data:{users:t,chatId:e}})}getTokenForConnectMessagesServer(t){return this._http.post(h(this._baseUrl,"token",t))}};let S=V;a(S,"__instance");const j=class{constructor(){a(this,"_baseUrl",h(O,"user"));a(this,"_http",new Z);if(j.__instance)return j.__instance;j.__instance=this}updateUserData(t){return this._http.put(h(this._baseUrl,"profile"),{data:t})}updateAvatar(t){return this._http.put(h(this._baseUrl,"profile/avatar"),{data:t})}updatePassword(t){return this._http.put(h(this._baseUrl,"password"),{data:t})}getUserById(t){return this._http.get(h(this._baseUrl,t))}searchUserByLogin(t){return this._http.post(h(this._baseUrl,"search"),{data:{login:t}})}};let k=j;a(k,"__instance");const We=1e4;class Je{constructor(){a(this,"_chatsApi",new S);a(this,"_storageService",new f);a(this,"_socketsMap",new Map)}connect(t){const e=this._socketsMap.get(t);if(e&&(e.CONNECTING||e.OPEN))return;const n=this._storageService.getItem(M);if(!n)return;const r=JSON.parse(n);this._chatsApi.getTokenForConnectMessagesServer(Number(t)).then(o=>{const i=new WebSocket(`${Fe}/ws/chats/${r.id}/${t}/${o.token}`);this._socketsMap.set(t,i),this._initListeners(t,i),console.log(i)})}sendMessage(t,e){const n=this._socketsMap.get(t);n&&n.send(JSON.stringify(e))}_initListeners(t,e){setInterval(()=>{this.sendMessage(t,{type:"ping"})},We),e.addEventListener("open",()=>{console.log("Соединение установлено"),this.sendMessage(t,{content:"0",type:"get old"})}),e.addEventListener("close",n=>{n.wasClean?console.log("Соединение закрыто чисто"):console.log("Обрыв соединения"),console.log(`Код: ${n.code} | Причина: ${n.reason}`)}),e.addEventListener("message",n=>{if(JSON.parse(n.data).type==="pong")return;const r=JSON.parse(n.data),o=Array.isArray(r)?r:[r],i=B.getState().chatMessages??{},l=i[t]??[];i[t]=[...o,...l].sort((c,m)=>c.time>m.time?1:-1),B.set("chatMessages",i)}),e.addEventListener("error",n=>{console.log("Ошибка",n.message)})}}class ze{constructor(){a(this,"_http",new Z);a(this,"_baseUrl",h(O,"resources"))}loadFile(t){return this._http.post(this._baseUrl,{data:t})}}class Ye extends y{constructor(){super(Re,[],{title_error:""});a(this,"_chatsApi",new S);a(this,"form",new D({title:new p("",[_,d],4)}));a(this,"selector","add-chat-dialog")}onSubmit(e){if(e.preventDefault(),!this.form.valid)return;const{title:n}=this.form.getRawValue();this._chatsApi.createChat(n).then(()=>{document.location.reload()})}onInput(e){U(e,this.form)}onBlur(e){I(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const Ze=`<div
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
`;class Qe extends y{constructor(){super(Ze,[],{login_error:""});a(this,"_chatsApi",new S);a(this,"_userApi",new k);a(this,"_storageService",new f);a(this,"form",new D({login:new p("",[_,d],4)}));a(this,"selector","add-user-dialog")}onSubmit(e){e.preventDefault();const n=this.form;if(!n.valid)return;const r=n.controls.login,o=this._storageService.getItem(w);o&&this._userApi.searchUserByLogin(r.value).then(i=>i[0].id).then(i=>this._chatsApi.addUsersToChat([i],Number(o))).then(()=>{document.location.reload()})}onInput(e){U(e,this.form)}onBlur(e){I(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const Xe=`<div
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
`;class Ke extends y{constructor(){super(Xe,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""});a(this,"_userApiService",new k);a(this,"form",new D({oldPassword:new p("",[_,d],6),newPassword:new p("",[_,d],6),password_repeat:new p("",[_,d],6)}));a(this,"selector","change-password-dialog")}componentDidMount(){super.componentDidMount()}onSubmit(e){e.preventDefault(),this.form.valid&&this._userApiService.updatePassword(this.form.getRawValue()).then(()=>{this.onDialogClose()})}onInput(e){var r;const n=e.target;(r=this.form.getControl(n.name))==null||r.setValue(e)}onBlur(e){I(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const et=`<div
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
`;class tt extends y{constructor(){super(et,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",display_name_error:""});a(this,"_userApiService",new k);a(this,"_router",v.__instance);a(this,"_storageService",new f);a(this,"form",new D({email:new p("",[_,d,z],4),login:new p("",[_,d],4),display_name:new p("",[_,d],4),first_name:new p("",[_,d],4),second_name:new p("",[_,d],4),phone:new p("",[_,d,Y],8)}));a(this,"selector","change-user-data-dialog")}onSubmit(e){e.preventDefault(),this.form.valid&&this._userApiService.updateUserData(this.form.getRawValue()).then(n=>{this._storageService.setItem(M,n),this._router.refresh()})}onInput(e){U(e,this.form)}onBlur(e){I(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const nt=`<section class="menu chat-menu" blockId="{{blockId}}">
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
`;class st extends y{constructor(){super(nt);a(this,"selector","chat-menu")}onAddUserDialogOpened(){document.querySelector(".overlay-add-user").classList.add("overlay_opened")}onRemoveUserDialogOpened(){document.querySelector(".overlay-remove-user").classList.add("overlay_opened")}onRemoveChatDialogOpened(){document.querySelector(".overlay-confirm").classList.add("overlay_opened")}}const rt=`<section class="menu clip-menu" blockId="{{blockId}}">
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
`;class ot extends y{constructor(){super(rt);a(this,"selector","clip-menu")}}const at=`<div
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
`;var de;class it extends y{constructor(){super(at);a(this,"_userApiService",new k);a(this,"_router",v.__instance);a(this,"_storageService",new f);a(this,"selector","load-file-dialog");a(this,"formData",new FormData((de=this.element)==null?void 0:de.querySelector("form")))}onInput(e){const n=e.target.files,r=this.element;n.length===0||!r||(r.querySelector(".dialog__load-text").textContent=n[0].name,r.querySelector(".dialog__submit").disabled=!1,this.formData.append("avatar",n[0],n[0].name))}onSubmit(e){e.preventDefault(),this._userApiService.updateAvatar(this.formData).then(n=>{n&&(this._storageService.setItem(M,n),this._router.refresh())})}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const lt=`<section class="auth login" blockId="{{blockId}}">
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
`;class ct extends y{constructor(){super(lt,[],{login_error:"",password_error:""});a(this,"_authApiService",new A);a(this,"_router",v.__instance);a(this,"form",new D({login:new p("",[_,d],4),password:new p("",[_,d],6)}));a(this,"selector","login-form")}onSubmit(e){e.preventDefault(),this.form.valid&&this._authApiService.signIn(this.form.getRawValue()).then(()=>this._authApiService.user()).then(n=>{n&&this._router.go("/messenger")})}onInput(e){U(e,this.form)}onBlur(e){I(e,this.form,this.props,this.element)}}const ut=`<section class="auth register" blockId="{{blockId}}">
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
`;class ht extends y{constructor(){super(ut,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""});a(this,"_authApiService",new A);a(this,"_router",v.__instance);a(this,"form",new D({email:new p("",[_,d,z],4),login:new p("",[_,d],4),first_name:new p("",[_,d],4),second_name:new p("",[_,d],4),phone:new p("",[_,d,Y],8),password:new p("",[_,d],6),password_repeat:new p("",[_,d],6)}));a(this,"selector","register-form")}onSubmit(e){e.preventDefault(),this.form.valid&&this._authApiService.signUp(this.form.getRawValue()).then(()=>this._authApiService.user()).then(n=>{n&&this._router.go("/messenger")})}onInput(e){U(e,this.form)}onBlur(e){I(e,this.form,this.props,this.element)}}const _t=`<div
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
`;class dt extends y{constructor(){super(_t,[],{login_error:""});a(this,"_userApi",new k);a(this,"_chatsApi",new S);a(this,"_storageService",new f);a(this,"form",new D({login:new p("",[_,d],4)}));a(this,"selector","remove-user-dialog")}onSubmit(e){if(e.preventDefault(),!this.form.valid)return;const{login:n}=this.form.getRawValue(),r=this._storageService.getItem(w);r&&this._userApi.searchUserByLogin(n).then(o=>o[0].id).then(o=>this._chatsApi.deleteUsersFromChat([o],Number(r))).then(()=>{document.location.reload()})}onInput(e){U(e,this.form)}onBlur(e){I(e,this.form,this.props,this.element)}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const pt=`<div class="wrapper" blockId="{{blockId}}">
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
`,mt=`<div
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
`;class gt extends y{constructor(){super(mt);a(this,"_chatsApi",new S);a(this,"_storageService",new f);a(this,"selector","confirm-dialog")}onSaveChanges(){const e=this._storageService.getItem(w);e&&this._chatsApi.deleteChat(Number(e)).then(()=>{document.location.reload()})}onDialogClose(){var e;(e=this.element)==null||e.classList.remove("overlay_opened")}onDialogNotClose(e){e.stopPropagation()}}const ue=300,he=24*60*60*1e3;class ft extends L{constructor(){super(pt,[new st,new ot,new Qe,new dt,new Ye,new gt],{chats:[],chatMessages:{}},{display:"grid"});a(this,"_chatsApiService",new S);a(this,"_webSocketApi",new Je);a(this,"_storageService",new f);a(this,"_resourcesApiService",new ze);a(this,"_messagesContainer",null);a(this,"form",new D({message:new p("",[_])}));a(this,"clipFiles",[]);a(this,"mapChatLastMessageDate",new Map)}render(e,n){this._renderMessages(e,n),super.render(n)}componentDidMount(){this._chatsApiService.getChats().then(e=>e??[]).then(e=>{this.props.chats=e,this._renderChats(e)}),super.componentDidMount(),this._messagesContainer=document.querySelector(".chat__messages")}_renderChats(e){const n=document.querySelector(".chats__list");if(e.length===0){n.innerHTML="";return}const r=document.getElementById("chat-list-item-template").content;for(const o of e){const{id:i,last_message:l,avatar:c}=o,u=r.cloneNode(!0).children[0],b=document.createAttribute("chatId");b.value=String(i),u.attributes.setNamedItem(b),this._storageService.getItem(w)===String(i)&&(u.classList.add("chats__list-item-active"),this._loadMessages(String(i)));const q=l?{...l,time:le(l.time)}:{content:"Ещё нет сообщений",time:""},H={...o,avatar:c??"/assets/no-avatar.svg",last_message:q};this.templater.compile(H,u,!1),n.append(u)}}_renderMessages(e,n){var b,q,H,re;if(!e&&!n)return;const r=e?e.chatMessages??{}:{},o=n?n.chatMessages??{}:{};if(fe(r,o))return;const i=document.getElementById("chat-message-with-text-template").content,l=document.getElementById("chat-message-with-photo-template").content,c=this._storageService.getItem(w);if(!c)return;let m=this.mapChatLastMessageDate.get(c)??null;const u=JSON.parse(this._storageService.getItem(M));for(const G of o[c])if((x(r)||!Object.getOwnPropertyNames(r).includes(c)||!r[c].includes(G))&&G.type!==K.USER_CONNECTED){const{time:oe,type:ve,user_id:ye,file:$}=G,E=new Date(Date.parse(oe));let W,C;if(!m||E.getTime()>m.getTime()+he){const N=document.createElement("p");N.classList.add("chat__date"),N.textContent=`${E.getDate()}.${E.getMonth()}.${E.getFullYear()}`,(b=this._messagesContainer)==null||b.append(N),m=E,this.mapChatLastMessageDate.set(c,E)}switch(ve){case K.FILE:W=l.cloneNode(!0),C=W.children[0];const N=C.querySelector(".chat__message-photo");N.src=`${O}/resources${($==null?void 0:$.path)??""}`,N.alt=($==null?void 0:$.filename)??"";break;default:W=i.cloneNode(!0),C=W.children[0]}C.children[0].classList.add(u.id===ye?"chat__message_from-user":"chat__message_to-user"),this.templater.compile({...G,time:le(oe)},C,!1),x(r)?(q=this._messagesContainer)==null||q.append(C):m&&E.getTime()<=m.getTime()+he?(H=document.querySelector("p.chat__date"))==null||H.insertAdjacentElement("afterend",C):(re=this._messagesContainer)==null||re.insertAdjacentElement("afterbegin",C)}x(r)&&setTimeout(()=>{this._scrollMessagesToBottom()},ue)}onSubmit(e){if(e.preventDefault(),!this.form.valid&&x(this.clipFiles))return;const n=this._storageService.getItem(w);if(!n){console.error("Чат не выбран");return}const r=this.form.getRawValue();if(!x(this.clipFiles)){for(const{id:i}of this.clipFiles)this._webSocketApi.sendMessage(n,{content:String(i),type:"file"});const o=document.querySelector(".chat__load-files");o.innerHTML="",o.classList.add("chat__load-files_empty")}x(r.message)||this._webSocketApi.sendMessage(n,{content:r.message,type:"message"}),this._resetForm(),setTimeout(()=>{this._scrollMessagesToBottom()},ue)}onInput(e){U(e,this.form)}onInputFile(e){const n=e.target.files;if(n.length===0)return;const r=new FormData;r.append("resource",n[0],n[0].name),this._resourcesApiService.loadFile(r).then(o=>{var c;const i=document.createElement("IMG");i.src=`${O}/resources${o.path}`,i.alt=o.filename;const l=document.querySelector(".chat__load-files");l!=null&&l.classList.contains("chat__load-files_empty")&&(l==null||l.classList.remove("chat__load-files_empty")),(c=document.querySelector(".chat__load-files"))==null||c.append(i),document.querySelector("button.chat__button-send").disabled=!1,this.clipFiles.push(o)})}onBlur(e){I(e,this.form,this.props,this.element)}onChatMenuToggled(){var e;(e=document.querySelector(".chat-menu"))==null||e.classList.toggle("opened")}onClipMenuToggled(){var e;(e=document.querySelector(".clip-menu"))==null||e.classList.toggle("opened")}onAddChatOpened(){var e;(e=document.querySelector(".overlay-add-chat"))==null||e.classList.add("overlay_opened")}onMessagesContainerScroll(){var e,n;if(((e=this._messagesContainer)==null?void 0:e.scrollTop)===0){const r=this._storageService.getItem(w);if(!r)return;const o=this.props.chatMessages??{};this._webSocketApi.sendMessage(r,{content:`${((n=o[r])==null?void 0:n.length)??0}`,type:"get old"})}}onChatClicked(e){var c;if(!e.target)return;const n=e.target,r=n.tagName==="LI"?n:n.parentElement,o=r.getAttribute("chatId"),i=document.querySelector(".chat__messages");if(!o)return;const l=this._storageService.getItem(w);l&&l!==o&&((c=document.querySelector(".chats__list-item-active"))==null||c.classList.remove("chats__list-item-active"),i&&(i.innerHTML="")),this._storageService.setItem(w,o),r.classList.add("chats__list-item-active"),this._loadMessages(o)}_loadMessages(e){this._webSocketApi.connect(e)}_resetForm(){const e=document.querySelector('form[name="send-message"]');e==null||e.reset(),this.clipFiles=[],document.querySelector("button.chat__button-send").disabled=!0}_scrollMessagesToBottom(){this._messagesContainer&&(this._messagesContainer.scrollTop=this._messagesContainer.scrollHeight)}}function bt(s){return{chatMessages:{...s.chatMessages}}}const vt=Ge(bt)(ft),yt=`<section blockId="{{blockId}}">{{>login-form}}</section>
`;class wt extends L{constructor(){super(yt,[new ct])}}const St=`<section class="profile" blockId="{{blockId}}">
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
`;class Ct extends L{constructor(){super(St,[new tt,new Ke,new it],{email:"",login:"",first_name:"",second_name:"",phone:"",display_name:""},{display:"flex"});a(this,"_authApiService",new A);a(this,"_router",v.__instance);a(this,"_storageService",new f)}componentDidMount(){const e=this._storageService.getItem(M),n=document.querySelector(".profile__image");if(e){const r=JSON.parse(e);if(this.props=r,n){const{avatar:o}=r;o&&(n.src=`${O}/resources${o}`)}}super.componentDidMount()}onAvatarClicked(){var e;(e=document.querySelector(".overlay-load-file"))==null||e.classList.add("overlay_opened")}onChangeDataDialogOpened(){var e;(e=document.querySelector(".overlay-change-data"))==null||e.classList.add("overlay_opened")}onChangePasswordDialogOpened(){var e;(e=document.querySelector(".overlay-change-password"))==null||e.classList.add("overlay_opened")}onLogout(){this._authApiService.logout().then(()=>{this._router.go("/")})}}const kt=`<section blockId="{{blockId}}">{{>register-form}}</section>
`;class It extends L{constructor(){super(kt,[new ht])}}function _e(){return!!new f().getItem(M)}var ee=(s=>(s.MESSENGER="/messenger",s.NOT_FOUND="/404",s.ERROR_PAGE="/500",s.SIGN_UP="/sign-up",s.SETTINGS="/settings",s.LOGIN="/",s))(ee||{});window.addEventListener("DOMContentLoaded",async()=>{const s=[{path:"/messenger",component:vt,canActivate:_e},{path:"/404",component:xe},{path:"/500",component:Pe},{path:"/",component:wt},{path:"/sign-up",component:It},{path:"/settings",component:Ct,canActivate:_e}],t=new v("#root");for(const n of s)t.use(n);t.start(),new A().user().then(n=>{n&&(document.location.pathname==="/"||document.location.pathname==="/sign-up")&&t.go("/messenger")}),customElements.get("router-link")||customElements.define("router-link",Te)},{once:!0});
