var I=Object.defineProperty;var x=(o,s,n)=>s in o?I(o,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[s]=n;var i=(o,s,n)=>(x(o,typeof s!="symbol"?s+"":s,n),n);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();const C=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class L{constructor(){i(this,"_listeners",{})}on(s,n){this._listeners[s]||(this._listeners[s]=[]),this._listeners[s].push(n)}off(s,n){if(!this._listeners[s])throw new Error("Нет такого события");this._listeners[s]=this._listeners[s].filter(t=>t!==n)}emit(s,...n){if(!this._listeners[s])throw new Error("Нет такого события");for(const t of this._listeners[s])t(...n)}}let y;const V=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(V)}const m=[];for(let o=0;o<256;++o)m.push((o+256).toString(16).slice(1));function B(o,s=0){return(m[o[s+0]]+m[o[s+1]]+m[o[s+2]]+m[o[s+3]]+"-"+m[o[s+4]]+m[o[s+5]]+"-"+m[o[s+6]]+m[o[s+7]]+"-"+m[o[s+8]]+m[o[s+9]]+"-"+m[o[s+10]]+m[o[s+11]]+m[o[s+12]]+m[o[s+13]]+m[o[s+14]]+m[o[s+15]]).toLowerCase()}const k=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),D={randomUUID:k};function N(o,s,n){if(D.randomUUID&&!s&&!o)return D.randomUUID();o=o||{};const t=o.random||(o.rng||S)();if(t[6]=t[6]&15|64,t[8]=t[8]&63|128,s){n=n||0;for(let e=0;e<16;++e)s[n+e]=t[e];return s}return B(t)}class U{constructor(){i(this,"elementsContentMap",new Map)}precompile(s,n,t){const e=s.match(/{{>[\w-]*}}/gm);let a=s;const l=new Map;if(a=a.replaceAll(/{{blockId}}/gm,t),!e||e.length===0||n.length===0)return a;for(const r of n)l.set(r.selector,r.content);for(const r of e.map(c=>c.slice(3,-2))){const c=new RegExp(`{{>${r}}}`,"gm");l.has(r)&&(a=a.replace(c,l.get(r)))}return a}compile(s,n){n.children.length>0?this._replaceTextContentChildNode(n.children,s):this._replaceTextContent(n,s)}addEvents(s,n){this._addOrRemoveEvents(s,n,!1),s.children.length>0&&this._registerEvents(s.children,n,!1)}removeEvents(s,n){this._addOrRemoveEvents(s,n,!0),s.children.length>0&&this._registerEvents(s.children,n,!0)}_registerEvents(s,n,t){for(const e of s)this._addOrRemoveEvents(e,n,t),e.children.length>0&&this._registerEvents(e.children,n,t)}_addOrRemoveEvents(s,n,t){const e=/^\(.*\)$/;for(const a of s.attributes)if(e.test(a.name)){const l=a.name.slice(1,-1),r=n[a.value];r&&(t?s.removeEventListener(l,r):s.addEventListener(l,r))}}_replaceTextContentChildNode(s,n){if(s.length>0)for(const t of s)t.children.length>0?this._replaceTextContentChildNode(t.children,n):this._replaceTextContent(t,n)}_replaceTextContent(s,n){const t=s.textContent;for(const e in n)if(this.elementsContentMap.has(e)){const a=this.elementsContentMap.get(e);for(const l of a){const r=n[e];typeof r=="string"&&(l.textContent=r)}}if(t){const e=t.match(/{{[\w-.'()]*}}/gm);if(!e||e.length===0||n.length===0)return;for(const a of e.map(l=>l.slice(2,-2))){const l=new RegExp(`{{${a}}}`,"gm"),r=n[a];if(typeof r=="string"){const c=this.elementsContentMap.get(a)??new Set;c.add(s),this.elementsContentMap.set(a,c),s.textContent=t.replace(l,r)}}}}}const h=class{constructor(s,n=[],t={},e={}){i(this,"eventBus",new L);i(this,"props");i(this,"blockId",N());i(this,"content");i(this,"templater",new U);i(this,"declarations");i(this,"events");i(this,"element",null);this.content=s,this.declarations=n,this.events=e,this.props=this._makePropsProxy(t),this._registerEvents(),this.eventBus.emit(h.EVENTS.INIT)}_registerEvents(){this.eventBus.on(h.EVENTS.INIT,this._init.bind(this)),this.eventBus.on(h.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),this.eventBus.on(h.EVENTS.FLOW_RENDER,this._render.bind(this)),this.eventBus.on(h.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this)),this.eventBus.on(h.EVENTS.DESTROY,this._componentDidUnmount.bind(this))}_init(){this.init(),this.eventBus.emit(h.EVENTS.FLOW_RENDER)}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.element=document.getElementById(this.blockId),this.templater.addEvents(this.element,this.events),this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const s of this.declarations)s.eventBus.emit(h.EVENTS.FLOW_CDM);this.templater.compile(this.props,this.element)}_render(){this.render()}render(){this.content&&this.element&&this.templater.compile(this.props,this.element)}_componentDidUpdate(s,n){this.componentDidUpdate(s,n)&&this.eventBus.emit(h.EVENTS.FLOW_RENDER)}componentDidUpdate(s,n){return JSON.stringify(s)!==JSON.stringify(n)}_makePropsProxy(s){const n=this.eventBus;return new Proxy(s,{get(t,e){const a=t[e];return typeof a=="function"?a.bind(t):a},set(t,e,a){const l={...t};return t[e]=a,n.emit(h.EVENTS.FLOW_CDU,l,t),!0}})}_componentDidUnmount(){this.element&&this.templater.removeEvents(this.element,this.events)}};let g=h;i(g,"EVENTS",{INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_CDU:"flow:component-did-update",DESTROY:"destroy"});class M extends g{constructor(){super(C)}}function u(o){return o.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function p(o,s){return o.length>s?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${s} символов`}}function w(o){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(o)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function E(o){return/\d{7,15}/.test(o)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function d(o){let s=!0;for(const n of o.controls.values())n.valid||(s=!1);return s}function f(o){const{value:s,minLength:n,validators:t}=o,e={isValid:!0,error:""};if(t.includes(u)){const{isValid:a,error:l}=u(s);e.isValid=e.isValid&&a,e.error=l}if(t.includes(p)){const{isValid:a,error:l}=p(s,n??0);e.isValid=e.isValid&&a,e.error=l}if(t.includes(w)){const{isValid:a,error:l}=w(s);e.isValid=e.isValid&&a,e.error=l}if(t.includes(E)){const{isValid:a,error:l}=E(s);e.isValid=e.isValid&&a,e.error=l}return e}class v extends g{}const O=`<div class="overlay overlay-add-user" id="{{blockId}}" (click)="onDialogClose">
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
`;class $ extends v{constructor(){super(O,[],{login_error:""},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{var _;const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const c=(_=this.element)==null?void 0:_.querySelector('button[type="submit"]');c&&(c.disabled=!t.valid)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});i(this,"form",{controls:new Map([["login",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}]]),valid:!1});i(this,"selector","add-user-dialog")}}const T=`<div
  class="overlay overlay-remove-user"
  id="{{blockId}}"
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
`;class P extends v{constructor(){super(T,[],{login_error:""},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{var _;const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const c=(_=this.element)==null?void 0:_.querySelector('button[type="submit"]');c&&(c.disabled=!t.valid)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});i(this,"form",{controls:new Map([["login",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}]]),valid:!1});i(this,"selector","remove-user-dialog")}}const R=`<section class="menu clip-menu" id="{{blockId}}">
  <button class="menu__button" type="button">
    <img src="/assets/photo-icon.svg" alt="фото" class="menu__icon" />
    Фото или Видео
  </button>
  <button class="menu__button" type="button">
    <img src="/assets/file-icon.svg" alt="файл" class="menu__icon" />
    Файл
  </button>
  <button class="menu__button" type="button">
    <img src="/assets/location-icon.svg" alt="локация" class="menu__icon" />
    Локация
  </button>
</section>
`;class q extends v{constructor(){super(R,[],{},{});i(this,"selector","clip-menu")}}const F=`<section class="menu chat-menu" id="{{blockId}}">
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
</section>
`;class A extends v{constructor(){super(F,[],{},{onAddUserDialogOpened:()=>{document.querySelector(".overlay-add-user").classList.add("overlay_opened")},onRemoveUserDialogOpened:()=>{document.querySelector(".overlay-remove-user").classList.add("overlay_opened")}});i(this,"selector","chat-menu")}}const W=`<div class="wrapper" id="{{blockId}}">
  <aside class="chats">
    <a class="chats__profile-link" href="/profile"
      >Профиль<span class="chats__profile-arrow"> > </span></a
    >
    <input class="chats__search" placeholder="Поиск" type="text" />
    <ul class="chats__list">
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus et
          inventore placeat quaerat, sunt vero?
        </p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
      <li class="chats__list-item">
        <h3 class="chats__item-title">User name</h3>
        <img
          class="chats__item-image"
          src="/assets/no-avatar.svg"
          alt="аватар"
        />
        <p class="chats__item-message">Последнее сообщение</p>
        <span class="chats__item-time">10:49</span>
        <span class="chats__message-num">2</span>
      </li>
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
    <div class="chat__messages">
      <p class="chat__date">19 июля</p>
      <div class="chat__message-container">
        <div
          class="chat__message chat__message-with-text chat__message_to-user"
        >
          <p class="chat__message-content">
            Привет! Смотри, тут всплыл интересный кусок лунной космической
            истории — НАСА в какой-то момент попросила Хассельблад адаптировать
            модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты
            летали с моделью 500 EL — и к слову говоря, все тушки этих камер все
            еще находятся на поверхности Луны, так как астронавты с собой
            забрали только кассеты с пленкой. Хассельблад в итоге адаптировал
            SWC для космоса, но что-то пошло не так и на ракету они так никогда
            и не попали. Всего их было произведено 25 штук, одну из них недавно
            продали на аукционе за 45000 евро.
          </p>
          <div class="chat__message-time">11:56</div>
        </div>
      </div>
      <div class="chat__message-container">
        <div
          class="chat__message chat__message-with-photo chat__message_to-user"
        >
          <img
            class="chat__message-photo"
            src="/assets/camera.png"
            alt="камера"
          />
          <span class="chat__message-time">11:56</span>
        </div>
      </div>
      <div class="chat__message-container">
        <div
          class="chat__message chat__message-with-text chat__message_from-user"
        >
          <p class="chat__message-content">Круто!</p>
          <div class="chat__message-time">
            <img
              class="chat__message-status"
              src="/assets/reading_message.svg"
            />
            12:00
          </div>
        </div>
      </div>
    </div>
    <form class="chat__add-text" name="send-message" (submit)="onSubmit">
      <buttton
        class="chat__button-attach"
        type="button"
        (click)="onClipMenuToggled"
      >
        <img
          src="/assets/clip.svg"
          alt="прикрепить файл"
          class="chat__image-clip"
        />
      </buttton>
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
    </form>
  </section>
</div>
{{>chat-menu}} {{>clip-menu}} {{>add-user-dialog}} {{>remove-user-dialog}}
`;class z extends g{constructor(){super(W,[new A,new q,new $,new P],{},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const _=document.getElementById(this.blockId).querySelector('button[type="submit"]');_.disabled=!t.valid},onChatMenuToggled:()=>{var n;(n=document.querySelector(".chat-menu"))==null||n.classList.toggle("opened")},onClipMenuToggled:()=>{var n;(n=document.querySelector(".clip-menu"))==null||n.classList.toggle("opened")}});i(this,"form",{controls:new Map([["message",{value:"",validators:[u],valid:!1,error:""}]]),valid:!1})}}const Z=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class Y extends g{constructor(){super(Z)}}const H=`<section class="auth login" id="{{blockId}}">
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
      <a class="auth__link" href="/register">Нет аккаунта?</a>
    </div>
  </form>
</section>
`;class J extends v{constructor(){super(H,[],{login_error:"",password_error:""},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{var _;const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const c=(_=this.element)==null?void 0:_.querySelector('button[type="submit"]');c&&(c.disabled=!t.valid)}});i(this,"form",{controls:new Map([["login",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["password",{value:"",validators:[u,p],minLength:6,valid:!1,error:""}]]),valid:!1});i(this,"selector","login-form")}}const j=`<section id="{{blockId}}">{{>login-form}}</section>
`;class K extends g{constructor(){super(j,[new J])}}const G=`<section class="auth register" id="{{blockId}}">
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
      <a class="auth__link" href="/login">Войти</a>
    </div>
  </form>
</section>
`;class Q extends v{constructor(){super(G,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{var _;const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const c=(_=this.element)==null?void 0:_.querySelector('button[type="submit"]');c&&(c.disabled=!t.valid)}});i(this,"form",{controls:new Map([["email",{value:"",validators:[u,p,w],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[u,p,E],minLength:8,valid:!1,error:""}],["password",{value:"",validators:[u,p],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[u,p],minLength:6,valid:!1,error:""}]]),valid:!1});i(this,"selector","register-form")}}const X=`<section id="{{blockId}}">{{>register-form}}</section>
`;class ee extends g{constructor(){super(X,[new Q])}}const ne=`<div
  class="overlay overlay-change-data"
  id="{{blockId}}"
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
`;class te extends v{constructor(){super(ne,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",display_name_error:""},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{var _;const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const c=(_=this.element)==null?void 0:_.querySelector('button[type="submit"]');c&&(c.disabled=!t.valid)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});i(this,"form",{controls:new Map([["email",{value:"",validators:[u,p,w],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["display_name",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[u,p],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[u,p,E],minLength:8,valid:!1,error:""}]]),valid:!1});i(this,"selector","change-user-data-dialog")}}const se=`<div
  class="overlay overlay-change-password"
  id="{{blockId}}"
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
`;class ae extends v{constructor(){super(se,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""},{onSubmit:n=>{n.preventDefault();const t=this.form;if(d(t)){const e={};for(const[a,l]of t.controls)e[a]=l.value;console.log(e)}},onInput:n=>{const t=this.form.controls,e=n.target;t.has(e.name)&&(t.get(e.name).value=e.value)},onBlur:n=>{var _;const t=this.form,e=n.target,a=t.controls.get(e.name),{isValid:l,error:r}=f(a);a.valid=l,a.error=r,this.props[`${e.name}_error`]!==a.error&&(this.props[`${e.name}_error`]=a.error),t.valid=d(t);const c=(_=this.element)==null?void 0:_.querySelector('button[type="submit"]');c&&(c.disabled=!t.valid)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});i(this,"form",{controls:new Map([["oldPassword",{value:"",validators:[u,p],minLength:6,valid:!1,error:""}],["newPassword",{value:"",validators:[u,p],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[u,p],minLength:6,valid:!1,error:""}]]),valid:!1});i(this,"selector","change-password-dialog")}componentDidMount(){super.componentDidMount()}}const oe=`<div class="overlay overlay-load-file" id="{{blockId}}">
  <section class="dialog">
    <h3 class="dialog__title">Загрузите файл</h3>
    <label class="dialog__load-label">
      <input class="dialog__load-input" type="file" name="avatar" />
      <span class="dialog__load-text">Выбрать файл на компьютере</span>
    </label>
    <button class="dialog__submit" type="submit">Поменять</button>
  </section>
</div>
`;class le extends v{constructor(){super(oe);i(this,"selector","load-file-dialog")}}const re=`<section class="profile" id="{{blockId}}">
  <img src="/assets/no-avatar.svg" class="profile__image" alt="ваш аватар" />
  <h2 class="profile__title">Иван</h2>
  <table class="profile__table profile__table_big">
    <tr class="profile__table-row">
      <td class="profile__table-cell">Почта</td>
      <td class="profile__table-cell">pochta@yandex.ru</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Логин</td>
      <td class="profile__table-cell">ivanivanov</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Имя</td>
      <td class="profile__table-cell">Иван</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Фамилия</td>
      <td class="profile__table-cell">Иванов</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Имя в чате</td>
      <td class="profile__table-cell">Иван</td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">Телефон</td>
      <td class="profile__table-cell">+7 (909) 967 30 30</td>
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
        <button class="profile__button profile__button_warn" type="button">
          Выйти
        </button>
      </td>
    </tr>
  </table>
  <aside class="sidebar">
    <a href="/chats" class="sidebar__link">
      <img
        src="/assets/exit.svg"
        alt="Вернуться к чатам"
        class="sidebar__image"
      />
    </a>
  </aside>
</section>
{{>change-password-dialog}} {{>change-user-data-dialog}} {{>load-file-dialog}}
`;class ie extends g{constructor(){super(re,[new te,new ae,new le],{},{onChangeDataDialogOpened:()=>{document.querySelector(".overlay-change-data").classList.add("overlay_opened")},onChangePasswordDialogOpened:()=>{document.querySelector(".overlay-change-password").classList.add("overlay_opened")}})}}const ce=[{path:"/chats",component:z},{path:"/404",component:Y},{path:"/500",component:M},{path:"/login",component:K},{path:"/register",component:ee},{path:"/profile",component:ie}];let b=null;for(const{path:o,component:s}of ce)o===document.location.pathname&&(b&&b.eventBus.emit(g.EVENTS.DESTROY),b=new s,document.querySelector("#root").innerHTML=b.content,b.eventBus.emit(g.EVENTS.FLOW_CDM));
