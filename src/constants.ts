import { BASE_HREF } from './api';

export const AUTH_USER = 'authUser';
export const CURRENT_CHAT_ID = 'currentChatId';

export function getImgSource(url: string): string {
  return `${BASE_HREF}/resources${url}`;
}
