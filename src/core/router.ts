import { Block } from './block.ts';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block): Element {
  const root = document.querySelector(query)!;

  root.innerHTML = block.content;

  return root;
}

class Route {
  private readonly _blockClass: any;

  private _block: null | Block;
  private _query: string;
  private _pathname: string;

  constructor(pathname: string, view: any, query: string) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._query = query;
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
    if (!this._block) {
      this._block = new this._blockClass() as Block;
      render(this._query, this._block);
      this._block.eventBus.emit(Block.EVENTS.FLOW_CDM);
      return;
    }

    this._block.show();
  }
}

export class Router {
  private readonly _rootQuery: string = '#root';
  private static __instance: any;
  private _currentRoute: null | Route = null;
  private history = window.history;
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

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this._rootQuery);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      if (event.currentTarget) {
        this._onRoute((event.currentTarget as Window).location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
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
}
