
    export default `<section class="auth register">
  <h2 class="auth__title">Регистрация</h2>
  <form class="auth__form">
    <label class="auth__label">
      <span class="auth__label-text">Почта</span>
      <input class="auth__input" placeholder="Почта" type="text" name="email">
    </label>
    <label class="auth__label">
      <span class="auth__label-text">Логин</span>
      <input class="auth__input" placeholder="Логин" type="text" name="login">
    </label>
    <label class="auth__label">
      <span class="auth__label-text">Имя</span>
      <input class="auth__input" placeholder="Имя" type="text" name="first_name">
    </label>
    <label class="auth__label">
      <span class="auth__label-text">Фамилия</span>
      <input class="auth__input" placeholder="Фамилия" type="text" name="second_name">
    </label>
    <label class="auth__label">
      <span class="auth__label-text">Телефон</span>
      <input class="auth__input" placeholder="Телефон" type="text" name="phone">
    </label>
    <label class="auth__label">
      <span class="auth__label-text">Пароль</span>
      <input class="auth__input" placeholder="Пароль" type="password" name="password">
    </label>
    <label class="auth__label">
      <span class="auth__label-text">Пароль (ещё раз)</span>
      <input class="auth__input" placeholder="Пароль (ещё раз)" type="password">
    </label>
    <div class="auth__actions">
      <button class="auth__submit">Зарегистрироваться</button>
      <a class="auth__link" href="/login">Войти</a>
    </div>
  </form>
</section>

`
  