import { Block, BlockEvents } from './block.ts';
import { IRoute, MainRoutes } from '../index.ts';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  private readonly _blockClass: any;

  private _block: null | Block;
  private _query: string;
  private _pathname: string;

  canActivate: (() => Promise<boolean>) | null;

  constructor(
    pathname: string,
    view: any,
    query: string,
    canActivate?: () => Promise<boolean>
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._query = query;
    this.canActivate = canActivate ?? null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    if (
      pathname.includes(MainRoutes.MESSENGER) &&
      this._pathname === MainRoutes.MESSENGER
    ) {
      return true;
    }

    return isEqual(pathname, this._pathname);
  }

  render() {
    const root = document.querySelector(this._query)!;

    if (!this._block) {
      this._block = new this._blockClass() as Block;
      root.innerHTML = this._block.content;
      this._block.eventBus.emit(BlockEvents.FLOW_CDM);
      return;
    }

    this._block.show();
    root.insertAdjacentElement('afterbegin', this._block.element!);
  }
}

export class Router {
  static __instance: Router;

  private readonly _rootQuery: string = '#root';
  private readonly history = window.history;
  private _currentRoute: null | Route = null;
  private routes: Route[] = [];

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use({ path, component, canActivate }: IRoute) {
    const route = new Route(path, component, this._rootQuery, canActivate);

    this.routes.push(route);

    return this;
  }

  async start() {
    window.addEventListener('popstate', ({ currentTarget }) => {
      if (currentTarget instanceof Window) {
        this._onRoute(currentTarget.location.pathname);
      }
    });

    await this._onRoute(window.location.pathname);
  }

  async go(pathname: string) {
    this.history.pushState({}, '', pathname);

    await this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private async _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route || this._currentRoute?.match(route['_pathname'])) {
      return;
    }

    const hasAccess = route.canActivate ? await route.canActivate() : true;

    if (!hasAccess) {
      console.error(`you do not have access to ${pathname} page`);
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }
}
