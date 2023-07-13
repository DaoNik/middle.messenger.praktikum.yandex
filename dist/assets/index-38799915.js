var x=Object.defineProperty;var I=(s,e,n)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[e]=n;var r=(s,e,n)=>(I(s,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(t){if(t.ep)return;t.ep=!0;const l=n(t);fetch(t.href,l)}})();const C=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class L{constructor(){r(this,"_listeners",{})}on(e,n){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(n)}off(e,n){if(!this._listeners[e])throw new Error("Нет такого события");this._listeners[e]=this._listeners[e].filter(a=>a!==n)}emit(e,...n){if(!this._listeners[e])throw new Error("Нет такого события");for(const a of this._listeners[e])a(...n)}}let y;const V=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(V)}const p=[];for(let s=0;s<256;++s)p.push((s+256).toString(16).slice(1));function B(s,e=0){return(p[s[e+0]]+p[s[e+1]]+p[s[e+2]]+p[s[e+3]]+"-"+p[s[e+4]]+p[s[e+5]]+"-"+p[s[e+6]]+p[s[e+7]]+"-"+p[s[e+8]]+p[s[e+9]]+"-"+p[s[e+10]]+p[s[e+11]]+p[s[e+12]]+p[s[e+13]]+p[s[e+14]]+p[s[e+15]]).toLowerCase()}const k=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),E={randomUUID:k};function N(s,e,n){if(E.randomUUID&&!e&&!s)return E.randomUUID();s=s||{};const a=s.random||(s.rng||S)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,e){n=n||0;for(let t=0;t<16;++t)e[n+t]=a[t];return e}return B(a)}class U{constructor(){r(this,"elementsContentMap",new Map)}precompile(e,n,a){const t=e.match(/{{>[\w-]*}}/gm);let l=e;const o=new Map;if(l=l.replaceAll(/{{blockId}}/gm,a),!t||t.length===0||n.length===0)return l;for(const u of n)o.set(u.selector,u.content);for(const u of t.map(h=>h.slice(3,-2))){const h=new RegExp(`{{>${u}}}`,"gm");o.has(u)&&(l=l.replace(h,o.get(u)))}return l}compile(e,n){n.children.length>0?this._replaceTextContentChildNode(n.children,e):this._replaceTextContent(n,e)}addEvents(e,n){this._addOrRemoveEvents(e,n,!1),e.children.length>0&&this._registerEvents(e.children,n,!1)}removeEvents(e,n){this._addOrRemoveEvents(e,n,!0),e.children.length>0&&this._registerEvents(e.children,n,!0)}_registerEvents(e,n,a){for(const t of e)this._addOrRemoveEvents(t,n,a),t.children.length>0&&this._registerEvents(t.children,n,a)}_addOrRemoveEvents(e,n,a){const t=/^\(.*\)$/;for(const l of e.attributes)if(t.test(l.name)){const o=l.name.slice(1,-1),u=n[l.value];u&&(a?e.removeEventListener(o,u):e.addEventListener(o,u))}}_replaceTextContentChildNode(e,n){if(e.length>0)for(const a of e)a.children.length>0?this._replaceTextContentChildNode(a.children,n):this._replaceTextContent(a,n)}_replaceTextContent(e,n){const a=e.textContent;for(const t in n)if(this.elementsContentMap.has(t)){const l=this.elementsContentMap.get(t);for(const o of l){const u=n[t];typeof u=="string"&&(o.textContent=u)}}if(a){const t=a.match(/{{[\w-.'()]*}}/gm);if(!t||t.length===0||n.length===0)return;for(const l of t.map(o=>o.slice(2,-2))){const o=new RegExp(`{{${l}}}`,"gm"),u=n[l];if(typeof u=="string"){const h=this.elementsContentMap.get(l)??new Set;h.add(e),this.elementsContentMap.set(l,h),e.textContent=a.replace(o,u)}}}}}const _=class{constructor(e,n=[],a={},t={}){r(this,"eventBus",new L);r(this,"props");r(this,"blockId",N());r(this,"content");r(this,"templater",new U);r(this,"declarations");r(this,"events");r(this,"element",null);this.content=e,this.declarations=n,this.events=t,this.props=this._makePropsProxy(a),this._registerEvents(),this.eventBus.emit(_.EVENTS.INIT)}_registerEvents(){this.eventBus.on(_.EVENTS.INIT,this._init.bind(this)),this.eventBus.on(_.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),this.eventBus.on(_.EVENTS.FLOW_RENDER,this._render.bind(this)),this.eventBus.on(_.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this)),this.eventBus.on(_.EVENTS.DESTROY,this._componentDidUnmount.bind(this))}_init(){this.init(),this.eventBus.emit(_.EVENTS.FLOW_RENDER)}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.element=document.getElementById(this.blockId),this.templater.addEvents(this.element,this.events),this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const e of this.declarations)e.eventBus.emit(_.EVENTS.FLOW_CDM);this.templater.compile(this.props,this.element)}_render(){this.render()}render(){this.content&&this.element&&this.templater.compile(this.props,this.element)}_componentDidUpdate(e,n){this.componentDidUpdate(e,n)&&this.eventBus.emit(_.EVENTS.FLOW_RENDER)}componentDidUpdate(e,n){return JSON.stringify(e)!==JSON.stringify(n)}_makePropsProxy(e){const n=this.eventBus;return new Proxy(e,{get(a,t){const l=a[t];return typeof l=="function"?l.bind(a):l},set(a,t,l){const o={...a};return a[t]=l,n.emit(_.EVENTS.FLOW_CDU,o,a),!0}})}_componentDidUnmount(){this.element&&this.templater.removeEvents(this.element,this.events)}};let d=_;r(d,"EVENTS",{INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_CDU:"flow:component-did-update",DESTROY:"destroy"});class M extends d{constructor(){super(C)}}function i(s){return s.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function c(s,e){return s.length>e?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${e} символов`}}function w(s){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function D(s){return/\d{7,15}/.test(s)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function g(s){let e=!0;for(const n of s.controls.values())n.valid||(e=!1);return e}function O(s){const{value:e,minLength:n,validators:a}=s,t={isValid:!0,error:""};if(a.includes(i)){const{isValid:l,error:o}=i(e);t.isValid=t.isValid&&l,t.error=o}if(a.includes(c)){const{isValid:l,error:o}=c(e,n??0);t.isValid=t.isValid&&l,t.error=o}if(a.includes(w)){const{isValid:l,error:o}=w(e);t.isValid=t.isValid&&l,t.error=o}if(a.includes(D)){const{isValid:l,error:o}=D(e);t.isValid=t.isValid&&l,t.error=o}return t}function v(s,e){const n=s.target;e.has(n.name)&&(e.get(n.name).value=n.value)}function f(s,e,n,a){const t=s.target,l=e.controls.get(t.name),{isValid:o,error:u}=O(l);l.valid=o,l.error=u,n[`${t.name}_error`]!==l.error&&(n[`${t.name}_error`]=l.error),e.valid=g(e);const h=a==null?void 0:a.querySelector('button[type="submit"]');h.disabled=!e.valid}class m extends d{}const T=`<div class="overlay overlay-add-user" id="{{blockId}}" (click)="onDialogClose">
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
`;class P extends m{constructor(){super(T,[],{login_error:""},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});r(this,"form",{controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}]]),valid:!1});r(this,"selector","add-user-dialog")}}const R=`<div
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
`;class $ extends m{constructor(){super(R,[],{login_error:""},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});r(this,"form",{controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}]]),valid:!1});r(this,"selector","remove-user-dialog")}}const F=`<section class="menu clip-menu" id="{{blockId}}">
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
`;class A extends m{constructor(){super(F,[],{},{});r(this,"selector","clip-menu")}}const W=`<section class="menu chat-menu" id="{{blockId}}">
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
`;class q extends m{constructor(){super(W,[],{},{onAddUserDialogOpened:()=>{document.querySelector(".overlay-add-user").classList.add("overlay_opened")},onRemoveUserDialogOpened:()=>{document.querySelector(".overlay-remove-user").classList.add("overlay_opened")}});r(this,"selector","chat-menu")}}const z=`<div class="wrapper" id="{{blockId}}">
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
`;class Z extends d{constructor(){super(z,[new q,new A,new P,new $],{},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)},onChatMenuToggled:()=>{var n;(n=document.querySelector(".chat-menu"))==null||n.classList.toggle("opened")},onClipMenuToggled:()=>{var n;(n=document.querySelector(".clip-menu"))==null||n.classList.toggle("opened")}});r(this,"form",{controls:new Map([["message",{value:"",validators:[i],valid:!1,error:""}]]),valid:!1})}}const H=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class Y extends d{constructor(){super(H)}}const J=`<section class="auth login" id="{{blockId}}">
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
`;class j extends m{constructor(){super(J,[],{login_error:"",password_error:""},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)}});r(this,"form",{controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["password",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1});r(this,"selector","login-form")}}const K=`<section id="{{blockId}}">{{>login-form}}</section>
`;class G extends d{constructor(){super(K,[new j])}}const Q=`<section class="auth register" id="{{blockId}}">
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
`;class X extends m{constructor(){super(Q,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)}});r(this,"form",{controls:new Map([["email",{value:"",validators:[i,c,w],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[i,c,D],minLength:8,valid:!1,error:""}],["password",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1});r(this,"selector","register-form")}}const nn=`<section id="{{blockId}}">{{>register-form}}</section>
`;class en extends d{constructor(){super(nn,[new X])}}const tn=`<div
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
`;class sn extends m{constructor(){super(tn,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",display_name_error:""},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});r(this,"form",{controls:new Map([["email",{value:"",validators:[i,c,w],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["display_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[i,c,D],minLength:8,valid:!1,error:""}]]),valid:!1});r(this,"selector","change-user-data-dialog")}}const an=`<div
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
`;class ln extends m{constructor(){super(an,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""},{onSubmit:n=>{n.preventDefault();const a=this.form;if(g(a)){const t={};for(const[l,o]of a.controls)t[l]=o.value;console.log(t)}},onInput:n=>{v(n,this.form.controls)},onBlur:n=>{f(n,this.form,this.props,this.element)},onDialogClose:()=>{var n;(n=this.element)==null||n.classList.remove("overlay_opened")},onDialogNotClose:n=>{n.stopPropagation()}});r(this,"form",{controls:new Map([["oldPassword",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["newPassword",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1});r(this,"selector","change-password-dialog")}componentDidMount(){super.componentDidMount()}}const on=`<div class="overlay overlay-load-file" id="{{blockId}}">
  <section class="dialog">
    <h3 class="dialog__title">Загрузите файл</h3>
    <label class="dialog__load-label">
      <input class="dialog__load-input" type="file" name="avatar" />
      <span class="dialog__load-text">Выбрать файл на компьютере</span>
    </label>
    <button class="dialog__submit" type="submit">Поменять</button>
  </section>
</div>
`;class rn extends m{constructor(){super(on);r(this,"selector","load-file-dialog")}}const cn=`<section class="profile" id="{{blockId}}">
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
`;class un extends d{constructor(){super(cn,[new sn,new ln,new rn],{},{onChangeDataDialogOpened:()=>{document.querySelector(".overlay-change-data").classList.add("overlay_opened")},onChangePasswordDialogOpened:()=>{document.querySelector(".overlay-change-password").classList.add("overlay_opened")}})}}const pn=[{path:"/chats",component:Z},{path:"/404",component:Y},{path:"/500",component:M},{path:"/login",component:G},{path:"/register",component:en},{path:"/profile",component:un}];let b=null;document.location.pathname==="/"&&(document.location.pathname="/login");for(const{path:s,component:e}of pn)s===document.location.pathname&&(b&&b.eventBus.emit(d.EVENTS.DESTROY),b=new e,document.querySelector("#root").innerHTML=b.content,b.eventBus.emit(d.EVENTS.FLOW_CDM));
