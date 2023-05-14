
    export default `<section class="profile">
  <img src="./no-avatar.dc86bcea.svg" class="profile__image" alt="ваш аватар" />
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
        <button class="profile__button">Изменить данные</button>
      </td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">
        <button class="profile__button">Изменить пароль</button>
      </td>
    </tr>
    <tr class="profile__table-row">
      <td class="profile__table-cell">
        <button class="profile__button profile__button_warn">Выйти</button>
      </td>
    </tr>
  </table>
</section>
<aside class="sidebar">
  <a href="/chats">
    <img src="./exit.19cdc486.svg" alt="Вернуться к чатам" class="sidebar__image"/>
  </a>
</aside>
<div class="overlay">
  <section class="auth dialog change-password">
    <h2 class="auth__title">Изменение пароля</h2>
    <form class="auth__form">
      <label class="auth__label">
        <span class="auth__label-text">Старый пароль</span>
        <input class="auth__input" placeholder="Старый пароль" type="password" name="oldPassword">
      </label>
      <label class="auth__label">
        <span class="auth__label-text">Новый пароль</span>
        <input class="auth__input" placeholder="Новый пароль" type="password" name="newPassword">
      </label>
      <label class="auth__label">
        <span class="auth__label-text">Новый пароль (ещё раз)</span>
        <input class="auth__input" placeholder="Новый пароль (ещё раз)" type="password">
      </label>
      <div class="auth__actions">
        <button class="auth__submit">Сохранить</button>
      </div>
    </form>
  </section>
</div>

`
  