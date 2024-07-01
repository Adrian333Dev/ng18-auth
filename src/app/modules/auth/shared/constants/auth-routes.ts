

export const authPaths = {
  base: 'auth',
  login: 'log-in',
  register: 'register',
  logout: 'logout',
};

export const authPathTitles = {
  login: 'Log In',
  register: 'Register',
  logout: 'Logout',
};


export const authRoutes = {
  login: `/${authPaths.base}/${authPaths.login}`,
  register: `/${authPaths.base}/${authPaths.register}`,
  logout: `/${authPaths.base}/${authPaths.logout}`,
};
