import * as page404Content from './pages/404/404';
import * as page500Content from './pages/500/500';
import * as pageProfile from './pages/profile/profile';
import * as pageChats from './pages/chats/chats';
import * as pageLogin from './pages/login/login';
import * as pageRegister from './pages/register/register';

const pageNotFound = { route: '404', content: page404Content.default };

const pages = [
  { route: 'profile', content: pageProfile.default },
  { route: 'register', content: pageRegister.default },
  { route: 'login', content: pageLogin.default },
  { route: 'chats', content: pageChats.default },
  { route: '500', content: page500Content.default },
  pageNotFound,
];

let pageFound = false;

for (const page of pages) {
  if (document.URL.includes(page.route)) {
    document.getElementById('root').innerHTML = page.content;
    pageFound = true;
  }
}

if (!pageFound) {
  document.getElementById('root').innerHTML = pageNotFound.content;
  document.URL = pageNotFound.route;
}
