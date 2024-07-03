

export const authPaths = {
  base: 'auth',
  login: 'log-in',
  register: 'register',
  // logout: 'logout',
};

export const authPathTitles = {
  base: 'Auth',
  login: 'Log In',
  register: 'Register',
  // logout: 'Logout',
};


export const authRoutes = {
  base: `${authPaths.base}`,
  login: `${authPaths.base}/${authPaths.login}`,
  register: `${authPaths.base}/${authPaths.register}`,
  // logout: `/${authPaths.base}/${authPaths.logout}`,
};
