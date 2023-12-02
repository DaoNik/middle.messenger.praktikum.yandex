import { Block, BlockEvents } from './block.ts';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export class Route {
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
