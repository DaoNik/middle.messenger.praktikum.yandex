import { Block } from './core/block.ts';

export abstract class Module extends Block {
  abstract declarations: Component[];

  override componentDidMount() {
    for (const component of this.declarations) {
      component.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    super.componentDidMount();
  }
}

export abstract class Component extends Block {
  abstract selector: string;
}
