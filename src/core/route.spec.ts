import { Route } from './route.ts';
import { ROOT_QUERY_MOCK, ROUTES_MOCK } from './fixtures.ts';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    const { path, component, canActivate } = ROUTES_MOCK[0];
    route = new Route(path, component, ROOT_QUERY_MOCK, canActivate);
  });

  it('should be created', () => {
    expect(route).to.exist;
  });

  it('should correctly render component', () => {
    expect(route['_block']).not.to.exist;

    route.render();

    expect(route['_block']).to.exist;
  });

  it('should correctly hide component', () => {
    route.render();

    const blockHideSpy = sinon.spy(route['_block']!, 'hide');

    route.leave();

    expect(blockHideSpy.calledOnce).to.be.true;
  });

  it('should correctly check pathname', () => {
    expect(route.match(ROUTES_MOCK[0].path)).to.be.true;
    expect(route.match(ROUTES_MOCK[1].path)).to.be.false;
  });

  it('should correctly navigate to page', () => {
    const renderPage = sinon.spy(route, 'render');

    route.navigate(ROUTES_MOCK[0].path);

    expect(renderPage.calledOnce).to.be.true;
  });
});
