import { Page500, Chats, Page404, Login, Register, Profile } from './pages';
import { Router, RouterLink } from './core';
import { AuthApiService } from './api';

export interface IRoute {
  path: string;
  component: any;
}

const routes: IRoute[] = [
  { path: '/chats', component: Chats },
  { path: '/404', component: Page404 },
  { path: '/500', component: Page500 },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
];

if (document.location.pathname === '/') {
  document.location.pathname = '/chats';
}

const router = new Router('#root');

for (const { path, component } of routes) {
  router.use(path, component);
}

router.start();

const authService = new AuthApiService();

authService.user().then((data) => {
  if (
    data &&
    (document.location.pathname === '/login' ||
      document.location.pathname === '/register')
  ) {
    router.go('/chats');
  }
});

customElements.define('router-link', RouterLink);
