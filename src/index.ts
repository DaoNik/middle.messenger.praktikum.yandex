import { Page500, Chats, Page404, Login, Register, Profile } from './pages';
import { Router, RouterLink } from './core';
import { AuthApiService } from './api';

export interface IRoute {
  path: string;
  component: any;
  canActivate?: () => boolean;
}

function canActivate(): boolean {
  const user = localStorage.getItem('authUser');

  return Boolean(user);
}

enum MainRoutes {
  MESSENGER = '/messenger',
  NOT_FOUND = '/404',
  ERROR_PAGE = '/500',
  SIGN_UP = '/sign-up',
  SETTINGS = '/settings',
  LOGIN = '/',
}

const routes: IRoute[] = [
  { path: MainRoutes.MESSENGER, component: Chats, canActivate },
  { path: MainRoutes.NOT_FOUND, component: Page404 },
  { path: MainRoutes.ERROR_PAGE, component: Page500 },
  { path: MainRoutes.LOGIN, component: Login },
  { path: MainRoutes.SIGN_UP, component: Register, canActivate },
  { path: MainRoutes.SETTINGS, component: Profile, canActivate },
];

const router = new Router('#root');

window.addEventListener('DOMContentLoaded', async () => {
  for (const route of routes) {
    router.use(route);
  }

  router.start();

  const authService = new AuthApiService();

  authService.user().then((data) => {
    if (
      data &&
      (document.location.pathname === MainRoutes.LOGIN ||
        document.location.pathname === MainRoutes.SIGN_UP)
    ) {
      router.go(MainRoutes.MESSENGER);
    }
  });

  customElements.define('router-link', RouterLink);
});
