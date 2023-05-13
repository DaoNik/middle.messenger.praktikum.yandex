const pageNotFound = { route: '404', path: '/pages/404/404.template.html' };

const pages = [
  { route: 'profile', path: '/pages/profile/profile.template.html' },
  { route: 'register', path: '/pages/register/register.template.html' },
  { route: 'login', path: '/pages/login/login.template.html' },
  { route: 'chats', path: '/pages/chats/chats.template.html' },
  { route: '500', path: '/pages/500/500.template.html' },
  pageNotFound
]

let pageFound = false;

for (const page of pages) {
  if (document.URL.includes(page.route)) {
    document.getElementById('root').innerHTML = page.path;
    pageFound = true;
  }
}

if (!pageFound) {
  document.getElementById('root').innerHTML = pageNotFound.path;
  document.URL = pageNotFound.route;
}
