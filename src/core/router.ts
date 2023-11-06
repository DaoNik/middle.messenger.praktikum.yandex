import { Block } from './block.ts';
import { IRoute } from '../index.ts';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  private readonly _blockClass: any;

  private _block: null | Block;
  private _query: string;
  private _pathname: string;

  canActivate: (() => boolean) | null;

  constructor(
    pathname: string,
    view: any,
    query: string,
    canActivate?: () => boolean
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
    return isEqual(pathname, this._pathname);
  }

  render() {
    const root = document.querySelector(this._query)!;

    if (!this._block) {
      this._block = new this._blockClass() as Block;
      root.innerHTML = this._block.content;
      this._block.eventBus.emit(Block.EVENTS.FLOW_CDM);
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

  start() {
    window.onpopstate = ({ currentTarget }) => {
      if (currentTarget instanceof Window) {
        this._onRoute(currentTarget.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
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

  refresh(): void {
    window.location.reload();
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route || this._currentRoute?.match(route['_pathname'])) {
      return;
    }

    if (route.canActivate && !route.canActivate()) {
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
