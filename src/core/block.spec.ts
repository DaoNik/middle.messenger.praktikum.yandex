import { Block } from './block.ts';
import { beforeEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

class TestPage extends Block<{ testText: string }> {
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

describe('Block', () => {
  let testPage: TestPage;

  beforeEach(() => {
    testPage = new TestPage();
    const root = document.querySelector('#root');
    root?.insertAdjacentHTML('afterbegin', testPage.content);
  });

  afterEach(() => {
    const root = document.querySelector('#root');
    root!.innerHTML = '';
  });

  it('should be created', () => {
    expect(testPage).to.exist;
  });

  it('should correctly compile component', () => {
    expect(testPage.element).to.be.null;

    testPage['_componentDidMount']();

    expect(testPage.element).not.to.be.null;
    expect(testPage.element?.textContent).to.eq('test');
  });

  describe('Setup after compiling', () => {
    beforeEach(() => {
      testPage['_componentDidMount']();
    });

    it('should correctly render component if props has been updated', () => {
      testPage.setProps({ testText: 'new text' });

      expect(testPage.element?.textContent).to.eq('new text');
    });

    it('should correctly add events', () => {
      testPage.element?.click();

      expect(testPage.element?.textContent).to.eq('onBlockClicked');
    });

    it('should correctly delete events', () => {
      const removeEventsSpy = sinon.spy(testPage.templater, 'removeEvents');

      testPage['_componentDidUnmount']();

      expect(removeEventsSpy.calledOnce).to.be.true;
    });

    it('should correctly hide element', () => {
      testPage.hide();

      expect(testPage.element?.style.display).to.eq('none');
    });

    it('should correctly show element', () => {
      testPage.hide();
      testPage.show();

      expect(testPage.element?.style.display).to.eq('block');
    });
  });
});
