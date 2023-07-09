import { Page500 } from './pages/500/500';
import { Chats } from './pages/chats/chats';
import { Block } from './core/block';
import { Page404 } from './pages/404/404';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';

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

let currentComponent = null;

for (const { path, component } of routes) {
  if (path === document.location.pathname) {
    if (currentComponent) {
      currentComponent.eventBus.emit(Block.EVENTS.DESTROY);
    }

    currentComponent = new component();
    document.querySelector('#root')!.innerHTML = currentComponent.content;
    currentComponent.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }
}
