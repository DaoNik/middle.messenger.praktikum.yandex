import template from './404.html?raw';
import { Module } from '../../types.ts';
import { Template } from '../../core/template.ts';

export class Page404 extends Module {
  content = template;
  precompiledContent: string | null = null;
  declarations = [];
  templater = new Template();

  constructor() {
    super();
  }

  init(): void {}

  render(): void {
    if (this.precompiledContent) {
      this.content = this.templater.compile(
        this.precompiledContent,
        this.props
      );
      document.querySelector('#root')!.innerHTML = this.content;
    }
  }

  componentDidMount() {
    this.props.errorCode = '404';
    setTimeout(() => {
      this.props.errorCode = '403';
    }, 1000);
  }
}
