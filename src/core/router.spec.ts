import { expect } from 'chai';
import { beforeEach } from 'mocha';
import sinon from 'sinon';
import { Router } from './router.ts';
import { ROOT_QUERY_MOCK, ROUTES_MOCK } from './fixtures.ts';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router(ROOT_QUERY_MOCK);
  });

  it('should be created', () => {
    expect(router).to.be.exist;
  });

  it('should correctly add routes', () => {
    expect(router['routes']).to.have.lengthOf(0);

    router.use(ROUTES_MOCK[0]);

    expect(router['routes']).to.have.lengthOf(1);
  });

  describe('Setup after set routes', () => {
    let onRouteSpy: sinon.SinonSpy;

    beforeEach(() => {
      router.use(ROUTES_MOCK[0]);
      router.use(ROUTES_MOCK[1]);
      router.use(ROUTES_MOCK[2]);
      onRouteSpy = sinon.spy(router, '_onRoute' as any);
    });

    afterEach(() => {
      router.go('/');
      sinon.restore();
    });

    it('should correctly start route', async () => {
      await router.start();

      expect(onRouteSpy.calledOnce).to.be.true;
    });

    it('should correctly go to route', async () => {
      await router.go('/test');

      expect(onRouteSpy.calledOnce).to.be.true;
      expect(window.location.pathname).to.eq('/test');
    });

    it('should NOT go to route if not access', async () => {
      await router.go('/notAccess');

      expect(onRouteSpy.calledOnce).to.be.true;
      expect(window.location.pathname).to.eq('/');
    });

    it('should correctly back to history', async () => {
      await router.start();
      await router.go('/test');

      const historyBackSpy = sinon.spy(router['history'], 'back');

      router.back();

      expect(historyBackSpy.calledOnce).to.be.true;
    });

    it('should correctly forward to history', async () => {
      await router.start();
      await router.go('/test');

      router.back();

      const historyForwardSpy = sinon.spy(router['history'], 'forward');

      router.forward();

      expect(historyForwardSpy.calledOnce).to.be.true;
    });
  });
});
