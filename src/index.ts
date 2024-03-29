import { Page500, Chats, Page404, Login, Register, Profile } from './pages';
import { IRoute, Router, RouterLink } from './core';
import { AuthApiService, IFullUserData } from './api';
import { AUTH_USER } from './constants.ts';
import { StorageService, storeService } from './services';

async function canActivate(): Promise<boolean> {
  const storage = new StorageService();
  const user = await storage.getItem<IFullUserData>(AUTH_USER);

  return Boolean(user);
}

export enum MainRoutes {
  MESSENGER = '/messenger',
  NOT_FOUND = '/404',
  ERROR_PAGE = '/500',
  SIGN_UP = '/sign-up',
  SETTINGS = '/settings',
  LOGIN = '/',
}

window.addEventListener(
  'DOMContentLoaded',
  async () => {
    const routes: IRoute[] = [
      { path: MainRoutes.MESSENGER, component: Chats, canActivate },
      { path: MainRoutes.NOT_FOUND, component: Page404 },
      { path: MainRoutes.ERROR_PAGE, component: Page500 },
      { path: MainRoutes.LOGIN, component: Login },
      { path: MainRoutes.SIGN_UP, component: Register },
      { path: MainRoutes.SETTINGS, component: Profile, canActivate },
    ];

    const router = new Router('#root');

    for (const route of routes) {
      router.use(route);
    }

    await router.start();

    const authService = new AuthApiService();

    authService.user().then((data) => {
      if (!data) return;

      if (
        document.location.pathname === MainRoutes.LOGIN ||
        document.location.pathname === MainRoutes.SIGN_UP
      ) {
        router.go(MainRoutes.MESSENGER);
      }

      try {
        storeService.set('user', data);
      } catch (error) {
        console.error(error);
      }
    });

    if (!customElements.get('router-link')) {
      customElements.define('router-link', RouterLink);
    }
  },
  { once: true }
);
