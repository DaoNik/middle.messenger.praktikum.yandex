import { Route } from './route.ts';

export interface IRoute {
  path: string;
  component: any;
  canActivate?: () => Promise<boolean>;
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

    this.history.pushState({}, '', pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }
}
