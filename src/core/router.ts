import { Block } from './block.ts';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block): Element {
  const root = document.querySelector(query)!;

  root.innerHTML += block.content;

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
    console.log(this._blockClass, this._block);

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

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, this._rootQuery);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ({ currentTarget }) => {
      if (currentTarget instanceof Window) {
        console.log(currentTarget.location.pathname);

        this._onRoute(currentTarget.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  go(pathname: string) {
    console.log(pathname, history);
    this.history.pushState({}, '', pathname);

    console.log(history);
    this._onRoute(pathname);
  }

  back() {
    console.log(this.history);
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    // TODO: maybe add checking (|| this._currentRoute === route)
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }
}
