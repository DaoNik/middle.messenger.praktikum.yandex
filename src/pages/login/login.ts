import { LoginForm } from '../../components/login-form/login-form';
import template from './login.html?raw';
import { Module } from '../../types.ts';
import { Template } from '../../core/template.ts';

export class Login extends Module {
  declarations = [new LoginForm()];
  templater = new Template();
  content: string = this.templater.precompile(
    template,
    this.declarations,
    this.blockId
  );

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
      document.getElementById(this.blockId)!.innerHTML = this.content;
    }
  }

  componentDidMount(): void {
    super.componentDidMount();
  }
}
