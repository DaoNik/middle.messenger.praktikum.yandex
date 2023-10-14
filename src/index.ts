import { Page500, Chats, Page404, Login, Register, Profile } from './pages';
import { Router, RouterLink } from './core';
import { AuthApiService } from './api';

export interface IRoute {
  path: string;
  component: any;
}

const routes: IRoute[] = [
  { path: '/messenger', component: Chats },
  { path: '/404', component: Page404 },
  { path: '/500', component: Page500 },
  { path: '/', component: Login },
  { path: '/sign-up', component: Register },
  { path: '/settings', component: Profile },
];

const router = new Router('#root');

for (const { path, component } of routes) {
  router.use(path, component);
}

router.start();

const authService = new AuthApiService();

authService.user().then((data) => {
  if (
    data &&
    (document.location.pathname === '/' ||
      document.location.pathname === '/sign-up')
  ) {
    router.go('/messenger');
  }
});

customElements.define('router-link', RouterLink);
