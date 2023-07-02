var E=Object.defineProperty;var x=(t,e,s)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>(x(t,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const S=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class D{constructor(){r(this,"_listeners",{})}on(e,s){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(s)}off(e,s){if(!this._listeners[e])throw new Error("Нет такого события");this._listeners[e]=this._listeners[e].filter(l=>l!==s)}emit(e,...s){if(!this._listeners[e])throw new Error("Нет такого события");for(const l of this._listeners[e])l(...s)}}let f;const M=new Uint8Array(16);function V(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(M)}const d=[];for(let t=0;t<256;++t)d.push((t+256).toString(16).slice(1));function C(t,e=0){return(d[t[e+0]]+d[t[e+1]]+d[t[e+2]]+d[t[e+3]]+"-"+d[t[e+4]]+d[t[e+5]]+"-"+d[t[e+6]]+d[t[e+7]]+"-"+d[t[e+8]]+d[t[e+9]]+"-"+d[t[e+10]]+d[t[e+11]]+d[t[e+12]]+d[t[e+13]]+d[t[e+14]]+d[t[e+15]]).toLowerCase()}const I=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:I};function N(t,e,s){if(w.randomUUID&&!e&&!t)return w.randomUUID();t=t||{};const l=t.random||(t.rng||V)();if(l[6]=l[6]&15|64,l[8]=l[8]&63|128,e){s=s||0;for(let n=0;n<16;++n)e[s+n]=l[n];return e}return C(l)}class U{constructor(){r(this,"elementsContentMap",new Map)}precompile(e,s,l){const n=e.match(/{{>[\w-]*}}/gm);let a=e;const o=new Map;if(a=a.replace(/{{blockId}}/gm,l),!n||n.length===0||s.length===0)return a;for(const _ of s)o.set(_.selector,_.content);return n.map(_=>_.slice(3,_.length-2)).forEach(_=>{const h=new RegExp(`{{>${_}}}`,"gm");o.has(_)&&(a=a.replace(h,o.get(_)))}),a}compile(e,s){const l=document.getElementById(s);l&&(l.childNodes.length>0?this._replaceTextContentChildNode(l.childNodes,e):this._replaceTextContent(l,e))}_replaceTextContentChildNode(e,s){if(e.length>0)for(const l of e)Array.from(l.childNodes).length>0?this._replaceTextContentChildNode(l.childNodes,s):this._replaceTextContent(l,s)}_replaceTextContent(e,s){const l=e.textContent;for(const n in s)if(this.elementsContentMap.has(n)){const a=this.elementsContentMap.get(n);for(const o of a){const _=s[n];typeof _=="string"&&(o.textContent=_)}}if(l){const n=l.match(/{{[\w-.()']*}}/gm);if(!n||n.length===0||s.length===0)return;n.map(a=>a.slice(2,a.length-2)).forEach(a=>{const o=new RegExp(`{{${a}}}`,"gm"),_=s[a];if(typeof _=="string"){const h=this.elementsContentMap.get(a)??new Set;h.add(e),this.elementsContentMap.set(a,h),e.textContent=l.replace(o,_)}})}}}const u=class{constructor(e,s=[],l={}){r(this,"eventBus",new D);r(this,"props");r(this,"blockId",N());r(this,"content");r(this,"templater",new U);r(this,"declarations");this.content=e,this.declarations=s,this.props=this._makePropsProxy(l),this._registerEvents(),this.eventBus.emit(u.EVENTS.INIT)}_registerEvents(){this.eventBus.on(u.EVENTS.INIT,this._init.bind(this)),this.eventBus.on(u.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),this.eventBus.on(u.EVENTS.FLOW_RENDER,this._render.bind(this)),this.eventBus.on(u.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this))}_init(){this.init(),this.eventBus.emit(u.EVENTS.FLOW_RENDER)}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const e of this.declarations)e.eventBus.emit(u.EVENTS.FLOW_CDM);this.templater.compile(this.props,this.blockId)}_render(){this.render()}render(){this.content&&this.templater.compile(this.props,this.blockId)}_componentDidUpdate(e,s){this.componentDidUpdate(e,s)&&this.eventBus.emit(u.EVENTS.FLOW_RENDER)}componentDidUpdate(e,s){return JSON.stringify(e)!==JSON.stringify(s)}_makePropsProxy(e){const s=this.eventBus;return new Proxy(e,{get(l,n){const a=l[n];return typeof a=="function"?a.bind(l):a},set(l,n,a){console.log("set proxy trigger");const o={...l};return l[n]=a,s.emit(u.EVENTS.FLOW_CDU,o,l),!0}})}};let p=u;r(p,"EVENTS",{INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_CDU:"flow:component-did-update"});class k extends p{constructor(){super(S)}}function i(t){return t.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function c(t,e){return t.length>e?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${e}`}}function v(t){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(t)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function b(t){return/\d{7,15}/.test(t)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function L(t){let e=!0;for(const s of t.controls.values())s.valid||(e=!1);return e}function P(t){const{value:e,minLength:s,validators:l}=t,n={isValid:!0,error:""};if(l.includes(i)){const{isValid:a,error:o}=i(e);n.isValid=n.isValid&&a,n.error=o}if(l.includes(c)){const{isValid:a,error:o}=c(e,s??0);n.isValid=n.isValid&&a,n.error=o}if(l.includes(v)){const{isValid:a,error:o}=v(e);n.isValid=n.isValid&&a,n.error=o}if(l.includes(b)){const{isValid:a,error:o}=b(e);n.isValid=n.isValid&&a,n.error=o}return n}class g{constructor(e,s){r(this,"form");r(this,"props");this.form=e,this.props=s}init(e,s){const l=document.querySelector(`form[name=${e}]`);if(!l)return;l.addEventListener("submit",a=>{if(a.preventDefault(),L(this.form)){const o={};for(const[_,h]of this.form.controls)o[_]=h.value;s(o)}});const n=l.querySelector("button");n.disabled=!this.form.valid;for(const a of Array.from(l.querySelectorAll("input")))a.addEventListener("input",()=>{this.form.controls.has(a.name)&&(this.form.controls.get(a.name).value=a.value)}),a.addEventListener("blur",()=>{const o=this.form.controls.get(a.name),{isValid:_,error:h}=P(o);o.valid=_,o.error=h,this.props[`${a.name}_error`]!==o.error&&(this.props[`${a.name}_error`]=o.error),this.form.valid=L(this.form),n.disabled=!this.form.valid})}}class m extends p{}const T=`<div class="overlay overlay-add-user" id="{{blockId}}">
  <section class="dialog">
    <h3 class="dialog__title">Добавить пользователя</h3>
    <form name="add-user">
      <label class="dialog__label">
        <input
          class="dialog__input"
          placeholder="Логин"
          type="text"
          name="login"
        />
        <span class="auth__input-error">{{login_error}}</span>
      </label>
      <button class="dialog__submit" type="submit">Добавить</button>
    </form>
  </section>
</div>
`;class q extends m{constructor(){super(T,[],{login_error:""});r(this,"form");r(this,"selector","add-user-dialog")}componentDidMount(){this.form=new g({controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("add-user",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const $=`<div class="overlay overlay-remove-user" id="{{blockId}}">
  <section class="dialog">
    <h3 class="dialog__title">Удалить пользователя</h3>
    <form name="remove-user">
      <label class="dialog__label">
        <input
          class="dialog__input"
          placeholder="Логин"
          type="text"
          name="login"
        />
        <span class="auth__input-error">{{login_error}}</span>
      </label>
      <button class="dialog__submit" type="submit">Удалить</button>
    </form>
  </section>
</div>
`;class A extends m{constructor(){super($,[],{login_error:""});r(this,"form");r(this,"selector","remove-user-dialog")}componentDidMount(){this.form=new g({controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("remove-user",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const O=`<section class="menu clip-menu" id="{{blockId}}">
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
`;class F extends m{constructor(){super(O);r(this,"selector","clip-menu")}}const R=`<section class="menu chat-menu" id="{{blockId}}">
  <button class="menu__button menu__button_add" type="button">
    <img src="/assets/plus.svg" alt="добавить" class="menu__icon" />
    Добавить пользователя
  </button>
  <button class="menu__button menu__button_remove" type="button">
    <img src="/assets/close.svg" alt="удалить" class="menu__icon" />
    Удалить пользователя
  </button>
</section>
`;class B extends m{constructor(){super(R);r(this,"selector","chat-menu")}}const W=`<div class="wrapper" id="{{blockId}}">
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
      <button class="chat__menu" type="button">
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
    <form class="chat__add-text" name="send-message">
      <buttton class="chat__button-attach" type="button">
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
      />
      <button class="chat__button-send" type="submit">
        <img src="/assets/exit.svg" alt="отправить" class="chat__image-send" />
      </button>
    </form>
  </section>
</div>
{{>chat-menu}} {{>clip-menu}} {{>add-user-dialog}} {{>remove-user-dialog}}
`;class z extends p{constructor(){super(W,[new B,new F,new q,new A]);r(this,"form")}componentDidMount(){document.querySelector("button.chat__menu").addEventListener("click",()=>{var s;(s=document.querySelector(".chat-menu"))==null||s.classList.toggle("opened")}),document.querySelector(".chat__button-attach").addEventListener("click",()=>{var s;(s=document.querySelector(".clip-menu"))==null||s.classList.toggle("opened")}),document.querySelector(".chat-menu .menu__button_add").addEventListener("click",()=>{document.querySelector(".overlay-add-user").classList.add("overlay_opened")}),document.querySelector(".chat-menu .menu__button_remove").addEventListener("click",()=>{document.querySelector(".overlay-remove-user").classList.add("overlay_opened")});for(const s of Array.from(document.querySelectorAll(".overlay")))s.addEventListener("click",()=>{s.classList.remove("overlay_opened")});for(const s of Array.from(document.querySelectorAll(".overlay section")))s.addEventListener("click",l=>{l.stopPropagation()});this.form=new g({controls:new Map([["message",{value:"",validators:[i],valid:!1,error:""}]]),valid:!1},this.props),this.form.init("send-message",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const Z=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class H extends p{constructor(){super(Z)}}const J=`<section class="auth login" id="{{blockId}}">
  <h2 class="auth__title">Вход</h2>
  <form class="auth__form" name="login">
    <label class="auth__label">
      <input class="auth__input" placeholder="Логин" type="text" name="login" />
      <span class="auth__input-error">{{login_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Пароль"
        type="password"
        name="password"
      />
      <span class="auth__input-error">{{password_error}}</span>
    </label>
    <div class="auth__actions">
      <button class="auth__submit" type="submit">Авторизоваться</button>
      <a class="auth__link" href="/register">Нет аккаунта?</a>
    </div>
  </form>
</section>
`;class j extends m{constructor(){super(J,[],{login_error:"",password_error:""});r(this,"form");r(this,"selector","login-form")}componentDidMount(){this.form=new g({controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["password",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("login",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const K=`<section id="{{blockId}}">{{>login-form}}</section>
`;class G extends p{constructor(){super(K,[new j])}}const Q=`<section class="auth register" id="{{blockId}}">
  <h2 class="auth__title">Регистрация</h2>
  <form class="auth__form" name="register" novalidate>
    <label class="auth__label">
      <input class="auth__input" placeholder="Почта" type="text" name="email" />
      <span class="auth__input-error">{{email_error}}</span>
    </label>
    <label class="auth__label">
      <input class="auth__input" placeholder="Логин" type="text" name="login" />
      <span class="auth__input-error">{{login_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Имя"
        type="text"
        name="first_name"
      />
      <span class="auth__input-error">{{first_name_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Фамилия"
        type="text"
        name="second_name"
      />
      <span class="auth__input-error">{{second_name_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Телефон"
        type="text"
        name="phone"
      />
      <span class="auth__input-error">{{phone_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Пароль"
        type="password"
        name="password"
      />
      <span class="auth__input-error">{{password_error}}</span>
    </label>
    <label class="auth__label">
      <input
        class="auth__input"
        placeholder="Пароль (ещё раз)"
        type="password"
        name="password_repeat"
      />
      <span class="auth__input-error">{{password_repeat_error}}</span>
    </label>
    <div class="auth__actions">
      <button class="auth__submit" type="submit">Зарегистрироваться</button>
      <a class="auth__link" href="/login">Войти</a>
    </div>
  </form>
</section>
`;class X extends m{constructor(){super(Q,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""});r(this,"form");r(this,"selector","register-form")}componentDidMount(){this.form=new g({controls:new Map([["email",{value:"",validators:[i,c,v],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[i,c,b],minLength:8,valid:!1,error:""}],["password",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("register",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const Y=`<section id="{{blockId}}">{{>register-form}}</section>
`;class ee extends p{constructor(){super(Y,[new X])}}const se=`<div class="overlay overlay-change-data" id="{{blockId}}">
  <section class="auth dialog change-data">
    <h2 class="auth__title">Изменение данных</h2>
    <form class="auth__form" name="change-data">
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Почта"
          type="text"
          name="email"
        />
        <span class="auth__input-error">{{email_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Логин"
          type="text"
          name="login"
        />
        <span class="auth__input-error">{{login_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Имя"
          type="text"
          name="first_name"
        />
        <span class="auth__input-error">{{first_name_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Фамилия"
          type="text"
          name="second_name"
        />
        <span class="auth__input-error">{{second_name_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Телефон"
          type="text"
          name="phone"
        />
        <span class="auth__input-error">{{phone_error}}</span>
      </label>
      <div class="auth__actions">
        <button class="auth__submit" type="submit">Сохранить</button>
      </div>
    </form>
  </section>
</div>
`;class te extends m{constructor(){super(se,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:""});r(this,"form");r(this,"selector","change-user-data-dialog")}componentDidMount(){this.form=new g({controls:new Map([["email",{value:"",validators:[i,c,v],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[i,c,b],minLength:8,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("change-data",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const ne=`<div class="overlay overlay-change-password" id="{{blockId}}">
  <section class="auth dialog change-password">
    <h2 class="auth__title">Изменение пароля</h2>
    <form class="auth__form" name="change-password">
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Старый пароль"
          type="password"
          name="oldPassword"
        />
        <span class="auth__input-error">{{oldPassword_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Новый пароль"
          type="password"
          name="newPassword"
        />
        <span class="auth__input-error">{{newPassword_error}}</span>
      </label>
      <label class="auth__label">
        <input
          class="auth__input"
          placeholder="Новый пароль (ещё раз)"
          type="password"
          name="password_repeat"
        />
        <span class="auth__input-error">{{password_repeat_error}}</span>
      </label>
      <div class="auth__actions">
        <button class="auth__submit" type="submit">Сохранить</button>
      </div>
    </form>
  </section>
</div>
`;class ae extends m{constructor(){super(ne,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""});r(this,"form");r(this,"selector","change-password-dialog")}componentDidMount(){this.form=new g({controls:new Map([["oldPassword",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["newPassword",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("change-password",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const le=`<div class="overlay overlay-load-file" id="{{blockId}}">
  <section class="dialog">
    <h3 class="dialog__title">Загрузите файл</h3>
    <label class="dialog__load-label">
      <input class="dialog__load-input" type="file" name="avatar" />
      <span class="dialog__load-text">Выбрать файл на компьютере</span>
    </label>
    <button class="dialog__submit" type="submit">Поменять</button>
  </section>
</div>
`;class oe extends m{constructor(){super(le);r(this,"selector","load-file-dialog")}}const re=`<section class="profile" id="{{blockId}}">
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
        <button class="profile__button profile__button_data" type="button">
          Изменить данные
        </button>
      </td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">
        <button class="profile__button profile__button_pass" type="button">
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
`;class ie extends p{constructor(){super(re,[new te,new ae,new oe])}componentDidMount(){document.querySelector(".profile__button_data").addEventListener("click",()=>{document.querySelector(".overlay-change-data").classList.add("overlay_opened")}),document.querySelector(".profile__button_pass").addEventListener("click",()=>{document.querySelector(".overlay-change-password").classList.add("overlay_opened")});for(const e of Array.from(document.querySelectorAll(".overlay")))e.addEventListener("click",()=>{e.classList.remove("overlay_opened")});for(const e of Array.from(document.querySelectorAll(".overlay section")))e.addEventListener("click",s=>{s.stopPropagation()});super.componentDidMount()}}const ce=[{path:"/chats",component:z},{path:"/404",component:H},{path:"/500",component:k},{path:"/login",component:G},{path:"/register",component:ee},{path:"/profile",component:ie}];let y=null;for(const{path:t,component:e}of ce)t===document.location.pathname&&(y=new e,document.querySelector("#root").innerHTML=y.content,y.eventBus.emit(p.EVENTS.FLOW_CDM));
