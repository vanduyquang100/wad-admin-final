export const SERVER_API = import.meta.env.VITE_BASE_URL;

export const API_ROUTES = {
  LOGIN: 'users/login',
  ME: 'users/me',
  ALL_USERS: 'users',
  GET_USER: '/users/:id',
  UPDATE_USER: '/users/:id'
};

export const NAVIGATION_ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  PRODUCTS: '/dashboard/products',
  ORDERS: '/dashboard/orders',
  REPORTS: '/dashboard/reports',
}