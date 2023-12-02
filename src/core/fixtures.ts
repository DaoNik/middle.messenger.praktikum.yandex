import { Block } from './block.ts';
import { IRoute } from './router.ts';

export class TestPage extends Block<{ testText: string }> {
  constructor() {
    super(
      '<div blockId="{{blockId}}" (click)="onBlockClicked">{{testText}}</div>',
      [],
      {
        testText: 'test',
      }
    );
  }

  onBlockClicked(): void {
    this.props.testText = 'onBlockClicked';
  }
}

export const ROUTES_MOCK: IRoute[] = [
  { path: '/', component: TestPage },
  {
    path: '/test',
    component: TestPage,
    canActivate: async () => true,
  },
  {
    path: '/notAccess',
    component: TestPage,
    canActivate: async () => false,
  },
];

export const ROOT_QUERY_MOCK = '#root';
