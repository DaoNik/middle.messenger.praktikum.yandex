import { HTTPTransport } from '../core';
import { joinUrlParts } from '../utils';
import { BASE_HREF } from './constants.ts';
import { IFile } from '../services';

export class ResourcesApiService {
  private readonly _http = new HTTPTransport();
  private readonly _baseUrl = joinUrlParts(BASE_HREF, 'resources');

  loadFile(resource: FormData): Promise<IFile> {
    return this._http.post<IFile>(this._baseUrl, {
      data: resource,
    });
  }
}
