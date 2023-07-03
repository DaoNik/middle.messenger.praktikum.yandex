var L=Object.defineProperty;var x=(t,e,s)=>e in t?L(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>(x(t,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();const E=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">500</h2>
  <p class="server-error__subtitle">Мы уже фиксим</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class S{constructor(){r(this,"_listeners",{})}on(e,s){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(s)}off(e,s){if(!this._listeners[e])throw new Error("Нет такого события");this._listeners[e]=this._listeners[e].filter(a=>a!==s)}emit(e,...s){if(!this._listeners[e])throw new Error("Нет такого события");for(const a of this._listeners[e])a(...s)}}let f;const D=new Uint8Array(16);function M(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(D)}const _=[];for(let t=0;t<256;++t)_.push((t+256).toString(16).slice(1));function V(t,e=0){return(_[t[e+0]]+_[t[e+1]]+_[t[e+2]]+_[t[e+3]]+"-"+_[t[e+4]]+_[t[e+5]]+"-"+_[t[e+6]]+_[t[e+7]]+"-"+_[t[e+8]]+_[t[e+9]]+"-"+_[t[e+10]]+_[t[e+11]]+_[t[e+12]]+_[t[e+13]]+_[t[e+14]]+_[t[e+15]]).toLowerCase()}const k=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:k};function C(t,e,s){if(y.randomUUID&&!e&&!t)return y.randomUUID();t=t||{};const a=t.random||(t.rng||M)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,e){s=s||0;for(let n=0;n<16;++n)e[s+n]=a[n];return e}return V(a)}class I{constructor(){r(this,"elementsContentMap",new Map)}precompile(e,s,a){const n=e.match(/{{>[\w-]*}}/gm);let l=e;const o=new Map;if(l=l.replaceAll(/{{blockId}}/gm,a),!n||n.length===0||s.length===0)return l;for(const d of s)o.set(d.selector,d.content);for(const d of n.map(m=>m.slice(3,-2))){const m=new RegExp(`{{>${d}}}`,"gm");o.has(d)&&(l=l.replace(m,o.get(d)))}return l}compile(e,s){const a=document.getElementById(s);a&&(a.childNodes.length>0?this._replaceTextContentChildNode(a.childNodes,e):this._replaceTextContent(a,e))}_replaceTextContentChildNode(e,s){if(e.length>0)for(const a of e)[...a.childNodes].length>0?this._replaceTextContentChildNode(a.childNodes,s):this._replaceTextContent(a,s)}_replaceTextContent(e,s){const a=e.textContent;for(const n in s)if(this.elementsContentMap.has(n)){const l=this.elementsContentMap.get(n);for(const o of l){const d=s[n];typeof d=="string"&&(o.textContent=d)}}if(a){const n=a.match(/{{[\w-.'()]*}}/gm);if(!n||n.length===0||s.length===0)return;for(const l of n.map(o=>o.slice(2,-2))){const o=new RegExp(`{{${l}}}`,"gm"),d=s[l];if(typeof d=="string"){const m=this.elementsContentMap.get(l)??new Set;m.add(e),this.elementsContentMap.set(l,m),e.textContent=a.replace(o,d)}}}}}const u=class{constructor(e,s=[],a={}){r(this,"eventBus",new S);r(this,"props");r(this,"blockId",C());r(this,"content");r(this,"templater",new I);r(this,"declarations");this.content=e,this.declarations=s,this.props=this._makePropsProxy(a),this._registerEvents(),this.eventBus.emit(u.EVENTS.INIT)}_registerEvents(){this.eventBus.on(u.EVENTS.INIT,this._init.bind(this)),this.eventBus.on(u.EVENTS.FLOW_CDM,this._componentDidMount.bind(this)),this.eventBus.on(u.EVENTS.FLOW_RENDER,this._render.bind(this)),this.eventBus.on(u.EVENTS.FLOW_CDU,this._componentDidUpdate.bind(this))}_init(){this.init(),this.eventBus.emit(u.EVENTS.FLOW_RENDER)}init(){this.content=this.templater.precompile(this.content,this.declarations,this.blockId)}_componentDidMount(){this.componentDidMount()}componentDidMount(){if(this.declarations.length>0)for(const e of this.declarations)e.eventBus.emit(u.EVENTS.FLOW_CDM);this.templater.compile(this.props,this.blockId)}_render(){this.render()}render(){this.content&&this.templater.compile(this.props,this.blockId)}_componentDidUpdate(e,s){this.componentDidUpdate(e,s)&&this.eventBus.emit(u.EVENTS.FLOW_RENDER)}componentDidUpdate(e,s){return JSON.stringify(e)!==JSON.stringify(s)}_makePropsProxy(e){const s=this.eventBus;return new Proxy(e,{get(a,n){const l=a[n];return typeof l=="function"?l.bind(a):l},set(a,n,l){console.log("set proxy trigger");const o={...a};return a[n]=l,s.emit(u.EVENTS.FLOW_CDU,o,a),!0}})}};let p=u;r(p,"EVENTS",{INIT:"init",FLOW_CDM:"flow:component-did-mount",FLOW_RENDER:"flow:render",FLOW_CDU:"flow:component-did-update"});class N extends p{constructor(){super(E)}}function i(t){return t.length>0?{isValid:!0,error:""}:{isValid:!1,error:"строка не должна быть пустой"}}function c(t,e){return t.length>e?{isValid:!0,error:""}:{isValid:!1,error:`строка должна быть не менее ${e}`}}function v(t){return/^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/.test(t)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть почтой"}}function b(t){return/\d{7,15}/.test(t)?{isValid:!0,error:""}:{isValid:!1,error:"строка должна быть номером телефона"}}function w(t){let e=!0;for(const s of t.controls.values())s.valid||(e=!1);return e}function U(t){const{value:e,minLength:s,validators:a}=t,n={isValid:!0,error:""};if(a.includes(i)){const{isValid:l,error:o}=i(e);n.isValid=n.isValid&&l,n.error=o}if(a.includes(c)){const{isValid:l,error:o}=c(e,s??0);n.isValid=n.isValid&&l,n.error=o}if(a.includes(v)){const{isValid:l,error:o}=v(e);n.isValid=n.isValid&&l,n.error=o}if(a.includes(b)){const{isValid:l,error:o}=b(e);n.isValid=n.isValid&&l,n.error=o}return n}class g{constructor(e,s){r(this,"form");r(this,"props");this.form=e,this.props=s}init(e,s){const a=document.querySelector(`form[name=${e}]`);if(!a)return;a.addEventListener("submit",l=>{if(l.preventDefault(),w(this.form)){const o={};for(const[d,m]of this.form.controls)o[d]=m.value;s(o)}});const n=a.querySelector("button");n.disabled=!this.form.valid;for(const l of Array.from(a.querySelectorAll("input")))l.addEventListener("input",()=>{this.form.controls.has(l.name)&&(this.form.controls.get(l.name).value=l.value)}),l.addEventListener("blur",()=>{const o=this.form.controls.get(l.name),{isValid:d,error:m}=U(o);o.valid=d,o.error=m,this.props[`${l.name}_error`]!==o.error&&(this.props[`${l.name}_error`]=o.error),this.form.valid=w(this.form),n.disabled=!this.form.valid})}}class h extends p{}const P=`<div class="overlay overlay-add-user" id="{{blockId}}">
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
`;class T extends h{constructor(){super(P,[],{login_error:""});r(this,"form");r(this,"selector","add-user-dialog")}componentDidMount(){this.form=new g({controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("add-user",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const q=`<div class="overlay overlay-remove-user" id="{{blockId}}">
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
`;class $ extends h{constructor(){super(q,[],{login_error:""});r(this,"form");r(this,"selector","remove-user-dialog")}componentDidMount(){this.form=new g({controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("remove-user",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const A=`<section class="menu clip-menu" id="{{blockId}}">
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
`;class O extends h{constructor(){super(A);r(this,"selector","clip-menu")}}const F=`<section class="menu chat-menu" id="{{blockId}}">
  <button class="menu__button menu__button_add" type="button">
    <img src="/assets/plus.svg" alt="добавить" class="menu__icon" />
    Добавить пользователя
  </button>
  <button class="menu__button menu__button_remove" type="button">
    <img src="/assets/close.svg" alt="удалить" class="menu__icon" />
    Удалить пользователя
  </button>
</section>
`;class R extends h{constructor(){super(F);r(this,"selector","chat-menu")}}const B=`<div class="wrapper" id="{{blockId}}">
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
`;class W extends p{constructor(){super(B,[new R,new O,new T,new $]);r(this,"form")}componentDidMount(){document.querySelector("button.chat__menu").addEventListener("click",()=>{var s;(s=document.querySelector(".chat-menu"))==null||s.classList.toggle("opened")}),document.querySelector(".chat__button-attach").addEventListener("click",()=>{var s;(s=document.querySelector(".clip-menu"))==null||s.classList.toggle("opened")}),document.querySelector(".chat-menu .menu__button_add").addEventListener("click",()=>{document.querySelector(".overlay-add-user").classList.add("overlay_opened")}),document.querySelector(".chat-menu .menu__button_remove").addEventListener("click",()=>{document.querySelector(".overlay-remove-user").classList.add("overlay_opened")});for(const s of Array.from(document.querySelectorAll(".overlay")))s.addEventListener("click",()=>{s.classList.remove("overlay_opened")});for(const s of Array.from(document.querySelectorAll(".overlay section")))s.addEventListener("click",a=>{a.stopPropagation()});this.form=new g({controls:new Map([["message",{value:"",validators:[i],valid:!1,error:""}]]),valid:!1},this.props),this.form.init("send-message",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const z=`<div class="server-error" id="{{blockId}}">
  <h2 class="server-error__title">404</h2>
  <p class="server-error__subtitle">Не туда попали</p>
  <a href="/chats" class="server-error__link">Назад к чатам</a>
</div>
`;class Z extends p{constructor(){super(z)}}const H=`<section class="auth login" id="{{blockId}}">
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
`;class J extends h{constructor(){super(H,[],{login_error:"",password_error:""});r(this,"form");r(this,"selector","login-form")}componentDidMount(){this.form=new g({controls:new Map([["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["password",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("login",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const j=`<section id="{{blockId}}">{{>login-form}}</section>
`;class K extends p{constructor(){super(j,[new J])}}const G=`<section class="auth register" id="{{blockId}}">
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
`;class Q extends h{constructor(){super(G,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:"",password_error:"",password_repeat_error:""});r(this,"form");r(this,"selector","register-form")}componentDidMount(){this.form=new g({controls:new Map([["email",{value:"",validators:[i,c,v],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[i,c,b],minLength:8,valid:!1,error:""}],["password",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("register",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const X=`<section id="{{blockId}}">{{>register-form}}</section>
`;class Y extends p{constructor(){super(X,[new Q])}}const ee=`<div class="overlay overlay-change-data" id="{{blockId}}">
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
`;class se extends h{constructor(){super(ee,[],{email_error:"",login_error:"",first_name_error:"",second_name_error:"",phone_error:""});r(this,"form");r(this,"selector","change-user-data-dialog")}componentDidMount(){this.form=new g({controls:new Map([["email",{value:"",validators:[i,c,v],minLength:4,valid:!1,error:""}],["login",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["first_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["second_name",{value:"",validators:[i,c],minLength:4,valid:!1,error:""}],["phone",{value:"",validators:[i,c,b],minLength:8,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("change-data",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const te=`<div class="overlay overlay-change-password" id="{{blockId}}">
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
`;class ne extends h{constructor(){super(te,[],{oldPassword_error:"",newPassword_error:"",password_repeat_error:""});r(this,"form");r(this,"selector","change-password-dialog")}componentDidMount(){this.form=new g({controls:new Map([["oldPassword",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["newPassword",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}],["password_repeat",{value:"",validators:[i,c],minLength:6,valid:!1,error:""}]]),valid:!1},this.props),this.form.init("change-password",this.formSubmit),super.componentDidMount()}formSubmit(s){console.log(s)}}const ae=`<div class="overlay overlay-load-file" id="{{blockId}}">
  <section class="dialog">
    <h3 class="dialog__title">Загрузите файл</h3>
    <label class="dialog__load-label">
      <input class="dialog__load-input" type="file" name="avatar" />
      <span class="dialog__load-text">Выбрать файл на компьютере</span>
    </label>
    <button class="dialog__submit" type="submit">Поменять</button>
  </section>
</div>
`;class le extends h{constructor(){super(ae);r(this,"selector","load-file-dialog")}}const oe=`<section class="profile" id="{{blockId}}">
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
`;class re extends p{constructor(){super(oe,[new se,new ne,new le])}componentDidMount(){document.querySelector(".profile__button_data").addEventListener("click",()=>{document.querySelector(".overlay-change-data").classList.add("overlay_opened")}),document.querySelector(".profile__button_pass").addEventListener("click",()=>{document.querySelector(".overlay-change-password").classList.add("overlay_opened")});for(const e of Array.from(document.querySelectorAll(".overlay")))e.addEventListener("click",()=>{e.classList.remove("overlay_opened")});for(const e of Array.from(document.querySelectorAll(".overlay section")))e.addEventListener("click",s=>{s.stopPropagation()});super.componentDidMount()}}const ie=[{path:"/chats",component:W},{path:"/404",component:Z},{path:"/500",component:N},{path:"/login",component:K},{path:"/register",component:Y},{path:"/profile",component:re}];for(const{path:t,component:e}of ie)if(t===document.location.pathname){const s=new e;document.querySelector("#root").innerHTML=s.content,s.eventBus.emit(p.EVENTS.FLOW_CDM)}
