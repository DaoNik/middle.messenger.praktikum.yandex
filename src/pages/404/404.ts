import template from './404.html?raw';
import { Module } from '../../types.ts';
import { Template } from '../../core/template.ts';

export class Page404 extends Module {
  declarations = [];
  templater = new Template();
  content: string = this.templater.precompile(
    template,
    this.declarations,
    this.blockId
  );

  constructor() {
    super();
  }

  init(): void {
    super.init();
  }

  componentDidMount() {
    this.props.errorCode = '404';
    setTimeout(() => {
      this.props.errorCode = '403';
    }, 1000);
  }
}
