import { expect } from 'chai';
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import { HTTPTransport, queryStringify } from './http.ts';

const CONTENT_TYPE_VALUE = 'application/json;charset=utf-8';

describe('queryStringify', () => {
  it('should return correct value', () => {
    expect(queryStringify({ a: 1 })).to.eq('?a=1');
    expect(queryStringify({ a: 1, abc: '32' })).to.eq('?a=1&abc=32');
  });
});

describe('HTTPTransport', () => {
  const requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;
  let httpTransport: HTTPTransport;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error mock for tests
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request) => {
      requests.push(request);
    };

    httpTransport = new HTTPTransport();
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it('should send a get request', () => {
    httpTransport.get('/test', { data: { query: 123 } });

    const [request] = requests;

    expect(request.method).to.equal('GET');
    expect(request.requestHeaders).to.contain({ Accept: 'application/json' });
    expect(request.url).to.equal('/test?query=123');
  });

  it('should send a post request', () => {
    httpTransport.post('/test', { data: { query: 123 } });

    const [request] = requests;

    expect(request.method).to.equal('POST');
    expect(request.requestHeaders).to.contain({
      'Content-Type': CONTENT_TYPE_VALUE,
    });
    expect(request.url).to.equal('/test');
    expect(request.requestBody).to.contain(JSON.stringify({ query: 123 }));
  });

  it('should send a put request', () => {
    httpTransport.put('/test', { data: { query: 123 } });

    const [request] = requests;

    expect(request.method).to.equal('PUT');
    expect(request.requestHeaders).to.contain({
      'Content-Type': CONTENT_TYPE_VALUE,
    });
    expect(request.url).to.equal('/test');
    expect(request.requestBody).to.contain(JSON.stringify({ query: 123 }));
  });

  it('should send a patch request', () => {
    httpTransport.patch('/test', { data: { query: 123 } });

    const [request] = requests;

    expect(request.method).to.equal('PATCH');
    expect(request.requestHeaders).to.contain({
      'Content-Type': CONTENT_TYPE_VALUE,
    });
    expect(request.url).to.equal('/test');
    expect(request.requestBody).to.contain(JSON.stringify({ query: 123 }));
  });

  it('should send a delete request', () => {
    httpTransport.delete('/test', { data: { query: 123 } });

    const [request] = requests;

    expect(request.method).to.equal('DELETE');
    expect(request.requestHeaders).to.contain({
      'Content-Type': CONTENT_TYPE_VALUE,
    });
    expect(request.url).to.equal('/test');
    expect(request.requestBody).to.contain(JSON.stringify({ query: 123 }));
  });

  it('should correctly send request and handle response', async () => {
    const server = sinon.fakeServer.create();
    const formData = new FormData();
    const response = httpTransport['_request']('/testForm', {
      method: 'POST',
      data: formData,
    });

    server.requests[0].respond(
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({ avatar: 'url' })
    );

    const testResponse = await response;

    expect(testResponse).to.contain({ avatar: 'url' });
  });
});
